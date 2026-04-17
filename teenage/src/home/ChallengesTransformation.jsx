import React, { useState } from "react";
import {
  FaVolumeMute,
  FaBolt,
  FaBrain,
  FaBookOpen,
  FaMobileAlt,
  FaUserFriends,
  FaMoon,
  FaExchangeAlt,
} from "react-icons/fa";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const data = [
  {
    icon: <FaVolumeMute />,
    title: "Doesn't Listen or Respond",
    desc: "Your teen seems to tune you out, ignore instructions, and shows no interest in conversations or family activities.",
  },
  {
    icon: <FaBolt />,
    title: "Mood Swings & Anger Outbursts",
    desc: "Sudden emotional explosions, irritability over small things, and unpredictable mood changes that create tension at home.",
  },
  {
    icon: <FaBrain />,
    title: "Anxiety & Overthinking",
    desc: "Constant worry, social withdrawal, panic-like episodes, difficulty sleeping due to racing thoughts and fear of the future.",
  },
  {
    icon: <FaBookOpen />,
    title: "Lack of Focus & Academic Decline",
    desc: "Can't concentrate on studies, grades dropping, difficulty completing homework, and teachers reporting attention problems.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Excessive Screen Addiction",
    desc: "Hours spent on phones, gaming, or social media. Becomes agitated or aggressive when devices are taken away.",
  },
  {
    icon: <FaUserFriends />,
    title: "Social Discomfort & Low Confidence",
    desc: "Avoids social situations, struggles to make friends, feels like an outsider, and has persistent low self-esteem.",
  },
  {
    icon: <FaMoon />,
    title: "Sleep Disruption & Fatigue",
    desc: "Staying up late, difficulty waking up, irregular sleep patterns that affect energy, mood, and cognitive performance.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Defiant or Withdrawn Behavior",
    desc: "Either constantly arguing and pushing back, or completely shutting down and refusing to communicate with family members.",
  },
];

export default function TeenChallengeSection() {
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
        localStorage.setItem("teenFormData", JSON.stringify({
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
    <section
      id="challenges"
      className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[24px] sm:text-[34px] md:text-[38px] font-bold text-[#1a1a2e] leading-snug sm:leading-tight">
            Are You Facing These Challenges With
            <br className="hidden sm:block" /> Your Teen?
          </h2>

          <p className="mt-3 sm:mt-4 text-[#6b7280] text-[13.5px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
            If your teenager shows any of these signs, it's not just a "phase."
            These are signals of deeper neurological and biological imbalances that need attention.
          </p>
        </div>

        {/* Two Column Layout - Grid on Left, Form on Right */}
        <div className="mt-8 sm:mt-14 flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Side - Challenges Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {data.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e3e8f2] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left shadow-sm hover:shadow-md transition"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#eef3ff] text-[#6c8ef5] text-base sm:text-lg mb-3 sm:mb-4">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a1a2e]">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13.5px] text-[#6b7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-96 xl:w-[400px] w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-bold text-slate-800">Get Help for Your Teen</h2>
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
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">Message *</label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting || redirecting}
                      placeholder="Describe your teen's challenges..."
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

              {/* Bottom Highlight Box inside sidebar */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="bg-[#f4e7c5] rounded-xl p-3 text-center">
                  <p className="text-[12px] text-[#1a1a2e] font-medium leading-relaxed">
                    "This isn't just your teen's struggle —{" "}
                    <span className="text-[#6c8ef5] font-semibold">
                      it affects the entire family.
                    </span>"
                  </p>
                  <p className="mt-1 text-[11px] text-[#6b7280] leading-relaxed">
                    The arguments, worry, helplessness — we understand.
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