import React from "react";
import { Brain, Pill, CheckCircle2 } from "lucide-react";

const mentalConcerns = [
  "Stress",
  "Burnout",
  "Brain Fog",
  "Sleep Disorders",
  "Panic Tendencies",
  "Anxiety",
  "Overthinking",
  "Emotional Instability",
  "Low Confidence",
  "Mental Fatigue",
];

const lifestyleConcerns = [
  "Chronic Fatigue",
  "IBS-like Symptoms",
  "Hormonal Imbalance\nSupport",
  "Low Energy",
  "Mood-linked Gut Issues",
  "Poor Digestion",
  "Acidity & Bloating",
  "Stress-related Headaches",
  "Poor Focus at Work",
];

export default function CommonAdultConcernsSection() {
  return (
    <section className="w-full bg-[#f8f8fb] py-8 md:py-10">
      <div className="mx-auto max-w-[1120px] px-4 md:px-5">
        {/* Heading */}
        <div className="mx-auto max-w-[780px] text-center">
          <h2 className="text-[24px] font-bold leading-[1.1] tracking-[-0.03em] text-[#10244b] md:text-[36px]">
            Common Adult Concerns We Help
            <br className="hidden md:block" />
            Address
          </h2>

          <p className="mx-auto mt-3 max-w-[760px] text-[14px] leading-[1.65] text-[#617391] md:text-[17px]">
            The mind and body are connected. Our integrated approach supports a
            wide range of overlapping wellness concerns.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-[24px] border border-[#d8def7] bg-[#f6f7fc] px-5 py-5 md:px-6 md:py-6">
            <div className="flex items-start gap-3">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] bg-[#e9edf9] md:h-[54px] md:w-[54px]">
                <Brain
                  size={24}
                  strokeWidth={2.1}
                  className="text-[#6d91ff]"
                />
              </div>

              <h3 className="pt-1 text-[18px] font-extrabold leading-[1.2] text-[#10244b] md:text-[21px]">
                Mental & Emotional Concerns
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {mentalConcerns.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.1}
                    className="mt-[2px] shrink-0 text-[#6f93ff]"
                  />
                  <p className="text-[14px] font-medium leading-[1.4] text-[#10244b] md:text-[15px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-[24px] border border-[#d8def7] bg-[#fbf8ee] px-5 py-5 md:px-6 md:py-6">
            <div className="flex items-start gap-3">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] bg-[#eef0ee] md:h-[54px] md:w-[54px]">
                <Pill
                  size={24}
                  strokeWidth={2.1}
                  className="text-[#6d91ff]"
                />
              </div>

              <h3 className="pt-1 text-[18px] font-extrabold leading-[1.2] text-[#10244b] md:text-[21px]">
                Lifestyle-Related Concerns
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {lifestyleConcerns.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.1}
                    className="mt-[2px] shrink-0 text-[#6f93ff]"
                  />
                  <p className="whitespace-pre-line text-[14px] font-medium leading-[1.4] text-[#10244b] md:text-[15px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-7 max-w-[900px] text-center">
          <p className="text-[13px] italic leading-[1.55] text-[#66738e] md:text-[15px]">
            Note: This program supports better wellness outcomes through
            structured assessment and guidance. It is not a replacement for
            medical diagnosis or treatment of any specific disease.
          </p>
        </div>
      </div>
    </section>
  );
}