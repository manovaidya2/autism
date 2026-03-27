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
      video: "https://www.youtube.com/embed/oWMqqacIIpQ",
      before: [
        "No speech at age 3 — only sounds",
        "Zero eye contact or name response",
        "Severe hyperactivity — couldn’t sit for 30 seconds",
        "Multiple daily meltdowns lasting 30+ minutes",
      ],
      after: [
        "Speaking 3–4 word sentences consistently",
        "Making eye contact and responding to name",
        "Can sit and engage in activities for 15+ minutes",
        "Meltdowns reduced by 85% in frequency and intensity",
      ],
      quote:
        "We were told our son would never speak...",
      name: "Sneha & Amit Sharma",
      detail: "Son, Age 4 — Autism Spectrum",
      initial: "S",
    },
    {
      afterTitle: "After (6 months into program)",
      video: "https://www.youtube.com/embed/rBOGwlYSfUY",
      before: [
        "Constant meltdowns — 8–10 times daily",
        "No social interaction — completely isolated",
        "Couldn't follow even simple one-step instructions",
        "Severe food selectivity — ate only 3 foods",
      ],
      after: [
        "Meltdowns reduced to 1–2 per week",
        "Playing cooperatively with siblings and peers",
        "Following 3-step instructions independently",
        "Eating variety of 15+ foods willingly",
      ],
      quote:
        "The doctors told us this was permanent...",
      name: "Priya Mehta",
      detail: "Daughter, Age 5 — ASD + ADHD",
      initial: "P",
    },
    {
      afterTitle: "After (3 months into program)",
      video: "https://www.youtube.com/embed/gYgPy11WNV8",
      before: [
        "Diagnosed ADHD at age 6 — couldn’t focus in school",
        "Disruptive behavior in class",
        "Couldn't complete homework without struggle",
        "Low self-esteem",
      ],
      after: [
        "Focused attention span of 30+ minutes",
        "Positive teacher feedback",
        "Completes homework independently",
        "Confident, happy, says 'I can do this!'",
      ],
      quote:
        "Our son was labeled as the 'problem child'...",
      name: "Rajesh & Kavita Patel",
      detail: "Son, Age 7 — ADHD Combined Type",
      initial: "R",
    },

    // 👇 ADD MORE CARDS HERE (optional)
    {
      afterTitle: "After (5 months into program)",
      video: "https://www.youtube.com/embed/oWMqqacIIpQ",
      before: [
        "No verbal communication",
        "Extreme anxiety in social situations",
        "Couldn't handle transitions",
        "Sensory processing issues",
      ],
      after: [
        "Using 50+ words and phrases",
        "Playing with other children",
        "Smooth transitions between activities",
        "Better sensory regulation",
      ],
      quote:
        "The transformation has been miraculous...",
      name: "Anjali Singh",
      detail: "Son, Age 6 — Autism Spectrum",
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