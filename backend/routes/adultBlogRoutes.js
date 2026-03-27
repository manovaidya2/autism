import express from "express";
import {
  createAdultBlog,
  getAllAdultBlogs,
  getAdultBlogBySlug,
  updateAdultBlog,
  deleteAdultBlog,
  getAdultBlogsByCategory,
} from "../controllers/adultBlogController.js";

const router = express.Router();

router.route("/")
  .post(createAdultBlog)
  .get(getAllAdultBlogs);

router.route("/:slug")
  .get(getAdultBlogBySlug);

router.route("/category/:category")
  .get(getAdultBlogsByCategory);

router.route("/:id")
  .put(updateAdultBlog)
  .delete(deleteAdultBlog);

export default router;