import express from "express";
import { suggestMessages, parseSegmentRule } from "../utils/vertexAiClient.js";
import { isAuthenticated } from "../utils/authMiddleware.js";

const router = express.Router();

// POST /api/ai/suggest-messages
router.post("/suggest-messages", isAuthenticated, async (req, res) => {
  try {
    const { objective } = req.body;
    if (!objective) return res.status(400).json({ error: "Objective required" });

    const suggestions = await suggestMessages(objective);
    return res.json({ suggestions });
  } catch (err) {
    console.error("AI route error:", err.message);
    return res.status(500).json({
      error: "AI suggestion failed",
      detail: err.message || "unknown error",
    });
  }
});

// POST /api/ai/segment-rule
router.post("/segment-rule", isAuthenticated, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: "Description required" });

    const rule = await parseSegmentRule(description);
    return res.json({ rule });
  } catch (err) {
    console.error("AI route error:", err.message);
    return res.status(500).json({
      error: "AI segment parsing failed",
      detail: err.message || "unknown error",
    });
  }
});

export default router;
