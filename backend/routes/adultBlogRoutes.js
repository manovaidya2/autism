// File: adultBlogRoutes.js
import express from "express";
import {
  createAdultBlog,
  getAdultBlogs,
  getAdultBlogById,
  getAdultBlogBySlug,
  updateAdultBlog,
  deleteAdultBlog
} from "../controllers/adultBlogController.js";

const router = express.Router();

// Public routes
router.get("/", getAdultBlogs);
router.get("/slug/:slug", getAdultBlogBySlug); // Use this for public blog viewing

// Admin routes (with id)
router.get("/admin/:id", getAdultBlogById);    // For admin edit
router.post("/", createAdultBlog);
router.put("/admin/:id", updateAdultBlog);
router.delete("/admin/:id", deleteAdultBlog);

export default router;