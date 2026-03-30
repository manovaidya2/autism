import React, { useRef, useState, useEffect } from "react";

export default function BlogAdmin() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [tagInput, setTagInput] = useState("");
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    content: "",
    authorName: "",
    views: 0,
    tags: []
  });

  const [message, setMessage] = useState("");

  // 🔥 Load from localStorage
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  // 🔥 Auto slug
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

  // ✅ TAG ADD
  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput]
      });
      setTagInput("");
    }
  };

  // ✅ TAG REMOVE
  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  // Editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      formatText("insertImage", event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // ✅ SAVE BLOG (LOCAL STORAGE)
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = editorRef.current.innerHTML;

    if (!formData.title || !content) {
      setMessage("Title & Content required");
      return;
    }

    const newBlog = {
      ...formData,
      content,
      id: Date.now()
    };

    const updatedBlogs = [newBlog, ...blogs];

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);

    setMessage("✅ Blog Saved Locally");

    // Reset
    setFormData({
      title: "",
      slug: "",
      category: "",
      date: "",
      image: "",
      shortDescription: "",
      content: "",
      authorName: "",
      views: 0,
      tags: []
    });

    editorRef.current.innerHTML = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          Blog Admin Panel (Frontend Only)
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 rounded">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="grid md:grid-cols-2 gap-4">

              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input" />
              <input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" className="input" />
              <input name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Author Name" className="input" />
              <input name="views" type="number" value={formData.views} onChange={handleChange} placeholder="Views" className="input" />

              <select name="category" value={formData.category} onChange={handleChange} className="input">
                <option value="">Category</option>
                <option>Scholarships</option>
                <option>Study Abroad</option>
                <option>Visa Guide</option>
                <option>Career</option>
              </select>

              <input type="date" name="date" value={formData.date} onChange={handleChange} className="input" />

            </div>

            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short Description"
              className="input mt-4"
            />

            <input type="file" onChange={handleMainImageUpload} className="mt-4" />

            {formData.image && (
              <img src={formData.image} className="w-40 mt-3 rounded" />
            )}
          </div>

          {/* TAGS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Tags</h3>

            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
                className="input flex-1"
              />
              <button type="button" onClick={handleAddTag} className="btn">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, i) => (
                <span key={i} className="tag">
                  #{tag}
                  <button onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* EDITOR */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="toolbar mb-3">
              <button type="button" onClick={() => formatText("bold")}>B</button>
              <button type="button" onClick={() => formatText("italic")}>I</button>
              <button type="button" onClick={() => formatText("underline")}>U</button>
              <button type="button" onClick={() => editorFileRef.current.click()}>IMG</button>
              <input type="file" hidden ref={editorFileRef} onChange={handleEditorImageUpload}/>
            </div>

            <div
              ref={editorRef}
              contentEditable
              className="border p-4 min-h-[300px] rounded"
            ></div>
          </div>

          <button className="btn-primary w-full">
            Publish Blog
          </button>
        </form>

        {/* 🔥 SAVED BLOG LIST */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Saved Blogs</h2>

          {blogs.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded mb-3 shadow">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.shortDescription}</p>
              <div className="text-xs mt-1">Views: {b.views}</div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .btn {
          background: #2563eb;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
        }
        .btn-primary {
          background: #1d4ed8;
          color: white;
          padding: 12px;
          border-radius: 10px;
        }
        .tag {
          background: #e0f2fe;
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          gap: 5px;
        }
      `}</style>
    </div>
  );
}