import React from "react";
import { Brain, CircleCheck, UsersRound } from "lucide-react";
import aboutFamilyImage from "../images/about-family-care.png";

function AboutDoctorSection() {
  return (
    <section id="about-doctor" className="bg-[#fbfaff] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div>
          <span className="inline-flex rounded-full bg-[#8B43BA]/10 px-4 py-2 text-[11px] font-black text-[#4d2a74] sm:text-[12px]">
            Neuro-Ayurveda & Mental Health Care
          </span>

          <h1 className="mt-6 text-[30px] font-black leading-tight text-[#151233] sm:mt-8 sm:text-[clamp(30px,3vw,48px)]">
            About Dr. Ankush Garg
          </h1>
          <h2 className="mt-3 max-w-[720px] text-[24px] font-black leading-tight text-[#8B43BA] sm:mt-4 sm:text-[clamp(25px,2.65vw,42px)]">
            Autism, ADHD, Child Development & Mental Health Specialist in India
          </h2>

          <p className="mt-5 max-w-[760px] text-[14px] font-bold leading-7 text-slate-700 sm:mt-7 sm:text-[15px] sm:leading-8">
            Dr. Ankush Garg is an Ayurvedacharya with 7+ years of experience in
            Autism, ADHD, Child Development and Mental Health care. Founder of
            Manovaidya and Creator of the Neuro-Ayurveda Development System.
          </p>

          <div className="mt-6 flex gap-4 rounded-2xl bg-[#8B43BA]/8 px-4 py-5 shadow-[0_12px_30px_rgba(139,67,186,0.08)] sm:mt-8 sm:gap-5 sm:px-7 sm:py-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[#8B43BA] sm:h-16 sm:w-16">
              <UsersRound className="h-9 w-9 sm:h-12 sm:w-12" strokeWidth={1.65} />
            </span>
            <p className="text-[13.5px] font-bold leading-7 text-[#251553] sm:text-[15px] sm:leading-8">
              His mission is simple - to understand the root causes, not just
              manage the symptoms, and to help individuals and families move
              from confusion to clarity, confidence and long-term wellness
              through personalised care and guidance.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px] sm:pb-32 lg:pb-28">
          <div className="overflow-hidden rounded-3xl shadow-[0_18px_44px_rgba(31,19,56,0.14)]">
            <img
              src={aboutFamilyImage}
              alt="Family supported through ManoVaidya care"
              className="aspect-[1.12/1] w-full object-cover sm:aspect-[1.32/1]"
              loading="lazy"
            />
          </div>

          <div className="relative mx-auto mt-4 w-full rounded-3xl bg-[#8B43BA] p-5 text-white shadow-[0_20px_42px_rgba(139,67,186,0.3)] sm:absolute sm:-bottom-6 sm:left-1/2 sm:mt-0 sm:w-[min(88%,460px)] sm:-translate-x-1/2 sm:p-7">
            <div className="flex gap-4 sm:gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#8B43BA] sm:h-14 sm:w-14">
                <Brain className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />
              </span>
              <p className="text-[13px] font-semibold leading-6 text-white/90 sm:text-[14px] sm:leading-7">
                Families across India trust Manovaidya for thoughtful
                assessment, personalised roadmap and long-term support for
                better outcomes.
              </p>
            </div>

            <div className="mx-auto mt-5 flex max-w-[270px] items-center gap-4 rounded-xl bg-white px-4 py-3.5 text-[#251553] shadow-[0_14px_28px_rgba(44,15,75,0.16)] sm:mt-7 sm:px-5 sm:py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e] text-white sm:h-11 sm:w-11">
                <CircleCheck className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
              </span>
              <p className="leading-tight">
                <span className="block text-[12px] font-bold text-[#6b5b80] sm:text-[13px]">
                  Trusted by
                </span>
                <span className="block text-[20px] font-black text-[#8B43BA] sm:text-[22px]">
                  1000+ Families
                </span>
                <span className="block text-[12px] font-bold text-[#6b5b80]">
                  Across India
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDoctorSection;
