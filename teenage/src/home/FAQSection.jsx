import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Can teen behavioral issues really improve?",
      a: "Absolutely. Challenges like anxiety, anger, low focus, and social withdrawal are often rooted in biological imbalances — brain chemistry, gut health, and nervous system regulation. When these are addressed properly, lasting improvement is not just possible, it's expected. Over 90% of families report measurable positive changes within the first 3 months.",
    },
    {
      q: "How long does it take to see results?",
      a: "Every teen is different, but most parents notice early improvements within 3–4 weeks — better sleep, reduced irritability, and improved daily routines. Major changes in focus, emotional control, and academic performance typically show within 2–4 months. For complete transformation, we recommend a 6–12 month journey.",
    },
    {
      q: "Do we need to stop current therapy or counseling?",
      a: "Not at all. Our program is designed to enhance existing therapies like counseling or CBT. In fact, many parents see significantly better results from therapy after starting our program — because we prepare the brain biologically to respond better.",
    },
    {
      q: "Will every teen show improvement?",
      a: "While results vary, over 90% of teens show noticeable positive changes. During the initial assessment, we give you a clear and honest expectation of what improvements are possible based on your teen’s current condition.",
    },
    {
      q: "Is this different from regular counseling?",
      a: "Yes — fundamentally. Counseling focuses on behavior (output), while our system focuses on the root cause (input). By fixing brain chemistry, gut health, and nervous system balance first, we make behavioral improvement faster and more sustainable.",
    },
    {
      q: "My teen won’t cooperate. Will this still work?",
      a: "This is very common — and yes, it can still work. Much of the initial phase focuses on nutrition and biological correction, which doesn’t require active participation. As your teen starts feeling better, cooperation naturally improves.",
    },
    {
      q: "Is this approach scientifically backed?",
      a: "Yes. Our approach is based on research in neuroscience, nutritional psychiatry, and adolescent psychology. The gut-brain connection, dopamine regulation, and nervous system balance are all well-established scientific areas studied by institutions like Harvard and Johns Hopkins.",
    },
    {
      q: "Can this help with screen addiction?",
      a: "Absolutely. Screen addiction is driven by dopamine imbalance in the brain. We address this at the root level — rebalancing dopamine naturally while also introducing structured habits. This reduces dependency without constant conflict or force.",
    },
    {
      q: "Is the program available online?",
      a: "Yes! The entire program can be done online — including consultations, tracking, and guidance. Nutrition plans and supplements are delivered to your home, making it convenient for families across India and globally.",
    },
    {
      q: "How much does the program cost?",
      a: "Costs vary depending on your teen’s needs and program duration. We offer flexible plans. The best way to get exact pricing is to take the free assessment — after which our team will share complete details with full transparency.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#f6f8fc] py-8 sm:py-10">
      <div className="max-w-[900px] mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-[24px] sm:text-[34px] font-bold text-[#1f2b3f] text-center mb-3 sm:mb-4 leading-snug">
          Frequently Asked Questions
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#6b7a90] text-[13.5px] sm:text-[16px] mb-8 sm:mb-12 leading-relaxed">
          Get clear, honest answers to the most common questions parents ask about our teen wellness program.
        </p>

        {/* 🔥 Hook Line */}
        <p className="text-center text-[#5b7cff] font-medium mb-6">
          Still unsure? These answers will give you clarity
        </p>

        {/* FAQ List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#e3e8f3] rounded-[12px] sm:rounded-[14px] shadow-sm transition"
            >
              
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-start text-left px-4 sm:px-6 py-4 sm:py-5 gap-3"
              >
                <span className="text-[15px] sm:text-[18px] font-semibold text-[#1f2b3f] leading-snug">
                  {faq.q}
                </span>

                <span className="text-[#5b7cff] text-[18px] sm:text-[20px] mt-1">
                  {openIndex === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-[600px] pb-4 sm:pb-5" : "max-h-0"
                }`}
              >
                <p className="text-[13px] sm:text-[16px] text-[#6b7a90] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}