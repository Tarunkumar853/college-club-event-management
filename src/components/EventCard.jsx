import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventCard = ({ event }) => {
  const { setSelectedEventForDetails, setSelectedEventForRegister, getEventRegistrationCount } = useApp();

  const regCount = getEventRegistrationCount(event.id);
  const isFull = event.registrationLimit ? regCount >= event.registrationLimit : false;

  // Category Badge Colors
  const categoryStyles = {
    Technical: 'bg-blue-50 text-blue-700 border-blue-200',
    Cultural: 'bg-purple-50 text-purple-700 border-purple-200',
    Sports: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Creative: 'bg-rose-50 text-rose-700 border-rose-200',
    Workshop: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const badgeStyle = categoryStyles[event.category] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300"
    >
      {/* Event Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Category Pill Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeStyle}`}>
            <Tag className="w-3 h-3" />
            {event.category}
          </span>
        </div>

        {/* Registration Limit Badge */}
        {event.registrationLimit && (
          <div className="absolute top-3.5 right-3.5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs border ${
              isFull ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-slate-900/80 text-white backdrop-blur-md border-slate-700'
            }`}>
              <Users className="w-3 h-3" />
              {regCount}/{event.registrationLimit}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-3.5">
        <div>
          <h3
            onClick={() => setSelectedEventForDetails(event)}
            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {event.name}
          </h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Organized by {event.organizer}</p>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Date/Time/Venue Specs */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{event.date}</span>
            <span className="text-slate-300">•</span>
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2 mt-auto">
          <button
            onClick={() => setSelectedEventForDetails(event)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors text-center"
          >
            View Details
          </button>
          <button
            disabled={isFull}
            onClick={() => setSelectedEventForRegister(event)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              isFull
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
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
