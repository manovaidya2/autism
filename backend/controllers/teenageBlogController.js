import TeenageBlog from "../models/TeenageBlog.js";

// CREATE - Add new teenage blog
export const addTeenageBlog = async (req, res) => {
  try {
    console.log("Received teenage blog data:", req.body);
    
    // Parse date correctly
    let blogDate = new Date();
    if (req.body.date) {
      blogDate = new Date(req.body.date);
      if (isNaN(blogDate.getTime())) {
        blogDate = new Date(); // Fallback to current date if invalid
      }
    }
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author, // Changed from authorName to author
      category: req.body.category || "",
      date: blogDate,
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      tags: req.body.tags || [],
      views: req.body.views || "0",
      likes: req.body.likes || 0,
      faqs: Array.isArray(req.body.faqs) && req.body.faqs.length > 0 
        ? req.body.faqs.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))
        : [] // Make sure empty array is sent if no FAQs
    };
    
    // Validation
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields",
        received: { title: !!blogData.title, slug: !!blogData.slug, author: !!blogData.author }
      });
    }
    
    // Check if slug already exists
    const existingBlog = await TeenageBlog.findOne({ slug: blogData.slug });
    if (existingBlog) {
      return res.status(400).json({ 
        success: false, 
        message: "Slug already exists. Please use a unique slug." 
      });
    }
    
    const blog = new TeenageBlog(blogData);
    await blog.save();
    
    console.log("Teenage blog saved successfully:", {
      id: blog._id,
      author: blog.author,
      faqsCount: blog.faqs.length
    });
    
    res.status(201).json({ 
      success: true, 
      blog,
      message: "Teenage blog created successfully" 
    });
  } catch (error) {
    console.error("Error creating teenage blog:", error);
    
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

// GET ALL - Get all teenage blogs
export const getTeenageBlogs = async (req, res) => {
  try {
    const blogs = await TeenageBlog.find()
      .sort({ createdAt: -1 })
      .select('-content'); // Exclude content for list view for faster loading
    
    console.log(`Found ${blogs.length} teenage blogs`);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching teenage blogs:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: error.message 
    });
  }
};

// GET BY ID - Get single blog by ID
export const getTeenageBlogById = async (req, res) => {
  try {
    const blog = await TeenageBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Teenage blog not found" 
      });
    }
    
    // Increment view count
    const currentViews = parseInt(blog.views) || 0;
    blog.views = (currentViews + 1).toString();
    await blog.save();
    
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching teenage blog:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: error.message 
    });
  }
};

// GET BY SLUG - Get single blog by slug
export const getTeenageBlogBySlug = async (req, res) => {
  try {
    const blog = await TeenageBlog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Teenage blog not found" 
      });
    }
    
    // Increment view count
    const currentViews = parseInt(blog.views) || 0;
    blog.views = (currentViews + 1).toString();
    await blog.save();
    
    console.log(`Blog viewed: ${blog.slug}, new views: ${blog.views}`);
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching teenage blog by slug:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: error.message 
    });
  }
};

// UPDATE - Update teenage blog
export const updateTeenageBlog = async (req, res) => {
  try {
    console.log("Updating teenage blog data:", req.body);
    
    // Parse date correctly
    let blogDate = new Date();
    if (req.body.date) {
      blogDate = new Date(req.body.date);
      if (isNaN(blogDate.getTime())) {
        blogDate = new Date();
      }
    }
    
    const blogData = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author, // Changed from authorName to author
      category: req.body.category || "",
      date: blogDate,
      image: req.body.image || "",
      shortDescription: req.body.shortDescription || "",
      content: req.body.content || "",
      tags: req.body.tags || [],
      views: req.body.views || "0",
      likes: req.body.likes || 0,
      faqs: Array.isArray(req.body.faqs) && req.body.faqs.length > 0
        ? req.body.faqs.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))
        : []
    };
    
    if (!blogData.title || !blogData.slug || !blogData.author) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, slug, and author are required fields" 
      });
    }
    
    // Check if slug is unique (excluding current blog)
    const existingBlog = await TeenageBlog.findOne({ 
      slug: blogData.slug, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingBlog) {
      return res.status(400).json({ 
        success: false, 
        message: "Slug already exists. Please use a unique slug." 
      });
    }
    
    const blog = await TeenageBlog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Teenage blog not found" 
      });
    }
    
    console.log("Teenage blog updated successfully:", {
      id: blog._id,
      author: blog.author,
      faqsCount: blog.faqs.length
    });
    
    res.status(200).json({ 
      success: true, 
      blog,
      message: "Teenage blog updated successfully" 
    });
  } catch (error) {
    console.error("Error updating teenage blog:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Slug already exists. Please use a unique slug." 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

// DELETE - Delete teenage blog
export const deleteTeenageBlog = async (req, res) => {
  try {
    const blog = await TeenageBlog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Teenage blog not found" 
      });
    }
    
    console.log("Teenage blog deleted successfully:", blog._id);
    
    res.status(200).json({ 
      success: true, 
      message: "Teenage blog deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting teenage blog:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

// LIKE - Like a blog
export const likeTeenageBlog = async (req, res) => {
  try {
    const blog = await TeenageBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }
    
    blog.likes = (blog.likes || 0) + 1;
    await blog.save();
    
    res.status(200).json({ 
      success: true, 
      likes: blog.likes 
    });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET BY CATEGORY - Get blogs by category
export const getTeenageBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const blogs = await TeenageBlog.find({ category })
      .sort({ createdAt: -1 });
    
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};