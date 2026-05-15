import React from "react";
import { Star } from "lucide-react";

export default function GoogleReviews() {

  const rating = 4.9;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const reviews = [
    {
      name: "Anjali Krishnan",
      handle: "Local Guide · 47 reviews",
      avatar: "AK",
      color: "bg-rose-500",
      time: "2 weeks ago",
      text:
        "Dr. Manovaidya's team gave us the first honest assessment in 4 years. No false hopes, just a clear 180-day plan.",
    },
    {
      name: "Suresh Reddy",
      handle: "12 reviews",
      avatar: "SR",
      color: "bg-blue-600",
      time: "1 month ago",
      text:
        "The Neuro-Ayurveda system actually addresses root causes before behaviour. My daughter slept through the night for the first time.",
    },
    {
      name: "Meera Joshi",
      handle: "Local Guide · 89 reviews",
      avatar: "MJ",
      color: "bg-emerald-600",
      time: "3 weeks ago",
      text:
        "They say NO to families they cannot help. That integrity is rare. Highly recommend the Clarity Session.",
    },
    {
      name: "Vikram Bhatia",
      handle: "23 reviews",
      avatar: "VB",
      color: "bg-amber-600",
      time: "5 days ago",
      text:
        "Weekly therapist calls, monthly progress reports, and a structured roadmap. This is different.",
    },
    {
      name: "Pallavi Nair",
      handle: "Local Guide · 156 reviews",
      avatar: "PN",
      color: "bg-purple-600",
      time: "1 week ago",
      text:
        "My 4-year-old is now making eye contact, eating new foods, and has started babbling. Day 75.",
    },
    {
      name: "Rahul Desai",
      handle: "8 reviews",
      avatar: "RD",
      color: "bg-cyan-600",
      time: "2 months ago",
      text:
        "Finally a clinic that combines real Ayurveda with neuro-developmental science.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-20">

      {/* GLOW */}
      <div className="absolute top-[-120px] left-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-20">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto">

          {/* LABEL */}
          <div className="flex items-center justify-center gap-3">

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
              Google Reviews
            </p>

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

          </div>

          {/* TITLE */}
          <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d]">

            What parents write on

            <span className="italic text-[#d6a22e]">
              {" "}Google.
            </span>

          </h2>

          {/* GOOGLE CARD */}
          <div className="mt-10 inline-block">

            <div className="rounded-[26px] border border-[#e5ddcf] bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4 text-left">

                {/* GOOGLE ICON */}
                <svg viewBox="0 0 48 48" className="h-11 w-11">

                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>

                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>

                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>

                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>

                </svg>

                {/* CONTENT */}
                <div>

                  <p className="text-[12px] text-[#6b756c]">
                    Manovaidya Clinic · Google
                  </p>

                  <div className="mt-1 flex items-center gap-3">

                    <span className="text-[34px] font-semibold leading-none text-[#0b2f1d]">
                      {rating.toFixed(1)}
                    </span>

                    {/* STARS */}
                    <div className="flex items-center gap-0.5">

                      {[1, 2, 3, 4, 5].map((star) => {

                        const isFull = star <= fullStars;
                        const isHalf = star === fullStars + 1 && hasHalfStar;

                        return (
                          <span
                            key={star}
                            className="relative inline-flex h-5 w-5"
                          >

                            <Star
                              className="h-5 w-5"
                              fill="none"
                              stroke="#d1d5db"
                            />

                            {(isFull || isHalf) && (
                              <span
                                className="absolute left-0 top-0 overflow-hidden"
                                style={{
                                  width: isFull ? "100%" : "50%",
                                }}
                              >

                                <Star
                                  className="h-5 w-5"
                                  fill="#facc15"
                                  stroke="#facc15"
                                />

                              </span>
                            )}

                          </span>
                        );
                      })}

                    </div>

                  </div>

                  <p className="mt-1 text-[12px] text-[#7b857d]">
                    Based on Google ratings
                  </p>

                </div>

              </div>

              {/* BARS */}
              <div className="mt-5 space-y-2.5">

                {[
                  { stars: 5, pct: 94 },
                  { stars: 4, pct: 4 },
                  { stars: 3, pct: 1 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 1 },
                ].map((r, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 text-[12px]"
                  >

                    <span className="w-2 text-[#0b2f1d]">
                      {r.stars}
                    </span>

                    <Star
                      className="h-3 w-3"
                      fill="#facc15"
                      stroke="#facc15"
                    />

                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#ece5d8]">

                      <div
                        className="h-full rounded-full bg-[#d6a22e]"
                        style={{
                          width: `${r.pct}%`,
                        }}
                      ></div>

                    </div>

                    <span className="w-8 text-right text-[#7b857d]">
                      {r.pct}%
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* REVIEWS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {reviews.map((r, index) => (

            <div
              key={index}
              className="rounded-[24px] border border-[#e5ddcf] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* TOP */}
              <div className="flex items-start gap-3">

                {/* AVATAR */}
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${r.color} text-[14px] font-semibold text-white shrink-0`}>
                  {r.avatar}
                </div>

                {/* NAME */}
                <div className="flex-1">

                  <h3 className="text-[18px] font-semibold text-[#0b2f1d]">
                    {r.name}
                  </h3>

                  <p className="mt-0.5 text-[14px] text-[#7b857d]">
                    {r.handle}
                  </p>

                </div>

                {/* GOOGLE */}
                <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0">

                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>

                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>

                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>

                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>

                </svg>

              </div>

              {/* STARS */}
              <div className="mt-4 flex items-center gap-2">

                <div className="flex items-center gap-0.5">

                  {[...Array(5)].map((_, i) => (

                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      fill="#facc15"
                      stroke="#facc15"
                    />

                  ))}

                </div>

                <span className="text-[11px] text-[#7b857d]">
                  {r.time}
                </span>

              </div>

              {/* TEXT */}
              <p className="mt-4 text-[16px] leading-[1.8] text-[#234031]">
                {r.text}
              </p>

              {/* FOOTER */}
              <div className="mt-5 flex items-center gap-5 border-t border-[#ece5d8] pt-4 text-[12px] text-[#7b857d]">

                <button className="transition hover:text-[#0b2f1d]">
                  👍 Helpful
                </button>

                <button className="transition hover:text-[#0b2f1d]">
                  Share
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* BOTTOM */}
        <div className="mt-10 text-center">

          <a
            href="https://www.google.com/search?q=manovaidya+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0b2f1d] transition hover:text-[#d6a22e]"
          >

            See all

            <span className="font-semibold">
              {rating.toFixed(1)}
            </span>

            ratings on Google →

          </a>

        </div>

      </div>

    </section>
  );
}