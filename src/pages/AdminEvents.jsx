import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, PlusCircle, Edit, Trash2, Users, MapPin, Sparkles, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const AdminEvents = ({ onOpenAddModal, onOpenEditModal }) => {
  const { events, deleteEvent, getEventRegistrationCount } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingEventId, setDeletingEventId] = useState(null);

  const targetToDelete = events.find((e) => Number(e.id) === Number(deletingEventId));

  const filteredEvents = events.filter((evt) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      evt.name.toLowerCase().includes(q) ||
      evt.category.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.organizer.toLowerCase().includes(q)
    );
  });

  const handleDeleteConfirm = () => {
    if (deletingEventId) {
      deleteEvent(deletingEventId);
      setDeletingEventId(null);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Event Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, and publish campus events for student registrations.
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

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter events by name, category, venue..."
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Events Table Container */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Showing {filteredEvents.length} events</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No events found matching your search term.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 rounded-l-xl">Event Info</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Venue</th>
                  <th className="py-3.5 px-4">Registrations</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredEvents.map((evt) => {
                  const regCount = getEventRegistrationCount(evt.id);
                  const isFull = evt.registrationLimit ? regCount >= evt.registrationLimit : false;

                  return (
                    <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Event Banner & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={evt.image}
                            alt={evt.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
                            }}
                          />
                          <div>
                            <span className="font-bold text-white block text-sm leading-snug">
                              {evt.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              By {evt.organizer}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {evt.category}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">{evt.date}</span>
                          <span className="text-[11px] text-slate-400">{evt.time}</span>
                        </div>
                      </td>

                      {/* Venue */}
                      <td className="py-3.5 px-4 text-slate-400 truncate max-w-[150px]">
                        {evt.venue}
                      </td>

                      {/* Registrations count */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Users className="w-3.5 h-3.5 text-indigo-400" />
                          <span className={isFull ? 'text-rose-400' : 'text-emerald-400'}>
                            {regCount} / {evt.registrationLimit || '∞'}
                          </span>
                        </div>
                      </td>

                      {/* Actions Edit / Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenEditModal(evt)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white transition-colors"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingEventId(evt.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingEventId)}
        onClose={() => setDeletingEventId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message={`Are you sure you want to delete "${targetToDelete?.name || 'this event'}"? All registrations associated with this event will be affected.`}
        confirmText="Delete Event"
        isDanger={true}
      />
    </div>
  );
};
