import React from "react";
import { FaInfoCircle, FaBolt, FaLightbulb } from "react-icons/fa";

export default function UnderstandingSection() {
  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[32px] md:text-[36px] font-bold text-black leading-snug md:leading-tight">
          Understanding Stress, Anxiety & Burnout:
          <br className="hidden sm:block" />
          What Most Adults Overlook
        </h2>

        {/* Top Cards */}
        <div className="mt-8 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-8">

          {/* Stress Card */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">
            
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaInfoCircle size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                What is Chronic Stress?
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Chronic stress is not just a busy lifestyle — it's a continuous physiological state where your body
              remains in survival mode. Over time, this impacts your brain, gut, hormones, and overall energy levels.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              It often shows up as fatigue, irritability, sleep issues, digestive discomfort, and lack of mental clarity.
              These are not random — they are signals from your internal system.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              When stress becomes constant, it begins to rewire your brain and nervous system — making recovery harder
              without structured support.
            </p>
          </div>

          {/* Anxiety Card */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaBolt size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                What is Anxiety & Mental Overload?
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Anxiety is not just overthinking — it's a full-body response involving your brain, nervous system,
              and gut health. It creates constant alertness, even when there is no real threat.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Many adults experience racing thoughts, poor focus, emotional reactivity, and physical symptoms like
              heart palpitations or tightness in the chest.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              The root cause often lies deeper — in nervous system dysregulation, gut imbalance, and long-term stress patterns.
            </p>
          </div>

        </div>

        {/* Bottom Wide Card */}
        <div className="mt-8 sm:mt-10 bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

          <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
            <FaLightbulb size={18} />
            <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
              The Root Cause: Why Symptoms Keep Coming Back
            </h3>
          </div>

          <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            Most people try to fix symptoms — stress, anxiety, poor sleep — without understanding what's driving them.
            But your mind and body are deeply connected through the brain, gut, and nervous system.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            When these systems go out of balance, multiple symptoms appear together — not by coincidence, but by connection.
            Ignoring the root cause leads to temporary relief, not real recovery.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            The key is identifying what’s actually happening inside your system — and addressing it in a structured way.
          </p>

        </div>

      </div>

      {/* CTA Section */}
      <div className="mt-10 sm:mt-16 bg-[#5f84d6] rounded-xl sm:rounded-2xl px-5 sm:px-8 py-6 sm:py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Left Text */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-[18px] sm:text-[22px] md:text-[26px] font-semibold leading-snug">
            Don't ignore the signals — your body is asking for attention
          </h3>
          <p className="text-white/80 text-[13.5px] sm:text-[15px] mt-2">
            Take a free assessment and understand what’s really affecting your mental & physical balance
          </p>
        </div>

        {/* Button */}
        <a
          href="https://manovaidya.com/Pages/mind-health"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-block bg-white text-[#5f84d6] px-5 sm:px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
        >
          → Start Free Assessment
        </a>

      </div>
    </section>
  );
}