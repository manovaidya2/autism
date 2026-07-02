import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { storyVideos } from "../data/storyVideos";

function StoriesPage() {
  return (
    <main className="bg-[#fbfbff] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto">
        <Link
          to="/#success-stories"
          className="inline-flex items-center gap-2 text-[14px] font-black text-[#07584c] transition hover:text-[#0d6a56]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-6 text-center">
          <h1 className="font-serif text-[32px] font-black leading-tight text-[#0d6a56] sm:text-[44px]">
            Real Success Stories
          </h1>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] font-black leading-relaxed text-[#26304b] sm:text-[17px]">
            Watch real experiences from families and patients who found support through Manovaidya.
          </p>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {storyVideos.map((video) => (
            <article key={video.id} className="overflow-hidden rounded-[10px] bg-[#111827] shadow-[0_10px_24px_rgba(21,27,58,0.14)]">
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default StoriesPage;
