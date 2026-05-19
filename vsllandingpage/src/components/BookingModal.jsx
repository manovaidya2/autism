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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import axios from "../api/axiosInstance";

export default function BookingModal({ open, setOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

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

  // Allowed days: Tuesday (2), Thursday (4), Saturday (6)
  const allowedDays = [2, 4, 6];

  // Check if a date is allowed (Tuesday, Thursday, or Saturday)
  const isDateAllowed = (date) => {
    const dayOfWeek = date.getDay();
    return allowedDays.includes(dayOfWeek);
  };

  // Get available dates for display
  const getAvailableDatesDisplay = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      if (isDateAllowed(checkDate)) {
        dates.push(checkDate);
        if (dates.length >= 6) break;
      }
    }
    
    return dates;
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

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Format date for API (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get day name
  const getDayName = (date) => {
    if (!date) return "";
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (date && isDateAllowed(date)) {
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

  const availableDates = getAvailableDatesDisplay();

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
            Fill the details below and proceed to payment. Available on <span className="font-semibold">Tuesdays, Thursdays & Saturdays</span> only.
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

              {/* Date with Custom Calendar */}
              <div className="calendar-container relative">
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Select Date (Tue, Thu, Sat only)
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b756c] z-10" />
                  
                  <input
                    type="text"
                    placeholder="Select a date"
                    value={formData.date ? `${formatDate(new Date(formData.date))} (${getDayName(new Date(formData.date))})` : ""}
                    onFocus={() => setShowCalendar(true)}
                    readOnly
                    className={`w-full rounded-2xl border px-10 py-3 text-sm outline-none transition-all focus:border-[#d6a22e] cursor-pointer ${
                      errors.date
                        ? "border-red-400 bg-red-50"
                        : "border-[#e5ddcf] bg-[#fbfaf7]"
                    }`}
                  />
                </div>

                {/* Custom Calendar Dropdown */}
                {showCalendar && (
                  <div className="absolute z-20 mt-2 w-full bg-white rounded-2xl border border-[#e5ddcf] shadow-xl p-4" style={{ minWidth: '280px' }}>
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1 hover:bg-[#f5f2ea] rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-[#0b2f1d]" />
                      </button>
                      
                      <span className="font-semibold text-[#0b2f1d]">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1 hover:bg-[#f5f2ea] rounded-full transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-[#0b2f1d]" />
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-[#6b756c] py-2">
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
                        const selected = isSelected(date);
                        const today = isToday(date);
                        
                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            disabled={!allowed}
                            className={`
                              p-2 text-center rounded-xl transition-all text-sm font-medium
                              ${!allowed && 'opacity-30 cursor-not-allowed bg-gray-100 text-gray-400'}
                              ${allowed && !selected && 'hover:bg-[#d6a22e]/20 cursor-pointer text-[#0b2f1d]'}
                              ${selected && 'bg-[#d6a22e] text-white font-semibold shadow-md'}
                              ${today && !selected && allowed && 'border-2 border-[#d6a22e] bg-[#d6a22e]/5'}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 pt-3 border-t border-[#e5ddcf] flex items-center justify-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#d6a22e]"></div>
                        <span className="text-[#6b756c]">Available (Tue, Thu, Sat)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                        <span className="text-[#6b756c]">Not Available</span>
                      </div>
                    </div>
                  </div>
                )}

                {errors.date && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.date}</p>
                )}
                
                {/* Show available dates hint */}
                {/* {availableDates.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[11px] text-[#6b756c] font-medium mb-1">Next available dates:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableDates.map((date, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          className="text-xs px-2 py-1 rounded-lg bg-[#f5f2ea] text-[#0b2f1d] hover:bg-[#d6a22e]/20 transition-colors"
                        >
                          {formatDate(date)} ({getDayName(date)})
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}
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