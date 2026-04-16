import React from "react";
import { FaInfoCircle, FaBolt, FaLightbulb } from "react-icons/fa";

export default function UnderstandingSection() {
  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-16 bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[24px] sm:text-[32px] md:text-[36px] font-bold text-black leading-snug md:leading-tight">
          Understanding Autism & ADHD: What Every{" "}
          <br className="hidden sm:block" />
          Parent Needs to Know
        </h2>

        {/* Top Cards */}
        <div className="mt-8 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-8">

          {/* Autism Card */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">
            
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaInfoCircle size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                What is Autism Spectrum Disorder?
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that affects how a child
              perceives the world, communicates, and interacts with others. The word "spectrum"
              reflects the wide range of challenges and strengths — no two children with autism are exactly alike.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              According to the CDC, approximately <strong className="text-black">1 in 36 children</strong> in the United States is diagnosed
              with ASD, and prevalence rates in India are estimated at <strong className="text-black">1 in 100 children</strong> — affecting
              over 18 million families.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Key areas affected include social communication, restricted or repetitive behaviors, sensory processing,
              and executive function. However, with early intervention and the right approach, children with autism
              can make remarkable progress.
            </p>
          </div>

          {/* ADHD Card */}
          <div className="bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

            <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
              <FaBolt size={18} />
              <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
                What is ADHD?
              </h3>
            </div>

            <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              Attention Deficit Hyperactivity Disorder (ADHD) is one of the most common neurodevelopmental disorders
              in children, affecting approximately <strong className="text-black">8–10% of school-age children worldwide</strong>.
              It is characterized by persistent patterns of inattention, hyperactivity, and impulsivity.
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              ADHD has three presentations: <strong className="text-black">Predominantly Inattentive</strong> (difficulty focusing),
              <strong className="text-black"> Predominantly Hyperactive-Impulsive</strong> (restlessness and impulsivity),
              and <strong className="text-black"> Combined Type</strong> (both).
            </p>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.6]">
              What many parents don't realize is that ADHD isn't simply a behavioral problem — it's rooted in
              differences in brain chemistry, neural connectivity, and often underlying nutritional and gut health
              issues that can be addressed.
            </p>
          </div>

        </div>

        {/* Bottom Wide Card */}
        <div className="mt-8 sm:mt-10 bg-white border border-[#dfe5f1] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">

          <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#6c8ef5] mb-3 sm:mb-4">
            <FaLightbulb size={18} />
            <h3 className="font-bold text-black text-[16px] sm:text-[20px] leading-snug">
              The Critical Window: Why Early Intervention Matters
            </h3>
          </div>

          <p className="text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            The first 12 years of a child's life represent a period of extraordinary brain development. During this time,
            the brain forms over <strong className="text-black">1 million new neural connections every second</strong>. This remarkable plasticity
            means that the right interventions during this window can literally reshape your child's brain architecture.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            Research published in the Journal of the American Academy of Child & Adolescent Psychiatry consistently shows
            that children who receive comprehensive early intervention show <strong className="text-black">47% greater improvement</strong> in
            cognitive abilities and <strong className="text-black">40% greater improvement</strong> in adaptive behavior compared to those who
            begin intervention later.
          </p>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] text-[#4b5563] leading-[1.7]">
            This is why every day matters. The sooner you begin addressing the root neurological causes — not just the
            surface symptoms — the greater the potential for transformation.
          </p>

        </div>

      </div>

      {/* CTA Section */}
      <div className="mt-10 sm:mt-16 bg-[#5f84d6] rounded-xl sm:rounded-2xl px-5 sm:px-8 py-6 sm:py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Left Text */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-[18px] sm:text-[22px] md:text-[26px] font-semibold leading-snug">
            Don't wait another day — your child's development can't wait
          </h3>
          <p className="text-white/80 text-[13.5px] sm:text-[15px] mt-2">
            Get a comprehensive developmental assessment — completely free, no obligations
          </p>
        </div>

        {/* Button */}
        <a
          href="https://manovaidya.com/Pages/mind-health"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-block bg-white text-[#5f84d6] px-5 sm:px-6 py-3 rounded-xl text-sm font-medium shadow-md text-center"
        >
          → Take Free Assessment
        </a>

      </div>
    </section>
  );
}