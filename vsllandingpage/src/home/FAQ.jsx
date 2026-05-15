import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "Is the ₹499 session a treatment session?",
      a: "No. It is a structured assessment to identify the actual neuro-development gaps and create your roadmap before any treatment begins.",
    },
    {
      q: "How is this different from therapy?",
      a: "Therapies work on symptoms. Our system works on the underlying neuro-developmental imbalance — brain response, neural signaling, sensory processing, and internal biology.",
    },
    {
      q: "How long is the full system?",
      a: "180 days, divided into three structured phases: Stabilization, Response Development, and Learning & Behaviour Integration.",
    },
    {
      q: "Will my child improve?",
      a: "We do not promise overnight results. We provide structured direction with measurable progress at each phase.",
    },
    {
      q: "Do I have to commit to treatment after the session?",
      a: "No. The Clarity Session exists so you can decide with full understanding. There is no obligation.",
    },
    {
      q: "Is this conducted online or in person?",
      a: "The Clarity Session can be conducted online for parents across India and abroad.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      className="bg-[#f8f7f2] py-12 sm:py-16 lg:py-10"
    >
      <div className=" mx-auto px-4 sm:px-90">

        {/* LABEL */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-9 bg-[#d6a22e]" />

          <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.45em] text-[#d6a22e] font-medium">
            Frequently Asked
          </p>
        </div>

        {/* TITLE */}
        <h2 className="mt-8 text-center font-serif font-normal text-[38px] sm:text-[52px] lg:text-[50px] leading-[1.05] tracking-[-0.04em] text-[#0b2f1d]">
          Questions, answered calmly.
        </h2>

        {/* FAQ LIST */}
        <div className="mt-14 border-t border-[#ddd6c8]">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border-b border-[#ddd6c8]"
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between gap-6 py-7 text-left"
              >
                <span className="text-[18px] sm:text-[21px] font-semibold text-[#062f1c]">
                  {item.q}
                </span>

                <ChevronDown
                  className={`h-5 w-5 text-[#d6a22e] flex-shrink-0 transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === index
                    ? "grid-rows-[1fr] opacity-100 pb-7"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[680px] text-[18px] sm:text-[18px] leading-[1.8] text-[#5f6761]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}