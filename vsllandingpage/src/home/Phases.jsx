import React from "react";

export default function Phases() {

  const phases = [
    {
      n: "Phase 01",
      d: "0 – 60 Days",
      t: "Stabilization",
      points: [
        "Child becomes calmer",
        "Irritability reduces",
        "Basic engagement begins",
      ],
    },
    {
      n: "Phase 02",
      d: "60 – 120 Days",
      t: "Response Development",
      points: [
        "Response improves",
        "Eye contact increases",
        "Understanding begins",
      ],
    },
    {
      n: "Phase 03",
      d: "120 – 180 Days",
      t: "Learning & Behaviour Integration",
      points: [
        "Learning improves",
        "Behaviour stabilizes",
        "Engagement becomes meaningful",
      ],
    },
  ];

  return (
    <section
      id="plan"
      className="relative overflow-hidden bg-[#f8f7f2] py-16 sm:py-20 lg:py-10"
    >

      {/* GLOW */}
      <div className="absolute top-[-100px] right-[-100px] h-[240px] w-[240px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto">

          {/* LABEL */}
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.32em] text-[#d6a22e] font-semibold">
            The 180-Day System
          </p>

          {/* TITLE */}
          <h2 className="mt-5 font-serif text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-[-0.04em] text-[#0b2f1d]">

            A Structured

            <span className="block italic">
              180-Day Neuro-Development Plan
            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[#6b756c]">
            Autism improvement follows a process — not guesswork.
          </p>

        </div>

        {/* TIMELINE */}
        <div className="relative mt-16">

          {/* LINE */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[1px] bg-[#d6a22e]/30"></div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">

            {phases.map((phase, index) => (

              <div
                key={index}
                className="relative"
              >

                {/* TOP DOT */}
                <div className="hidden lg:flex absolute -top-1 left-1/2 -translate-x-1/2 z-10">

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f8f7f2]">

                    <div className="h-3 w-3 rounded-full bg-[#d6a22e] ring-4 ring-[#d6a22e]/20"></div>

                  </div>

                </div>

                {/* CARD */}
                <div className="mt-10 rounded-[28px] border border-[#e8dfd0] bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full min-h-[390px] flex flex-col">

                  {/* CARD TOP */}
                  <div className="flex items-center justify-between gap-3">

                    {/* PHASE */}
                    <p className="text-[12px] uppercase tracking-[0.25em] text-[#d6a22e] font-semibold">
                      {phase.n}
                    </p>

                    {/* DAYS */}
                    <p className="text-[14px] text-[#7d867f] font-medium">
                      {phase.d}
                    </p>

                  </div>

                  {/* TITLE */}
                  <h3 className="mt-5 font-serif text-[28px] leading-tight text-[#0b2f1d]">

                    {phase.t}

                  </h3>

                  {/* DIVIDER */}
                  <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-[#d6a22e]/50 to-transparent"></div>

                  {/* POINTS */}
                  <div className="mt-6 space-y-4 flex-1">

                    {phase.points.map((point, i) => (

                      <div
                        key={i}
                        className="flex items-start gap-3"
                      >

                        {/* DOT */}
                        <div className="mt-[9px] h-2.5 w-2.5 rounded-full bg-[#d6a22e] flex-shrink-0"></div>

                        {/* TEXT */}
                        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#234031]">
                          {point}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-14 text-center">

          <p className="font-serif italic text-[30px] sm:text-[30px] leading-tight text-[#0b2f1d]">

            This is not trial-based treatment.

            <span className="block text-[#d6a22e] not-italic mt-2">
              This is structured developmental progression.
            </span>

          </p>

        </div>

      </div>

    </section>
  );
}