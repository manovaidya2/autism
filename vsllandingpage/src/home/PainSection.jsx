import React from "react";
import { CheckCircle2, X } from "lucide-react";

export default function PainSection() {

  const tried = [
    "Speech therapy",
    "Occupational therapy",
    "Behaviour therapy",
  ];

  const feel = [
    "Progress is slow",
    "Results are inconsistent",
    "Direction is unclear",
  ];

  return (
    <section className="bg-[#f8f7f2] py-10 sm:py-20 overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#d6a22e] font-semibold">
            The Real Problem
          </p>

          <h2 className="mt-5 font-serif text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.08] tracking-[-0.04em] text-[#0b2f1d]">

            Most parents we meet
            <br className="hidden sm:block" />

            <span className="text-[#d6a22e]">
              have already tried everything…
            </span>

          </h2>

        </div>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* LEFT */}
          <div className="rounded-[28px] border border-[#e8dfd0] bg-white p-7 sm:p-9 shadow-sm">

            <p className="text-[11px] uppercase tracking-[0.25em] text-[#7b857d] font-semibold">
              Already tried
            </p>

            <div className="mt-7 space-y-4">

              {tried.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7edd8]">

                    <CheckCircle2 className="h-4 w-4 text-[#d6a22e]" />

                  </div>

                  <p className="text-[#143522] text-[15px] sm:text-[16px] font-medium">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="rounded-[28px] bg-[#062f1c] p-7 sm:p-9 shadow-[0_20px_60px_rgba(6,47,28,0.18)]">

            <p className="text-[11px] uppercase tracking-[0.25em] text-[#d6a22e] font-normal">
              Yet they still feel
            </p>

            <div className="mt-7 space-y-4">

              {feel.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">

                    <X className="h-4 w-4 text-[#d6a22e]" />

                  </div>

                  <p className="text-white text-[15px] sm:text-[16px] font-medium">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-12 text-center">

      <p className="font-serif italic text-[24px] sm:text-[30px] leading-tight text-[#0b2f1d]">

  They are working on
  <span className="text-[#d6a22e]">
    {" "}symptoms…
  </span>

  <br className="sm:hidden" />

  <span className="hidden sm:inline">
    {" "}not the system.
  </span>

  <span className="sm:hidden">
    <br />
    not the system.
  </span>

</p>
        </div>

      </div>

    </section>
  );
}