import React from "react";
import {
  CalendarCheck,
  Check,
  Clock3,
  Expand,
  Heart,
  Play,
  Settings,
  SkipBack,
  Volume2,
} from "lucide-react";
import doctorPortrait from "../images/doctor-ankush-portrait.png";

const highlights = [
  "7+ Years of Experience",
  "Thousands of Families Guided",
  "Expert in Child, Teen, Adult & Family Wellness",
  "Neuro-Ayurveda Practitioner",
  "Online Consultations Across India",
];

function MeetDoctorSection() {
  return (
    <section id="about" className="bg-[#fbfbff] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto rounded-[24px] px-0 pb-7 pt-4 sm:px-6">
        <div className="text-center">
          <h2 className="inline-flex max-w-full items-center justify-center gap-2 font-serif text-[25px] font-black leading-tight text-[#1c1f3f] sm:gap-4 sm:text-[34px]">
            <Heart className="hidden h-5 w-5 shrink-0 text-[#4b465f] min-[380px]:block" strokeWidth={2.4} />
            Meet Dr. Ankush Garg
            <Heart className="hidden h-5 w-5 shrink-0 text-[#4b465f] min-[380px]:block" strokeWidth={2.4} />
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[13px] font-black leading-relaxed text-[#33384f] sm:text-[15px]">
            Watch this short video to know how we help families heal and grow.
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[16px] bg-[#111827] shadow-[0_14px_34px_rgba(17,24,39,0.18)]">
            <div className="relative h-[235px] min-[390px]:h-[270px] sm:h-[390px] lg:h-[430px]">
              <img
                src={doctorPortrait}
                alt="Dr. Ankush Garg video introduction"
                className="h-full w-full object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <button
                type="button"
                aria-label="Play doctor introduction video"
                className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-white/95 bg-black/28 text-white shadow-[0_18px_38px_rgba(0,0,0,0.35)] backdrop-blur-[1px] sm:h-[106px] sm:w-[106px] sm:border-[5px]"
              >
                <Play className="ml-1.5 h-8 w-8 fill-white sm:ml-2 sm:h-12 sm:w-12" strokeWidth={1.5} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 sm:px-5 sm:pb-4">
                <div className="h-[4px] overflow-hidden rounded-full bg-white/70">
                  <div className="h-full w-[18%] rounded-full bg-[#ee3328]" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-white sm:mt-4 sm:gap-4">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                    <Play className="h-5 w-5 shrink-0 fill-white sm:h-7 sm:w-7" strokeWidth={1.6} />
                    <SkipBack className="h-5 w-5 shrink-0 rotate-180 fill-white sm:h-7 sm:w-7" strokeWidth={1.8} />
                    <Volume2 className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" strokeWidth={2} />
                    <span className="truncate text-[12px] font-bold min-[380px]:text-[14px] sm:text-[17px]">0:00 / 2:15</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                    <Settings className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={2} />
                    <Expand className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#f2eefb] bg-gradient-to-br from-white via-white to-[#fbf7ff] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:rounded-[22px] sm:px-8 sm:py-7 lg:px-10 lg:py-9">
            <h3 className="font-serif text-[28px] font-black leading-tight text-[#0a624f] sm:text-[34px] sm:leading-none">
              Dr. Ankush Garg
            </h3>
            <p className="mt-3 text-[15px] font-extrabold leading-[1.35] text-[#4b5268] sm:mt-4 sm:text-[16px]">
              Ayurvedacharya
            </p>
            <p className="mt-2 text-[15px] font-extrabold leading-[1.45] text-[#2a3048] sm:text-[16px] sm:leading-[1.35]">
              Neuro-Ayurveda & Mental Health Specialist
            </p>

            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 sm:items-center sm:gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#2f8a73] text-[#2f8a73]">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <p className="min-w-0 text-[14px] font-black leading-snug text-[#3c4258] sm:text-[16px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
              <a
                href="#consultation"
                className="inline-flex h-[56px] items-center justify-center gap-3 rounded-[8px] bg-[#07584c] px-4 text-[14px] font-black text-white shadow-[0_14px_24px_rgba(7,88,76,0.22)] transition hover:bg-[#05483e] sm:h-[58px] sm:px-5 sm:text-[15px]"
              >
                <CalendarCheck className="h-5 w-5" />
                Book Consultation
              </a>
              <a
                href="#assessment"
                className="inline-flex h-[56px] items-center justify-center gap-3 rounded-[8px] bg-[#773fd4] px-4 text-[14px] font-black text-white shadow-[0_14px_24px_rgba(119,63,212,0.22)] transition hover:bg-[#6531bf] sm:h-[58px] sm:px-5 sm:text-[15px]"
              >
                <Clock3 className="h-5 w-5" />
                Take Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetDoctorSection;
