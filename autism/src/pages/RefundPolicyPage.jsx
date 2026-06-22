import React, { useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';

const RefundPolicyPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    age: '',
    gender: '',
    acceptTerms: false,
    signatureType: '',
    signatureData: '',
    signatureFile: null,
    relationship: '',
    relativeName: '',
    relativeMobile: '',
    address: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const drawnSignatureRef = useRef('');
  const [signatureError, setSignatureError] = useState('');

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

  // Drawing functions for canvas signature
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1e1e2f';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    const signatureDataUrl = canvas.toDataURL();
    drawnSignatureRef.current = signatureDataUrl;
    setFormData(prev => ({ ...prev, signatureData: signatureDataUrl }));
  };

  const clearSignature = () => {
    isDrawingRef.current = false;
    drawnSignatureRef.current = '';
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setFormData(prev => ({ ...prev, signatureData: '' }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSignatureError('File size should be less than 2MB / फ़ाइल का आकार 2MB से कम होना चाहिए');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, signatureFile: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureTypeChange = (type) => {
    setFormData(prev => ({ ...prev, signatureType: type }));
    setSignatureError('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  React.useEffect(() => {
    if (formData.signatureType !== 'draw' || !drawnSignatureRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const signature = new Image();
    signature.onload = () => {
      if (canvasRef.current === canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(signature, 0, 0, canvas.width, canvas.height);
      }
    };
    signature.src = drawnSignatureRef.current;
  }, [formData.signatureType]);

  const validateSignature = () => {
    if (formData.signatureType === 'draw' && !formData.signatureData) {
      setSignatureError('कृपया डिजिटल हस्ताक्षर करें / Please provide digital signature');
      return false;
    }
    if (formData.signatureType === 'upload' && !formData.signatureFile) {
      setSignatureError('कृपया हस्ताक्षर की फाइल अपलोड करें / Please upload signature file');
      return false;
    }
    if (!formData.signatureType) {
      setSignatureError('कृपया हस्ताक्षर विधि चुनें / Please select signature method');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      mobile: '',
      age: '',
      gender: '',
      acceptTerms: false,
      signatureType: '',
      signatureData: '',
      signatureFile: null,
      relationship: '',
      relativeName: '',
      relativeMobile: '',
      address: '',
      date: new Date().toISOString().split('T')[0]
    });
    clearSignature();
    setSignatureError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert('कृपया नीति की शर्तों को स्वीकार करें। / Please accept the policy terms to continue.');
      return;
    }
    if (!formData.patientName || !formData.mobile || !formData.age || !formData.gender) {
      alert('कृपया सभी आवश्यक जानकारी भरें। / Please fill all required information.');
      return;
    }
    if (!formData.relationship || !formData.relativeName || !formData.address) {
      alert('कृपया सभी अतिरिक्त जानकारी भरें। / Please fill all additional information.');
      return;
    }
    if (!validateSignature()) {
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');

    try {
      const submitData = {
        patientName: formData.patientName,
        mobile: formData.mobile,
        age: parseInt(formData.age),
        gender: formData.gender,
        relationship: formData.relationship,
        relativeName: formData.relativeName,
        relativeMobile: formData.relativeMobile,
        address: formData.address,
        date: formData.date,
        signatureType: formData.signatureType,
        signatureData: formData.signatureData,
        signatureFile: formData.signatureFile,
        acceptTerms: formData.acceptTerms
      };

      const response = await axiosInstance.post('/refundpolicy/submit', submitData);
      
      if (response.data.success) {
        setShowSuccess(true);
        resetForm();
        setTimeout(() => setShowSuccess(false), 5000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setShowError(true);
      setErrorMessage(error.response?.data?.message || error.message || 'Something went wrong. Please try again.');
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              <div>
                <strong>✓ नीति सफलतापूर्वक स्वीकृत! / Policy accepted successfully!</strong>
                <p className="text-sm mt-1">Your submission has been recorded. / आपका सबमिशन रिकॉर्ड कर लिया गया है।</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <div>
                <strong>❌ Error / त्रुटि:</strong>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Policy Card - No scrollable containers */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 py-6 sm:px-8 sm:py-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-tight">
              रिफंड एवं दवा नीति / Refund & Medicine Policy
            </h1>
            <p className="text-purple-200 text-center text-sm mt-2 font-medium">
              आयुर्वेद वेलनेस क्लिनिक / Ayurveda Wellness Clinic
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Patient Information Section */}
            <div className="border-b border-purple-100 bg-purple-50/20 px-6 py-5 sm:px-8">
              <h2 className="text-lg font-semibold text-purple-800 border-l-4 border-purple-500 pl-3 mb-4">
                रोगी की जानकारी / Patient Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    रोगी का नाम / Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="पूरा नाम / Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    मोबाइल नंबर / Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10 अंकों का मोबाइल / 10-digit mobile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    आयु / Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="वर्ष / Years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    min="0"
                    max="120"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    लिंग / Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        required
                      /> पुरुष / Male
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      /> स्त्री / Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Clauses List - Full display without scroll */}
            <div className="px-6 py-6 sm:px-8">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                <h3 className="text-md font-semibold text-gray-700 uppercase tracking-wide">
                  नियम एवं स्वीकृति / Terms & Acknowledgment
                </h3>
              </div>
              <div className="space-y-3">
                {hindiContent.map((hindiClause, index) => (
                  <div key={index} className="p-3 rounded-lg bg-purple-50/30 hover:bg-purple-50 transition-colors duration-150 border border-purple-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-purple-700 text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base mb-1">
                          {hindiClause}
                        </p>
                        <p className="text-gray-500 leading-relaxed text-xs sm:text-sm border-t border-purple-100 pt-1 mt-1">
                          {englishContent[index]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Fields */}
            <div className="border-t border-purple-100 px-6 py-5 sm:px-8 bg-white">
              <h2 className="text-lg font-semibold text-purple-800 border-l-4 border-purple-500 pl-3 mb-4">
                अतिरिक्त जानकारी / Additional Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Relationship with Patient / रोगी से संबंध <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    placeholder="पिता / माता / पति / भाई आदि"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Name of Relative / संबंधी का नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relativeName"
                    value={formData.relativeName}
                    onChange={handleInputChange}
                    placeholder="संबंधी का पूरा नाम"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Relative's Mobile No. / संबंधी का मोबाइल नंबर
                  </label>
                  <input
                    type="tel"
                    name="relativeMobile"
                    value={formData.relativeMobile}
                    onChange={handleInputChange}
                    placeholder="10 अंकों का मोबाइल"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    pattern="[0-9]{10}"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Date / तारीख <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Address / पता <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="पूरा पता / Full address"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="border-t border-purple-100 px-6 py-5 sm:px-8 bg-purple-50/10">
              <h2 className="text-lg font-semibold text-purple-800 border-l-4 border-purple-500 pl-3 mb-4">
                Signature / Thumb Impression
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Signature Method <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="draw"
                      checked={formData.signatureType === 'draw'}
                      onChange={() => handleSignatureTypeChange('draw')}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>Draw Digital Signature</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="upload"
                      checked={formData.signatureType === 'upload'}
                      onChange={() => handleSignatureTypeChange('upload')}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>Upload Signature Image</span>
                  </label>
                </div>
              </div>

              {formData.signatureType === 'draw' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Draw Your Signature</label>
                  <div className="border-2 border-purple-300 rounded-lg overflow-hidden bg-white">
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={150}
                      className="w-full h-32 sm:h-36 cursor-crosshair touch-none"
                      style={{ touchAction: 'none' }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Signature
                  </button>
                </div>
              )}

              {formData.signatureType === 'upload' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Signature Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  {formData.signatureFile && (
                    <div className="mt-2">
                      <p className="text-xs text-green-600">✓ Signature uploaded successfully</p>
                      <img src={formData.signatureFile} alt="Signature preview" className="mt-2 h-16 border border-gray-200 rounded" />
                    </div>
                  )}
                </div>
              )}

              {signatureError && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  ⚠️ {signatureError}
                </div>
              )}
            </div>

            {/* Acknowledgment & Submit Button */}
            <div className="bg-purple-50/40 px-6 py-5 sm:px-8 border-t border-purple-100">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    id="policyAccept"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-0.5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    required
                  />
                  <label htmlFor="policyAccept" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                    <span className="block">मैं पुष्टि करता/करती हूँ कि मैंने उपरोक्त रिफंड एवं दवा नीति को पढ़ा, समझा और सहमत हूँ।</span>
                    <span className="block text-gray-500 text-xs mt-1">I confirm that I have read, understood, and agree to the above Refund & Medicine Policy.</span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : (
                    'मैं नीति स्वीकार करता/करती हूँ / I Accept the Policy'
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic text-center sm:text-left">
                By clicking "I Accept the Policy", you acknowledge that you have read, understood, and agreed to all the terms and conditions mentioned above.
              </p>
            </div>
          </form>

          {/* Footer Note */}
          <div className="bg-white px-6 py-3 text-center text-xs text-gray-400 border-t border-purple-100">
            यह दस्तावेज़ कानूनी रूप से बाध्यकारी है। कृपया अपने रिकॉर्ड के लिए एक प्रति रखें। / This document is legally binding. Please keep a copy for your records.
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <span className="inline-block px-3 py-1 bg-white/60 rounded-full shadow-sm">
            🌿 आयुर्वेद - समग्र उपचार / Ayurveda - Holistic Healing
          </span>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
