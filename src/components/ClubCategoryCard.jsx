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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/events?category=${encodeURIComponent(category)}`)}
      className="group cursor-pointer relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-500 group-hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold">
        <span className="text-blue-600 uppercase tracking-wider">{category} Club</span>
        <span className="text-slate-500">{count} Active Events</span>
      </div>
    </motion.div>
  );
};
