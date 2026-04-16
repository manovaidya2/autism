import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Can autism be cured?",
      a: "Autism is a neurodevelopmental condition, not a disease — so 'cure' isn't the right framework. However, the brain has remarkable plasticity, especially in children under 12. With the right interventions addressing brain nutrition, gut health, and neural activation, significant and measurable improvements in communication, behavior, focus, and social skills are absolutely achievable. Many children in our program have exceeded expectations that were set by their initial diagnoses.",
    },
    {
      q: "How long does it take to see results?",
      a: "Every child is unique, so timelines vary. However, most families report initial positive changes within 4-6 weeks — improvements in sleep, reduced irritability, or better eye contact. Significant, sustainable improvements in speech, behavior, and social interaction typically emerge between 3-6 months. For comprehensive developmental progress, we recommend a 12-month commitment. The earlier you begin, the faster the brain responds.",
    },
    {
      q: "Do we need to stop current therapy?",
      a: "Absolutely not. The Manovaidya system is designed to complement and enhance existing therapies — not replace them. In fact, many parents find that their child's response to speech therapy, occupational therapy, and ABA improves dramatically after starting our program, because we're preparing the brain to actually absorb and benefit from those interventions.",
    },
    {
      q: "Will every child show improvement?",
      a: "While the degree of improvement varies, over 90% of families in our program report noticeable positive changes. During the initial assessment, we provide realistic expectations based on your child's specific profile. We believe in complete transparency — we'll tell you exactly what improvements are likely and what timeline to expect.",
    },
    {
      q: "Is the program available online?",
      a: "Yes! Our program is available in both online and in-clinic formats. Parent guidance sessions, progress tracking, and follow-up consultations can all be conducted effectively online via video calls. The nutrition and supplement protocols are shipped to your doorstep. Many families across India and internationally participate successfully through our online program.",
    },
    {
      q: "What age group does this program work for?",
      a: "Our program is designed for children aged 2-12 years, which is the critical window for brain development and neuroplasticity. Children in this age range show the most dramatic improvements because their brains are still actively developing neural connections. We have separate protocols optimized for toddlers (2-4), early childhood (4-7), and school-age children (7-12).",
    },
    {
      q: "Is this approach scientifically backed?",
      a: "Yes. Our Brain-Gut-Neurodevelopment approach is grounded in peer-reviewed research from neuroscience, nutritional psychiatry, and developmental psychology. The gut-brain axis connection is one of the most actively researched areas in neuroscience, with studies from Harvard, Johns Hopkins, and other leading institutions supporting the link between gut health and brain function.",
    },
    {
      q: "How is Manovaidya different from regular therapy?",
      a: "Traditional therapy works on the 'output' — behavior and speech. Manovaidya works on the 'input' — preparing the brain and body so that therapy actually works. By addressing nutritional deficiencies, gut inflammation, and neural readiness first, we create the neurological foundation that makes speech therapy, OT, and behavioral interventions dramatically more effective.",
    },
    {
      q: "What does the assessment include?",
      a: "Our comprehensive assessment covers: developmental milestone analysis, cognitive function evaluation, sensory processing profile, gut health indicators, nutritional status review, behavioral pattern analysis, and parent interview. The result is a detailed report showing your child's current developmental level, specific areas of delay, improvement potential, and a customized care roadmap.",
    },
    {
      q: "How much does the program cost?",
      a: "Program costs vary based on your child's specific needs, severity level, and the duration of the plan. We offer flexible payment options and different program tiers. The best way to understand pricing is to complete the free assessment — after which our care team will present transparent, detailed pricing with no hidden costs. The initial consultation is completely free.",
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
          Frequently Asked Questions About Autism & ADHD Care
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#6b7a90] text-[13.5px] sm:text-[16px] mb-8 sm:mb-12 leading-relaxed">
          We understand you have questions. Here are honest, detailed answers to what parents ask us most.
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