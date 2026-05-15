import React from "react";

export default function Realization() {

  const facets = [
    {
      t: "Brain Response",
      d: "How the brain receives and processes input",
    },
    {
      t: "Neural Signaling",
      d: "How signals travel through developmental pathways",
    },
    {
      t: "Sensory Processing",
      d: "How the body integrates sound, touch, and motion",
    },
    {
      t: "Internal Biology",
      d: "Gut, sleep, and metabolic foundations",
    },
  ];

  return (
    <section className="bg-[#f8f7f2] py-16 sm:py-10 overflow-hidden">

      <div className=" mx-auto px-4 sm:px-20 lg:px-20">

        {/* HEADING */}
        <div className="max-w-3xl">

          <p className="text-[12px] sm:text-[12px] uppercase tracking-[0.32em] text-[#d6a22e] font-semibold">
            The Big Realization
          </p>

          <h2 className="mt-5 font-serif text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.08] tracking-[-0.04em] text-[#0b2f1d]">

            Autism is not just a speech issue,
            <br className="hidden sm:block" />

          

            {" "}or a behaviour problem.

          </h2>

          <p className="mt-6 text-[15px] sm:text-[17px] leading-relaxed text-[#6b756c] max-w-2xl">

            It is a{" "}

            <span className="text-[#0b2f1d] font-semibold">
              neuro-developmental system imbalance
            </span>

            {" "}involving multiple connected layers.
            Until this is understood clearly,
            results remain unpredictable.

          </p>

        </div>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {facets.map((item, index) => (

            <div
              key={index}
              className="rounded-[24px] border border-[#e8dfd0] bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d6a22e]/40 hover:shadow-md"
            >

              {/* NUMBER */}
              <div className="text-[#d6a22e] font-serif text-[34px] leading-none">
                0{index + 1}
              </div>

              {/* TITLE */}
              <h3 className="mt-5 text-[#0b2f1d] text-[18px] font-semibold leading-snug">
                {item.t}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-[13px] leading-relaxed text-[#6b756c]">
                {item.d}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}