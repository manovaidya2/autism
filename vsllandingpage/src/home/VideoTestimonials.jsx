import React, { useState } from "react";
import { Play, Star, ShieldCheck, Quote } from "lucide-react";

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: "tSJp1Ca9Gdg",
      name: "Sushant",
      role: "Father of Naisha (8)",
      city: "Shahdara",
      duration: "30 sec",
    },
        {
      id: "myQ5ThUSY8A",
      name: "Sunita",
      role: "Mother of Ansh (3)",
      city: "delhi",
      duration: "30 sec",
    },
        {
      id: "bj63Qv-NM8o",
      name: "meera",
      role: "Mother of Rohan (4)",
      city: "delhi",
      duration: "1 min",
    },
        {
      id: "80fFVYSS_gA",
      name: "Sarika",
      role: "Mother of palak (9)",
      city: "delhi",
      duration: "30 sec",
    },
    {
      id: "gYgPy11WNV8",
      name: "Sunita R.",
      role: "Mother of Aarav (16)",
      city: "Mumbai",
      duration: "30 sec",
    },
    {
      id: "ZRsjg5Onbqo",
      name: "Ritika Bansal.",
      role: "Mother of Riyansh (4)",
      city: "Delhi",
      duration: "30 sec",
    },
    {
      id: "OQg0gMNgIdo",
      name: "Sakshi Gupta",
      role: "Mother of Ritik (3)",
      city: "Gurugram",
      duration: "45 sec",
    },
    {
      id: "b0OzBNn9F_s",
      name: "Rachna Mehra",
      role: "Mother of Vivan (7)",
      city: "Hyderabad",
      duration: "45 sec",
    },
    {
      id: "lqhpefWYP2E",
      name: "Anurag",
      role: "Father of Rishi (3)",
      city: "Gurugram",
      duration: "45 sec",
    },
    {
      id: "DP-crCP4rLo",
      name: "Sonia Sharma",
      role: "Mother of Athrav (5)",
      city: "Hyderabad",
      duration: "30 sec",
    },
    {
      id: "oRaZRWeA-Sk",
      name: "Neha Gupta",
      role: "Mother of Arav (4)",
      city: "Lucknow",
      duration: "30 sec",
    },
    {
      id: "FJuj_jAmgqI",
      name: "Poonam Jain",
      role: "Mother of Vivan (6)",
      city: "Chandigarh",
      duration: "30  sec",
    },
    
    
  ];

  return (
    <section className="bg-[#f8f7f2] py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-10">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
              Video Testimonials
            </p>
            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>
          </div>

          <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">
            Hear it from the parents{" "}
            <span className="italic text-[#d6a22e]">themselves.</span>
          </h2>

          <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-[#6b756c]">
            Unscripted. Unedited. Real parent experiences.
          </p>
        </div>

        {/* CARDS - 2 IN ONE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {videos.map((v, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[18px] border border-[#ded8cb] bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* IMAGE / VIDEO */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {activeVideo === index ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`}
                    title={v.name}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                    {/* VERIFIED */}
                    <div className="absolute top-5 left-7 flex items-center gap-2 text-white">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em]">
                        Verified Parent
                      </span>
                    </div>

                    {/* DURATION */}
                    <div className="absolute top-5 right-5 rounded-md bg-black/65 px-3 py-1.5 text-[13px] font-mono text-white">
                      {v.duration}
                    </div>

                    {/* PLAY BUTTON */}
                    <button
                      onClick={() => setActiveVideo(index)}
                      className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-110"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#0b2f1d] text-[#0b2f1d]">
                        <Play className="ml-1 h-6 w-6" fill="currentColor" />
                      </span>
                    </button>

                    {/* QUOTE ICON */}
                    <div className="absolute left-7 right-7 bottom-7">
                      <Quote className="h-7 w-7 text-[#d6a22e] drop-shadow-md" />
                    </div>
                  </>
                )}
              </div>

              {/* BOTTOM SECTION */}
              <div className="flex items-center justify-between gap-4 bg-white px-6 py-5">
                <div>
                  <h3 className="text-[17px] font-bold text-[#082b1b]">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#4f5f57]">
                    {v.role} · {v.city}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#d6a22e]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill="currentColor"
                      stroke="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] leading-relaxed text-[#7b857d]">
          All videos shared with explicit parental consent. Faces and names approved for public use.
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href="https://manovaidya.in/testimonials.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#8B43BA] px-9 py-5 text-large font-bold text-white shadow-sm transition-all hover:bg-[#d6a22e] hover:text-[#0b2f1d]"
          >
            Read More
          </a>
        </div>

      </div>
    </section>
  );
}
