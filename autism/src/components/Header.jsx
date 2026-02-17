import React from "react";
import { Phone } from "lucide-react";
import logo from "../images/manovaidya-logo (1).png";
import { Link, useLocation, useNavigate } from "react-router-dom";



const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
       <div className="flex items-center gap-3">
  <div className="h-10 w-40 rounded-full overflow-hidden bg-white flex items-center justify-center">
    <img
      src={logo}
      alt="Manovaidya Logo"
      className="h-full w-full object-contain"
    />
  </div>

  <div>
   
   
  </div>
</div>


        {/* Navigation */}
       <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
  <Link to="/#program" className="hover:text-green-700">Program</Link>
  <Link to="/#how-it-works" className="hover:text-green-700">How it Works</Link>
  <Link to="/#testimonials" className="hover:text-green-700">Results</Link>
  <Link to="/#faq" className="hover:text-green-700">FAQs</Link>
  <Link to="/blog" className="hover:text-green-700">Blog</Link>
</nav>


        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
            <Phone size={16} />
            <span>+91 99999 99999</span>
          </div>

          <button className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition">
            Book Consultation
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
