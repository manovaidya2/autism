import TeenageBlog from "../models/TeenageBlog.js";

// ✅ Add Blog
export const addTeenageBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      date,
      image,
      shortDescription,
      content,
    } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, Slug and Content are required",
      });
    }

    const existingBlog = await TeenageBlog.findOne({ slug });
    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    const blog = await TeenageBlog.create({
      title,
      slug,
      category,
      date,
      image,
      shortDescription,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Add Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ Get All Blogs
export const getTeenageBlogs = async (req, res) => {
  try {
    const blogs = await TeenageBlog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get Single Blog by Slug
export const getTeenageBlogBySlug = async (req, res) => {
  try {
    const blog = await TeenageBlog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};