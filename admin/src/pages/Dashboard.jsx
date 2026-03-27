import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ProfessionalDashboard() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 1245,
    revenue: 45000,
    users: 650,
    growth: 23
  });

  // Blog form state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    content: "",
  });
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  // Fetch blog data from API
  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    setLoading(true);
    try {
      // Using JSONPlaceholder as a mock API endpoint
      // In production, replace with your actual API endpoint
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=4");
      
      // Transform mock data to match blog structure
      const transformedData = response.data.map((post, index) => ({
        id: post.id,
        title: post.title,
        content: post.body,
        shortDescription: post.body.substring(0, 120) + "...",
        category: ["Technology", "Design", "Business", "Innovation"][index % 4],
        date: new Date(Date.now() - index * 86400000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        image: `https://picsum.photos/id/${index + 10}/400/250`,
        slug: post.title.toLowerCase().replace(/\s/g, "-"),
      }));
      
      setBlogPosts(transformedData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      // Fallback mock data
      setBlogPosts([
        {
          id: 1,
          title: "The Future of Digital Transformation",
          shortDescription: "Explore how businesses are leveraging AI and cloud technologies to reshape their operations and deliver exceptional customer experiences.",
          category: "Technology",
          date: "March 15, 2026",
          image: "https://picsum.photos/id/0/400/250",
          slug: "future-digital-transformation",
        },
        {
          id: 2,
          title: "Mastering User Experience Design",
          shortDescription: "Learn the principles of creating intuitive interfaces that delight users and drive engagement across all digital platforms.",
          category: "Design",
          date: "March 12, 2026",
          image: "https://picsum.photos/id/1/400/250",
          slug: "mastering-ux-design",
        },
        {
          id: 3,
          title: "Sustainable Business Strategies",
          shortDescription: "How modern enterprises are balancing profitability with environmental responsibility and social impact.",
          category: "Business",
          date: "March 10, 2026",
          image: "https://picsum.photos/id/2/400/250",
          slug: "sustainable-business",
        },
        {
          id: 4,
          title: "AI Revolution in 2026",
          shortDescription: "Discover cutting-edge AI applications that are transforming industries and creating new opportunities for innovation.",
          category: "Innovation",
          date: "March 8, 2026",
          image: "https://picsum.photos/id/3/400/250",
          slug: "ai-revolution-2026",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // Editor image upload
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      formatText("insertImage", base64);
    };
    reader.readAsDataURL(file);
  };

  // Main blog image upload
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Submit new blog
  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    const htmlContent = editorRef.current?.innerHTML || "";
    const newBlog = {
      ...formData,
      content: htmlContent,
      id: blogPosts.length + 1,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      // In production, post to your actual API
      // await axios.post("/api/blogs", newBlog);
      
      // Simulate API call
      setBlogPosts([newBlog, ...blogPosts]);
      alert("Blog published successfully!");
      
      // Reset form
      setFormData({
        title: "",
        slug: "",
        category: "",
        date: "",
        image: "",
        shortDescription: "",
        content: "",
      });
      if (editorRef.current) editorRef.current.innerHTML = "";
      setShowBlogForm(false);
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-4 md:p-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                InsightHub
              </h1>
              <p className="text-gray-500 mt-2">Professional Analytics Dashboard</p>
            </div>
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <i className="fas fa-plus-circle"></i>
              {showBlogForm ? "Close Form" : "Write New Blog"}
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Orders Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-2xl"></div>
            <div className="relative flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-shopping-cart text-indigo-600 text-xl"></i>
              </div>
              <span className="text-3xl font-bold text-indigo-600">+{stats.growth}%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalOrders.toLocaleString()}</p>
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-indigo-500 rounded-full"></div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl"></div>
            <div className="relative flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
              </div>
              <i className="fas fa-chart-line text-green-500"></i>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">${stats.revenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">↑ 18.3% from last month</p>
          </div>

          {/* Users Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl"></div>
            <div className="relative flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <i className="fas fa-user-plus text-blue-400"></i>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Users</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.users.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-2">↑ 342 new this week</p>
          </div>

          {/* Growth Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl"></div>
            <div className="relative flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-chart-simple text-purple-600 text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.growth}%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Growth Rate</h3>
            <p className="text-3xl font-bold text-gray-800">+{stats.growth}%</p>
            <p className="text-xs text-gray-400 mt-2">vs. previous period</p>
          </div>
        </div>

        {/* Blog Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-newspaper text-indigo-600"></i>
            Latest Blog Articles
          </h2>
          <p className="text-gray-500 mt-1">Discover insights, trends, and expert perspectives</p>
        </div>

        {/* Blog Form Modal */}
        {showBlogForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
                <button
                  onClick={() => setShowBlogForm(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <i className="fas fa-times text-gray-600"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmitBlog} className="p-6 space-y-5">
                {/* Title */}
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                
                {/* Slug and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="slug"
                    placeholder="URL Slug (e.g., my-blog-post)"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                {/* Short Description */}
                <textarea
                  name="shortDescription"
                  placeholder="Short Description (summary)"
                  rows="3"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                
                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />
                  )}
                </div>
                
                {/* Rich Text Editor Toolbar */}
                <div className="border rounded-xl overflow-hidden">
                  <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
                    <button type="button" onClick={() => formatText("bold")} className="p-2 hover:bg-gray-200 rounded" title="Bold"><i className="fas fa-bold"></i></button>
                    <button type="button" onClick={() => formatText("italic")} className="p-2 hover:bg-gray-200 rounded" title="Italic"><i className="fas fa-italic"></i></button>
                    <button type="button" onClick={() => formatText("underline")} className="p-2 hover:bg-gray-200 rounded" title="Underline"><i className="fas fa-underline"></i></button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => formatText("insertUnorderedList")} className="p-2 hover:bg-gray-200 rounded" title="Bullet List"><i className="fas fa-list-ul"></i></button>
                    <button type="button" onClick={() => formatText("insertOrderedList")} className="p-2 hover:bg-gray-200 rounded" title="Numbered List"><i className="fas fa-list-ol"></i></button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => editorFileRef.current.click()} className="p-2 hover:bg-gray-200 rounded" title="Insert Image"><i className="fas fa-image"></i></button>
                    <input type="file" ref={editorFileRef} onChange={handleEditorImageUpload} className="hidden" accept="image/*" />
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    className="min-h-[250px] p-4 focus:outline-none"
                    suppressContentEditableWarning
                  ></div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Publish Blog
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Blog Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-indigo-600">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="far fa-calendar-alt"></i>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                    {post.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors flex items-center gap-1">
                      Read More <i className="fas fa-arrow-right text-xs"></i>
                    </button>
                    <div className="flex items-center gap-2 text-gray-400">
                      <i className="far fa-heart hover:text-red-500 cursor-pointer"></i>
                      <span className="text-xs">{Math.floor(Math.random() * 100)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>© 2026 InsightHub. All rights reserved. Real-time data integration</p>
        </div>
      </div>
    </div>
  );
}