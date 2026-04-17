import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  // Payment page URL
  const PAYMENT_URL = 'https://rzp.io/rzp/ZQr39j1';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\+\(\)\-]{8,}$/.test(formData.phone)) newErrors.phone = 'Valid phone number required (min 8 digits)';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  // Function to redirect to payment page
  const redirectToPayment = () => {
    setRedirecting(true);
    // Small delay to show the redirecting message
    setTimeout(() => {
      window.location.href = PAYMENT_URL;
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await axiosInstance.post('/teenage/contact/create', formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        
        // Store form data in localStorage for payment page if needed
        localStorage.setItem('contactFormData', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          submittedAt: new Date().toISOString()
        }));
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        
        // Redirect to payment page after 2 seconds
        setTimeout(() => {
          redirectToPayment();
        }, 2000);
        
      } else {
        setSubmitError(response.data.message || 'Failed to send message. Please try again.');
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      
      if (err.response) {
        const { status, data } = err.response;
        
        if (status === 400) {
          setSubmitError(data.message || 'Invalid form data. Please check your inputs.');
        } else if (status === 500) {
          setSubmitError('Server error. Please try again later.');
        } else {
          setSubmitError(data.message || 'Failed to send message. Please try again.');
        }
      } else if (err.request) {
        setSubmitError('Unable to connect to server. Please check your internet connection.');
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md mb-3">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Get in Touch
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Phone</h3>
                  <p className="text-slate-600 text-medium">+91-7823838638</p>
                  <p className="text-medium text-slate-400">Mon-Fri 11am-7pm</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Email</h3>
                  <p className="text-slate-600 text-medium">info@manovaidya.help</p>
                  <p className="text-slate-600 text-medium">manovaidya2@gmail.com</p>
                  <p className="text-medium text-slate-400">Support & Inquiries</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Address</h3>
                  <p className="text-slate-600 text-medium">
                    VS Plaza, near Vinayak Hospital
                  </p>
                  <p className="text-slate-600 text-medium">
                    Atta Market, Pocket E, Sector 27
                  </p>
                  <p className="text-slate-600 text-medium">
                    Noida, Uttar Pradesh 201301
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Map Preview */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-3 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-1 mb-2">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-medium">Find us here</span>
                </div>
                <div className="h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <p className="text-[10px] text-slate-300">📍 Interactive Map Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Success Message with Redirect Info */}
            {isSubmitted && !redirecting && (
              <div className="m-4 mb-0 bg-emerald-50 border border-emerald-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <p className="text-emerald-700 text-xs">Message sent successfully! Redirecting to payment page...</p>
                </div>
                <div className="mt-2 w-full bg-emerald-200 rounded-full h-1 overflow-hidden">
                  <div className="bg-emerald-600 h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            )}

            {/* Redirecting Message */}
            {redirecting && (
              <div className="m-4 mb-0 bg-blue-50 border border-blue-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <p className="text-blue-700 text-xs">Redirecting to payment gateway...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="m-4 mb-0 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-xs">{submitError}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Row 1: Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Full Name *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isSubmitting || redirecting}
                    className={`w-full px-3 py-2 text-sm border ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Address *</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || redirecting}
                    className={`w-full px-3 py-2 text-sm border ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone + Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone Number *</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || redirecting}
                    className={`w-full px-3 py-2 text-sm border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    placeholder="+91 7823838638"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Address *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isSubmitting || redirecting}
                    className={`w-full px-3 py-2 text-sm border ${errors.address ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed`}
                    placeholder="Your complete address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Message / Note *</span>
                  </span>
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting || redirecting}
                  className={`w-full px-3 py-2 text-sm border ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-slate-50 disabled:cursor-not-allowed`}
                  placeholder="Tell us about your project, question, or feedback..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Payment Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Note:</span> After submitting this form, you will be redirected to our secure payment page to complete your transaction.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || redirecting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-100 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : redirecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Redirecting to Payment...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Proceed to Payment</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center mt-2">
                By submitting, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;