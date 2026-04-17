import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function TeenFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
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

  const faqs = [
    {
      q: "Can teen behavioral issues really improve?",
      a: "Absolutely. Challenges like anxiety, anger, low focus, and social withdrawal are often rooted in biological imbalances — brain chemistry, gut health, and nervous system regulation. When these are addressed properly, lasting improvement is not just possible, it's expected. Over 90% of families report measurable positive changes within the first 3 months.",
    },
    {
      q: "How long does it take to see results?",
      a: "Every teen is different, but most parents notice early improvements within 3–4 weeks — better sleep, reduced irritability, and improved daily routines. Major changes in focus, emotional control, and academic performance typically show within 2–4 months. For complete transformation, we recommend a 6–12 month journey.",
    },
    {
      q: "Do we need to stop current therapy or counseling?",
      a: "Not at all. Our program is designed to enhance existing therapies like counseling or CBT. In fact, many parents see significantly better results from therapy after starting our program — because we prepare the brain biologically to respond better.",
    },
    {
      q: "Will every teen show improvement?",
      a: "While results vary, over 90% of teens show noticeable positive changes. During the initial assessment, we give you a clear and honest expectation of what improvements are possible based on your teen's current condition.",
    },
    {
      q: "Is this different from regular counseling?",
      a: "Yes — fundamentally. Counseling focuses on behavior (output), while our system focuses on the root cause (input). By fixing brain chemistry, gut health, and nervous system balance first, we make behavioral improvement faster and more sustainable.",
    },
    {
      q: "My teen won't cooperate. Will this still work?",
      a: "This is very common — and yes, it can still work. Much of the initial phase focuses on nutrition and biological correction, which doesn't require active participation. As your teen starts feeling better, cooperation naturally improves.",
    },
    {
      q: "Is this approach scientifically backed?",
      a: "Yes. Our approach is based on research in neuroscience, nutritional psychiatry, and adolescent psychology. The gut-brain connection, dopamine regulation, and nervous system balance are all well-established scientific areas studied by institutions like Harvard and Johns Hopkins.",
    },
    {
      q: "Can this help with screen addiction?",
      a: "Absolutely. Screen addiction is driven by dopamine imbalance in the brain. We address this at the root level — rebalancing dopamine naturally while also introducing structured habits. This reduces dependency without constant conflict or force.",
    },
    {
      q: "Is the program available online?",
      a: "Yes! The entire program can be done online — including consultations, tracking, and guidance. Nutrition plans and supplements are delivered to your home, making it convenient for families across India and globally.",
    },
    {
      q: "How much does the program cost?",
      a: "Costs vary depending on your teen's needs and program duration. We offer flexible plans. The best way to get exact pricing is to take the free assessment — after which our team will share complete details with full transparency.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        
        // Store form data in localStorage for payment page if needed
        localStorage.setItem("teenFAQFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          question: formData.message,
          submittedAt: new Date().toISOString()
        }));
        
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });

        // Redirect to payment page after 2 seconds
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

  return (
    <section id="faq" className="bg-[#f6f8fc] py-8 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[24px] sm:text-[34px] font-bold text-[#1f2b3f] mb-3 sm:mb-4 leading-snug">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6b7a90] text-[13.5px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
            Get clear, honest answers to the most common questions parents ask about our teen wellness program.
          </p>
          <p className="text-center text-[#5b7cff] font-medium mt-4">
            Still unsure? These answers will give you clarity
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Side - FAQ List */}
          <div className="flex-1">
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e3e8f3] rounded-[12px] sm:rounded-[14px] shadow-sm transition"
                >
                  
                  {/* Question */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-start text-left px-4 sm:px-6 py-4 sm:py-5 gap-3"
                  >
                    <span className="text-[15px] sm:text-[18px] font-semibold text-[#1f2b3f] leading-snug">
                      {faq.q}
                    </span>

                    <span className="text-[#5b7cff] text-[18px] sm:text-[20px] mt-1 flex-shrink-0">
                      {openIndex === i ? <FiMinus /> : <FiPlus />}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ${
                      openIndex === i ? "max-h-[600px] pb-4 sm:pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-[13px] sm:text-[16px] text-[#6b7a90] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-96 xl:w-[400px] w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-bold text-slate-800">Have Questions?</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill the form and proceed to payment
                </p>
              </div>

              {/* Success Message with Redirect Info */}
              {isSubmitted && !redirecting && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <p className="text-emerald-700 text-xs">Form submitted! Redirecting to payment...</p>
                  </div>
                  <div className="mt-2 w-full bg-emerald-200 rounded-full h-1 overflow-hidden">
                    <div className="bg-emerald-600 h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              )}

              {/* Redirecting Message */}
              {redirecting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-blue-700 text-xs">Redirecting to payment gateway...</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
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
                      disabled={isSubmitting || redirecting}
                      placeholder="Enter full name"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fullName ? "border-red-400 bg-red-50" : "border-slate-300"
                      } disabled:bg-slate-50 disabled:cursor-not-allowed`}
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
                      disabled={isSubmitting || redirecting}
                      placeholder="Enter email"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-400 bg-red-50" : "border-slate-300"
                      } disabled:bg-slate-50 disabled:cursor-not-allowed`}
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
                      disabled={isSubmitting || redirecting}
                      placeholder="Enter phone number"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-400 bg-red-50" : "border-slate-300"
                      } disabled:bg-slate-50 disabled:cursor-not-allowed`}
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
                      disabled={isSubmitting || redirecting}
                      placeholder="Enter address"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? "border-red-400 bg-red-50" : "border-slate-300"
                      } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.address && <p className="mt-1 text-left text-xs text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">Your Question *</label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting || redirecting}
                      placeholder="Write your specific question about your teen..."
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                        errors.message ? "border-red-400 bg-red-50" : "border-slate-300"
                      } disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-left text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Payment Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">Note:</span> After submitting, you will be redirected to our secure payment page.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || redirecting}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : redirecting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Redirecting to Payment...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Proceed to Payment
                    </>
                  )}
                </button>
              </form>

              {/* Support Text */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 text-center">
                  <p className="text-[11px] text-slate-600">
                    📞 Or call us directly: <span className="font-semibold">+91-7823838638</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    We're available Mon-Sat, 10 AM to 7 PM
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