import React from "react";
import { Calendar, MessageCircle, ShieldCheck, User, HeartHandshake } from "lucide-react";
import { Brain } from "lucide-react";


const Hero = () => {
  return (
   <section id="program" className="bg-[#fbfdfb]">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">

       
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-purple-600 rounded-2xl flex items-center justify-center">
  <Brain className="text-white w-7 h-7" />
</div>

        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
          A Structured Support System for <br />
          Autism & ADHD
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Guided care for behavior, focus, learning, sleep, and development—built
          around your child.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center gap-2 bg-green-700 text-white px-7 py-3 rounded-full font-medium hover:bg-green-800 transition">
            <Calendar size={18} />
            Book Consultation
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-300 px-7 py-3 rounded-full font-medium text-gray-800 hover:bg-gray-100 transition">
            <MessageCircle size={18} />
            WhatsApp Guidance
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 bg-green-50 rounded-xl py-4 px-6 flex flex-wrap justify-center gap-8 text-sm text-green-900">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            Clinically Guided
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            Personalized Plan
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake size={16} />
            Follow-up Support
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
