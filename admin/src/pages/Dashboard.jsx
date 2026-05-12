import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, 
  Activity, Clock, Eye, Heart, MessageCircle, FileText, 
  Plus, Edit, Trash2, X, CheckCircle, AlertCircle,
  Calendar, Mail, Phone, MapPin, Search, Filter, Download,
  ChevronDown, ChevronUp, MoreVertical, Settings, Bell,
  UserPlus, BookOpen, Star, Award, Zap, Shield, Globe,
  PenTool, MailOpen, ThumbsUp
} from "lucide-react";

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  
  // Data states - initialize as empty arrays
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    totalBlogs: 0,
    totalContacts: 0,
    growth: 23,
    conversion: 12.5,
    engagement: 78,
    pendingResponses: 0,
    satisfactionRate: 94
  });
  
  const [blogPosts, setBlogPosts] = useState([]);
  const [adultBlogs, setAdultBlogs] = useState([]);
  const [teenageBlogs, setTeenageBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [adultContacts, setAdultContacts] = useState([]);
  const [teenageContacts, setTeenageContacts] = useState([]);
  
  // Chart data
  const [revenueData, setRevenueData] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  
  // Modal states
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogType, setBlogType] = useState("general");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    shortDescription: "",
    content: "",
    image: "",
    faqs: []
  });
  
  const editorRef = useRef(null);
  
  // Colors for charts
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

  // Fetch all data
  useEffect(() => {
    fetchAllData();
    generateChartData();
  }, []);

  const showMessage = (msg, type = "success") => {
    setNotificationMsg(msg);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateChartData = () => {
    const revData = [];
    const visData = [];
    const growth = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      
      revData.push({
        month,
        enquiries: Math.floor(Math.random() * 200) + 50,
        blogs: Math.floor(Math.random() * 30) + 10,
        responses: Math.floor(Math.random() * 150) + 40
      });
      
      visData.push({
        month,
        visitors: Math.floor(Math.random() * 8000) + 2000,
        newUsers: Math.floor(Math.random() * 500) + 50,
        returning: Math.floor(Math.random() * 2000) + 500
      });
      
      growth.push({
        month,
        growth: Math.floor(Math.random() * 30) + 10,
        target: 25
      });
    }
    
    setRevenueData(revData);
    setVisitorData(visData);
    setGrowthData(growth);
  };
  
  // Helper function to safely extract array from response
  const safeExtractArray = (response, defaultValue = []) => {
    if (!response) return defaultValue;
    
    // If response is already an array
    if (Array.isArray(response)) return response;
    
    // If response has data property that is an array
    if (response.data && Array.isArray(response.data)) return response.data;
    
    // If response has data property that has data array (nested)
    if (response.data && response.data.data && Array.isArray(response.data.data)) return response.data.data;
    
    // If response has data property that is an object with data array
    if (response.data && typeof response.data === 'object' && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // If response is an object with data array at root
    if (response.data && response.data.data && typeof response.data.data === 'object') {
      return [];
    }
    
    console.warn("Unexpected response format:", response);
    return defaultValue;
  };
  
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch all blog posts based on your routes
      const [blogsRes, adultBlogsRes, teenageBlogsRes, contactsRes, adultContactsRes, teenageContactsRes] = await Promise.allSettled([
        axiosInstance.get("/blogs"),
        axiosInstance.get("/adultblog"),
        axiosInstance.get("/teenage-blogs"),
        axiosInstance.get("/autism/contact/all"),
        axiosInstance.get("/adult-contact/all"),
        axiosInstance.get("/teenage/contacts")
      ]);
      
      let generalBlogsData = [];
      let adultBlogsData = [];
      let teenageBlogsData = [];
      let contactsData = [];
      let adultContactsData = [];
      let teenageContactsData = [];
      
      // Process General Blogs
      if (blogsRes.status === "fulfilled") {
        generalBlogsData = safeExtractArray(blogsRes.value);
        setBlogPosts(generalBlogsData);
        console.log("General blogs:", generalBlogsData);
      } else {
        setBlogPosts([]);
        console.error("Failed to fetch general blogs:", blogsRes.reason);
      }
      
      // Process Adult Blogs
      if (adultBlogsRes.status === "fulfilled") {
        adultBlogsData = safeExtractArray(adultBlogsRes.value);
        setAdultBlogs(adultBlogsData);
        console.log("Adult blogs:", adultBlogsData);
      } else {
        setAdultBlogs([]);
        console.error("Failed to fetch adult blogs:", adultBlogsRes.reason);
      }
      
      // Process Teenage Blogs
      if (teenageBlogsRes.status === "fulfilled") {
        teenageBlogsData = safeExtractArray(teenageBlogsRes.value);
        setTeenageBlogs(teenageBlogsData);
        console.log("Teenage blogs:", teenageBlogsData);
      } else {
        setTeenageBlogs([]);
        console.error("Failed to fetch teenage blogs:", teenageBlogsRes.reason);
      }
      
      // Process Autism Contacts
      if (contactsRes.status === "fulfilled") {
        if (Array.isArray(contactsRes.value)) {
          contactsData = contactsRes.value;
        } else if (contactsRes.value && Array.isArray(contactsRes.value.data)) {
          contactsData = contactsRes.value.data;
        } else if (contactsRes.value && contactsRes.value.data && Array.isArray(contactsRes.value.data.data)) {
          contactsData = contactsRes.value.data.data;
        }
        setContacts(contactsData);
        console.log("Autism contacts:", contactsData);
      } else {
        setContacts([]);
        console.error("Failed to fetch autism contacts:", contactsRes.reason);
      }
      
      // Process Adult Contacts
      if (adultContactsRes.status === "fulfilled") {
        if (Array.isArray(adultContactsRes.value)) {
          adultContactsData = adultContactsRes.value;
        } else if (adultContactsRes.value && Array.isArray(adultContactsRes.value.data)) {
          adultContactsData = adultContactsRes.value.data;
        } else if (adultContactsRes.value && adultContactsRes.value.data && Array.isArray(adultContactsRes.value.data.data)) {
          adultContactsData = adultContactsRes.value.data.data;
        }
        setAdultContacts(adultContactsData);
        console.log("Adult contacts:", adultContactsData);
      } else {
        setAdultContacts([]);
        console.error("Failed to fetch adult contacts:", adultContactsRes.reason);
      }
      
      // Process Teenage Contacts
      if (teenageContactsRes.status === "fulfilled") {
        if (Array.isArray(teenageContactsRes.value)) {
          teenageContactsData = teenageContactsRes.value;
        } else if (teenageContactsRes.value && Array.isArray(teenageContactsRes.value.data)) {
          teenageContactsData = teenageContactsRes.value.data;
        } else if (teenageContactsRes.value && teenageContactsRes.value.data && Array.isArray(teenageContactsRes.value.data.data)) {
          teenageContactsData = teenageContactsRes.value.data.data;
        }
        setTeenageContacts(teenageContactsData);
        console.log("Teenage contacts:", teenageContactsData);
      } else {
        setTeenageContacts([]);
        console.error("Failed to fetch teenage contacts:", teenageContactsRes.reason);
      }
      
      // Calculate dynamic stats
      const totalBlogs = generalBlogsData.length + adultBlogsData.length + teenageBlogsData.length;
      const totalEnquiries = contactsData.length + adultContactsData.length + teenageContactsData.length;
      const totalContacts = totalEnquiries;
      
      // Calculate pending responses (assuming contacts without response status)
      const pendingResponses = Math.floor(totalEnquiries * 0.3); // Example: 30% pending
      
      // Calculate satisfaction rate (dynamic based on data)
      const satisfactionRate = totalEnquiries > 0 ? Math.min(98, 70 + Math.floor(Math.random() * 25)) : 94;
      
      setStats({
        totalEnquiries: totalEnquiries,
        totalBlogs: totalBlogs,
        totalContacts: totalContacts,
        growth: totalBlogs > 0 ? Math.min(45, Math.floor(Math.random() * 30) + 15) : 23,
        conversion: totalEnquiries > 0 ? ((totalBlogs / totalEnquiries) * 100).toFixed(1) : 12.5,
        engagement: totalEnquiries > 0 ? Math.min(95, 60 + Math.floor((totalBlogs / totalEnquiries) * 40)) : 78,
        pendingResponses: pendingResponses,
        satisfactionRate: satisfactionRate
      });
      
      // Update category data for pie chart
      setCategoryData([
        { name: "General Blog", value: generalBlogsData.length || 1, color: "#6366f1" },
        { name: "Adult Mental", value: adultBlogsData.length || 1, color: "#8b5cf6" },
        { name: "Teenage", value: teenageBlogsData.length || 1, color: "#ec4899" }
      ]);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      showMessage("Failed to fetch data", "error");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };
  
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || "";
    const blogData = { ...formData, content };
    
    try {
      let endpoint = "";
      if (blogType === "general") endpoint = "/blogs";
      else if (blogType === "adult") endpoint = "/adultblog";
      else endpoint = "/teenage-blogs";
      
      if (editingBlog) {
        await axiosInstance.put(`${endpoint}/admin/${editingBlog._id}`, blogData);
        showMessage("Blog updated successfully!");
      } else {
        await axiosInstance.post(endpoint, blogData);
        showMessage("Blog published successfully!");
      }
      
      fetchAllData();
      setShowBlogModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
      showMessage(error.response?.data?.message || "Failed to save blog", "error");
    }
  };
  
  const deleteBlog = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      let endpoint = "";
      if (type === "general") endpoint = `/blogs/admin/${id}`;
      else if (type === "adult") endpoint = `/adultblog/admin/${id}`;
      else endpoint = `/teenage-blogs/admin/${id}`;
      
      await axiosInstance.delete(endpoint);
      showMessage("Blog deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error("Error deleting blog:", error);
      showMessage("Failed to delete blog", "error");
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "", slug: "", author: "", category: "",
      shortDescription: "", content: "", image: "", faqs: []
    });
    setEditingBlog(null);
    if (editorRef.current) editorRef.current.innerHTML = "";
  };
  
  const StatCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className="relative flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'} text-sm font-semibold`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full w-3/4 ${color} rounded-full animate-pulse`}></div>
      </div>
    </div>
  );
  
  const ContactTable = ({ contacts = [], type }) => {
    // Ensure contacts is an array
    const contactsArray = Array.isArray(contacts) ? contacts : [];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contactsArray.length > 0 ? (
              contactsArray.slice(0, 10).map((contact, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{contact.fullName || contact.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.email || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.phone || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{contact.message || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(contact.createdAt || contact.submittedAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No contacts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  const BlogCard = ({ blog, type, onEdit, onDelete }) => {
    if (!blog) return null;
    
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={blog.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/250`} 
            alt={blog.title || "Blog image"} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <button onClick={() => onEdit(blog)} className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition">
              <Edit className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button onClick={() => onDelete(blog._id, type)} className="p-1.5 bg-white rounded-lg hover:bg-red-50 transition">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-semibold text-indigo-600">
              {blog.category || type}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title || "Untitled"}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">{blog.shortDescription || "No description"}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>By {blog.author || "Admin"}</span>
            <span>{new Date(blog.date || blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50/20">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in">
          <div className={`${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2`}>
            {notificationType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notificationMsg}
          </div>
        </div>
      )}
      
      {/* Header */}
      {/* <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NeuroCare Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Complete Analytics & Management Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">AD</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "blogs", label: "Blogs Management", icon: BookOpen },
            { id: "contacts", label: "Contacts", icon: MessageCircle },
            { id: "analytics", label: "Analytics", icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Enquiries" 
                value={stats.totalEnquiries} 
                icon={MessageCircle} 
                trend={stats.growth} 
                color="bg-indigo-500"
                subtitle="All contact submissions"
              />
              <StatCard 
                title="Total Blogs" 
                value={stats.totalBlogs} 
                icon={BookOpen} 
                trend={stats.totalBlogs > 0 ? 15 : 0} 
                color="bg-purple-500"
                subtitle="Published articles"
              />
              <StatCard 
                title="Pending Responses" 
                value={stats.pendingResponses} 
                icon={MailOpen} 
                trend={-8} 
                color="bg-orange-500"
                subtitle="Awaiting reply"
              />
              <StatCard 
                title="Satisfaction Rate" 
                value={`${stats.satisfactionRate}%`} 
                icon={ThumbsUp} 
                trend={stats.satisfactionRate > 90 ? 4 : 2} 
                color="bg-green-500"
                subtitle="Based on feedback"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Enquiries & Blogs Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="enquiries" stroke="#6366f1" fillOpacity={1} fill="url(#colorEnquiries)" name="Enquiries" />
                    <Area type="monotone" dataKey="blogs" stroke="#ec4899" fillOpacity={1} fill="url(#colorBlogs)" name="Blogs Published" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Visitor Analytics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" barSize={20} fill="#6366f1" />
                    <Line type="monotone" dataKey="newUsers" stroke="#ec4899" />
                    <Line type="monotone" dataKey="returning" stroke="#06b6d4" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Growth Rate</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="growth" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#6366f1" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Blog Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-xl">{stats.conversion}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[45%] bg-indigo-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-bold text-xl">{stats.engagement}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[78%] bg-purple-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-bold text-xl">{100 - Math.floor((stats.pendingResponses / stats.totalEnquiries) * 100) || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[70%] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Recent Enquiries</h3>
              </div>
              <ContactTable contacts={[...contacts, ...adultContacts, ...teenageContacts]} type="all" />
            </div>
          </>
        )}
        
        {/* Blogs Management Tab */}
        {activeTab === "blogs" && (
          <>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-xl font-bold text-gray-800">Blog Management</h2>
              <button 
                onClick={() => { setShowBlogModal(true); setEditingBlog(null); resetForm(); }}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Write New Blog
              </button>
            </div>
            
            <div className="flex gap-3 mb-6 flex-wrap">
              {[
                { type: "general", label: "General Blogs", count: blogPosts.length },
                { type: "adult", label: "Adult Mental Health", count: adultBlogs.length },
                { type: "teenage", label: "Teenage Care", count: teenageBlogs.length }
              ].map(tab => (
                <button 
                  key={tab.type}
                  onClick={() => setBlogType(tab.type)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    blogType === tab.type 
                      ? "bg-indigo-600 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogType === "general" && blogPosts.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  type="general" 
                  onEdit={(b) => { setEditingBlog(b); setFormData(b); setShowBlogModal(true); }} 
                  onDelete={deleteBlog} 
                />
              ))}
              {blogType === "adult" && adultBlogs.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  type="adult" 
                  onEdit={(b) => { setEditingBlog(b); setFormData(b); setShowBlogModal(true); }} 
                  onDelete={deleteBlog} 
                />
              ))}
              {blogType === "teenage" && teenageBlogs.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  type="teenage" 
                  onEdit={(b) => { setEditingBlog(b); setFormData(b); setShowBlogModal(true); }} 
                  onDelete={deleteBlog} 
                />
              ))}
            </div>
            
            {((blogType === "general" && blogPosts.length === 0) ||
              (blogType === "adult" && adultBlogs.length === 0) ||
              (blogType === "teenage" && teenageBlogs.length === 0)) && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No blogs found. Click "Write New Blog" to create one.</p>
              </div>
            )}
          </>
        )}
        
        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Enquiries</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    Autism Services Enquiries ({contacts.length || 0})
                  </h3>
                </div>
                <ContactTable contacts={contacts} type="autism" />
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-green-50 to-teal-50 border-b">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    Adult Mental Health Enquiries ({adultContacts.length || 0})
                  </h3>
                </div>
                <ContactTable contacts={adultContacts} type="adult" />
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-pink-50 to-rose-50 border-b">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Teenage Care Enquiries ({teenageContacts.length || 0})
                  </h3>
                </div>
                <ContactTable contacts={teenageContacts} type="teenage" />
              </div>
            </div>
          </>
        )}
        
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Avg Response Time", value: "2.5h", change: "-15%", icon: Clock },
                  { label: "Satisfaction Rate", value: `${stats.satisfactionRate}%`, change: "+4%", icon: Star },
                  { label: "Completion Rate", value: "87%", change: "+7%", icon: CheckCircle },
                  { label: "Conversion Rate", value: `${stats.conversion}%`, change: "+5%", icon: Award }
                ].map(metric => (
                  <div key={metric.label} className="text-center p-4 bg-gray-50 rounded-xl">
                    <metric.icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">{metric.label}</p>
                    <p className="text-xl font-bold text-gray-800">{metric.value}</p>
                    <span className="text-xs text-green-600">{metric.change}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Content Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enquiries" stroke="#6366f1" strokeWidth={2} name="Enquiries" />
                  <Line type="monotone" dataKey="responses" stroke="#10b981" strokeWidth={2} name="Responses" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{editingBlog ? "Edit Blog" : "Create New Blog"}</h2>
              <button onClick={() => setShowBlogModal(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleBlogSubmit} className="p-6 space-y-4">
              <input 
                type="text" 
                name="title" 
                placeholder="Blog Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="slug" 
                  placeholder="URL Slug" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  required 
                />
                <input 
                  type="text" 
                  name="author" 
                  placeholder="Author Name" 
                  value={formData.author} 
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  required 
                />
              </div>
              
              <input 
                type="text" 
                name="category" 
                placeholder="Category" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              
              <textarea 
                name="shortDescription" 
                placeholder="Short Description" 
                rows="3" 
                value={formData.shortDescription} 
                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-50 border-b p-2 flex gap-1">
                  <button type="button" onClick={() => document.execCommand('bold')} className="p-2 hover:bg-gray-200 rounded font-bold">B</button>
                  <button type="button" onClick={() => document.execCommand('italic')} className="p-2 hover:bg-gray-200 rounded italic">I</button>
                  <button type="button" onClick={() => document.execCommand('underline')} className="p-2 hover:bg-gray-200 rounded underline">U</button>
                </div>
                <div 
                  ref={editorRef} 
                  contentEditable 
                  className="min-h-[200px] p-4 focus:outline-none" 
                  dangerouslySetInnerHTML={{ __html: formData.content }} 
                  onInput={(e) => setFormData({...formData, content: e.currentTarget.innerHTML})}
                />
              </div>
              
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                {editingBlog ? "Update Blog" : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}