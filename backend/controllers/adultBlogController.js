// File: adultBlogController.js
import AdultBlog from "../models/AdultBlog.js";

// CREATE
export const createAdultBlog = async (req, res) => {
  try {
    console.log("Received adult blog data:", req.body);
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      category: req.body.category || "",
      date: req.body.date ? new Date(req.body.date) : new Date(),
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      tags: req.body.tags || [],
      views: req.body.views || "0",
      faqs: Array.isArray(req.body.faqs) ? req.body.faqs : []
    };
    
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields" 
      });
    }
    
    const blog = new AdultBlog(blogData);
    await blog.save();
    
    console.log("Adult blog saved successfully:", blog._id);
    
    res.status(201).json({ 
      success: true, 
      blog,
      message: "Adult mental health blog created successfully" 
    });
  } catch (error) {
    console.error("Error creating adult blog:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Slug already exists. Please use a unique slug." 
      });
    }
    
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

// GET ALL
export const getAdultBlogs = async (req, res) => {
  try {
    const blogs = await AdultBlog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching adult blogs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET BY ID
export const getAdultBlogById = async (req, res) => {
  try {
    const blog = await AdultBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Adult blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching adult blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET BY SLUG
export const getAdultBlogBySlug = async (req, res) => {
  try {
    const blog = await AdultBlog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Adult blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching adult blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE
export const updateAdultBlog = async (req, res) => {
  try {
    console.log("Updating adult blog data:", req.body);
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      category: req.body.category || "",
      date: req.body.date ? new Date(req.body.date) : new Date(),
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      tags: req.body.tags || [],
      views: req.body.views || "0",
      faqs: Array.isArray(req.body.faqs) ? req.body.faqs : []
    };
    
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields" 
      });
    }
    
    const blog = await AdultBlog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Adult blog not found" 
      });
    }
    
    console.log("Adult blog updated successfully:", blog._id);
    
    res.json({ 
      success: true, 
      blog,
      message: "Adult mental health blog updated successfully" 
    });
  } catch (error) {
    console.error("Error updating adult blog:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Slug already exists. Please use a unique slug." 
      });
    }
    
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

// DELETE
export const deleteAdultBlog = async (req, res) => {
  try {
    const blog = await AdultBlog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Adult blog not found" 
      });
    }
    
    console.log("Adult blog deleted successfully:", blog._id);
    
    res.json({ 
      success: true, 
      message: "Adult mental health blog deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting adult blog:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};