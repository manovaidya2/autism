import express from 'express';
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact
} from '../controllers/teenageContactController.js';  // Note: .js extension

const router = express.Router();

// Public routes
router.post('/teenage/contact/create', createContact);

// Admin routes (protected - add your auth middleware)
router.get('/teenage/contacts', getAllContacts);
router.get('/teenage/contact/:id', getContactById);
router.put('/teenage/contact/:id/status', updateContactStatus);
router.delete('/teenage/contact/:id', deleteContact);

export default router;  // Using export default instead of module.exports