import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function TeenageBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // FAQ States
  const [faqs, setFaqs] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [editingFaqIndex, setEditingFaqIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    authorName: "",
    views: "0",
    tags: [],
    content: ""
  });

  // Set default date on component mount
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

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

  // FAQ MANAGEMENT
  const handleAddFaq = () => {
    if (!faqQuestion.trim()) {
      alert("Please enter a question");
      return;
    }
    if (!faqAnswer.trim()) {
      alert("Please enter an answer");
      return;
    }

    if (editingFaqIndex !== null) {
      const updatedFaqs = [...faqs];
      updatedFaqs[editingFaqIndex] = {
        question: faqQuestion,
        answer: faqAnswer
      };
      setFaqs(updatedFaqs);
      setEditingFaqIndex(null);
      setMessage("✅ FAQ updated successfully!");
    } else {
      setFaqs([...faqs, {
        question: faqQuestion,
        answer: faqAnswer
      }]);
      setMessage("✅ FAQ added successfully!");
    }
    
    setFaqQuestion("");
    setFaqAnswer("");
    
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditFaq = (index) => {
    setFaqQuestion(faqs[index].question);
    setFaqAnswer(faqs[index].answer);
    setEditingFaqIndex(index);
  };

  const handleDeleteFaq = (index) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
      if (editingFaqIndex === index) {
        setEditingFaqIndex(null);
        setFaqQuestion("");
        setFaqAnswer("");
      }
      setMessage("✅ FAQ deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // RICH TEXT EDITOR FUNCTIONS
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

  // RESET FORM
  const resetForm = () => {
    const today = new Date().toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
    setFormData({
      title: "",
      slug: "",
      category: "",
      date: today,
      image: "",
      shortDescription: "",
      authorName: "",
      views: "0",
      tags: [],
      content: ""
    });
    setTagInput("");
    setFaqs([]);
    setFaqQuestion("");
    setFaqAnswer("");
    setEditingFaqIndex(null);
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
    if (!formData.authorName.trim()) {
      setMessage("❌ Author name is required");
      return;
    }
    if (!formData.category.trim()) {
      setMessage("❌ Category is required");
      return;
    }
    if (!htmlContent || htmlContent === "<br>") {
      setMessage("❌ Content is required");
      return;
    }

    setIsSubmitting(true);

    const blogData = {
      title: formData.title,
      slug: formData.slug,
      author: formData.authorName,
      category: formData.category,
      date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      image: formData.image,
      shortDescription: formData.shortDescription,
      content: htmlContent,
      tags: formData.tags,
      views: formData.views || "0",
      likes: 0,
      faqs: faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    };

    console.log("Submitting blog data:", blogData);

    try {
      const response = await axiosInstance.post("/teenage-blogs", blogData);
      if (response.data && response.data.success) {
        setMessage("✅ Teenage blog published successfully!");
        resetForm();
      } else {
        throw new Error(response.data.message || "Create failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Failed to create teenage blog post: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create Teenage Blog Post
          </h1>
          <p className="text-gray-600">Share valuable content for teenagers</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-xl border flex items-center gap-2 ${
            message.includes("✅") ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
          }`}>
            <i className={`fas ${message.includes("✅") ? "fa-check-circle" : "fa-exclamation-circle"}`}></i> {message}
          </div>
        )}

        {/* MAIN FORM */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <i className="fas fa-pen-fancy text-blue-600"></i>
            Create New Teenage Blog Post
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
                <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
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
                  placeholder="e.g., Teen Health, Study Tips"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Views</label>
                <input
                  type="text"
                  name="views"
                  value={formData.views}
                  onChange={handleChange}
                  placeholder="0"
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
              <p className="text-xs text-gray-500 mt-1">This will appear in blog listings</p>
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

            {/* FAQ SECTION */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <i className="fas fa-question-circle text-blue-600 mr-2"></i>
                Frequently Asked Questions (FAQs) - Optional
              </label>
              
              {/* Add/Edit FAQ Form */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="mb-3">
                  <input
                    type="text"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    placeholder="Question"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    placeholder="Answer"
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  {editingFaqIndex !== null ? "Update FAQ" : "Add FAQ"}
                </button>
                {editingFaqIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaqIndex(null);
                      setFaqQuestion("");
                      setFaqAnswer("");
                    }}
                    className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* FAQ List */}
              {faqs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Added FAQs ({faqs.length})</h4>
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">
                            <span className="text-blue-600">Q:</span> {faq.question}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            <span className="text-green-600">A:</span> {faq.answer}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            type="button"
                            onClick={() => handleEditFaq(index)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <p className="text-xs text-gray-500 mt-2">Tip: Use the toolbar above to format your content</p>
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
                {isSubmitting ? "Publishing..." : "Publish Teenage Blog"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Clear All
              </button>
            </div>
          </form>
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
      `}</style>
    </div>
  );
}