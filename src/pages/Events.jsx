import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { EventGrid } from '../components/EventGrid';
import { useApp } from '../context/AppContext';
import { Compass } from 'lucide-react';

export const Events = () => {
  const { events } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setActiveCategory(catFromUrl);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredEvents = events.filter((evt) => {
    const matchesCategory =
      activeCategory === 'All' || evt.category.toLowerCase() === activeCategory.toLowerCase();

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      evt.name.toLowerCase().includes(query) ||
      evt.description.toLowerCase().includes(query) ||
      evt.organizer.toLowerCase().includes(query) ||
      evt.venue.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleReset = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Campus Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Events
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Filter and search through upcoming college events, workshops, hackathons, and sports matches. Register in seconds.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="space-y-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="max-w-2xl">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        
        <div className="pt-2 flex items-center justify-between gap-4">
          <CategoryFilter activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
          
          <span className="hidden sm:inline-block text-xs text-slate-500 font-semibold shrink-0">
            Showing {filteredEvents.length} of {events.length} events
          </span>
        </div>
      </div>

      {/* Events Grid */}
      <EventGrid events={filteredEvents} onResetFilter={handleReset} />
    </div>
  );
};
