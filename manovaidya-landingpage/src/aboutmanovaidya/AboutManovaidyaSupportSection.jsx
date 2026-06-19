import React from "react";
import {
  Baby,
  Brain,
  HeartHandshake,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import childrenImage from "../images/support-children.webp";
import teenagersImage from "../images/support-teenagers.webp";
import adultsImage from "../images/support-adults.webp";
import womenImage from "../images/support-women.webp";
import seniorsImage from "../images/support-seniors.webp";

const supportGroups = [
  {
    title: "Children",
    description:
      "Support for developmental milestones, learning, behaviour, communication and more.",
    image: childrenImage,
    Icon: Baby,
  },
  {
    title: "Teenagers",
    description:
      "Guidance for emotional wellbeing, confidence, focus, motivation and behavioural challenges.",
    image: teenagersImage,
    Icon: Brain,
  },
  {
    title: "Adults",
    description:
      "Support for stress, anxiety, overthinking, burnout and lifestyle-related mental health concerns.",
    image: adultsImage,
    Icon: UserRound,
  },
  {
    title: "Women",
    description:
      "Support for emotional wellbeing, stress management, mood changes and life transitions.",
    image: womenImage,
    Icon: HeartHandshake,
  },
  {
    title: "Seniors",
    description:
      "Guidance for emotional wellbeing, cognitive health, memory concerns and quality of life.",
    image: seniorsImage,
    Icon: ShieldCheck,
  },
];

function AboutManovaidyaSupportSection() {
  return (
    <section className="bg-[#fbfaff] px-[10px] py-7 sm:py-8 lg:px-10 lg:py-9">
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 text-center sm:gap-4">
          <span className="hidden h-px w-28 bg-[#8B43BA]/18 sm:block" />
          <span className="text-[#8B43BA]">•</span>
          <h2 className="text-[24px] font-black leading-tight text-[#4d2a74] sm:text-[28px] lg:text-[30px]">
            Who We <span className="text-[#8B43BA]">Support</span>
          </h2>
          <span className="text-[#8B43BA]">•</span>
          <span className="hidden h-px w-28 bg-[#8B43BA]/18 sm:block" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
          {supportGroups.map(({ title, description, image, Icon }) => (
            <article
              key={title}
              className="overflow-hidden rounded-xl border border-[#8B43BA]/14 bg-white text-center shadow-[0_12px_28px_rgba(31,19,56,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(31,19,56,0.1)]"
            >
              <div className="relative">
                <img
                  src={image}
                  alt={`${title} support at Manovaidya`}
                  className="h-[170px] w-full object-cover object-center min-[460px]:h-[140px] sm:h-[150px] lg:h-[130px]"
                  loading="lazy"
                />
                <span className="absolute bottom-[-23px] left-1/2 flex h-[46px] w-[46px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#5a28a5] text-white shadow-[0_10px_20px_rgba(90,40,165,0.22)]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
              </div>

              <div className="px-4 pb-5 pt-8">
                <h3 className="text-[15.5px] font-black leading-tight text-[#8B43BA]">
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-[280px] text-[13px] font-bold leading-[1.62] text-[#251553] min-[460px]:max-w-[210px]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutManovaidyaSupportSection;
