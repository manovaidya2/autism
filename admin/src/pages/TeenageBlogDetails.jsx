import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function TeenageBlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/teenage-blogs/${slug}`);
        setBlog(res.data.data);
        
        // Fetch related blogs (same category)
        if (res.data.data.category) {
          const relatedRes = await axiosInstance.get("/teenage-blogs");
          const related = relatedRes.data.data
            .filter(b => b.category === res.data.data.category && b.slug !== slug)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (error) {
        console.error("Blog not found", error);
        setError("Blog not found. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading your story...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || "Blog not found"}</p>
          <button
            onClick={() => navigate('/teenage-blogs')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Browse All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section with Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={blog.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/teenage-blogs')}
          className="absolute top-6 left-6 z-10 flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            {blog.category && (
              <span className="inline-block px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold mb-4">
                {blog.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-sm text-gray-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {blog.date ? new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Date not specified'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Short Description */}
        {blog.shortDescription && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-purple-400">
            <p className="text-lg text-gray-700 italic">
              "{blog.shortDescription}"
            </p>
          </div>
        )}

        {/* Main Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this story</h3>
          <div className="flex space-x-4">
            <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.912-12.3c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map(related => (
                <Link
                  key={related._id}
                  to={`/teenage-blog/${related.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={related.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300"}
                    alt={related.title}
                    className="h-40 w-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/teenage-blogs')}
            className="flex items-center text-purple-600 hover:text-purple-700 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Browse All Blogs
          </button>
        </div>
      </div>

      {/* Styles for blog content */}
      <style jsx>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #1f2937;
        }
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #1f2937;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #1f2937;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #c084fc;
          background: #f9fafb;
          padding: 1rem 2rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}