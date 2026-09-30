import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, ShieldCheck, ArrowUpRight, TrendingUp, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const AdminDashboard = ({ onOpenAddModal }) => {
  const { events, registrations } = useApp();

  const totalEvents = events.length;
  // Upcoming events check (date >= today or simple count)
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingCount = events.filter((e) => e.date >= todayStr).length || events.length;
  const totalRegistrations = registrations.length;
  const activeClubsCount = new Set(events.map((e) => e.organizer)).size;

  // Recent 5 registrations
  const recentRegistrations = registrations.slice(0, 5);

  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      subtext: `${upcomingCount} upcoming fests`,
      icon: Calendar,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Upcoming Events',
      value: upcomingCount,
      subtext: 'Active on student portal',
      icon: TrendingUp,
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Total Registrations',
      value: totalRegistrations,
      subtext: 'Student event passes issued',
      icon: Users,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Active Clubs',
      value: activeClubsCount,
      subtext: 'Societies organizing events',
      icon: Award,
      gradient: 'from-amber-500/20 to-rose-500/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics and student registration activity for campus events.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className={`p-6 rounded-2xl bg-slate-900/80 border ${stat.border} relative overflow-hidden backdrop-blur-md`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} blur-xl`} />

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2 rounded-xl bg-slate-800 ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
              <span className="text-[11px] text-slate-400">{stat.subtext}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Registrations Table Section */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
            <p className="text-xs text-slate-400">Latest student signups across all active events.</p>
          </div>
          <Link
            to="/admin/registrations"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View All ({registrations.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">No student registrations recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">College / Year</th>
                  <th className="py-3 px-4 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {recentRegistrations.map((reg) => {
                  const targetEvt = events.find((e) => Number(e.id) === Number(reg.eventId));
                  return (
                    <tr key={reg.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{reg.name}</td>
                      <td className="py-3.5 px-4 text-indigo-300 font-semibold">{targetEvt?.name || `Event #${reg.eventId}`}</td>
                      <td className="py-3.5 px-4 text-slate-400">{reg.email}</td>
                      <td className="py-3.5 px-4 text-slate-300">{reg.collegeYear}</td>
                      <td className="py-3.5 px-4 text-slate-400">{reg.registrationDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
