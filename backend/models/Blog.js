import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    date: { type: Date, default: Date.now },
    image: String,
    shortDescription: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
