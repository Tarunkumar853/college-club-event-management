import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Terminal, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Empowering Student Excellence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About ABES ClubConnect
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The official central portal designed to streamline event discovery, registrations, and club management across technical, cultural, sports, and creative student societies.
        </p>
      </div>

      {/* 4 Pillars Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 w-fit">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Technical Innovation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hands-on hackathons, coding sprints, AI bootcamps, and ACM student chapter technical challenges.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 w-fit">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Cultural Vibrancy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unleashing musical talent, dramatic plays, dance competitions, and annual inter-college cultural fests.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Sports & Athleticism</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Building teamwork, sportsmanship, and endurance through basketball, cricket, and athletic tournaments.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 w-fit">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Leadership Development</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fostering student council leaders, event managers, and team organizers with real project experience.
          </p>
        </div>
      </div>

      {/* Project Background Note */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          <span>Engineered for Student Viva & Demo Presentation</span>
        </h2>
        <p className="text-xs leading-relaxed text-slate-300">
          This Web Application was crafted as a computer science student project demonstrating modern React architecture, standard client-side state persistence (`localStorage`), responsive design, dynamic search/filter controls, and admin CRUD event management.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <span>Explore Campus Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
