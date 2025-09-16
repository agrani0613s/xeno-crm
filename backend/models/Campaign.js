import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rules: { type: Object, required: true }, // e.g., { spend: { $gt: 1000 }, visits: { $lt: 3 } }
    audienceSize: { type: Number, default: 0 },
    createdBy: { type: String, required: true }, // Google user email or id
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
