import React from "react";
import {
  ArrowRight,
  Baby,
  Brain,
  Flower2,
  Heart,
  HeartHandshake,
  UserRound,
  UsersRound,
} from "lucide-react";

const careStages = [
  {
    title: "Child\nDevelopment Care",
    description: "Support for children with developmental, behavioural, learning & communication challenges.",
    icon: Baby,
    color: "#52aa43",
    tint: "#f4fbf1",
  },
  {
    title: "Teen Mental\nHealth Care",
    description: "Helping teens build confidence, manage stress and navigate life's challenges.",
    icon: UserRound,
    color: "#7b44d6",
    tint: "#faf6ff",
  },
  {
    title: "Adult Mental\nHealth Care",
    description: "Support for anxiety, depression, stress, OCD and emotional wellbeing.",
    icon: Brain,
    color: "#2f7ed8",
    tint: "#f4f9ff",
  },
  {
    title: "Women's Mental\nHealth Care",
    description: "Compassionate care for emotional wellbeing across every phase of a woman's life.",
    icon: UsersRound,
    color: "#e64f8a",
    tint: "#fff5fa",
  },
  {
    title: "Senior Mental\nHealth Care",
    description: "Supporting healthy ageing, memory, emotional wellbeing and quality of life.",
    icon: HeartHandshake,
    color: "#21a6af",
    tint: "#f1fbfc",
  },
  {
    title: "Mind & Body\nConcerns",
    description: "Addressing the connection between mind, body, lifestyle and overall wellbeing.",
    icon: Flower2,
    color: "#f18427",
    tint: "#fff8f0",
  },
];

function CareStagesSection() {
  return (
    <section id="care-stages" className="bg-[#fbfbff] px-4 pb-12 pt-1 sm:px-6 lg:px-10">
      <div className="mx-auto ">
        <div className="mb-4 flex items-center justify-center gap-4 text-center">
          <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
          <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
          <h2 className="font-serif text-[25px] font-black leading-tight text-[#171b3a] sm:text-[34px]">
            Care Across Every Stage of Life
          </h2>
          <Heart className="h-4 w-4 fill-[#8d62df] text-[#8d62df]" strokeWidth={2.2} />
          <span className="hidden h-[3px] w-10 rounded-full bg-[#d8c5ff] sm:block" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {careStages.map(({ title, description, icon: Icon, color, tint }) => (
            <article
              key={title}
              className="flex min-h-[260px] flex-col items-center rounded-[13px] border border-[#ececf5] bg-white px-5 pb-6 pt-5 text-center shadow-[0_10px_24px_rgba(21,27,58,0.06)]"
              style={{ background: `linear-gradient(180deg, #ffffff 0%, ${tint} 100%)` }}
            >
              <span
                className="flex h-[62px] w-[62px] items-center justify-center rounded-full text-white shadow-[0_8px_18px_rgba(21,27,58,0.12)]"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-8 w-8" strokeWidth={2.4} />
              </span>

              <h3 className="mt-5 whitespace-pre-line text-[20px] font-black leading-[1.14] text-[#1c2343]">
                {title}
              </h3>

              <p className="mt-4 min-h-[78px] text-[12.5px] font-bold leading-[1.75] text-[#4c536a]">
                {description}
              </p>

              <a
                href="#care-services"
                className="mt-auto inline-flex items-center justify-center gap-2 text-[14px] font-black"
                style={{ color }}
              >
                Explore Care
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareStagesSection;
