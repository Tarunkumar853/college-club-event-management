import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventCard = ({ event }) => {
  const { setSelectedEventForDetails, setSelectedEventForRegister, getEventRegistrationCount } = useApp();

  const regCount = getEventRegistrationCount(event.id);
  const isFull = event.registrationLimit ? regCount >= event.registrationLimit : false;

  // Category Color Badges mapping
  const categoryStyles = {
    Technical: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    Cultural: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Sports: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Creative: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    Workshop: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  const badgeStyle = categoryStyles[event.category] || 'bg-slate-500/10 text-slate-300 border-slate-500/30';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      {/* Event Image Container with Zoom effect */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

        {/* Category Pill Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${badgeStyle}`}>
            <Sparkles className="w-3 h-3" />
            {event.category}
          </span>
        </div>

        {/* Registration Limit Badge */}
        {event.registrationLimit && (
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
              isFull ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-900/80 text-slate-300 border-slate-700'
            }`}>
              <Users className="w-3 h-3 text-slate-400" />
              {regCount}/{event.registrationLimit}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <h3
            onClick={() => setSelectedEventForDetails(event)}
            className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {event.name}
          </h3>
          <p className="text-xs text-indigo-400/90 font-medium mt-1">Organized by {event.organizer}</p>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Date/Time/Venue Specs */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{event.date}</span>
            <span className="text-slate-600">•</span>
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2 mt-auto">
          <button
            onClick={() => setSelectedEventForDetails(event)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 hover:border-slate-600 transition-all text-center"
          >
            View Details
          </button>
          <button
            disabled={isFull}
            onClick={() => setSelectedEventForRegister(event)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md ${
              isFull
                ? 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30'
            }`}
          >
            <span>{isFull ? 'Full' : 'Register'}</span>
            {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
