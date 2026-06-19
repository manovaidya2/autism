import React, { useEffect, useState, useRef } from "react";
import {
  Star,
  Users,
  ShieldCheck,
  Target,
  CalendarDays,
} from "lucide-react";

import doctorImg from "../images/imghero.jpeg";

export default function VslHero() {

  /* LIVE BOOKINGS - Extended list */
  const bookings = [
    { name: "Rajesh M.", city: "Bengaluru" },
    { name: "Priya S.", city: "Mumbai" },
    { name: "Anita K.", city: "Delhi NCR" },
    { name: "Arjun P.", city: "Hyderabad" },
    { name: "Meera J.", city: "Pune" },
    { name: "Kavita N.", city: "Chennai" },
    { name: "Vikram R.", city: "Ahmedabad" },
    { name: "Sneha T.", city: "Kolkata" },
    { name: "Rohan D.", city: "Jaipur" },
    { name: "Divya M.", city: "Lucknow" },
    { name: "Amit S.", city: "Nagpur" },
    { name: "Neha G.", city: "Indore" },
    { name: "Sanjay K.", city: "Bhopal" },
    { name: "Pooja V.", city: "Surat" },
    { name: "Manish B.", city: "Coimbatore" },
    { name: "Swati R.", city: "Visakhapatnam" },
    { name: "Deepak C.", city: "Patna" },
    { name: "Anjali P.", city: "Vadodara" },
    { name: "Rahul J.", city: "Ludhiana" },
    { name: "Shreya S.", city: "Agra" },
    { name: "Kunal N.", city: "Nashik" },
    { name: "Ritu M.", city: "Ranchi" },
    { name: "Alok T.", city: "Chandigarh" },
    { name: "Shilpa D.", city: "Mysore" },
    { name: "Varun K.", city: "Guwahati" },
  ];

  const [activeBooking, setActiveBooking] = useState(0);
  const [sessionCount, setSessionCount] = useState(19);
  const [lastIncrementTime, setLastIncrementTime] = useState(Date.now());
  const userVisitCountRef = useRef(0);
  const lastKnownCountRef = useRef(19);
  const sessionStartTimeRef = useRef(Date.now());

  // Function to get random number based on time of day and previous count
  const getRandomBookingCount = (isReturningUser, lastCount, currentHour) => {
    // For first time visit or if we need to reset
    if (!isReturningUser || userVisitCountRef.current === 0) {
      if (currentHour < 12) {
        // Morning (before 12 PM): Random between 19-50
        return Math.floor(Math.random() * (50 - 19 + 1)) + 19;
      } else {
        // Afternoon/Evening (after 12 PM): Random between 100-250
        return Math.floor(Math.random() * (250 - 100 + 1)) + 100;
      }
    } else {
      // Returning user - continue from where they left off with realistic growth
      if (currentHour < 12) {
        // Morning: Add realistic increment (1-7 sessions since last visit)
        const increment = Math.floor(Math.random() * 7) + 1;
        return lastCount + increment;
      } else {
        // Afternoon/Evening: Add larger increment (5-15 sessions since last visit)
        const increment = Math.floor(Math.random() * 15) + 5;
        return lastCount + increment;
      }
    }
  };

  // Check if user is returning (using session storage)
  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedVslHero');
    const storedCount = sessionStorage.getItem('lastSessionCount');
    const storedTime = sessionStorage.getItem('lastVisitTime');
    
    const currentHour = new Date().getHours();
    
    if (hasVisitedBefore && storedCount) {
      userVisitCountRef.current = parseInt(sessionStorage.getItem('visitCount') || '1');
      const lastCount = parseInt(storedCount);
      const lastVisitTime = parseInt(storedTime || '0');
      const timeDifference = (Date.now() - lastVisitTime) / (1000 * 60); // minutes difference
      
      // If more than 5 minutes have passed, show realistic growth
      if (timeDifference > 5) {
        const newCount = getRandomBookingCount(true, lastCount, currentHour);
        setSessionCount(newCount);
        lastKnownCountRef.current = newCount;
        sessionStorage.setItem('lastSessionCount', newCount.toString());
      } else {
        setSessionCount(lastCount);
        lastKnownCountRef.current = lastCount;
      }
    } else {
      // First time visitor
      const initialCount = getRandomBookingCount(false, 0, currentHour);
      setSessionCount(initialCount);
      lastKnownCountRef.current = initialCount;
      sessionStorage.setItem('hasVisitedVslHero', 'true');
      sessionStorage.setItem('lastSessionCount', initialCount.toString());
      sessionStorage.setItem('visitCount', '1');
    }
    
    sessionStorage.setItem('lastVisitTime', Date.now().toString());
    sessionStartTimeRef.current = Date.now();
  }, []);

  // Auto-increment counter every 2.5 seconds for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastIncrement = currentTime - lastIncrementTime;
      
      // Update booking name (cycles through)
      setActiveBooking((prev) => {
        if (prev === bookings.length - 1) {
          return 0;
        }
        return prev + 1;
      });

      // Increment session count with realistic timing
      setSessionCount((prev) => {
        const newCount = prev + 1;
        lastKnownCountRef.current = newCount;
        sessionStorage.setItem('lastSessionCount', newCount.toString());
        return newCount;
      });
      
      setLastIncrementTime(currentTime);
      
      // Update visit count in session storage
      const visitCount = parseInt(sessionStorage.getItem('visitCount') || '1');
      sessionStorage.setItem('visitCount', (visitCount + 1).toString());
      userVisitCountRef.current = visitCount + 1;
      
    }, 2500);

    return () => clearInterval(interval);
  }, [lastIncrementTime, bookings.length]);

  // Format session count with commas for better readability
  const formattedSessionCount = sessionCount.toLocaleString('en-IN');

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 17) return "☀️ Good Afternoon!";
    return "🌙 Good Evening!";
  };

  return (
    <section className="relative overflow-hidden bg-[#f8f7f2] text-[#0b2f1d]">

      <div className="mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 lg:pt-10 pb-8 lg:pb-10">

        {/* PRICE RIBBON */}
        <div className="absolute top-6 right-6 z-10">
          {/* <div className="bg-[#d6a22e] text-[#0b2f1d] px-6 py-3 rounded-full shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <p className="text-[10px] uppercase tracking-wider font-bold">ONLY</p>
            <p className="text-2xl font-bold">₹599 <span className="text-sm font-normal line-through opacity-70">₹1999</span></p>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* TOP LABEL */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">

              <span className="w-6 h-[1px] bg-[#d6a22e]"></span>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#d6a22e] font-semibold">
                Neuro-Development Clarity
              </p>

            </div>

            {/* TITLE */}
            <h1 className="font-serif font-light text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] leading-[1.02] tracking-[-0.04em] text-[#0b2f1d]">

              <span className="whitespace-nowrap">
                Before You Start Autism
              </span>

              <br />

              <span className="text-[#e0aa36]">
                Treatment...
              </span>

              <br />

              <span className="whitespace-nowrap">
                Are You Sure You Know the
              </span>

              <br />

              Exact Problem?

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 text-[#6b756c] text-[14px] sm:text-[15px] leading-relaxed max-w-[530px] mx-auto lg:mx-0 font-light">

              Most parents try multiple therapies — but very few understand
              their child's actual neuro-development gaps.

            </p>

            {/* SMALL INFO */}
            <div className="mt-5 border-l border-[#e0aa36] pl-4 max-w-[530px] mx-auto lg:mx-0 text-left">

              <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#143522] font-normal">

                We don't start treatment immediately. We first identify the root
                cause through a structured{" "}

                <span className="font-semibold">
                  Neuro-Development Assessment.
                </span>

              </p>

            </div>

            {/* WATCH VIDEO BUTTON */}
            <div className="mt-7 flex justify-center lg:justify-start">

              <a
                href="#video"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#062f1c] px-8 sm:px-10 py-4 sm:py-5 text-white shadow-[0_18px_50px_rgba(6,47,28,0.22)] transition-all duration-300 hover:scale-[1.03]"
              >

                {/* Play Button */}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a22e]/40 bg-[#fffaf2] shadow-sm animate-[bounce_2s_infinite]">

                  {/* Pulse */}
                  <span className="absolute inset-0 rounded-full border border-[#d6a22e]/40 animate-ping"></span>

                  <span className="ml-[2px] text-[15px] text-[#d6a22e]">
                    ▶
                  </span>

                </span>

                {/* Text */}
                <div className="flex items-center gap-2">

                  <div className="animate-[bounce_2s_infinite]">

                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#d6a22e] font-semibold">
                      Watch Now
                    </p>

                    <p className="text-[17px] sm:text-[18px] font-semibold leading-none mt-1">
                      Watch Assessment Video
                    </p>

                  </div>

                  {/* Arrow */}
                  <span className="text-[#d6a22e] text-[20px] animate-[bounce_2s_infinite]">
                    →
                  </span>

                </div>

              </a>

            </div>

            {/* REVIEW CARDS */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[530px] mx-auto lg:mx-0">

              {/* GOOGLE CARD */}
              <div className="bg-white border border-[#e7dfd0] rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">

                <div className="text-left">

                  <div className="flex items-center gap-1.5">

                    <p className="text-[20px] font-semibold text-[#0b2f1d]">
                      4.9
                    </p>

                    <div className="flex items-center gap-[1px] text-[#d6a22e]">

                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />

                    </div>

                  </div>

                  <p className="text-[9px] text-[#6b756c] mt-1">
                    Based on 2,300+ reviews
                  </p>

                </div>

              </div>

              {/* BOOKINGS CARD - Enhanced with real-time feel */}
              <div className="bg-[#062f1c] rounded-xl px-4 py-3 shadow-[0_20px_40px_rgba(6,47,28,0.15)] flex items-center gap-3 overflow-hidden">

                <Users
                  size={20}
                  className="text-[#d6a22e] flex-shrink-0 animate-pulse"
                />

                <div className="text-left min-w-0">

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    <p
                      key={sessionCount}
                      className="text-white text-[13px] font-semibold animate-[slideUp_0.5s_ease]"
                    >
                      🟡 {formattedSessionCount} sessions booked today
                    </p>
                  </div>

                  {/* AUTO CHANGING TEXT - Real booking notifications */}
                  <div className="relative h-[16px] overflow-hidden mt-1.5">

                    <p
                      key={activeBooking}
                      className="text-[#d6a22e]/80 text-[10px] absolute left-0 top-0 animate-[slideUp_0.5s_ease] font-medium"
                    >
                      ✨ {bookings[activeBooking].name} from{" "}
                      {bookings[activeBooking].city} just booked an assessment
                    </p>

                  </div>

                  {/* Live indicator */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[6px] text-green-400 animate-pulse">●</span>
                    <span className="text-[7px] text-white/50">Live booking feed</span>
                  </div>

                </div>

              </div>

            </div>

            {/* FEATURES */}
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-4 text-[14px] text-[#5f6e62]">

              <span className="inline-flex items-center gap-1.5 hover:text-[#d6a22e] transition-colors duration-200">
                <ShieldCheck size={12} />
                Structured System
              </span>

              <span className="inline-flex items-center gap-1.5 hover:text-[#d6a22e] transition-colors duration-200">
                <Target size={12} />
                Root Cause Clarity
              </span>

              <span className="inline-flex items-center gap-1.5 hover:text-[#d6a22e] transition-colors duration-200">
                <CalendarDays size={12} />
                180-Day Plan
              </span>

            </div>

            {/* Real-time greeting message */}
            <div className="mt-4 text-[10px] text-[#6b756c] italic">
              {getGreeting()} • Real-time booking updates
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">

            <div className="relative w-full max-w-[340px] sm:max-w-[390px]">

              {/* BORDER TOP */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l border-t border-[#d6a22e] rounded-tl-xl"></div>

              {/* BORDER BOTTOM */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r border-b border-[#d6a22e] rounded-br-xl"></div>

              {/* IMAGE */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(9,33,22,0.15)] group">

                <img
                  src={doctorImg}
                  alt="Brain Gut Behaviour Specialist"
                  className="w-full h-[400px] sm:h-[500px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#062f1c]/95 via-[#062f1c]/65 to-transparent px-4 py-5 text-left">

                  <p className="font-serif text-white text-[18px] sm:text-[20px] font-normal">
                    Brain–Gut–Behaviour Specialist
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Add animation keyframes to your global CSS or add here */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease;
        }
      `}</style>

    </section>
  );
}