import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, CheckCircle, Play, Rewind, FastForward, Volume2, VolumeX, Maximize, Minimize, Settings } from "lucide-react";
import img from "../images/3.jpg.jpeg";

export default function VSL() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const maxWatchedTime = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

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
      setDuration(video.duration);
      if (savedTime > 0 && savedTime < video.duration) {
        video.currentTime = savedTime;
        maxWatchedTime.current = savedTime;
        setCurrentTime(savedTime);

        const savedPercent = (savedTime / video.duration) * 100;
        setProgress(savedPercent);

        if (savedPercent >= 55) {
          setIsUnlocked(true);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (!video) return;
      
      setCurrentTime(video.currentTime);
      
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
      if (video.currentTime > maxWatchedTime.current + 0.5) {
        video.currentTime = maxWatchedTime.current;
        setCurrentTime(maxWatchedTime.current);
      }
    };

    const handleSeeking = () => {
      preventSeekForward();
    };

    const handleSeeked = () => {
      setCurrentTime(video.currentTime);
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

  // Hide controls after inactivity
  useEffect(() => {
    if (!isHovering && isPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      setShowControls(true);
    }
  }, [isHovering, isPlaying]);

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
      setCurrentTime(newTime);
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
        setCurrentTime(newTime);
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

  const handleProgressBarClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const clickPercent = (x / width);
      const newTime = clickPercent * duration;
      
      if (newTime <= maxWatchedTime.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        if (isPlaying && videoRef.current.paused) {
          videoRef.current.play();
        }
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <div className="relative aspect-video overflow-hidden rounded-[24px] bg-black">
              {/* Video Container */}
              <div 
                ref={containerRef}
                className="relative w-full h-full"
                onMouseEnter={() => {
                  setIsHovering(true);
                  setShowControls(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  if (isPlaying) {
                    setTimeout(() => setShowControls(false), 3000);
                  }
                }}
                onMouseMove={() => {
                  setShowControls(true);
                  if (controlsTimeout) clearTimeout(controlsTimeout);
                  if (isPlaying) {
                    const timeout = setTimeout(() => {
                      if (!isHovering) setShowControls(false);
                    }, 3000);
                    setControlsTimeout(timeout);
                  }
                }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  controls={false}
                  playsInline
                  preload="metadata"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src="/video/lesson 1.mp4" type="video/mp4" />
                </video>

                {/* Thumbnail overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-10">
                    <img
                      src={img}
                      alt="Video thumbnail"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <button
                      onClick={handlePlayClick}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-40"></div>
                        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-purple-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-700">
                          <Play size={36} className="ml-1 text-white sm:size-10" fill="white" />
                        </div>
                      </div>
                    </button>
                  </div>
                )}

                {/* YouTube-style Controls */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Progress Bar */}
                  <div className="mb-3 group">
                    <div 
                      className="relative h-1 w-full overflow-hidden rounded-full bg-white/30 cursor-pointer group-hover:h-1.5 transition-all duration-200"
                      onClick={handleProgressBarClick}
                    >
                      <div
                        className="absolute inset-y-0 left-0 h-full rounded-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      {/* Buffer indicator */}
                      <div
                        className="absolute inset-y-0 left-0 h-full rounded-full bg-white/20"
                        style={{ width: `${(maxWatchedTime.current / duration) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Controls Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Play/Pause */}
                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) {
                              videoRef.current.pause();
                            } else {
                              videoRef.current.play();
                            }
                          }
                        }}
                        className="text-white hover:text-purple-400 transition-colors p-1"
                      >
                        {isPlaying ? (
                          <div className="w-5 h-5 flex items-center justify-center gap-0.5">
                            <div className="w-1 h-4 bg-white rounded-sm"></div>
                            <div className="w-1 h-4 bg-white rounded-sm"></div>
                          </div>
                        ) : (
                          <Play size={20} className="fill-white" />
                        )}
                      </button>

                      {/* Volume */}
                      <div className="flex items-center gap-1 group relative">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-purple-400 transition-colors p-1"
                        >
                          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                          />
                        </div>
                      </div>

                      {/* Time */}
                      <div className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Rewind */}
                      <button
                        onClick={handleRewind}
                        className="text-white hover:text-purple-400 transition-colors p-1"
                      >
                        <Rewind size={20} />
                      </button>

                      {/* Forward */}
                      <button
                        onClick={handleForward}
                        className="text-white hover:text-purple-400 transition-colors p-1"
                      >
                        <FastForward size={20} />
                      </button>

                      {/* Speed */}
                      <div className="relative">
                        <button
                          onClick={() => setShowSpeedControl(!showSpeedControl)}
                          className="text-white hover:text-purple-400 transition-colors p-1 text-sm font-medium"
                        >
                          {playbackSpeed}x
                        </button>
                        {showSpeedControl && (
                          <div className="absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-sm rounded-lg py-2 min-w-[100px] shadow-xl z-30">
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => changePlaybackSpeed(speed)}
                                className={`w-full px-4 py-1.5 text-sm text-left transition-all hover:bg-white/10 ${
                                  playbackSpeed === speed ? 'text-purple-400' : 'text-white'
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-purple-400 transition-colors p-1"
                      >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress UI */}
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

            <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#e5dfd2]">
              <div
                className="absolute inset-y-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500 ease-out shadow-inner"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
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
                  Watch 55% video to unlock The Neuro Assessment Test
                </>
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}