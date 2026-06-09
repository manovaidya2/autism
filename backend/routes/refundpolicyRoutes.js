import express from 'express';
import {
  submitRefundPolicy,
  getAllRefundPolicies,
  getRefundPolicyById,
  searchRefundPolicies,
  deleteRefundPolicy,
  getRefundPolicyStats,
  downloadRefundPolicyPDF  // Add this import
} from '../controllers/refundpolicyController.js';

const router = express.Router();

// Routes
router.post('/submit', submitRefundPolicy);
router.get('/all', getAllRefundPolicies);
router.get('/stats', getRefundPolicyStats);
router.get('/search', searchRefundPolicies);
router.get('/download/:id', downloadRefundPolicyPDF);  // Add this route
router.get('/:id', getRefundPolicyById);
router.delete('/:id', deleteRefundPolicy);

export default router;