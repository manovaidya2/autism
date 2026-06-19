import React from "react";
import { ArrowRight, Eye, Target } from "lucide-react";
import familySunsetImage from "../images/mission-vision-family-sunset.png";

function AboutManovaidyaMissionVisionSection() {
  return (
    <section className="bg-[#fbfaff] px-[10px] py-7 sm:py-8 lg:px-10 lg:py-9">
      <div className="grid w-full overflow-hidden rounded-xl border border-[#8B43BA]/14 bg-white shadow-[0_14px_34px_rgba(31,19,56,0.07)] lg:min-h-[170px] lg:grid-cols-[1.05fr_1.2fr_0.7fr_1fr]">
        <div className="flex items-start gap-4 px-5 py-6 sm:px-7 lg:border-r lg:border-[#8B43BA]/14 lg:px-8 lg:py-7">
          <Target className="mt-1 h-11 w-11 shrink-0 text-[#8B43BA]" strokeWidth={1.9} />
          <div>
            <h2 className="text-[18px] font-black leading-tight text-[#4d2a74] sm:text-[20px]">
              Our Mission
            </h2>
            <p className="mt-3 max-w-[390px] text-[13px] font-bold leading-[1.65] text-[#251553] sm:text-[13.5px]">
              To help individuals and families understand development,
              behaviour, emotional wellbeing and mental health more clearly and
              move towards meaningful and long-term progress.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-t border-[#8B43BA]/10 px-5 py-6 sm:px-7 lg:border-r lg:border-t-0 lg:border-[#8B43BA]/14 lg:px-8 lg:py-7">
          <Eye className="mt-1 h-11 w-11 shrink-0 text-[#8B43BA]" strokeWidth={1.9} />
          <div>
            <h2 className="text-[18px] font-black leading-tight text-[#4d2a74] sm:text-[20px]">
              Our Vision
            </h2>
            <p className="mt-3 max-w-[420px] text-[13px] font-bold leading-[1.65] text-[#251553] sm:text-[13.5px]">
              A future where people are not defined by diagnoses, families have
              clarity, and development is supported with compassion, knowledge
              and purpose.
            </p>
          </div>
        </div>

        <div className="min-h-[155px] border-t border-[#8B43BA]/10 lg:min-h-0 lg:border-t-0">
          <img
            src={familySunsetImage}
            alt="Family holding hands at sunset"
            className="h-full min-h-[155px] w-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center bg-[#4d238e] px-6 py-6 text-white sm:px-8 lg:px-10">
          <h2 className="text-[22px] font-black leading-[1.3] sm:text-[24px] lg:text-[25px]">
            Beyond Symptoms.
            <span className="block">Beyond Labels.</span>
            <span className="block">Towards Meaningful Progress.</span>
          </h2>
          <a
            href="#consultation"
            className="mt-5 inline-flex h-11 w-full max-w-[260px] items-center justify-center gap-3 rounded-lg bg-white px-5 text-[13px] font-black text-[#4d238e] shadow-[0_12px_26px_rgba(17,8,40,0.22)] transition hover:-translate-y-0.5 sm:w-auto"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutManovaidyaMissionVisionSection;
