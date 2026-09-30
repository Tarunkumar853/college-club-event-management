import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, PlusCircle, ArrowLeft, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminSidebar = ({ onOpenAddModal }) => {
  const { events, registrations, resetToDefaultData } = useApp();

  const links = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Event Management', path: '/admin/events', icon: Calendar, badge: events.length },
    { name: 'Registered Students', path: '/admin/registrations', icon: Users, badge: registrations.length },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base text-white block leading-tight">Admin Portal</span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Control Panel</span>
          </div>
        </div>
      </div>

      {/* Main Action CTA */}
      <div className="p-4">
        <button
          onClick={onOpenAddModal}
          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-2 space-y-1.5">
        <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          Management
        </div>

        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Demo Reset Data & Return to Site */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={resetToDefaultData}
          className="w-full py-2 px-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Student Site</span>
        </Link>
      </div>
    </aside>
  );
};
