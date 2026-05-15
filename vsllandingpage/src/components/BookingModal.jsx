import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Clock as ClockIcon,
  Video,
  Building,
} from "lucide-react";
import axios from "../api/axiosInstance";

export default function BookingModal({ open, setOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    mode: "online",
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    "11:00-11:10 AM",
    "11:10-11:20 AM",
    "11:20-11:30 AM",
    "11:30-11:40 AM",
    "11:40-11:50 AM",
    "11:50-12:00 PM",
  ];

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time slot is required";
    }

    if (!formData.mode) {
      newErrors.mode = "Please select consultation mode";
    }

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

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleModeSelect = (mode) => {
    setFormData((prev) => ({
      ...prev,
      mode,
    }));
    if (errors.mode) {
      setErrors((prev) => ({
        ...prev,
        mode: "",
      }));
    }
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
      const response = await axios.post("/bookings", formData);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("consultationFormSubmitted", "true");
        localStorage.setItem("consultationFormData", JSON.stringify(formData));

        window.location.href = "https://rzp.io/rzp/ydaKYJsq";
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

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        {/* Close Button */}
        <div className="sticky top-0 z-10 flex justify-end bg-white pt-4 pr-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f2ea] text-[#0b2f1d] hover:bg-[#e8dfd0] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-7 sm:px-7">
          <h3 className="pr-10 font-serif text-[30px] sm:text-[36px] leading-tight text-[#0b2f1d]">
            Book Your Session
          </h3>

          <p className="mt-2 text-[14px] text-[#6b756c]">
            Fill the details below and proceed to payment.
          </p>

          {/* Error */}
          {submitError && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-[13px] text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c]" />

                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c]" />

                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c]" />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Select Date
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c]" />

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.date
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {errors.date && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.date}</p>
                )}
              </div>

              {/* Mode Selection - Full width */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Consultation Mode
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleModeSelect("online")}
                    className={`rounded-xl border-2 p-4 text-center transition-all ${
                      formData.mode === "online"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
                        : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
                    }`}
                  >
                    <Video className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-semibold">Online</span>
                    <p className="text-xs mt-1">Video Consultation</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect("clinic")}
                    className={`rounded-xl border-2 p-4 text-center transition-all ${
                      formData.mode === "clinic"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
                        : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
                    }`}
                  >
                    <Building className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-semibold">Clinic</span>
                    <p className="text-xs mt-1">In-Person Visit</p>
                  </button>
                </div>

                {errors.mode && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.mode}</p>
                )}
              </div>

              {/* Time - Full width */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Select Time
                </label>

                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c]" />

                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none appearance-none transition-all focus:border-[#d6a22e] ${
                      errors.time
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.time && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 w-full rounded-full bg-[#062f1c] py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#0b4028] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit & Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const AlertCircle = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);