import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Adminrefundpolicy = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    male: 0,
    female: 0
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [downloading, setDownloading] = useState(false);

  // Hindi content based on the PDF
  const hindiContent = [
    "मैं स्वीकार करता/करती हूँ कि Consultation Fee, Assessment Fee, Case Study Fee और Treatment Planning Fee किसी भी परिस्थिति में Refund नहीं की जाएगी।",
    "मैं स्वीकार करता/करती हूँ कि Customized Medicine का निर्माण केवल Full Advance Payment प्राप्त होने के बाद ही प्रारम्भ किया जाएगा।",
    "मैं स्वीकार करता/करती हूँ कि पूर्ण भुगतान के बाद ही औषधि निर्माण, पैकिंग, गुणवत्ता परीक्षण और डिस्पैच प्रक्रिया शुरू होगी।",
    "मैं स्वीकार करता/करती हूँ कि बिना पूर्ण भुगतान के कोई भी औषधि तैयार, आरक्षित या डिस्पैच नहीं की जाएगी।",
    "मैं स्वीकार करता/करती हूँ कि औषधि निर्माण प्रक्रिया प्रारम्भ होने के बाद Order Cancel नहीं किया जा सकता।",
    "मैं स्वीकार करता/करती हूँ कि औषधि तैयार हो जाने या निर्माण प्रक्रिया शुरू होने के बाद Medicine Charges किसी भी परिस्थिति में Refund नहीं होंगे।",
    "मैं स्वीकार करता/करती हूँ कि यदि मैं उपचार लेने से मना करता/करती हूँ, विलम्ब करता/करती हूँ, उपचार बीच में छोड़ता/छोड़ती हूँ या किसी अन्य सलाह से उपचार बंद करता/करती हूँ, तो भी Medicine Charges Refund नहीं होंगे।",
    "मैं स्वीकार करता/करती हूँ कि कोरियर सेवा Third Party Courier Service द्वारा संचालित होती है।",
    "मैं स्वीकार करता/करती हूँ कि ट्रांसपोर्ट समस्या, क्षेत्रीय देरी, प्राकृतिक आपदा, नेटवर्क समस्या या तकनीकी कारणों से कोरियर में विलम्ब संभव है।",
    "मैं स्वीकार करता/करती हूँ कि कोरियर में होने वाली देरी के लिए क्लिनिक प्रत्यक्ष रूप से उत्तरदायी नहीं होगा।",
    "मैं स्वीकार करता/करती हूँ कि गलत पता, फोन बंद, Parcel Receive न करने या Delivery Refuse करने पर पुन: Dispatch का अतिरिक्त शुल्क मुझे देना होगा।",
    "मैं स्वीकार करता/करती हूँ कि आयुर्वेदिक औषधियों के परिणाम प्रत्येक रोगी में अलग-अलग हो सकते हैं और किसी निश्चित समय में परिणाम की गारंटी नहीं दी जाती।",
    "मैं स्वीकार करता/करती हूँ कि बिना चिकित्सकीय सलाह के अन्य दवाएँ, नशा, supplements या अन्य उपचार पद्धतियों का उपयोग करने पर उसके परिणामों हेतु क्लिनिक उत्तरदायी नहीं होगा।",
    "मैंने इस Refund & Medicine Policy को स्वयं पढ़ा/समझा है अथवा मुझे पढ़कर समझाया गया है।"
  ];

  // English content based on the PDF
  const englishContent = [
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
    "I acknowledge that if I use other medicines, intoxication, supplements, or other treatment methods without medical advice, then the clinic shall not be responsible for the consequences arising from it.",
    "I have personally read and understood this Refund & Medicine Policy, or it has been read out and explained to me."
  ];

  // Function to generate PDF for a single submission
const generateSinglePDF = async (submission) => {
  setDownloading(true);
  try {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(128, 90, 213);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('REFUND & MEDICINE POLICY', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Acknowledgement Form', pageWidth / 2, 32, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    let yPos = 55;

    // ── Patient Information ──
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(128, 90, 213);
    doc.text('PATIENT INFORMATION', 14, yPos);
    yPos += 7;

    // ✅ CORRECT — autoTable(doc, {...})
    autoTable(doc, {
      startY: yPos,
      head: [],
      body: [
        ['Patient Name', submission.patientName || 'N/A', 'Mobile', submission.mobile || 'N/A'],
        ['Age', String(submission.age || 'N/A'), 'Gender', submission.gender === 'male' ? 'Male' : 'Female'],
        ['Address', submission.address || 'N/A', 'Date', new Date(submission.date).toLocaleDateString('en-IN')]
      ],
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', fillColor: [245, 240, 255] },
        1: { cellWidth: 62 },
        2: { cellWidth: 28, fontStyle: 'bold', fillColor: [245, 240, 255] },
        3: { cellWidth: 62 }
      },
      margin: { left: 14, right: 14 }
    });

    yPos = doc.lastAutoTable.finalY + 8;

    // ── Relative Information ──
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(128, 90, 213);
    doc.text('RELATIVE / GUARDIAN INFORMATION', 14, yPos);
    yPos += 7;

    // ✅ CORRECT — autoTable(doc, {...})
    autoTable(doc, {
      startY: yPos,
      head: [],
      body: [
        ['Relationship', submission.relationship || 'N/A', 'Relative Name', submission.relativeName || 'N/A'],
        ['Relative Mobile', submission.relativeMobile || 'N/A', 'Submitted', new Date(submission.submittedAt).toLocaleDateString('en-IN')]
      ],
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', fillColor: [245, 240, 255] },
        1: { cellWidth: 62 },
        2: { cellWidth: 28, fontStyle: 'bold', fillColor: [245, 240, 255] },
        3: { cellWidth: 62 }
      },
      margin: { left: 14, right: 14 }
    });

    yPos = doc.lastAutoTable.finalY + 8;

    // ── Policy Clauses ──
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(128, 90, 213);
    doc.text('POLICY CLAUSES', 14, yPos);
    yPos += 7;

  for (let i = 0; i < englishContent.length; i++) {
  if (yPos > 260) { doc.addPage(); yPos = 20; }

  // Clause number
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text(`${i + 1}.`, 14, yPos);

  // English only
  const englishLines = doc.splitTextToSize(englishContent[i], pageWidth - 32);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.text(englishLines, 20, yPos);
  yPos += (englishLines.length * 5) + 5;
}

    // ── Signature ──
    if (yPos > 250) { doc.addPage(); yPos = 20; }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(128, 90, 213);
    doc.text('SIGNATURE', 14, yPos);
    yPos += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Signature Type: ${submission.signatureType === 'draw' ? 'Drawn Signature' : 'Uploaded Signature'}`,
      14, yPos
    );
    yPos += 8;

    if (submission.signatureData || submission.signatureFile) {
      try {
        const signatureUrl = submission.signatureData || submission.signatureFile;
        const imgWidth = 60;
        const imgHeight = 28;
        doc.addImage(signatureUrl, 'PNG', pageWidth / 2 - imgWidth / 2, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 8;
      } catch {
        doc.text('Signature image could not be loaded', 14, yPos);
        yPos += 8;
      }
    } else {
      doc.text('No signature available', 14, yPos);
    }

    // ── Footer ──
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(7.5);
    doc.setTextColor(160, 160, 160);
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, pageHeight - 8);
    doc.text(
      `ID: ${submission._id}`,
      pageWidth - 14,
      pageHeight - 8,
      { align: 'right' }
    );

    doc.save(`RefundPolicy_${submission.patientName}_${submission._id}.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    setDownloading(false);
  }
};

  // Function to download PDF from server (alternative approach)
  const downloadPDFFromServer = async (id) => {
    setDownloading(true);
    try {
      const response = await axiosInstance.get(`/refundpolicy/download/${id}`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RefundPolicy_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Fetch all submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/refundpolicy/all');
      if (response.data.success) {
        setSubmissions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      alert('Error fetching submissions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/refundpolicy/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Search submissions
  const searchSubmissions = async () => {
    if (!searchTerm.trim()) {
      fetchSubmissions();
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/refundpolicy/search?q=${searchTerm}`);
      if (response.data.success) {
        setSubmissions(response.data.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('Error searching submissions');
    } finally {
      setLoading(false);
    }
  };

  // Delete submission
  const deleteSubmission = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        const response = await axiosInstance.delete(`/refundpolicy/${id}`);
        if (response.data.success) {
          alert('Submission deleted successfully');
          fetchSubmissions();
          fetchStats();
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting submission');
      }
    }
  };

  // View submission details
  const viewSubmission = async (id) => {
    try {
      const response = await axiosInstance.get(`/refundpolicy/${id}`);
      if (response.data.success) {
        setSelectedSubmission(response.data.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      alert('Error loading submission details');
    }
  };

  // Export all submissions to CSV
  const exportToCSV = () => {
    try {
      const headers = ['Patient Name', 'Mobile', 'Age', 'Gender', 'Relationship', 'Relative Name', 'Relative Mobile', 'Address', 'Date', 'Signature Type', 'Submitted At'];
      const csvData = submissions.map(item => [
        item.patientName,
        item.mobile,
        item.age,
        item.gender,
        item.relationship,
        item.relativeName,
        item.relativeMobile || '',
        item.address,
        new Date(item.date).toLocaleDateString('en-IN'),
        item.signatureType,
        new Date(item.submittedAt).toLocaleString('en-IN')
      ]);
      
      const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `refund_policy_submissions_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      alert('CSV exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting CSV');
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-lg">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Refund Policy Admin Panel
              </h1>
              <p className="text-purple-200 text-sm mt-1">Manage and view all policy submissions</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base"
              >
                📊 Export CSV
              </button>
              <button
                onClick={() => {
                  fetchSubmissions();
                  fetchStats();
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total</p>
                <p className="text-xl sm:text-3xl font-bold text-purple-700">{stats.total}</p>
              </div>
              <div className="text-2xl sm:text-4xl text-purple-300">📊</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Today</p>
                <p className="text-xl sm:text-3xl font-bold text-green-600">{stats.today}</p>
              </div>
              <div className="text-2xl sm:text-4xl text-green-300">📅</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Male</p>
                <p className="text-xl sm:text-3xl font-bold text-blue-600">{stats.male}</p>
              </div>
              <div className="text-2xl sm:text-4xl text-blue-300">👨</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Female</p>
                <p className="text-xl sm:text-3xl font-bold text-pink-600">{stats.female}</p>
              </div>
              <div className="text-2xl sm:text-4xl text-pink-300">👩</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Search Submissions
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchSubmissions()}
                placeholder="Search by name or mobile..."
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
              />
            </div>
            <div className="flex gap-2 items-end">
              <button
                onClick={searchSubmissions}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition text-sm"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchTerm('');
                  fetchSubmissions();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table - Responsive */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Relative</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Signature</th>
                  <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="10" className="px-3 py-8 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-700"></div>
                        <span className="ml-2 text-gray-500 text-sm">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="px-3 py-8 text-center text-gray-500 text-sm">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={item._id} className="hover:bg-purple-50 transition">
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">{item.patientName}</div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{item.mobile}</td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        {item.age}/{item.gender === 'male' ? 'M' : 'F'}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 truncate max-w-[80px]">{item.relativeName}</td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 truncate max-w-[80px]">{item.relationship}</td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 max-w-[120px] truncate">{item.address}</td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        {formatDateOnly(item.submittedAt)}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full ${
                          item.signatureType === 'draw' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.signatureType === 'draw' ? 'Drawn' : 'Uploaded'}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm">
                        <button
                          onClick={() => viewSubmission(item._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded mr-1 sm:mr-2 transition text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => generateSinglePDF(item)}
                          disabled={downloading}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-3 py-1 rounded mr-1 sm:mr-2 transition text-xs"
                        >
                          {downloading ? '⏳' : '📄'}
                        </button>
                        <button
                          onClick={() => deleteSubmission(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded transition text-xs"
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && submissions.length > 0 && (
            <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="text-xs sm:text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, submissions.length)} of {submissions.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-purple-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal - Full Details */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h2 className="text-base sm:text-xl font-bold">Complete Submission Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-gray-200 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6">
              {/* Form Data Section */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 border-b border-purple-200 pb-2 mb-4">📋 Form Submission Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Patient Information</h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p><strong>patientName:</strong> {selectedSubmission.patientName}</p>
                      <p><strong>mobile:</strong> {selectedSubmission.mobile}</p>
                      <p><strong>age:</strong> {selectedSubmission.age}</p>
                      <p><strong>gender:</strong> {selectedSubmission.gender}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Relative Information</h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p><strong>relationship:</strong> {selectedSubmission.relationship}</p>
                      <p><strong>relativeName:</strong> {selectedSubmission.relativeName}</p>
                      <p><strong>relativeMobile:</strong> {selectedSubmission.relativeMobile || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg md:col-span-2">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Address</h4>
                    <p className="text-xs sm:text-sm break-words"><strong>address:</strong> {selectedSubmission.address}</p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Date Information</h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p><strong>date:</strong> {formatDateOnly(selectedSubmission.date)}</p>
                      <p><strong>submittedAt:</strong> {formatDate(selectedSubmission.submittedAt)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Signature Details</h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p><strong>signatureType:</strong> {selectedSubmission.signatureType}</p>
                      <p><strong>acceptTerms:</strong> {selectedSubmission.acceptTerms ? 'true' : 'false'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">Signature Preview</h4>
                    {(selectedSubmission.signatureData || selectedSubmission.signatureFile) ? (
                      <img
                        src={selectedSubmission.signatureData || selectedSubmission.signatureFile}
                        alt="Signature"
                        className="mt-2 border rounded p-2 max-h-24 sm:max-h-32 bg-white"
                      />
                    ) : (
                      <p className="text-gray-500 italic text-xs">No signature available</p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg md:col-span-2">
                    <h4 className="font-semibold text-purple-600 mb-2 text-sm">System Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <p><strong>_id:</strong> <span className="font-mono text-[10px] sm:text-xs break-all">{selectedSubmission._id}</span></p>
                      <p><strong>createdAt:</strong> {formatDate(selectedSubmission.createdAt)}</p>
                      <p><strong>updatedAt:</strong> {formatDate(selectedSubmission.updatedAt)}</p>
                      <p><strong>__v:</strong> {selectedSubmission.__v || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => generateSinglePDF(selectedSubmission)}
                    disabled={downloading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <span>📄</span> Download PDF
                  </button>
                </div>
              </div>

              {/* Policy Clauses */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-purple-700 border-b border-purple-200 pb-2 mb-4">📜 Refund & Medicine Policy Clauses</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {hindiContent.map((hindiClause, index) => (
                    <div key={index} className="p-2 sm:p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-purple-200 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-purple-700 text-[10px] sm:text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed text-xs sm:text-sm mb-1 sm:mb-2">
                            {hindiClause}
                          </p>
                          <p className="text-gray-500 leading-relaxed text-[10px] sm:text-xs border-t border-purple-100 pt-1 sm:pt-2 mt-1">
                            {englishContent[index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t flex justify-end gap-2">
              <button
                onClick={() => generateSinglePDF(selectedSubmission)}
                disabled={downloading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm"
              >
                {downloading ? 'Generating...' : 'Download PDF'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminrefundpolicy;