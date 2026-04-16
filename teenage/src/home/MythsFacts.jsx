import React from "react";
import { X, Check } from "lucide-react";

const data = [
  {
    myth: "Teens will grow out of it automatically",
    fact: "Brain development during adolescence is critical. Without proper support, behavioral patterns become hardwired. Early intervention can reshape neural pathways for life.",
  },
  {
    myth: "It's just a phase — all teens are like this",
    fact: "While some mood changes are normal, persistent anxiety, anger, focus issues, and social withdrawal are signs of deeper neurological and biological imbalances that need attention.",
  },
  {
    myth: "Only counseling is enough to fix teen problems",
    fact: "Counseling addresses the mind, but when brain chemistry is imbalanced due to gut issues, nutritional deficiencies, or nervous system dysregulation — it cannot create lasting change alone.",
  },
  {
    myth: "They are just being lazy or irresponsible",
    fact: "What looks like laziness is often executive function impairment, dopamine imbalance, or chronic fatigue caused by poor sleep and nutrition. These are biological issues, not character flaws.",
  },
  {
    myth: "Screen addiction is just a willpower problem",
    fact: "Screen addiction hijacks the dopamine reward system in developing brains. It requires neurological rebalancing and structured intervention — not just willpower or punishment.",
  },
];

const MythsFacts = () => {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <h2 className="text-center text-3xl md:text-[38px] font-bold text-[#1e293b] leading-tight">
          Myths vs Facts: The Truth About<br /> Teen Mental Health
        </h2>

        <p className="text-center text-gray-500 mt-4 max-w-xl mx-auto">
          There's a lot of misinformation about teen behavioral challenges. Let’s separate myths from evidence-based truth.
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