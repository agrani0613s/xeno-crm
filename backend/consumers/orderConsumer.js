import dotenv from "dotenv";
import connectDB from "../config/db.js";
import redis from "../config/redisClient.js";
import Order from "../models/Order.js";

dotenv.config();
connectDB();

console.log("👂 Order consumer started...");

let lastId = "0"; // start from beginning

async function consumeOrders() {
  while (true) {
    try {
      const entries = await redis.xread(
        { block: 5000, count: 10 },
        "STREAMS",
        "order-stream",
        lastId
      );

      if (entries) {
        const [, messages] = entries[0];
        for (const [id, fields] of messages) {
          lastId = id;

          const data = Object.fromEntries(
            fields.reduce((acc, val, i) => {
              if (i % 2 === 0) acc.push([val, fields[i + 1]]);
              return acc;
            }, [])
          );

          await Order.create({
            customerId: data.customerId,
            amount: Number(data.amount),
            items: JSON.parse(data.items || "[]"),
          });

          console.log(`✅ Saved order for customer ${data.customerId}, amount ${data.amount}`);

          await Order.create({
  customerId: data.customerId,
  amount: Number(data.amount),
  items: JSON.parse(data.items || "[]"),
});

// Update customer spend & visits
await Customer.findByIdAndUpdate(
  data.customerId,
  { 
    $inc: { spend: Number(data.amount), visits: 1 } 
  }
);

        }

        
      }
      
    } catch (err) {
      console.error("❌ Error in order consumer:", err.message);
    }
  }
}

consumeOrders();
