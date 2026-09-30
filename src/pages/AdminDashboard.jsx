import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, ArrowUpRight, TrendingUp, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const AdminDashboard = ({ onOpenAddModal }) => {
  const { events, registrations } = useApp();

  const totalEvents = events.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingCount = events.filter((e) => e.date >= todayStr).length || events.length;
  const totalRegistrations = registrations.length;
  const activeClubsCount = new Set(events.map((e) => e.organizer)).size;

  const recentRegistrations = registrations.slice(0, 5);

  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      subtext: `${upcomingCount} upcoming fests`,
      icon: Calendar,
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Upcoming Events',
      value: upcomingCount,
      subtext: 'Active on student portal',
      icon: TrendingUp,
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Total Registrations',
      value: totalRegistrations,
      subtext: 'Student event passes issued',
      icon: Users,
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Active Clubs',
      value: activeClubsCount,
      subtext: 'Societies organizing events',
      icon: Award,
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Real-time analytics and student registration activity for campus events.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`p-6 rounded-2xl bg-white border ${stat.borderColor} shadow-xs relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <span className="text-xs text-slate-500 font-medium">{stat.subtext}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Registrations Table Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Registrations</h2>
            <p className="text-xs text-slate-500">Latest student signups across all active events.</p>
          </div>
          <Link
            to="/admin/registrations"
            className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
          >
            <span>View All ({registrations.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">No student registrations recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">College / Year</th>
                  <th className="py-3 px-4 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentRegistrations.map((reg) => {
                  const targetEvt = events.find((e) => Number(e.id) === Number(reg.eventId));
                  return (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{reg.name}</td>
                      <td className="py-3.5 px-4 text-blue-600 font-bold">{targetEvt?.name || `Event #${reg.eventId}`}</td>
                      <td className="py-3.5 px-4 text-slate-500">{reg.email}</td>
                      <td className="py-3.5 px-4 text-slate-700">{reg.collegeYear}</td>
                      <td className="py-3.5 px-4 text-slate-500">{reg.registrationDate}</td>
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
