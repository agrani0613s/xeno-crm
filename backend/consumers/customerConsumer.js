import dotenv from "dotenv";
import connectDB from "../config/db.js";
import redis from "../config/redisClient.js";
import Customer from "../models/Customer.js";

dotenv.config();
connectDB();

console.log("👂 Customer consumer started...");

let lastId = "0"; // start from the beginning

async function consumeCustomers() {
  while (true) {
    try {
      const entries = await redis.xread(
        { block: 5000, count: 10 },
        "STREAMS",
        "customer-stream",
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

          // Save to MongoDB
          await Customer.create({
            name: data.name,
            email: data.email,
            spend: Number(data.spend),
          });

          console.log(`✅ Saved customer: ${data.name} (${data.email})`);
        }
      }
    } catch (err) {
      console.error("❌ Error in consumer:", err.message);
    }
  }
}

consumeCustomers();
