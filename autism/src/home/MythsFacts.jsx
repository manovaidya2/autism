import React, { useState } from "react";
import { X, Check, User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const data = [
  {
    myth: "Autism has no solution — nothing can be done",
    fact: "Neuroplasticity research proves the brain can form new connections at any age. Early, targeted intervention can significantly improve outcomes.",
  },
  {
    myth: "Therapy alone is enough for improvement",
    fact: "Therapy is most effective when the brain is neurologically ready. Nutrition, gut health, and neural activation prepare the foundation for therapy to work.",
  },
  {
    myth: "My child doesn't understand anything",
    fact: "Receptive language (understanding) develops before expressive language (speaking). Your child likely understands far more than they can express.",
  },
  {
    myth: "Autism is caused by bad parenting",
    fact: "Autism is a neurodevelopmental condition with genetic and environmental factors. It has absolutely nothing to do with parenting style.",
  },
  {
    myth: "Children with autism can never live independently",
    fact: "With the right support system, many individuals with autism lead fulfilling, independent lives with meaningful relationships and careers.",
  },
];

const MythsFacts = () => {
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
      const response = await axiosInstance.post("/autism/contact/create", formData);

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
          window.location.href = "https://rzp.io/rzp/FjMRvHOy";
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
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-[#1e293b] leading-tight">
            Myths vs Facts: What Science Really Says<br/> About Autism & ADHD
          </h2>
          <p className="text-center text-gray-500 mt-4 max-w-xl mx-auto">
            There's a lot of misinformation about autism and ADHD. Let's separate the myths from the evidence-based truth.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Side - Myths & Facts Cards */}
          <div className="flex-1">
            <div className="space-y-5">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 border border-[#c7d2fe] rounded-xl overflow-hidden"
                >
                  {/* Myth */}
                  <div className="bg-[#fff1f2] p-6 md:p-7 flex gap-3 items-start">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-red-400 text-red-500 flex-shrink-0">
                      <X size={14} />
                    </div>
                    <div>
                      <p className="text-red-500 text-xs font-semibold mb-1">MYTH</p>
                      <p className="text-[#1e293b] font-medium leading-relaxed text-sm md:text-base">
                        {item.myth}
                      </p>
                    </div>
                  </div>

                  {/* Fact */}
                  <div className="bg-[#eff6ff] p-6 md:p-7 flex gap-3 items-start">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-400 text-blue-500 flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <div>
                      <p className="text-blue-500 text-xs font-semibold mb-1">FACT</p>
                      <p className="text-[#1e293b] leading-relaxed text-sm md:text-base">
                        {item.fact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-96 xl:w-[400px]">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-bold text-slate-800">Get Help Now</h2>
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
                      placeholder="Ask your question or share your concerns..."
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

              {/* Motivational Quote */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
                  <p className="text-[12px] text-[#1e293b] font-medium leading-relaxed">
                    "Knowledge is the first step to healing.{" "}
                    <span className="text-blue-600 font-semibold">
                      Get the right information and support for your child.
                    </span>"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MythsFacts;