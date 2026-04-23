import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function FinalCTASection() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
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
      const response = await axiosInstance.post("/adult-contact/create", formData);

      if (response.data.success || response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        
        // Store form data in localStorage for payment page if needed
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

        // Redirect to payment link after successful submission
        setTimeout(() => {
          window.location.href = "https://rzp.io/rzp/ZQr39j1";
        }, 1500); // 1.5 second delay to show success message
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

  return (
    <>
      <section className="bg-gradient-to-r from-[#2b3446] to-[#1f2735] py-10 text-center text-white">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="max-w-[700px] mx-auto lg:mx-0">
                {/* Heading */}
                <h2 className="text-[36px] font-extrabold leading-tight mb-6">
                  Every Day Matters for Your Mental Health
                </h2>

                {/* Subtext */}
                <p className="text-[18px] text-white/80 leading-relaxed mb-4">
                  Chronic stress, anxiety, and burnout don't improve with time alone. 
                  The sooner you address the root cause, the faster you can reclaim your energy, focus, and peace of mind.
                </p>

                <p className="text-[16px] text-white/70 mb-12">
                  Take the first step today — with a free consultation or a no-obligation assessment with our care team.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-10">
                  
                  {/* Primary */}
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#6b8df6] hover:bg-[#5a7df0] text-white px-7 py-4 rounded-[14px] text-[16px] font-semibold shadow-lg transition"
                  >
                    <FaCalendarAlt className="text-[16px]" />
                    Book Free Consultation
                  </button>

                  {/* Secondary */}
                  <a
                    href="https://manovaidya.com/Pages/mind-health"
                    className="w-full sm:w-auto inline-block bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
                  >
                    → Take Free Assessment
                  </a>
                </div>

                {/* Disclaimer */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[13px] text-white/60 max-w-[700px] mx-auto lg:mx-0">
                  <IoWarningOutline className="text-yellow-400 text-[16px] shrink-0" />
                  <p className="text-left">
                    Manovaidya programs are not a replacement for emergency care. If you are experiencing a medical emergency, please seek urgent medical attention immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form with Left Aligned Labels */}
            <div className="lg:w-96 xl:w-[400px] w-full">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
                <div className="mb-4 text-left">
                  <h2 className="text-2xl font-bold text-slate-800">Book Free Consultation</h2>
                  <p className="text-sm text-slate-500 mt-1">
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
                  <div>
                    <label className="mb-1 block text-left text-xs font-medium text-slate-700">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={`w-full text-black rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.fullName ? "border-red-400 bg-red-50" : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-left text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-left text-xs font-medium text-slate-700">Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className={`w-full text-black rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-400 bg-red-50" : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-left text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-left text-xs font-medium text-slate-700">Phone *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className={`w-full text-black rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? "border-red-400 bg-red-50" : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-left text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-left text-xs font-medium text-slate-700">Address *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className={`w-full text-black rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? "border-red-400 bg-red-50" : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-left text-xs text-red-500">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-left text-xs font-medium text-slate-700">Message *</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your symptoms, struggles, or concerns..."
                        className={`w-full text-black rounded-lg border pl-10 pr-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                          errors.message ? "border-red-400 bg-red-50" : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.message && <p className="mt-1 text-left text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit & Proceed to Payment
                      </>
                    )}
                  </button>
                </form>

                {/* Trust Badge */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 text-center">
                    <p className="text-[11px] text-slate-600">
                      🔒 Your information is secure. No spam, guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Modal */}
      {(isSubmitted || submitError) && !isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
            {submitError && (
              <>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Something Went Wrong</h3>
                <p className="text-slate-600 mb-4">{submitError}</p>
                <button
                  onClick={() => setSubmitError("")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}