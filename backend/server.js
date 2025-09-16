import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Sessions (required for OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// DB connection
connectDB();

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/delivery-receipt", receiptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
