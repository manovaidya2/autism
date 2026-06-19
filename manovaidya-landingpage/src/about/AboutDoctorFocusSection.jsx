import React from "react";
import {
  ArrowRight,
  Baby,
  Brain,
  CalendarClock,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  MessageCircleHeart,
  Sparkles,
  Speech,
  Stethoscope,
  Target,
  UsersRound,
} from "lucide-react";
import aboutFamilyImage from "../images/about-family-care.png";

const focusAreas = [
  {
    label: "Autism Spectrum\nDisorder (ASD)",
    Icon: Brain,
    color: "text-[#7e63df]",
    bg: "bg-[#7e63df]/10",
  },
  {
    label: "ADHD",
    Icon: Target,
    color: "text-[#ff8a62]",
    bg: "bg-[#ff8a62]/12",
  },
  {
    label: "Child Development\nConcerns",
    Icon: Baby,
    color: "text-[#55b76b]",
    bg: "bg-[#55b76b]/12",
  },
  {
    label: "Behavioural\nConcerns",
    Icon: Sparkles,
    color: "text-[#7294df]",
    bg: "bg-[#7294df]/12",
  },
  {
    label: "Speech &\nCommunication",
    Icon: Speech,
    color: "text-[#df5f9b]",
    bg: "bg-[#df5f9b]/12",
  },
  {
    label: "Teen Mental\nHealth",
    Icon: HeartHandshake,
    color: "text-[#7c67df]",
    bg: "bg-[#7c67df]/10",
  },
  {
    label: "Learning & Attention\nChallenges",
    Icon: Stethoscope,
    color: "text-[#ff9b6d]",
    bg: "bg-[#ff9b6d]/12",
  },
  {
    label: "Anxiety & Stress -\nEmotional Wellbeing",
    Icon: MessageCircleHeart,
    color: "text-[#8B43BA]",
    bg: "bg-[#8B43BA]/10",
  },
  {
    label: "Stress, Anxiety\nDepression",
    Icon: HeartPulse,
    color: "text-[#e65395]",
    bg: "bg-[#e65395]/12",
  },
  {
    label: "Women's Emotional\nWellbeing",
    Icon: HeartHandshake,
    color: "text-[#e8ac38]",
    bg: "bg-[#e8ac38]/14",
  },
  {
    label: "Senior Mental\nHealth Support",
    Icon: Brain,
    color: "text-[#766bd8]",
    bg: "bg-[#766bd8]/10",
  },
];

const familyReasons = [
  {
    text: "Structured & Root-Cause Based Approach",
    color: "text-[#65b86c]",
    bg: "bg-[#65b86c]/12",
  },
  {
    text: "Personalised Assessment & Guidance",
    color: "text-[#ff8a62]",
    bg: "bg-[#ff8a62]/12",
  },
  {
    text: "Family-Centred Support",
    color: "text-[#65b86c]",
    bg: "bg-[#65b86c]/12",
  },
  {
    text: "Long-Term Results & Progress Tracking",
    color: "text-[#7090e4]",
    bg: "bg-[#7090e4]/12",
  },
  {
    text: "Support Across All Ages & Life Stages",
    color: "text-[#8B43BA]",
    bg: "bg-[#8B43BA]/10",
  },
  {
    text: "Focus on Overall Well-being, not just Mental Wellness",
    color: "text-[#8B43BA]",
    bg: "bg-[#8B43BA]/10",
  },
  {
    text: "Compassionate, Scientific and Care",
    color: "text-[#766bd8]",
    bg: "bg-[#766bd8]/10",
  },
];

function AboutDoctorFocusSection() {
  return (
    <section className="bg-[#fbfaff] px-4 pb-10 sm:px-6 sm:pb-12 lg:px-10 lg:pb-16">
      <div className="mx-auto w-full ">
        <div className="grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-2xl border border-[#8B43BA]/12 bg-white px-4 py-5 shadow-[0_14px_34px_rgba(31,19,56,0.08)] sm:px-6 sm:py-6">
            <h2 className="flex items-center justify-center gap-4 text-center text-[21px] font-black leading-tight text-[#4d2a74] sm:text-[24px]">
              <span className="text-[#8B43BA]">...</span>
              <span>Our Core Areas of Focus</span>
              <span className="text-[#8B43BA]">...</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {focusAreas.map(({ label, Icon, color, bg }) => (
                <div key={label} className="flex min-h-[54px] items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg} ${color}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="whitespace-pre-line text-[12.5px] font-black leading-5 text-[#251553]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#8B43BA]/12 bg-white shadow-[0_14px_34px_rgba(31,19,56,0.08)]">
            <div className="grid h-full lg:grid-cols-[1fr_0.72fr]">
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <h2 className="flex items-center justify-center gap-4 text-center text-[21px] font-black leading-tight text-[#4d2a74] sm:text-[24px]">
                  <span className="text-[#8B43BA]">...</span>
                  <span>Why Families Choose Manovaidya</span>
                  <span className="text-[#8B43BA]">...</span>
                </h2>

                <div className="mt-5 space-y-3">
                  {familyReasons.map(({ text, color, bg }) => (
                    <div key={text} className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${color}`}
                      >
                        <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span className="text-[13px] font-black leading-5 text-[#251553] sm:text-[13.5px]">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <img
                src={aboutFamilyImage}
                alt="Family guidance at Manovaidya"
                className="h-full min-h-[220px] w-full object-cover object-center lg:min-h-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl bg-[#4d238e] text-white shadow-[0_16px_34px_rgba(77,35,142,0.24)]">
          <div className="grid items-center gap-5 px-5 py-5 sm:px-7 sm:py-6 lg:grid-cols-[1.06fr_0.02fr_0.92fr]">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-[#8B43BA] sm:h-24 sm:w-24">
                <CalendarClock className="h-11 w-11 sm:h-[52px] sm:w-[52px]" strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="text-[24px] font-black leading-tight sm:text-[28px]">
                  Book a Consultation
                </h2>
                <p className="mt-2 max-w-[620px] text-[13px] font-semibold leading-6 text-white/86 sm:text-[14px]">
                  If you are looking for support for Autism, ADHD, Child
                  Development Concerns, Mental Health or Behavioural Challenges,
                  we are here to help with a personalised roadmap and long-term
                  care.
                </p>
              </div>
            </div>

            <span className="hidden h-24 w-px bg-white/24 lg:block" />

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-[13px] font-semibold leading-6 text-white/86 sm:text-[14px]">
                Take the first step towards clarity and better outcomes. Book
                your consultation with Dr. Ankush Garg today.
              </p>
              <a
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[13px] font-black text-[#251553] shadow-[0_14px_24px_rgba(20,10,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(20,10,42,0.22)]"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDoctorFocusSection;
