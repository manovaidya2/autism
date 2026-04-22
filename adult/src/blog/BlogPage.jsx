import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/adultblog");
        const allBlogs = res.data;
        setBlogs(allBlogs);

        const uniqueCategories = [...new Set(allBlogs.map((b) => b.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching adult blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\+\(\)\-]{8,}$/.test(formData.phone)) newErrors.phone = "Valid phone number required";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await axiosInstance.post("/mental-health/consultation/create", formData);

      if (response.data.success || response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        
        localStorage.setItem("consultationFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }));
        
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });

        setTimeout(() => {
          window.location.href = "https://rzp.io/rzp/mentalhealthsupport";
        }, 1500);
      } else {
        setSubmitError(response.data.message || "Failed to submit form.");
      }
    } catch (err) {
      if (err.response) {
        setSubmitError(err.response.data.message || "Server error. Please try again.");
      } else if (err.request) {
        setSubmitError("No response from server. Please check your connection.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter by category
  const filteredBlogs = selectedCategory === "all"
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  // Search filter
  const searchedBlogs = filteredBlogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.shortDescription && b.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Hero Section with Background Image and Form */}
      <section className="relative mb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Mental health and wellness"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              
              {/* Left Side - Text Content */}
              <div className="flex-1">
                <div className="max-w-2xl">
                  <div className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-white/90 backdrop-blur-sm rounded-full mb-3 shadow-sm">
                    Mental Health Resources
                  </div>

                  <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                    Adult Mental Health
                    <span className="block text-blue-200">
                      Insights & Guidance
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-white/90 mb-5 max-w-xl">
                    Explore science-backed articles on stress management, anxiety relief, burnout recovery, 
                    and practical strategies for better mental well-being.
                  </p>

                  <div className="max-w-md">
                    <div className="relative">
                      <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg bg-white/95 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="lg:w-96 xl:w-[450px] w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5">
                  <div className="mb-4 text-center">
                    <h2 className="text-xl font-bold text-slate-800">Get Expert Guidance</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill the form and proceed to payment
                    </p>
                  </div>

                  {isSubmitted && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Form submitted! Redirecting to payment...</span>
                    </div>
                  )}

                  {submitError && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-left text-xs font-medium text-slate-700">Full Name *</label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full name"
                            className={`w-full rounded-lg border pl-8 pr-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.fullName ? "border-red-400 bg-red-50" : "border-slate-300"
                            }`}
                          />
                        </div>
                        {errors.fullName && <p className="mt-0.5 text-left text-[10px] text-red-500">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="mb-1 block text-left text-xs font-medium text-slate-700">Email *</label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`w-full rounded-lg border pl-8 pr-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? "border-red-400 bg-red-50" : "border-slate-300"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="mt-0.5 text-left text-[10px] text-red-500">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-left text-xs font-medium text-slate-700">Phone *</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className={`w-full rounded-lg border pl-8 pr-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? "border-red-400 bg-red-50" : "border-slate-300"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="mt-0.5 text-left text-[10px] text-red-500">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="mb-1 block text-left text-xs font-medium text-slate-700">Address *</label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className={`w-full rounded-lg border pl-8 pr-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.address ? "border-red-400 bg-red-50" : "border-slate-300"
                            }`}
                          />
                        </div>
                        {errors.address && <p className="mt-0.5 text-left text-[10px] text-red-500">{errors.address}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-left text-xs font-medium text-slate-700">Message *</label>
                      <div className="relative">
                        <FileText className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                        <textarea
                          name="message"
                          rows="2"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your symptoms or concerns..."
                          className={`w-full rounded-lg border pl-8 pr-2 py-1.5 text-xs outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                            errors.message ? "border-red-400 bg-red-50" : "border-slate-300"
                          }`}
                        />
                      </div>
                      {errors.message && <p className="mt-0.5 text-left text-[10px] text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Submit & Proceed to Payment
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-3 pt-2 border-t border-slate-200">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-1.5 text-center">
                      <p className="text-[10px] text-slate-600">
                        🔒 Your information is secure. No spam, guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Featured Articles
          </h2>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>

            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {searchedBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">No articles found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {searchedBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/adult-blog/${blog.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">
                    {blog.category}
                  </span>

                  <h3 className="mt-3 font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-medium text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {blog.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mt-4 text-[11px] text-gray-500">
                    <span className="font-medium">
                      {new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="font-medium">
                      {Math.ceil((blog.content?.length || 0) / 1000)} min read
                    </span>
                  </div>

                  <div className="text-medium text-blue-600 mt-3 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Read article <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}