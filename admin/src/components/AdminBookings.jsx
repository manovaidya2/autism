import React, { useEffect, useState } from "react";
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
import { Bar, Pie, Line } from 'react-chartjs-2';

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

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    online: 0,
    clinic: 0,
  });

  const API_URL = "/bookings";

  // Helper function to format date consistently as YYYY-MM-DD
  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to get today's date in YYYY-MM-DD format without timezone issues
  const getTodayYMD = () => {
    const today = new Date();
    return formatDateToYMD(today);
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const bookingsData = res.data.bookings || [];
      setBookings(bookingsData);
      calculateStats(bookingsData);
    } catch (error) {
      alert("Bookings fetch nahi ho paayi");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const todayYMD = getTodayYMD();
    
    // Calculate week start (Monday as first day of week)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekStartDate = new Date(today);
    // Adjust to make Monday as first day (if Sunday (0), go back 6 days)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStartDate.setDate(today.getDate() - daysToSubtract);
    const weekStartYMD = formatDateToYMD(weekStartDate);
    
    // Get month start
    const monthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartYMD = formatDateToYMD(monthStartDate);

    const todayBookings = bookingsData.filter(booking => booking.date === todayYMD);
    const weekBookings = bookingsData.filter(booking => booking.date >= weekStartYMD);
    const monthBookings = bookingsData.filter(booking => booking.date >= monthStartYMD);
    
    // Count online and clinic bookings
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedBookings = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedBookings);
      calculateStats(updatedBookings);
      if (selectedDateBookings) {
        const updatedSelected = updatedBookings.filter(b => b.date === selectedDate);
        setSelectedDateBookings(updatedSelected);
      }
    } catch (error) {
      alert("Booking delete nahi ho paayi");
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
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 sm:h-24 bg-gray-50 rounded-lg border border-gray-100"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const bookingCount = getBookingsCountForDate(currentYear, currentMonth, day);
      const dateYMD = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = todayYMD === dateYMD;
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(currentYear, currentMonth, day)}
          className={`h-20 sm:h-24 p-1 sm:p-2 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            bookingCount > 0 
              ? 'bg-[#06351f] text-white hover:bg-[#0b4028] border-[#d6a22e]' 
              : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-[#d6a22e]'
          } ${isToday ? 'ring-2 ring-[#d6a22e] shadow-lg' : ''}`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-base sm:text-lg font-bold ${bookingCount > 0 ? 'text-white' : 'text-[#062f1c]'}`}>
              {day}
            </span>
            {bookingCount > 0 && (
              <div className="mt-auto">
                <span className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full bg-[#d6a22e] text-[#062f1c]">
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

  // Prepare chart data
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

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = new Array(12).fill(0);
    
    bookings.forEach(booking => {
      if (booking.date) {
        const [year, month] = booking.date.split('-');
        if (year && month) {
          counts[parseInt(month) - 1]++;
        }
      }
    });
    
    return { months, counts };
  };

  const getModeWiseData = () => {
    const onlineCount = bookings.filter(booking => booking.mode === "online").length;
    const clinicCount = bookings.filter(booking => booking.mode === "clinic").length;
    return { onlineCount, clinicCount };
  };

  const getTimeSlotData = () => {
    const slots = {
      'Morning (9AM-12PM)': 0,
      'Afternoon (12PM-3PM)': 0,
      'Evening (3PM-6PM)': 0,
      'Night (6PM-9PM)': 0,
    };
    
    bookings.forEach(booking => {
      const timeMatch = booking.time.match(/(\d{1,2}):/);
      if (timeMatch) {
        const hour = parseInt(timeMatch[1]);
        if (hour < 12) slots['Morning (9AM-12PM)']++;
        else if (hour < 15) slots['Afternoon (12PM-3PM)']++;
        else if (hour < 18) slots['Evening (3PM-6PM)']++;
        else slots['Night (6PM-9PM)']++;
      }
    });
    
    return slots;
  };

  const last30Days = getLast30DaysData();
  const monthlyData = getMonthlyData();
  const timeSlotData = getTimeSlotData();
  const modeData = getModeWiseData();

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

  const lineChartData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: 'Monthly Bookings',
        data: monthlyData.counts,
        fill: true,
        backgroundColor: 'rgba(6, 53, 31, 0.1)',
        borderColor: 'rgba(6, 53, 31, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(6, 53, 31, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(timeSlotData),
    datasets: [
      {
        data: Object.values(timeSlotData),
        backgroundColor: [
          'rgba(6, 53, 31, 0.8)',
          'rgba(80, 120, 80, 0.8)',
          'rgba(140, 170, 120, 0.8)',
          'rgba(200, 210, 170, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const modePieChartData = {
    labels: ['Online', 'Clinic'],
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

  useEffect(() => {
    fetchBookings();
  }, []);

return (
  <div className="w- bg-[#f8f7f2]">
    <div className="w-[1000px] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[3px] text-[#06351f]">
            Admin Panel
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#062f1c] break-words">
            Booking Dashboard
          </h1>
        </div>

        <button
          onClick={fetchBookings}
          className="rounded-full bg-[#06351f] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#0b4028] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Refresh Data
        </button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

      {/* Calendar View - Responsive */}
      <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h3 className="text-base sm:text-lg font-bold text-[#062f1c] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Date Wise Booking Calendar
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-full bg-[#f5f2ea] hover:bg-[#e8dfd0] transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#06351f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className="text-base sm:text-xl font-semibold text-[#062f1c] px-2 sm:px-4">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </h4>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-full bg-[#f5f2ea] hover:bg-[#e8dfd0] transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#06351f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-[#06351f] py-2 text-xs sm:text-sm">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Bar Chart - Last 30 Days */}
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
        </div>

        {/* Line Chart - Monthly Trend */}
        <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-bold text-[#062f1c] mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Monthly Booking Trend
          </h3>
          <div className="h-64 sm:h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart - Time Slots */}
        <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-bold text-[#062f1c] mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Booking Distribution by Time
          </h3>
          <div className="h-64 sm:h-80">
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart - Mode Distribution */}
        <div className="bg-white rounded-2xl border border-[#eee8dc] shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-bold text-[#062f1c] mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Online vs Clinic Distribution
          </h3>
          <div className="h-64 sm:h-80">
            <Pie data={modePieChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bookings Table - Responsive */}
      <div className="rounded-[24px] bg-white border border-[#eee8dc] shadow-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#fbfaf7] border-b border-[#eee8dc]">
          <h3 className="text-base sm:text-lg font-bold text-[#062f1c]">All Bookings</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#5f665f]">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-[#5f665f]">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="bg-[#06351f] text-white">
                <tr>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Name</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Email</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Phone</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Date</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Time</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Mode</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">Created</th>
                  <th className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-[#eee8dc] hover:bg-[#fbfaf7] transition-colors"
                  >
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-[#062f1c]">
                      {booking.name}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#5f665f]">
                      {booking.email}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#5f665f]">
                      {booking.phone}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#5f665f]">
                      {new Date(booking.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#5f665f]">
                      {booking.time}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">
                      <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                        booking.mode === 'online' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {booking.mode === 'online' ? (
                          <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                        {booking.mode === 'online' ? 'Online' : 'Clinic'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#5f665f]">
                      {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-center">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="rounded-full bg-red-50 px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm font-bold text-red-600 hover:bg-red-100 transition-all duration-300"
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

    {/* Date Wise Booking Details Modal */}
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
                              {booking.mode === 'online' ? (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              )}
                              {booking.mode === 'online' ? 'Online' : 'Clinic'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#5f665f] break-all">{booking.email}</p>
                          <p className="text-xs sm:text-sm text-[#5f665f]">{booking.phone}</p>
                          <p className="text-xs sm:text-sm text-[#d6a22e] mt-2 font-medium">Time: {booking.time}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="rounded-full bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-100 transition-all duration-300 w-full sm:w-auto"
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