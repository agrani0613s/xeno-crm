import express from "express";
import redis from "../config/redisClient.js";

const router = express.Router();

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { customerId, amount, items } = req.body;
    if (!customerId || !amount) {
      return res.status(400).json({ error: "customerId and amount are required" });
    }

    // Publish to Redis stream
    await redis.xadd(
      "order-stream",
      "*",
      "customerId",
      customerId,
      "amount",
      amount.toString(),
      "items",
      JSON.stringify(items || [])
    );

    res.json({ message: "✅ Order event published to Redis" });
  } catch (err) {
    console.error("❌ Error publishing order:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
