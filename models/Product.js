import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priceUSD: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  count: { type: Number, required: true, default: 0 },
  isDraft: { type: Boolean, required: false, default: false },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
