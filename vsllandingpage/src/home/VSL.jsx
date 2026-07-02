import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import BookingModal from "../components/BookingModal";

export default function VSL() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section
        id="video"
        className="relative overflow-hidden bg-[#f8f7f2] py-16 sm:py-20 lg:py-10"
      >
      <div className="absolute top-[-120px] left-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>
      <div className="absolute bottom-[-130px] right-[-110px] h-[280px] w-[280px] rounded-full bg-[#062f1c]/10 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6a22e]/30 bg-white/70 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#d6a22e] animate-pulse"></span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
              Watch First
            </p>
          </div>

          <h2 className="mt-6 font-serif text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.08] tracking-[-0.04em] text-[#0b2f1d]">
            Watch This Before Starting
            <br className="hidden sm:block" />
            <span className="text-[#d6a22e]"> Any Autism Treatment</span>
          </h2>

          <p className="mt-5 text-[#6b756c] text-[14px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
            A 3-minute briefing on why most therapies fail — and how a
            structured root-cause system creates predictable progress.
          </p>
        </div>

        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="absolute -top-4 -left-4 h-20 w-20 border-l border-t border-[#d6a22e] rounded-tl-2xl"></div>
          <div className="absolute -bottom-4 -right-4 h-20 w-20 border-r border-b border-[#d6a22e] rounded-br-2xl"></div>

          {/* Modern Video Frame Design */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#062f1c] to-[#0a4228] p-3 shadow-[0_30px_60px_-15px_rgba(6,47,28,0.4)]">
            <div className="relative aspect-video overflow-hidden rounded-[24px] bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/0fwIto5Kc2M?si=TlzScZIzh5oJvcIr"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-center text-sm sm:text-base font-semibold transition-all duration-300 bg-[#0b2f1d] text-white hover:bg-purple-600 hover:text-white shadow-xl transform hover:-translate-y-0.5"
            >
              <CheckCircle size={20} />
              Book Neuro-Assessment Development Test
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>

      <BookingModal
        open={bookingOpen}
        setOpen={setBookingOpen}
      />
    </>
  );
}
