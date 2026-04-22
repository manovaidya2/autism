import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaBookOpen } from "react-icons/fa";


export default function ResourcesSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs?limit=6");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#f6f8fc] py-10">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        
        {/* Title */}
        <h2 className="text-[34px] font-extrabold text-[#1f2b3f] mb-3">
          Expert Resources for Parents
        </h2>

        {/* Subtitle */}
        <p className="text-[15px] text-[#6b7a90] max-w-[700px] mx-auto mb-12">
          In-depth guides, research-backed articles, and practical strategies to support your child's development journey.
        </p>

        {/* Loader */}
        {loading ? (
          <p className="text-center">Loading resources...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 text-left">
            
            {blogs.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-[#e3e8f3] rounded-[18px] p-6 shadow-sm hover:shadow-md transition"
              >
                
                {/* Tag */}
                <span className="inline-block bg-[#eef3ff] text-[#5b7cff] text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
                  {item.category || "General"}
                </span>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-[#1f2b3f] mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-[#6b7a90] leading-relaxed mb-4 line-clamp-3">
                  {item.shortDescription}
                </p>

                {/* CTA */}
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

        {/* Bottom Button */}
        <div className="mt-12">
  <Link
    to="/blog"
    className="border border-[#cfd7f6] text-[#5b7cff] px-6 py-3 rounded-full text-[14px] hover:bg-[#eef3ff] transition inline-flex items-center gap-2"
  >
    <FaBookOpen />
    View All Articles
  </Link>
</div>

      </div>
    </section>
  );
}