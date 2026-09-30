import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeaturedEventCard = ({ event }) => {
  const { setSelectedEventForDetails, setSelectedEventForRegister, getEventRegistrationCount } = useApp();

  if (!event) return null;

  const regCount = getEventRegistrationCount(event.id);
  const isFull = event.registrationLimit ? regCount >= event.registrationLimit : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 text-white shadow-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left / Top Image Section */}
        <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[400px] overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
          
          {/* Featured Badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4" />
            <span>Featured Fest</span>
          </div>
        </div>

        {/* Right / Bottom Info Section */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {event.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">By {event.organizer}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {event.name}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-y border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</span>
                <span className="font-semibold">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time</span>
                <span className="font-semibold">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Venue</span>
                <span className="font-semibold">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              disabled={isFull}
              onClick={() => setSelectedEventForRegister(event)}
              className={`w-full sm:w-auto flex-1 py-3 px-6 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                isFull
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              <span>{isFull ? 'Registration Closed' : 'Register Now'}</span>
              {!isFull && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setSelectedEventForDetails(event)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all text-center"
            >
              Event Details
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
