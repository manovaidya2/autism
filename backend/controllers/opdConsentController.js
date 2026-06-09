import OPDConsent from '../models/OPDConsent.js';
import PDFDocument from 'pdfkit';

const pdfText = (value, fallback = '-') => {
  const text = String(value ?? '').replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ').trim();
  return text || fallback;
};

const addWrappedText = (doc, text, x, y, options = {}) => {
  const value = pdfText(text);
  doc.text(value, x, y, options);
  return y + doc.heightOfString(value, options) + (options.gap || 8);
};

const ensurePdfSpace = (doc, y, needed = 80) => {
  if (y + needed <= doc.page.height - 60) return y;
  doc.addPage();
  return 50;
};

const safeFilename = (value) => (
  String(value || 'patient')
    .replace(/[^a-z0-9_-]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'patient'
);

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

// Download consent as PDF
export const downloadOPDConsentPDF = async (req, res) => {
  try {
    const consent = await OPDConsent.findById(req.params.id);
    if (!consent) return res.status(404).json({ success: false, message: 'Not found' });

    const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
    const filename = `OPD_Consent_${safeFilename(consent.patientName)}_${consent._id}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    doc.rect(0, 0, doc.page.width, 72).fill('#4f46e5');
    doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
      .text('OPD CONSENT FORM', 0, 18, { align: 'center' });
    doc.fontSize(11).font('Helvetica')
      .text('Patient Consent Record', 0, 45, { align: 'center' });

    let y = 95;

    doc.fillColor('#4f46e5').fontSize(13).font('Helvetica-Bold')
      .text('PATIENT DETAILS', 50, y);
    y += 22;

    doc.fillColor('#111827').fontSize(10).font('Helvetica');
    doc.text(`Patient Name: ${pdfText(consent.patientName)}`, 50, y);
    doc.text(`Mobile: ${pdfText(consent.mobile)}`, 310, y);
    y += 18;
    doc.text(`Age: ${pdfText(consent.age)}`, 50, y);
    doc.text(`Gender: ${pdfText(consent.gender)}`, 310, y);
    y += 18;
    y = addWrappedText(doc, `Address: ${pdfText(consent.address)}`, 50, y, { width: 495, gap: 12 });

    y = ensurePdfSpace(doc, y, 70);
    doc.fillColor('#4f46e5').fontSize(13).font('Helvetica-Bold')
      .text('RELATIVE / GUARDIAN DETAILS', 50, y);
    y += 22;
    doc.fillColor('#111827').fontSize(10).font('Helvetica');
    doc.text(`Relative Name: ${pdfText(consent.relativeName)}`, 50, y);
    doc.text(`Relative Mobile: ${pdfText(consent.relativeMobile)}`, 310, y);
    y += 28;

    y = ensurePdfSpace(doc, y, 80);
    doc.fillColor('#4f46e5').fontSize(13).font('Helvetica-Bold')
      .text('SIGNATURE', 50, y);
    y += 22;
    doc.fillColor('#111827').fontSize(10).font('Helvetica');
    doc.text(`Typed Signature: ${pdfText(consent.digitalSignatureText)}`, 50, y);
    y += 18;
    doc.text(`Signature Method: ${pdfText(consent.signatureMethod)}`, 50, y);
    y += 18;
    doc.text(`Consent Accepted: ${consent.consentAccepted ? 'Yes' : 'No'}`, 50, y);
    y += 16;

    if (consent.signatureImage) {
      try {
        const base64Data = consent.signatureImage.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        doc.image(imageBuffer, 50, y, { fit: [180, 70] });
        y += 82;
      } catch (err) {
        y = addWrappedText(doc, 'Signature image could not be loaded.', 50, y, { width: 495, gap: 12 });
      }
    }

    y = ensurePdfSpace(doc, y, 90);
    doc.fillColor('#4f46e5').fontSize(13).font('Helvetica-Bold')
      .text('CONSENT CLAUSES', 50, y);
    y += 22;

    const clauses = Array.isArray(consent.consentClauses) ? consent.consentClauses : [];
    if (!clauses.length) {
      doc.fillColor('#111827').fontSize(10).font('Helvetica')
        .text('No consent clauses stored with this submission.', 50, y);
      y += 18;
    }

    clauses.forEach((clause, index) => {
      const number = clause.number || index + 1;
      const clauseText = pdfText(clause.english);
      const textOptions = { width: 470, gap: 10 };
      const height = doc.heightOfString(clauseText || '-', textOptions) + 18;

      y = ensurePdfSpace(doc, y, height);
      doc.fillColor('#111827').fontSize(10).font('Helvetica-Bold')
        .text(`${number}.`, 50, y);
      doc.font('Helvetica').fillColor('#374151');
      y = addWrappedText(doc, clauseText || '-', 75, y, textOptions);
    });

    y = ensurePdfSpace(doc, y, 70);
    doc.moveTo(50, y).lineTo(545, y).strokeColor('#d1d5db').stroke();
    y += 12;
    doc.fillColor('#6b7280').fontSize(9).font('Helvetica');
    doc.text(`Submission ID: ${consent._id}`, 50, y);
    y += 14;
    doc.text(`Submitted on: ${new Date(consent.createdAt).toLocaleString('en-IN')}`, 50, y);

    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fillColor('#9ca3af').fontSize(8).font('Helvetica')
        .text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 50, doc.page.height - 35)
        .text(`Page ${i + 1} of ${range.count}`, 0, doc.page.height - 35, { align: 'center' });
    }

    doc.end();
  } catch (error) {
    console.error('OPD consent PDF generation error:', error);
    return res.status(500).json({ success: false, message: 'Error generating PDF', error: error.message });
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
