import React from "react";
import { Calendar, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../images/manovaidya-logo (1).png";

export default function CTAFooterSection() {
  return (
    <>
      <footer className="bg-[#FBFAF7] px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand with Logo */}
          <div>
            <div className="mb-3">
              <Link to="/">
                <img
                  src={logo}
                  alt="Manovaidya Logo"
                  className="h-12 w-auto object-contain hover:scale-105 transition"
                />
              </Link>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Holistic mental wellness care combining modern psychology with
              traditional Ayurvedic wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-[#4f7cff]">Home</Link></li>
              <li><Link to="/#challenges" className="hover:text-[#4f7cff]">Challenges</Link></li>
              <li><Link to="/#science" className="hover:text-[#4f7cff]">Science</Link></li>
              <li><Link to="/#OurSystem" className="hover:text-[#4f7cff]">Our System</Link></li>
              <li><Link to="/#result" className="hover:text-[#4f7cff]">Results</Link></li>
              <li><Link to="/#conditions" className="hover:text-[#4f7cff]">Conditions</Link></li>
              <li><Link to="/blog" className="hover:text-[#4f7cff]">Blog</Link></li>
              <li><Link to="/#faq" className="hover:text-[#4f7cff]">FAQ</Link></li>
            </ul>
          </div>

          {/* Care Programs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Care Programs
            </h4>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li><Link to="/#conditions" className="hover:text-[#4f7cff]">Autism & ADHD Care</Link></li>
              <li><Link to="/#conditions" className="hover:text-[#4f7cff]">Teen Mental Wellness</Link></li>
              <li><Link to="/#conditions" className="hover:text-[#4f7cff]">Adult Stress Care</Link></li>
              <li><Link to="/#conditions" className="hover:text-[#4f7cff]">Senior Mind Care</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+919999999999" className="hover:text-[#4f7cff]">
                  +91 99999 99999
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:care@manovaidya.in" className="hover:text-[#4f7cff]">
                  care@manovaidya.in
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Mumbai, Maharashtra, India</span>
              </li>

            </ul>
          </div>
        </div>

        {/* CTA Button */}
        

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-[#EEF4F0] text-gray-700 px-5 py-3 rounded-lg text-xs leading-relaxed">
            <strong>Important:</strong> Manovaidya programs are not a replacement
            for emergency care. If you or someone you know is experiencing severe
            symptoms or a crisis, please seek urgent medical help immediately.
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Manovaidya. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}