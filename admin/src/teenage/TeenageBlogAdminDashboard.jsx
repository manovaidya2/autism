import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { 
  Pencil, 
  Trash2, 
  Eye, 
  Heart, 
  Calendar,
  TrendingUp,
  BookOpen,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function TeenageBlogAdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalCategories: 0,
    mostViewedPost: null,
    mostLikedPost: null
  });

  // Fetch all blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/teenage-blogs");
      
      let allBlogs = [];
      if (Array.isArray(response.data)) {
        allBlogs = response.data;
      } else if (response.data && response.data.success) {
        allBlogs = response.data.data || [];
      } else {
        allBlogs = [];
      }
      
      setBlogs(allBlogs);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(allBlogs.map(blog => blog.category).filter(cat => cat))];
      setCategories(uniqueCategories);
      
      // Calculate stats
      calculateStats(allBlogs);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage({ type: "error", text: "Failed to fetch blogs" });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (blogsData) => {
    const totalViews = blogsData.reduce((sum, blog) => sum + (parseInt(blog.views) || 0), 0);
    const totalLikes = blogsData.reduce((sum, blog) => sum + (parseInt(blog.likes) || 0), 0);
    
    const mostViewed = [...blogsData].sort((a, b) => (parseInt(b.views) || 0) - (parseInt(a.views) || 0))[0];
    const mostLiked = [...blogsData].sort((a, b) => (parseInt(b.likes) || 0) - (parseInt(a.likes) || 0))[0];
    
    setStats({
      totalPosts: blogsData.length,
      totalViews,
      totalLikes,
      totalCategories: [...new Set(blogsData.map(blog => blog.category).filter(cat => cat))].length,
      mostViewedPost: mostViewed,
      mostLikedPost: mostLiked
    });
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axiosInstance.delete(`/teenage-blogs/admin/${id}`);
        await fetchBlogs();
        setMessage({ type: "success", text: "Blog deleted successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        console.error("Error deleting blog:", error);
        setMessage({ type: "error", text: "Failed to delete blog" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    }
  };

const handleEdit = async (blog) => {
  try {
   const res = await axiosInstance.get(`/teenage-blogs/id/${blog._id}`);
    setEditingBlog(res.data); // full blog with content
    setShowEditModal(true);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    setMessage({ type: "error", text: "Failed to load blog content" });
  }
};

  const handleUpdate = async (updatedBlog) => {
    try {
      const response = await axiosInstance.put(`/teenage-blogs/admin/${updatedBlog._id}`, updatedBlog);
      if (response.data && response.data.success) {
        await fetchBlogs();
        setShowEditModal(false);
        setEditingBlog(null);
        setMessage({ type: "success", text: "Blog updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setMessage({ type: "error", text: "Failed to update blog" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
       <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">
      Teenage Blog Admin Dashboard
    </h1>
    <p className="text-gray-600">
      Manage your teenage blog posts, track performance, and engage with your audience
    </p>
  </div>

  {/* 👉 New Button */}
  <button
    onClick={() => navigate("/Admin-Teenage")}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
  >
    + Add Blog
  </button>
</div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
            message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalPosts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Eye className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Likes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalLikes.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <Heart className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalCategories}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Filter className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Most Viewed & Most Liked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {stats.mostViewedPost && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl shadow-md p-5 border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-orange-600" size={20} />
                <h3 className="font-semibold text-gray-800">Most Viewed Article</h3>
              </div>
              <p className="font-medium text-gray-900">{stats.mostViewedPost.title}</p>
              <p className="text-sm text-gray-600 mt-1">{stats.mostViewedPost.views || 0} views</p>
            </div>
          )}

          {stats.mostLikedPost && (
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl shadow-md p-5 border border-pink-100">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="text-red-600" size={20} />
                <h3 className="font-semibold text-gray-800">Most Liked Article</h3>
              </div>
              <p className="font-medium text-gray-900">{stats.mostLikedPost.title}</p>
              <p className="text-sm text-gray-600 mt-1">{stats.mostLikedPost.likes || 0} likes</p>
            </div>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Views</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Likes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                      <p className="mt-2 text-gray-500">Loading blogs...</p>
                    </td>
                  </tr>
                ) : currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No blogs found
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">{blog.title}</p>
                          {blog.shortDescription && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{blog.shortDescription}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{blog.author || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {blog.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <Eye size={14} />
                          <span>{blog.views || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <Heart size={14} />
                          <span>{blog.likes || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Calendar size={14} />
                          <span>{formatDate(blog.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id, blog.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBlogs.length)} of {filteredBlogs.length} blogs
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => {
            setShowEditModal(false);
            setEditingBlog(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

// Edit Blog Modal Component with Rich Text Editor
// Edit Blog Modal Component with Rich Text Editor (FIXED)
function EditBlogModal({ blog, onClose, onUpdate }) {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  const [formData, setFormData] = useState({
    title: blog.title || "",
    slug: blog.slug || "",
    author: blog.author || "",
    category: blog.category || "",
    date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : "",
    image: blog.image || "",
    shortDescription: blog.shortDescription || "",
    content: blog.content || "",
    tags: blog.tags || [],
    views: blog.views || "0",
    likes: blog.likes || "0",
    faqs: blog.faqs || []
  });
  const [tagInput, setTagInput] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [editingFaqIndex, setEditingFaqIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Initialize editor content when modal opens and blog data is available
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (editorRef.current && blog.content && !contentLoaded) {
        console.log("Setting editor content:", blog.content.substring(0, 100));
        editorRef.current.innerHTML = blog.content;
        setContentLoaded(true);
        setIsEditorReady(true);
      } else if (editorRef.current && !blog.content && !contentLoaded) {
        editorRef.current.innerHTML = "";
        setContentLoaded(true);
        setIsEditorReady(true);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [blog.content, contentLoaded]);

  // Also try to set content when editor ref changes
  useEffect(() => {
    if (editorRef.current && blog.content && !contentLoaded) {
      editorRef.current.innerHTML = blog.content;
      setContentLoaded(true);
      setIsEditorReady(true);
    }
  }, [editorRef.current, blog.content, contentLoaded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-generate slug
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Rich text editor functions
  const formatText = (command, value = null) => {
    if (!isEditorReady) return;
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      formatText("insertImage", event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddFaq = () => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;
    
    if (editingFaqIndex !== null) {
      const updatedFaqs = [...formData.faqs];
      updatedFaqs[editingFaqIndex] = { question: faqQuestion, answer: faqAnswer };
      setFormData({ ...formData, faqs: updatedFaqs });
      setEditingFaqIndex(null);
    } else {
      setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: faqQuestion, answer: faqAnswer }]
      });
    }
    setFaqQuestion("");
    setFaqAnswer("");
  };

  const handleEditFaq = (index) => {
    setFaqQuestion(formData.faqs[index].question);
    setFaqAnswer(formData.faqs[index].answer);
    setEditingFaqIndex(index);
  };

  const handleDeleteFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updatedFaqs });
    if (editingFaqIndex === index) {
      setEditingFaqIndex(null);
      setFaqQuestion("");
      setFaqAnswer("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get content from rich text editor
    const htmlContent = editorRef.current ? editorRef.current.innerHTML : formData.content;
    
    const updatedData = { 
      ...formData, 
      _id: blog._id,
      content: htmlContent
    };
    
    setLoading(true);
    await onUpdate(updatedData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Blog Post</h2>
          <button 
            onClick={() => {
              setContentLoaded(false);
              setIsEditorReady(false);
              onClose();
            }} 
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title and Slug */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </div>
          </div>

          {/* Author, Category, Date, Views, Likes */}
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Views</label>
              <input
                type="number"
                name="views"
                value={formData.views}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Likes</label>
              <input
                type="number"
                name="likes"
                value={formData.likes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
              />
              <button type="button" onClick={handleAddTag} className="bg-gray-200 hover:bg-gray-300 px-4 rounded-xl transition">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600 ml-1">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="border-t pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Frequently Asked Questions (FAQs)</label>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <input
                type="text"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                placeholder="Question"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                placeholder="Answer"
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
              <button type="button" onClick={handleAddFaq} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
                {editingFaqIndex !== null ? "Update FAQ" : "Add FAQ"}
              </button>
              {editingFaqIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaqIndex(null);
                    setFaqQuestion("");
                    setFaqAnswer("");
                  }}
                  className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Cancel
                </button>
              )}
            </div>
            {formData.faqs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Added FAQs ({formData.faqs.length})</h4>
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">
                          <span className="text-blue-600">Q:</span> {faq.question}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          <span className="text-green-600">A:</span> {faq.answer}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          type="button"
                          onClick={() => handleEditFaq(idx)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(idx)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rich Text Editor for Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Content *</label>
            <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50 mb-2">
              <button type="button" onClick={() => formatText("bold")} className="editor-btn"><b>B</b></button>
              <button type="button" onClick={() => formatText("italic")} className="editor-btn"><i>I</i></button>
              <button type="button" onClick={() => formatText("underline")} className="editor-btn"><u>U</u></button>
              <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn"><s>S</s></button>
              <div className="w-px h-8 bg-gray-300 mx-1"></div>
              <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• List</button>
              <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. List</button>
              <div className="w-px h-8 bg-gray-300 mx-1"></div>
              <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
                <option value="">Heading</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="p">Paragraph</option>
              </select>
              <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
              <div className="w-px h-8 bg-gray-300 mx-1"></div>
              <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">🔗 Link</button>
              <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn">🖼️ Image</button>
              <input type="file" accept="image/*" ref={editorFileRef} onChange={handleEditorImageUpload} className="hidden" />
              <button type="button" onClick={() => formatText("undo")} className="editor-btn">↩️ Undo</button>
              <button type="button" onClick={() => formatText("redo")} className="editor-btn">↪️ Redo</button>
            </div>

            {/* Rich Text Editor Area */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[350px] border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              suppressContentEditableWarning={true}
              style={{ whiteSpace: "pre-wrap" }}
            />
            {!isEditorReady && (
              <div className="text-center py-4 text-gray-500">
                Loading editor content...
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
            <button
              type="button"
              onClick={() => {
                setContentLoaded(false);
                setIsEditorReady(false);
                onClose();
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .editor-btn {
          padding: 6px 12px;
          font-weight: 500;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .editor-btn:hover {
          background: #eff6ff;
          border-color: #3b82f6;
        }
        .editor-select {
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: white;
          cursor: pointer;
          font-size: 13px;
        }
        div[contenteditable="true"] ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        div[contenteditable="true"] ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        div[contenteditable="true"] img {
          max-width: 100%;
          border-radius: 8px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}