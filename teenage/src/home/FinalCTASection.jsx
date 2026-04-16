import React from "react";
import { FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#2b3446] to-[#1f2735] py-10 text-center text-white">
      <div className="max-w-[700px] mx-auto px-4">

        {/* Heading */}
        <h2 className="text-[32px] md:text-[36px] font-extrabold leading-tight mb-6">
          Don’t Wait… Your Teen's Development Window Is Critical
        </h2>

        {/* Subtext */}
        <p className="text-[17px] text-white/80 leading-relaxed mb-4">
          Every day matters during these formative years. The patterns forming right now will shape your teen's adult life.
        </p>

        <p className="text-[15px] text-white/70 mb-10">
          Take the first step toward real, lasting change with expert guidance.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">

          {/* Primary */}
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 bg-[#6b8df6] hover:bg-[#5a7df0] text-white px-7 py-4 rounded-[14px] text-[15px] font-semibold shadow-lg transition"
          >
            <FaCalendarAlt />
            Book Free Consultation
          </button>

          {/* Secondary */}
          <a
            href="https://manovaidya.com/Pages/mind-health"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-md transition"
          >
            Take Free Assessment
            <HiOutlineArrowRight />
          </a>

        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[14px] text-white/80 mb-6">

          <a href="tel:+91XXXXXXXXXX" className="hover:underline">
            📞 +91-XXXXXXXXXX
          </a>

          <span className="hidden sm:block">|</span>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FaWhatsapp />
            WhatsApp Support
          </a>

        </div>

        {/* Trust Line (NEW - boosts conversion) */}
        <p className="text-xs text-white/60 mb-6">
          100% Confidential • No Spam • Expert Support
        </p>

        {/* Disclaimer */}
        <div className="flex items-center justify-center gap-2 text-[13px] text-white/60 max-w-[700px] mx-auto">
          <IoWarningOutline className="text-yellow-400 text-[16px] shrink-0" />
          <p>
            Manovaidya programs are not a replacement for emergency care. If your child is experiencing a medical emergency, please seek urgent medical attention immediately.
          </p>
        </div>

      </div>
    </section>
  );
}