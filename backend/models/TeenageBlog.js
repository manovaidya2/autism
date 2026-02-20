import mongoose from "mongoose";

const teenageBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
    image: {
      type: String, // base64 or image URL
    },
    shortDescription: {
      type: String,
    },
    content: {
      type: String, // HTML content from editor
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TeenageBlog", teenageBlogSchema);