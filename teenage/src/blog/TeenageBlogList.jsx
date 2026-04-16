import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function TeenageBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/teenage-blogs");
        
        // Handle different response formats (matching admin component logic)
        let allBlogs = [];
        if (Array.isArray(res.data)) {
          allBlogs = res.data;
        } else if (res.data && res.data.success) {
          allBlogs = res.data.data || [];
        } else {
          allBlogs = [];
        }
        
        console.log("Fetched teenage blogs:", allBlogs);
        setBlogs(allBlogs);

        // Get unique categories safely
        const uniqueCategories = [
          ...new Set(allBlogs.map((b) => b?.category).filter(cat => cat && cat !== ""))
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching teenage blogs", error);
        setBlogs([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter by category
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((b) => b?.category === selectedCategory);

  // Search filter
  const searchedBlogs = filteredBlogs.filter((b) =>
    b?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Hero Section with Background Image */}
      <section className="relative mb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
            alt="Teenagers learning and growing"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-white/90 backdrop-blur-sm rounded-full mb-3 shadow-sm">
                Teenage Resources & Articles
              </div>
              <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                Teen Health & Wellness
                <span className="block text-blue-200">
                  Empowering Young Minds
                </span>
              </h1>
              <p className="text-sm sm:text-base text-white/90 mb-5 max-w-xl mx-auto">
                Discover articles on mental health, study tips, relationships, 
                and personal growth specially curated for teenagers.
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg bg-white/95 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Featured Articles for Teens
          </h2>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {searchedBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">No articles found.</p>
              {blogs.length === 0 && (
                <p className="text-gray-400 text-sm mt-2">
                  Check back soon for new content!
                </p>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {searchedBlogs.map((blog) => (
                <Link
                  key={blog._id || blog.id}
                 to={`/blog/${blog.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">
                    {blog.category || "Teen Health"}
                  </span>
                  <h3 className="mt-3 font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-medium text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {blog.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-[11px] text-gray-500">
                    <span className="font-medium">
                      {blog.date ? new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "Recent"}
                    </span>
                    <span className="font-medium">{blog.views || "0"} views</span>
                  </div>
                  <div className="text-medium text-blue-600 mt-3 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Read article <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}