import React from "react";
import { ArrowLeft, ArrowRight, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";
import { storyVideos } from "../data/storyVideos";

function StoryVideoCard({ video }) {
  return (
    <article className="min-w-0">
      <div className="overflow-hidden rounded-[10px] bg-[#111827] shadow-[0_10px_24px_rgba(21,27,58,0.14)]">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </article>
  );
}

function StoriesSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const visibleVideos = Array.from({ length: 3 }, (_, offset) => storyVideos[(activeIndex + offset) % storyVideos.length]);

  const goPrevious = () => {
    setActiveIndex((current) => (current === 0 ? storyVideos.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === storyVideos.length - 1 ? 0 : current + 1));
  };

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

          <div className="mt-7">
            <div className="grid gap-5 md:grid-cols-3">
              {visibleVideos.map((video) => (
                <StoryVideoCard key={video.id} video={video} />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e4df] bg-white text-[#07584c] shadow-sm transition hover:border-[#0d6a56] hover:bg-[#edf7f4]"
                onClick={goPrevious}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex max-w-[220px] items-center gap-2 overflow-hidden">
                {storyVideos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    aria-label={`Go to story slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeIndex === index ? "w-8 bg-[#7a3fe0]" : "w-2.5 bg-[#d6dce6]"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next story"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e4df] bg-white text-[#07584c] shadow-sm transition hover:border-[#0d6a56] hover:bg-[#edf7f4]"
                onClick={goNext}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
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
          <Link
            to="/stories"
            className="mt-7 inline-flex h-[58px] w-full items-center justify-center gap-4 rounded-[8px] bg-[#7a3fe0] px-6 text-[18px] font-black text-white shadow-[0_14px_24px_rgba(122,63,224,0.25)] transition hover:bg-[#6932c8]"
          >
            View All Stories
            <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default StoriesSection;
