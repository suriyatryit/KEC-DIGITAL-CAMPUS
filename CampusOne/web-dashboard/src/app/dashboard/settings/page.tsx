'use client';

import { Settings, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-slate-500/20 rounded-2xl text-slate-400 border border-slate-500/30 shadow-lg glow-primary">
          <Settings size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Manage CampusOne configuration and roles.</p>
        </div>
      </div>
      
      <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden h-[60vh] flex flex-col justify-center items-center shadow-2xl">
        <div className="w-24 h-24 bg-slate-500/10 rounded-3xl flex items-center justify-center mb-6 border border-slate-500/20"><Shield size={48} className="text-slate-400" /></div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">RBAC Configuration Locked</h2>
        <p className="text-indigo-200/80 max-w-lg text-center text-lg leading-relaxed">Semester transition functions and strict role-based policy overrides are locked for demo user permutations.</p>
      </div>
    </div>
  );
}
