import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import neuralBg from "../images/image.png";
import BookingModal from "../components/BookingModal";

export default function FinalCTA() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#062f1c] py-20 sm:py-24 lg:py-32 text-white">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src={neuralBg}
            alt=""
            className="h-full w-full object-cover opacity-[0.10]"
          />

          <div className="absolute inset-0"></div>
        </div>

        {/* GLOW */}
        <div className="absolute top-[-120px] left-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

        <div className="absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

          {/* TITLE */}
          <h2 className="font-serif font-normal text-[38px] sm:text-[52px] lg:text-[66px] leading-[1.06] tracking-[-0.05em] text-white">

            Autism improvement begins

            <br className="hidden sm:block" />

            with{" "}

            <span className="italic text-[#d6a22e]">
              clarity
            </span>

            …

            <br />

            not random treatment.

          </h2>

          {/* DIVIDER */}
          <div className="my-10 mx-auto h-[1px] max-w-xs bg-gradient-to-r from-transparent via-[#d6a22e] to-transparent"></div>

          {/* BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#d6a22e] px-8 sm:px-10 py-4 sm:py-5 text-[16px] sm:text-[18px] font-semibold text-[#062f1c] shadow-[0_20px_45px_rgba(214,162,46,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
          >

            <Sparkles className="h-5 w-5" />

            Book Your ₹599 Clarity Session

          </button>

          {/* TEXT */}
          <p className="mt-6 text-[14px] text-white/65">
            Limited slots available this week
          </p>

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