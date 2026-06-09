// controllers/refundpolicyController.js
import RefundPolicy from '../models/refundpolicyModel.js';
import PDFDocument from 'pdfkit';

// @desc    Download PDF for a submission
// @route   GET /api/refundpolicy/download/:id
export const downloadRefundPolicyPDF = async (req, res) => {
  try {
    const refundPolicy = await RefundPolicy.findById(req.params.id);

    if (!refundPolicy) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=RefundPolicy_${refundPolicy._id}.pdf`);

    doc.pipe(res);

    // Header
    doc.rect(0, 0, doc.page.width, 60).fill('#805ad5');
    doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
       .text('REFUND & MEDICINE POLICY', 0, 20, { align: 'center' });
    doc.fontSize(14).text('Acknowledgement Form', 0, 42, { align: 'center' });

    doc.fillColor('#000000');
    let yPos = 80;

    // Patient Info
    doc.fillColor('#805ad5').fontSize(14).font('Helvetica-Bold')
       .text('PATIENT INFORMATION', 50, yPos);
    yPos += 20;
    doc.fillColor('#000000').fontSize(10).font('Helvetica');
    doc.text(`Patient Name: ${refundPolicy.patientName}`, 50, yPos);
    doc.text(`Mobile: ${refundPolicy.mobile}`, 300, yPos); yPos += 16;
    doc.text(`Age: ${refundPolicy.age}`, 50, yPos);
    doc.text(`Gender: ${refundPolicy.gender === 'male' ? 'Male' : 'Female'}`, 300, yPos); yPos += 16;
    doc.text(`Address: ${refundPolicy.address}`, 50, yPos); yPos += 24;

    // Relative Info
    doc.fillColor('#805ad5').fontSize(14).font('Helvetica-Bold')
       .text('RELATIVE / GUARDIAN INFORMATION', 50, yPos);
    yPos += 20;
    doc.fillColor('#000000').fontSize(10).font('Helvetica');
    doc.text(`Relationship: ${refundPolicy.relationship}`, 50, yPos);
    doc.text(`Relative Name: ${refundPolicy.relativeName}`, 300, yPos); yPos += 16;
    doc.text(`Relative Mobile: ${refundPolicy.relativeMobile || 'N/A'}`, 50, yPos); yPos += 24;

    // Policy Clauses
    doc.fillColor('#805ad5').fontSize(14).font('Helvetica-Bold')
       .text('POLICY CLAUSES', 50, yPos);
    yPos += 16;

    const clauses = [
      "I acknowledge that Consultation Fee, Assessment Fee, Case Study Fee, and Treatment Planning Fee shall not be refunded under any circumstances.",
      "I acknowledge that the preparation of Customized Medicine will begin only after receiving Full Advance Payment.",
      "I acknowledge that the medicine manufacturing, packing, quality testing, and dispatch process will start only after full payment is received.",
      "I acknowledge that no medicine will be prepared, reserved, or dispatched without full payment.",
      "I acknowledge that once the medicine manufacturing process has started, the Order cannot be cancelled.",
      "I acknowledge that once the medicine is prepared or the manufacturing process has started, Medicine Charges will not be refunded under any circumstances.",
      "I acknowledge that even if I refuse treatment, delay treatment, discontinue treatment midway, or stop treatment based on any other advice, the Medicine Charges will not be refunded.",
      "I acknowledge that the courier service is operated by a Third Party Courier Service.",
      "I acknowledge that delays in courier delivery may occur due to transport problems, regional delays, natural disasters, network problems, or technical reasons.",
      "I acknowledge that the clinic shall not be directly responsible for delays occurring in courier delivery.",
      "I acknowledge that in case of wrong address, phone switched off, failure to receive the Parcel, or refusal of Delivery, I will have to pay additional charges for re-dispatch.",
      "I acknowledge that the results of Ayurvedic medicines may vary from patient to patient, and no guarantee is given for results within a fixed time period.",
      "I acknowledge that if I use other medicines, intoxication, supplements, or other treatment methods without medical advice, then the clinic shall not be responsible for the consequences.",
      "I have personally read and understood this Refund & Medicine Policy, or it has been read out and explained to me."
    ];

    for (let i = 0; i < clauses.length; i++) {
      if (yPos > 700) { doc.addPage(); yPos = 50; }

      doc.fillColor('#000000').fontSize(9).font('Helvetica-Bold')
         .text(`${i + 1}.`, 50, yPos);

      const lines = doc.splitTextToSize(clauses[i], doc.page.width - 120);
      doc.font('Helvetica').fillColor('#333333')
         .text(lines, 65, yPos);
      yPos += (lines.length * 13) + 6;
    }

    // Signature
    if (yPos > 700) { doc.addPage(); yPos = 50; }
    yPos += 10;
    doc.fillColor('#805ad5').fontSize(14).font('Helvetica-Bold')
       .text('SIGNATURE', 50, yPos);
    yPos += 18;

    doc.fillColor('#000000').fontSize(10).font('Helvetica')
       .text(`Signature Type: ${refundPolicy.signatureType === 'draw' ? 'Drawn Signature' : 'Uploaded Signature'}`, 50, yPos);
    yPos += 16;

    if (refundPolicy.signatureData || refundPolicy.signatureFile) {
      try {
        const signatureUrl = refundPolicy.signatureData || refundPolicy.signatureFile;
        const base64Data = signatureUrl.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        doc.image(imageBuffer, doc.page.width / 2 - 75, yPos, { width: 150, height: 50 });
      } catch (err) {
        doc.text('Signature image could not be loaded', 50, yPos);
      }
    } else {
      doc.text('No signature available', 50, yPos);
    }

    // Footer on all pages
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fillColor('#999999').fontSize(8)
         .text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 50, doc.page.height - 30)
         .text(`ID: ${refundPolicy._id}`, doc.page.width - 200, doc.page.height - 30)
         .text(`Page ${i + 1} of ${pageCount}`, doc.page.width / 2 - 20, doc.page.height - 30);
    }

    doc.end();

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ success: false, message: 'Error generating PDF', error: error.message });
  }
};

// @desc    Submit new policy acceptance
// @route   POST /api/refundpolicy/submit
export const submitRefundPolicy = async (req, res) => {
  try {
    const {
      patientName, mobile, age, gender, relationship, relativeName,
      relativeMobile, address, date, signatureType, signatureData,
      signatureFile, acceptTerms
    } = req.body;

    if (!patientName || !mobile || !age || !gender)
      return res.status(400).json({ success: false, message: 'Please fill all required patient information' });

    if (!relationship || !relativeName || !address)
      return res.status(400).json({ success: false, message: 'Please fill all required additional information' });

    if (!acceptTerms)
      return res.status(400).json({ success: false, message: 'Please accept the policy terms' });

    if (!signatureType)
      return res.status(400).json({ success: false, message: 'Please provide signature' });

    if (signatureType === 'draw' && !signatureData)
      return res.status(400).json({ success: false, message: 'Please draw your signature' });

    if (signatureType === 'upload' && !signatureFile)
      return res.status(400).json({ success: false, message: 'Please upload signature image' });

    const newRefundPolicy = new RefundPolicy({
      patientName, mobile, age, gender, relationship, relativeName,
      relativeMobile: relativeMobile || '', address,
      date: date || new Date(), signatureType,
      signatureData: signatureData || '',
      signatureFile: signatureFile || '',
      acceptTerms, submittedAt: new Date()
    });

    await newRefundPolicy.save();

    res.status(201).json({
      success: true,
      message: 'Policy accepted successfully',
      data: { id: newRefundPolicy._id, patientName: newRefundPolicy.patientName, submittedAt: newRefundPolicy.submittedAt }
    });

  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting policy', error: error.message });
  }
};

// @desc    Get all policy submissions
// @route   GET /api/refundpolicy/all
export const getAllRefundPolicies = async (req, res) => {
  try {
    const refundPolicies = await RefundPolicy.find().sort({ submittedAt: -1 });
    res.status(200).json({ success: true, count: refundPolicies.length, data: refundPolicies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching submissions', error: error.message });
  }
};

// @desc    Get single policy submission by ID
// @route   GET /api/refundpolicy/:id
export const getRefundPolicyById = async (req, res) => {
  try {
    const refundPolicy = await RefundPolicy.findById(req.params.id);
    if (!refundPolicy)
      return res.status(404).json({ success: false, message: 'Submission not found' });
    res.status(200).json({ success: true, data: refundPolicy });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching submission', error: error.message });
  }
};

// @desc    Search submissions by mobile or name
// @route   GET /api/refundpolicy/search
export const searchRefundPolicies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q)
      return res.status(400).json({ success: false, message: 'Search query is required' });

    const refundPolicies = await RefundPolicy.find({
      $or: [
        { mobile: { $regex: q, $options: 'i' } },
        { patientName: { $regex: q, $options: 'i' } },
        { relativeName: { $regex: q, $options: 'i' } }
      ]
    }).sort({ submittedAt: -1 });

    res.status(200).json({ success: true, count: refundPolicies.length, data: refundPolicies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching submissions', error: error.message });
  }
};

// @desc    Delete submission by ID
// @route   DELETE /api/refundpolicy/:id
export const deleteRefundPolicy = async (req, res) => {
  try {
    const refundPolicy = await RefundPolicy.findByIdAndDelete(req.params.id);
    if (!refundPolicy)
      return res.status(404).json({ success: false, message: 'Submission not found' });
    res.status(200).json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting submission', error: error.message });
  }
};

// @desc    Get statistics
// @route   GET /api/refundpolicy/stats
export const getRefundPolicyStats = async (req, res) => {
  try {
    const totalCount = await RefundPolicy.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await RefundPolicy.countDocuments({ submittedAt: { $gte: today } });
    const maleCount = await RefundPolicy.countDocuments({ gender: 'male' });
    const femaleCount = await RefundPolicy.countDocuments({ gender: 'female' });

    res.status(200).json({ success: true, data: { total: totalCount, today: todayCount, male: maleCount, female: femaleCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching statistics', error: error.message });
  }
};