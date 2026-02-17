import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/manovaidya-logo (1).png";
import {
  FaTachometerAlt,
  FaChild,
  FaUserMd,
  FaClipboardList,
  FaImages,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-full p-4 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img
          src={logo}
          alt="Autism Care Logo"
          className="w-40 h-12 object-contain"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {/* Dashboard */}
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          {/* Children */}
          <li className="mb-2">
            <Link
              to="/Admin-Blog"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaChild /> Blogs
            </Link>
          </li>

          {/* Therapists */}
          <li className="mb-2">
            <Link
              to="/therapists"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaUserMd /> Therapists
            </Link>
          </li>

          {/* Sessions */}
          <li className="mb-2">
            <Link
              to="/sessions"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaUsers /> Therapy Sessions
            </Link>
          </li>

          {/* Assessments */}
          <li className="mb-2">
            <Link
              to="/assessments"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaClipboardList /> Assessments
            </Link>
          </li>

          {/* Gallery */}
          <li className="mb-2">
            <Link
              to="/gallery"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaImages /> Activity Gallery
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
