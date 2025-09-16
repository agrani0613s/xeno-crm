import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: Number, required: true },
    items: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
