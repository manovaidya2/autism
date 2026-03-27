import React from "react";

const steps = [
  {
    title: "Comprehensive Brain Assessment",
    desc: "A thorough 360-degree evaluation covering cognitive function, sensory processing, developmental milestones, gut health markers, nutritional deficiencies, and behavioral patterns. This isn’t a simple checklist — it’s a detailed neurological and functional assessment that identifies exactly where your child’s brain needs support.",
  },
  {
    title: "Internal Correction – Gut + Nutrition",
    desc: "Before any therapy can be truly effective, the brain needs to be ready. We address gut inflammation, repair intestinal permeability (leaky gut), optimize nutrient absorption, and introduce targeted supplementation including omega-3s, magnesium, zinc, B-vitamins, and probiotics specific to neurodevelopmental support.",
  },
  {
    title: "Neural Pathway Activation",
    desc: "Using a combination of structured sensory exercises, auditory processing activities, visual-motor integration tasks, and neurological stimulation techniques, we activate underused neural pathways and strengthen existing connections. The brain begins to process information more efficiently.",
  },
  {
    title: "Behaviour & Communication Building",
    desc: "With the neurological foundation in place, behavioral therapies become exponentially more effective. We implement structured communication training, social skills development, emotional regulation techniques, and positive behavior support — all customized to your child’s specific profile.",
  },
  {
    title: "Independence & Life Skills Development",
    desc: "The ultimate goal: building self-reliance. We work on daily living skills, academic readiness, social interaction, self-advocacy, and age-appropriate independence — preparing your child not just for today, but for a fulfilling future.",
  },
];

export default function StepProgramSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[34px] md:text-[36px] font-bold text-[#1f2a44] leading-snug md:leading-tight">
          Our Step-by-Step Program: From{" "}
          <br className="hidden sm:block" />
          Assessment to Independence
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-500 mt-3 sm:mt-5 text-[14px] sm:text-[16px] md:text-[18px] max-w-3xl mx-auto leading-relaxed">
          A scientific, phase-wise approach to your child’s neurodevelopment —
          each step building on the last.
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
      </div>
    </section>
  );
}