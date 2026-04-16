import React, { useState } from "react";
import {
  FaEye,
  FaComments,
  FaBolt,
  FaBullseye,
  FaHeartBroken,
  FaUserFriends,
  FaHandPaper,
  FaSyncAlt,
} from "react-icons/fa";
import { User, Mail, Phone, MapPin, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const data = [
  {
    icon: <FaEye />,
    title: "No Response to Name",
    desc: "Your child doesn't look up, turn, or acknowledge when their name is called — even repeatedly.",
  },
  {
    icon: <FaComments />,
    title: "Speech & Language Delay",
    desc: "Limited or no words by age 2, difficulty forming sentences, or loss of previously acquired speech.",
  },
  {
    icon: <FaBolt />,
    title: "Hyperactivity & Restlessness",
    desc: "Constant movement, inability to sit still, running or climbing in inappropriate situations.",
  },
  {
    icon: <FaBullseye />,
    title: "Poor Focus & Attention",
    desc: "Cannot concentrate on tasks, gets easily distracted, difficulty following instructions.",
  },
  {
    icon: <FaHeartBroken />,
    title: "Emotional Meltdowns & Tantrums",
    desc: "Intense, prolonged outbursts that seem disproportionate to the situation and are hard to de-escalate.",
  },
  {
    icon: <FaUserFriends />,
    title: "Weak Social Interaction",
    desc: "Avoids eye contact, prefers playing alone, struggles to understand social cues or make friends.",
  },
  {
    icon: <FaHandPaper />,
    title: "Sensory Sensitivities",
    desc: "Overreaction or underreaction to sounds, textures, lights, or touch — covering ears, food aversions.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Repetitive Behaviors",
    desc: "Hand flapping, spinning, lining up objects, or insistence on rigid routines and sameness.",
  },
];

export default function ChallengeSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    selectedChallenges: [],
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

  const handleChallengeToggle = (challengeTitle) => {
    setFormData((prev) => {
      const isSelected = prev.selectedChallenges.includes(challengeTitle);
      return {
        ...prev,
        selectedChallenges: isSelected
          ? prev.selectedChallenges.filter(c => c !== challengeTitle)
          : [...prev.selectedChallenges, challengeTitle]
      };
    });
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

    const submitData = {
      ...formData,
      challenges: formData.selectedChallenges.join(", "),
    };

    try {
      const response = await axiosInstance.post("/autism/contact/create", submitData);

      if (response.data.success || response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        
        // Store form data in localStorage for payment page if needed
        localStorage.setItem("consultationFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          challenges: formData.selectedChallenges
        }));
        
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
          selectedChallenges: [],
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
    <section
      id="challenges"
      className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[24px] sm:text-[34px] md:text-[38px] font-bold text-[#1a1a2e] leading-snug sm:leading-tight">
            Are You Facing These Challenges with
            <br className="hidden sm:block" />{" "}
            Your Child?
          </h2>

          <p className="mt-3 sm:mt-4 text-[#6b7280] text-[13.5px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
            If your child shows any of these signs, you're not alone. Millions of parents worldwide
            face the same struggles — and real solutions exist.
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
                  className="bg-white border border-[#e3e8f2] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => handleChallengeToggle(item.title)}
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

                  {/* Show checkmark if selected */}
                  {formData.selectedChallenges.includes(item.title) && (
                    <div className="mt-2 text-green-600 text-xs font-semibold flex items-center gap-1">
                      <span>✓</span> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-96 xl:w-[400px]">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-6">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Get Help Now</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill the form and proceed to payment
                </p>
                {formData.selectedChallenges.length > 0 && (
                  <p className="text-xs text-blue-600 mt-2">
                    Selected: {formData.selectedChallenges.length} challenge(s)
                  </p>
                )}
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
                      placeholder="Describe your child's challenges..."
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

              {/* Bottom Highlight Box inside sidebar */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="bg-[#f4e7c5] rounded-xl p-3 text-center">
                  <p className="text-[12px] text-[#1a1a2e] font-medium leading-relaxed">
                    "This isn't just your child's struggle —{" "}
                    <span className="text-[#6c8ef5] font-semibold">
                      it affects the entire family.
                    </span>"
                  </p>
                  <p className="mt-1 text-[11px] text-[#6b7280] leading-relaxed">
                    The confusion, guilt, endless doctor visits — we understand.
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