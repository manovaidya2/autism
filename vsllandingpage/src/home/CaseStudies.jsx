import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function CaseStudies() {

  const cases = [
    {
      child: "Aarav M.",
      meta: "Boy · 4 yrs · Mumbai",
      diagnosis: "ASD Level 2 · Non-verbal · Low engagement",
      before:
        "2 years of speech & OT — minimal eye contact, no functional words, frequent meltdowns 4–5x/day.",
      system:
        "Phase 1: Sensory–gut stabilization · Phase 2: Structured response training · Phase 3: Communication mapping",
      duration: "180 Days · Sept 2024 – Mar 2025",
      metrics: [
        { label: "Eye Contact", before: 10, after: 78 },
        { label: "Verbal Words", before: 2, after: 64 },
        { label: "Meltdowns / day", before: 90, after: 18 },
      ],
      milestones: [
        { day: "Day 21", note: "Sleep cycle stabilized" },
        { day: "Day 45", note: "Sustained eye contact returned" },
        { day: "Day 110", note: "First meaningful 2-word phrases" },
        { day: "Day 180", note: "Functional conversation initiated" },
      ],
    },

    {
      child: "Saanvi S.",
      meta: "Girl · 6 yrs · Delhi NCR",
      diagnosis: "ASD + Severe irritability · Sleep disruption",
      before:
        "Behaviour therapy alone — inconsistent results, broken sleep, daily aggression episodes.",
      system:
        "Phase 1 stabilization → Phase 2 response training → Phase 3 integrated learning",
      duration: "180 Days · Jul 2024 – Jan 2025",
      metrics: [
        { label: "Sleep Hours", before: 30, after: 85 },
        { label: "Calm Baseline", before: 15, after: 82 },
        { label: "Aggression Episodes", before: 80, after: 12 },
      ],
      milestones: [
        { day: "Day 30", note: "Sleep through the night" },
        { day: "Day 60", note: "Calm baseline established" },
        { day: "Day 120", note: "Self-regulation in social settings" },
        { day: "Day 150", note: "Behaviour fully stabilized" },
      ],
    },

    {
      child: "Vivaan I.",
      meta: "Boy · 5 yrs · Bengaluru",
      diagnosis: "ASD Level 1 · Poor learning retention",
      before:
        "5+ therapies running in parallel — no unified direction, regression patterns visible every 6 weeks.",
      system:
        "Full 180-day Neuro-Ayurveda Development System with weekly checkpoints",
      duration: "180 Days · Aug 2024 – Feb 2025",
      metrics: [
        { label: "Learning Retention", before: 22, after: 81 },
        { label: "Engagement Quality", before: 28, after: 88 },
        { label: "Therapy Overload", before: 95, after: 30 },
      ],
      milestones: [
        { day: "Day 30", note: "Therapy stack simplified" },
        { day: "Day 70", note: "Retention curve reversed" },
        { day: "Day 130", note: "Reading readiness emerged" },
        { day: "Day 180", note: "Independent task completion" },
      ],
    },
  ];

  return (
    <section
      id="cases"
      className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20"
    >

      {/* GLOW */}
      <div className="absolute top-[-120px] right-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className=" mx-auto px-4 sm:px-10 lg:px-20">

        {/* TOP */}
        <div className="text-center max-w-4xl mx-auto">

          {/* LABEL */}
          <div className="flex items-center justify-center gap-3">

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

            <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
              Documented Case Studies
            </p>

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

          </div>

          {/* TITLE */}
          <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">

            Structured progress,

            <span className="italic text-[#d6a22e]">
              {" "}measured weekly.
            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-[#6b756c] max-w-3xl mx-auto">

            Every case below is a real Manovaidya client.
            Names shortened for privacy.

          </p>

          {/* BADGES */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4dccf] bg-white px-4 py-2 text-[12px] text-[#234031] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#d6a22e]" />
              Parent-consented
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4dccf] bg-white px-4 py-2 text-[12px] text-[#234031] shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-[#d6a22e]" />
              Therapist-verified
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4dccf] bg-white px-4 py-2 text-[12px] text-[#234031] shadow-sm">
              <Calendar className="h-4 w-4 text-[#d6a22e]" />
              Weekly reports
            </div>

          </div>

        </div>

        {/* CASES */}
        <div className="mt-14 space-y-8">

          {cases.map((c, i) => (

            <div
              key={i}
              className="overflow-hidden rounded-[30px] border border-[#e5ddcf] bg-white shadow-sm"
            >

              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">

                {/* LEFT */}
                <div className="relative overflow-hidden bg-[#062f1c] p-7 sm:p-8 text-white">

                  {/* GLOW */}
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

                  <div className="relative">

                    {/* CASE */}
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6a22e] font-semibold">
                      Case {String(i + 1).padStart(2, "0")} of {cases.length}
                    </p>

                    {/* CHILD */}
                    <div className="mt-6 flex items-center gap-4">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 font-serif text-2xl">
                        {c.child[0]}
                      </div>

                      <div>

                        <h3 className="font-serif text-[34px] leading-none">
                          {c.child}
                        </h3>

                        <p className="mt-2 text-[13px] text-white/70">
                          {c.meta}
                        </p>

                      </div>

                    </div>

                    {/* DIAGNOSIS */}
                    <div className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] text-white/90">
                      {c.diagnosis}
                    </div>

                    {/* DURATION */}
                    <div className="mt-8">

                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#d6a22e]">
                        Duration
                      </p>

                      <p className="mt-2 text-[14px] text-white/80">
                        {c.duration}
                      </p>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="p-7 sm:p-8 lg:p-10">

                  {/* BEFORE */}
                  <div>

                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
                      Before Manovaidya
                    </p>

                    <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.8] text-[#234031]">
                      {c.before}
                    </p>

                  </div>

                  {/* SYSTEM */}
                  <div className="mt-7">

                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
                      System Applied
                    </p>

                    <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.8] text-[#234031]">
                      {c.system}
                    </p>

                  </div>

                  {/* METRICS */}
                  <div className="mt-8">

                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
                      Measured Outcomes
                    </p>

                    <div className="mt-5 space-y-5">

                      {c.metrics.map((m, idx) => (

                        <div key={idx}>

                          {/* LABEL */}
                          <div className="mb-2 flex items-center justify-between text-[13px]">

                            <span className="font-medium text-[#0b2f1d]">
                              {m.label}
                            </span>

                            <span className="font-mono text-[#6b756c]">

                              {m.before}%

                              <span className="mx-2 text-[#d6a22e]">
                                →
                              </span>

                              <span className="font-semibold text-[#0b2f1d]">
                                {m.after}%
                              </span>

                            </span>

                          </div>

                          {/* BAR */}
                          <div className="relative h-2 overflow-hidden rounded-full bg-[#ece5d8]">

                            <div
                              className="absolute left-0 top-0 h-full rounded-full bg-[#d6a22e]/35"
                              style={{
                                width: `${m.before}%`,
                              }}
                            ></div>

                            <div
                              className="absolute left-0 top-0 h-full rounded-full bg-[#d6a22e]"
                              style={{
                                width: `${m.after}%`,
                              }}
                            ></div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* TIMELINE */}
                  <div className="mt-9">

                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
                      Milestone Timeline
                    </p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {c.milestones.map((ms, idx) => (

                        <div
                          key={idx}
                          className="rounded-2xl border border-[#ece5d8] bg-[#faf8f3] p-4"
                        >

                          <div className="flex items-start gap-3">

                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a22e]" />

                            <div>

                              <p className="text-[13px] font-semibold text-[#0b2f1d]">
                                {ms.day}
                              </p>

                              <p className="mt-1 text-[13px] leading-relaxed text-[#6b756c]">
                                {ms.note}
                              </p>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex flex-col gap-3 border-t border-[#ece5d8] pt-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2 text-[12px] text-[#6b756c]">

                      <ShieldCheck className="h-4 w-4 text-[#d6a22e]" />

                      Parent-consented · Therapist-verified case file

                    </div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#9aa39d]">
                      Ref #MV-{2024 + i}-{(i + 1) * 137}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* BOTTOM */}
        <p className="mt-10 text-center text-[13px] italic leading-relaxed text-[#7b857d]">

          Results vary by child. Each case depends on consistent execution
          and the specific neuro-developmental profile.

        </p>

      </div>

    </section>
  );
}