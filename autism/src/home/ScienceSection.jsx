import React from "react";
import { Brain, Activity, Zap } from "lucide-react";

const ScienceSection = () => {
  return (
    <section id="science" className="bg-white py-8 sm:py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-[24px] sm:text-4xl md:text-[36px] font-bold text-[#1f2937] leading-snug">
          The Science Behind Our Approach
        </h2>

        <p className="text-center text-gray-500 mt-3 sm:mt-4 max-w-3xl mx-auto text-[14px] sm:text-lg leading-relaxed">
          Autism and ADHD are not just behavioral issues — they are{" "}
          <span className="text-blue-400 font-bold">
            neurodevelopmental imbalances
          </span>{" "}
          rooted in how the brain, gut, and nervous system interact.
        </p>

        {/* Top Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">

          {/* Brain */}
          <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-[260px] text-center">
            <Brain className="mx-auto text-blue-500 mb-2 sm:mb-3" size={24} />
            <h4 className="text-blue-600 font-semibold text-sm sm:text-base">Brain</h4>
            <p className="text-[12.5px] sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              Weak neural connections and underdeveloped pathways
            </p>
          </div>

          <span className="text-gray-400 text-xl sm:text-2xl rotate-90 md:rotate-0">
            →
          </span>

          {/* Gut */}
          <div className="bg-[#ede9fe] border border-[#c4b5fd] rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-[260px] text-center">
            <div className="mx-auto mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6 border-2 border-purple-400 rounded-sm"></div>
            <h4 className="text-purple-600 font-semibold text-sm sm:text-base">Gut</h4>
            <p className="text-[12.5px] sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              Poor nutrient absorption, inflammation, dysbiosis
            </p>
          </div>

          <span className="text-gray-400 text-xl sm:text-2xl rotate-90 md:rotate-0">
            →
          </span>

          {/* Nervous System */}
          <div className="bg-[#fef3c7] border border-[#fde68a] rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-[260px] text-center">
            <Activity className="mx-auto text-yellow-600 mb-2 sm:mb-3" size={24} />
            <h4 className="text-gray-800 font-semibold text-sm sm:text-base">Nervous System</h4>
            <p className="text-[12.5px] sm:text-sm text-gray-600 mt-1.5 sm:mt-2">
              Sensory overload, fight-or-flight dominance
            </p>
          </div>

          <span className="text-gray-400 text-xl sm:text-2xl rotate-90 md:rotate-0">
            →
          </span>

          {/* Behaviour */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-[260px] text-center">
            <Zap className="mx-auto text-blue-400 mb-2 sm:mb-3" size={24} />
            <h4 className="text-blue-500 font-semibold text-sm sm:text-base">Behaviour</h4>
            <p className="text-[12.5px] sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              Meltdowns, speech delay, social withdrawal
            </p>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="mt-10 sm:mt-14 bg-[#f1f5f9] rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 text-gray-700">
          <h3 className="font-bold text-[16px] sm:text-xl text-gray-800 mb-3 sm:mb-4 leading-snug">
            The Gut-Brain Axis: A Breakthrough in Neurodevelopmental Care
          </h3>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            Over the past decade, research from institutions like 
            <span className="font-bold"> Harvard Medical School, Johns Hopkins University, and CalTech </span>
            has revealed a profound connection between the gut and the brain — now called the 
            <span className="font-bold"> gut-brain axis</span>.
          </p>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            Studies show that <span className="font-bold">up to 70% of children with autism have gastrointestinal issues</span> — including constipation, diarrhea, bloating, and food sensitivities. This isn’t coincidental. The gut produces approximately 
            <span className="font-bold"> 90% of the body’s serotonin and 50% of its dopamine</span>.
          </p>

          <p className="text-[14px] sm:text-lg leading-relaxed">
            When gut health is compromised, it directly impacts brain function, behavior, and development. This is why addressing gut health is a cornerstone of the Manovaidya system.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ScienceSection;