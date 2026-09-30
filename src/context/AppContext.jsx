import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from '../data/initialData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const EVENTS_STORAGE_KEY = 'campus_club_events_v1';
const REGISTRATIONS_STORAGE_KEY = 'campus_club_registrations_v1';

export const AppProvider = ({ children }) => {
  // 1. Initialize Events state from localStorage or default
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_EVENTS;
    } catch (err) {
      console.error('Failed to load events from localStorage:', err);
      return INITIAL_EVENTS;
    }
  });

  // 2. Initialize Registrations state from localStorage or default
  const [registrations, setRegistrations] = useState(() => {
    try {
      const stored = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_REGISTRATIONS;
    } catch (err) {
      console.error('Failed to load registrations from localStorage:', err);
      return INITIAL_REGISTRATIONS;
    }
  });

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Active Modals State
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState(null);

  // Sync events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch (err) {
      console.error('Failed to save events to localStorage:', err);
    }
  }, [events]);

  // Sync registrations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
    } catch (err) {
      console.error('Failed to save registrations to localStorage:', err);
    }
  }, [registrations]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Event
  const addEvent = (newEventData) => {
    const newId = events.length > 0 ? Math.max(...events.map((e) => Number(e.id))) + 1 : 1;
    const eventToAdd = {
      ...newEventData,
      id: newId,
      featured: Boolean(newEventData.featured)
    };
    setEvents((prev) => [eventToAdd, ...prev]);
    addToast(`Event "${eventToAdd.name}" created successfully!`, 'success');
    return eventToAdd;
  };

  // Update Event
  const updateEvent = (id, updatedFields) => {
    setEvents((prev) =>
      prev.map((evt) => (Number(evt.id) === Number(id) ? { ...evt, ...updatedFields } : evt))
    );
    addToast('Event updated successfully!', 'success');
  };

  // Delete Event
  const deleteEvent = (id) => {
    const targetEvent = events.find((e) => Number(e.id) === Number(id));
    setEvents((prev) => prev.filter((e) => Number(e.id) !== Number(id)));
    // Optionally keep or purge registrations
    addToast(`Event "${targetEvent?.name || 'Item'}" deleted.`, 'info');
  };

  // Register Student for Event
  const registerStudent = (formData) => {
    const { eventId, name, email, collegeYear, phone } = formData;
    const targetEvent = events.find((e) => Number(e.id) === Number(eventId));

    if (!targetEvent) {
      addToast('Event not found!', 'error');
      return { success: false, message: 'Event not found' };
    }

    // Check duplicate registration
    const isDuplicate = registrations.some(
      (r) => Number(r.eventId) === Number(eventId) && r.email.toLowerCase() === email.toLowerCase()
    );

    if (isDuplicate) {
      return {
        success: false,
        message: `You are already registered for ${targetEvent.name} with email ${email}.`
      };
    }

    // Check capacity limit
    const existingCount = registrations.filter((r) => Number(r.eventId) === Number(eventId)).length;
    if (targetEvent.registrationLimit && existingCount >= targetEvent.registrationLimit) {
      return {
        success: false,
        message: `Sorry, registration capacity for ${targetEvent.name} has been reached!`
      };
    }

    const newReg = {
      id: Date.now(),
      eventId: Number(eventId),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      collegeYear: collegeYear.trim(),
      phone: phone.trim(),
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    addToast(`Successfully registered for ${targetEvent.name}! 🎉`, 'success');
    return { success: true, registration: newReg };
  };

  // Helper to count registrations per event
  const getEventRegistrationCount = (eventId) => {
    return registrations.filter((r) => Number(r.eventId) === Number(eventId)).length;
  };

  // Reset to initial mock data
  const resetToDefaultData = () => {
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    addToast('Reset demo data to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        events,
        registrations,
        toasts,
        selectedEventForDetails,
        setSelectedEventForDetails,
        selectedEventForRegister,
        setSelectedEventForRegister,
        addToast,
        removeToast,
        addEvent,
        updateEvent,
        deleteEvent,
        registerStudent,
        getEventRegistrationCount,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
