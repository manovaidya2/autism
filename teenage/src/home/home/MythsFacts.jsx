import React from "react";
import { X, Check } from "lucide-react";

const data = [
  {
    myth: "Autism has no solution — nothing can be done",
    fact: "Neuroplasticity research proves the brain can form new connections at any age. Early, targeted intervention can significantly improve outcomes.",
  },
  {
    myth: "Therapy alone is enough for improvement",
    fact: "Therapy is most effective when the brain is neurologically ready. Nutrition, gut health, and neural activation prepare the foundation for therapy to work.",
  },
  {
    myth: "My child doesn’t understand anything",
    fact: "Receptive language (understanding) develops before expressive language (speaking). Your child likely understands far more than they can express.",
  },
  {
    myth: "Autism is caused by bad parenting",
    fact: "Autism is a neurodevelopmental condition with genetic and environmental factors. It has absolutely nothing to do with parenting style.",
  },
  {
    myth: "Children with autism can never live independently",
    fact: "With the right support system, many individuals with autism lead fulfilling, independent lives with meaningful relationships and careers.",
  },
];

const MythsFacts = () => {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-[38px] font-bold text-[#1e293b] leading-tight">
          Myths vs Facts: What Science Really Says<br/> About Autism & ADHD
        </h2>
        <p className="text-center text-gray-500 mt-4 max-w-xl mx-auto">
          There’s a lot of misinformation about autism and ADHD. Let’s separate the myths from the evidence-based truth.
        </p>

        {/* Cards */}
        <div className="mt-12 space-y-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 border border-[#c7d2fe] rounded-xl overflow-hidden"
            >
              {/* Myth */}
              <div className="bg-[#fff1f2] p-6 md:p-7 flex gap-3 items-start">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-red-400 text-red-500">
                  <X size={14} />
                </div>
                <div>
                  <p className="text-red-500 text-xs font-semibold mb-1">MYTH</p>
                  <p className="text-[#1e293b] font-medium leading-relaxed text-sm md:text-base">
                    {item.myth}
                  </p>
                </div>
              </div>

              {/* Fact */}
              <div className="bg-[#eff6ff] p-6 md:p-7 flex gap-3 items-start">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-400 text-blue-500">
                  <Check size={14} />
                </div>
                <div>
                  <p className="text-blue-500 text-xs font-semibold mb-1">FACT</p>
                  <p className="text-[#1e293b] leading-relaxed text-sm md:text-base">
                    {item.fact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MythsFacts;
