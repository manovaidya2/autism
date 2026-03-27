import AdultBlog from "../models/AdultBlog.js";

// @desc    Create a new adult blog
// @route   POST /api/adult-blogs
// @access  Public
export const createAdultBlog = async (req, res) => {
  try {
    const { title, slug, category, date, image, shortDescription, content } = req.body;

    // Check if blog with same slug exists
    const existingBlog = await AdultBlog.findOne({ slug });
    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    const blog = new AdultBlog({
      title,
      slug,
      category,
      date,
      image,
      shortDescription,
      content,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Adult blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create adult blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create adult blog",
    });
  }
};

// @desc    Get all adult blogs
// @route   GET /api/adult-blogs
// @access  Public
export const getAllAdultBlogs = async (req, res) => {
  try {
    const blogs = await AdultBlog.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Get adult blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch adult blogs",
    });
  }
};

// @desc    Get single adult blog by slug
// @route   GET /api/adult-blogs/:slug
// @access  Public
export const getAdultBlogBySlug = async (req, res) => {
  try {
    const blog = await AdultBlog.findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Adult blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get adult blog by slug error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch adult blog",
    });
  }
};

// @desc    Update adult blog
// @route   PUT /api/adult-blogs/:id
// @access  Public
export const updateAdultBlog = async (req, res) => {
  try {
    const blog = await AdultBlog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Adult blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Adult blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Update adult blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update adult blog",
    });
  }
};

// @desc    Delete adult blog
// @route   DELETE /api/adult-blogs/:id
// @access  Public
export const deleteAdultBlog = async (req, res) => {
  try {
    const blog = await AdultBlog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Adult blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Adult blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete adult blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete adult blog",
    });
  }
};

// @desc    Get adult blogs by category
// @route   GET /api/adult-blogs/category/:category
// @access  Public
export const getAdultBlogsByCategory = async (req, res) => {
  try {
    const blogs = await AdultBlog.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Get adult blogs by category error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch adult blogs by category",
    });
  }
};