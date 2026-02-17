import React from "react";
import { CheckCircle } from "lucide-react";

const ProgramIncludes = () => {
  return (
    <section className="bg-[#f9fbf8] py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
          What's Included in Your Program
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          A comprehensive care system designed for lasting results.
        </p>

        {/* Card */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-10 text-left">

          {/* List */}
          <ul className="space-y-6">
            {[
              "Comprehensive developmental assessment",
              "Personalized care roadmap with measurable goals",
              "Regular therapy sessions (behavioral, speech, occupational)",
              "Ayurvedic supplements for cognitive and nervous system support",
              "Parent training and guidance sessions",
              "Progress tracking with monthly review calls",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle className="text-green-700 w-5 h-5 mt-1" />
                <span className="text-gray-800 text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-10 border-t"></div>

          {/* Bottom Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration Options</p>
              <p className="font-medium text-gray-900">
                3 months / 6 months / 12 months
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Support Mode</p>
              <p className="font-medium text-gray-900">
                Online + In-clinic options available
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramIncludes;
