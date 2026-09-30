import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeaturedEventCard = ({ event }) => {
  const { setSelectedEventForDetails, setSelectedEventForRegister, getEventRegistrationCount } = useApp();

  if (!event) return null;

  const regCount = getEventRegistrationCount(event.id);
  const isFull = event.registrationLimit ? regCount >= event.registrationLimit : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-1 shadow-2xl shadow-indigo-500/10"
    >
      <div className="relative rounded-[22px] overflow-hidden bg-slate-900/90 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left / Top Image Section */}
        <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[420px] overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
          
          {/* Featured Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
            <Award className="w-4 h-4" />
            <span>Featured Fest</span>
          </div>

          <div className="absolute bottom-6 left-6 lg:hidden">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {event.category}
            </span>
          </div>
        </div>

        {/* Right / Bottom Info Section */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="hidden lg:flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {event.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">By {event.organizer}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.name}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {event.description}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-y border-slate-800/80 text-sm">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Date</span>
                <span className="font-semibold">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Time</span>
                <span className="font-semibold">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-200 sm:col-span-2">
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Venue</span>
                <span className="font-semibold">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              disabled={isFull}
              onClick={() => setSelectedEventForRegister(event)}
              className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${
                isFull
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:scale-[1.02]'
              }`}
            >
              <span>{isFull ? 'Registration Closed' : 'Register Now'}</span>
              {!isFull && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setSelectedEventForDetails(event)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/70 hover:border-slate-600 transition-all text-center"
            >
              Event Details
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
