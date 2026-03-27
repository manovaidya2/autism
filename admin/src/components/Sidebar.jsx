import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/manovaidya-logo (1).png";
import {
  FaTachometerAlt,
  FaChild,
  FaUserMd,
  FaClipboardList,
  FaImages,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaBrain,
  FaHeartbeat,
  FaRegCalendarAlt,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";
import { MdPsychology, MdHealthAndSafety } from "react-icons/md";
import { GiBrain, GiHeartPlus } from "react-icons/gi";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      id: "dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      path: "/dashboard",
      type: "link",
    },
    {
      id: "autism",
      icon: <FaChild />,
      label: "Autism Care",
      iconColor: "text-pink-400",
      submenu: [
        { label: "Blogs", path: "/Admin-blogs", icon: <FaClipboardList /> },
        { label: "Contact Us", path: "/Admin-Autism", icon: <MdPsychology /> },
        { label: "Therapies", path: "/admin-autism-therapies", icon: <FaHeartbeat /> },
      ],
      type: "dropdown",
    },
    {
      id: "teenage",
      icon: <FaUserMd />,
      label: "Teen Wellness",
      iconColor: "text-green-400",
      submenu: [
        { label: "Blogs & Articles", path: "/Admin-Teenage", icon: <FaClipboardList /> },
        { label: "Counseling", path: "/admin-teen-counseling", icon: <FaUserGraduate /> },
        { label: "Workshops", path: "/admin-teen-workshops", icon: <FaRegCalendarAlt /> },
      ],
      type: "dropdown",
    },
    {
      id: "adult",
      icon: <FaUsers />,
      label: "Adult Mental Health",
      iconColor: "text-purple-400",
      submenu: [
        { label: "Blogs", path: "/Admin-Adult", icon: <FaClipboardList /> },
        { label: "Self-Help", path: "/admin-adult-selfhelp", icon: <GiHeartPlus /> },
        { label: "Support Groups", path: "/admin-adult-support", icon: <FaUsers /> },
      ],
      type: "dropdown",
    },
    {
      id: "assessments",
      icon: <FaClipboardList />,
      label: "Assessments",
      path: "/assessments",
      type: "link",
      badge: "New",
      iconColor: "text-yellow-400",
    },
    {
      id: "gallery",
      icon: <FaImages />,
      label: "Activity Gallery",
      path: "/gallery",
      type: "link",
      iconColor: "text-orange-400",
    },
    {
      id: "analytics",
      icon: <FaChartLine />,
      label: "Analytics",
      path: "/analytics",
      type: "link",
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <div className="relative w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white h-screen flex flex-col shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      {/* Logo Section with Glow Effect */}
      <div className="relative px-6 pt-8 pb-6 border-b border-white/10">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
            <img
              src={logo}
              alt="Manovaidya Logo"
              className="relative w-44 h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        <p className="text-center text-blue-200 text-xs mt-3 font-medium tracking-wide">
          Mental Wellness Platform
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.type === "link" ? (
                <Link
                  to={item.path}
                  className={`
                    group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive(item.path) 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 text-white" 
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-r-full"></div>
                  )}
                  
                  {/* Icon with Animation */}
                  <span className={`
                    text-xl transition-transform duration-300 group-hover:scale-110
                    ${item.iconColor || (isActive(item.path) ? "text-white" : "text-gray-400")}
                  `}>
                    {item.icon}
                  </span>
                  
                  <span className="flex-1 font-medium text-sm tracking-wide">{item.label}</span>
                  
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <>
                  {/* Dropdown Trigger */}
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`
                      w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${openMenu === item.id 
                        ? "bg-white/15 text-white shadow-lg" 
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xl transition-transform duration-300 ${item.iconColor || "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm tracking-wide">{item.label}</span>
                    </div>
                    <span className={`transition-all duration-300 ${openMenu === item.id ? "rotate-180" : ""}`}>
                      <FaChevronDown className="text-xs" />
                    </span>
                  </button>

                  {/* Submenu with Animation */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${openMenu === item.id ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="ml-11 space-y-1 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-400 opacity-30"></div>
                      
                      {item.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className={`
                            flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 text-sm
                            ${isActive(sub.path)
                              ? "bg-blue-600/50 text-white"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          <span className="text-xs">{sub.icon}</span>
                          <span className="font-medium">{sub.label}</span>
                          {isActive(sub.path) && (
                            <span className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="relative p-4 border-t border-white/10 mt-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaHeartbeat className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-300">Need Support?</p>
              <p className="text-xs text-blue-300">24/7 Helpline Available</p>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
            Contact Support
          </button>
        </div>
        
        {/* Version Info */}
        <div className="text-center mt-4">
          <p className="text-[10px] text-gray-500 tracking-wide">v2.0.0 | © 2026 Manovaidya</p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;