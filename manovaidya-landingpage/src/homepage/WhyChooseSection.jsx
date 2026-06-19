import React from "react";
import {
  BarChart3,
  ClipboardCheck,
  Globe2,
  Heart,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";

const reasons = [
  {
    title: "Structured\nAssessments",
    description: "In-depth understanding to identify root causes and needs",
    icon: ClipboardCheck,
  },
  {
    title: "Personalised\nGuidance",
    description: "Care plans tailored to individual needs and goals",
    icon: UserRound,
  },
  {
    title: "Family-Centred\nApproach",
    description: "We involve families at every step of the healing journey.",
    icon: UsersRound,
  },
  {
    title: "Neuro-Ayurveda\nApproach",
    description: "Integrating Ayurvedic wisdom with modern understanding",
    icon: Workflow,
  },
  {
    title: "Online\nAcross India",
    description: "Consultations from the comfort of your home.",
    icon: Globe2,
  },
  {
    title: "Progress\nTracking",
    description: "Regular follow-ups to support long-term wellbeing",
    icon: BarChart3,
  },
];

function WhyChooseSection() {
  return (
    <section id="why-manovaidya" className="bg-[#fbfbff] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto">
        <div className="rounded-[18px] border border-[#ececf5] bg-white px-4 pb-5 pt-2 shadow-[0_10px_24px_rgba(21,27,58,0.04)]">
          <div className="mb-3 flex items-center justify-center gap-4 text-center">
            <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
            <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
            <h2 className="font-serif text-[22px] font-black leading-tight text-[#171b3a] sm:text-[31px]">
              Why Families Choose Manovaidya
            </h2>
            <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
            <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
          </div>

          <div className="grid grid-cols-2 rounded-[14px] bg-white sm:grid-cols-3 lg:grid-cols-6">
            {reasons.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex min-h-[168px] flex-col items-center px-5 pb-3 pt-2 text-center lg:border-r lg:border-[#e8e7f0] lg:last:border-r-0"
              >
                <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#f7fbf9] ring-2 ring-[#e5f0ea]">
                  <Icon className="h-10 w-10 text-[#317d69]" strokeWidth={1.8} />
                </span>

                <h3 className="mt-3 whitespace-pre-line text-[15px] font-black leading-[1.2] text-[#1d2441]">
                  {title}
                </h3>

                <p className="mt-3 text-[12px] font-extrabold leading-[1.55] text-[#35405a]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
