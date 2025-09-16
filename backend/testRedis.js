// testRedis.js
import redis from "./config/redisClient.js";

(async () => {
  try {
    await redis.set("hello", "world");
    const val = await redis.get("hello");
    console.log("✅ Value from Redis:", val);
    process.exit(0);
  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  }
})();
