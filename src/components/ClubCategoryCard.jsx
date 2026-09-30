import React from 'react';
import { motion } from 'framer-motion';
import { Code, Music, Trophy, Palette, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClubCategoryCard = ({ title, category, description, iconName, count, gradient }) => {
  const navigate = useNavigate();

  const iconMap = {
    Code: Code,
    Music: Music,
    Trophy: Trophy,
    Palette: Palette,
  };

  const IconComponent = iconMap[iconName] || Code;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/events?category=${encodeURIComponent(category)}`)}
      className="group cursor-pointer relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 backdrop-blur-md overflow-hidden transition-all duration-300"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="p-2 rounded-xl bg-slate-800/80 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-semibold">
        <span className="text-indigo-400 uppercase tracking-wider">{category} Club</span>
        <span className="text-slate-500">{count} Active Events</span>
      </div>
    </motion.div>
  );
};
