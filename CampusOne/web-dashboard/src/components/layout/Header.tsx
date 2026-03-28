'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { Bell, LogOut, Menu, UserCircle, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-x-0 !border-t-0 shadow-none border-b border-white/10 h-[72px]">
      <div className="container-max h-full flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <button className="p-2 md:hidden text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <Sparkles size={20} className="text-white"/>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-white tracking-tight leading-none mb-1">CampusOne</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Operating System</div>
            </div>
          </Link>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search faculty, students, or resources..." 
              className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
               <span className="text-[10px] font-mono text-slate-500 border border-slate-700/50 bg-slate-800/50 px-1.5 py-0.5 rounded">⌘</span>
               <span className="text-[10px] font-mono text-slate-500 border border-slate-700/50 bg-slate-800/50 px-1.5 py-0.5 rounded">K</span>
            </div>
          </div>
        </div>

        {/* User Context */}
        <div className="flex items-center justify-end">
          {user ? (
            <div className="flex items-center py-2">
              <button className="relative p-2.5 text-slate-400 hover:bg-white/10 hover:text-white rounded-full transition-colors mr-2">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
              </button>
              
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10 mr-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{user.name}</div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{user.role.replace('_', ' ')}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold border border-white/10">
                  {user.name.charAt(0)}
                </div>
              </div>

              <button 
                onClick={logout}
                className="p-2.5 text-slate-500 hover:text-danger hover:bg-danger/10 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="text-sm font-bold tracking-widest uppercase text-slate-500 px-4">Offline Mode</div>
          )}
        </div>
      </div>
    </header>
  );
}
