import React from "react";
import {
  ArrowRight,
  CalendarCheck,
  CloudMoon,
  Flower,
  Heart,
  Orbit,
  Ribbon,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

const concerns = [
  {
    title: "Anxiety\n& Stress",
    icon: Flower,
  },
  {
    title: "Low Mood\nor Sadness",
    icon: UsersRound,
  },
  {
    title: "Overthinking\n& Worry",
    icon: Orbit,
  },
  {
    title: "Sleep\nProblems",
    icon: CloudMoon,
  },
  {
    title: "Behaviour\nChallenges",
    icon: Sparkles,
  },
  {
    title: "Relationship\nIssues",
    icon: Heart,
  },
  {
    title: "Low Confidence\nor Motivation",
    icon: UserRoundCheck,
  },
  {
    title: "Memory or\nFocus Issues",
    icon: Ribbon,
  },
];

function ConcernsSection() {
  return (
    <section id="assessment" className="scroll-mt-24 bg-[#fbfbff] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto">
        <div className="rounded-[22px] border border-[#ececf5] bg-white px-4 pb-4 pt-3 shadow-[0_10px_24px_rgba(21,27,58,0.04)]">
          <div className="mb-6 flex items-center justify-center gap-4 text-center">
            <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
            <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
            <h2 className="font-serif text-[22px] font-black leading-tight text-[#171b3a] sm:text-[31px]">
              Are You Experiencing Any of These Concerns?
            </h2>
            <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
            <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
          </div>

          <div className="grid grid-cols-2 rounded-[16px] bg-white sm:grid-cols-4 lg:grid-cols-8">
            {concerns.map(({ title, icon: Icon }) => (
              <article
                key={title}
                className="flex min-h-[110px] flex-col items-center justify-start px-3 text-center lg:border-r lg:border-[#e8e7f0] lg:last:border-r-0"
              >
                <Icon className="h-[47px] w-[47px] text-[#8b63d8]" strokeWidth={1.9} />
                <h3 className="mt-3 whitespace-pre-line text-[14px] font-black leading-[1.2] text-[#1d2441]">
                  {title}
                </h3>
              </article>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center">
            <a
              href="/#assessment"
              className="inline-flex h-[50px] min-w-[360px] items-center justify-center gap-4 rounded-[8px] bg-[#7a3fe0] px-8 text-[15px] font-black text-white shadow-[0_12px_20px_rgba(122,63,224,0.23)] transition hover:bg-[#6932c8] max-sm:min-w-0 max-sm:w-full"
            >
              <CalendarCheck className="h-5 w-5" strokeWidth={2.4} />
              Take Free Assessment
              <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
            </a>
            <p className="mt-3 text-center text-[13px] font-black text-[#4a5066] sm:text-[15px]">
              Understand your concerns and get personalised guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConcernsSection;
