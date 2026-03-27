import React, { useRef, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminAddBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    content: "",
  });

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FAQ handlers
  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Editor image upload
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      formatText("insertImage", base64);
    };
    reader.readAsDataURL(file);
  };

  // Main blog image upload with preview
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setFormData({ ...formData, title, slug });
  };

  // Submit blog to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!formData.slug.trim()) {
      alert("Please enter a slug");
      return;
    }
    if (!formData.author.trim()) {
      alert("Please enter author name");
      return;
    }
    
    setIsSubmitting(true);
    
    const htmlContent = editorRef.current.innerHTML;
    
    // Filter out empty FAQs and ensure proper structure
    const filteredFaqs = faqs.filter(faq => 
      faq.question.trim() !== "" && faq.answer.trim() !== ""
    );
    
    const blogData = { 
      ...formData, 
      content: htmlContent,
      faqs: filteredFaqs
    };
    
    console.log("Submitting blog data:", blogData); // Debug log

    try {
      const response = await axiosInstance.post("/blogs", blogData);
      console.log("Response:", response.data); // Debug log
      
      if (response.data.success) {
        alert("Blog saved successfully!");

        // Reset form
        setFormData({
          title: "",
          slug: "",
          author: "",
          category: "",
          date: "",
          image: "",
          shortDescription: "",
          content: "",
        });
        setFaqs([{ question: "", answer: "" }]);
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      } else {
        alert(response.data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      
      // Show detailed error message
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title with auto slug generation */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            type="text"
            name="slug"
            placeholder="Slug (URL) - Auto-generated from title"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Main Blog Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-48 h-auto rounded-lg"
              />
            )}
          </div>

          {/* FAQ Section */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">FAQs</h2>
              <button
                type="button"
                onClick={addFaq}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                + Add FAQ
              </button>
            </div>

            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-700">FAQ #{index + 1}</h3>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50">
            <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
            <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
            <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
            <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>
            <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
            <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
            <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
            <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>
            <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet List</button>
            <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Numbered List</button>
            
            <select onChange={(e) => formatText("fontSize", e.target.value)} className="editor-select">
              <option value="">Font Size</option>
              <option value="2">Small</option>
              <option value="3">Normal</option>
              <option value="5">Large</option>
              <option value="6">X-Large</option>
            </select>

            <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
              <option value="">Heading</option>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="p">Paragraph</option>
            </select>

            <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-10 h-8 rounded border"/>
            <input type="color" title="Highlight" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-10 h-8 rounded border"/>
            
            <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Insert Link</button>
            
            <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn">Upload Image</button>
            <input type="file" accept="image/*" ref={editorFileRef} onChange={handleEditorImageUpload} className="hidden" />
            
            <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
            <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
            <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
          </div>

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[300px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            suppressContentEditableWarning={true}
            style={{ whiteSpace: "pre-wrap" }}
          ></div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>

      <style>
        {`
          .editor-btn {
            padding: 6px 10px;
            font-weight: 600;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
          }
          .editor-btn:hover { background: #ecfdf5; }
          .editor-select {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            cursor: pointer;
            background: white;
          }
          div[contenteditable="true"] ul { list-style-type: disc; padding-left: 1.5rem; }
          div[contenteditable="true"] ol { list-style-type: decimal; padding-left: 1.5rem; }
        `}
      </style>
    </section>
  );
}