import React from "react";
import {
  Brain,
  Check,
  Hand,
  Network,
  UsersRound,
  Utensils,
} from "lucide-react";

const pillars = [
  {
    title: "Brain\nNourishment\nSystem",
    Icon: Brain,
    color: "bg-[#55aa64]",
    iconClass: "left-1/2 top-[14%] -translate-x-1/2 -translate-y-1/2",
    labelClass: "left-[62%] top-[10%] text-left",
  },
  {
    title: "Gut\nResponse\nSystem",
    Icon: Utensils,
    color: "bg-[#40a03f]",
    iconClass: "left-[82%] top-[38%] -translate-x-1/2 -translate-y-1/2",
    labelClass: "left-[92%] top-[33%] text-left",
  },
  {
    title: "Neural\nNetwork\nSystem",
    Icon: Network,
    color: "bg-[#4c73cf]",
    iconClass: "left-[68%] top-[78%] -translate-x-1/2 -translate-y-1/2",
    labelClass: "left-[78%] top-[72%] text-left",
  },
  {
    title: "Sensory\nIntegration\nSystem",
    Icon: Hand,
    color: "bg-[#d94a86]",
    iconClass: "left-[32%] top-[78%] -translate-x-1/2 -translate-y-1/2",
    labelClass: "right-[76%] top-[72%] text-right",
  },
  {
    title: "Behaviour\nGuidance\nSystem",
    Icon: UsersRound,
    color: "bg-[#ff7d22]",
    iconClass: "left-[18%] top-[38%] -translate-x-1/2 -translate-y-1/2",
    labelClass: "right-[82%] top-[49%] text-right",
  },
];

const checklist = [
  "Brain Nourishment System",
  "Gut Response System",
  "Neural Network System",
  "Sensory Integration System",
  "Behaviour Guidance System",
];

function NeuroAyurvedaSystemSection() {
  return (
    <section className="bg-[#fbfaff] px-4 pb-10 sm:px-6 sm:pb-12 lg:px-10 lg:pb-16">
      <div className="mx-auto w-full rounded-2xl border border-[#8B43BA]/12 bg-white px-4 py-6 shadow-[0_12px_34px_rgba(31,19,56,0.08)] sm:px-8 sm:py-8 lg:px-9">
        <h2 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[24px] font-black leading-tight text-[#4d2a74] sm:gap-x-8 sm:gap-y-2 sm:text-[clamp(24px,2.4vw,36px)]">
          <span className="text-[#8B43BA]">...</span>
          <span>The Neuro-Ayurveda Development System</span>
          <span className="text-[#8B43BA]">...</span>
        </h2>

        <div className="mt-6 grid items-center gap-7 sm:mt-8 sm:gap-8 lg:grid-cols-[0.92fr_1.25fr_0.92fr]">
          <div className="space-y-5 text-[14px] font-bold leading-7 text-[#251553] sm:space-y-8 sm:text-[15px] sm:leading-8">
            <p>
              At Manovaidya, we use a 5-pillar integrated Neuro-Ayurveda
              Development System. It combines the wisdom of Ayurveda with
              modern science to understand the root causes behind developmental
              and mental health concerns.
            </p>
            <p>
              This system helps us look at brain health, digestion, behaviour,
              emotions, sensory processing and lifestyle together - so every
              individual receives care that is personalised, practical and
              focused on long-term improvement and real-life outcomes.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[620px] overflow-hidden sm:overflow-visible">
            <div className="relative mx-auto aspect-square w-[min(100%,340px)] sm:w-[min(100%,520px)]">
              <div className="absolute inset-[18%] rounded-full border-2 border-[#8B43BA]/8" />
              <div className="absolute inset-[32%] rounded-full bg-[#8B43BA]/12" />
              <div className="absolute left-1/2 top-1/2 flex h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#6540c5] text-center text-[10px] font-bold leading-4 text-white shadow-[0_16px_34px_rgba(101,64,197,0.24)] sm:text-[14px] sm:leading-5">
                <Brain className="mb-1 h-5 w-5 sm:mb-1.5 sm:h-8 sm:w-8" strokeWidth={1.8} />
                <span>Neuro-</span>
                <span>Ayurveda</span>
                <span>Development</span>
                <span>System</span>
              </div>

              {pillars.map(({ title, Icon, color, iconClass, labelClass }) => (
                <React.Fragment key={title}>
                  <span
                    className={`absolute ${iconClass} flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-[0_12px_24px_rgba(31,19,56,0.14)] sm:h-[74px] sm:w-[74px] ${color}`}
                  >
                    <Icon className="block h-6 w-6 sm:h-9 sm:w-9" strokeWidth={1.8} />
                  </span>
                  <span
                    className={`absolute hidden max-w-[118px] whitespace-pre-line text-[13px] font-black leading-6 text-[#251553] sm:block ${labelClass}`}
                  >
                    {title}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:hidden">
              {pillars.map(({ title, Icon, color }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl border border-[#8B43BA]/10 bg-white px-3 py-2 shadow-[0_8px_18px_rgba(31,19,56,0.06)]"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${color}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[12.5px] font-black leading-5 text-[#251553]">
                    {title.replaceAll("\n", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[14px] font-bold leading-7 text-[#251553] sm:text-[15px] sm:leading-8">
            <p>The 5 pillars focus on the areas of :</p>
            <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-[#5f43c8]" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 sm:mt-8">
              Together, these pillars help us create personalised care plans
              that support communication, behaviour, learning, emotions and
              overall well-being - so individuals and families can see
              meaningful progress with long-term support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeuroAyurvedaSystemSection;
