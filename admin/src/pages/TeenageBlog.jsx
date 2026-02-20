import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function TeenageBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if editorRef.current exists
    if (!editorRef.current) {
      setMessage({ type: "error", text: "Editor not initialized" });
      return;
    }

    const htmlContent = editorRef.current.innerHTML;
    const blogData = { ...formData, content: htmlContent };

    // Validate required fields
    if (!blogData.title || !blogData.slug || !blogData.content) {
      setMessage({ type: "error", text: "Title, Slug and Content are required" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axiosInstance.post("/teenage-blogs", blogData);
      
      if (response.data.success) {
        setMessage({ type: "success", text: "Blog saved successfully!" });

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
        
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to save blog" });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      
      if (error.code === 'ERR_NETWORK') {
        setMessage({ type: "error", text: "Network error. Please check if backend server is running." });
      } else if (error.response?.status === 409) {
        setMessage({ type: "error", text: "Blog with this slug already exists. Please change the title." });
      } else {
        setMessage({ type: "error", text: error.response?.data?.message || "Server error. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Teenage Blog Creator
          </h1>
          <p className="text-gray-600 text-lg">Share your thoughts and experiences with the world</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-green-100 border-l-4 border-green-500 text-green-700' 
              : 'bg-red-100 border-l-4 border-red-500 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Input */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter an engaging title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Slug (Auto-generated) */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="url-friendly-text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from title, but you can edit</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Select Category</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Technology">Technology</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Career">Career</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publication Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Write a brief description of your blog..."
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </div>

            {/* Main Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-48 h-32 object-cover rounded-xl shadow-md border-2 border-purple-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Rich Text Editor Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Blog Content *</h2>
            
            {/* Editor Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-4">
              <button type="button" onClick={() => formatText("bold")} className="toolbar-btn font-bold">B</button>
              <button type="button" onClick={() => formatText("italic")} className="toolbar-btn italic">I</button>
              <button type="button" onClick={() => formatText("underline")} className="toolbar-btn underline">U</button>
              <span className="w-px h-6 bg-gray-300 mx-1"></span>
              
              <button type="button" onClick={() => formatText("justifyLeft")} className="toolbar-btn">L</button>
              <button type="button" onClick={() => formatText("justifyCenter")} className="toolbar-btn">C</button>
              <button type="button" onClick={() => formatText("justifyRight")} className="toolbar-btn">R</button>
              <span className="w-px h-6 bg-gray-300 mx-1"></span>
              
              <button type="button" onClick={() => formatText("insertUnorderedList")} className="toolbar-btn">• List</button>
              <button type="button" onClick={() => formatText("insertOrderedList")} className="toolbar-btn">1. List</button>
              
              <select onChange={(e) => formatText("fontSize", e.target.value)} className="toolbar-select">
                <option value="">Size</option>
                <option value="2">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
              </select>
              
              <select onChange={(e) => formatText("formatBlock", e.target.value)} className="toolbar-select">
                <option value="">Heading</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="p">Paragraph</option>
              </select>
              
              <input type="color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer" title="Text Color"/>
              <input type="color" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer" title="Highlight"/>
              
              <button type="button" onClick={() => { const url = prompt("Enter URL:"); if(url) formatText("createLink", url); }} className="toolbar-btn">🔗</button>
              
              <button type="button" onClick={() => editorFileRef.current.click()} className="toolbar-btn">🖼️</button>
              <input type="file" accept="image/*" ref={editorFileRef} onChange={handleEditorImageUpload} className="hidden"/>
              
              <button type="button" onClick={() => formatText("undo")} className="toolbar-btn">↩️</button>
              <button type="button" onClick={() => formatText("redo")} className="toolbar-btn">↪️</button>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[400px] p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
              style={{ whiteSpace: "pre-wrap" }}
            ></div>
            <p className="text-sm text-gray-500 mt-2">Start writing your blog content here...</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .toolbar-btn {
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 2.5rem;
        }
        .toolbar-btn:hover {
          background: #f3e8ff;
          border-color: #c084fc;
          transform: translateY(-1px);
        }
        .toolbar-select {
          padding: 0.5rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .toolbar-select:hover {
          border-color: #c084fc;
        }
        div[contenteditable="true"] {
          background: white;
          line-height: 1.6;
        }
        div[contenteditable="true"]:empty:before {
          content: "Write your blog content here...";
          color: #9ca3af;
        }
        div[contenteditable="true"] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        div[contenteditable="true"] ul, 
        div[contenteditable="true"] ol {
          padding-left: 2rem;
          margin: 0.5rem 0;
        }
        div[contenteditable="true"] ul { list-style-type: disc; }
        div[contenteditable="true"] ol { list-style-type: decimal; }
      `}</style>
    </div>
  );
}