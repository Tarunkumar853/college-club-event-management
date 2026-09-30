import React from 'react';
import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { CalendarX, RefreshCw } from 'lucide-react';

export const EventGrid = ({ events, onResetFilter }) => {
  if (!events || events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-slate-900/40 border border-slate-800 border-dashed"
      >
        <div className="p-4 rounded-full bg-slate-800/80 text-indigo-400 mb-4 shadow-inner">
          <CalendarX className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No events match your criteria</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Try adjusting your search terms or selecting a different category filter to discover other campus activities.
        </p>
        {onResetFilter && (
          <button
            onClick={onResetFilter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Search & Filters
          </button>
        )}
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((event) => (
        <motion.div key={event.id} variants={itemVariants}>
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  );
};
