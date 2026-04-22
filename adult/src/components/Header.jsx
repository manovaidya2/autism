import React, { useState, useEffect } from "react";
import logo from "../images/manovaidya-logo (1).png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Zap, 
  FlaskConical, 
  Settings, 
  BarChart3, 
  Pill, 
  BookOpen, 
  HelpCircle,
  Menu,
  X,
  ArrowRight,
  Calendar,
  MessageCircle,
  Mail,
  Share2
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

const handleScroll = (id) => {
  setIsMenuOpen(false);
  setActiveItem(id);

  if (window.location.pathname !== "/") {
    // Navigate to home first
    navigate("/", { replace: false });
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Delay to wait for Home to render
  } else {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  setTimeout(() => setActiveItem(null), 500);
};

 const handleBookConsultation = () => {
    navigate("/contact"); // <-- yahan contact page ka route
  };

  // Menu items with React icons and gradients for mobile only
  const menuItems = [
    { id: "home", label: "Home", icon: Home, gradient: "from-blue-500 to-cyan-500", bgGradient: "from-blue-50 to-cyan-50" },
    { id: "challenges", label: "Challenges", icon: Zap, gradient: "from-orange-500 to-red-500", bgGradient: "from-orange-50 to-red-50" },
    { id: "science", label: "Science", icon: FlaskConical, gradient: "from-purple-500 to-pink-500", bgGradient: "from-purple-50 to-pink-50" },
    { id: "OurSystem", label: "Our System", icon: Settings, gradient: "from-green-500 to-emerald-500", bgGradient: "from-green-50 to-emerald-50" },
    { id: "result", label: "Results", icon: BarChart3, gradient: "from-indigo-500 to-blue-500", bgGradient: "from-indigo-50 to-blue-50" },
    { id: "conditions", label: "Conditions", icon: Pill, gradient: "from-teal-500 to-cyan-500", bgGradient: "from-teal-50 to-cyan-50" },
    { id: "blog", label: "Blog", icon: BookOpen, gradient: "from-rose-500 to-pink-500", bgGradient: "from-rose-50 to-pink-50", isLink: true, path: "/blog" },
    { id: "faq", label: "FAQ", icon: HelpCircle, gradient: "from-violet-500 to-purple-500", bgGradient: "from-violet-50 to-purple-50" },
  ];

  const getItemDescription = (id) => {
    const descriptions = {
      home: "Welcome to Manovaidya",
      challenges: "Overcome health obstacles",
      science: "Evidence-based approach",
      OurSystem: "Our unique methodology",
      result: "Success stories & data",
      conditions: "Treatable conditions",
      blog: "Latest insights & tips",
      faq: "Common questions answered"
    };
    return descriptions[id] || "Learn more";
  };

  return (
    <>
      <header
        className={`w-full bg-[#f7f9fc] border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? "shadow-lg py-2" : "py-4"
        } fixed top-0 left-0 right-0 z-50`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo - Keep original */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src={logo}
                alt="Manovaidya Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Keep EXACTLY as original */}
          <nav className="hidden md:flex items-center gap-6 text-[16px] text-[#6b7280] font-medium">
            <button onClick={() => handleScroll("home")} className="hover:text-[#4f7cff] transition-colors">
              Home
            </button>
            <button onClick={() => handleScroll("challenges")} className="hover:text-[#4f7cff] transition-colors">
              Challenges
            </button>
            <button onClick={() => handleScroll("science")} className="hover:text-[#4f7cff] transition-colors">
              Science
            </button>
            <button onClick={() => handleScroll("OurSystem")} className="hover:text-[#4f7cff] transition-colors">
              Our System
            </button>
            <button onClick={() => handleScroll("result")} className="hover:text-[#4f7cff] transition-colors">
              Results
            </button>
            <button onClick={() => handleScroll("conditions")} className="hover:text-[#4f7cff] transition-colors">
              Conditions
            </button>
            <Link to="/blog" className="hover:text-[#4f7cff] transition-colors">
              Blog
            </Link>
            <button onClick={() => handleScroll("faq")} className="hover:text-[#4f7cff] transition-colors">
              FAQ
            </button>
          </nav>

          {/* Desktop CTA - Keep original */}
          <div className="hidden md:block">
            <button
              onClick={handleBookConsultation}
              className="bg-gradient-to-r from-[#7aa2ff] to-[#5b8cff] text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
            >
              📅 Book Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black-600" />
            ) : (
              <Menu className="w-8 h-8 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-500 animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar - Enhanced Professional Design */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-gradient-to-br from-gray-50 via-white to-gray-50 shadow-2xl z-50 transform transition-all duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header with Gradient */}
          <div className="relative bg-gray-200  p-6 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="   rounded-2xl">
                  <img src={logo} alt="Logo" className="h-8 w-auto  i" />
                </div>
               
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links with Professional Design */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                
                return item.isLink ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                      isActive ? 'scale-[1.02]' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`}></div>
                    <div className="relative flex items-center gap-4 px-5 py-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-semibold group-hover:text-white transition-colors duration-300">
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                          {getItemDescription(item.id)}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ${isActive ? 'translate-x-1 text-white' : ''}`} />
                    </div>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                      isActive ? 'scale-[1.02]' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`}></div>
                    <div className="relative flex items-center gap-4 px-5 py-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-gray-800 font-semibold group-hover:text-white transition-colors duration-300">
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                          {getItemDescription(item.id)}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ${isActive ? 'translate-x-1 text-white' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Decorative Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-br from-gray-50 to-white px-4 py-1 rounded-full text-xs font-medium text-gray-500 shadow-sm">
                  Connect With Us
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <button className="group relative p-3 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MessageCircle className="relative w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </button>
              <button className="group relative p-3 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Mail className="relative w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </button>
              <button className="group relative p-3 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Share2 className="relative w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </nav>

          {/* Mobile CTA */}
          <div className="p-5 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
            <button
              onClick={handleBookConsultation}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5b8cff] to-[#7aa2ff] text-white px-6 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Limited slots available • Free 30-min session
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;