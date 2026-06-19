import React from "react";
import {
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import heroFamily from "../images/hero-family-care.png";

const carePoints = [
  { icon: Leaf, title: "Evidence-Based", subtitle: "Approach" },
  { icon: Users, title: "Personalised", subtitle: "Care" },
  { icon: HeartHandshake, title: "Confidential &", subtitle: "Compassionate" },
  { icon: MapPin, title: "Online Across", subtitle: "India" },
];

const stats = [
  { icon: Star, value: "7+", label: "Years Experience", color: "text-[#ef9e42]", ring: "ring-[#ffe8cf]" },
  { icon: Users, value: "25,000+", label: "Families Helped", color: "text-[#439b72]", ring: "ring-[#dff3e9]" },
  { icon: ShieldCheck, value: "100%", label: "Confidential Care", color: "text-[#1f8b6d]", ring: "ring-[#d8f0e7]" },
  { icon: MapPin, value: "Online", label: "Across India", color: "text-[#ff5b91]", ring: "ring-[#ffe1ec]" },
  { icon: Users, value: "Expert Team", label: "of Specialists", color: "text-[#8d61d9]", ring: "ring-[#eee5ff]" },
];

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="relative mx-auto min-h-[456px] max-w-[1440px] px-4 pb-5 pt-4 sm:px-8 lg:px-10">
        <div className="relative z-10 max-w-[560px]">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#e9f6ee] px-3 py-2 text-[11px] font-bold leading-tight text-[#2d7a54] shadow-[0_8px_18px_rgba(32,124,83,0.08)] sm:px-4 sm:text-[13px]">
            <CheckCircle2 className="h-4 w-4" />
            <span>Trusted by Thousands of Families Across India</span>
          </div>

          <h1 className="mt-5 max-w-[550px] font-serif text-[38px] font-black leading-[0.96] tracking-[-0.02em] text-[#11183f] min-[390px]:text-[42px] sm:text-[54px] lg:text-[50px]">
            Better Mental Health.
            <br />
            Better Life.
            <br />
            <span className="italic text-[#075846]">Naturally.</span>
          </h1>

          <p className="mt-5 max-w-[515px] text-[15px] font-extrabold leading-[1.72] text-[#26325b] sm:mt-6 sm:text-[16px]">
            Compassionate care for every mind and every stage of life.
            <br className="hidden sm:block" />
            Supporting Child Development, Emotional Wellbeing, Mental Health
            <br className="hidden sm:block" />
            and Mind-Body Concerns through Neuro-Ayurveda.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href="#consultation"
              className="inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-[9px] bg-[#064f43] px-6 text-[15px] font-black text-white shadow-[0_12px_24px_rgba(6,79,67,0.22)] transition hover:bg-[#043f36] sm:h-[58px] sm:w-auto sm:px-8 sm:text-[16px]"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Consultation
            </a>
            <a
              href="#assessment"
              className="inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-[9px] bg-[#eadcff] px-6 text-[15px] font-black text-[#6b3bb8] shadow-[0_12px_24px_rgba(107,59,184,0.14)] transition hover:bg-[#e0ccff] sm:h-[58px] sm:w-auto sm:px-8 sm:text-[16px]"
            >
              <CalendarCheck className="h-5 w-5" />
              Take Free Assessment
            </a>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[22px] bg-[#f5fbf8] shadow-[0_14px_34px_rgba(15,38,59,0.08)] lg:hidden">
            <div className="aspect-[16/11]">
              <img
                src={heroFamily}
                alt="Family receiving compassionate mental health support"
                className="h-full w-full object-cover object-[62%_center]"
              />
            </div>
            <div className="absolute bottom-4 right-4 flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white text-center shadow-[0_16px_30px_rgba(86,61,128,0.16)] ring-[7px] ring-[#efe7ff]">
              <div>
                <Sparkles className="mx-auto mb-1 h-6 w-6 text-[#8b63d8]" strokeWidth={1.8} />
                <p className="text-[11px] font-black leading-[1.16] text-[#6b3bb8]">
                  Care that
                  <br />
                  Understands
                  <br />
                  You & Your
                  <br />
                  Loved Ones
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid max-w-[630px] grid-cols-1 gap-x-6 gap-y-4 min-[420px]:grid-cols-2 sm:mt-8 sm:grid-cols-4 sm:gap-y-5">
            {carePoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 ${index < carePoints.length - 1 ? "sm:border-r sm:border-[#d7dedb] sm:pr-5" : ""}`}
                >
                  <Icon className="h-8 w-8 shrink-0 text-[#17806a]" strokeWidth={1.8} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-black leading-[1.15] text-[#536071] sm:whitespace-nowrap">
                      {item.title}
                    </p>
                    <p className="text-[12px] font-black leading-[1.15] text-[#536071] sm:whitespace-nowrap">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[480px] w-[67%] overflow-hidden lg:block">
          <img
            src={heroFamily}
            alt="Family receiving compassionate mental health support"
            className="h-full w-full object-contain object-right-top"
          />
        </div>

        <div className="pointer-events-none absolute right-[92px] top-[328px] z-20 hidden h-[150px] w-[150px] items-center justify-center rounded-full bg-white text-center shadow-[0_20px_38px_rgba(86,61,128,0.16)] ring-[10px] ring-[#efe7ff] lg:flex">
          <div>
            <Sparkles className="mx-auto mb-1 h-9 w-9 text-[#8b63d8]" strokeWidth={1.8} />
            <p className="text-[15px] font-black leading-[1.2] text-[#6b3bb8]">
              Care that
              <br />
              Understands
              <br />
              You & Your
              <br />
              Loved Ones
            </p>
          </div>
        </div>

        <div className="relative z-20 mt-9 grid overflow-hidden rounded-[18px] border border-[#edf1f1] bg-white shadow-[0_12px_32px_rgba(15,38,59,0.08)] sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.value} className="flex min-h-[86px] items-center gap-4 border-b border-[#edf1f1] px-5 py-4 sm:min-h-[92px] sm:border-r sm:px-8 sm:py-5 lg:border-b-0">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white ring-4 ${item.ring}`}>
                  <Icon className={`h-7 w-7 ${item.color}`} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-[20px] font-black leading-none text-[#17203f] sm:whitespace-nowrap sm:text-[22px]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[13px] font-black leading-[1.15] text-[#27314a]">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
