import React from "react";
import { BadgeCheck, Pill, Wind, Moon, Heart } from "lucide-react";

const pillars = [
  {
    tag: "Pillar 1",
    title: "Brain Support",
    description:
      "Targeted nutritional and lifestyle support for cognitive clarity, emotional regulation, and healthy neurotransmitter balance — improving focus, mood stability, and mental sharpness from the inside out.",
    icon: BadgeCheck,
  },
  {
    tag: "Pillar 2",
    title: "Gut Healing",
    description:
      "Restoring the gut–brain axis through anti-inflammatory nutrition, microbiome support, and digestive optimization — addressing the root of mood swings, anxiety, brain fog, and chronic fatigue.",
    icon: Pill,
  },
  {
    tag: "Pillar 3",
    title: "Nervous System Regulation",
    description:
      "Calming the chronically activated stress response through breathwork, vagus nerve stimulation, and structured downregulation practices — shifting your body from fight-or-flight to rest-and-restore.",
    icon: Wind,
  },
  {
    tag: "Pillar 4",
    title: "Sleep & Energy Reset",
    description:
      "Rebuilding restorative sleep architecture and stable daily energy through circadian rhythm correction, cortisol balancing, and targeted recovery protocols — so you wake up actually rested.",
    icon: Moon,
  },
  {
    tag: "Pillar 5",
    title: "Emotional & Lifestyle Alignment",
    description:
      "Building sustainable habits, emotional resilience, and daily structure that support long-term wellness — not quick fixes, but stable patterns for confidence, calm, and consistent performance.",
    icon: Heart,
  },
];

export default function StructuredScienceSystemSection() {
  return (
    <section className="w-full bg-[#f7f7fb] py-10 md:py-10">
      <div className="mx-auto max-w-[1180px] px-4 md:px-6">
        {/* Top pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eef2ff] px-4 py-2 text-[12px] font-medium text-[#6d8cff]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#7d97ff]" />
            The Manovaidya System
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-5 max-w-[760px] text-center">
          <h2 className="text-[28px] font-bold  tracking-[-0.03em] text-[#10244b] md:text-[36px]">
            A Structured, Science-Based System for
            <br className="hidden md:block" />
            Real Adult Transformation
          </h2>

          <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.65] text-[#6b7893] md:text-[18px]">
            Five interconnected pillars working together to restore balance —
            not random advice, but a step-by-step root-cause support system.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`rounded-[20px] border border-[#d7def8] bg-white px-5 py-5 shadow-[0_8px_18px_rgba(76,93,140,0.08)] md:px-6 md:py-6 ${
                  index === 3 ? "xl:col-span-1" : ""
                } ${index === 4 ? "xl:col-span-1" : ""}`}
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[16px] bg-[#6d94ff] shadow-[0_8px_18px_rgba(109,148,255,0.35)]">
                  <Icon size={24} strokeWidth={2.1} className="text-white" />
                </div>

                <div className="mt-4 inline-flex rounded-full bg-[#f6e7a8] px-3 py-[4px] text-[11px] font-bold leading-none text-[#2f2a15]">
                  {item.tag}
                </div>

                <h3 className="mt-3 text-[17px] font-bold  text-[#0f2146] md:text-[20px]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.8] text-[#66728c] md:text-[15px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom quote */}
        <div className="mt-8 rounded-[20px] border border-[#d7def8] bg-white px-5 py-6 text-center shadow-[0_8px_18px_rgba(76,93,140,0.06)] md:mt-10 md:px-8 md:py-7">
          <p className="text-[16px] font-bold leading-[1.5] text-[#12254d] md:text-[21px]">
            "This is not random wellness advice —{" "}
            <span className="text-[#7190ff]">
              it is a step-by-step root-cause support system.
            </span>
            "
          </p>
        </div>
      </div>
    </section>
  );
}