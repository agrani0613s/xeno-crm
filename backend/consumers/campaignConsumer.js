import dotenv from "dotenv";
import connectDB from "../config/db.js";
import redis from "../config/redisClient.js";
import Campaign from "../models/Campaign.js";
import Customer from "../models/Customer.js";
import CommunicationLog from "../models/CommunicationLog.js";

dotenv.config();
connectDB();

console.log("👂 Campaign consumer started...");

let lastId = "0";

async function consumeCampaigns() {
  while (true) {
    try {
      const entries = await redis.xread(
        { block: 5000, count: 1 },
        "STREAMS",
        "campaign-stream",
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

          const campaign = await Campaign.findById(data.campaignId);
          if (!campaign) continue;

          // Get audience
          const customers = await Customer.find(campaign.rules);

          for (const cust of customers) {
            const status = Math.random() < 0.9 ? "SENT" : "FAILED"; // 90% success
            const message = `Hi ${cust.name}, here’s 10% off on your next order!`;

            await CommunicationLog.create({
              campaignId: campaign._id,
              customerId: cust._id,
              status,
              message,
            });

            console.log(`📩 Campaign ${campaign.name} → ${cust.email}: ${status}`);
          }
        }
      }
    } catch (err) {
      console.error("❌ Error in campaign consumer:", err.message);
    }
  }
}

consumeCampaigns();
