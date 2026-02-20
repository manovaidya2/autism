import React from "react";

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#f9fbf8] py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
          What Families Say
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Real stories from people who've walked this path.
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-600 italic leading-relaxed">
              “Within 3 months, my son's focus improved dramatically. The parent
              guidance was invaluable—I finally understood how to support him
              better.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                P
              </div>
              <div>
                <p className="font-semibold text-gray-900">Priya M.</p>
                <p className="text-sm text-gray-500">
                  Mother of 7-year-old with ADHD
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-600 italic leading-relaxed">
              “The holistic approach made all the difference. Diet changes plus
              therapy helped our daughter sleep through the night for the first
              time in years.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                R
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rajesh & Sunita</p>
                <p className="text-sm text-gray-500">
                  Parents of 5-year-old with Autism
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-600 italic leading-relaxed">
              “The care guides are so supportive. They truly understand what we
              go through and provide practical, day-to-day strategies that
              work.”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                A
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ananya K.</p>
                <p className="text-sm text-gray-500">
                  Mother of 10-year-old with ADHD
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
