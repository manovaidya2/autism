import React from "react";
import { FaInfoCircle, FaBolt, FaLightbulb } from "react-icons/fa";

export default function UnderstandingSection() {
  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[32px] md:text-[36px] font-bold text-black leading-snug md:leading-tight">
          Understanding Teen Mental Health: What Every{" "}
          <br className="hidden sm:block" />
          Parent Must Know
        </h2>

        {/* Top Cards */}
        <div className="mt-8 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-8">

          {/* Brain Development Card */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">
            
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaInfoCircle size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                The Adolescent Brain: Under Construction
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              The teenage brain is undergoing one of the most dramatic transformations in human development. 
              The prefrontal cortex — responsible for decision-making, impulse control, and emotional regulation — 
              doesn't fully mature until age 25.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              During adolescence, the brain undergoes massive synaptic pruning — eliminating unused neural connections 
              while strengthening important ones. This "use it or lose it" process means the experiences, nutrition, 
              and support your teen receives now directly shape their adult brain.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Research shows that nearly <strong className="text-black">49.5% of adolescents</strong> experience a mental health disorder at some point, 
              with anxiety being the most common.
            </p>
          </div>

          {/* Why Traditional Fails */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaBolt size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                Why Traditional Approaches Fall Short
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Most conventional approaches focus only on behavior — talk therapy, counseling, or medication. 
              While helpful, they often address the output (behavior) without fixing the input (biology).
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Studies indicate that a large percentage of teens experience relapse after counseling alone — 
              not because therapy fails, but because the biological foundation for lasting change was never built.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              A more effective approach addresses brain chemistry, gut health, nervous system regulation, 
              and neural development alongside behavioral support — creating real, long-term transformation.
            </p>
          </div>

        </div>

        {/* Bottom Wide Card */}
        <div className="mt-8 sm:mt-10 bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

          <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
            <FaLightbulb size={18} />
            <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
              The Critical Window: Ages 13–19
            </h3>
          </div>

          <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            The teenage years represent a once-in-a-lifetime window of neuroplasticity. 
            The brain is more adaptable during adolescence than at any other point after early childhood.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            Research shows that teens who receive comprehensive neurological and nutritional support during 
            these years demonstrate significantly better emotional regulation, improved academic performance, 
            and reduced anxiety compared to those receiving behavioral support alone.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            Every month of delay narrows this window. The patterns forming now will become the neural pathways 
            your teen carries into adulthood — which is why acting early matters more than ever.
          </p>

        </div>

      </div>

      {/* CTA Section */}
      <div className="mt-10 sm:mt-16 bg-[#5f84d6] rounded-xl sm:rounded-2xl px-5 sm:px-8 py-6 sm:py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Left Text */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-[18px] sm:text-[22px] md:text-[26px] font-semibold leading-snug">
            Don't wait — your teen's developmental window is closing
          </h3>
          <p className="text-white/80 text-[13.5px] sm:text-[15px] mt-2">
            Get a comprehensive assessment of your teen's mental wellness — completely free
          </p>
        </div>

        {/* Button */}
        <a
          href="https://manovaidya.com/Pages/mind-health"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-block bg-white text-[#5f84d6] px-5 sm:px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
        >
          → Take Free Assessment
        </a>

      </div>
    </section>
  );
}