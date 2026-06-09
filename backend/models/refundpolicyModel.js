// models/refundpolicyModel.js
import mongoose from 'mongoose';

const refundpolicySchema = new mongoose.Schema({
  // Patient Information
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 0,
    max: 120
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female']
  },
  
  // Additional Information
  relationship: {
    type: String,
    required: [true, 'Relationship with patient is required'],
    trim: true
  },
  relativeName: {
    type: String,
    required: [true, 'Relative name is required'],
    trim: true
  },
  relativeMobile: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  
  // Signature
  signatureType: {
    type: String,
    required: [true, 'Signature type is required'],
    enum: ['draw', 'upload']
  },
  signatureData: {
    type: String,
    default: ''
  },
  signatureFile: {
    type: String,
    default: ''
  },
  
  // Terms Acceptance
  acceptTerms: {
    type: Boolean,
    required: [true, 'Terms acceptance is required'],
    default: false
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
refundpolicySchema.index({ mobile: 1 });
refundpolicySchema.index({ patientName: 1 });
refundpolicySchema.index({ submittedAt: -1 });

const RefundPolicy = mongoose.model('RefundPolicy', refundpolicySchema);
export default RefundPolicy;