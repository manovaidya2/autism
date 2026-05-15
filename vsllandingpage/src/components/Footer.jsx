import React from "react";
import { Brain, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f7f2] border-t border-[#e7dfd2]">

      <div className="max-w-[1900px] mx-auto px-5 sm:px-8 lg:px-14 py-7">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <Brain className="h-5 w-5 text-[#062f1c]" />

            <p className="font-serif text-[20px] sm:text-[22px] text-[#062f1c]">
              Neuro-Ayurveda
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* COPYRIGHT */}
            <p className="text-[15px] sm:text-[16px] text-[#30453a] text-center">
              © {new Date().getFullYear()} Neuro-Ayurveda Development System. All rights reserved.
            </p>

            {/* CHAT BUTTON */}
            {/* <a
              href="https://wa.me/917823838638"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#062f1c] transition-all duration-300 hover:scale-[1.05]"
            >

              <MessageCircle className="h-10 w-10 text-[#d6a22e]" />

            </a> */}

          </div>

        </div>

      </div>

    </footer>
  );
}