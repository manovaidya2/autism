import { CheckCircle } from "lucide-react";
import React from "react";
const ChallengesTransformation = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT CARD */}
        <div className="rounded-2xl border border-[#f1e6d8] bg-[#fffaf4] p-10">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8">
            Challenges You May Face
          </h2>

          <ul className="space-y-5 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Difficulty with focus, attention, and completing tasks</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Behavioral challenges and emotional outbursts</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Sleep disturbances and irregular routines</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Delayed speech or communication difficulties</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Social interaction challenges with peers</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
              <span>Learning difficulties and academic struggles</span>
            </li>
          </ul>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-2xl bg-[#f4f1ff] p-10">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8">
            The Transformation Ahead
          </h2>

          <ul className="space-y-5 text-gray-800">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Improved focus and attention span</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Better emotional regulation and reduced meltdowns</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Established healthy sleep patterns and routines</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Enhanced communication and social skills</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Structured learning support and progress</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-600 w-5 h-5 mt-1" />
              <span>Parent confidence in managing daily challenges</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ChallengesTransformation;
