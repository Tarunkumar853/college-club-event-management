import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Image, Sparkles, Building, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRESET_IMAGES } from '../data/initialData';

export const AddEditEventModal = ({ isOpen, onClose, eventToEdit = null }) => {
  const { addEvent, updateEvent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    date: '2026-10-20',
    time: '10:00 AM - 04:00 PM',
    venue: '',
    description: '',
    organizer: 'Coding Club',
    image: PRESET_IMAGES[0].url,
    registrationLimit: 100,
    featured: false,
  });

  const [customImageMode, setCustomImageMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        name: eventToEdit.name || '',
        category: eventToEdit.category || 'Technical',
        date: eventToEdit.date || '',
        time: eventToEdit.time || '',
        venue: eventToEdit.venue || '',
        description: eventToEdit.description || '',
        organizer: eventToEdit.organizer || '',
        image: eventToEdit.image || PRESET_IMAGES[0].url,
        registrationLimit: eventToEdit.registrationLimit || 100,
        featured: Boolean(eventToEdit.featured),
      });
      setCustomImageMode(!PRESET_IMAGES.some((p) => p.url === eventToEdit.image));
    } else {
      setFormData({
        name: '',
        category: 'Technical',
        date: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
        time: '10:00 AM - 04:00 PM',
        venue: 'ABES Auditorium',
        description: '',
        organizer: 'Student Activity Council',
        image: PRESET_IMAGES[0].url,
        registrationLimit: 100,
        featured: false,
      });
      setCustomImageMode(false);
    }
    setErrors({});
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Event Name is required';
    if (!formData.date.trim()) errs.date = 'Event Date is required';
    if (!formData.venue.trim()) errs.venue = 'Venue is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.organizer.trim()) errs.organizer = 'Organizer is required';
    if (!formData.image.trim()) errs.image = 'Image URL is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (eventToEdit) {
      updateEvent(eventToEdit.id, formData);
    } else {
      addEvent(formData);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {eventToEdit ? 'Edit Event Details' : 'Create New Campus Event'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Fill in details to publish event on student dashboard.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
            {/* Event Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Event Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. CodeSprint 2026: Hackathon"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            {/* Category & Organizer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Organizer Club / Society <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="e.g. ACM Student Chapter"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                />
                {errors.organizer && <p className="text-xs text-rose-400 mt-1">{errors.organizer}</p>}
              </div>
            </div>

            {/* Date, Time & Registration Limit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                />
                {errors.date && <p className="text-xs text-rose-400 mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="10:00 AM - 04:00 PM"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Seat Capacity Limit
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.registrationLimit}
                  onChange={(e) => setFormData({ ...formData, registrationLimit: Number(e.target.value) })}
                  placeholder="100"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Campus Venue / Room <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Main Auditorium / Lab 4"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
              />
              {errors.venue && <p className="text-xs text-rose-400 mt-1">{errors.venue}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Detailed Event Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe agenda, highlights, prize pools..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-none"
              />
              {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description}</p>}
            </div>

            {/* Banner Image Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Event Banner Image <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setCustomImageMode(!customImageMode)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  {customImageMode ? 'Choose from Presets' : 'Custom Image URL'}
                </button>
              </div>

              {customImageMode ? (
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                />
              ) : (
                <select
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none"
                >
                  {PRESET_IMAGES.map((preset) => (
                    <option key={preset.url} value={preset.url}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              )}
              {errors.image && <p className="text-xs text-rose-400 mt-1">{errors.image}</p>}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-slate-200 cursor-pointer">
                Mark as Featured Fest Spotlight (Displayed prominently on Home hero)
              </label>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                {eventToEdit ? 'Save Changes' : 'Publish Event'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
