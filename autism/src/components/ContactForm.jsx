import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import axiosInstance from '../api/axiosInstance'; // Adjust the path as needed

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\+\(\)\-]{8,}$/.test(formData.phone)) newErrors.phone = 'Valid phone number required';
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
    // Clear submit error when user starts typing
    if (submitError) setSubmitError('');
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
      const response = await axiosInstance.post('/autism/contact/create', formData);
      
      if (response.data.success || response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        
        // Store form data in localStorage for payment page if needed
        localStorage.setItem("contactFormData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }));
        
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        
        // Redirect to payment link after successful submission
        setTimeout(() => {
          window.location.href = "https://rzp.io/rzp/FjMRvHOy";
        }, 1500); // 1.5 second delay to show success message
      } else {
        setSubmitError(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        
        if (err.response.status === 400) {
          setSubmitError(err.response.data.message || 'Invalid form data. Please check your inputs.');
        } else if (err.response.status === 500) {
          setSubmitError('Server error. Please try again later.');
        } else {
          setSubmitError(err.response.data.message || 'Failed to send message. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setSubmitError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setSubmitError('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Compact */}
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
          {/* Contact Info Cards - Compact */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Phone</h3>
                  <p className="text-slate-600 text-medium">+91-7823838638</p>
                  <p className="text-medium text-slate-400">Mon-Fri 11am-7pm </p>
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

          {/* Form Section - Compact Two-Row Layout */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Success Message */}
            {isSubmitted && (
              <div className="m-4 mb-0 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-700 text-xs">Form submitted! Redirecting to payment...</p>
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
                      <span>Full Name</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Manovaidya Ayurveda"
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
                      <span>Email Address</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="info@manovaidya.help"
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
                      <span>Phone Number</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
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
                      <span>Address</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border ${errors.address ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="VS Plaza, near Vinayak Hospital, Noida"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field - Full Width, Compact Height */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Message / Note</span>
                  </span>
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm border ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                  placeholder="Tell us about your project, question, or feedback..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-100 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Proceed to Payment</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center mt-2">
                By submitting, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;