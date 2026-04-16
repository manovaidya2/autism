import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function FinalCTASection() {
    const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#2b3446] to-[#1f2735] py-10 text-center text-white">
      <div className="max-w-[700px] mx-auto px-4">

        {/* Heading */}
        <h2 className="text-[36px] font-extrabold leading-tight mb-6">
          Every Day Matters in Your Child's Development
        </h2>

        {/* Subtext */}
        <p className="text-[18px] text-white/80 leading-relaxed mb-4">
          The brain's ability to form new connections is at its peak during childhood.
          The sooner you start, the greater the potential for transformation.
        </p>

        <p className="text-[16px] text-white/70 mb-12">
          Take the first step today — with a free assessment or a no-obligation consultation with our care team.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          
          {/* Primary */}
          <button
      onClick={() => navigate("/contact")} // 👈 change route here
      className="flex items-center gap-2 bg-[#6b8df6] hover:bg-[#5a7df0] text-white px-7 py-4 rounded-[14px] text-[16px] font-semibold shadow-lg transition"
    >
      <FaCalendarAlt className="text-[16px]" />
      Book Free Consultation
    </button>

          {/* Secondary */}
                <a
  href="https://manovaidya.com/Pages/mind-health"
  className="w-full sm:w-auto inline-block bg-white/10  text-whit px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
>
  → Take Free Assessment
</a>
        </div>

        {/* Disclaimer */}
        <div className="flex items-center justify-center gap-2 text-[13px] text-white/60 max-w-[700px] mx-auto">
          <IoWarningOutline className="text-yellow-400 text-[16px] shrink-0" />
          <p>
            Manovaidya programs are not a replacement for emergency care. If your child is experiencing a medical emergency, please seek urgent medical attention immediately.
          </p>
        </div>

      </div>
    </section>
  );
}