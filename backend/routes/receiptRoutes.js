import express from "express";
import CommunicationLog from "../models/CommunicationLog.js";
import { isAuthenticated } from "../utils/authMiddleware.js";

const router = express.Router();

// POST /api/delivery-receipt
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { logId, status } = req.body;
    if (!logId || !status) {
      return res.status(400).json({ error: "logId and status required" });
    }

    const log = await CommunicationLog.findByIdAndUpdate(
      logId,
      { status },
      { new: true }
    );

    if (!log) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "✅ Delivery receipt updated", log });
  } catch (err) {
    console.error("❌ Receipt error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
