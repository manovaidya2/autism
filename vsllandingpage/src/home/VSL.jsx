import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, CheckCircle, Play, Rewind, FastForward } from "lucide-react";
import img from "../images/3.jpg.jpeg";

export default function VSL() {
  const videoRef = useRef(null);
  const maxWatchedTime = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const STORAGE_KEY = "vsl_lesson_1_progress";

  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const savedTime = Number(localStorage.getItem(STORAGE_KEY)) || 0;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
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

      // Update max watched time (only forward progress)
      if (video.currentTime > maxWatchedTime.current) {
        maxWatchedTime.current = video.currentTime;
        localStorage.setItem(STORAGE_KEY, String(video.currentTime));
      }

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

    const preventSeekForward = () => {
      if (!video) return;

      // If trying to seek forward beyond max watched time, prevent it
      if (video.currentTime > maxWatchedTime.current + 0.5) {
        video.currentTime = maxWatchedTime.current;
      }
      // Allow seeking backward without any issue (no pause)
    };

    // Handle seeking events without pausing
    const handleSeeking = () => {
      preventSeekForward();
    };

    const handleSeeked = () => {
      // Ensure video continues playing if it was playing before seek
      if (isPlaying && video.paused) {
        video.play().catch(err => console.log("Play prevented:", err));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, videoRef.current.currentTime - 10);
      videoRef.current.currentTime = newTime;
      // Keep playing if it was playing
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(maxWatchedTime.current, videoRef.current.currentTime + 10);
      if (newTime <= maxWatchedTime.current) {
        videoRef.current.currentTime = newTime;
        // Keep playing if it was playing
        if (isPlaying && videoRef.current.paused) {
          videoRef.current.play();
        }
      }
    }
  };

  const changePlaybackSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedControl(false);
    }
  };

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

          {/* Modern Video Frame Design */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#062f1c] to-[#0a4228] p-3 shadow-[0_30px_60px_-15px_rgba(6,47,28,0.4)]">
            {/* Decorative corner accents */}
            <div className="absolute top-3 left-3 w-12 h-12 border-l-2 border-t-2 border-[#d6a22e]/30 rounded-tl-2xl z-10"></div>
            <div className="absolute top-3 right-3 w-12 h-12 border-r-2 border-t-2 border-[#d6a22e]/30 rounded-tr-2xl z-10"></div>
            <div className="absolute bottom-3 left-3 w-12 h-12 border-l-2 border-b-2 border-[#d6a22e]/30 rounded-bl-2xl z-10"></div>
            <div className="absolute bottom-3 right-3 w-12 h-12 border-r-2 border-b-2 border-[#d6a22e]/30 rounded-br-2xl z-10"></div>

            <div className="relative aspect-video overflow-hidden rounded-[24px] bg-black/50 backdrop-blur-sm">
              {/* Thumbnail overlay - shown when video is not playing */}
              {!isPlaying && (
                <div className="absolute inset-0 z-10">
                  {/* Video Thumbnail */}
                  <img
                    src={img}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('bg-gradient-to-br', 'from-[#0b2f1d]', 'to-[#1a4a2e]');
                      }
                    }}
                  />
                  {/* Gradient overlay for better play button visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Custom Play Button - Purple Theme */}
                  <button
                    onClick={handlePlayClick}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    aria-label="Play video"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-40"></div>
                      <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-purple-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-700">
                        <Play size={36} className="ml-1 text-white sm:size-10" fill="white" />
                      </div>
                    </div>
                  </button>

                  {/* Progress pill on thumbnail */}
                  {progress > 0 && progress < 100 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 z-20">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-medium text-white">
                          {Math.floor(progress)}% watched
                        </div>
                        <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                controls={isPlaying}
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                poster="/video/thumbnail.jpg"
              >
                <source src="/video/lesson 1.mp4" type="video/mp4" />
              </video>

              {/* Custom Controls Overlay when playing */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={handleRewind}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                      aria-label="Rewind 10 seconds"
                    >
                      <Rewind size={20} className="text-white" />
                    </button>
                    <button
                      onClick={handleForward}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                      aria-label="Forward 10 seconds"
                    >
                      <FastForward size={20} className="text-white" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedControl(!showSpeedControl)}
                        className="bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-white text-sm font-medium transition-all duration-200"
                      >
                        {playbackSpeed}x
                      </button>
                      {showSpeedControl && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-2 flex flex-col gap-1 min-w-[80px]">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => changePlaybackSpeed(speed)}
                              className={`px-3 py-1 text-sm rounded-md transition-all ${
                                playbackSpeed === speed
                                  ? "bg-purple-600 text-white"
                                  : "text-gray-300 hover:bg-white/20"
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress UI with smooth bar */}
          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${progress >= 55 ? 'bg-green-500' : 'bg-purple-500'} animate-pulse`}></div>
                <p className="text-sm font-medium text-[#0b2f1d]">Your Progress</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-purple-600">{Math.floor(progress)}%</div>
                {progress >= 55 && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    <CheckCircle size={14} />
                    Unlocked
                  </div>
                )}
              </div>
            </div>

            {/* Smooth Progress Bar - Purple Theme */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#e5dfd2]">
              <div
                className="absolute inset-y-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500 ease-out shadow-inner"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            {/* Max watched time indicator */}
            <div className="relative h-1.5 w-full mt-1">
              <div
                className="absolute top-0 h-full w-0.5 bg-purple-300 rounded-full"
                style={{ left: `${(maxWatchedTime.current / (videoRef.current?.duration || 1)) * 100}%` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-xs text-[#6b756c]">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <span>Auto-saves your position</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock size={12} />
                <span>{progress >= 55 ? 'Assessment unlocked' : `${55 - Math.floor(progress)}% more to unlock`}</span>
              </div>
            </div>

            {/* Feature badges */}
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                <Rewind size={12} />
                <span>Can rewind anytime</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                <FastForward size={12} />
                <span>Can't skip forward</span>
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
                <CheckCircle size={12} />
                <span>Resume from where you left</span>
              </div>
            </div>
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
                  ? "bg-[#0b2f1d] text-white hover:bg-purple-600 hover:text-white shadow-xl transform hover:-translate-y-0.5"
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