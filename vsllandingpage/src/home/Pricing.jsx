import React, { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import neuralBg from "../images/image.png";
import BookingModal from "../components/BookingModal";

export default function Pricing() {
  const [open, setOpen] = useState(false);

  const points = [
    "Structured child assessment",
    "Neuro-development gap analysis",
    "Root cause clarity",
    "Personalized 3–6 month roadmap",
  ];

  return (
    <>
      <section
        id="book"
        className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* TOP */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

              <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
                The Clarity Session
              </p>

              <span className="h-[1px] w-8 bg-[#d6a22e]"></span>
            </div>

            <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">
              Understand before you decide.
            </h2>
          </div>

          {/* PRICE CARD */}
          <div className="relative mt-12 overflow-hidden rounded-[32px] bg-[#062f1c] p-7 sm:p-10 lg:p-12 text-white shadow-[0_30px_80px_rgba(6,47,28,0.25)]">
            
            <div className="absolute inset-0 opacity-[0.08]">
              <img
                src={neuralBg}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#d6a22e] font-semibold">
                Neuro-Development Clarity Session
              </p>

              <div className="mt-6 flex items-end gap-4">
                <div className="font-serif text-[64px] sm:text-[78px] leading-none text-[#d6a22e]">
                  ₹599
                </div>

                <div className="mb-2 text-[20px] text-white/50 line-through">
                  ₹2000+
                </div>
              </div>

              <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-white/75 max-w-2xl">
                Assessment typically costs ₹2000+.
                The Clarity Session is intentionally
                accessible — so you can understand
                before you decide anything.
              </p>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-[#d6a22e]/60 via-[#d6a22e]/20 to-transparent"></div>

              <ul className="space-y-4">
                {points.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[15px] sm:text-[17px] text-white/90"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#d6a22e] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#d6a22e] px-8 py-4 text-[15px] font-semibold text-[#062f1c] shadow-[0_18px_45px_rgba(214,162,46,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                 
Book Neuro-Assessment Development Test
                </button>

                <div className="flex items-center gap-2 text-[14px] text-[#d6a22e]">
                  <Clock className="h-4 w-4" />
                  Limited slots this week
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Modal */}
      <BookingModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}