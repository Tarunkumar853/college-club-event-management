import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Award, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeaturedEventCard } from '../components/FeaturedEventCard';
import { EventCard } from '../components/EventCard';
import { ClubCategoryCard } from '../components/ClubCategoryCard';

export const Home = () => {
  const { events } = useApp();
  const navigate = useNavigate();

  const featuredEvent = events.find((e) => e.featured) || events[0];
  const upcomingEvents = events.slice(0, 6);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-event-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-16 pb-12 overflow-hidden bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 tracking-wide">
              Official ABES College Club Portal 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-4xl mx-auto"
          >
            Discover. <span className="text-blue-600">Participate.</span> Connect.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Explore exciting college events, workshops, hackathons, sports tournaments and cultural fests happening around your campus.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <button
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={scrollToFeatured}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-300 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Award className="w-5 h-5 text-blue-600" />
              <span>View Featured Event</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-4xl mx-auto text-left"
          >
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold text-slate-900 block">15+</span>
              <span className="text-xs text-slate-500 font-medium">Active Campus Clubs</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold text-blue-600 block">500+</span>
              <span className="text-xs text-slate-500 font-medium">Students Registered</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold text-purple-600 block">25+</span>
              <span className="text-xs text-slate-500 font-medium">Annual Workshops</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold text-emerald-600 block">₹2.5L+</span>
              <span className="text-xs text-slate-500 font-medium">Hackathon Prizes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CLUB INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Student Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Our College Clubs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            College clubs empower students to learn new technical skills, participate in national competitions, build lifelong friendships, showcase hidden creative talent, attend expert workshops, and hone essential leadership and teamwork abilities.
          </p>
        </div>

        {/* 4 Feature Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ClubCategoryCard
            title="Technical Clubs"
            category="Technical"
            description="Coding hackathons, web development, competitive programming & ACM chapter activities."
            iconName="Code"
            count={events.filter((e) => e.category === 'Technical').length}
          />
          <ClubCategoryCard
            title="Cultural Society"
            category="Cultural"
            description="Music fests, dance troupes, drama club performances, and annual cultural night jams."
            iconName="Music"
            count={events.filter((e) => e.category === 'Cultural').length}
          />
          <ClubCategoryCard
            title="Sports Council"
            category="Sports"
            description="Inter-department basketball, cricket leagues, badminton tournaments & fitness rallies."
            iconName="Trophy"
            count={events.filter((e) => e.category === 'Sports').length}
          />
          <ClubCategoryCard
            title="Creative & Design"
            category="Creative"
            description="UI/UX masterclasses, photography walks, video editing workshops & visual arts."
            iconName="Palette"
            count={events.filter((e) => e.category === 'Creative' || e.category === 'Workshop').length}
          />
        </div>
      </section>

      {/* 3. FEATURED EVENT SECTION */}
      <section id="featured-event-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">Spotlight Fest</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Featured Event</h2>
          </div>
        </div>

        {featuredEvent && <FeaturedEventCard event={featuredEvent} />}
      </section>

      {/* 4. UPCOMING EVENTS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">Campus Agenda</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs group"
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
