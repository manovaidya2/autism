// import React, { useEffect, useState } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   Clock as ClockIcon,
//   Video,
//   Building,
//   AlertCircle,
//   CheckCircle,
//   Send,
//   X
// } from "lucide-react";
// import axiosInstance from "../api/axiosInstance";

// export default function LeadPopup() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     mode: "online",
//   });

//   const [errors, setErrors] = useState({});

//   const timeSlots = [
//     "11:00-11:10 AM",
//     "11:10-11:20 AM",
//     "11:20-11:30 AM",
//     "11:30-11:40 AM",
//     "11:40-11:50 AM",
//     "11:50-12:00 PM",
//   ];

//   useEffect(() => {
//     const alreadyFilled = localStorage.getItem("consultationFormSubmitted");

//     if (!alreadyFilled) {
//       setShowPopup(true);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
//       newErrors.phone = "Valid phone number required";
//     }

//     if (!formData.date) {
//       newErrors.date = "Date is required";
//     }

//     if (!formData.time) {
//       newErrors.time = "Time slot is required";
//     }

//     if (!formData.mode) {
//       newErrors.mode = "Please select consultation mode";
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }

//     if (submitError) setSubmitError("");
//   };

//   const handleModeSelect = (mode) => {
//     setFormData((prev) => ({
//       ...prev,
//       mode,
//     }));
//     if (errors.mode) {
//       setErrors((prev) => ({
//         ...prev,
//         mode: "",
//       }));
//     }
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = validateForm();

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");

//     try {
//       const response = await axiosInstance.post("/bookings", formData);

//       if (response.status === 200 || response.status === 201) {
//         setIsSubmitted(true);

//         localStorage.setItem("consultationFormSubmitted", "true");
//         localStorage.setItem("consultationFormData", JSON.stringify(formData));

//         setTimeout(() => {
//           setShowPopup(false);
//           document.body.style.overflow = "auto";
//           window.location.href = "https://rzp.io/rzp/ydaKYJsq";
//         }, 800);
//       } else {
//         setSubmitError(response.data.message || "Failed to submit form.");
//       }
//     } catch (err) {
//       if (err.response) {
//         setSubmitError(
//           err.response.data.message || "Server error. Please try again."
//         );
//       } else if (err.request) {
//         setSubmitError("No response from server. Please check your connection.");
//       } else {
//         setSubmitError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!showPopup) return null;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/60 px-3 pt-20 pb-3 overflow-y-auto">
//       <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
//         {/* Close Button */}
//         <div className="sticky top-0 z-10 flex justify-end bg-white pt-3 pr-3 rounded-t-2xl">
//           <button
//             type="button"
//             onClick={() => {
//               setShowPopup(false);
//               document.body.style.overflow = "auto";
//             }}
//             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f2ea] text-[#0b2f1d] hover:bg-[#e8dfd0] transition-colors"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-5 pb-6">
//           <div className="text-center mb-4">
//             <h3 className="font-serif text-2xl sm:text-3xl text-[#0b2f1d]">
//               Get Help Now
//             </h3>
//             <p className="mt-1 text-sm text-[#6b756c]">
//               Please fill this form to continue
//             </p>
//           </div>

//           {isSubmitted && (
//             <div className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
//               <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//               <span>Form submitted! Redirecting to payment...</span>
//             </div>
//           )}

//           {submitError && (
//             <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//               <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//               <span>{submitError}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {/* Name */}
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
//                   <input
//                     name="name"
//                     type="text"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
//                       errors.name
//                         ? "border-red-400 bg-red-50"
//                         : "border-[#e5ddcf] bg-[#fbfaf7]"
//                     }`}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
//                       errors.email
//                         ? "border-red-400 bg-red-50"
//                         : "border-[#e5ddcf] bg-[#fbfaf7]"
//                     }`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
//                   <input
//                     name="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
//                       errors.phone
//                         ? "border-red-400 bg-red-50"
//                         : "border-[#e5ddcf] bg-[#fbfaf7]"
//                     }`}
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Date */}
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Select Date *
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     min={getMinDate()}
//                     className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
//                       errors.date
//                         ? "border-red-400 bg-red-50"
//                         : "border-[#e5ddcf] bg-[#fbfaf7]"
//                     }`}
//                   />
//                 </div>
//                 {errors.date && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.date}</p>
//                 )}
//               </div>

//               {/* Mode Selection */}
//               <div className="md:col-span-2">
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Consultation Mode *
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => handleModeSelect("online")}
//                     className={`rounded-lg border-2 p-2 text-center transition-all ${
//                       formData.mode === "online"
//                         ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
//                         : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
//                     }`}
//                   >
//                     <Video className="w-4 h-4 mx-auto mb-1" />
//                     <span className="text-xs font-semibold">Online</span>
//                     <p className="text-[10px] mt-0.5">Video Consultation</p>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => handleModeSelect("clinic")}
//                     className={`rounded-lg border-2 p-2 text-center transition-all ${
//                       formData.mode === "clinic"
//                         ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
//                         : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
//                     }`}
//                   >
//                     <Building className="w-4 h-4 mx-auto mb-1" />
//                     <span className="text-xs font-semibold">Clinic</span>
//                     <p className="text-[10px] mt-0.5">In-Person Visit</p>
//                   </button>
//                 </div>
//                 {errors.mode && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.mode}</p>
//                 )}
//               </div>

//               {/* Time */}
//               <div className="md:col-span-2">
//                 <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
//                   Select Time *
//                 </label>
//                 <div className="relative">
//                   <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
//                   <select
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                     className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none appearance-none transition-all focus:border-[#d6a22e] ${
//                       errors.time
//                         ? "border-red-400 bg-red-50"
//                         : "border-[#e5ddcf] bg-[#fbfaf7]"
//                     }`}
//                   >
//                     <option value="">Select Time Slot</option>
//                     {timeSlots.map((slot) => (
//                       <option key={slot} value={slot}>
//                         {slot}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.time && (
//                   <p className="mt-0.5 text-[10px] text-red-500">{errors.time}</p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="mt-5 w-full rounded-full bg-[#062f1c] py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0b4028] disabled:opacity-70 flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 "Submitting..."
//               ) : (
//                 <>
//                   <Send className="w-3.5 h-3.5" />
//                   Submit & Continue
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock as ClockIcon,
  Video,
  Building,
  AlertCircle,
  CheckCircle,
  Send,
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
    date: "",
    time: "",
    mode: "online",
  });

  const [errors, setErrors] = useState({});

  const API_URL = "https://autismapi.manovaidya.com/api/kraya-lead";

  const timeSlots = [
    "11:00-11:10 AM",
    "11:10-11:20 AM",
    "11:20-11:30 AM",
    "11:30-11:40 AM",
    "11:40-11:50 AM",
    "11:50-12:00 PM",
  ];

  useEffect(() => {
    const alreadyFilled = localStorage.getItem("consultationFormSubmitted");

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
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Valid 10 digit phone number required";
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
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleModeSelect = (mode) => {
    setFormData((prev) => ({ ...prev, mode }));

    if (errors.mode) {
      setErrors((prev) => ({ ...prev, mode: "" }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
      const cleanPhone = formData.phone.replace(/\D/g, "");

      const payload = {
        name: formData.name.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        notes: `
Date: ${formData.date}
Time Slot: ${formData.time}
Mode: ${formData.mode}
        `,
        stage: "New Lead",
        pipeline: "Leads",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lead submit failed");
      }

      setIsSubmitted(true);

      localStorage.setItem("consultationFormSubmitted", "true");
      localStorage.setItem("consultationFormData", JSON.stringify(payload));

      setTimeout(() => {
        setShowPopup(false);
        document.body.style.overflow = "auto";
        window.location.href = "/";
      }, 800);
    } catch (err) {
      console.error("Kraya Lead Error:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/60 px-3 pt-20 pb-3 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="px-5 pt-6 pb-6">
          <div className="text-center mb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0b2f1d]">
              Get Help Now
            </h3>
            <p className="mt-1 text-sm text-[#6b756c]">
              Please fill this form to continue
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-4 flex gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              <CheckCircle className="w-4 h-4 mt-0.5" />
              <span>Form submitted! Redirecting to home...</span>
            </div>
          )}

          {submitError && (
            <div className="mb-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#e5ddcf] bg-[#fbfaf7] pl-9 pr-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#e5ddcf] bg-[#fbfaf7] pl-9 pr-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <input
                    name="phone"
                    type="tel"
                    maxLength={10}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#e5ddcf] bg-[#fbfaf7] pl-9 pr-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Select Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    className="w-full rounded-xl border border-[#e5ddcf] bg-[#fbfaf7] pl-9 pr-3 py-2 text-sm outline-none"
                  />
                </div>
                {errors.date && (
                  <p className="text-[10px] text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Consultation Mode *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleModeSelect("online")}
                    className={`rounded-lg border-2 p-2 text-center ${
                      formData.mode === "online"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  >
                    <Video className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs font-semibold">Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect("clinic")}
                    className={`rounded-lg border-2 p-2 text-center ${
                      formData.mode === "clinic"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs font-semibold">Clinic</span>
                  </button>
                </div>
                {errors.mode && (
                  <p className="text-[10px] text-red-500">{errors.mode}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Select Time *
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#e5ddcf] bg-[#fbfaf7] pl-9 pr-3 py-2 text-sm outline-none"
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
                  <p className="text-[10px] text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-[#062f1c] py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit & Continue
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}