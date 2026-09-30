# 🎓 College Club Event Management Website (ClubConnect)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.5-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A modern, responsive, and interactive **College Club Event Management Platform** engineered as a computer science project. Designed with a sleek college-tech aesthetic, glassmorphism UI elements, dark mode theme, client-side state persistence (`localStorage`), and full CRUD capability.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/Tarunkumar853/college-club-event-management](https://github.com/Tarunkumar853/college-club-event-management)

---

## 📌 Features Overview

The application features two clearly separated user interfaces:

### 1. 🎓 Student / User Side (`/`, `/events`, `/about`)
- **Navbar**: Responsive top navigation with logo, active link indicators, quick Admin toggle, and mobile menu drawer animation.
- **Hero Section**: Modern landing hero featuring *"Discover. Participate. Connect."*, animated ambient glow orbs, action buttons, and quick campus statistics.
- **About Our Clubs**: Feature domain cards covering Technical, Cultural, Sports, and Creative societies.
- **Featured Spotlight Fest**: Prominent split-layout section showcasing **TechFest 2026** (15 Oct 2026, Auditorium) with viewport entrance animation.
- **Upcoming Events Grid**: Card grid displaying event banner zoom effects, category badges, venue specs, seat availability counters, and quick registration popups.
- **Events Directory (`/events`)**:
  - Live search input (by event name, organizer, or venue).
  - Category filter pills (*All, Technical, Cultural, Sports, Workshop, Creative*).
  - Clean empty-state UI when no events match the search.
- **Event Details Modal**: Detailed breakdown including venue details, schedule, capacity limits, and direct registration triggers.
- **Registration Form**:
  - Validates **Full Name**, **College Email**, **Branch & Year**, and **Phone Number**.
  - Prevents duplicate registrations for the same student email + event ID.
  - Displays a registration pass summary accompanied by a celebratory confetti burst.

---

### 🛡️ 2. Admin Dashboard (`/admin`, `/admin/events`, `/admin/registrations`)
- **Dashboard Overview (`/admin`)**:
  - Analytics cards: Total Events, Upcoming Events, Total Registrations, Active Clubs.
  - Recent Student Registrations activity table.
- **Event Management (`/admin/events`)**:
  - Table view of all campus events with seat counts and category tags.
  - **Add Event Modal**: Create new events with custom/preset banner images, date/time, venue, organizer, capacity limit, and spotlight flags.
  - **Edit Event Modal**: Prepopulated form allowing instant updates.
  - **Delete Event Confirmation**: Safety modal dialog to prevent accidental deletion.
- **Registered Students (`/admin/registrations`)**:
  - Responsive table listing student passes, email, branch/year, phone, event, and registration date.
  - Live search by student name, email, event name, or branch.
  - **Mobile Responsive Layout**: Automatically converts table rows into mobile cards on smaller screen sizes.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Core**: React 18 & Vite
- **Styling**: Vanilla CSS + Tailwind CSS (Custom ambient glow, glassmorphism, rounded cards)
- **Routing**: React Router v6 (`BrowserRouter`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Delight & Feedback**: Canvas Confetti & Custom Toast Notifications
- **Data Persistence**: `localStorage` (No complex backend or DB setup required)

---

## 📁 Project Structure

```text
college-club-event-management/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # Router layout wrappers for Student & Admin views
    ├── index.css                 # Global Tailwind styles & ambient glow utilities
    ├── context/
    │   └── AppContext.jsx        # State provider & LocalStorage sync
    ├── data/
    │   └── initialData.js        # Seed dataset for events and initial registrations
    ├── components/
    │   ├── Navbar.jsx            # Top navbar with mobile menu drawer
    │   ├── Footer.jsx            # Campus footer with quick navigation links
    │   ├── EventCard.jsx         # Card component with image zoom & hover lift
    │   ├── FeaturedEventCard.jsx # Split-layout spotlight card for TechFest 2026
    │   ├── EventGrid.jsx         # Staggered grid container with empty states
    │   ├── ClubCategoryCard.jsx  # Domain cards for technical, cultural, sports, creative
    │   ├── SearchBar.jsx         # Search input with clear button
    │   ├── CategoryFilter.jsx    # Pill buttons for category filtering
    │   ├── EventDetailsModal.jsx # Detailed event inspection modal
    │   ├── RegistrationModal.jsx # Registration form with validation & confetti
    │   ├── ConfirmationModal.jsx # Admin delete confirmation dialog
    │   ├── ToastContainer.jsx    # Toast notification system
    │   └── AdminSidebar.jsx      # Navigation sidebar for admin dashboard
    └── pages/
        ├── Home.jsx              # Landing page
        ├── Events.jsx            # /events search & directory page
        ├── About.jsx             # /about club ecosystem page
        ├── AdminDashboard.jsx    # /admin overview & metrics
        ├── AdminEvents.jsx       # /admin/events management table
        ├── AddEditEventModal.jsx # Admin form to create or edit events
        └── Registrations.jsx     # /admin/registrations student listing
```

---

## 💾 Data Schema

### Event Object
```javascript
{
  id: 1,
  name: "TechFest 2026: National Innovation Summit",
  category: "Technical",
  date: "2026-10-15",
  time: "10:00 AM - 05:00 PM",
  venue: "ABES Engineering College Main Auditorium",
  description: "A flagship day filled with high-stakes coding competitions...",
  organizer: "Coding Club & ACM Student Chapter",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  registrationLimit: 250,
  featured: true
}
```

### Registration Object
```javascript
{
  id: 101,
  eventId: 1,
  name: "Aarav Sharma",
  email: "aarav.sharma@college.edu",
  collegeYear: "B.Tech CSE - 3rd Year",
  phone: "9876543210",
  registrationDate: "2026-09-28"
}
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (`v18.0.0` or higher)
- npm (`v9.0.0` or higher)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tarunkumar853/college-club-event-management.git
   cd college-club-event-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📜 License & Credits

Created as a Computer Science student project for **ABES Engineering College**. Released under the [MIT License](LICENSE).
