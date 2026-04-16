import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function FAQSection() {
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

  const faqs = [
    {
      q: "Can autism be cured?",
      a: "Autism is a neurodevelopmental condition, not a disease — so 'cure' isn't the right framework. However, the brain has remarkable plasticity, especially in children under 12. With the right interventions addressing brain nutrition, gut health, and neural activation, significant and measurable improvements in communication, behavior, focus, and social skills are absolutely achievable. Many children in our program have exceeded expectations that were set by their initial diagnoses.",
    },
    {
      q: "How long does it take to see results?",
      a: "Every child is unique, so timelines vary. However, most families report initial positive changes within 4-6 weeks — improvements in sleep, reduced irritability, or better eye contact. Significant, sustainable improvements in speech, behavior, and social interaction typically emerge between 3-6 months. For comprehensive developmental progress, we recommend a 12-month commitment. The earlier you begin, the faster the brain responds.",
    },
    {
      q: "Do we need to stop current therapy?",
      a: "Absolutely not. The Manovaidya system is designed to complement and enhance existing therapies — not replace them. In fact, many parents find that their child's response to speech therapy, occupational therapy, and ABA improves dramatically after starting our program, because we're preparing the brain to actually absorb and benefit from those interventions.",
    },
    {
      q: "Will every child show improvement?",
      a: "While the degree of improvement varies, over 90% of families in our program report noticeable positive changes. During the initial assessment, we provide realistic expectations based on your child's specific profile. We believe in complete transparency — we'll tell you exactly what improvements are likely and what timeline to expect.",
    },
    {
      q: "Is the program available online?",
      a: "Yes! Our program is available in both online and in-clinic formats. Parent guidance sessions, progress tracking, and follow-up consultations can all be conducted effectively online via video calls. The nutrition and supplement protocols are shipped to your doorstep. Many families across India and internationally participate successfully through our online program.",
    },
    {
      q: "What age group does this program work for?",
      a: "Our program is designed for children aged 2-12 years, which is the critical window for brain development and neuroplasticity. Children in this age range show the most dramatic improvements because their brains are still actively developing neural connections. We have separate protocols optimized for toddlers (2-4), early childhood (4-7), and school-age children (7-12).",
    },
    {
      q: "Is this approach scientifically backed?",
      a: "Yes. Our Brain-Gut-Neurodevelopment approach is grounded in peer-reviewed research from neuroscience, nutritional psychiatry, and developmental psychology. The gut-brain axis connection is one of the most actively researched areas in neuroscience, with studies from Harvard, Johns Hopkins, and other leading institutions supporting the link between gut health and brain function.",
    },
    {
      q: "How is Manovaidya different from regular therapy?",
      a: "Traditional therapy works on the 'output' — behavior and speech. Manovaidya works on the 'input' — preparing the brain and body so that therapy actually works. By addressing nutritional deficiencies, gut inflammation, and neural readiness first, we create the neurological foundation that makes speech therapy, OT, and behavioral interventions dramatically more effective.",
    },
    {
      q: "What does the assessment include?",
      a: "Our comprehensive assessment covers: developmental milestone analysis, cognitive function evaluation, sensory processing profile, gut health indicators, nutritional status review, behavioral pattern analysis, and parent interview. The result is a detailed report showing your child's current developmental level, specific areas of delay, improvement potential, and a customized care roadmap.",
    },
    {
      q: "How much does the program cost?",
      a: "Program costs vary based on your child's specific needs, severity level, and the duration of the plan. We offer flexible payment options and different program tiers. The best way to understand pricing is to complete the free assessment — after which our care team will present transparent, detailed pricing with no hidden costs. The initial consultation is completely free.",
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
        localStorage.setItem("faqFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          question: formData.message
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
    <section id="faq" className="bg-[#f6f8fc] py-8 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[24px] sm:text-[34px] font-bold text-[#1f2b3f] mb-3 sm:mb-4 leading-snug">
            Frequently Asked Questions About Autism & ADHD Care
          </h2>
          <p className="text-[#6b7a90] text-[13.5px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
            We understand you have questions. Here are honest, detailed answers to what parents ask us most.
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
          <div className="lg:w-96 xl:w-[400px]">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-bold text-slate-800">Have More Questions?</h2>
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
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">Your Question *</label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your specific question about your child..."
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

              {/* Support Text */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 text-center">
                  <p className="text-[11px] text-slate-600">
                    📞 Or call us directly: <span className="font-semibold">+91-XXXXXXXXXX</span>
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