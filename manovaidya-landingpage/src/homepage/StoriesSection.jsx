import React from "react";
import { ArrowRight, Clapperboard, Play } from "lucide-react";
import supportWomen from "../images/support-women.webp";
import doctorPortrait from "../images/doctor-ankush-portrait.png";
import supportSeniors from "../images/support-seniors.webp";

const sampleVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const stories = [
  {
    quote: '"My son is more confident\nand calm now."',
    byline: "- Mother of 8 Year Old",
    duration: "2:02",
    poster: supportWomen,
  },
  {
    quote: '"Anxiety and overthinking\nhave reduced a lot."',
    byline: "- Patient, 26 Years",
    duration: "1:54",
    poster: doctorPortrait,
  },
  {
    quote: '"Better sleep & memory\nimproved a lot."',
    byline: "- Father of 62 Year Old",
    duration: "1:47",
    poster: supportSeniors,
  },
];

function StoriesSection() {
  return (
    <section id="success-stories" className="scroll-mt-24 bg-[#fbfbff] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto grid gap-8 lg:grid-cols-[1fr_300px] lg:items-stretch">
        <div>
          <div className="text-center">
            <h2 className="font-serif text-[28px] font-black leading-none text-[#0d6a56] sm:text-[38px]">
              Real Stories. Real Progress.
            </h2>
            <p className="mt-3 text-[14px] font-black text-[#26304b] sm:text-[16px]">
              Hear from families whose lives have changed with the right guidance and support.
            </p>
          </div>

          <div className="mt-7 grid gap-8 md:grid-cols-3">
            {stories.map(({ quote, byline, duration, poster }) => (
              <article key={quote}>
                <div className="relative overflow-hidden rounded-[10px] bg-[#1f2937] shadow-[0_10px_24px_rgba(21,27,58,0.14)]">
                  <video
                    className="h-[166px] w-full object-cover"
                    controls
                    muted
                    preload="metadata"
                    poster={poster}
                    src={sampleVideo}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-white/90 bg-black/20 text-white shadow-[0_12px_24px_rgba(0,0,0,0.28)]">
                    <Play className="ml-1 h-9 w-9 fill-white" strokeWidth={1.5} />
                  </div>
                  <span className="pointer-events-none absolute bottom-2 right-2 rounded-[6px] bg-black/78 px-2.5 py-1 text-[16px] font-black text-white">
                    {duration}
                  </span>
                </div>

                <p className="mt-5 whitespace-pre-line text-[16px] font-black leading-[1.45] text-[#202746]">
                  {quote}
                </p>
                <p className="mt-4 text-[16px] font-bold text-[#3e465d]">{byline}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="flex min-h-[330px] flex-col items-center justify-center rounded-[12px] bg-[#fbf8ff] px-8 py-7 text-center">
          <Clapperboard className="h-[72px] w-[72px] text-[#8b63d8]" strokeWidth={1.8} />
          <h3 className="mt-5 font-serif text-[28px] font-black leading-[1.05] text-[#211b3c]">
            More Stories,
            <br />
            More Hope
          </h3>
          <p className="mt-6 text-[16px] font-black leading-[1.6] text-[#343b54]">
            Watch more real stories
            <br />
            from our community.
          </p>
          <a
            href="/#success-stories"
            className="mt-7 inline-flex h-[58px] w-full items-center justify-center gap-4 rounded-[8px] bg-[#7a3fe0] px-6 text-[18px] font-black text-white shadow-[0_14px_24px_rgba(122,63,224,0.25)] transition hover:bg-[#6932c8]"
          >
            View All Stories
            <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
          </a>
        </aside>
      </div>
    </section>
  );
}

export default StoriesSection;
