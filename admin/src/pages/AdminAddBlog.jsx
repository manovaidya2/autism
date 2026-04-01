import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function BlogAdmin() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [posts, setPosts] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    authorName: "",
    views: "",
    tags: [],
    content: ""
  });

  // Load existing posts from localStorage or API
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      // Try to fetch from API first
      const response = await axiosInstance.get("/blogs");
      if (response.data && response.data.success) {
        setPosts(response.data.data || []);
      }
    } catch (error) {
      // Fallback to localStorage
      const storedPosts = localStorage.getItem("blog_posts_admin");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        // Sample data
        const samplePosts = [
          {
            id: 1,
            title: "How to Get Full Scholarship in USA",
            shortDescription: "Complete guide to securing fully-funded scholarships at top American universities.",
            category: "Scholarships",
            authorName: "Priya Sharma",
            date: "Mar 10, 2026",
            views: "1.8k",
            tags: ["Scholarship", "USA", "Financial Aid"]
          },
          {
            id: 2,
            title: "Top 10 Universities in Canada for 2026",
            shortDescription: "Discover the best Canadian universities for international students.",
            category: "Study Abroad",
            authorName: "Michael Chen",
            date: "Mar 8, 2026",
            views: "2.3k",
            tags: ["Canada", "Universities", "Study Abroad"]
          }
        ];
        setPosts(samplePosts);
        localStorage.setItem("blog_posts_admin", JSON.stringify(samplePosts));
      }
    }
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TAG MANAGEMENT
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

  // RICH TEXT EDITOR FUNCTIONS (same as AdminAddBlog)
  const formatText = (command, value = null) => {
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

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Edit existing post
  const handleEditPost = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "",
      date: post.date || "",
      image: post.image || "",
      shortDescription: post.shortDescription || "",
      authorName: post.authorName || "",
      views: post.views || "",
      tags: post.tags || [],
      content: post.content || ""
    });
    
    if (editorRef.current) {
      editorRef.current.innerHTML = post.content || "";
    }
    
    setMessage("");
  };

  // Delete post
  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axiosInstance.delete(`/blogs/${id}`);
        setPosts(posts.filter(post => post.id !== id));
        setMessage("✅ Post deleted successfully");
      } catch (error) {
        // Local delete
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("blog_posts_admin", JSON.stringify(updatedPosts));
        setMessage("✅ Post deleted successfully");
      }
    }
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      image: "",
      shortDescription: "",
      authorName: "",
      views: "0",
      tags: [],
      content: ""
    });
    setTagInput("");
    setEditingId(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setMessage("");
  };

  // SUBMIT BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    const htmlContent = editorRef.current.innerHTML;

    if (!formData.title.trim()) {
      setMessage("❌ Title is required");
      return;
    }
    if (!htmlContent || htmlContent === "<br>") {
      setMessage("❌ Content is required");
      return;
    }

    setIsSubmitting(true);

    const blogData = {
      ...formData,
      content: htmlContent,
      id: editingId || Date.now()
    };

    try {
      if (editingId) {
        // Update existing post
        await axiosInstance.put(`/blogs/${editingId}`, blogData);
        setPosts(posts.map(post => post.id === editingId ? blogData : post));
        setMessage("✅ Blog updated successfully!");
      } else {
        // Create new post
        const response = await axiosInstance.post("/blogs", blogData);
        if (response.data && response.data.success) {
          setPosts([blogData, ...posts]);
          setMessage("✅ Blog published successfully!");
        } else {
          // Fallback to localStorage
          setPosts([blogData, ...posts]);
          localStorage.setItem("blog_posts_admin", JSON.stringify([blogData, ...posts]));
          setMessage("✅ Blog saved locally!");
        }
      }

      resetForm();
    } catch (error) {
      console.error("Error:", error);
      // Fallback to localStorage
      if (editingId) {
        setPosts(posts.map(post => post.id === editingId ? blogData : post));
      } else {
        setPosts([blogData, ...posts]);
      }
      localStorage.setItem("blog_posts_admin", JSON.stringify(
        editingId ? posts.map(post => post.id === editingId ? blogData : post) : [blogData, ...posts]
      ));
      setMessage(`✅ Blog ${editingId ? "updated" : "saved"} locally!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Blog Admin Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => { resetForm(); setEditingId(null); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition flex items-center gap-2"
            >
              <i className="fas fa-plus"></i> New Post
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-xl border border-green-200 flex items-center gap-2">
            <i className="fas fa-check-circle"></i> {message}
          </div>
        )}

        {/* MAIN FORM */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <i className="fas fa-pen-fancy text-blue-600"></i>
            {editingId ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title with auto slug */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Author, Category, Date, Views */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name *</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5"
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
                  placeholder="Enter category (e.g., Scholarships, Study Abroad)"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Mar 15, 2026"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Views</label>
                <input
                  type="text"
                  name="views"
                  value={formData.views}
                  onChange={handleChange}
                  placeholder="e.g., 1.2k"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5"
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
                placeholder="Brief summary of the blog post..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 resize-none"
              />
            </div>

            {/* Main Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
              )}
            </div>

            {/* TAGS EDITOR */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add a tag and press Enter"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gray-200 hover:bg-gray-300 px-4 rounded-xl transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* RICH TEXT EDITOR TOOLBAR */}
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
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <i className="fas fa-save"></i>
                {isSubmitting ? "Saving..." : editingId ? "Update Blog" : "Publish Blog"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Existing Posts Section - Moved below form */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-database text-blue-600"></i>
            Existing Posts ({posts.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8 col-span-full">No posts yet. Create your first blog!</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition group"
                >
                  <h4 className="font-semibold text-gray-800 line-clamp-2 text-base mb-2">{post.title}</h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><i className="fas fa-user"></i> {post.authorName || "Unknown"}</span>
                    <span className="flex items-center gap-1"><i className="fas fa-eye"></i> {post.views || "0"}</span>
                  </div>
                  {post.category && (
                    <div className="mt-2">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">📁 {post.category}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                    {post.tags?.length > 2 && <span className="text-[10px] text-gray-400">+{post.tags.length - 2}</span>}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="flex-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-1.5 rounded-lg flex items-center justify-center gap-1"
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="flex-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded-lg flex items-center justify-center gap-1"
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}