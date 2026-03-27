import mongoose from "mongoose";

const adultBlogSchema = new mongoose.Schema(
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
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for better query performance
adultBlogSchema.index({ slug: 1 });
adultBlogSchema.index({ category: 1 });
adultBlogSchema.index({ createdAt: -1 });

const AdultBlog = mongoose.model("AdultBlog", adultBlogSchema);

export default AdultBlog;