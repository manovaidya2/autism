import React from "react";
import { Brain, Activity, Zap } from "lucide-react";

const ScienceSection = () => {
  return (
    <section id="science" className="bg-white py-8 sm:py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-[24px] sm:text-4xl md:text-[36px] font-bold text-[#1f2937] leading-snug">
          The Science Behind Teen Mental Wellness
        </h2>

        <p className="text-center text-gray-500 mt-3 sm:mt-4 max-w-3xl mx-auto text-[14px] sm:text-lg leading-relaxed">
          Teen mental wellness is not just emotional — it's deeply{" "}
          <span className="text-blue-400 font-bold">biological</span>.  
          Behavior is the output… the real issue lies inside the system.
        </p>

        {/* Top Flow Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">

          {/* Brain */}
          <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-[260px] text-center">
            <Brain className="mx-auto text-blue-500 mb-2 sm:mb-3" size={24} />
            <h4 className="text-blue-600 font-semibold text-sm sm:text-base">Brain</h4>
            <p className="text-[12.5px] sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              Underdeveloped prefrontal cortex, dopamine imbalance
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
              Inflammation, poor serotonin & dopamine production
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
              Fight-or-flight overdrive, sensory overwhelm
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
              Anxiety, anger, poor focus, social withdrawal
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-10 sm:mt-14 bg-[#f1f5f9] rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 text-gray-700">

          {/* Gut-Brain */}
          <h3 className="font-bold text-[16px] sm:text-xl text-gray-800 mb-3 sm:mb-4 leading-snug">
            The Gut-Brain Axis in Teenagers
          </h3>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            Research shows that the gut microbiome plays a critical role in teen mental health. 
            The gut produces nearly <span className="font-bold">95% of the body’s serotonin</span> — 
            the neurotransmitter responsible for mood, sleep, and emotional stability.
          </p>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            Poor diet, stress, and antibiotic use can damage the gut microbiome, leading to chronic inflammation 
            that directly impacts brain function. This is why many teens struggle with anxiety, mood swings, 
            and focus issues that don’t improve with counseling alone.
          </p>

          <p className="text-[14px] sm:text-lg leading-relaxed">
            By restoring gut health, we often see improvements in mood, focus, sleep, and emotional stability 
            within just a few weeks.
          </p>

          {/* Divider */}
          <div className="my-6 border-t border-gray-300"></div>

          {/* Dopamine */}
          <h3 className="font-bold text-[16px] sm:text-xl text-gray-800 mb-3 sm:mb-4 leading-snug">
            The Dopamine Problem: Why Teens Get Addicted to Screens
          </h3>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            The teen brain’s reward system is highly sensitive but not fully developed. 
            This makes teenagers crave dopamine but lack the control to regulate it.
          </p>

          <p className="mb-3 sm:mb-4 text-[14px] sm:text-lg leading-relaxed">
            Every notification, like, or game reward creates a dopamine spike. Over time, 
            the brain adapts by lowering its baseline — meaning your teen needs more stimulation 
            just to feel normal.
          </p>

          <p className="text-[14px] sm:text-lg leading-relaxed">
            The result: low motivation, poor focus, screen dependency, and increased anxiety. 
            True recovery requires rebalancing dopamine through nutrition, movement, and structured neural retraining.
          </p>

        </div>

      </div>
    </section>
  );
};

export default ScienceSection;