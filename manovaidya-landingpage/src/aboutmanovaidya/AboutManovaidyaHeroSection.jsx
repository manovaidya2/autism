import React from "react";
import {
  Baby,
  BarChart3,
  Brain,
  Heart,
  Leaf,
  Network,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import heroImage from "../images/about-manovaidya-hero.png";

const brainPoints = [
  { text: "Brain\nDevelopment", Icon: Baby },
  { text: "Sensory\nIntegration", Icon: Sparkles },
  { text: "Emotional\nWellbeing", Icon: Heart },
  { text: "Gut-Brain\nAxis", Icon: Network },
  { text: "Behaviour\n& Learning", Icon: ShieldCheck },
];

const featureItems = [
  { title: "Holistic\nNeuro-Ayurveda\nApproach", Icon: Leaf },
  { title: "Brain-Gut-Mind\nConnection", Icon: Brain },
  { title: "Personalised\nCare & Roadmap", Icon: UserRound },
  { title: "Family-Centred\nGuidance", Icon: UsersRound },
  { title: "Meaningful &\nMeasurable\nProgress", Icon: BarChart3 },
];

function AboutManovaidyaHeroSection() {
  return (
    <section className="overflow-hidden bg-[#fbfaff] py-2">
      <div className="relative w-full overflow-hidden bg-white lg:min-h-[455px]">
        <img
          src={heroImage}
          alt="Neuro-Ayurveda consultation at Manovaidya"
          className="absolute inset-0 h-full w-full object-cover object-[61%_center] sm:object-[64%_center] lg:object-right-center"
          loading="eager"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.96)_52%,rgba(255,255,255,0.78)_72%,rgba(61,27,119,0.12)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.98)_31%,rgba(255,255,255,0.56)_42%,rgba(255,255,255,0.02)_60%,rgba(61,27,119,0.04)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(0deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.9)_54%,rgba(255,255,255,0)_100%)] lg:h-[34%] lg:bg-[linear-gradient(0deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.82)_43%,rgba(255,255,255,0)_100%)]" />

        <div className="relative z-10 grid items-start gap-6 px-[10px] pb-3 pt-6 sm:pt-8 lg:min-h-[455px] lg:grid-cols-[720px_1fr] lg:px-10 lg:pb-0 lg:pt-8">
          <div className="max-w-[620px] lg:max-w-[720px]">
            <p className="text-[14px] font-black uppercase tracking-[0.03em] text-[#5b34bd] sm:text-[15px]">
              About Manovaidya
            </p>

            <h1 className="mt-3 text-[32px] font-black leading-[1.12] text-[#17113d] sm:text-[42px] lg:text-[36px] lg:leading-[1.24]">
              <span className="block lg:whitespace-nowrap">
                A Neuro-Ayurveda Approach
              </span>
              <span className="block text-[#6b39c8] lg:whitespace-nowrap">
                to Autism, ADHD, Child Development
              </span>
              <span className="block text-[#6b39c8] lg:whitespace-nowrap">
                and Mental Wellbeing
              </span>
            </h1>

            <p className="mt-4 max-w-[560px] text-[15px] font-bold leading-[1.58] text-[#251553] sm:text-[17px] lg:mt-5 lg:max-w-[620px] lg:text-[16px]">
              Manovaidya is a specialized Neuro-Ayurveda and Mental Health
              Clinic in India dedicated to supporting children, teenagers,
              adults, women and families facing developmental, behavioural,
              emotional and cognitive health concerns.
            </p>

            <div className="mt-4 flex max-w-[560px] gap-3 rounded-xl border border-[#8B43BA]/14 bg-white/88 px-3 py-3 shadow-[0_10px_24px_rgba(31,19,56,0.08)] backdrop-blur-sm sm:px-4 lg:max-w-[620px] lg:bg-white/84">
              <span className="text-[42px] font-black leading-none text-[#8B43BA] sm:text-[54px]">
                “
              </span>
              <p className="text-[13px] font-black leading-[1.6] text-[#251553] sm:text-[16px] lg:text-[15px] lg:leading-[1.62]">
                We believe every individual is more than a diagnosis, a
                symptom or a label. Our mission is to help individuals and
                families move from confusion to clarity, from uncertainty to
                understanding, and from symptoms to meaningful progress.
              </p>
            </div>
          </div>

          <div className="relative hidden min-h-[410px] lg:block">
            <div className="absolute right-1 top-[-9px] space-y-4">
              {brainPoints.map(({ text, Icon }) => (
                <div key={text} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/14 text-white shadow-[0_10px_26px_rgba(23,17,61,0.15)] backdrop-blur-sm">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="w-[136px] whitespace-pre-line text-[15px] font-black leading-[1.25] text-white drop-shadow-[0_2px_8px_rgba(22,10,54,0.45)]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-[10px] mt-3 rounded-xl border border-[#8B43BA]/12 bg-white/96 px-3 py-2.5 shadow-[0_10px_25px_rgba(31,19,56,0.05)] lg:-mt-[8px]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {featureItems.map(({ title, Icon }, index) => (
              <div
                key={title}
                className={`flex items-center gap-3 rounded-lg px-2 py-2.5 sm:px-3 lg:rounded-none lg:py-2 ${
                  index > 0 ? "lg:border-l lg:border-[#8B43BA]/14" : ""
                }`}
              >
                <Icon className="h-8 w-8 shrink-0 text-[#8B43BA] sm:h-10 sm:w-10 lg:h-10 lg:w-10" strokeWidth={1.7} />
                <span className="whitespace-pre-line text-[13px] font-black leading-[1.35] text-[#5a31ad] sm:text-[16px] lg:text-[15px]">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutManovaidyaHeroSection;
