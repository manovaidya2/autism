import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const img =
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading blogs...</p>;
  }

  return (
    <div className="bg-gray-50">
      {/* Hero */}
     <section
  className="
    relative 
    h-36 sm:h-44 md:h-50 
    bg-cover bg-center 
    flex items-center justify-center
  "
  style={{ backgroundImage: `url(${img})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-[#1d5a57]/70"></div>

  {/* Text */}
  <div className="relative text-center text-white px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      BLOGS & ARTICLES
    </h1>
  </div>
</section>


      {/* Blog Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-sm text-purple-600 font-medium">
                  {blog.category}
                </span>

                <h2 className="text-xl font-semibold mt-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mt-3">
                  {blog.shortDescription}
                </p>

                <div className="flex justify-between mt-6">
                  <span className="text-xs text-gray-400">
                    {new Date(blog.date).toDateString()}
                  </span>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
