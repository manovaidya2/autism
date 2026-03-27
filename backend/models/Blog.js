import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  
});


const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    category: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    content: { type: String, default: "" },
    faqs: { type: [faqSchema], default: [] }, // Make FAQs optional with default empty array
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);