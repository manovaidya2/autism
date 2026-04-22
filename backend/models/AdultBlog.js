// File: AdultBlog.js (Model)
import mongoose from "mongoose";

const adultFaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const adultBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "Mental Health"
    },
    date: {
      type: Date,
      default: Date.now
    },
    image: {
      type: String,
      default: ""
    },
    shortDescription: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      required: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    views: {
      type: String,
      default: "0"
    },
    faqs: [adultFaqSchema]
  },
  {
    timestamps: true
  }
);

// Create index for search functionality
adultBlogSchema.index({ title: "text", content: "text", tags: "text" });

const AdultBlog = mongoose.model("AdultBlog", adultBlogSchema);

export default AdultBlog;