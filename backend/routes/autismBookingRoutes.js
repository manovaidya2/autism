import express from 'express';
import { 
  createAutismBooking, 
  getAllAutismBookings, 
  getAutismBookingById,
  updateAutismBookingStatus,
  deleteAutismBooking,
  getTodayAutismBookings,
  getAutismBookingStats,
  getBookingsByDateRange
} from '../controllers/autismBookingController.js';

const router = express.Router();

// Public routes
router.post('/autism-bookings', createAutismBooking);

// Admin routes
router.get('/admin/autism-bookings', getAllAutismBookings);
router.get('/admin/autism-bookings/today', getTodayAutismBookings);
router.get('/admin/autism-bookings/stats', getAutismBookingStats);
router.get('/admin/autism-bookings/date-range', getBookingsByDateRange);
router.get('/admin/autism-bookings/:id', getAutismBookingById);
router.put('/admin/autism-bookings/:id/status', updateAutismBookingStatus);
router.delete('/admin/autism-bookings/:id', deleteAutismBooking);

export default router;