import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug); // Use this for public blog viewing

// Admin routes (with id)
router.get("/admin/:id", getBlogById);    // For admin edit
router.post("/", createBlog);
router.put("/admin/:id", updateBlog);
router.delete("/admin/:id", deleteBlog);

export default router;