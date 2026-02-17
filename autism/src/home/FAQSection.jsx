import { useState } from "react";
import React from "react";

const faqs = [
  {
    question: "What age group is this program suitable for?",
    answer:
      "Our Autism & ADHD program is designed for children from ages 2 to 18. We tailor interventions based on the child's specific age, developmental stage, and individual needs.",
  },
  {
    question: "How is this different from traditional therapy?",
    answer:
      "We combine evidence-based therapies with holistic Ayurvedic support to address not just symptoms, but root causes. Our integrated approach includes diet, lifestyle, supplements, and parent guidance alongside traditional interventions.",
  },
  {
    question: "Can I do this program online?",
    answer:
      "Yes! We offer both online and in-clinic options. Many families find our online sessions convenient and effective, especially for follow-ups and parent guidance.",
  },
  {
    question: "What's included in the assessment?",
    answer:
      "Our comprehensive assessment includes developmental history, behavioral observation, standardized screening tools, and a detailed consultation to understand your child's unique profile and create a personalized care plan.",
  },
  {
    question: "How soon can I expect to see results?",
    answer:
      "While every child is unique, most parents notice initial improvements within 4–6 weeks. Significant, sustainable changes typically develop over 3–6 months with consistent program participation.",
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
