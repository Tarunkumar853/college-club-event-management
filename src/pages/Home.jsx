import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Zap, Compass, Users, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeaturedEventCard } from '../components/FeaturedEventCard';
import { EventCard } from '../components/EventCard';
import { ClubCategoryCard } from '../components/ClubCategoryCard';

export const Home = () => {
  const { events } = useApp();
  const navigate = useNavigate();

  // Find featured event or fallback to the first event
  const featuredEvent = events.find((e) => e.featured) || events[0];
  // Select upcoming events (excluding featured if wanted, or top 6)
  const upcomingEvents = events.slice(0, 6);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-event-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Animated Background Decorative Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-wide">
              Official ABES College Club Portal 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
          >
            Discover. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Participate.</span> Connect.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Explore exciting college events, workshops, hackathons, sports tournaments and cultural fests happening around your campus.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <button
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={scrollToFeatured}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-indigo-400" />
              <span>View Featured Event</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md max-w-4xl mx-auto text-left"
          >
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-white block">15+</span>
              <span className="text-xs text-slate-400">Active Campus Clubs</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-indigo-400 block">500+</span>
              <span className="text-xs text-slate-400">Students Registered</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-purple-400 block">25+</span>
              <span className="text-xs text-slate-400">Annual Workshops</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-pink-400 block">₹2.5L+</span>
              <span className="text-xs text-slate-400">Hackathon Prizes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CLUB INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Our College Clubs
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            College clubs empower students to learn new technical skills, participate in national competitions, build lifelong friendships, showcase hidden creative talent, attend expert workshops, and hone essential leadership and teamwork abilities.
          </p>
        </div>

        {/* 4 Feature Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ClubCategoryCard
            title="Technical Clubs"
            category="Technical"
            description="Coding hackathons, web development, competitive programming & ACM chapter activities."
            iconName="Code"
            count={events.filter((e) => e.category === 'Technical').length}
            gradient="from-indigo-600 to-cyan-500"
          />
          <ClubCategoryCard
            title="Cultural Society"
            category="Cultural"
            description="Music fests, dance troupes, drama club performances, and annual cultural night jams."
            iconName="Music"
            count={events.filter((e) => e.category === 'Cultural').length}
            gradient="from-purple-600 to-pink-500"
          />
          <ClubCategoryCard
            title="Sports Council"
            category="Sports"
            description="Inter-department basketball, cricket leagues, badminton tournaments & fitness rallies."
            iconName="Trophy"
            count={events.filter((e) => e.category === 'Sports').length}
            gradient="from-emerald-600 to-teal-500"
          />
          <ClubCategoryCard
            title="Creative & Design"
            category="Creative"
            description="UI/UX masterclasses, photography walks, video editing workshops & visual arts."
            iconName="Palette"
            count={events.filter((e) => e.category === 'Creative' || e.category === 'Workshop').length}
            gradient="from-amber-600 to-rose-500"
          />
        </div>
      </section>

      {/* 3. FEATURED EVENT SECTION */}
      <section id="featured-event-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">Spotlight Fest</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Featured Event</h2>
          </div>
        </div>

        {featuredEvent && <FeaturedEventCard event={featuredEvent} />}
      </section>

      {/* 4. UPCOMING EVENTS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">Campus Agenda</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm group"
          >
            <span>View All Events ({events.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>
    </div>
  );
};
