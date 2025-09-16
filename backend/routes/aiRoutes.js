import express from "express";
import { suggestMessages } from "../utils/vertexAiClient.js";
import { isAuthenticated } from "../utils/authMiddleware.js";

const router = express.Router();

// POST /api/ai/suggest-messages
router.post("/suggest-messages", isAuthenticated, async (req, res) => {
  try {
    const { objective } = req.body;
    if (!objective) return res.status(400).json({ error: "Objective required" });

    const suggestions = await suggestMessages(objective);
    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI suggestion failed" });
  }
});

// AI → Segment rules
router.post("/segment-rule", isAuthenticated, async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: "Description required" });

  const rule = await parseSegmentRule(description);
  res.json({ rule });
});

export default router;
