// File: PillarSection.jsx
import React from "react";
import {
  FaBrain,
  FaBalanceScale,
  FaBed,
} from "react-icons/fa";
import { GiStomach } from "react-icons/gi";
import { IoBodyOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";

export default function PillarSection() {
  const data = [
    {
      icon: <FaBrain />,
      title: "Brain Chemistry Balance",
      desc: "Targeted nutritional support, neurotransmitter optimization, and brain-specific nutrients that restore chemical balance, improve mood regulation, and enhance cognitive function.",
    },
    {
      icon: <GiStomach />,
      title: "Gut-Brain Axis Restoration",
      desc: "Healing the gut microbiome, reducing inflammation, and repairing intestinal lining — because 90% of serotonin and 50% of dopamine are produced in the gut, directly affecting mood and mental clarity.",
    },
    {
      icon: <IoBodyOutline />,
      title: "Nervous System Regulation",
      desc: "Resetting the autonomic nervous system from chronic 'fight or flight' to a balanced state of rest and recovery — reducing anxiety, improving sleep, and restoring emotional resilience.",
    },
    {
      icon: <FaBed />,
      title: "Sleep & Circadian Repair",
      desc: "Restoring healthy sleep architecture through cortisol management, melatonin regulation, and circadian rhythm optimization — because poor sleep is both a cause and effect of chronic stress.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Stress Resilience Training",
      desc: "Building sustainable coping mechanisms, emotional regulation skills, and mindset shifts that rewire the brain's response to stress — turning reactive patterns into resilient responses.",
    },
  ];

  return (
    <section id="OurSystem" className="bg-[#f6f8fc] py-8 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        
        {/* Title */}
        <h2 className="text-[26px] sm:text-[40px] font-bold text-[#1f2b3f] mb-2 sm:mb-3 leading-snug">
          The Manovaidya 5-Pillar System
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[16px] text-[#6b7a90] max-w-[750px] mx-auto mb-8 sm:mb-12 leading-relaxed">
          A structured, root-cause approach to adult mental wellness that addresses
          the biological foundations — not just the symptoms — of stress, anxiety, and burnout.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 max-sm:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-3 mb-8 sm:mb-12">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#e3e8f3] rounded-[14px] sm:rounded-[18px] p-5 sm:p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-[#eef3ff] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-[#5b7cff] text-lg sm:text-xl hover:bg-blue-300 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1f2b3f] mb-1.5 sm:mb-2">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-[13px] sm:text-[14px] text-[#6b7a90] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="text-[15px] sm:text-[20px] text-[#6b7a90] max-w-[1200px] mx-auto mb-5 sm:mb-6 leading-relaxed">
          Each pillar addresses a specific biological root cause, creating a comprehensive
          system that{" "}
          <span className="font-bold text-[#1f2b3f]">
            restores balance from the inside out, builds lasting resilience, and helps you reclaim your energy, focus, and peace of mind.
          </span>
        </p>

        {/* Button */}
        <button className="w-full sm:w-auto bg-[#5b7cff] hover:bg-[#4a6df0] text-white px-6 sm:px-7 py-3 rounded-[10px] text-[14px] sm:text-[15px] flex items-center justify-center gap-2 mx-auto transition">
          <FiArrowRight className="text-lg" />
          Learn More About Our Approach
        </button>

      </div>
    </section>
  );
}