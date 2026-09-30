import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventDetailsModal = () => {
  const { selectedEventForDetails, setSelectedEventForDetails, setSelectedEventForRegister, getEventRegistrationCount } = useApp();

  if (!selectedEventForDetails) return null;

  const event = selectedEventForDetails;
  const regCount = getEventRegistrationCount(event.id);
  const isFull = event.registrationLimit ? regCount >= event.registrationLimit : false;
  const spotsLeft = event.registrationLimit ? Math.max(0, event.registrationLimit - regCount) : null;

  const handleRegisterClick = () => {
    const target = selectedEventForDetails;
    setSelectedEventForDetails(null);
    setSelectedEventForRegister(target);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEventForDetails(null)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Image banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

            <button
              onClick={() => setSelectedEventForDetails(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                {event.category}
              </span>
              {event.featured && (
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md">
                  <Award className="w-3.5 h-3.5" />
                  Featured Event
                </span>
              )}
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {event.name}
              </h2>
              <p className="text-sm text-indigo-400 font-semibold mt-1.5">
                Organized by {event.organizer}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">DATE</span>
                  <span className="font-semibold">{event.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">TIME</span>
                  <span className="font-semibold">{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">CAPACITY</span>
                  <span className="font-semibold">
                    {regCount} / {event.registrationLimit || 'Unlimited'}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Box */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 text-sm">
              <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Event Venue</span>
                <span className="text-slate-200 font-medium">{event.venue}</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About This Event</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Registration Status Banner */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-indigo-200">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>
                  {isFull
                    ? 'Registration closed (Maximum capacity reached).'
                    : spotsLeft !== null
                    ? `${spotsLeft} seats remaining! Fast track your registration.`
                    : 'Registrations currently open for all college students.'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bar Actions */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={() => setSelectedEventForDetails(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold border border-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              disabled={isFull}
              onClick={handleRegisterClick}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
                isFull
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
              }`}
            >
              <span>{isFull ? 'Event Full' : 'Register Now'}</span>
              {!isFull && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
