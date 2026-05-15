import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, CheckCircle } from "lucide-react";

export default function VSL() {
  const videoRef = useRef(null);
  const maxWatchedTime = useRef(0);

  const STORAGE_KEY = "vsl_lesson_1_progress";

  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const savedTime = Number(localStorage.getItem(STORAGE_KEY)) || 0;

    const handleLoadedMetadata = () => {
      if (savedTime > 0 && savedTime < video.duration) {
        video.currentTime = savedTime;
        maxWatchedTime.current = savedTime;

        const savedPercent = (savedTime / video.duration) * 100;
        setProgress(savedPercent);

        if (savedPercent >= 55) {
          setIsUnlocked(true);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (!video) return;

      if (video.currentTime > maxWatchedTime.current + 1) {
        video.currentTime = maxWatchedTime.current;
        return;
      }

      maxWatchedTime.current = video.currentTime;

      localStorage.setItem(STORAGE_KEY, String(video.currentTime));

      const current = video.currentTime;
      const duration = video.duration;

      if (duration > 0) {
        const percent = (current / duration) * 100;
        setProgress(percent);

        if (percent >= 55) {
          setIsUnlocked(true);
        }
      }
    };

    const preventSeek = () => {
      if (!video) return;

      if (video.currentTime > maxWatchedTime.current) {
        video.currentTime = maxWatchedTime.current;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", preventSeek);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", preventSeek);
    };
  }, []);

  return (
    <section
      id="video"
      className="relative overflow-hidden bg-[#f8f7f2] py-16 sm:py-20 lg:py-10"
    >
      <div className="absolute top-[-120px] left-[-100px] h-[260px] w-[260px] rounded-full bg-[#d6a22e]/10 blur-3xl"></div>
      <div className="absolute bottom-[-130px] right-[-110px] h-[280px] w-[280px] rounded-full bg-[#062f1c]/10 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6a22e]/30 bg-white/70 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#d6a22e] animate-pulse"></span>

            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#d6a22e] font-semibold">
              Watch First
            </p>
          </div>

          <h2 className="mt-6 font-serif text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.08] tracking-[-0.04em] text-[#0b2f1d]">
            Watch This Before Starting
            <br className="hidden sm:block" />
            <span className="text-[#d6a22e]"> Any Autism Treatment</span>
          </h2>

          <p className="mt-5 text-[#6b756c] text-[14px] sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
            A 3-minute briefing on why most therapies fail — and how a
            structured root-cause system creates predictable progress.
          </p>
        </div>

        <div className="relative mt-12 max-w-5xl mx-auto">
          <div className="absolute -top-4 -left-4 h-20 w-20 border-l border-t border-[#d6a22e] rounded-tl-2xl"></div>
          <div className="absolute -bottom-4 -right-4 h-20 w-20 border-r border-b border-[#d6a22e] rounded-br-2xl"></div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#062f1c] p-2 shadow-[0_30px_90px_rgba(6,47,28,0.20)]">
            <div className="relative aspect-video overflow-hidden rounded-[22px] bg-black">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src="/video/lesson 1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-[#0b2f1d]">
                Video Progress
              </p>

              <p className="text-sm font-semibold text-[#d6a22e]">
                {Math.floor(progress)}%
              </p>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-[#e5dfd2]">
              <div
                className="h-full rounded-full bg-[#d6a22e] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-3 text-center text-sm text-[#6b756c]">
              Your video progress will resume from where you stopped.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
          <a
  href={isUnlocked ? "/book-appointment" : "#"}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    if (!isUnlocked) e.preventDefault();
  }}
  className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-center text-sm sm:text-base font-semibold transition-all duration-300 ${
    isUnlocked
      ? "bg-[#0b2f1d] text-white hover:bg-[#d6a22e] hover:text-[#0b2f1d] shadow-xl"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {isUnlocked ? (
    <>
      <CheckCircle size={20} />
      Book Neuro-Assessment Development Test
      <ArrowRight size={20} />
    </>
  ) : (
    <>
      <Lock size={20} />
      Watch 55% To Unlock Assessment
    </>
  )}
</a>
          </div>
        </div>
      </div>
    </section>
  );
}