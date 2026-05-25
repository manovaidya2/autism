import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Send,
  X
} from "lucide-react";

export default function LeadPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const API_URL = "https://autismapi.manovaidya.com/api/kraya-lead";

  useEffect(() => {
    const alreadyFilled = localStorage.getItem(
      "consultationFormSubmitted"
    );

    if (!alreadyFilled) {
      setShowPopup(true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const cleanPhone = formData.phone.replace(/\D/g, "");

    if (!formData.name.trim()) {
      newErrors.name = "Name required";
    }

    if (
      formData.email.trim() &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!cleanPhone) {
      newErrors.phone = "Phone required";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Valid 10 digit number required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const cleanPhone =
        formData.phone.replace(/\D/g, "");

      const payload = {
        name: formData.name.trim(),
        phone: cleanPhone,
        email: formData.email || "",
        stage: "VSL Landing page",
        pipeline: "Leads",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Lead submit failed"
        );
      }

      if (typeof fbq === "function") {
        fbq("track", "Lead");
      }

      setIsSubmitted(true);

      localStorage.setItem(
        "consultationFormSubmitted",
        "true"
      );

      // Close popup and redirect to home after submission
      setTimeout(() => {
        setShowPopup(false);
        document.body.style.overflow = "auto";
        window.location.href = "/"; // Redirect to home page
      }, 1500);

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle close - now does nothing (can't close without submit)
  const handleClose = () => {
    // User cannot close the popup without submitting
    // Optional: Show a warning message
    alert("Please fill and submit the form to continue");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
      {/* Clicking on backdrop won't close the popup */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      ></div>
      
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">

        {/* Close button - disabled or removed */}
        {/* Button removed so user cannot close without submitting */}
        {/* <button
          onClick={handleClose}
          className="absolute top-5 right-5"
        >
          <X className="w-5 h-5"/>
        </button> */}

        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#0b2f1d]">
            Get Help Now
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please fill the form to continue
          </p>
        </div>

        {isSubmitted && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700 text-sm flex gap-2">
            <CheckCircle className="w-4 h-4"/>
            Redirecting to home page...
          </div>
        )}

        {submitError && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700 text-sm flex gap-2">
            <AlertCircle className="w-4 h-4"/>
            {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-4 h-4 w-4 text-gray-400"/>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name *"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
              disabled={isSubmitting || isSubmitted}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400"/>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
              disabled={isSubmitting || isSubmitted}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400"/>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
              disabled={isSubmitting || isSubmitted}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full rounded-full bg-[#062f1c] py-3 text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0a4728] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4"/>
            {isSubmitting
              ? "Submitting..."
              : isSubmitted
              ? "Redirecting..."
              : "Submit & Continue"}
          </button>
        </form>

        {/* Optional: Warning message about not being able to close */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Please complete the form to continue
        </p>
      </div>
    </div>
  );
}