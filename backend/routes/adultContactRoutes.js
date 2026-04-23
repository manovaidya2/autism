// backend/routes/adultContactRoutes.js
import express from 'express';
import {
  createAdultContact,
  getAllAdultContacts,
  getAdultContactById,
  updateContactStatus,
  deleteAdultContact,
  getContactStats,
  bulkDeleteContacts
} from '../controllers/adultContactController.js';

const router = express.Router();

// Public routes
router.post('/create', createAdultContact);

// Admin routes (add your auth middleware here)
// router.use(protect, adminOnly); // Uncomment when you add authentication

router.get('/all', getAllAdultContacts);
router.get('/stats', getContactStats);
router.get('/:id', getAdultContactById);
router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteAdultContact);
router.delete('/bulk-delete', bulkDeleteContacts);

export default router;