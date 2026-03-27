import Blog from "../models/Blog.js";

// CREATE
export const createBlog = async (req, res) => {
  try {
    console.log("Received blog data:", req.body);
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      category: req.body.category || "",
      date: req.body.date ? new Date(req.body.date) : new Date(),
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      faqs: Array.isArray(req.body.faqs) ? req.body.faqs : []
    };
    
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields" 
      });
    }
    
    const blog = new Blog(blogData);
    await blog.save();
    
    console.log("Blog saved successfully:", blog._id);
    
    res.status(201).json({ 
      success: true, 
      blog,
      message: "Blog created successfully" 
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    
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
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET BY ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET BY SLUG
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE
export const updateBlog = async (req, res) => {
  try {
    console.log("Updating blog data:", req.body);
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      category: req.body.category || "",
      date: req.body.date ? new Date(req.body.date) : new Date(),
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      faqs: Array.isArray(req.body.faqs) ? req.body.faqs : []
    };
    
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields" 
      });
    }
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }
    
    console.log("Blog updated successfully:", blog._id);
    
    res.json({ 
      success: true, 
      blog,
      message: "Blog updated successfully" 
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    
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
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }
    
    console.log("Blog deleted successfully:", blog._id);
    
    res.json({ 
      success: true, 
      message: "Blog deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};