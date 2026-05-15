import AutismBooking from '../models/AutismBooking.js';

// Create new booking
export const createAutismBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, mode } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !mode) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // REMOVED: Time slot conflict check - now multiple people can book same slot
    // Directly create new booking without checking existing bookings

    // Create new booking
    const booking = new AutismBooking({
      name,
      email,
      phone,
      date,
      time,
      mode,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
};

// Get all bookings (Admin)
export const getAllAutismBookings = async (req, res) => {
  try {
    const bookings = await AutismBooking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get booking by ID (Admin)
export const getAutismBookingById = async (req, res) => {
  try {
    const booking = await AutismBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Update booking status (Admin)
export const updateAutismBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value' 
      });
    }

    const booking = await AutismBooking.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get today's bookings (Admin)
export const getTodayAutismBookings = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const bookings = await AutismBooking.find({ 
      date: today 
    }).sort({ time: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching today\'s bookings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get booking statistics (Admin)
export const getAutismBookingStats = async (req, res) => {
  try {
    const totalBookings = await AutismBooking.countDocuments();
    const pendingBookings = await AutismBooking.countDocuments({ status: 'pending' });
    const confirmedBookings = await AutismBooking.countDocuments({ status: 'confirmed' });
    const completedBookings = await AutismBooking.countDocuments({ status: 'completed' });
    const cancelledBookings = await AutismBooking.countDocuments({ status: 'cancelled' });
    
    const onlineBookings = await AutismBooking.countDocuments({ mode: 'online' });
    const clinicBookings = await AutismBooking.countDocuments({ mode: 'clinic' });

    // Additional stats for calendar view
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = await AutismBooking.countDocuments({ date: today });
    
    // Get current week start (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - daysToSubtract);
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const weekBookings = await AutismBooking.countDocuments({ date: { $gte: weekStartStr } });
    
    // Get current month start
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split('T')[0];
    const monthBookings = await AutismBooking.countDocuments({ date: { $gte: monthStartStr } });

    res.status(200).json({
      success: true,
      data: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
        online: onlineBookings,
        clinic: clinicBookings,
        today: todayBookings,
        thisWeek: weekBookings,
        thisMonth: monthBookings,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Delete booking (Admin)
export const deleteAutismBooking = async (req, res) => {
  try {
    const booking = await AutismBooking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get bookings by date range (Admin)
export const getBookingsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const bookings = await AutismBooking.find(query).sort({ date: 1, time: 1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings by date range:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};