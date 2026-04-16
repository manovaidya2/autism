import express from "express";
import {
  addTeenageBlog,
  getTeenageBlogs,
  getTeenageBlogById,
  getTeenageBlogBySlug,
  updateTeenageBlog,
  deleteTeenageBlog,
  likeTeenageBlog,
  getTeenageBlogsByCategory,
} from "../controllers/teenageBlogController.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// Public routes
router.get("/teenage-blogs", getTeenageBlogs);
router.get("/teenage-blogs/category/:category", getTeenageBlogsByCategory);
router.get("/teenage-blogs/:slug", getTeenageBlogBySlug);
router.get("/teenage-blogs/id/:id", getTeenageBlogById);

// Like route
router.post("/teenage-blogs/:id/like", likeTeenageBlog);

// Admin routes (protected in production)
router.post("/teenage-blogs", addTeenageBlog);
router.put("/teenage-blogs/admin/:id", updateTeenageBlog);
router.delete("/teenage-blogs/admin/:id", deleteTeenageBlog);

export default router;