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
import childCareImage from "../assets/care-stages/child-care.webp";
import teenWellnessImage from "../assets/care-stages/teen-wellness.webp";
import adultMentalHealthImage from "../assets/care-stages/adult-mental-health.webp";
import womenMentalHealthImage from "../assets/care-stages/women-mental-health.webp";
import seniorCareImage from "../assets/care-stages/senior-care.webp";
import mindBodyWellbeingImage from "../assets/care-stages/mind-body-wellbeing.webp";

const careStages = [
  {
    title: "Child\nDevelopment Care",
    description: "Support for children with developmental, behavioural, learning & communication challenges.",
    icon: Baby,
    image: childCareImage,
    imageAlt: "Child receiving supportive developmental care",
    color: "#52aa43",
    tint: "#f4fbf1",
  },
  {
    title: "Teen Mental\nHealth Care",
    description: "Helping teens build confidence, manage stress and navigate life's challenges.",
    icon: UserRound,
    image: teenWellnessImage,
    imageAlt: "Teen reflecting while writing in a notebook",
    color: "#7b44d6",
    tint: "#faf6ff",
  },
  {
    title: "Adult Mental\nHealth Care",
    description: "Support for anxiety, depression, stress, OCD and emotional wellbeing.",
    icon: Brain,
    image: adultMentalHealthImage,
    imageAlt: "Adult reflecting in a calm and supportive space",
    color: "#2f7ed8",
    tint: "#f4f9ff",
  },
  {
    title: "Women's Mental\nHealth Care",
    description: "Compassionate care for emotional wellbeing across every phase of a woman's life.",
    icon: UsersRound,
    image: womenMentalHealthImage,
    imageAlt: "Woman enjoying a peaceful restorative moment",
    color: "#e64f8a",
    tint: "#fff5fa",
  },
  {
    title: "Senior Mental\nHealth Care",
    description: "Supporting healthy ageing, memory, emotional wellbeing and quality of life.",
    icon: HeartHandshake,
    image: seniorCareImage,
    imageAlt: "Senior couple enjoying an active and joyful life",
    color: "#21a6af",
    tint: "#f1fbfc",
  },
  {
    title: "Mind & Body\nConcerns",
    description: "Addressing the connection between mind, body, lifestyle and overall wellbeing.",
    icon: Flower2,
    image: mindBodyWellbeingImage,
    imageAlt: "Woman meditating beside a peaceful mountain lake",
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careStages.map(({ title, description, icon: Icon, image, imageAlt, color, tint }) => (
            <article
              key={title}
              className="flex min-h-[410px] flex-col items-center overflow-hidden rounded-[13px] border border-[#ececf5] bg-white pb-6 text-center shadow-[0_10px_24px_rgba(21,27,58,0.06)]"
              style={{ background: `linear-gradient(180deg, #ffffff 0%, ${tint} 100%)` }}
            >
              <img
                src={image}
                alt={imageAlt}
                className="h-48 w-full object-cover"
                width="1200"
                height="600"
                decoding="async"
              />

              <span
                className="relative -mt-8 flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white text-white shadow-[0_8px_18px_rgba(21,27,58,0.12)]"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-8 w-8" strokeWidth={2.4} />
              </span>

              <h3 className="mt-4 whitespace-pre-line px-5 text-[20px] font-black leading-[1.14] text-[#1c2343]">
                {title}
              </h3>

              <p className="mt-4 min-h-[78px] px-5 text-[12.5px] font-bold leading-[1.75] text-[#4c536a]">
                {description}
              </p>

              <a
                href="#care-services"
                className="mt-auto inline-flex items-center justify-center gap-2 px-5 text-[14px] font-black"
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
