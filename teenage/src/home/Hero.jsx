import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import imghero from "../images/hero.jpeg";

export default function HeroSection() {
  return (
    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-20 bg-gradient-to-r from-[#f6f8fc] via-[#f8f9fc] to-[#f4e7c5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

        {/* LEFT */}
        <div className="flex-1 max-w-xl text-center md:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#eef3ff] text-[#5b8cff] text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 shadow-sm">
            <span>🛡️</span>
            Brain–Gut–Neurodevelopment Approach
          </div>

          {/* Heading */}
          <h1 className="text-[22px] sm:text-[30px] md:text-[40px] font-bold text-[#1a1a2e] leading-[1.3] sm:leading-[1.25]">
            Understanding Your Teen Isn't Enough…{" "}
            <span className="text-[#6c8ef5] block sm:inline">
              Real Change Is Possible
            </span>
          </h1>

          {/* Text */}
          <p className="mt-3 sm:mt-4 text-[#6b7280] text-[13.5px] sm:text-[15.5px] leading-[1.6]">
            A science-backed Brain–Gut–Neurodevelopment approach designed to
            improve focus, emotional stability, behavior, and confidence in teenagers.
          </p>

          <p className="mt-2 sm:mt-3 text-[#2c2c2c] text-[13.5px] sm:text-[15.5px] leading-[1.6] font-medium">
            If your teen is struggling with focus, anger, anxiety, or social withdrawal — 
            you're not alone, and there is a structured way forward.
          </p>

          {/* Buttons */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="https://manovaidya.com/Pages/mind-health"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block bg-[#6c8ef5] hover:bg-[#5a7df0] text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
            >
              → Take Free Assessment
            </a>

            <button className="w-full sm:w-auto border border-[#cfd6e4] text-[#6c8ef5] px-5 sm:px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#f3f6ff]">
              Explore Program →
            </button>
          </div>

          {/* Features */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 text-[13px] sm:text-sm text-[#6b7280] items-start md:items-start">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-[#6c8ef5] text-xs" />
              Clinically Guided
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-[#6c8ef5] text-xs" />
              Personalized Plan
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-[#6c8ef5] text-xs" />
              3000+ Teens Helped
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-center w-full">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[550px] h-[220px] sm:h-[300px] md:h-[400px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            {/* IMAGE */}
            <img
              src={imghero}
              alt="Hero"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Top Badge */}
            <div className="absolute top-2 left-2 sm:left-4 bg-white rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 shadow-md text-[9px] sm:text-xs text-gray-700">
              <span className="text-[#6c8ef5] font-bold text-xs sm:text-sm">90%+</span><br />
              Report Improvement
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-2 right-2 sm:right-4 bg-[#ffe7a3] rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 shadow-md text-[9px] sm:text-xs text-gray-800">
              <span className="font-bold text-xs sm:text-sm">3000+</span><br />
              Teens Helped
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}