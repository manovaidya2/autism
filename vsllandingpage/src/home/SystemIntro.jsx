import React from "react";
import image from "../images/image.png";

export default function SystemIntro() {
  return (
    <section
      id="system"
      className="relative overflow-hidden bg-[#062f1c] py-20 sm:py-24 lg:py-32"
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">

        <img
          src={image}
          alt="Neuro Ayurveda System"
          className="w-full h-full object-cover opacity-[0.10]"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 "></div>

      </div>

      {/* GLOW */}
      <div className="absolute top-[-100px] left-[-80px] h-[220px] w-[220px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-90px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

        {/* TOP LABEL */}
        <div className="inline-flex items-center gap-4">

          <span className="h-[1px] w-10 bg-[#d6a22e]"></span>

          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#d6a22e] font-semibold">
            OUR APPROACH
          </p>

          <span className="h-[1px] w-10 bg-[#d6a22e]"></span>

        </div>

        {/* HEADING */}
        <h2 className="mt-10 font-serif font-light text-[42px] sm:text-[58px] lg:text-[64px] leading-[1.08] tracking-[-0.05em] text-white">

          {/* FIRST ROW */}
          <span className="block">
            We follow a structured{" "}

            <span className="text-[#d6a22e] italic">
              Neuro-
            </span>
          </span>

          {/* SECOND ROW */}
          <span className="block text-[#d6a22e] italic">
            Ayurveda Development System.
          </span>

        </h2>

        {/* DESCRIPTION */}
        <p className="mt-10 text-[16px] sm:text-[20px] leading-relaxed text-white/80 max-w-4xl mx-auto font-light">

          We do not begin with treatment.
          {" "}
          We begin with understanding the system.

        </p>

      </div>

    </section>
  );
}