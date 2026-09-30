import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, User, Mail, GraduationCap, Phone, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RegistrationModal = () => {
  const { selectedEventForRegister, setSelectedEventForRegister, registerStudent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeYear: 'B.Tech CSE - 2nd Year',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');

  useEffect(() => {
    if (selectedEventForRegister) {
      setFormData({
        name: '',
        email: '',
        collegeYear: 'B.Tech CSE - 2nd Year',
        phone: '',
      });
      setErrors({});
      setIsSuccess(false);
      setDuplicateError('');
    }
  }, [selectedEventForRegister]);

  if (!selectedEventForRegister) return null;

  const event = selectedEventForRegister;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@college.edu)';
    }

    if (!formData.collegeYear.trim()) {
      newErrors.collegeYear = 'College branch and year is required';
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Phone number must contain at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDuplicateError('');

    if (!validateForm()) return;

    const result = registerStudent({
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      collegeYear: formData.collegeYear,
      phone: formData.phone,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setDuplicateError(result.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEventForRegister(null)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 text-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedEventForRegister(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            /* Success Screen Animation */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">Registration Successful!</h2>
              
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                You are registered for <span className="text-blue-600 font-bold">{event.name}</span>. A confirmation token has been logged to your college profile.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 text-left font-medium">
                <p><strong className="text-slate-900">Name:</strong> {formData.name}</p>
                <p><strong className="text-slate-900">Email:</strong> {formData.email}</p>
                <p><strong className="text-slate-900">Venue:</strong> {event.venue}</p>
                <p><strong className="text-slate-900">Date:</strong> {event.date} ({event.time})</p>
              </div>

              <button
                onClick={() => setSelectedEventForRegister(null)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all mt-4"
              >
                Done & Close
              </button>
            </motion.div>
          ) : (
            /* Form Screen */
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Event Pass Registration
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Register for Event</h2>
                <p className="text-xs text-slate-600 mt-1">
                  Selected Event: <span className="text-blue-600 font-bold">{event.name}</span>
                </p>
              </div>

              {duplicateError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{duplicateError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@college.edu"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* College / Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Branch & Year <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.collegeYear}
                      onChange={(e) => setFormData({ ...formData, collegeYear: e.target.value })}
                      placeholder="e.g. B.Tech CSE - 2nd Year"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.collegeYear
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                      }`}
                    />
                  </div>
                  {errors.collegeYear && <p className="text-xs text-rose-500 mt-1">{errors.collegeYear}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
