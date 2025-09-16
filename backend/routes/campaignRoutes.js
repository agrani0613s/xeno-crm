import express from "express";
import redis from "../config/redisClient.js";
import Campaign from "../models/Campaign.js";
import Customer from "../models/Customer.js";
import { isAuthenticated } from "../utils/authMiddleware.js";
import CommunicationLog from "../models/CommunicationLog.js";

const router = express.Router();

// POST /api/campaigns -> create campaign
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { name, rules } = req.body;
    if (!name || !rules) {
      return res.status(400).json({ error: "Name and rules required" });
    }

    // Estimate audience
    const audience = await Customer.find(rules);
    const audienceSize = audience.length;

    // Save campaign
    const campaign = await Campaign.create({
      name,
      rules,
      audienceSize,
      createdBy: req.user.emails[0].value, // Google email
    });

    // Publish to Redis for async delivery
    await redis.xadd("campaign-stream", "*", "campaignId", campaign._id.toString());

    res.json({ message: "✅ Campaign created", campaign });
  } catch (err) {
    console.error("❌ Campaign creation error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/campaigns -> list campaigns
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.emails[0].value })
      .sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/campaigns/:id/logs -> get delivery logs
router.get("/:id/logs", isAuthenticated, async (req, res) => {
  try {
    const logs = await CommunicationLog.find({ campaignId: req.params.id });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
