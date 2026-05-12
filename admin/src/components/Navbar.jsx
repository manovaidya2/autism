// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaSignOutAlt, FaBell, FaTimes, FaEye, FaCheck, FaTrash, FaCheckDouble } from "react-icons/fa";
import Sidebar from "./Sidebar";
import logo from "../assets/manovaidya-logo (1).png";
import axiosInstance from "../api/axiosInstance";

// Icon Components
const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Globe = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  // Helper function to safely extract array from response
  const safeExtractArray = (response, defaultValue = []) => {
    if (!response) return defaultValue;
    if (Array.isArray(response)) return response;
    if (response.data && Array.isArray(response.data)) return response.data;
    if (response.data && response.data.data && Array.isArray(response.data.data)) return response.data.data;
    if (response.data && typeof response.data === 'object' && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return defaultValue;
  };

  // Fetch contacts and create notifications
  const fetchContactsAndCreateNotifications = async () => {
    try {
      const [contactsRes, adultContactsRes, teenageContactsRes] = await Promise.allSettled([
        axiosInstance.get("/autism/contact/all"),
        axiosInstance.get("/adult-contact/all"),
        axiosInstance.get("/teenage/contacts")
      ]);

      let allContacts = [];

      // Process Autism Contacts
      if (contactsRes.status === "fulfilled") {
        let contactsData = [];
        if (Array.isArray(contactsRes.value)) {
          contactsData = contactsRes.value;
        } else if (contactsRes.value && Array.isArray(contactsRes.value.data)) {
          contactsData = contactsRes.value.data;
        } else if (contactsRes.value && contactsRes.value.data && Array.isArray(contactsRes.value.data.data)) {
          contactsData = contactsRes.value.data.data;
        }
        allContacts.push(...contactsData.map(c => ({ ...c, type: 'Autism' })));
      }

      // Process Adult Contacts
      if (adultContactsRes.status === "fulfilled") {
        let adultContactsData = [];
        if (Array.isArray(adultContactsRes.value)) {
          adultContactsData = adultContactsRes.value;
        } else if (adultContactsRes.value && Array.isArray(adultContactsRes.value.data)) {
          adultContactsData = adultContactsRes.value.data;
        } else if (adultContactsRes.value && adultContactsRes.value.data && Array.isArray(adultContactsRes.value.data.data)) {
          adultContactsData = adultContactsRes.value.data.data;
        }
        allContacts.push(...adultContactsData.map(c => ({ ...c, type: 'Adult' })));
      }

      // Process Teenage Contacts
      if (teenageContactsRes.status === "fulfilled") {
        let teenageContactsData = [];
        if (Array.isArray(teenageContactsRes.value)) {
          teenageContactsData = teenageContactsRes.value;
        } else if (teenageContactsRes.value && Array.isArray(teenageContactsRes.value.data)) {
          teenageContactsData = teenageContactsRes.value.data;
        } else if (teenageContactsRes.value && teenageContactsRes.value.data && Array.isArray(teenageContactsRes.value.data.data)) {
          teenageContactsData = teenageContactsRes.value.data.data;
        }
        allContacts.push(...teenageContactsData.map(c => ({ ...c, type: 'Teenage' })));
      }

      // Get existing notification IDs from localStorage
      const savedNotifications = localStorage.getItem("dashboardNotifications");
      const existingIds = savedNotifications ? new Set(JSON.parse(savedNotifications).map(n => n.originalId)) : new Set();

      // Create new notifications for contacts not already notified
      const newNotifications = [];
      allContacts.forEach(contact => {
        const contactId = contact._id || contact.id;
        if (!existingIds.has(contactId) && contact.createdAt) {
          const createdDate = new Date(contact.createdAt);
          const now = new Date();
          const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);
          
          // Only create notification for contacts created in last 7 days
          if (daysDiff <= 7) {
            newNotifications.push({
              id: Date.now() + Math.random(),
              originalId: contactId,
              type: contact.type,
              title: `New ${contact.type} Enquiry`,
              message: `${contact.fullName || contact.name} submitted a new enquiry`,
              details: {
                name: contact.fullName || contact.name,
                email: contact.email,
                phone: contact.phone,
                message: contact.message,
                date: new Date(contact.createdAt).toLocaleString()
              },
              read: false,
              timestamp: contact.createdAt,
              isNew: true
            });
          }
        }
      });

      // Merge existing and new notifications
      if (newNotifications.length > 0) {
        setNotifications(prev => {
          const existing = savedNotifications ? JSON.parse(savedNotifications) : [];
          const updated = [...newNotifications, ...existing];
          // Keep only last 50 notifications
          const trimmed = updated.slice(0, 50);
          localStorage.setItem("dashboardNotifications", JSON.stringify(trimmed));
          return trimmed;
        });
        setUnreadCount(prev => prev + newNotifications.filter(n => !n.read).length);
      } else if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Load notifications from localStorage on mount
  useEffect(() => {
    loadNotifications();
    fetchContactsAndCreateNotifications();

    // Listen for new enquiry events from dashboard
    const handleNewEnquiry = (event) => {
      const { type, name, contact } = event.detail;
      
      const newNotification = {
        id: Date.now(),
        originalId: contact._id || Date.now(),
        type: type,
        title: `New ${type} Enquiry`,
        message: `${name} submitted a new enquiry`,
        details: {
          name: contact.fullName || contact.name,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
          date: new Date().toLocaleString()
        },
        read: false,
        timestamp: new Date().toISOString(),
        isNew: true
      };
      
      setNotifications(prev => {
        // Check if notification already exists
        const exists = prev.some(n => n.originalId === newNotification.originalId);
        if (exists) return prev;
        
        const updated = [newNotification, ...prev].slice(0, 50);
        saveNotifications(updated);
        return updated;
      });
      setUnreadCount(prev => prev + 1);
      
      // Show browser notification if permitted
      if (Notification.permission === "granted") {
        new Notification(`New ${type} Enquiry`, {
          body: `${name} submitted a new enquiry`,
          icon: "/favicon.ico"
        });
      }
    };

    // Refresh notifications periodically (every 30 seconds)
    const intervalId = setInterval(() => {
      fetchContactsAndCreateNotifications();
    }, 30000);

    window.addEventListener('newEnquiry', handleNewEnquiry);
    
    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    
    // Click outside handler
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('newEnquiry', handleNewEnquiry);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(intervalId);
    };
  }, []);

  // Save notifications to localStorage
  const saveNotifications = (notifs) => {
    localStorage.setItem("dashboardNotifications", JSON.stringify(notifs));
  };

  // Load notifications from localStorage
  const loadNotifications = () => {
    const savedNotifications = localStorage.getItem("dashboardNotifications");
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    }
  };

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, read: true, isNew: false } : n
      );
      saveNotifications(updated);
      return updated;
    });
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true, isNew: false }));
      saveNotifications(updated);
      return updated;
    });
    setUnreadCount(0);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem("dashboardNotifications");
    setShowNotifications(false);
  };

  // Clear only read notifications
  const clearReadNotifications = () => {
    setNotifications(prev => {
      const updated = prev.filter(n => !n.read);
      saveNotifications(updated);
      return updated;
    });
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'Autism':
        return <Shield className="w-4 h-4 text-indigo-500" />;
      case 'Adult':
        return <Globe className="w-4 h-4 text-green-500" />;
      case 'Teenage':
        return <Heart className="w-4 h-4 text-pink-500" />;
      default:
        return <FaBell className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get notification background color
  const getNotificationBg = (notification) => {
    if (!notification.read) return 'bg-blue-50 hover:bg-blue-100';
    if (notification.isNew) return 'bg-yellow-50 hover:bg-yellow-100';
    return 'bg-white hover:bg-gray-50';
  };

  // Format time ago
  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    return 'Just now';
  };

  return (
    <>
      {/* Top Navbar (Sticky) */}
      <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 md:p-6 text-white flex justify-between items-center md:ml-64 fixed top-0 left-0 right-0 z-40 shadow-lg">
        
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-2xl hover:text-blue-200 transition"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <FaBars />
          </button>
          <img
            src={logo}
            alt="Autism Care Dashboard"
            className="w-40 h-10 object-contain"
          />
        </div>

        {/* Right: Notifications + Profile + Logout */}
        <div className="flex items-center gap-4 text-sm md:text-base">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-blue-800 rounded-full transition transform hover:scale-105"
              type="button"
            >
              <FaBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl z-50 max-h-[500px] overflow-hidden animate-slideDown">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {notifications.length > 0 && (
                        <>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-lg transition flex items-center gap-1"
                              type="button"
                            >
                              <FaCheckDouble className="w-3 h-3" />
                              Read all
                            </button>
                          )}
                          <button
                            onClick={clearReadNotifications}
                            className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-lg transition flex items-center gap-1"
                            type="button"
                          >
                            <FaTrash className="w-3 h-3" />
                            Clear read
                          </button>
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded-lg transition flex items-center gap-1"
                            type="button"
                          >
                            <FaTrash className="w-3 h-3" />
                            Clear all
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Notifications List */}
                <div className="overflow-y-auto max-h-[400px]">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaBell className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">No notifications</p>
                      <p className="text-xs text-gray-400 mt-1">New enquiries will appear here</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${getNotificationBg(notification)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-semibold text-gray-800 text-sm truncate">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                              )}
                            </div>
                            
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            
                            {/* Details */}
                            <div className="mt-2 text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded-lg">
                              <p className="truncate"><strong>Name:</strong> {notification.details?.name || 'N/A'}</p>
                              <p className="truncate"><strong>Email:</strong> {notification.details?.email || 'N/A'}</p>
                              <p><strong>Phone:</strong> {notification.details?.phone || 'N/A'}</p>
                              {notification.details?.message && (
                                <p className="text-gray-500 line-clamp-2">
                                  <strong>Msg:</strong> {notification.details.message}
                                </p>
                              )}
                            </div>
                            
                            {/* Timestamp and actions */}
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-400">
                                {timeAgo(notification.timestamp)}
                              </p>
                              {!notification.read && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                  type="button"
                                >
                                  <FaCheck className="w-3 h-3" />
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="sticky bottom-0 bg-gray-50 p-2 border-t border-gray-200 text-center">
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      type="button"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-blue-200 transition" type="button">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AD</span>
              </div>
              <span className="hidden md:inline">Admin</span>
            </button>
            
            {/* Profile Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">Profile Settings</a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">Account Settings</a>
                <hr className="my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2" type="button">
                  <FaSignOutAlt className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Sidebar (Mobile Overlay) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsSidebarOpen(false);
              }
            }}
          />
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Navbar;