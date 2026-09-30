import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Info, ShieldCheck, Menu, X, GraduationCap } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'About Clubs', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Club<span className="text-blue-600">Connect</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                ABES Engineering College
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Admin Dashboard Switcher CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isAdminPath
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{isAdminPath ? 'Admin Portal' : 'Admin Login'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/admin"
              className="p-2 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </NavLink>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center shadow-md"
              >
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                Go to Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
