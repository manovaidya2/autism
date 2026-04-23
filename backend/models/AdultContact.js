// backend/models/AdultContact.js
import mongoose from 'mongoose';

const adultContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\d\s\+\(\)\-]{8,}$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved', 'spam'],
    default: 'pending'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: null
  },
  contactedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for better query performance
adultContactSchema.index({ email: 1 });
adultContactSchema.index({ phone: 1 });
adultContactSchema.index({ status: 1 });
adultContactSchema.index({ submittedAt: -1 });
adultContactSchema.index({ isRead: 1 });

// Virtual for formatted date
adultContactSchema.virtual('formattedDate').get(function() {
  return this.submittedAt.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to mark as contacted
adultContactSchema.methods.markAsContacted = async function() {
  this.status = 'contacted';
  this.contactedAt = new Date();
  await this.save();
};

// Method to mark as resolved
adultContactSchema.methods.markAsResolved = async function() {
  this.status = 'resolved';
  await this.save();
};

// Method to mark as read
adultContactSchema.methods.markAsRead = async function() {
  this.isRead = true;
  await this.save();
};

// Static method to get unread count
adultContactSchema.statics.getUnreadCount = async function() {
  return await this.countDocuments({ isRead: false });
};

// Static method to get pending count
adultContactSchema.statics.getPendingCount = async function() {
  return await this.countDocuments({ status: 'pending' });
};

const AdultContact = mongoose.model('AdultContact', adultContactSchema);

export default AdultContact;