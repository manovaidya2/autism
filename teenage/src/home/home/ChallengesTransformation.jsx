import React from "react";
import {
  FaEye,
  FaComments,
  FaBolt,
  FaBullseye,
  FaHeartBroken,
  FaUserFriends,
  FaHandPaper,
  FaSyncAlt,
} from "react-icons/fa";

const data = [
  {
    icon: <FaEye />,
    title: "No Response to Name",
    desc: "Your child doesn't look up, turn, or acknowledge when their name is called — even repeatedly.",
  },
  {
    icon: <FaComments />,
    title: "Speech & Language Delay",
    desc: "Limited or no words by age 2, difficulty forming sentences, or loss of previously acquired speech.",
  },
  {
    icon: <FaBolt />,
    title: "Hyperactivity & Restlessness",
    desc: "Constant movement, inability to sit still, running or climbing in inappropriate situations.",
  },
  {
    icon: <FaBullseye />,
    title: "Poor Focus & Attention",
    desc: "Cannot concentrate on tasks, gets easily distracted, difficulty following instructions.",
  },
  {
    icon: <FaHeartBroken />,
    title: "Emotional Meltdowns & Tantrums",
    desc: "Intense, prolonged outbursts that seem disproportionate to the situation and are hard to de-escalate.",
  },
  {
    icon: <FaUserFriends />,
    title: "Weak Social Interaction",
    desc: "Avoids eye contact, prefers playing alone, struggles to understand social cues or make friends.",
  },
  {
    icon: <FaHandPaper />,
    title: "Sensory Sensitivities",
    desc: "Overreaction or underreaction to sounds, textures, lights, or touch — covering ears, food aversions.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Repetitive Behaviors",
    desc: "Hand flapping, spinning, lining up objects, or insistence on rigid routines and sameness.",
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
          Are You Facing These Challenges with
          <br className="hidden sm:block" />{" "}
          Your Child?
        </h2>

        <p className="mt-3 sm:mt-4 text-[#6b7280] text-[13.5px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
          If your child shows any of these signs, you're not alone. Millions of parents worldwide
          face the same struggles — and real solutions exist.
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
            "This isn't just your child's struggle —{" "}
            <span className="text-[#6c8ef5] font-semibold">
              it affects the entire family.
            </span>"
          </p>

          <p className="mt-2 sm:mt-3 text-[12.5px] sm:text-[14px] text-[#6b7280] leading-relaxed">
            The confusion, the guilt, the endless doctor visits, the conflicting advice — we understand.
            And we're here to help you find clarity.
          </p>
        </div>

      </div>
    </section>
  );
}