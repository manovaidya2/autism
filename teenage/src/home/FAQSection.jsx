import { useState } from "react";
import React from "react";

const faqs = [
  {
    question: "Is this counseling or therapy?",
    answer:
      "Our program is wellness-focused guidance that addresses everyday mental health challenges. We help with stress, focus, and emotional regulation using practical tools and strategies. For clinical conditions, we work alongside licensed therapists and can provide referrals when needed.",
  },
  {
    question: "Will my teen actually engage with this?",
    answer:
      "Yes—our approach is designed specifically for teens. Sessions are relatable, practical, and non-judgmental. Most teens find them supportive rather than feeling like another lecture. We also involve teens in goal-setting so they feel ownership of their progress.",
  },
  {
    question: "How involved will parents be?",
    answer:
      "Parents are partners in the process. We provide regular updates and guidance sessions to help you support your teen effectively. The level of involvement is discussed and agreed upon with both the parent and the teen.",
  },
  {
    question: "Can this help with exam preparation?",
    answer:
      "Absolutely. Many teens join us during exam season. We focus on effective study techniques, managing exam anxiety, improving sleep and focus, and building sustainable habits—not just short-term fixes.",
  },
  {
    question: "Is this only for teens with serious problems?",
    answer:
      "Not at all. Our program is for any teen who wants to improve mental wellness, manage stress better, or perform at their best. Prevention and early support are just as valuable as addressing existing challenges.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-4xl font-serif text-center text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-500 mt-4">
        Get answers to common questions about our program.
      </p>

      {/* FAQ List */}
      <div className="mt-14 space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-xl font-serif text-gray-900">
                {faq.question}
              </span>

              <span
                className={`text-xl transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
