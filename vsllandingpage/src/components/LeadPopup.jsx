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
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

export default function LeadPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Date picker state
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // Allowed days: Tuesday (2), Thursday (4), Saturday (6)
  const allowedDays = [2, 4, 6];

  // Check if date is allowed
  const isDateAllowed = (date) => {
    const dayOfWeek = date.getDay();
    return allowedDays.includes(dayOfWeek);
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${day} ${month}, ${year} (${days[date.getDay()]})`;
  };

  // Format date for API (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const calendarDays = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      calendarDays.push(date);
    }
    
    return calendarDays;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (date && isDateAllowed(date) && !isPastDate(date)) {
      setFormData(prev => ({
        ...prev,
        date: formatDateForAPI(date)
      }));
      setShowCalendar(false);
      if (errors.date) {
        setErrors(prev => ({ ...prev, date: "" }));
      }
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Check if date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (date) => {
    if (!date || !formData.date) return false;
    return formatDateForAPI(date) === formData.date;
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showCalendar && !e.target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  // Check if form is filled (at least required fields)
  const isFormFilled = () => {
    const cleanPhone = formData.phone.replace(/\D/g, "");
    return (
      formData.name.trim() !== "" &&
      cleanPhone.length === 10 &&
      formData.date !== "" &&
      formData.time !== "" &&
      formData.mode !== ""
    );
  };

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

    // Email is now OPTIONAL - only validate format if provided
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Valid 10 digit phone number required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required (Tuesday, Thursday, or Saturday only)";
    } else {
      // Validate that selected date is actually allowed
      const selectedDate = new Date(formData.date);
      if (!isDateAllowed(selectedDate)) {
        newErrors.date = "Please select a Tuesday, Thursday, or Saturday";
      }
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

  const handleClosePopup = () => {
    // Only allow closing if form is filled OR already submitted
    if (isFormFilled() || isSubmitted) {
      setShowPopup(false);
      document.body.style.overflow = "auto";
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
      const cleanPhone = formData.phone.replace(/\D/g, "");
      
      // Generate dummy email if user didn't provide one
      let finalEmail = formData.email.trim();
      if (!finalEmail) {
        finalEmail = `user_${cleanPhone}_${Date.now()}@temp.manovaidya.com`;
      }

      const payload = {
        name: formData.name.trim(),
        phone: cleanPhone,
        email: finalEmail,
        notes: `
Date: ${formData.date}
Time Slot: ${formData.time}
Mode: ${formData.mode}
        `,
        stage: "VSL Landing page",
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

      // Track Facebook Pixel Event
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Neuro-Assessment Test',
          content_category: 'Consultation Booking',
          phone: cleanPhone,
          mode: formData.mode
        });
        
        fbq('track', 'CompleteRegistration', {
          content_name: 'Consultation Form Submitted',
          status: 'success'
        });
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
        {/* Close Button - Only enabled when form is filled */}
        <div className="sticky top-0 z-10 flex justify-end bg-white pt-3 pr-3 rounded-t-2xl">
          <button
            type="button"
            onClick={handleClosePopup}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isFormFilled() || isSubmitted
                ? "bg-[#f5f2ea] text-[#0b2f1d] hover:bg-[#e8dfd0] cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormFilled() && !isSubmitted}
            title={!isFormFilled() && !isSubmitted ? "Please fill the form first" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pb-6">
          <div className="text-center mb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0b2f1d]">
              Get Help Now
            </h3>
            <p className="mt-1 text-sm text-[#6b756c]">
              Please fill this form to continue. Available on <span className="font-semibold">Tuesdays, Thursdays & Saturdays</span> only.
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
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Email Address <span className="text-[#6b756c] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c]" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email (optional)"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
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
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Custom Date Picker */}
              <div className="calendar-container relative">
                <label className="mb-1 block text-xs font-semibold text-[#193b2b]">
                  Select Date (Tue, Thu, Sat only) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b756c] z-10" />
                  <input
                    type="text"
                    placeholder="Select a date"
                    value={formData.date ? formatDateForDisplay(formData.date) : ""}
                    onFocus={() => setShowCalendar(true)}
                    readOnly
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:border-[#d6a22e] cursor-pointer ${
                      errors.date
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {/* Custom Calendar Dropdown */}
                {showCalendar && (
                  <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-[#e5ddcf] shadow-xl p-3" style={{ minWidth: '280px' }}>
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1 rounded-full hover:bg-[#f5f2ea] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#0b2f1d]" />
                      </button>
                      <span className="text-sm font-semibold text-[#0b2f1d]">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1 rounded-full hover:bg-[#f5f2ea] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-[#0b2f1d]" />
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-[#6b756c] py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {getCalendarDays().map((date, index) => {
                        if (!date) {
                          return <div key={`empty-${index}`} className="p-2"></div>;
                        }
                        
                        const allowed = isDateAllowed(date);
                        const isPast = isPastDate(date);
                        const selected = isSelected(date);
                        const today = isToday(date);
                        const isDisabled = !allowed || isPast;
                        
                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            disabled={isDisabled}
                            className={`
                              p-2 text-center rounded-xl transition-all text-xs
                              ${isDisabled && 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400'}
                              ${allowed && !isPast && !selected && 'hover:bg-[#d6a22e]/20 cursor-pointer text-[#0b2f1d] bg-white'}
                              ${selected && 'bg-[#d6a22e] text-white font-semibold shadow-md'}
                              ${today && !selected && allowed && !isPast && 'border-2 border-[#d6a22e] bg-[#d6a22e]/5'}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="mt-3 pt-2 border-t border-[#e5ddcf] flex items-center justify-center gap-3 text-[10px]">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#d6a22e]"></div>
                        <span className="text-[#6b756c]">Available (Tue, Thu, Sat)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                        <span className="text-[#6b756c]">Not Available</span>
                      </div>
                    </div>
                  </div>
                )}

                {errors.date && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.date}</p>
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
                    className={`rounded-lg border-2 p-2 text-center transition-all ${
                      formData.mode === "online"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10"
                        : "border-[#e5ddcf] bg-[#fbfaf7] hover:border-[#d6a22e]"
                    }`}
                  >
                    <Video className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs font-semibold">Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect("clinic")}
                    className={`rounded-lg border-2 p-2 text-center transition-all ${
                      formData.mode === "clinic"
                        ? "border-[#d6a22e] bg-[#d6a22e]/10"
                        : "border-[#e5ddcf] bg-[#fbfaf7] hover:border-[#d6a22e]"
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
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none appearance-none transition-all focus:border-[#d6a22e] ${
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
                  <p className="text-[10px] text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-[#062f1c] py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-[#0b4028] transition-colors"
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