import React from "react";

export default function Expectation() {
  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20">

      {/* GLOW */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[240px] w-[240px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center relative">

        {/* LABEL */}
        <div className="flex items-center justify-center gap-3">

          <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
            Honest Expectations
          </p>

          <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

        </div>

        {/* TITLE */}
        <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">

          We do not promise
          <span className="block italic text-[#d6a22e]">
            overnight results.
          </span>

        </h2>

        {/* DESCRIPTION */}
        <p className="mt-7 text-[18px] sm:text-[22px] leading-[1.8] text-[#5f6761] font-light max-w-3xl mx-auto">

          We provide

          <span className="font-semibold text-[#0b2f1d]">
            {" "}structured direction
          </span>

          {" "}and

          <span className="font-semibold text-[#0b2f1d]">
            {" "}measurable progress.
          </span>

        </p>

      </div>

    </section>
  );
}