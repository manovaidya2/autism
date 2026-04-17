import TeenageContact from '../models/TeenageContact.js';  // Note: .js extension

// Create new contact entry
export const createContact = async (req, res) => {
    try {
        const { fullName, email, phone, address, message } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !address || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new contact
        const newContact = new TeenageContact({
            fullName,
            email,
            phone,
            address,
            message
        });

        // Save to database
        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.',
            data: newContact
        });

    } catch (error) {
        console.error('Error creating teenage contact:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await TeenageContact.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts'
        });
    }
};

// Get single contact by ID
export const getContactById = async (req, res) => {
    try {
        const contact = await TeenageContact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        if (contact.status === 'pending') {
            contact.status = 'read';
            await contact.save();
        }
        
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact'
        });
    }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }
        
        const contact = await TeenageContact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact status'
        });
    }
};

// Delete contact
export const deleteContact = async (req, res) => {
    try {
        const contact = await TeenageContact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact'
        });
    }
};