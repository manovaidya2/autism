// File: AdultBlogDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaEye, 
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaTag,
  FaUser
} from "react-icons/fa";

export default function AdultBlogDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/adultblog");
      let postsData = [];
      if (Array.isArray(response.data)) {
        postsData = response.data;
      } else if (response.data && response.data.success) {
        postsData = response.data.data || [];
      }
      setPosts(postsData);
      setFilteredPosts(postsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(postsData.map(post => post.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      const storedPosts = localStorage.getItem("adult_blog_posts_admin");
      if (storedPosts) {
        const postsData = JSON.parse(storedPosts);
        setPosts(postsData);
        setFilteredPosts(postsData);
        const uniqueCategories = [...new Set(postsData.map(post => post.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = [...posts];
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const handleEdit = (post) => {
    navigate(`/admin/adult-blog/edit/${post._id || post.id}`);
  };

  const handleDelete = async (id, title) => {
    setDeleteConfirm({ id, title });
  };

  const confirmDelete = async () => {
    const { id, title } = deleteConfirm;
    try {
      await axiosInstance.delete(`/adultblog/admin/${id}`);
      await loadPosts();
      showMessage(`✅ "${title}" deleted successfully!`, "success");
    } catch (error) {
      const updatedPosts = posts.filter(post => (post._id || post.id) !== id);
      setPosts(updatedPosts);
      localStorage.setItem("adult_blog_posts_admin", JSON.stringify(updatedPosts));
      showMessage(`✅ "${title}" deleted successfully!`, "success");
    }
    setDeleteConfirm(null);
  };

  const handleView = (slug) => {
    window.open(`/blog/adult/${slug}`, "_blank");
  };

  const handleCreateNew = () => {
    navigate("/Admin-Adult");
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Adult Mental Health Blog
            </h1>
            <p className="text-gray-500 mt-1">Manage your blog posts, edit content, and track performance</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Create New Post
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-3 rounded-xl border flex items-center gap-2 ${
            messageType === "success" 
              ? "bg-green-100 text-green-800 border-green-200" 
              : "bg-red-100 text-red-800 border-red-200"
          }`}>
            <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-gray-800">{posts.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaEdit className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaFilter className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Tags</p>
                <p className="text-2xl font-bold text-gray-800">
                  {posts.reduce((acc, post) => acc + (post.tags?.length || 0), 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FaTag className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-gray-800">
                  {posts.reduce((acc, post) => acc + (parseInt(post.views) || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaEye className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-500">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No posts found. Create your first blog post!</p>
              <button
                onClick={handleCreateNew}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                + Create New Post
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post._id || post.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400 text-xs" />
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400 text-xs" />
                          <span className="text-sm text-gray-600">{formatDate(post.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{post.views || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(post.slug)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Post"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit Post"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id || post.id, post.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Post"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Post?</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete "<strong>{deleteConfirm.title}</strong>"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}