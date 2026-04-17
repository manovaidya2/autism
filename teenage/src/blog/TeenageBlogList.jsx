import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";

export default function TeenageBlogList() {
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
  const [redirecting, setRedirecting] = useState(false);

  // Payment page URL
  const PAYMENT_URL = "https://rzp.io/rzp/ZQr39j1";

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
        
        console.log("Fetched teenage blogs:", allBlogs);
        setBlogs(allBlogs);

        const uniqueCategories = [
          ...new Set(allBlogs.map((b) => b?.category).filter(cat => cat && cat !== ""))
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching teenage blogs", error);
        setBlogs([]);
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

  // Function to redirect to payment page
  const redirectToPayment = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = PAYMENT_URL;
    }, 1500);
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
      const response = await axiosInstance.post("/teenage/contact/create", formData);

      if (response.data.success) {
        setIsSubmitted(true);
        
        localStorage.setItem("teenBlogFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
          submittedAt: new Date().toISOString()
        }));
        
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });

        setTimeout(() => {
          redirectToPayment();
        }, 2000);
      } else {
        setSubmitError(response.data.message || "Failed to submit form.");
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      
      if (err.response) {
        setSubmitError(err.response.data.message || "Server error. Please try again.");
      } else if (err.request) {
        setSubmitError("No response from server. Please check your connection.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter by category
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((b) => b?.category === selectedCategory);

  // Search filter
  const searchedBlogs = filteredBlogs.filter((b) =>
    b?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b?.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
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
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
            alt="Teenagers learning and growing"
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
                    Teenage Resources & Articles
                  </div>
                  <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                    Teen Health & Wellness
                    <span className="block text-blue-200">
                      Empowering Young Minds
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-white/90 mb-5 max-w-xl">
                    Discover articles on mental health, study tips, relationships, 
                    and personal growth specially curated for teenagers.
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

              {/* Right Side - Compact Contact Form (2 fields per row) */}
              <div className="lg:w-96 xl:w-[450px] w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5">
                  <div className="mb-4 text-center">
                    <h2 className="text-xl font-bold text-slate-800">Get Help for Your Teen</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill the form and proceed to payment
                    </p>
                  </div>

                  {/* Success Message with Redirect Info */}
                  {isSubmitted && !redirecting && (
                    <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <p className="text-emerald-700 text-[11px]">Form submitted! Redirecting to payment...</p>
                      </div>
                      <div className="mt-1.5 w-full bg-emerald-200 rounded-full h-0.5 overflow-hidden">
                        <div className="bg-emerald-600 h-0.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}

                  {/* Redirecting Message */}
                  {redirecting && (
                    <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-blue-600"></div>
                        <p className="text-blue-700 text-[11px]">Redirecting to payment gateway...</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    {/* Row 1: Full Name + Email */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-0.5 block text-left text-[10px] font-medium text-slate-700">Full Name *</label>
                        <div className="relative">
                          <User className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={isSubmitting || redirecting}
                            placeholder="Full name"
                            className={`w-full rounded-lg border pl-7 pr-2 py-1.5 text-[11px] outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.fullName ? "border-red-400 bg-red-50" : "border-slate-300"
                            } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {errors.fullName && <p className="mt-0.5 text-left text-[9px] text-red-500">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="mb-0.5 block text-left text-[10px] font-medium text-slate-700">Email *</label>
                        <div className="relative">
                          <Mail className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting || redirecting}
                            placeholder="Email"
                            className={`w-full rounded-lg border pl-7 pr-2 py-1.5 text-[11px] outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? "border-red-400 bg-red-50" : "border-slate-300"
                            } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {errors.email && <p className="mt-0.5 text-left text-[9px] text-red-500">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: Phone + Address */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-0.5 block text-left text-[10px] font-medium text-slate-700">Phone *</label>
                        <div className="relative">
                          <Phone className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting || redirecting}
                            placeholder="Phone"
                            className={`w-full rounded-lg border pl-7 pr-2 py-1.5 text-[11px] outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? "border-red-400 bg-red-50" : "border-slate-300"
                            } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {errors.phone && <p className="mt-0.5 text-left text-[9px] text-red-500">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="mb-0.5 block text-left text-[10px] font-medium text-slate-700">Address *</label>
                        <div className="relative">
                          <MapPin className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={isSubmitting || redirecting}
                            placeholder="Address"
                            className={`w-full rounded-lg border pl-7 pr-2 py-1.5 text-[11px] outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.address ? "border-red-400 bg-red-50" : "border-slate-300"
                            } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {errors.address && <p className="mt-0.5 text-left text-[9px] text-red-500">{errors.address}</p>}
                      </div>
                    </div>

                    {/* Row 3: Message - Full Width */}
                    <div>
                      <label className="mb-0.5 block text-left text-[10px] font-medium text-slate-700">Message *</label>
                      <div className="relative">
                        <FileText className="w-3 h-3 absolute left-2 top-2 text-slate-400" />
                        <textarea
                          name="message"
                          rows="2"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting || redirecting}
                          placeholder="Tell us about your teen's challenges..."
                          className={`w-full rounded-lg border pl-7 pr-2 py-1.5 text-[11px] outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                            errors.message ? "border-red-400 bg-red-50" : "border-slate-300"
                          } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                        />
                      </div>
                      {errors.message && <p className="mt-0.5 text-left text-[9px] text-red-500">{errors.message}</p>}
                    </div>

                    {/* Payment Info Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5">
                      <p className="text-[9px] text-blue-800 text-center">
                        <span className="font-semibold">Note:</span> After submitting, you will be redirected to secure payment page.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || redirecting}
                      className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 text-[11px] font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : redirecting ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          <span>Redirecting to Payment...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          Submit & Proceed to Payment
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust Badge */}
                  <div className="mt-3 pt-2 border-t border-slate-200">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-1.5 text-center">
                      <p className="text-[9px] text-slate-600">
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
            Featured Articles for Teens
          </h2>

          {/* Categories */}
          {categories.length > 0 && (
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
          )}

          {/* Grid */}
          {searchedBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">No articles found.</p>
              {blogs.length === 0 && (
                <p className="text-gray-400 text-sm mt-2">
                  Check back soon for new content!
                </p>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {searchedBlogs.map((blog) => (
                <Link
                  key={blog._id || blog.id}
                  to={`/blog/${blog.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">
                    {blog.category || "Teen Health"}
                  </span>
                  <h3 className="mt-3 font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-medium text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {blog.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-[11px] text-gray-500">
                    <span className="font-medium">
                      {blog.date ? new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "Recent"}
                    </span>
                    <span className="font-medium">{blog.views || "0"} views</span>
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