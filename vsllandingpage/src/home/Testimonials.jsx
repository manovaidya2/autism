import React from "react";
import {
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";

import pradeepImg from "../images/imghero.jpeg";
import jatinImg from "../images/imghero.jpeg";

export default function Testimonials() {

  const overallRating = 4.9;
  const fullStars = Math.floor(overallRating);
  const hasHalfStar = overallRating % 1 >= 0.5;

  const items = [
    {
      q: "Apne child ke behaviour ko lekar hum kaafi time se worried the. Isi concern ke liye humne Dr. Ankush Garg se consultation liya. Unhone bahut calmly hamari saari baat suni aur simple tareeke se hume situation samjhayi. Unki guidance mein ab lagbhag 4 months se treatment chal raha hai, aur hume positive changes feel ho rahe hain. Thanks for bringing back balance in our life.",
      name: "Pradeep Singh",
      role: "Parent",
      city: "India",
      date: "Reviewed a month ago",
      rating: 5,
      verified: true,
      tag: "Google Review",
      image: pradeepImg,
    },
    {
      q: "My 17 year old daughter was suffering from anxiety, mood swings and overthinking. As parents, hum samajh hi nahi pa rahe the ki problem kya hai. We tried many things at home and consulted doctors, but kuch khas benefit nahi hua. Manovaidya se treatment start karne ke baad kaafi positive changes dekhe.",
      name: "Monu Singh",
      role: "Parent",
      city: "India",
      date: "Reviewed 2 months ago",
      rating: 5,
      verified: true,
      tag: "Google Review",
      image: "https://ui-avatars.com/api/?name=Monu+Singh",
    },
    {
      q: "Meri beti bahut hyperactive thi. Humne kaafi jagah consult kiya, jahan hume bataya gaya ki usse ADHD hai. Treatment start karwaya lekin zyada improvement nazar nahi aa rahi thi. Ek din Facebook par Manovaidya ka ad dekha aur wahan se treatment start kiya.",
      name: "Jatin Kumar",
      role: "Parent",
      city: "India",
      date: "Reviewed 3 months ago",
      rating: 5,
      verified: true,
      tag: "Google Review",
      image: jatinImg,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] py-14 sm:py-16 lg:py-10">

      {/* GLOW */}
      <div className="absolute top-[-120px] right-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">

        {/* TOP */}
        <div className="text-center max-w-3xl mx-auto">

          {/* LABEL */}
          <div className="flex items-center justify-center gap-3">

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

            <p className="text-[12px] sm:text-[12px] uppercase tracking-[0.38em] text-[#d6a22e] font-medium">
              Verified Parent Stories
            </p>

            <span className="h-[1px] w-8 bg-[#d6a22e]"></span>

          </div>

          {/* TITLE */}
          <h2 className="mt-6 font-serif font-medium text-[34px] sm:text-[46px] lg:text-[46px] leading-[1.04] tracking-[-0.04em] text-[#0b2f1d] whitespace-nowrap">

  Real families.

  <span className="inline italic text-[#d6a22e]">
    {" "}Real words.
  </span>

</h2>

          {/* RATING */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#e5ddcf] bg-white px-5 py-2.5 shadow-sm">

            {/* STARS */}
            <div className="flex items-center gap-0.5">

              {[1, 2, 3, 4, 5].map((star) => {

                const isFull = star <= fullStars;
                const isHalf = star === fullStars + 1 && hasHalfStar;

                return (
                  <span
                    key={star}
                    className="relative inline-flex h-4 w-4"
                  >

                    {/* EMPTY STAR */}
                    <Star
                      className="h-4 w-4"
                      fill="none"
                      stroke="#d1d5db"
                    />

                    {/* FILLED STAR */}
                    {(isFull || isHalf) && (
                      <span
                        className="absolute left-0 top-0 overflow-hidden"
                        style={{
                          width: isFull ? "100%" : "80%",
                        }}
                      >
                        <Star
                          className="h-4 w-4"
                          fill="#facc15"
                          stroke="#facc15"
                        />
                      </span>
                    )}

                  </span>
                );
              })}

            </div>

            <span className="text-[14px] font-semibold text-[#0b2f1d]">
              {overallRating}
            </span>

            <span className="text-[13px] text-[#6b756c]">
              · Ratings
            </span>

          </div>

        </div>

        {/* CARDS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {items.map((t, index) => (

            <div
              key={index}
              className="group flex h-full flex-col rounded-[28px] border border-[#e5ddcf] bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="text-[15px] font-semibold text-[#0b2f1d] leading-tight">
                      {t.name}
                    </h3>

                    <p className="mt-1 text-[12px] text-[#6b756c]">
                      {t.role}
                    </p>

                  </div>

                </div>

                {/* VERIFIED */}
                {t.verified && (

                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-[#6b756c]">

                    <ShieldCheck className="h-3.5 w-3.5 text-[#d6a22e]" />

                    Verified

                  </div>

                )}

              </div>

              {/* REVIEW STARS */}
              <div className="mt-5 flex items-center gap-2">

                <div className="flex items-center gap-0.5">

                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      fill="#facc15"
                      stroke="#facc15"
                    />
                  ))}

                </div>

                <span className="text-[11px] text-[#7b857d]">
                  {t.date}
                </span>

              </div>

              {/* QUOTE ICON */}
              <Quote className="mt-5 h-5 w-5 text-[#d6a22e]/60" />

              {/* REVIEW */}
              <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-[#234031]">
                {t.q}
              </p>

              {/* DIVIDER */}
              <div className="my-6 h-[1px] w-full bg-[#ece5d8]"></div>

              {/* FOOTER */}
              <div className="flex items-center justify-between gap-3">

                <span className="text-[12px] text-[#6b756c]">
                  📍 {t.city}
                </span>

                <span className="rounded-full bg-[#f5f2ea] px-3 py-1 text-[11px] font-medium text-[#0b2f1d]">
                  {t.tag}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}