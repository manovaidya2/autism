import React, { useState } from "react";
import { FaPlay, FaTimes, FaArrowLeft, FaCalendarAlt, FaUserCheck, FaStar, FaRegClock } from "react-icons/fa";
import { MdFamilyRestroom, MdOutlineChildCare } from "react-icons/md";
import { BiHappy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function VideoGalleryPage({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Video data with rich metadata
  const videos = [
    { id: "gYgPy11WNV8", title: "ADHD Transformation Story", childName: "Reyansh", age: "7", duration: "5:23", category: "adhd", rating: 5 },
    { id: "ZRsjg5Onbqo", title: "Social Skills Breakthrough", childName: "Ananya", age: "6", duration: "4:08", category: "social", rating: 5 },
    { id: "OQg0gMNgIdo", title: "Sensory Processing Success", childName: "Vihaan", age: "4", duration: "3:56", category: "sensory", rating: 5 },
    { id: "b0OzBNn9F_s", title: "Academic Excellence Journey", childName: "Myra", age: "8", duration: "6:15", category: "academic", rating: 5 },
    { id: "lqhpefWYP2E", title: "Building Confidence", childName: "Aryan", age: "9", duration: "4:32", category: "confidence", rating: 4 },
    { id: "DP-crCP4rLo", title: "Family Bonding Story", childName: "Kavya", age: "5", duration: "5:01", category: "family", rating: 5 },
    { id: "oRaZRWeA-Sk", title: "Communication Milestones", childName: "Ishaan", age: "6", duration: "4:45", category: "speech", rating: 5 },
    { id: "SVgf7YNQ7S4", title: "Emotional Regulation Success", childName: "Saanvi", age: "7", duration: "5:30", category: "behavior", rating: 5 },
    { id: "FJuj_jAmgqI", title: "Peer Interaction Journey", childName: "Aditya", age: "8", duration: "4:18", category: "social", rating: 4 },
    { id: "ywzRvIb0Gkk", title: "Learning to Read", childName: "Navya", age: "6", duration: "5:45", category: "academic", rating: 5 },
    // { id: "IxrOVghEjuo", title: "Reducing Anxiety", childName: "Arjun", age: "9", duration: "4:52", category: "behavior", rating: 5 },
    { id: "bj63Qv-NM8o", title: "Fine Motor Skills Progress", childName: "Ira", age: "5", duration: "3:38", category: "motor", rating: 4 },
    { id: "80fFVYSS_gA", title: "Independence Milestone", childName: "Kabir", age: "7", duration: "4:25", category: "confidence", rating: 5 },
    { id: "myQ5ThUSY8A", title: "Parent Partnership Story", childName: "Aanya", age: "4", duration: "6:02", category: "family", rating: 5 },
    { id: "tSJp1Ca9Gdg", title: "Full Transformation Journey", childName: "Rudra", age: "6", duration: "7:15", category: "speech", rating: 5 },
  ];

  const openVideoModal = (videoId) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Function to get YouTube embed URL with proper parameters
  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&iv_load_policy=3&color=white&disablekb=1&hl=en`;
  };

  return (
    <div className="bg-gradient-to-b from-[#f8faff] to-white min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#5b7cff] hover:text-[#4a6ae0] font-semibold transition-all group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Results
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#1f2b3f] to-[#5b7cff] bg-clip-text text-transparent">
            Success Stories Gallery
          </h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5b7cff]/5 to-[#ff9a5b]/5"></div>
        <div className="text-center py-16 px-4 relative">
          <div className="inline-flex items-center gap-2 bg-[#5b7cff]/10 px-4 py-2 rounded-full mb-6">
            <BiHappy className="text-[#5b7cff] text-xl" />
            <span className="text-medium font-semibold text-[#5b7cff]">Real Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2b3f] mb-4">
            Real Families,{" "}
            <span className="bg-gradient-to-r from-[#5b7cff] to-[#ff9a5b] bg-clip-text text-transparent">
              Real Transformations
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Watch inspiring journeys of children who have made remarkable progress through the Manovaidya program
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5b7cff]/10 rounded-full flex items-center justify-center">
                <MdFamilyRestroom className="text-[#5b7cff] text-xl" />
              </div>
              <div>
                <div className="font-bold text-[#1f2b3f]">10,000+</div>
                <div className="text-xs text-gray-500">Families Helped</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5b7cff]/10 rounded-full flex items-center justify-center">
                <FaStar className="text-[#5b7cff] text-xl" />
              </div>
              <div>
                <div className="font-bold text-[#1f2b3f]">100%</div>
                <div className="text-xs text-gray-500">Authentic Stories</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5b7cff]/10 rounded-full flex items-center justify-center">
                <FaRegClock className="text-[#5b7cff] text-xl" />
              </div>
              <div>
                <div className="font-bold text-[#1f2b3f]">30 sec</div>
                <div className="text-xs text-gray-500">Of Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-12 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => openVideoModal(video.id)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hoveredCard === index ? "scale-110" : "scale-100"
                    }`}
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 bg-[#5b7cff] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                      hoveredCard === index ? "scale-110 bg-[#ff9a5b]" : "scale-100"
                    }`}>
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-medium">
                    {video.duration}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-xs font-semibold text-gray-700">{video.rating}.0</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#1f2b3f] text-lg mb-2 line-clamp-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MdOutlineChildCare className="text-[#5b7cff]" />
                      <span>{video.childName}, {video.age} yrs</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#5b7cff] to-[#ff9a5b] rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Progress</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Every child's journey is unique. Start your transformation story today.
          </p>
        <button
  onClick={() => navigate("/contact")}  // 👈 yaha apna route daalo
  className="bg-gradient-to-r from-[#5b7cff] to-[#ff9a5b] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1"
>
  Start Your Journey
</button>
        </div>
      </div>

      {/* Modal with Smaller Video Size */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-red-600 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg border-2 border-white/30"
              style={{ zIndex: 100 }}
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Video Container - Smaller aspect ratio */}
            <div className="relative bg-black">
              {/* 16:9 aspect ratio but with max height constraint */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(selectedVideo)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ position: "absolute", top: 0, left: 0 }}
                ></iframe>
              </div>
            </div>

            {/* Video Info - Compact version */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4">
              <h3 className="text-lg font-bold mb-1">
                {videos.find(v => v.id === selectedVideo)?.title || "Success Story"}
              </h3>
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <MdOutlineChildCare className="text-sm" />
                  {videos.find(v => v.id === selectedVideo)?.childName}, {videos.find(v => v.id === selectedVideo)?.age} years
                </span>
                <span className="flex items-center gap-1">
                  <FaRegClock className="text-sm" />
                  {videos.find(v => v.id === selectedVideo)?.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500 text-sm" />
                  {videos.find(v => v.id === selectedVideo)?.rating}.0
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes zoom-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .zoom-in {
          animation-name: zoom-in;
        }
      `}</style>
    </div>
  );
}