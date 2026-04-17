import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function AssessmentSection() {
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

  const data = [
    {
      title: "Cognitive Delay Analysis",
      desc: "Understand the percentage of delay across key developmental domains",
    },
    {
      title: "Weak Area Identification",
      desc: "Pinpoint exactly which areas — speech, motor, social, sensory — need attention",
    },
    {
      title: "Improvement Potential Score",
      desc: "Based on your child's age, condition, and current level — how much improvement is possible",
    },
    {
      title: "Personalized Next Steps",
      desc: "A clear, actionable roadmap for what to do next — tailored to your child's specific needs",
    },
  ];

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
      const response = await axiosInstance.post("/autism/contact/create", formData);

      if (response.data.success || response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        
        // Store form data in localStorage for payment page if needed
        localStorage.setItem("assessmentFormData", JSON.stringify({
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
    <section className="bg-gradient-to-b from-[#5f8df6] to-[#4c75d9] py-8 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title */}
            <h2 className="text-[26px] sm:text-[40px] font-bold leading-snug sm:leading-tight mb-3 sm:mb-4 text-white">
              Discover Your Child's True{" "}
              <br className="hidden sm:block" />
              Developmental Level
            </h2>

            {/* Subtitle */}
            <p className="text-[14px] sm:text-[18px] text-white/90 max-w-[700px] mx-auto lg:mx-0 mb-3 sm:mb-4 leading-relaxed">
              Our comprehensive assessment gives you clarity on where your child stands and what's possible.
            </p>

            <p className="text-[13px] sm:text-[16px] text-white/80 mb-8 sm:mb-12">
              In just 5 minutes, you'll receive a personalized report covering:
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              
              {data.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 text-left"
                >
                  {/* Icon */}
                  <div className="mt-1 text-yellow-300 text-[16px] sm:text-[18px]">
                    <FaCheckCircle />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[14px] sm:text-[16px] font-semibold mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[14px] text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Text */}
            <p className="text-[13px] sm:text-[15px] text-white/80">
              Results in 5 minutes · Proceed to payment after assessment
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-96 xl:w-[400px] w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-bold text-slate-800">Start Assessment</h2>
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
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
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
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
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
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
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
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
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
                      placeholder="Tell us about your child's age and main concerns..."
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
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
                    🔒 Your information is secure. We never share your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}