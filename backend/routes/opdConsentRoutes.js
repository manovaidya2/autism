import express from 'express';
import {
  createOPDConsent,
  getAllOPDConsents,
  getOPDConsentById,
  deleteOPDConsent
} from '../controllers/opdConsentController.js';

const router = express.Router();

// Public - create consent
router.post('/create', createOPDConsent);

// Admin - list/fetch/delete (authentication middleware can be added)
router.get('/all', getAllOPDConsents);
router.get('/:id', getOPDConsentById);
router.delete('/:id', deleteOPDConsent);

export default router;
