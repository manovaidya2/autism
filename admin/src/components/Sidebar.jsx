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
        { label: "Blogs & Articles", path: "/teenage dashboard", icon: <FaClipboardList /> },
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
      {/* Decorative Background Elements - Removed animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      {/* Logo Section - Removed glow effect */}
      <div className="relative px-6 pt-8 pb-6 border-b border-white/10">
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={logo}
              alt="Manovaidya Logo"
              className="relative w-44 h-auto object-contain"
            />
          </div>
        </div>
        <p className="text-center text-blue-200 text-xs mt-3 font-medium tracking-wide">
          Mental Wellness Platform
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4">
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.type === "link" ? (
                <Link
                  to={item.path}
                  className={`
                    group relative flex items-center gap-3 px-4 py-3 rounded-xl
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
                  
                  {/* Icon */}
                  <span className={`
                    text-xl
                    ${item.iconColor || (isActive(item.path) ? "text-white" : "text-gray-400")}
                  `}>
                    {item.icon}
                  </span>
                  
                  <span className="flex-1 font-medium text-sm tracking-wide">{item.label}</span>
                  
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full">
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
                      w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl
                      ${openMenu === item.id 
                        ? "bg-white/15 text-white shadow-lg" 
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${item.iconColor || "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm tracking-wide">{item.label}</span>
                    </div>
                    <span className={`${openMenu === item.id ? "rotate-180" : ""}`}>
                      <FaChevronDown className="text-xs" />
                    </span>
                  </button>

                  {/* Submenu */}
                  <div
                    className={`
                      ${openMenu === item.id ? "block" : "hidden"}
                    `}
                  >
                    <div className="ml-11 space-y-1 relative mt-2">
                      {/* Vertical Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-400 opacity-30"></div>
                      
                      {item.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className={`
                            flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
                            ${isActive(sub.path)
                              ? "bg-blue-600/50 text-white"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          <span className="text-xs">{sub.icon}</span>
                          <span className="font-medium">{sub.label}</span>
                          {isActive(sub.path) && (
                            <span className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full"></span>
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

      {/* Footer Section - Empty as in original */}
    </div>
  );
};

export default Sidebar;