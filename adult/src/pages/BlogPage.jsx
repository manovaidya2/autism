import React, { useState } from "react";
import { Link } from "react-router-dom";

const blogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Understanding Autism & ADHD – Part ${i + 1}`,
  excerpt:
    "Learn how early diagnosis, therapy, and parental support can improve outcomes for children.",
  date: "Jan 2026",
  author: "Manovaidya Team",
  image:
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
}));

const BLOGS_PER_PAGE = 16;

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + BLOGS_PER_PAGE
  );

  return (
    <>
      {/* HERO / BREADCRUMB */}
    {/* HERO / BREADCRUMB */}
<div className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-6 text-center">
    <nav className="text-sm text-gray-500 mb-2 flex justify-center items-center">
      <Link to="/" className="hover:text-green-700">
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-900 font-medium">
        Blogs
      </span>
    </nav>

    <h1 className="text-2xl font-bold text-gray-900">
      Blogs & Articles
    </h1>
  </div>
</div>


      {/* BLOG LIST */}
      <section className="bg-[#fbfdfb] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-600 mb-12 max-w-2xl">
            Expert insights and practical guidance on Autism & ADHD care
            for parents and caregivers.
          </p>

          {/* BLOG GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-1">
                    {blog.date} · {blog.author}
                  </p>

                  <h2 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-green-700 text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-14">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm rounded-full border disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-9 w-9 rounded-full text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-green-700 text-white"
                    : "border text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm rounded-full border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
