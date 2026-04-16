import React from "react";
import {
  FaVolumeMute,
  FaBolt,
  FaBrain,
  FaBookOpen,
  FaMobileAlt,
  FaUserFriends,
  FaMoon,
  FaExchangeAlt,
} from "react-icons/fa";

const data = [
  {
    icon: <FaVolumeMute />,
    title: "Doesn't Listen or Respond",
    desc: "Your teen seems to tune you out, ignore instructions, and shows no interest in conversations or family activities.",
  },
  {
    icon: <FaBolt />,
    title: "Mood Swings & Anger Outbursts",
    desc: "Sudden emotional explosions, irritability over small things, and unpredictable mood changes that create tension at home.",
  },
  {
    icon: <FaBrain />,
    title: "Anxiety & Overthinking",
    desc: "Constant worry, social withdrawal, panic-like episodes, difficulty sleeping due to racing thoughts and fear of the future.",
  },
  {
    icon: <FaBookOpen />,
    title: "Lack of Focus & Academic Decline",
    desc: "Can't concentrate on studies, grades dropping, difficulty completing homework, and teachers reporting attention problems.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Excessive Screen Addiction",
    desc: "Hours spent on phones, gaming, or social media. Becomes agitated or aggressive when devices are taken away.",
  },
  {
    icon: <FaUserFriends />,
    title: "Social Discomfort & Low Confidence",
    desc: "Avoids social situations, struggles to make friends, feels like an outsider, and has persistent low self-esteem.",
  },
  {
    icon: <FaMoon />,
    title: "Sleep Disruption & Fatigue",
    desc: "Staying up late, difficulty waking up, irregular sleep patterns that affect energy, mood, and cognitive performance.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Defiant or Withdrawn Behavior",
    desc: "Either constantly arguing and pushing back, or completely shutting down and refusing to communicate with family members.",
  },
];

export default function ChallengeSection() {
  return (
    <section
      id="challenges"
      className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]"
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-[24px] sm:text-[34px] md:text-[38px] font-bold text-[#1a1a2e] leading-snug sm:leading-tight">
          Are You Facing These Challenges With
          <br className="hidden sm:block" /> Your Teen?
        </h2>

        <p className="mt-3 sm:mt-4 text-[#6b7280] text-[13.5px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
          If your teenager shows any of these signs, it's not just a "phase."
          These are signals of deeper neurological and biological imbalances that need attention.
        </p>

        {/* Grid */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#e3e8f2] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#eef3ff] text-[#6c8ef5] text-base sm:text-lg mb-3 sm:mb-4">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a1a2e]">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13.5px] text-[#6b7280] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight Box */}
        <div className="mt-10 sm:mt-16 bg-[#f4e7c5] rounded-xl sm:rounded-2xl py-5 sm:py-6 px-4 sm:px-6 md:px-10 text-center shadow-sm">
          <p className="text-[14px] sm:text-[16px] text-[#1a1a2e] font-medium leading-relaxed">
            "This isn't just your teen's struggle —{" "}
            <span className="text-[#6c8ef5] font-semibold">
              it affects the entire family.
            </span>"
          </p>

          <p className="mt-2 sm:mt-3 text-[12.5px] sm:text-[14px] text-[#6b7280] leading-relaxed">
            The arguments, the worry, the helplessness of watching your child struggle — 
            we understand. And we're here to help you find a real, lasting solution.
          </p>
        </div>

      </div>
    </section>
  );
}