import React from "react";

const steps = [
  {
    title: "Detailed Assessment",
    desc: "A comprehensive evaluation covering stress patterns, sleep quality, gut health, nutrition, lifestyle habits, and emotional triggers — identifying the exact biological systems contributing to your symptoms.",
  },
  {
    title: "Root-Cause Understanding",
    desc: "We connect the dots — how your sleep affects your focus, how your gut impacts your mood, and how chronic stress disrupts your nervous system. You finally understand why you're feeling this way.",
  },
  {
    title: "Personalized Support Plan",
    desc: "A tailored plan designed for your body and lifestyle — including nutrition guidance, gut support, stress management, sleep optimization, and targeted supplementation where needed.",
  },
  {
    title: "Internal Correction & Regulation",
    desc: "The core transformation phase — calming the nervous system, improving gut function, restoring sleep cycles, and supporting balanced brain chemistry for deeper stability.",
  },
  {
    title: "Progress Tracking & Improvement",
    desc: "We monitor key changes like energy levels, focus, mood, digestion, and stress resilience — adjusting your plan based on how your body responds.",
  },
  {
    title: "Stability & Better Daily Living",
    desc: "Long-term balance is built. You move from constant stress and fatigue to clarity, confidence, and sustainable daily energy.",
  },
];

export default function StepProgramSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[34px] md:text-[36px] font-bold text-[#1f2a44] leading-snug md:leading-tight">
          How the Program Works
          <br className="hidden sm:block" />
          From Stress to Stability
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-500 mt-3 sm:mt-5 text-[14px] sm:text-[16px] md:text-[18px] max-w-3xl mx-auto leading-relaxed">
          A structured 6-stage journey from understanding your symptoms to building long-term balance.
        </p>

        {/* Timeline */}
        <div className="relative mt-8 sm:mt-14">

          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[2px] bg-gray-200"></div>

          <div className="space-y-6 sm:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-6 relative">

                {/* Circle Number */}
                <div className="z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4f7cff] text-white text-[14px] sm:text-[18px] font-bold shadow-md">
                  {index + 1}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-[#1f2a44] text-[15px] sm:text-[18px] md:text-[20px] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] sm:text-[15px] md:text-[16px] mt-1.5 sm:mt-2 leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Quote */}
        <div className="mt-10 text-center">
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#1f2a44] font-medium italic">
            "We don’t just manage symptoms — we work toward deeper correction and lasting change."
          </p>
        </div>

      </div>
    </section>
  );
}