import mongoose from 'mongoose';

const consentClauseSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  hindi: { type: String, required: true },
  english: { type: String, required: true }
}, { _id: false });

const opdConsentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
    maxlength: [200, 'Patient name cannot exceed 200 characters']
  },
  mobile: {
    type: String,
    trim: true,
    maxlength: [30, 'Mobile number cannot exceed 30 characters']
  },
  age: {
    type: Number,
    min: [0, 'Age must be a positive number'],
    max: [150, 'Age cannot exceed 150']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: ''
  },
  address: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  relativeName: {
    type: String,
    trim: true,
    maxlength: [200, 'Relative name cannot exceed 200 characters']
  },
  relativeMobile: {
    type: String,
    trim: true,
    maxlength: [30, 'Relative mobile cannot exceed 30 characters']
  },
  consentAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  signatureMethod: {
    type: String,
    enum: ['draw', 'upload'],
    default: 'draw'
  },
  signatureImage: {
    type: String,
    default: null
  },
  digitalSignatureText: {
    type: String,
    required: [true, 'Typed signature is required'],
    trim: true,
    maxlength: [200, 'Typed signature cannot exceed 200 characters']
  },
  consentClauses: {
    type: [consentClauseSchema],
    default: []
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

opdConsentSchema.index({ patientName: 'text', mobile: 'text', relativeName: 'text', digitalSignatureText: 'text' });
opdConsentSchema.index({ createdAt: -1 });

export default mongoose.model('OPDConsent', opdConsentSchema);
