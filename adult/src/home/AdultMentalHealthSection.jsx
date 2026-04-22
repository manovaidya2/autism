import React from "react";

const adultTreatments = [
  {
    title: "Stress & Anxiety",
    image:
      "https://manovaidya.in/assets/img/shapes/1-s.jpg",
  },
  {
    title: "Depression",
    image:
      "https://manovaidya.in/assets/img/shapes/2-s.jpg",
  },
  {
    title: "ADHD",
    image:
      "https://manovaidya.in/assets/img/shapes/2-s.jpg",
  },
  {
    title: "Mood Disorder",
    image:
      "https://manovaidya.in/assets/img/shapes/4-s.jpg",
  },
  {
    title: "Insomnia",
    image:
      "https://manovaidya.in/assets/img/shapes/5-s.jpg",
  },
  {
    title: "Autism Support",
    image:
      "https://manovaidya.in/assets/img/shapes/6-s.jpg",
  },
  {
    title: "Schizophrenia",
    image:
      "https://manovaidya.in/assets/img/shapes/7-s.jpg",
  },
  {
    title: "Bipolar Disorder",
    image:
      "https://manovaidya.in/assets/img/shapes/8-s.jpg",
  },
  {
    title: "OCD",
    image:
      "https://manovaidya.in/assets/img/shapes/9-s.jpg",
  },
  {
    title: "PTSD",
    image:
      "https://manovaidya.in/assets/img/shapes/10-s.jpg",
  },
  {
    title: "Dementia Care",
    image:
      "https://manovaidya.in/assets/img/shapes/11-s.jpg",
  },
  {
    title: "Migraine",
    image:
      "https://manovaidya.in/assets/img/shapes/12-s.jpg",
  },
  {
    title: "Hormonal Imbalance",
    image:
      "https://manovaidya.in/assets/img/shapes/13-s.jpg",
  },
  {
    title: "Suicidal Thoughts",
    image:
      "https://manovaidya.in/assets/img/shapes/14-s.jpg",
  },
  {
    title: "Personality Disorder",
    image:
      "https://manovaidya.in/assets/img/shapes/15-s.jpg",
  },
  {
    title: "Brain Health",
    image:
      "https://manovaidya.in/assets/img/shapes/16-s.jpg",
  },
  {
    title: "Heart Risk",
    image:
      "https://manovaidya.in/assets/img/shapes/17-s.jpg",
  },
  {
    title: "Dissociative Disorder",
    image:
      "https://manovaidya.in/assets/img/shapes/18-s.jpg",
  },
];

export default function AdultMentalHealthSection() {
  return (
    <section className="w-full bg-[#f3f3f3] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Title */}
        <div className="relative flex items-center justify-center mb-10 md:mb-12">
         

          <h2 className="text-center text-[22px] sm:text-[28px] md:text-[34px] font-bold  leading-tight">
            •• Specialized Treatment For Adult Mental Health ••
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {adultTreatments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.16)] border border-[#e7e7e7] 
                         h-[170px] sm:h-[185px] md:h-[190px]
                         flex flex-col items-center justify-between
                         px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
            >
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[78px] h-[78px] sm:w-[90px] sm:h-[90px] object-contain"
                />
              </div>

              <p className="text-center text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] font-medium ">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}