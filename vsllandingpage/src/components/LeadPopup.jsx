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

      setTimeout(() => {
        setShowPopup(false);
        window.location.reload();
      }, 1000);

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">

      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl relative">

        <button
          onClick={() =>
            setShowPopup(false)
          }
          className="absolute top-5 right-5"
        >
          <X className="w-5 h-5"/>
        </button>

        <div className="text-center">

          <h2 className="font-serif text-3xl text-[#0b2f1d]">
            Get Help Now
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Fill details to continue
          </p>

        </div>

        {isSubmitted && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700 text-sm flex gap-2">
            <CheckCircle className="w-4 h-4"/>
            Submitted Successfully
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
              placeholder="Full Name"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400"/>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (Optional)"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400"/>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-[#ddd] py-3 pl-11 pr-4"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#062f1c] py-3 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4"/>

            {isSubmitting
              ? "Submitting..."
              : "Submit & Continue"}
          </button>

        </form>

      </div>

    </div>
  );
}