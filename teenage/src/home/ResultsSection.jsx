import React, { useState } from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // 👈 ADD THIS

export default function ResultsSection() {
  const navigate = useNavigate(); // 👈 ADD THIS
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

const cards = [
  {
    afterTitle: "After (4 months into program)",
    video: "https://www.youtube.com/embed/OQg0gMNgIdo",
    before: [
      "Constant phone usage — 6–8 hours daily",
      "Zero focus on studies",
      "Frequent anger outbursts at home",
      "No interest in family or conversations",
    ],
    after: [
      "Screen time reduced to under 2 hours",
      "Can focus on studies for 45+ minutes",
      "Calm emotional responses, anger reduced significantly",
      "Actively engages with family",
    ],
    quote: "We felt like we lost our child to screens...",
    name: "Sakshi Gupta",
    detail: "Son, Age 15 — Screen Addiction & Focus Issues",
    initial: "S",
  },
  {
    afterTitle: "After (6 months into program)",
    video: "https://www.youtube.com/embed/b0OzBNn9F_s",
    before: [
      "Severe anxiety and overthinking",
      "Avoided social situations completely",
      "Poor sleep and constant stress",
      "Low confidence and self-doubt",
    ],
    after: [
      "Significant reduction in anxiety levels",
      "Comfortable in social interactions",
      "Improved sleep cycle and energy",
      "Confident and emotionally stable",
    ],
    quote: "The anxiety was taking over his life...",
    name: "Rachna Mehra",
    detail: "Son, Age 16 — Anxiety & Social Withdrawal",
    initial: "R",
  },
  {
    afterTitle: "After (3 months into program)",
    video: "https://www.youtube.com/embed/ZRsjg5Onbqo",
    before: [
      "Couldn't focus in school for more than 10 minutes",
      "Incomplete homework and poor grades",
      "Constant distraction and restlessness",
      "Negative feedback from teachers",
    ],
    after: [
      "Focused attention span of 40+ minutes",
      "Completes homework independently",
      "Improved academic performance",
      "Positive feedback from teachers",
    ],
    quote: "He was labeled as careless and lazy...",
    name: "Ritina Bansal",
    detail: "Son, Age 14 — ADHD & Academic Decline",
    initial: "R",
  },
  {
    afterTitle: "After (5 months into program)",
    video: "https://www.youtube.com/embed/80fFVYSS_gA",
    before: [
      "Frequent anger and emotional breakdowns",
      "Constant arguments with parents",
      "Highly reactive behavior",
      "No emotional control",
    ],
    after: [
      "Emotionally stable and calm responses",
      "Healthy communication with family",
      "Improved self-control",
      "Better stress management",
    ],
    quote: "Every day felt like a battle at home...",
    name: "Anjali Singh",
    detail: "Son, Age 17 — Anger & Emotional Regulation Issues",
    initial: "A",
  },
];
  const openModal = (video) => {
    setActiveVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveVideo("");
  };

  // 👈 HANDLE SHOW MORE CLICK
  const handleShowMore = () => {
    navigate("/testimonial-video"); // Change this to your desired route
  };

  return (
    <section id="result" className="bg-[#f6f8fc] py-10">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        
        <h2 className="text-[36px] font-extrabold text-[#1f2b3f] mb-3">
          Real Results from Real Families
        </h2>

        <p className="text-[15px] text-[#6b7a90] max-w-[700px] mx-auto mb-12">
          These are genuine stories from parents whose children have gone through the Manovaidya program.
        </p>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          
          {cards.slice(0, visibleCount).map((card, i) => (
            <div
              key={i}
              className="bg-white border border-[#e3e8f3] rounded-[18px] overflow-hidden text-left shadow-sm"
            >
              
              <div className="grid grid-cols-2">
                
                <div className="bg-[#fff1f1] p-5">
                  <p className="text-[11px] font-bold text-red-500 mb-3 uppercase tracking-wide">
                    BEFORE
                  </p>

                  <ul className="space-y-2 text-[13px] text-[#5f6f85]">
                    {card.before.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <RxCrossCircled className="text-red-400 text-[18px] mt-[3px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#eef3ff] p-5">
                  <p className="text-[11px] font-bold text-[#5b7cff] mb-3 uppercase tracking-wide">
                    {card.afterTitle}
                  </p>

                  <ul className="space-y-2 text-[13px] text-[#5f6f85]">
                    {card.after.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-[#5b7cff] text-[18px] mt-[3px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5">
                <button
                  onClick={() => openModal(card.video)}
                  className="w-full bg-[#eef3ff] hover:bg-[#e0e7ff] text-[#5b7cff] py-3 rounded-xl flex items-center justify-center gap-2 text-[14px]"
                >
                  <FaPlay className="text-xs" />
                  Watch Video Testimonial
                </button>
              </div>

              <div className="bg-[#fff9e6] p-5 text-[14px] italic">
                “{card.quote}”
              </div>

              <div className="flex items-center gap-3 p-5">
                <div className="w-10 h-10 rounded-full bg-[#5b7cff] text-white flex items-center justify-center font-bold">
                  {card.initial}
                </div>
                <div>
                  <p className="text-[14px] font-semibold">
                    {card.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {card.detail}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* 🔥 SHOW MORE BUTTON - NOW REDIRECTS */}
        <div className="mt-10">
          <button
            onClick={handleShowMore}
            className="bg-[#5b7cff] text-white px-6 py-3 rounded-xl hover:bg-[#4a6cf7] transition"
          >
            Show More
          </button>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-3xl relative">
            
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-black text-2xl"
            >
              <IoClose />
            </button>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`${activeVideo}?autoplay=1`}
                title="Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}