import React, { useState } from "react";
import axios from "../api/axiosInstance";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    mode: "online",
  });

  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "11:00-11:10 AM",
    "11:10-11:20 AM",
    "11:20-11:30 AM",
    "11:30-11:40 AM",
    "11:40-11:50 AM",
    "11:50-12:00 PM",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/bookings", formData);

      window.location.href = "https://rzp.io/rzp/ydaKYJsq";
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if a date is allowed (Tuesday, Thursday, or Saturday)
  const isDateAllowed = (date) => {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
    return day === 2 || day === 4 || day === 6; // Tuesday (2), Thursday (4), Saturday (6)
  };

  // Get next available allowed date
  const getNextAllowedDate = () => {
    const today = new Date();
    let nextDate = new Date(today);
    
    while (!isDateAllowed(nextDate)) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return nextDate;
  };

  // Get min date (today or next allowed date if today is not allowed)
  const getMinDate = () => {
    const today = new Date();
    if (isDateAllowed(today)) {
      return today.toISOString().split("T")[0];
    }
    return getNextAllowedDate().toISOString().split("T")[0];
  };

  // Handle date change with validation
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    
    if (!isDateAllowed(selectedDate)) {
      alert("Assessments are only available on Tuesdays, Thursdays, and Saturdays. Please select another date.");
      setFormData({ ...formData, date: "" });
    } else {
      setFormData({ ...formData, date: e.target.value });
    }
  };

  // Custom styling for date input to show allowed days
  const getDateInputProps = () => {
    return {
      min: getMinDate(),
      pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
      title: "Assessments available only on Tuesdays, Thursdays, and Saturdays",
    };
  };

  // Format allowed days message
  const getAllowedDaysMessage = () => {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextTuesday = new Date(today);
    const nextThursday = new Date(today);
    const nextSaturday = new Date(today);
    
    // Find next Tuesday
    while (nextTuesday.getDay() !== 2) nextTuesday.setDate(nextTuesday.getDate() + 1);
    // Find next Thursday
    while (nextThursday.getDay() !== 4) nextThursday.setDate(nextThursday.getDate() + 1);
    // Find next Saturday
    while (nextSaturday.getDay() !== 6) nextSaturday.setDate(nextSaturday.getDate() + 1);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };
    
    return `Next available: Tue (${formatDate(nextTuesday)}), Thu (${formatDate(nextThursday)}), Sat (${formatDate(nextSaturday)})`;
  };

  return (
    <section className="min-h-screen bg-[#f8f7f2] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px] grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        
        <div>
          <span className="inline-flex rounded-full bg-[#e9dfcf] px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-[#06351f]">
            Neuro-Assessment Booking
          </span>

          <h1 className="mt-6 text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.05] font-serif text-[#062f1c]">
            Book Your Neuro-Assessment Development Test
          </h1>

          <p className="mt-6 text-[16px] sm:text-[18px] leading-8 text-[#5f665f] max-w-xl">
            Fill your details and select a comfortable time slot. After
            submission, you will be redirected to the secure Razorpay payment
            page.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-xl">
            <div className="rounded-2xl bg-white border border-[#eee8dc] p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#062f1c]">01</p>
              <p className="mt-1 text-sm text-[#5f665f]">Fill Details</p>
            </div>

            <div className="rounded-2xl bg-white border border-[#eee8dc] p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#062f1c]">02</p>
              <p className="mt-1 text-sm text-[#5f665f]">Select Slot</p>
            </div>

            <div className="rounded-2xl bg-white border border-[#eee8dc] p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#062f1c]">03</p>
              <p className="mt-1 text-sm text-[#5f665f]">Pay Online</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#eee8dc] shadow-2xl p-5 sm:p-8">
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#062f1c]">
              Appointment Form
            </h2>
            <p className="mt-2 text-sm text-[#747a72]">
              Assessments available only on Tuesdays, Thursdays & Saturdays
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#e5ddcf] bg-[#fbfaf7] px-4 py-4 text-sm outline-none focus:border-[#06351f] focus:ring-2 focus:ring-[#06351f]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#e5ddcf] bg-[#fbfaf7] px-4 py-4 text-sm outline-none focus:border-[#06351f] focus:ring-2 focus:ring-[#06351f]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#e5ddcf] bg-[#fbfaf7] px-4 py-4 text-sm outline-none focus:border-[#06351f] focus:ring-2 focus:ring-[#06351f]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: "online" })}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    formData.mode === "online"
                      ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
                      : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Online</span>
                  <p className="text-xs mt-1">Video Consultation</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: "clinic" })}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    formData.mode === "clinic"
                      ? "border-[#d6a22e] bg-[#d6a22e]/10 text-[#06351f]"
                      : "border-[#e5ddcf] bg-[#fbfaf7] text-[#5f665f] hover:border-[#d6a22e]"
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-semibold">Clinic</span>
                  <p className="text-xs mt-1">In-Person Visit</p>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleDateChange}
                  min={getMinDate()}
                  required
                  {...getDateInputProps()}
                  className="w-full rounded-2xl border border-[#e5ddcf] bg-[#fbfaf7] px-4 py-4 text-sm outline-none focus:border-[#06351f] focus:ring-2 focus:ring-[#06351f]/10 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <p className="mt-2 text-xs text-[#d6a22e] font-medium">
                  📅 {getAllowedDaysMessage()}
                </p>
                <p className="mt-1 text-xs text-[#747a72]">
                  ⚠️ Assessments only on Tuesdays, Thursdays & Saturdays
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#193b2b]">
                  Select Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e5ddcf] bg-[#fbfaf7] px-4 py-4 text-sm outline-none focus:border-[#06351f] focus:ring-2 focus:ring-[#06351f]/10"
                >
                  <option value="">Available Time Slots</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Info box about available days */}
            <div className="rounded-xl bg-[#fbfaf7] border border-[#e5ddcf] p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d6a22e]/10 flex items-center justify-center">
                  <span className="text-[#d6a22e] text-lg">📅</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#06351f]">
                    Available Assessment Days
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-[#e5ddcf]">
                      <span className="w-2 h-2 rounded-full bg-[#d6a22e]"></span>
                      Tuesday
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-[#e5ddcf]">
                      <span className="w-2 h-2 rounded-full bg-[#d6a22e]"></span>
                      Thursday
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-[#e5ddcf]">
                      <span className="w-2 h-2 rounded-full bg-[#d6a22e]"></span>
                      Saturday
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#747a72]">
                    ⏰ Time slots: 11:00 AM - 12:00 PM (10-minute each)
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#06351f] px-6 py-4 text-white text-[15px] font-bold shadow-lg hover:bg-[#0b4028] transition disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Book & Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}