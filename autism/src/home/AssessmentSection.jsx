import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function AssessmentSection() {
  const data = [
    {
      title: "Cognitive Delay Analysis",
      desc: "Understand the percentage of delay across key developmental domains",
    },
    {
      title: "Weak Area Identification",
      desc: "Pinpoint exactly which areas — speech, motor, social, sensory — need attention",
    },
    {
      title: "Improvement Potential Score",
      desc: "Based on your child’s age, condition, and current level — how much improvement is possible",
    },
    {
      title: "Personalized Next Steps",
      desc: "A clear, actionable roadmap for what to do next — tailored to your child's specific needs",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#5f8df6] to-[#4c75d9] py-8 sm:py-10 text-center text-white">
      <div className="max-w-[1000px] mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-[26px] sm:text-[40px] font-bold leading-snug sm:leading-tight mb-3 sm:mb-4">
          Discover Your Child's True{" "}
          <br className="hidden sm:block" />
          Developmental Level
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[18px] text-white/90 max-w-[700px] mx-auto mb-3 sm:mb-4 leading-relaxed">
          Our comprehensive FREE assessment gives you clarity on where your child stands and what's possible.
        </p>

        <p className="text-[13px] sm:text-[16px] text-white/80 mb-8 sm:mb-12">
          In just 5 minutes, you'll receive a personalized report covering:
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          
          {data.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 text-left"
            >
              {/* Icon */}
              <div className="mt-1 text-yellow-300 text-[16px] sm:text-[18px]">
                <FaCheckCircle />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-[14px] sm:text-[16px] font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-[12.5px] sm:text-[14px] text-white/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Button */}
        <button className="w-full sm:w-auto bg-white text-[#4c75d9] px-6 sm:px-8 py-3 sm:py-2 rounded-[12px] sm:rounded-[14px] text-[15px] sm:text-[17px] font-semibold flex items-center justify-center gap-2 mx-auto shadow hover:scale-105 transition">
          <span className="text-lg">→</span>
          Start Free Assessment Now
        </button>

        {/* Footer */}
        <p className="text-[13px] sm:text-[15px] text-white/80 mt-4 sm:mt-6">
          100% Free · No credit card required · Results in 5 minutes
        </p>

      </div>
    </section>
  );
}