import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-600 text-lg">
        Loading blog...
      </p>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 mb-3">Blog not found</p>
        <Link to="/blog" className="text-green-700 underline font-medium">
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-[#f9faf7] px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-block text-green-700 font-semibold mb-5"
        >
          ← Back to Blog
        </Link>

        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover rounded-2xl"
        />

        {/* Content Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mt-6 md:-mt-20 relative shadow-sm">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Published on {new Date(blog.date).toDateString()}
          </p>

          {/* Blog Content */}
          <div
            className="prose prose-base sm:prose-lg max-w-none mt-6
                       prose-img:rounded-xl
                       prose-headings:text-gray-800
                       prose-p:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </section>
  );
}
