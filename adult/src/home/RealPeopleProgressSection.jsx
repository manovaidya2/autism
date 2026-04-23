import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const stories = [
  {
    before: [
      "Severe burnout — could barely function at work",
      "Insomnia for 3+ months, sleeping only 3–4 hours",
      "Daily anxiety attacks before meetings",
      "Chronic acidity and IBS-like symptoms",
    ],
    after: [
      "Energy restored, performing better than before",
      "Sleeping 7 hours consistently, waking refreshed",
      "Anxiety reduced by 85%, presenting with confidence",
      "Digestion stable, no more daily acidity",
    ],
    quote:
      "I was on the verge of quitting my job. The exhaustion was bone-deep and no amount of weekend rest helped. Within 4 months of the Manovaidya program, I felt like a different person. They didn’t just give me coping techniques — they fixed what was broken inside.",
    name: "Rahul Mehta",
    role: "Senior Marketing Manager, Age 38",
    timeline: "4 months into program",
  },
  {
    before: [
      "Constant overthinking — couldn't switch off",
      "Mood swings affecting marriage and parenting",
      "Brain fog so severe she missed deadlines",
      "Stress-induced weight gain and bloating",
    ],
    after: [
      "Calm, present mind — finally enjoys her own thoughts",
      "Stable mood, repaired family relationships",
      "Mental clarity returned, performing at her best",
      "Healthy weight, balanced digestion",
    ],
    quote:
      "I’d tried therapy, meditation apps, and medication. Nothing addressed why I felt so chemically off. The Manovaidya approach worked because they fixed my gut and nervous system first. The mental peace followed naturally.",
    name: "Priyanka Sharma",
    role: "Working Mother & HR Director, Age 41",
    timeline: "5 months into program",
  },
  {
    before: [
      "Panic attacks at work, hiding in the bathroom",
      "Complete loss of motivation and joy",
      "Heart palpitations, doctor said 'just stress'",
      "Withdrawing from friends and hobbies",
    ],
    after: [
      "No panic attacks in 4 months",
      "Genuine motivation and excitement returned",
      "Heart symptoms gone, full health checkup clear",
      "Reconnected with friends, started hobbies again",
    ],
    quote:
      "I thought I was having heart problems. Multiple doctors confirmed it was anxiety, but no one could tell me how to actually fix it. Manovaidya’s structured root-cause approach gave me my life back. I wish I’d found them years ago.",
    name: "Arjun Kapoor",
    role: "Software Engineer & Father, Age 35",
    timeline: "6 months into program",
  },
];

const RealPeopleProgressWithForm = () => {
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
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\+\(\)\-]{8,}$/.test(formData.phone))
      newErrors.phone = "Valid phone number required";

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
      const response = await axiosInstance.post(
        "/adult-contact/create",
        formData
      );  

      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        setIsSubmitted(true);

        localStorage.setItem(
          "consultationFormData",
          JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          })
        );

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });

        setTimeout(() => {
          window.location.href = "https://rzp.io/rzp/ZQr39j1";
        }, 1500);
      } else {
        setSubmitError(response.data.message || "Failed to submit form.");
      }
    } catch (err) {
      if (err.response) {
        setSubmitError(
          err.response.data.message || "Server error. Please try again."
        );
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
            Real People. Measurable Progress.
            <br />
            Renewed Confidence.
          </h2>
          <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
            Stories from adults who chose to address the root cause — and got
            their life back.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Real People Cards */}
          <div className="flex-1">
            <div className="space-y-5">
              {stories.map((story, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[20px] border border-[#d9def8] bg-white"
                >
                  {/* Top comparison */}
                  <div className="grid md:grid-cols-2">
                    {/* Before */}
                    <div className="bg-[#fff9f8] p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#d9def8]">
                      <div className="mb-4 inline-flex rounded-full bg-[#ffe0dc] px-3 py-[4px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#f0625f]">
                        Before
                      </div>

                      <div className="space-y-3">
                        {story.before.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="mt-[5px] h-[8px] w-[8px] shrink-0 rounded-full border border-[#ff7b77]" />
                            <p className="text-[13px] leading-[1.55] text-[#27395d] md:text-[15px]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* After */}
                    <div className="bg-[#fbfcff] p-6 md:p-7">
                      <div className="mb-4 inline-flex rounded-full bg-[#edf2ff] px-3 py-[4px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#7e96ff]">
                        After
                      </div>

                      <div className="space-y-3">
                        {story.after.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="mt-[5px] h-[8px] w-[8px] shrink-0 rounded-full border border-[#7e96ff]" />
                            <p className="text-[13px] leading-[1.55] text-[#27395d] md:text-[15px]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom quote area */}
                  <div className="border-t border-[#d9def8] bg-[#fffdf4] px-6 py-5 md:px-7">
                    <p className="text-[13px] italic leading-[1.7] text-[#2d3b5c] md:text-[15px]">
                      "{story.quote}"
                    </p>

                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <h3 className="text-[14px] font-extrabold text-[#11254d] md:text-[16px]">
                          {story.name}
                        </h3>
                        <p className="mt-1 text-[12px] leading-[1.5] text-[#6b7893] md:text-[13px]">
                          {story.role}
                        </p>
                      </div>

                      <div className="inline-flex w-fit rounded-full bg-[#eef2ff] px-3 py-1 text-[11px] font-semibold text-[#7b93ff]">
                        {story.timeline}
                      </div>
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
                <h2 className="text-2xl font-bold text-slate-800">
                  Get Help Now
                </h2>
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
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fullName
                          ? "border-red-400 bg-red-50"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-left text-xs text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email
                          ? "border-red-400 bg-red-50"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-left text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone
                          ? "border-red-400 bg-red-50"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-left text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address
                          ? "border-red-400 bg-red-50"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-left text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-left text-xs font-medium text-slate-700">
                    Message *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your symptoms or ask your question..."
                      className={`w-full rounded-lg border pl-10 pr-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                        errors.message
                          ? "border-red-400 bg-red-50"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-left text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
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

              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
                  <p className="text-[12px] text-[#1e293b] font-medium leading-relaxed">
                    "Understanding the biology behind your symptoms is the{" "}
                    <span className="text-blue-600 font-semibold">
                      first step toward lasting relief.
                    </span>"
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Get science-backed guidance tailored to your unique
                    situation.
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

export default RealPeopleProgressWithForm;