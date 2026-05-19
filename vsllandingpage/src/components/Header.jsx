import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../images/manovaidya-logo (1).png";
import BookingModal from "./BookingModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[9999] w-full bg-[#f8f7f2]/95 backdrop-blur-md border-b border-[#eee8dc] shadow-sm">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] md:h-[74px] flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="ManoVaidya"
              className="h-[32px] sm:h-[38px] md:h-[40px] w-auto object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-[#0b2f1d]">
            <a href="#system" className="hover:text-[#d6a22e] transition">
              The System
            </a>

            <a href="#plan" className="hover:text-[#d6a22e] transition">
              180-Day Plan
            </a>

            <a href="#cases" className="hover:text-[#d6a22e] transition">
              Case Studies
            </a>

            <a href="#faq" className="hover:text-[#d6a22e] transition">
              FAQ
            </a>
          </nav>

          {/* Desktop Book Button */}
          <button
            onClick={() => setBookingOpen(true)}
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#062f1c] text-white px-4 lg:px-6 py-2.5 rounded-full text-xs lg:text-sm font-bold shadow-md hover:bg-[#0b4028] transition"
          >
            <span>✨</span>

            <span className="hidden md:inline">
              Book Neuro-Assessment Development Test
            </span>

            <span className="md:hidden">
              Book Test
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#062f1c] text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-[#f8f7f2] border-t border-[#eee8dc] px-4 py-4 shadow-lg">
            <nav className="flex flex-col gap-3 text-[15px] font-semibold text-[#0b2f1d]">

              <a
                onClick={() => setOpen(false)}
                href="#system"
                className="py-2"
              >
                The System
              </a>

              <a
                onClick={() => setOpen(false)}
                href="#plan"
                className="py-2"
              >
                180-Day Plan
              </a>

              <a
                onClick={() => setOpen(false)}
                href="#cases"
                className="py-2"
              >
                Case Studies
              </a>

              <a
                onClick={() => setOpen(false)}
                href="#faq"
                className="py-2"
              >
                FAQ
              </a>

              {/* Mobile Book Button */}
              <button
                onClick={() => {
                  setOpen(false);
                  setBookingOpen(true);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#062f1c] text-white px-5 py-3 rounded-full text-sm font-bold shadow-md"
              >
                ✨ Book Neuro-Assessment Development Test
              </button>

            </nav>
          </div>
        )}
      </header>

      {/* Bottom Mobile Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#f8f7f2] border-t border-[#e7e1d6] p-3 sm:hidden">

        <button
          onClick={() => setBookingOpen(true)}
          className="flex items-center justify-center gap-2 w-full rounded-full bg-[#06351f] text-white py-4 px-5 text-[15px] font-bold shadow-lg"
        >
          Book Neuro-Assessment Development Test
        </button>

      </div>

      {/* Modal */}
      <BookingModal
        open={bookingOpen}
        setOpen={setBookingOpen}
      />
    </>
  );
}