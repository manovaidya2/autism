import React from "react";
import {
  CalendarCheck,
  Check,
  Clock3,
  Heart,
} from "lucide-react";

const highlights = [
  "7+ Years of Experience",
  "Thousands of Families Guided",
  "Expert in Child, Teen, Adult & Family Wellness",
  "Neuro-Ayurveda Practitioner",
  "Clinic at VS Plaza, Sector 27, Noida",
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
          <div className="relative h-fit self-start overflow-hidden rounded-[16px] bg-[#111827] shadow-[0_14px_34px_rgba(17,24,39,0.18)]">
            <div className="relative aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/0Qk6Es79TjA?si=YqFmIfx2tcW5LgNL&cc_load_policy=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
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
