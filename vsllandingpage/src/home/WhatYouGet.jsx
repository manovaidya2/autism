import React from "react";
import { Sparkles } from "lucide-react";

export default function WhatYouGet() {

  const items = [
    "Structured child assessment",
    "Neuro-development gap analysis",
    "Root cause clarity",
    "Personalized 3–6 month roadmap",
    "Clear direction before treatment",
  ];

  return (
    <section className="bg-[#f7f5ee] py-12 sm:py-16 lg:py-20 overflow-hidden">

      <div className=" mx-auto px-4 sm:px-15 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* LABEL */}
            <div className="flex items-center gap-3">

              <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

              <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.32em] text-[#d6a22e] font-medium">
                Inside the ₹499 Clarity Session
              </p>

            </div>

            {/* TITLE */}
           {/* TITLE */}
<h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[58px] leading-[1] tracking-[-0.05em] text-[#0b2f1d]">

  <span className="whitespace-nowrap">
    What you receive in the
  </span>

  <br />

  Clarity Session

</h2>
            {/* DESCRIPTION */}
            <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.7] text-[#5f6761] max-w-[520px]">

              You don't need more therapies.

              <span className="text-[#0b2f1d] font-semibold">
                {" "}You need the right direction.
              </span>

            </p>

            {/* BUTTON */}
            <div className="mt-8">

              <a
                href="https://wa.me/917823838638"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#062f1c] px-7 sm:px-9 py-4 text-white shadow-[0_15px_35px_rgba(6,47,28,0.16)] transition-all duration-300 hover:scale-[1.02]"
              >

                <Sparkles className="h-4 w-4 text-[#d6a22e]" />

                <span className="text-[15px] sm:text-[16px] font-semibold">
                  Book Your ₹499 Clarity Session
                </span>

              </a>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="rounded-[24px] border border-[#d9d3c6] bg-[#fbfbfa] p-5 sm:p-7 lg:p-8 shadow-sm">

            <div>

              {items.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-[#e6e1d7] py-5 last:border-0 last:pb-0 first:pt-0"
                >

                  {/* NUMBER */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#062f1c] text-[#d6a22e] text-[17px] font-medium font-serif flex-shrink-0">

                    {index + 1}

                  </div>

                  {/* TEXT */}
                  <p className="text-[17px] sm:text-[19px] leading-[1.45] text-[#082b1b] font-normal">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}