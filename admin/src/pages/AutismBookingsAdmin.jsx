import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AutismBookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    online: 0,
    clinic: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Helper function to format date as YYYY-MM-DD
  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to format datetime for display
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Helper function to format time only
  const formatTimeOnly = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayYMD = () => {
    const today = new Date();
    return formatDateToYMD(today);
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/autism-bookings");
      const bookingsData = response.data.data || [];
      // Sort by createdAt descending (newest first)
      const sortedBookings = bookingsData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);
      calculateStats(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const todayYMD = getTodayYMD();
    
    // Calculate week start (Monday as first day of week)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStartDate = new Date(today);
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStartDate.setDate(today.getDate() - daysToSubtract);
    const weekStartYMD = formatDateToYMD(weekStartDate);
    
    // Get month start
    const monthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartYMD = formatDateToYMD(monthStartDate);

    const todayBookings = bookingsData.filter(booking => booking.date === todayYMD);
    const weekBookings = bookingsData.filter(booking => booking.date >= weekStartYMD);
    const monthBookings = bookingsData.filter(booking => booking.date >= monthStartYMD);
    
    const onlineCount = bookingsData.filter(booking => booking.mode === "online").length;
    const clinicCount = bookingsData.filter(booking => booking.mode === "clinic").length;

    setStats({
      total: bookingsData.length,
      today: todayBookings.length,
      thisWeek: weekBookings.length,
      thisMonth: monthBookings.length,
      online: onlineCount,
      clinic: clinicCount,
    });
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/admin/autism-bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`/admin/autism-bookings/${id}`);
        fetchBookings();
        if (selectedDateBookings) {
          const updatedSelected = bookings.filter(b => b.date === selectedDate);
          setSelectedDateBookings(updatedSelected);
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get bookings count for a specific date
  const getBookingsCountForDate = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr).length;
  };

  // Handle date click
  const handleDateClick = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const bookingsOnDate = bookings.filter(booking => booking.date === dateStr);
    setSelectedDate(dateStr);
    setSelectedDateBookings(bookingsOnDate);
    setShowDateModal(true);
  };

  // Generate calendar days
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const todayYMD = getTodayYMD();
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const bookingCount = getBookingsCountForDate(currentYear, currentMonth, day);
      const dateYMD = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = todayYMD === dateYMD;
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(currentYear, currentMonth, day)}
          className={`h-20 p-2 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            bookingCount > 0 
              ? 'bg-[#06351f] text-white hover:bg-[#0b4028] border-[#d6a22e]' 
              : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-[#d6a22e]'
          } ${isToday ? 'ring-2 ring-[#d6a22e] shadow-lg' : ''}`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-lg font-bold ${bookingCount > 0 ? 'text-white' : 'text-[#062f1c]'}`}>
              {day}
            </span>
            {bookingCount > 0 && (
              <div className="mt-auto">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-[#d6a22e] text-[#062f1c]">
                  {bookingCount}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Chart 1: Last 30 Days Trend Data
  const getLast30DaysData = () => {
    const days = [];
    const counts = [];
    const dates = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = formatDateToYMD(date);
      const formattedDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      days.push(formattedDate);
      dates.push(dateStr);
      
      const count = bookings.filter(booking => booking.date === dateStr).length;
      counts.push(count);
    }
    
    return { days, counts, dates };
  };

  // Chart 2: Mode Distribution Data
  const getModeDistributionData = () => {
    const onlineCount = bookings.filter(booking => booking.mode === "online").length;
    const clinicCount = bookings.filter(booking => booking.mode === "clinic").length;
    return { onlineCount, clinicCount };
  };

  const last30Days = getLast30DaysData();
  const modeData = getModeDistributionData();

  const barChartData = {
    labels: last30Days.days,
    datasets: [
      {
        label: 'Number of Bookings',
        data: last30Days.counts,
        backgroundColor: 'rgba(6, 53, 31, 0.7)',
        borderColor: 'rgba(6, 53, 31, 1)',
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(214, 162, 46, 0.8)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Online Consultation', 'Clinic Visit'],
    datasets: [
      {
        data: [modeData.onlineCount, modeData.clinicCount],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        const selectedDateStr = last30Days.dates[index];
        const bookingsOnDate = bookings.filter(booking => booking.date === selectedDateStr);
        setSelectedDate(selectedDateStr);
        setSelectedDateBookings(bookingsOnDate);
        setShowDateModal(true);
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(6, 53, 31, 0.9)',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return `Bookings: ${context.parsed.y}`;
          }
        }
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(6, 53, 31, 0.9)',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#f8f7f2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06351f] mx-auto"></div>
          <p className="mt-4 text-[#5f665f]">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7f2] min-h-screen">
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[980px] mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[3px] text-[#06351f]">
            Admin Panel
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-serif text-[#062f1c]">
            Autism Booking Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#6b756c]">
            Manage and track all autism assessment bookings
          </p>
        </div>

        {/* Stats Cards - All 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-[#06351f]/10 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#06351f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#06351f]">{stats.total}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">Total Bookings</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">All time bookings</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-green-50 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-green-600">{stats.today}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">Today's Bookings</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">{new Date().toLocaleDateString('en-IN')}</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.thisWeek}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">This Week</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">Last 7 days</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.thisMonth}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">This Month</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">{new Date().toLocaleString('default', { month: 'long' })}</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.online}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">Online Consultations</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">Video sessions</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.clinic}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5f665f]">Clinic Visits</p>
            <p className="text-[10px] sm:text-xs text-[#8f968f] mt-1">In-person sessions</p>
          </div>
        </div>

        {/* Two Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-bold text-[#062f1c] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Last 30 Days Trend
            </h3>
            <div className="h-64 sm:h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
            <p className="text-center text-xs text-[#8f968f] mt-4">
              Click on any bar to see detailed bookings
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-bold text-[#062f1c] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Consultation Mode Distribution
            </h3>
            <div className="h-64 sm:h-80">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-[#5f665f]">Online: {modeData.onlineCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-[#5f665f]">Clinic: {modeData.clinicCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h3 className="text-base sm:text-lg font-bold text-[#062f1c] flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Booking Calendar
              </h3>
              <div className="flex gap-2">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full bg-[#f5f2ea] hover:bg-[#e8dfd0] transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#06351f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h4 className="text-base sm:text-xl font-semibold text-[#062f1c] px-2 sm:px-4">
                  {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                </h4>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full bg-[#f5f2ea] hover:bg-[#e8dfd0] transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#06351f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-[#06351f] py-2 text-xs sm:text-sm">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {renderCalendar()}
            </div>
            
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#06351f] rounded"></div>
                <span className="text-[#5f665f]">Has Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border border-gray-200 rounded"></div>
                <span className="text-[#5f665f]">No Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#d6a22e] rounded-full"></div>
                <span className="text-[#5f665f]">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium transition-all duration-300 ${
                filter === status
                  ? "bg-[#06351f] text-white shadow-md"
                  : "bg-white text-[#5f665f] hover:bg-[#f5f2ea] border border-[#eee8dc]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings Table with Submission Time */}
        <div className="rounded-2xl bg-white border border-[#eee8dc] shadow-xl overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#fbfaf7] border-b border-[#eee8dc]">
            <h3 className="text-base sm:text-lg font-bold text-[#062f1c]">
              All Bookings {filter !== "all" && `- ${filter}`}
            </h3>
          </div>
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-[#5f665f]">
              No bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-[#06351f] text-white">
                  <tr>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Name</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Contact</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Booking Date & Time</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Mode</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Status</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Submitted On</th>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-[#eee8dc] hover:bg-[#fbfaf7] transition-colors">
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm font-semibold text-[#062f1c]">{booking.name}</div>
                      </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm text-[#5f665f]">{booking.email}</div>
                        <div className="text-xs text-[#8f968f]">{booking.phone}</div>
                       </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm font-medium text-[#062f1c]">{booking.date}</div>
                        <div className="text-xs text-[#d6a22e]">{booking.time}</div>
                       </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.mode === 'online' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {booking.mode === 'online' ? 'Online' : 'Clinic'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)} focus:outline-none cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm text-[#5f665f]">{formatDateTime(booking.createdAt)}</div>
                        <div className="text-[10px] text-[#8f968f] mt-0.5">ID: {booking._id?.slice(-6)}</div>
                      </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-4 text-center">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="rounded-full bg-red-50 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Date Wise Booking Details Modal with Submission Time */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex justify-end bg-white pt-4 pr-4">
              <button
                onClick={() => setShowDateModal(false)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#f5f2ea] text-[#0b2f1d] hover:bg-[#e8dfd0] transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-4 sm:px-7 pb-5 sm:pb-7">
              <h3 className="font-serif text-xl sm:text-2xl md:text-[28px] leading-tight text-[#0b2f1d]">
                Bookings for {selectedDate && new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              
              <div className="mt-6">
                {selectedDateBookings.length === 0 ? (
                  <div className="text-center py-8 text-[#5f665f]">
                    No bookings on this date
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateBookings.map((booking) => (
                      <div key={booking._id} className="border border-[#eee8dc] rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <p className="font-semibold text-[#062f1c] text-base sm:text-lg">{booking.name}</p>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${
                                booking.mode === 'online' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {booking.mode === 'online' ? 'Online' : 'Clinic'}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#5f665f] break-all">{booking.email}</p>
                            <p className="text-xs sm:text-sm text-[#5f665f]">{booking.phone}</p>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <p className="text-xs sm:text-sm text-[#d6a22e] font-medium">⏰ Booking Time: {booking.time}</p>
                              <p className="text-xs sm:text-sm text-[#8f968f]">📅 Submitted: {formatDateTime(booking.createdAt)}</p>
                            </div>
                            <p className="text-xs text-[#8f968f] mt-1 flex items-center gap-1">
                              <span className="font-medium">Status:</span> 
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </p>
                            <p className="text-[10px] text-[#b0b0b0] mt-2">Booking ID: {booking._id}</p>
                          </div>
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="rounded-full bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-300 w-full sm:w-auto"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


