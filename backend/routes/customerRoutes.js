import express from "express";
import redis from "../config/redisClient.js";

const router = express.Router();

// POST /api/customers
router.post("/", async (req, res) => {
  try {
    const { name, email, spend } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    // Publish to Redis Stream
    await redis.xadd(
      "customer-stream",
      "*",
      "name",
      name,
      "email",
      email,
      "spend",
      spend?.toString() || "0"
    );

    res.json({ message: "✅ Customer event published to Redis" });
  } catch (err) {
    console.error("❌ Error publishing customer:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
