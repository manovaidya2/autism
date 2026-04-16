import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const teenageBlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true }, // Changed from authorName to author
    category: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    views: { type: String, default: "0" },
    likes: { type: Number, default: 0 },
    faqs: { type: [faqSchema], default: [] }, // Fixed FAQ schema
  },
  { 
    timestamps: true,
    collection: "teenageblogs" // Explicitly set collection name
  }
);

// Create indexes for better query performance
teenageBlogSchema.index({ slug: 1 });
teenageBlogSchema.index({ category: 1 });
teenageBlogSchema.index({ createdAt: -1 });

export default mongoose.model("TeenageBlog", teenageBlogSchema);