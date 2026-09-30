import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { EventDetailsModal } from './components/EventDetailsModal';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminSidebar } from './components/AdminSidebar';
import { AddEditEventModal } from './pages/AddEditEventModal';

// Pages
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { About } from './pages/About';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminEvents } from './pages/AdminEvents';
import { Registrations } from './pages/Registrations';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Add/Edit Event Modal state for Admin
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleOpenAddModal = () => {
    setEventToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setEventToEdit(event);
    setIsAddEditModalOpen(true);
  };

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-indigo-500 selection:text-white">
        {/* Admin Sidebar Navigation */}
        <AdminSidebar onOpenAddModal={handleOpenAddModal} />

        {/* Admin Main Content Container */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          <Routes>
            <Route path="/admin" element={<AdminDashboard onOpenAddModal={handleOpenAddModal} />} />
            <Route
              path="/admin/events"
              element={
                <AdminEvents
                  onOpenAddModal={handleOpenAddModal}
                  onOpenEditModal={handleOpenEditModal}
                />
              }
            />
            <Route path="/admin/registrations" element={<Registrations />} />
          </Routes>
        </main>

        {/* Global Admin Modals & Toasts */}
        <AddEditEventModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          eventToEdit={eventToEdit}
        />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Student Top Header Navigation */}
      <Navbar />

      {/* Main Student Page Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Student Modals & Toasts */}
      <EventDetailsModal />
      <RegistrationModal />
      <ToastContainer />
    </div>
  );
}
