import React from "react";

const steps = [
  {
    title: "Comprehensive Brain & Behavioral Assessment",
    desc: "A detailed 360° evaluation of your teen’s focus, emotional regulation, academic performance, sleep patterns, screen habits, social behavior, gut health, and nutrition. This reveals the real biological root causes — not just surface symptoms.",
  },
  {
    title: "Internal Correction — Gut + Nutrition Optimization",
    desc: "We prepare the brain for real change by addressing gut inflammation, improving nutrient absorption, and introducing targeted support like omega-3s, magnesium, B-vitamins, and probiotics — essential for teen brain stability and performance.",
  },
  {
    title: "Neural Pathway Activation & Strengthening",
    desc: "Using structured cognitive training and brain-based exercises, we strengthen neural circuits responsible for focus, impulse control, emotional balance, and decision-making — the core challenges in teens today.",
  },
  {
    title: "Behavior Stabilization & Emotional Regulation",
    desc: "With the brain now ready, we implement practical tools for managing anxiety, anger, and stress — helping teens develop emotional control, resilience, and healthier behavior patterns.",
  },
  {
    title: "Independence & Confidence Development",
    desc: "We build real-life skills — better study habits, social confidence, reduced screen dependency, improved sleep, and self-discipline — preparing your teen for long-term success, not just short-term improvement.",
  },
];

export default function StepProgramSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[34px] md:text-[36px] font-bold text-[#1f2a44] leading-snug md:leading-tight">
          How Our Teen Wellness Program Works
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-500 mt-3 sm:mt-5 text-[14px] sm:text-[16px] md:text-[18px] max-w-3xl mx-auto leading-relaxed">
          A structured, phase-wise system designed to fix root causes — not just manage symptoms.
        </p>

        {/* 🔥 Hook Line */}
        <p className="text-center text-[#5b7cff] font-medium mt-2">
          This is not random therapy — it’s a system that works step-by-step
        </p>

        {/* Timeline */}
        <div className="relative mt-8 sm:mt-14">

          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[2px] bg-gray-200"></div>

          <div className="space-y-6 sm:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-6 relative">

                {/* Circle Number */}
                <div className="z-10 flex items-center justify-center w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#4f7cff] text-white text-[14px] sm:text-[20px] font-bold shadow-md">
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

        {/* Bottom Statement */}
        <p className="text-center text-[15px] sm:text-[18px] text-[#1f2a44] font-medium mt-10 sm:mt-12">
          We don’t just manage symptoms — we fix what’s causing them.
        </p>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href="https://manovaidya.com/Pages/mind-health"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#5b7cff] hover:bg-[#4a6cf7] text-white px-6 py-3 rounded-xl text-[14px] sm:text-[15px] font-medium shadow-md transition"
          >
            Start Your Teen’s Journey →
          </a>
        </div>

      </div>
    </section>
  );
}