import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaBookOpen } from "react-icons/fa";

export default function ResourcesSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/teenage-blogs");

        let allBlogs = [];
        if (Array.isArray(res.data)) {
          allBlogs = res.data;
        } else if (res.data && res.data.success) {
          allBlogs = res.data.data || [];
        } else {
          allBlogs = [];
        }

        setHasMore(allBlogs.length > 9);
        setBlogs(allBlogs.slice(0, 9));
      } catch (error) {
        console.error("Error fetching teenage blogs", error);
        setBlogs([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#f6f8fc] py-10">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="text-[34px] font-extrabold text-[#1f2b3f] mb-3">
          Expert Resources for Parents
        </h2>

        <p className="text-[15px] text-[#6b7a90] max-w-[700px] mx-auto mb-12">
          In-depth guides, research-backed articles, and practical strategies to
          support your child's development journey.
        </p>

        {loading ? (
          <p className="text-center">Loading resources...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No resources found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 text-left">
            {blogs.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white border border-[#e3e8f3] rounded-[18px] p-6 shadow-sm hover:shadow-md transition"
              >
                <span className="inline-block bg-[#eef3ff] text-[#5b7cff] text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
                  {item.category || "General"}
                </span>

                <h3 className="text-[16px] font-bold text-[#1f2b3f] mb-3 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-[14px] text-[#6b7a90] leading-relaxed mb-4 line-clamp-3">
                  {item.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[12px] text-gray-500 mb-4">
                  <span>
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Recent"}
                  </span>
                  <span>{item.views || 0} views</span>
                </div>

                <Link
                  to={`/blog/${item.slug}`}
                  className="text-[#5b7cff] text-[14px] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          {hasMore ? (
            <Link
              to="/blog"
              className="border border-[#cfd7f6] text-[#5b7cff] px-6 py-3 rounded-full text-[14px] hover:bg-[#eef3ff] transition inline-flex items-center gap-2"
            >
              <FaBookOpen />
              View More
            </Link>
          ) : (
            <Link
              to="/blog"
              className="border border-[#cfd7f6] text-[#5b7cff] px-6 py-3 rounded-full text-[14px] hover:bg-[#eef3ff] transition inline-flex items-center gap-2"
            >
              <FaBookOpen />
              View All Articles
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}