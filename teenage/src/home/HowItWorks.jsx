import React from "react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#fdfcf9] py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <div className="relative inline-block mb-6">
          <span className="absolute inset-x-0 bottom-1 h-3 bg-gray-300/70"></span>
          <h2 className="relative text-3xl md:text-4xl font-serif font-semibold text-gray-900">
            How It Works
          </h2>
        </div>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-20">
          A simple, structured approach to your mental wellness journey.
        </p>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-[2px] bg-gray-300"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-semibold mb-6 z-10">
              1
            </div>

            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
              Share Your Details
            </h3>

            <p className="text-gray-600 max-w-xs">
              Complete a brief assessment form or connect with our care guide to
              help us understand your concerns and goals.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-semibold mb-6 z-10">
              2
            </div>

            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
              Receive Your Plan
            </h3>

            <p className="text-gray-600 max-w-xs">
              Our experts design a personalized wellness plan that blends
              guidance, lifestyle changes, and holistic support.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-semibold mb-6 z-10">
              3
            </div>

            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
              Track & Progress
            </h3>

            <p className="text-gray-600 max-w-xs">
              Ongoing follow-ups, progress monitoring, and plan adjustments help
              you steadily move toward lasting improvements.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
