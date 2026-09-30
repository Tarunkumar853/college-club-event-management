import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Globe, Github, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                🎓
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Club<span className="text-indigo-400">Connect</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The official centralized event management platform for ABES Engineering College student clubs, hackathons, workshops, and cultural fests.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-indigo-400 transition-colors">Browse All Events</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Student Clubs</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-400 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Featured Club Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Club Domains</h3>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-slate-200 transition-colors cursor-pointer">Technical & ACM Chapter</span></li>
              <li><span className="hover:text-slate-200 transition-colors cursor-pointer">Cultural & Music Societies</span></li>
              <li><span className="hover:text-slate-200 transition-colors cursor-pointer">Sports Authority Council</span></li>
              <li><span className="hover:text-slate-200 transition-colors cursor-pointer">Creative & Design Guild</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Campus Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>ABES Engineering College, Campus Auditorium Road, Ghaziabad, UP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>clubs@abes.ac.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 (0120) 7135111</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 College Club Events. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-500">
            Designed for Student Project Presentation <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> ABES Engineering College
          </p>
        </div>
      </div>
    </footer>
  );
};
