import React from "react";
import {
  Brain,
  Pill,
  Syringe,
  Heart,
  Activity,
  Briefcase,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const topItems = [
  { label: "Brain", icon: Brain },
  { label: "Gut", icon: Pill },
  { label: "Nervous\nSystem", icon: Syringe },
  { label: "Emotions", icon: Heart },
  { label: "Behaviour", icon: Activity },
  { label: "Daily Life", icon: Briefcase },
];

const cards = [
  {
    title: "Brain Chemistry",
    text: "Affects focus, motivation, and mood. Imbalanced neurotransmitters lead to brain fog and emotional flatness.",
  },
  {
    title: "Gut Health",
    text: "90% of serotonin is made in the gut. Inflammation here drives anxiety, depression, and mental fatigue.",
  },
  {
    title: "Nervous System Overload",
    text: "Chronic stress keeps the body in fight-or-flight, fueling anxiety, irritability, and burnout.",
  },
  {
    title: "Sleep Disruption",
    text: "Poor sleep impairs memory consolidation, emotional regulation, immune function, and physical recovery.",
  },
  {
    title: "Lifestyle Stress",
    text: "Diet, screen exposure, sedentary patterns, and unprocessed emotional load push the entire system out of balance.",
  },
  {
    title: "The Connection",
    text: "These systems don't work in isolation — they amplify each other.",
  },
];

export default function SymptomsConnectedSection() {
  return (
    <section className="w-full bg-[#f8f8fb] py-8 md:py-12">
      <div className="mx-auto max-w-[1100px] px-4">

        {/* Heading */}
        <div className="text-center max-w-[720px] mx-auto">
          <h2 className="text-[24px] md:text-[36px] font-bold leading-tight text-[#10254d]">
            Your Symptoms Are Not Random — They Are Connected
          </h2>

          <p className="mt-3 text-[14px] md:text-[16px] text-[#6b7893] leading-relaxed">
            Adult mental wellness is not just emotional — it's deeply connected to your internal biology.
          </p>
        </div>

        {/* Icons Row */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex items-center justify-center gap-3 min-w-[750px] md:min-w-0">

            {topItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.label}>
                  <div className="flex flex-col items-center text-center min-w-[90px]">
                    
                    {/* 🔥 ICON SIZE INCREASED */}
                    <div className="h-[56px] w-[56px] flex  items-center justify-center rounded-[14px] bg-[#eef2ff]">
                      <Icon size={24} className="text-[#6c8cff]" />
                    </div>

                    <p className="mt-2 text-[12px] md:text-[13px] font-medium text-[#0f1f44] whitespace-pre-line">
                      {item.label}
                    </p>
                  </div>

                  {index !== topItems.length - 1 && (
                    <ChevronRight size={18} className="text-[#9db2ff]" />
                  )}
                </React.Fragment>
              );
            })}

          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#eef0fb] rounded-[16px] p-4"
            >
              <div className="flex gap-2">

                {/* 🔥 CHECK ICON SIZE INCREASED */}
                <CheckCircle2 size={18} className="text-[#7292ff] mt-1" />

                <div>
                  {/* 🔥 TITLE BIG + BLACK + BOLD */}
                  <h3 className="text-[16px] md:text-[17px] font-bold text-black">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-[12px] md:text-[14px] text-[#66728c] leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-6 bg-[#eef0fb] rounded-[16px] p-4 text-center">
          <p className="text-[14px] md:text-[18px] font-semibold text-[#11254d]">
            "Your symptoms are the output.{" "}
            <span className="text-[#6f8fff]">
              The real issue may be inside the system.
            </span>"
          </p>
        </div>

      </div>
    </section>
  );
}