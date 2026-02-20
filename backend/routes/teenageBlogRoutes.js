import express from "express";
import {
  addTeenageBlog,
  getTeenageBlogs,
  getTeenageBlogBySlug,
} from "../controllers/teenageBlogController.js";

const router = express.Router();

// POST - Add Blog
router.post("/teenage-blogs", addTeenageBlog);

// GET - All Blogs
router.get("/teenage-blogs", getTeenageBlogs);

// GET - Single Blog
router.get("/teenage-blogs/:slug", getTeenageBlogBySlug);

export default router;