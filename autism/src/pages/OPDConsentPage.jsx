import React, { useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { FileText, CheckCircle, User, Calendar, Phone, MapPin, Heart, Shield, Award, Clock, Pen, Fingerprint, Mail, Star, Upload, X, Trash2 } from 'lucide-react';

const OpdConsentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    age: '',
    gender: '',
    address: '',
    relativeName: '',
    relativeMobile: '',
    consentAccepted: false,
    digitalSignatureText: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeLang, setActiveLang] = useState('both');
  const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'upload'
  const [signatureImage, setSignatureImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Canvas refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  // Initialize canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;
    
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4B0082';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;
  };
  
  // Start drawing
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };
  
  // Draw
  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };
  
  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.beginPath();
  };
  
  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4B0082';
  };
  
  // Get signature as data URL
  const getSignatureDataURL = () => {
    if (signatureMethod === 'draw' && canvasRef.current) {
      return canvasRef.current.toDataURL();
    }
    return signatureImage;
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignatureImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove uploaded signature
  const removeUploadedSignature = () => {
    setSignatureImage(null);
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName) {
      alert(activeLang === 'hindi' ? 'कृपया रोगी का नाम दर्ज करें' : 'Please enter patient name');
      return;
    }
    if (!formData.consentAccepted) {
      alert(activeLang === 'hindi' ? 'कृपया सहमति स्वीकार करें' : 'Please accept the consent to proceed');
      return;
    }
    if (!formData.digitalSignatureText?.trim()) {
      alert(activeLang === 'hindi' ? 'कृपया पूर्ण नाम टाइप करके हस्ताक्षर प्रदान करें' : 'Please type your full name for the signature');
      return;
    }

    // Check signature based on method
    if (signatureMethod === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas || canvas.toDataURL() === canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)) {
        alert(activeLang === 'hindi' ? 'कृपया कैनवास पर हस्ताक्षर करें' : 'Please draw your signature on the canvas');
        return;
      }
    } else if (signatureMethod === 'upload' && !signatureImage) {
      alert(activeLang === 'hindi' ? 'कृपया डिजिटल हस्ताक्षर अपलोड करें' : 'Please upload your digital signature');
      return;
    }

    const payload = {
      ...formData,
      signatureMethod,
      signatureImage: signatureMethod === 'draw' ? getSignatureDataURL() : signatureImage,
      consentClauses
    };

    (async () => {
      try {
        const res = await axiosInstance.post('/opd-consent/create', payload);
        if (res?.data?.success) {
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 4000);
          // Optionally clear form
          setFormData({ patientName: '', mobile: '', age: '', gender: '', address: '', relativeName: '', relativeMobile: '', consentAccepted: false, digitalSignatureText: '' });
          setSignatureImage(null);
          clearCanvas();
        } else {
          alert(res?.data?.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Submit error', err);
        alert((err?.response?.data?.message) || 'Error submitting consent');
      }
    })();
  };
  
  const consentClauses = [
    { number: 1, hindi: "मैं यह स्वीकार करता/करती हूँ कि मैं मनोवैद्य चिकित्सालय में आयुर्वेदिक उपचार हेतु अपनी स्वेच्छा से सहमति प्रदान कर रहा/रही हूँ।", english: "I hereby acknowledge that I am voluntarily giving my consent for Ayurvedic treatment at Manovaidya Chikitsalaya." },
    { number: 2, hindi: "मैं स्वीकार करता/करती हूँ कि मेरा उपचार आयुर्वेद के सिद्धांतों, रोग की प्रकृति तथा मेरी शारीरिक एवं मानसिक स्थिति के अनुसार किया जाएगा।", english: "I acknowledge that my treatment will be conducted according to Ayurvedic principles, the nature of the disease, and my physical and mental condition." },
    { number: 3, hindi: "मैं स्वीकार करता/करती हूँ कि Consultation Fee, Assessment Fee, Case Study Fee और Treatment Planning Fee किसी भी परिस्थिति में Refund नहीं की जाएगी।", english: "I acknowledge that Consultation Fee, Assessment Fee, Case Study Fee, and Treatment Planning Fee shall not be refunded under any circumstances." },
    { number: 4, hindi: "मैं स्वीकार करता/करती हूँ कि आहार, दैनिक दिनचर्या, नींद, मानसिक स्थिति तथा जीवनशैली में सुधार उपचार का महत्वपूर्ण भाग है।", english: "I acknowledge that diet, daily routine, sleep, mental condition, and lifestyle improvement are important parts of the treatment." },
    { number: 5, hindi: "मुझे इस तथ्य की जानकारी दी गई है कि उपचार के परिणाम प्रत्येक रोगी में भिन्न हो सकते हैं। आयुर्वेदिक औषधियों एवं पंचकर्म उपचार से शीघ्र सफलता की कोई गारंटी नहीं है।", english: "I have been informed that treatment results may vary from patient to patient. There is no guarantee of immediate success with Ayurvedic medicines and Panchakarma treatment." },
    { number: 6, hindi: "मैं स्वीकार करता/करती हूँ कि रोगी की चिकित्सीय आवश्यकताओं के अनुसार रोगी-विशिष्ट आयुर्वेदिक औषधियाँ चिकित्सालय द्वारा तैयार की जा सकती हैं।", english: "I acknowledge that patient-specific customized Ayurvedic medicines may be prepared by the clinic according to the patient's medical requirements." },
    { number: 7, hindi: "मैं समझता/समझती हूँ कि पूर्व स्वास्थ्य स्थिति, चल रही दवाइयाँ, आहार में लापरवाही, मानसिक तनाव अथवा अन्य कारणों से उपचार के दौरान जटिलताएँ उत्पन्न हो सकती हैं। ऐसी स्थितियों में चिकित्सालय प्रत्यक्ष रूप से उत्तरदायी नहीं होगा।", english: "I understand that complications may arise during treatment due to previous health conditions, ongoing medications, dietary negligence, mental stress, or other reasons. The clinic shall not be directly liable in such circumstances." },
    { number: 8, hindi: "मैं स्वीकार करता/करती हूँ कि किसी भी गंभीर अथवा आपातकालीन स्थिति में रोगी को तुरंत निकटतम आपातकालीन अस्पताल से संपर्क करना होगा, क्योंकि मनोवैद्य चिकित्सालय में आपातकालीन सुविधाएँ उपलब्ध नहीं हैं।", english: "I acknowledge that in any serious or emergency medical condition, the patient must immediately contact the nearest emergency hospital, as Manovaidya Chikitsalaya does not provide emergency/ICU facilities." },
    { number: 9, hindi: "मैं स्वीकार करता/करती हूँ कि चिकित्सालय मुझे व्हाट्सएप, एसएमएस, कॉल, ईमेल के द्वारा प्रिस्क्रिप्शन, फॉलो-अप एवं उपचार संबंधी जानकारी भेज सकता है।", english: "I acknowledge that the clinic may send me prescriptions, follow-ups, reminders, and treatment information via WhatsApp, SMS, calls, or email." },
    { number: 10, hindi: "मैं स्वीकार करता/करती हूँ कि मानसिक एवं तंत्रिका संबंधी विकारों में भावनात्मक उतार-चढ़ाव, व्यवहार में परिवर्तन, नींद संबंधी समस्याएँ, चिंता अथवा मानसिक स्थिति में परिवर्तन हो सकते हैं।", english: "I acknowledge that in mental and neurological disorders, emotional fluctuations, behavioral changes, sleep disturbances, anxiety, or changes in mental condition may occur." },
    { number: 11, hindi: "मैं स्वीकार करता/करती हूँ कि बिना चिकित्सकीय सलाह उपचार बंद करने, दवाइयों का अनियमित सेवन करने के परिणामों के लिए चिकित्सालय उत्तरदायी नहीं होगा।", english: "I acknowledge that the clinic shall not be held responsible for consequences of discontinuing treatment without medical advice or taking medicines irregularly." },
    { number: 12, hindi: "मैं स्वीकार करता/करती हूँ कि उपचार से संबंधित अनुभव, समीक्षा का उपयोग शैक्षणिक, जागरूकता अथवा प्रचार-प्रसार हेतु किया जा सकता है।", english: "I acknowledge that treatment experiences and reviews may be used for educational, awareness, or promotional purposes." },
    { number: 13, hindi: "मैं स्वीकार करता/करती हूँ कि स्टाफ के साथ अभद्र भाषा, धमकी अथवा अनुचित व्यवहार की स्थिति में चिकित्सालय सेवाएँ बंद करने का अधिकार सुरक्षित रखता है।", english: "I acknowledge that the clinic reserves the right to discontinue services in case of abusive language, threats, or inappropriate behavior with staff." },
    { number: 14, hindi: "मैंने इस सहमति-पत्र को स्वयं पढ़ा/समझा है अथवा इसे मुझे पढ़कर सुनाया गया है और समझाया गया है।", english: "I have personally read/understood this consent form, or it has been read and explained to me." },
    { number: 15, hindi: "मैं सहमत हूँ कि यदि चिकित्सक आवश्यक समझें तो पंचकर्म, आयुर्वेदिक उपचार पद्धतियाँ, मानसिक स्वास्थ्य उपचार तथा अन्य समग्र उपचार प्रक्रियाओं की सलाह दी जा सकती है।", english: "I agree that if deemed necessary by the physician, recommendations may be made for Panchakarma, Ayurvedic therapies, mental health therapies, and other holistic treatment procedures." },
    { number: 16, hindi: "मैं सहमत हूँ कि परामर्शदाता को सत्रों की सीमा से बाहर होने वाली किसी भी हानि के लिए उत्तरदायी नहीं ठहराया जाएगा, बशर्ते उन्होंने व्यावसायिक एवं नैतिक मानकों के अनुरूप कार्य किया हो।", english: "I agree that the Counselor will not be held responsible for any harm outside the scope of sessions, provided they have acted professionally and within ethical boundaries." }
  ];
  
  const ClauseCard = ({ clause }) => {
    if (activeLang === 'hindi') {
      return (
        <div className="flex gap-3 py-3 border-b border-purple-100 last:border-0">
          <span className="font-bold text-purple-500 min-w-[32px] text-base">{clause.number}.</span>
          <p className="text-gray-700 font-devanagari leading-relaxed flex-1">{clause.hindi}</p>
        </div>
      );
    }
    if (activeLang === 'english') {
      return (
        <div className="flex gap-3 py-3 border-b border-purple-100 last:border-0">
          <span className="font-bold text-purple-500 min-w-[32px] text-base">{clause.number}.</span>
          <p className="text-gray-700 leading-relaxed flex-1">{clause.english}</p>
        </div>
      );
    }
    return (
      <div className="py-4 border-b border-purple-100 last:border-0">
        <div className="flex gap-3">
          <span className="font-bold text-purple-500 min-w-[32px] text-base">{clause.number}.</span>
          <div className="flex-1">
            <p className="text-gray-800 font-devanagari leading-relaxed">{clause.hindi}</p>
            <p className="text-gray-500 text-sm leading-relaxed mt-1">{clause.english}</p>
          </div>
        </div>
      </div>
    );
  };
  
  React.useEffect(() => {
    if (signatureMethod === 'draw' && canvasRef.current) {
      initCanvas();
      window.addEventListener('resize', initCanvas);
      return () => window.removeEventListener('resize', initCanvas);
    }
  }, [signatureMethod]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white shadow-md rounded-xl p-3 mb-4 border border-purple-100">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-lg">
              <FileText size={24} />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">मनोवैद्य चिकित्सालय</h1>
          <p className="text-purple-600 text-base font-medium mt-1">Manovaidya Chikitsalaya</p>
          <p className="text-gray-500 text-sm">Ayurveda & Mental Health Wellness Center</p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-300 to-purple-500 mx-auto my-3 rounded-full"></div>
          <div className="inline-flex items-center gap-2 bg-purple-100/60 px-4 py-1.5 rounded-full">
            <Star size={12} className="text-purple-500 fill-purple-500" />
            <span className="text-gray-700 text-sm font-medium">OPD सहमति पत्र (OPD Consent Form)</span>
          </div>
        </div>
        
        {/* Language Toggle */}
        <div className="flex justify-end mb-5">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex gap-1 border border-purple-200">
            <button onClick={() => setActiveLang('hindi')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeLang === 'hindi' ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:bg-purple-100'}`}>🇮🇳 हिंदी</button>
            <button onClick={() => setActiveLang('english')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeLang === 'english' ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:bg-purple-100'}`}>🇬🇧 English</button>
            <button onClick={() => setActiveLang('both')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeLang === 'both' ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:bg-purple-100'}`}>🔄 द्विभाषी</button>
          </div>
        </div>
        
        {/* Patient Information Card */}
        <div className="bg-white rounded-xl shadow-md border border-purple-100 mb-6 overflow-hidden">
          <div className="bg-purple-600 px-5 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2 text-base">
              <User size={18} />
              {activeLang === 'hindi' ? 'रोगी सूचना' : activeLang === 'english' ? 'Patient Information' : 'रोगी सूचना / Patient Information'}
            </h2>
            <p className="text-purple-200 text-xs mt-0.5">{activeLang === 'hindi' ? 'कृपया सभी जानकारी सही-सही भरें' : 'Please fill all details correctly'}</p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{activeLang === 'hindi' ? 'रोगी का पूरा नाम' : 'Full Patient Name'} <span className="text-red-500">*</span></label>
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-gray-50 text-sm transition-all" placeholder="e.g., Rajesh Kumar" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><Phone size={12} className="inline mr-1" /> {activeLang === 'hindi' ? 'मोबाइल नंबर' : 'Mobile Number'}</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><Calendar size={12} className="inline mr-1" /> {activeLang === 'hindi' ? 'आयु' : 'Age'}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm" placeholder="Years" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{activeLang === 'hindi' ? 'लिंग' : 'Gender'}</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm">
                  <option value="">{activeLang === 'hindi' ? 'चुनें' : 'Select'}</option>
                  <option value="male">पुरुष / Male</option>
                  <option value="female">स्त्री / Female</option>
                  <option value="other">अन्य / Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1"><MapPin size={12} className="inline mr-1" /> {activeLang === 'hindi' ? 'पता' : 'Address'}</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm" placeholder="City, District, State" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{activeLang === 'hindi' ? 'संबंधी का नाम' : 'Relative Name'}</label>
                <input type="text" name="relativeName" value={formData.relativeName} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm" placeholder="Father / Husband / Guardian" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><Phone size={12} className="inline mr-1" /> {activeLang === 'hindi' ? 'आपातकालीन संपर्क' : 'Emergency Contact'}</label>
                <input type="tel" name="relativeMobile" value={formData.relativeMobile} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm" placeholder="Emergency mobile number" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Consent Clauses Section */}
        <div className="bg-white rounded-xl shadow-md border border-purple-100 mb-6 overflow-hidden">
          <div className="bg-purple-600 px-5 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2 text-base">
              <Shield size={18} />
              {activeLang === 'hindi' ? 'सहमति की शर्तें' : activeLang === 'english' ? 'Terms of Consent' : 'सहमति की शर्तें / Consent Clauses'}
            </h2>
            <p className="text-purple-200 text-xs mt-0.5">{activeLang === 'hindi' ? 'कृपया सभी शर्तों को ध्यानपूर्वक पढ़ें' : 'Please read all terms carefully'}</p>
          </div>
          <div className="p-5 divide-y divide-purple-100">
            {consentClauses.map((clause) => (
              <ClauseCard key={clause.number} clause={clause} />
            ))}
          </div>
        </div>
        
        {/* Declaration & Signature Section */}
        <div className="bg-white rounded-xl shadow-md border border-purple-100 mb-6 overflow-hidden">
          <div className="bg-purple-600 px-5 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2 text-base">
              <CheckCircle size={18} />
              {activeLang === 'hindi' ? 'रोगी घोषणा एवं हस्ताक्षर' : activeLang === 'english' ? 'Patient Declaration & Signature' : 'रोगी घोषणा एवं हस्ताक्षर'}
            </h2>
          </div>
          <div className="p-5">
            {/* Consent Checkbox */}
            <div className="mb-5 p-4 bg-purple-50/40 rounded-lg border border-purple-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="consentAccepted" checked={formData.consentAccepted} onChange={handleChange} className="mt-0.5 w-4 h-4 text-purple-500 rounded focus:ring-purple-400" />
                <span className="text-gray-700 text-sm leading-relaxed font-medium">
                  {activeLang === 'hindi' 
                    ? 'मैं उपरोक्त सभी शर्तों को पढ़कर सहमत हूँ। मैं अपनी स्वेच्छा से आयुर्वेदिक उपचार हेतु पूर्ण सहमति प्रदान करता/करती हूँ।' 
                    : activeLang === 'english' 
                    ? 'I have read and agree to all the above terms. I voluntarily give my full consent for Ayurvedic treatment.'
                    : '✅ मैं उपरोक्त सभी शर्तों को पढ़कर सहमत हूँ। / I have read and agree to all the above terms.'}
                </span>
              </label>
            </div>
            
            {/* Signature Method Toggle */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Pen size={14} className="inline mr-1 text-purple-500" /> 
                {activeLang === 'hindi' ? 'हस्ताक्षर विधि' : 'Signature Method'} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSignatureMethod('draw')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${signatureMethod === 'draw' ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                >
                  ✍️ {activeLang === 'hindi' ? 'हाथ से लिखें' : 'Draw Signature'}
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMethod('upload')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${signatureMethod === 'upload' ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                >
                  📤 {activeLang === 'hindi' ? 'अपलोड करें' : 'Upload Signature'}
                </button>
              </div>
            </div>
            
            {/* Draw Signature Canvas */}
            {signatureMethod === 'draw' && (
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Pen size={14} className="inline mr-1 text-purple-500" /> 
                  {activeLang === 'hindi' ? 'नीचे हस्ताक्षर करें' : 'Sign below'} <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-purple-200 rounded-lg overflow-hidden bg-white">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={150}
                    style={{ width: '100%', height: '150px', touchAction: 'none' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="mt-2 text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 size={12} />
                  {activeLang === 'hindi' ? 'हस्ताक्षर साफ करें' : 'Clear Signature'}
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  {activeLang === 'hindi' ? 'माउस या टच का उपयोग करके ऊपर हस्ताक्षर करें' : 'Use mouse or touch to draw your signature above'}
                </p>
              </div>
            )}
            
            {/* Upload Signature */}
            {signatureMethod === 'upload' && (
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Upload size={14} className="inline mr-1 text-purple-500" /> 
                  {activeLang === 'hindi' ? 'डिजिटल हस्ताक्षर अपलोड करें' : 'Upload Digital Signature'} <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 bg-purple-50/20 text-center">
                  {!signatureImage ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="signatureUpload"
                      />
                      <label
                        htmlFor="signatureUpload"
                        className="cursor-pointer inline-flex flex-col items-center gap-2"
                      >
                        <Upload size={32} className="text-purple-400" />
                        <span className="text-sm text-gray-500">
                          {activeLang === 'hindi' ? 'यहाँ क्लिक करें या छवि ड्रॉप करें' : 'Click or drop image here'}
                        </span>
                        <span className="text-xs text-gray-400">PNG, JPG (Max 2MB)</span>
                      </label>
                    </>
                  ) : (
                    <div className="relative">
                      <img src={signatureImage} alt="Signature" className="max-h-24 mx-auto border rounded" />
                      <button
                        type="button"
                        onClick={removeUploadedSignature}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Text Signature Alternative */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Fingerprint size={14} className="inline mr-1 text-purple-500" /> 
                {activeLang === 'hindi' ? 'टाइप किया हुआ हस्ताक्षर (अनिवार्य)' : 'Typed Signature (Required)'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="digitalSignatureText"
                value={formData.digitalSignatureText}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 bg-gray-50 text-sm"
                placeholder={activeLang === 'hindi' ? 'पूरा नाम टाइप करें' : 'Type full name'}
              />
              <p className="text-xs text-gray-400 mt-1">
                {activeLang === 'hindi' ? 'यह आवश्यक है। कृपया अपना पूरा नाम यहाँ टाइप करें।' : 'This is required. Please type your full name here.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{activeLang === 'hindi' ? 'हस्ताक्षर की तारीख' : 'Signature Date'}</label>
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-700 text-sm">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><Clock size={14} className="inline mr-1 text-purple-500" /> {activeLang === 'hindi' ? 'समय' : 'Time'}</label>
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-700 text-sm">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button onClick={handleSubmit} className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              {activeLang === 'hindi' ? 'सहमति जमा करें' : activeLang === 'english' ? 'Submit Consent' : 'सहमति जमा करें / Submit Consent'}
            </button>
            
            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle size={16} />
                {activeLang === 'hindi' ? 'सहमति सफलतापूर्वक प्राप्त हो गई। धन्यवाद!' : 'Consent successfully recorded. Thank you!'}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-400 text-xs py-6 border-t border-purple-100 mt-2">
          <div className="flex justify-center items-center gap-6 flex-wrap mb-3">
            <span className="flex items-center gap-1"><Heart size={12} className="text-purple-400"/> आयुर्वेद से समग्र स्वास्थ्य</span>
            <span className="flex items-center gap-1"><Clock size={12} className="text-purple-400"/> OPD समय: सुबह 9AM - शाम 7PM</span>
            <span className="flex items-center gap-1"><Mail size={12} className="text-purple-400"/> contact@manovaidya.com</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent max-w-md mx-auto my-3"></div>
          <p>© 2026 Manovaidya Chikitsalaya | All rights reserved | Ayurveda & Mental Wellness</p>
          <p className="text-[10px] text-gray-400 mt-1">This is a legally binding consent form. Please read carefully before signing.</p>
        </div>
      </div>
      
      <style jsx>{`
        .font-devanagari {
          font-family: 'Noto Sans Devanagari', 'Mukta', 'Nirmala UI', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default OpdConsentForm;