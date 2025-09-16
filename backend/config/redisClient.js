import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   tls: {
//     rejectUnauthorized: false,
//   }
// });

// const redis = new Redis(
//   `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// );

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: "default", // Redis Cloud always uses "default"
  password: process.env.REDIS_PASSWORD,
  tls: {
    rejectUnauthorized: false, // skip self-signed cert issues
    // minVersion: "TLSv1.2",      // force TLS 1.2+ (required by Redis Cloud 8.0)
    secureProtocol: 'TLSv1_2_method',
  },
});

redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
