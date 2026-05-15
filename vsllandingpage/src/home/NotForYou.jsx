import React from "react";
import { X } from "lucide-react";

export default function NotForYou() {

  const items = [
    "Parents looking for overnight, miracle results",
    "Anyone unwilling to follow a structured 6-month process",
    "Those seeking yet another disconnected therapy session",
    "Parents not ready to invest in clarity before treatment",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20">

      {/* GLOW */}
      <div className="absolute top-[-120px] left-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className=" mx-auto px-4 sm:px-10 lg:px-50">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto">

          {/* LABEL */}
          <div className="flex items-center justify-center gap-3">

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

            <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
              Honest Filter
            </p>

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

          </div>

          {/* TITLE */}
          <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">

            Who this is NOT for
            {/* <span className="italic text-[#d6a22e]">
              {" "}NOT for
            </span> */}

          </h2>

          {/* TEXT */}
          <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-[#6b756c]">
            We work best with parents who value clarity and structure.
          </p>

        </div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {items.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-4 rounded-[24px] border border-[#e5ddcf] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* ICON */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3f2] flex-shrink-0">

                <X className="h-5 w-5 text-[#d26b5c]" />

              </div>

              {/* TEXT */}
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[#234031]">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}