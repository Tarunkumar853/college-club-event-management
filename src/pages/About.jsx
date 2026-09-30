import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Award, ShieldCheck, Target, Heart, Layers, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Empowering Student Excellence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          About ABES ClubConnect
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          The official central portal designed to streamline event discovery, registrations, and club management across technical, cultural, sports, and creative student societies.
        </p>
      </div>

      {/* 4 Pillars Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Technical Innovation</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Hands-on hackathons, coding sprints, AI bootcamps, and ACM student chapter technical challenges.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Cultural Vibrancy</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unleashing musical talent, dramatic plays, dance competitions, and annual inter-college cultural fests.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Sports & Athleticism</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Building teamwork, sportsmanship, and endurance through basketball, cricket, and athletic tournaments.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 w-fit">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Leadership Development</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Fostering student council leaders, event managers, and team organizers with real project experience.
          </p>
        </div>
      </div>

      {/* Project Background Note */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-500/30 text-slate-300 space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
          <span>Engineered for Student Viva & Demo Presentation</span>
        </h2>
        <p className="text-sm leading-relaxed text-slate-300">
          This Web Application was crafted as a computer science student project demonstrating modern React architecture, standard client-side state persistence (`localStorage`), responsive design, dynamic search/filter controls, and admin CRUD event management.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>Explore Campus Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
