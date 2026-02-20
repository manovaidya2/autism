import React from "react";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function CTAFooterSection() {
  return (
    <>
      {/* CTA SECTION */}
      <section className="bg-[#6B3FB6] text-white py-10 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold">
          Ready to Begin Your Journey?
        </h2>

        <p className="mt-4 text-base text-white/90 max-w-xl mx-auto">
          Take the first step toward lasting mental wellness. Our care guides are
          ready to help.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center gap-2 bg-[#EAF6EF] text-[#1F7A55] px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
            <Calendar size={16} />
            Book Consultation
          </button>

          <button className="flex items-center justify-center gap-2 border border-white/40 px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition">
            <Phone size={16} />
            Call Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FBFAF7] px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 bg-[#2F7A5F] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                M
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Manovaidya
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Holistic mental wellness care combining modern psychology with
              traditional Ayurvedic wisdom.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Care Programs
            </h4>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>Autism & ADHD Care</li>
              <li>Teen Mental Wellness</li>
              <li>Adult Stress Care</li>
              <li>Senior Mind Care</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone size={14} /> +91 99999 99999
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> care@manovaidya.in
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} /> Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Legal
            </h4>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-[#EEF4F0] text-gray-700 px-5 py-3 rounded-lg text-xs leading-relaxed">
            <strong>Important:</strong> Manovaidya programs are not a replacement
            for emergency care. If you or someone you know is experiencing severe
            symptoms or a crisis, please seek urgent medical help immediately.
          </div>

          <div className="mt-6 border-t border-gray-200" />
        </div>
      </footer>
    </>
  );
}
