// backend/controllers/adultContactController.js
import AdultContact from '../models/AdultContact.js';

// @desc    Create new adult contact submission
// @route   POST /api/adult-contact/create
// @access  Public
export const createAdultContact = async (req, res) => {
  try {
    const { fullName, email, phone, address, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !address || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\(\)\-]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // Check for duplicate submission within last 5 minutes
    const recentSubmission = await AdultContact.findOne({
      email,
      submittedAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a form recently. Please try again later.'
      });
    }

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || null;
    
    // Get User Agent
    const userAgent = req.headers['user-agent'] || null;

    // Create new contact
    const adultContact = new AdultContact({
      fullName,
      email,
      phone,
      address,
      message,
      ipAddress,
      userAgent
    });

    await adultContact.save();

    // Here you can add email notification logic
    // await sendEmailNotification(adultContact);

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: adultContact._id,
        fullName: adultContact.fullName,
        email: adultContact.email,
        submittedAt: adultContact.submittedAt
      }
    });

  } catch (error) {
    console.error('Error creating adult contact:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate submission detected'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// @desc    Get all adult contacts (Admin only)
// @route   GET /api/adult-contact/all
// @access  Private/Admin
export const getAllAdultContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Filter options
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.isRead === 'true') filter.isRead = true;
    if (req.query.isRead === 'false') filter.isRead = false;
    
    // Search functionality
    if (req.query.search) {
      filter.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } },
        { message: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [contacts, total] = await Promise.all([
      AdultContact.find(filter)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit),
      AdultContact.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching adult contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

// @desc    Get single adult contact by ID
// @route   GET /api/adult-contact/:id
// @access  Private/Admin
export const getAdultContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await AdultContact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Mark as read if not already
    if (!contact.isRead) {
      await contact.markAsRead();
    }

    return res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching adult contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching contact'
    });
  }
};

// @desc    Update adult contact status
// @route   PUT /api/adult-contact/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    if (!['pending', 'contacted', 'resolved', 'spam'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const contact = await AdultContact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.status = status;
    if (notes) contact.notes = notes;
    
    if (status === 'contacted' && !contact.contactedAt) {
      contact.contactedAt = new Date();
    }
    
    await contact.save();

    return res.status(200).json({
      success: true,
      message: `Contact status updated to ${status}`,
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating contact status'
    });
  }
};

// @desc    Delete adult contact
// @route   DELETE /api/adult-contact/:id
// @access  Private/Admin
export const deleteAdultContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await AdultContact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting adult contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/adult-contact/stats
// @access  Private/Admin
export const getContactStats = async (req, res) => {
  try {
    const [total, pending, contacted, resolved, spam, unread, today] = await Promise.all([
      AdultContact.countDocuments(),
      AdultContact.countDocuments({ status: 'pending' }),
      AdultContact.countDocuments({ status: 'contacted' }),
      AdultContact.countDocuments({ status: 'resolved' }),
      AdultContact.countDocuments({ status: 'spam' }),
      AdultContact.countDocuments({ isRead: false }),
      AdultContact.countDocuments({
        submittedAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        contacted,
        resolved,
        spam,
        unread,
        today
      }
    });

  } catch (error) {
    console.error('Error fetching contact stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
};

// @desc    Bulk delete contacts
// @route   DELETE /api/adult-contact/bulk-delete
// @access  Private/Admin
export const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of contact IDs to delete'
      });
    }

    const result = await AdultContact.deleteMany({ _id: { $in: ids } });
    
    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} contacts deleted successfully`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Error bulk deleting contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting contacts'
    });
  }
};