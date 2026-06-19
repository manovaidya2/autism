import React from "react";
import {
  Award,
  BriefcaseMedical,
  GraduationCap,
  Sparkles,
  Star,
  Target,
  UserRound,
} from "lucide-react";
import founderImage from "../images/about-manovaidya-founder.png";

const credentials = [
  { text: "Ayurvedacharya", Icon: UserRound },
  { text: "Autism, ADHD & Child\nDevelopment Specialist", Icon: BriefcaseMedical },
  { text: "Mental Health Specialist", Icon: Target },
  {
    text: "Developer of the\nNeuro-Ayurveda\nDevelopment System",
    Icon: Sparkles,
  },
];

function AboutManovaidyaFounderSection() {
  return (
    <section className="bg-[#fbfaff] px-[10px] py-7 lg:px-10">
      <div className="grid w-full items-stretch gap-5 rounded-2xl bg-white/80 p-1.5 sm:gap-7 sm:p-2 lg:grid-cols-[0.72fr_1.02fr_0.86fr] lg:gap-8 lg:p-3">
        <div className="overflow-hidden rounded-2xl border border-[#8B43BA]/12 bg-[#eee5ff] shadow-[0_16px_38px_rgba(31,19,56,0.1)]">
          <img
            src={founderImage}
            alt="Dr Ankush Garg founder of Manovaidya"
            className="h-full min-h-[300px] w-full object-cover object-top sm:min-h-[360px] lg:min-h-[430px]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center px-2 py-1 sm:px-0 lg:py-2">
          <p className="text-[13px] font-black uppercase tracking-[0.04em] text-[#6b39c8]">
            Founded By
          </p>
          <h2 className="mt-2 text-[30px] font-black leading-tight text-[#8B43BA] sm:text-[40px] lg:text-[36px]">
            Dr Ankush Garg
          </h2>
          <h3 className="mt-1 text-[14px] font-black leading-6 text-[#251553] sm:text-[15px]">
            Ayurvedacharya, Autism, ADHD, Child Development
            <span className="block">and Mental Health Specialist</span>
          </h3>

          <div className="mt-5 space-y-4 text-[14px] font-bold leading-7 text-[#251553] sm:text-[15px]">
            <p>
              During years of working with children, families and individuals
              facing developmental and mental health challenges, Dr Ankush Garg
              observed that many people were receiving multiple opinions and
              therapies yet still lacked clarity about what was truly
              influencing progress.
            </p>
            <p>
              This observation led to the development of the Neuro-Ayurveda
              Development System and the foundation of Manovaidya.
            </p>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#8B43BA]/8 px-3 py-4 sm:gap-4 sm:px-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#8B43BA] shadow-[0_10px_24px_rgba(139,67,186,0.15)]">
              <Star className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <p className="text-[14px] font-black leading-6 text-[#5a31ad] sm:text-[15px]">
              His vision remains simple:
              <span className="block text-[#8B43BA]">
                Every individual deserves a personalised roadmap,
              </span>
              not a one-size-fits-all solution.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-[#8B43BA]/14 bg-white p-4 shadow-[0_16px_34px_rgba(31,19,56,0.08)] sm:p-7">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f4d57a] text-[#8B43BA] shadow-[0_12px_26px_rgba(139,67,186,0.14)] sm:h-16 sm:w-16">
                <Award className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.8} />
              </span>
              <p className="text-[14px] font-black leading-6 text-[#251553]">
                Founder & Developer of
                <span className="block text-[#5a31ad]">
                  Neuro-Ayurveda Development System
                </span>
              </p>
            </div>

            <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
              {credentials.map(({ text, Icon }) => (
                <div key={text} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B43BA]/8 text-[#8B43BA]">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <p className="whitespace-pre-line text-[14.5px] font-bold leading-6 text-[#251553] sm:text-[17px] sm:leading-7">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutManovaidyaFounderSection;
