import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog);        // create
router.get("/", getBlogs);           // get all
router.get("/:slug", getBlogBySlug); // get one

export default router;
