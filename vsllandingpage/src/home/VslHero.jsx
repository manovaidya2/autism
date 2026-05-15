import React, { useEffect, useState } from "react";
import {
  Star,
  Users,
  ShieldCheck,
  Target,
  CalendarDays,
} from "lucide-react";

import doctorImg from "../images/imghero.jpeg";

export default function VslHero() {

  /* LIVE BOOKINGS */
  const bookings = [
    { name: "Rajesh M.", city: "Bengaluru" },
    { name: "Priya S.", city: "Mumbai" },
    { name: "Anita K.", city: "Delhi NCR" },
    { name: "Arjun P.", city: "Hyderabad" },
    { name: "Meera J.", city: "Pune" },
    { name: "Kavita N.", city: "Chennai" },
    { name: "Vikram R.", city: "Ahmedabad" },
  ];

const [activeBooking, setActiveBooking] = useState(0);
const [sessionCount, setSessionCount] = useState(18);

 useEffect(() => {

  const interval = setInterval(() => {

    setActiveBooking((prev) =>
      prev === bookings.length - 1 ? 0 : prev + 1
    );

    setSessionCount((prev) => (prev >= 32 ? 18 : prev + 1));

  }, 2500);

  return () => clearInterval(interval);

}, []);


  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] text-[#0b2f1d]">

      <div className="mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 lg:pt-10 pb-8 lg:pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* TOP LABEL */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">

              <span className="w-6 h-[1px] bg-[#d6a22e]"></span>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#d6a22e] font-semibold">
                Neuro-Development Clarity
              </p>

            </div>

            {/* TITLE */}
            <h1 className="font-serif font-light text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] leading-[1.02] tracking-[-0.04em] text-[#0b2f1d]">

              <span className="whitespace-nowrap">
                Before You Start Autism
              </span>

              <br />

              <span className="text-[#e0aa36]">
                Treatment...
              </span>

              <br />

              <span className="whitespace-nowrap">
                Are You Sure You Know the
              </span>

              <br />

              Exact Problem?

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 text-[#6b756c] text-[14px] sm:text-[15px] leading-relaxed max-w-[530px] mx-auto lg:mx-0 font-light">

              Most parents try multiple therapies — but very few understand
              their child's actual neuro-development gaps.

            </p>

            {/* SMALL INFO */}
            <div className="mt-5 border-l border-[#e0aa36] pl-4 max-w-[530px] mx-auto lg:mx-0 text-left">

              <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#143522] font-normal">

                We don't start treatment immediately. We first identify the root
                cause through a structured{" "}

                <span className="font-semibold">
                  Neuro-Development Assessment.
                </span>

              </p>

            </div>

            {/* WATCH VIDEO BUTTON */}
            <div className="mt-7 flex justify-center lg:justify-start">

              <a
                href="#video"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#062f1c] px-8 sm:px-10 py-4 sm:py-5 text-white shadow-[0_18px_50px_rgba(6,47,28,0.22)] transition-all duration-300 hover:scale-[1.03]"
              >

                {/* Play Button */}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a22e]/40 bg-[#fffaf2] shadow-sm animate-[bounce_2s_infinite]">

                  {/* Pulse */}
                  <span className="absolute inset-0 rounded-full border border-[#d6a22e]/40 animate-ping"></span>

                  <span className="ml-[2px] text-[15px] text-[#d6a22e]">
                    ▶
                  </span>

                </span>

                {/* Text */}
                <div className="flex items-center gap-2">

                  <div className="animate-[bounce_2s_infinite]">

                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#d6a22e] font-semibold">
                      Watch Now
                    </p>

                    <p className="text-[17px] sm:text-[18px] font-semibold leading-none mt-1">
                      Watch Assessment Video
                    </p>

                  </div>

                  {/* Arrow */}
                  <span className="text-[#d6a22e] text-[20px] animate-[bounce_2s_infinite]">
                    →
                  </span>

                </div>

              </a>

            </div>

            {/* REVIEW CARDS */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[530px] mx-auto lg:mx-0">

              {/* GOOGLE CARD */}
              <div className="bg-white border border-[#e7dfd0] rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">

                {/* <div className="h-9 w-9 rounded-full bg-[#f8f7f2] flex items-center justify-center text-base font-bold">
                  G
                </div> */}

                <div className="text-left">

                  <div className="flex items-center gap-1.5">

                    <p className="text-[20px] font-semibold text-[#0b2f1d]">
                      4.9
                    </p>

                    <div className="flex items-center gap-[1px] text-[#d6a22e]">

                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />

                    </div>

                  </div>

                  {/* <p className="text-[10px] text-[#0b2f1d] font-medium">
                    2,300+ Google Reviews · Live
                  </p> */}

                </div>

              </div>

              {/* BOOKINGS CARD */}
              <div className="bg-[#062f1c] rounded-xl px-4 py-3 shadow-[0_20px_40px_rgba(6,47,28,0.15)] flex items-center gap-3 overflow-hidden">

                <Users
                  size={20}
                  className="text-[#d6a22e] flex-shrink-0"
                />

                <div className="text-left min-w-0">

                <p
  key={sessionCount}
  className="text-white text-[13px] font-semibold animate-[slideUp_0.5s_ease]"
>
  🟡 {sessionCount} sessions booked today
</p>

                  {/* AUTO CHANGING TEXT */}
                  <div className="relative h-[16px] overflow-hidden mt-1">

                    <p
                      key={activeBooking}
                      className="text-white/75 text-[10px] absolute left-0 top-0 animate-[slideUp_0.5s_ease]"
                    >
                      {bookings[activeBooking].name} from{" "}
                      {bookings[activeBooking].city} just booked
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* FEATURES */}
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-4 text-[14px] text-[#5f6e62]">

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={12} />
                Structured System
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Target size={12} />
                Root Cause Clarity
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={12} />
                180-Day Plan
              </span>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">

            <div className="relative w-full max-w-[340px] sm:max-w-[390px]">

              {/* BORDER TOP */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l border-t border-[#d6a22e] rounded-tl-xl"></div>

              {/* BORDER BOTTOM */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r border-b border-[#d6a22e] rounded-br-xl"></div>

              {/* IMAGE */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(9,33,22,0.15)]">

                <img
                  src={doctorImg}
                  alt="Brain Gut Behaviour Specialist"
                  className="w-full h-[400px] sm:h-[500px] object-cover object-center"
                />

                {/* OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#062f1c]/95 via-[#062f1c]/65 to-transparent px-4 py-5 text-left">

                  {/* <p className="text-[9px] uppercase tracking-[0.35em] text-[#d6a22e] font-semibold mb-1">
                    System Developer
                  </p> */}

                  <p className="font-serif text-white text-[18px] sm:text-[20px] font-normal">
                    Brain–Gut–Behaviour Specialist
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}