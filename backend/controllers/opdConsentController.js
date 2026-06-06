import OPDConsent from '../models/OPDConsent.js';

// Create new OPD consent
export const createOPDConsent = async (req, res) => {
  try {
    const payload = req.body || {};

    // Basic validation
    if (!payload.patientName) {
      return res.status(400).json({ success: false, message: 'Patient name is required' });
    }
    if (!payload.digitalSignatureText || !payload.digitalSignatureText.trim()) {
      return res.status(400).json({ success: false, message: 'Typed signature is required' });
    }

    // Attach metadata
    payload.ipAddress = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress || null;
    payload.userAgent = req.headers['user-agent'] || null;

    const doc = new OPDConsent(payload);
    await doc.save();

    return res.status(201).json({ success: true, message: 'Consent saved', data: { id: doc._id } });
  } catch (error) {
    console.error('Error creating OPD consent:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all consents (supports pagination and search)
export const getAllOPDConsents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const [items, total] = await Promise.all([
      OPDConsent.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      OPDConsent.countDocuments(filter)
    ]);

    return res.status(200).json({ success: true, data: items, pagination: { page, limit, total } });
  } catch (error) {
    console.error('Error fetching OPD consents:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get single consent by id
export const getOPDConsentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await OPDConsent.findById(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.status(200).json({ success: true, data: doc });
  } catch (error) {
    console.error('Error fetching OPD consent by id:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete consent
export const deleteOPDConsent = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await OPDConsent.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting OPD consent:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
