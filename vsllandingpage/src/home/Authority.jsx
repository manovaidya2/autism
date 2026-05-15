import React from "react";
import doctorImg from "../images/imghero.jpeg";

export default function Authority() {

  const roles = [
    "Neuro-Ayurveda System Developer",
    "Brain–Gut–Behaviour Specialist",
    "Structured System Creator",
  ];

  return (
    <section className="bg-[#f8f7f2] py-14 sm:py-16 lg:py-20 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start">

            <div className="w-full max-w-[435px] overflow-hidden rounded-[18px]">

              <img
                src={doctorImg}
                alt="System Developer"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                loading="lazy"
              />

            </div>

          </div>

          {/* RIGHT CONTENT */}
         {/* RIGHT CONTENT */}
<div className="lg:-ml-2 lg:-mt-">

            {/* LABEL */}
            <div className="flex items-center gap-3 mb-7">

              <span className="h-[1px] w-9 bg-[#d6a22e]"></span>

              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-[#d6a22e] font-medium">
                Authority
              </p>

            </div>

            {/* TITLE */}
            <h2 className="font-serif font-medium text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">

              <span className="block whitespace-nowrap">
                A system created for parents
              </span>

              <span className="block whitespace-nowrap">
                who want clarity, not noise.
              </span>

            </h2>

            {/* ROLES */}
            <div className="mt-9 space-y-5">

              {roles.map((role, index) => (

                <div
                  key={index}
                  className="border-l-[2px] border-[#d6a22e] pl-5 py-2"
                >

                  <p className="text-[17px] sm:text-[19px] text-[#082b1b] font-semibold">
                    {role}
                  </p>

                </div>

              ))}

            </div>

            {/* BOTTOM TEXT */}
            <p className="mt-8 text-[16px] sm:text-[17px] leading-snug text-[#34433b] italic max-w-[620px]">

              Calm. Confident. Structured. Built around measurable developmental
              progression.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}