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
      title: "Autism Spectrum Disorder (ASD)",
      desc: "Comprehensive support for children on the autism spectrum, addressing communication, social interaction, sensory processing, and behavioral challenges through our integrated brain-gut approach.",
    },
    {
      icon: <MdOutlinePsychology />,
      title: "Attention Deficit Hyperactivity Disorder (ADHD)",
      desc: "Targeted interventions for focus, impulse control, hyperactivity, and executive function — addressing the neurological root causes, not just managing symptoms.",
    },
    {
      icon: <HiOutlineSpeakerWave />,
      title: "Speech & Language Delay",
      desc: "Supporting both receptive and expressive language development through neural activation, oral-motor exercises, and brain nutrition that prepares the speech centers for communication.",
    },
    {
      icon: <MdOutlinePanTool />,
      title: "Sensory Processing Disorder",
      desc: "Helping children who are overwhelmed by sensory input — or who seek excessive stimulation — by retraining the brain’s ability to process and integrate sensory information.",
    },
    {
      icon: <AiOutlineLineChart />,
      title: "Developmental Delay (Global)",
      desc: "For children not meeting multiple developmental milestones, our holistic program addresses cognitive, motor, language, and social-emotional development simultaneously.",
    },
    {
      icon: <PiGraduationCap />,
      title: "Learning Disabilities",
      desc: "Supporting children who struggle with reading, writing, math, or processing speed through neural pathway strengthening and cognitive skill building.",
    },
  ];

  return (
    <section id="conditions" className="bg-[#f6f8fc] py-8 sm:py-10">
      <div className="max-w-[1100px] mx-auto px-4 text-center">
        
        {/* Title */}
        <h2 className="text-[24px] sm:text-[36px] font-extrabold text-[#1f2b3f] mb-2 sm:mb-3 leading-snug">
          Conditions We Specialize In
        </h2>

        {/* Subtitle */}
        <p className="text-[13.5px] sm:text-[15px] text-[#6b7a90] max-w-[720px] mx-auto mb-8 sm:mb-14 leading-relaxed">
          Our Brain-Gut-Neurodevelopment approach is effective across a range of
          neurodevelopmental conditions. Each child receives a fully customized
          care plan.
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