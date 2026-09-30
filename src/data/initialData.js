export const INITIAL_EVENTS = [
  {
    id: 1,
    name: "TechFest 2026: National Innovation Summit",
    category: "Technical",
    date: "2026-10-15",
    time: "10:00 AM - 05:00 PM",
    venue: "ABES Engineering College Main Auditorium",
    description: "A flagship day filled with high-stakes coding competitions, robotics showdowns, AI innovation challenges, guest keynotes from tech leaders, and exciting rewards.",
    organizer: "Coding Club & ACM Student Chapter",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 250,
    featured: true
  },
  {
    id: 2,
    name: "CodeSprint 2026: 24-Hour Hackathon",
    category: "Technical",
    date: "2026-10-22",
    time: "09:00 AM (24 Hours)",
    venue: "Computer Science Dept. Lab 4 & 5",
    description: "Build innovative web and AI solutions to solve real-world campus problems within 24 hours. Free food, mentor guidance, and cash prizes for top 3 teams!",
    organizer: "GeeksforGeeks Student Chapter",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 120,
    featured: false
  },
  {
    id: 3,
    name: "Cultural Night: Rhythm & Harmony '26",
    category: "Cultural",
    date: "2026-10-28",
    time: "06:00 PM - 10:00 PM",
    venue: "Open Air Amphitheatre",
    description: "An extraordinary evening showcasing spectacular dance performances, live acoustic bands, drama club plays, and fashion runway by our talented students.",
    organizer: "Cultural Society (Sargam)",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 500,
    featured: false
  },
  {
    id: 4,
    name: "Inter-College Basketball Championship",
    category: "Sports",
    date: "2026-11-04",
    time: "08:00 AM - 04:00 PM",
    venue: "Outdoor Sports Complex Court 1",
    description: "Cheer for your department or participate in the annual 5v5 Inter-College Basketball tournament! Trophies and certificates for all finalists.",
    organizer: "Sports Council",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 80,
    featured: false
  },
  {
    id: 5,
    name: "Photography & Visual Storytelling Workshop",
    category: "Creative",
    date: "2026-11-10",
    time: "02:00 PM - 05:00 PM",
    venue: "Media & Design Studio Room 204",
    description: "Master portrait lighting, mobile photography tricks, color grading, and composition techniques with professional photographer guest mentors.",
    organizer: "Shutterbugs Photography Club",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 60,
    featured: false
  },
  {
    id: 6,
    name: "AI & Future Tech Hands-on Bootcamp",
    category: "Workshop",
    date: "2026-11-18",
    time: "11:00 AM - 03:30 PM",
    venue: "Seminar Hall B",
    description: "Learn how to build LLM agents, prompt engineering, and integrate AI models into modern React applications step-by-step.",
    organizer: "AI & Robotics Club",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 100,
    featured: false
  },
  {
    id: 7,
    name: "Battle of the Bands 2026",
    category: "Cultural",
    date: "2026-11-25",
    time: "05:00 PM - 09:30 PM",
    venue: "Open Air Amphitheatre",
    description: "Watch regional college rock & indie bands compete live for the grand trophy. High energy, electrifying music, and food stalls galore!",
    organizer: "Music Club (Octaves)",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 350,
    featured: false
  },
  {
    id: 8,
    name: "UI/UX Design Sprint & Figma Masterclass",
    category: "Creative",
    date: "2026-12-02",
    time: "01:00 PM - 04:30 PM",
    venue: "Innovation Center Lab 2",
    description: "Interactive UI design session covering auto-layout, component design systems, wireframing, and creating sleek interactive prototypes in Figma.",
    organizer: "Design Guild",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    registrationLimit: 75,
    featured: false
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: 101,
    eventId: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    collegeYear: "B.Tech CSE - 3rd Year",
    phone: "9876543210",
    registrationDate: "2026-09-28"
  },
  {
    id: 102,
    eventId: 1,
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    collegeYear: "B.Tech IT - 2nd Year",
    phone: "9812345678",
    registrationDate: "2026-09-29"
  },
  {
    id: 103,
    eventId: 2,
    name: "Rohan Verma",
    email: "rohan.v@college.edu",
    collegeYear: "B.Tech CSE - 2nd Year",
    phone: "9988776655",
    registrationDate: "2026-09-29"
  },
  {
    id: 104,
    eventId: 3,
    name: "Ananya Gupta",
    email: "ananya.g@college.edu",
    collegeYear: "B.Tech ECE - 1st Year",
    phone: "9765432109",
    registrationDate: "2026-09-30"
  },
  {
    id: 105,
    eventId: 4,
    name: "Kabir Singh",
    email: "kabir.singh@college.edu",
    collegeYear: "B.Tech ME - 4th Year",
    phone: "9845012345",
    registrationDate: "2026-09-30"
  }
];

export const CATEGORIES = [
  "All",
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Creative"
];

export const PRESET_IMAGES = [
  { label: "Coding / Tech", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" },
  { label: "Conference / Summit", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" },
  { label: "Cultural / Concert", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
  { label: "Sports / Arena", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80" },
  { label: "Photography / Art", url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80" },
  { label: "AI / Tech Innovation", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
  { label: "Music Band / Stage", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80" },
  { label: "UI Design / Creative", url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80" }
];
