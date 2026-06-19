import React from "react";
import { Brain, Puzzle, Target, UserRound, UsersRound } from "lucide-react";

const reasons = [
  {
    title: "Autism & ADHD\nSupport",
    description:
      "Guidance for communication challenges, attention difficulties, behaviour concerns and developmental needs.",
    Icon: Puzzle,
  },
  {
    title: "Child Development\nGuidance",
    description:
      "Support for milestones, learning difficulties, speech concerns, sensory processing and overall development.",
    Icon: UserRound,
  },
  {
    title: "Teen & Adult\nMental Health",
    description:
      "Support for stress, anxiety, overthinking, emotional challenges, confidence and motivation.",
    Icon: UsersRound,
  },
  {
    title: "Brain-Gut-Mind\nPerspective",
    description:
      "Understanding the deep connection between brain, gut, emotions, behaviour, sleep, lifestyle and wellbeing.",
    Icon: Brain,
  },
  {
    title: "Personalised\nRoadmap",
    description:
      "Individualised approach with clear guidance and long-term support focused on meaningful and measurable progress.",
    Icon: Target,
  },
];

function AboutManovaidyaWhyChooseSection() {
  return (
    <section className="bg-[#fbfaff] px-[10px] py-7 sm:py-8 lg:px-10 lg:py-9">
      <div className="w-full">
        <div className="flex items-center justify-center gap-3 text-center sm:gap-5">
          <span className="hidden h-px w-28 bg-[#8B43BA]/18 sm:block" />
          <h2 className="text-[24px] font-black leading-tight text-[#4d2a74] sm:text-[28px] lg:text-[30px]">
            Why Families Choose{" "}
            <span className="text-[#8B43BA]">Manovaidya</span>
          </h2>
          <span className="hidden h-px w-28 bg-[#8B43BA]/18 sm:block" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 sm:mt-6 sm:grid-cols-2 lg:mt-7 lg:grid-cols-5">
          {reasons.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="flex min-h-[188px] flex-col items-center rounded-xl border border-[#8B43BA]/14 bg-white px-4 py-4 text-center shadow-[0_12px_28px_rgba(31,19,56,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(31,19,56,0.1)] sm:min-h-[205px] lg:min-h-[216px] lg:px-4 lg:py-5"
            >
              <Icon className="h-10 w-10 shrink-0 text-[#8B43BA] sm:h-11 sm:w-11" strokeWidth={1.9} />

              <h3 className="mt-3 min-h-[43px] whitespace-pre-line text-[15px] font-black leading-[1.3] text-[#5a31ad] lg:text-[15.5px]">
                {title}
              </h3>

              <p className="mt-2 max-w-[280px] text-[13px] font-bold leading-[1.6] text-[#251553] min-[460px]:max-w-[210px] lg:text-[13.5px]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutManovaidyaWhyChooseSection;
