import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import BookingModal from "../components/BookingModal";

export default function Decision() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20">

        {/* GLOW */}
        <div className="absolute top-[-120px] right-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

        <div className="mx-auto px-4 sm:px-6 lg:px-30">

          {/* TOP */}
          <div className="text-center max-w-3xl mx-auto">

            {/* LABEL */}
            <div className="flex items-center justify-center gap-3">

              <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
                You Have Two Options
              </p>

              <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

            </div>

            {/* TITLE */}
            <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">
              A clear decision point.
            </h2>

          </div>

          {/* CARDS */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* OPTION A */}
            <div className="rounded-[30px] border border-[#e5ddcf] bg-white p-7 sm:p-9 shadow-sm">

              <div className="inline-flex rounded-full bg-[#f5f2ea] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#7b857d] font-semibold">
                Option A
              </div>

              <h3 className="mt-6 font-serif text-[30px] sm:text-[30px] leading-[1.08] text-[#0b2f1d]">
                Continue trial-based approaches
              </h3>

              <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.8] text-[#6b756c]">
                Keep trying random therapies, hoping something works.
                Slow progress. Unclear direction.
              </p>

            </div>

            {/* OPTION B */}
            <div className="relative overflow-hidden rounded-[30px] bg-[#062f1c] p-7 sm:p-9 text-white shadow-[0_25px_70px_rgba(6,47,28,0.18)]">

              {/* GLOW */}
              <div className="absolute top-[-60px] right-[-60px] h-[180px] w-[180px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

              <div className="relative">

                <div className="inline-flex rounded-full border border-[#d6a22e]/30 bg-[#d6a22e]/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
                  Option B
                </div>

                <h3 className="mt-6 font-serif text-[30px] sm:text-[30px] leading-[1.08]">
                  Understand the problem clearly
                </h3>

                <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.8] text-white/75">
                  Move forward with a structured system.
                  Predictable phases. Measurable progress.
                </p>

                {/* BUTTON */}
                <div className="mt-8">

                  <button
                    onClick={() => setOpen(true)}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#d6a22e] px-7 py-3.5 text-[15px] font-semibold text-[#062f1c] transition-all duration-300 hover:scale-[1.02]"
                  >

                  
Book Neuro-Assessment Development Test

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                  </button>

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