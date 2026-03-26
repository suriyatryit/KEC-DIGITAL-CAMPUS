import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, GraduationCap, LayoutDashboard, Calendar, 
  BookOpen, ClipboardList, Settings, LogOut, Menu, X, Bell,
  Search,
  ChevronRight,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { ROLE_LABELS } from '../../utils/roles';
import { KingstonLogo } from '../common/KingstonLogo';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    navigate('/');
    return null;
  }

  const navItems = getNavigationByRole(user.role);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex text-[#1E293B] dark:text-[#F8FAFC] font-body relative overflow-hidden bg-transparent selection:bg-[#991B1B]/10">
      {/* Sidebar - Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-40 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-4 left-4 z-50 w-72 lg:static lg:translate-x-0 transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col bg-[#0F172A] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:m-4 border border-white/5 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        <div className="h-28 flex items-center justify-between px-8 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E293B] text-white relative overflow-hidden shrink-0 border-b border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#991B1B]/10 rounded-full blur-[40px] -mr-16 -mt-16"></div>
          <div className="relative z-10 w-full flex items-center justify-between">
            <KingstonLogo textColor="text-white" variant="small" iconSize={28} className="scale-110 origin-left" />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 mx-4 my-2 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#991B1B] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-red-900/40 transform hover:scale-105 transition-transform cursor-pointer">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-white tracking-tight truncate uppercase">{user.name}</p>
              <p className="text-[10px] text-[#991B1B] font-black uppercase tracking-[0.2em] mt-0.5">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-[#0F172A] shadow-xl shadow-black/20 translate-x-1' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#991B1B]' : 'opacity-40'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#991B1B] hover:bg-red-500/5 transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen relative px-4 pb-4">
        <header className="h-20 mt-4 mb-8 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-[32px] rounded-[2rem] flex items-center justify-between px-10 z-40 sticky top-4 shadow-xl shadow-black/5 border border-white/20 dark:border-white/5 mx-0 lg:mx-2 transition-all">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-[#0F172A] transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-end items-center gap-6">
            <button 
              onClick={() => {
                const html = document.documentElement;
                if (html.classList.contains('dark')) {
                  html.classList.remove('dark');
                } else {
                  html.classList.add('dark');
                }
              }}
              className="p-3 text-slate-400 hover:text-[#991B1B] transition-all rounded-[1.25rem] hover:bg-slate-50 dark:hover:bg-white/5"
              title="Toggle Theme"
            >
              <Moon size={20} className="hidden dark:block" />
              <Sun size={20} className="block dark:hidden" />
            </button>
            <button className="relative p-3 text-slate-400 hover:text-[#0F172A] transition-all rounded-[1.25rem] hover:bg-slate-50 dark:hover:bg-white/5">
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#991B1B] rounded-full ring-4 ring-white dark:ring-[#0F172A] shadow-lg animate-pulse"></span>
              <Bell size={20} />
            </button>
            <div className="h-12 w-12 rounded-[1.25rem] bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center shadow-2xl text-white ring-4 ring-slate-50 dark:ring-white/5">
              <span className="text-sm font-black">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto rounded-3xl custom-scrollbar relative px-2 lg:px-6">
          {/* Main animated layout wrapper */}
          <div className="relative z-10 max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
