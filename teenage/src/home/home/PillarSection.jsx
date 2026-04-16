import React from "react";
import {
  FaBrain,
} from "react-icons/fa";
import { GiStomach } from "react-icons/gi";
import { IoGitNetworkOutline } from "react-icons/io5";
import { MdOutlinePanTool } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

export default function PillarSection() {
  const data = [
    {
      icon: <FaBrain />,
      title: "Brain Nourishment",
      desc: "Targeted micro-nutrition, omega-3 fatty acids, and brain-specific supplements that support neuronal growth, myelination, and synaptic plasticity in developing brains.",
    },
    {
      icon: <GiStomach />,
      title: "Gut Healing Protocol",
      desc: "Restoring the gut-brain axis through probiotic therapy, anti-inflammatory nutrition, and gut lining repair — because 70% of neurotransmitters are produced in the gut.",
    },
    {
      icon: <IoGitNetworkOutline />,
      title: "Neural Network Activation",
      desc: "Structured exercises and therapies designed to stimulate dormant neural pathways, strengthen weak connections, and build new brain circuits for processing and response.",
    },
    {
      icon: <MdOutlinePanTool />,
      title: "Sensory–Motor Integration",
      desc: "Systematic desensitization, proprioceptive input, and motor planning activities that help the brain process sensory information without overwhelm.",
    },
    {
      icon: <AiOutlineLineChart />,
      title: "Behaviour & Communication Alignment",
      desc: "Building positive behavior patterns, functional communication skills, and social understanding through structured, evidence-based support systems.",
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
          A structured, phase-wise neurodevelopment system that addresses the
          root causes — not just the symptoms — of autism and ADHD.
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
          Each pillar builds upon the previous one, creating a comprehensive
          system that{" "}
          <span className="font-bold text-[#1f2b3f]">
            prepares the brain for therapy, accelerates progress, and sustains
            improvements long-term.
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