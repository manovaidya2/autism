import React from "react";
import { FaBrain } from "react-icons/fa";
import { MdOutlinePsychology } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdOutlinePanTool } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { PiGraduationCap } from "react-icons/pi";

export default function ConditionsSection() {
  const data = [
    {
      icon: <FaBrain />,
      title: "Anxiety & Overthinking",
      desc: "Helping teens manage constant worry, racing thoughts, and emotional overwhelm by addressing underlying neurological imbalances and restoring emotional stability.",
    },
    {
      icon: <MdOutlinePsychology />,
      title: "ADHD & Focus Issues",
      desc: "Improving attention span, impulse control, and executive function by targeting dopamine balance, brain nutrition, and neural pathway strengthening.",
    },
    {
      icon: <HiOutlineSpeakerWave />,
      title: "Anger & Emotional Outbursts",
      desc: "Reducing sudden mood swings, irritability, and anger through nervous system regulation and improved emotional processing.",
    },
    {
      icon: <MdOutlinePanTool />,
      title: "Screen Addiction",
      desc: "Addressing dopamine imbalance caused by excessive screen use, helping teens regain focus, motivation, and real-world engagement.",
    },
    {
      icon: <AiOutlineLineChart />,
      title: "Academic Decline & Low Focus",
      desc: "Supporting teens struggling with concentration, memory, and performance through cognitive strengthening and brain-based interventions.",
    },
    {
      icon: <PiGraduationCap />,
      title: "Low Confidence & Social Withdrawal",
      desc: "Helping teens build self-esteem, improve social comfort, and overcome isolation by strengthening emotional resilience and brain function.",
    },
  ];

  return (
    <section id="conditions" className="bg-[#f6f8fc] py-8 sm:py-10">
      <div className="max-w-[1100px] mx-auto px-4 text-center">
        
        {/* Title */}
        <h2 className="text-[24px] sm:text-[36px] font-extrabold text-[#1f2b3f] mb-2 sm:mb-3 leading-snug">
          Conditions We Help Teens Overcome
        </h2>

        {/* Subtitle */}
        <p className="text-[13.5px] sm:text-[15px] text-[#6b7a90] max-w-[720px] mx-auto mb-8 sm:mb-14 leading-relaxed">
          Our Brain-Gut-Neurodevelopment approach addresses the root causes behind 
          common teen challenges — not just the symptoms — with a fully personalized plan.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 max-sm:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          
          {data.map((item, i) => (
            <div
              key={i}
              className="text-left bg-white border border-[#e3e8f3] rounded-[14px] sm:rounded-[18px] p-5 sm:p-6 shadow-sm hover:shadow-md transition"
            >
              
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-[#eef3ff] rounded-[10px] sm:rounded-[12px] flex items-center justify-center text-[#5b7cff] text-lg sm:text-xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1f2b3f] mb-1.5 sm:mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-[14px] text-[#6b7a90] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}