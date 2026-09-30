import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mail, Phone, Sparkles } from 'lucide-react';

export const Registrations = () => {
  const { registrations, events } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('All');

  const filteredRegistrations = registrations.filter((reg) => {
    const targetEvt = events.find((e) => Number(e.id) === Number(reg.eventId));
    const eventName = targetEvt?.name || '';

    const matchesEvent =
      selectedEventId === 'All' || Number(reg.eventId) === Number(selectedEventId);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      reg.name.toLowerCase().includes(q) ||
      reg.email.toLowerCase().includes(q) ||
      reg.collegeYear.toLowerCase().includes(q) ||
      reg.phone.toLowerCase().includes(q) ||
      eventName.toLowerCase().includes(q);

    return matchesEvent && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Registered Students
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Inspect student passes, contact info, and event registrations.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        {/* Search Input */}
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, email, event name, or branch..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Event Filter Select */}
        <div className="sm:col-span-4">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-xs text-slate-900 focus:outline-none"
          >
            <option value="All">Filter by Event: All Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Registrations Listing Container */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Total Matches: {filteredRegistrations.length}</span>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No registrations found for the selected criteria.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 rounded-l-xl">Student Name</th>
                    <th className="py-3.5 px-4">College Email</th>
                    <th className="py-3.5 px-4">Branch / Year</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Event Registered</th>
                    <th className="py-3.5 px-4 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredRegistrations.map((reg) => {
                    const targetEvt = events.find((e) => Number(e.id) === Number(reg.eventId));
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                            {reg.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{reg.name}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{reg.email}</td>
                        <td className="py-3.5 px-4 text-slate-900 font-bold">{reg.collegeYear}</td>
                        <td className="py-3.5 px-4 text-slate-500">{reg.phone}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 block truncate max-w-[200px]">
                            {targetEvt?.name || `Event #${reg.eventId}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{reg.registrationDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredRegistrations.map((reg) => {
                const targetEvt = events.find((e) => Number(e.id) === Number(reg.eventId));
                return (
                  <div
                    key={reg.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {reg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{reg.name}</h4>
                          <span className="text-[10px] text-blue-600 block font-bold">{reg.collegeYear}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{reg.registrationDate}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{reg.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{reg.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span className="font-bold text-purple-700">{targetEvt?.name || `Event #${reg.eventId}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
