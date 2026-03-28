'use client';

import { Users, Search, Filter } from 'lucide-react';

export default function DirectoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 glow-primary">
          <Users size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Institution Directory</h1>
          <p className="text-muted-foreground">Manage and overview all university stakeholders.</p>
        </div>
      </div>
      
      <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden h-[60vh] flex flex-col justify-center items-center text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="w-24 h-24 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20"><Users size={48} className="text-blue-400" /></div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">User Directory Synced</h2>
        <p className="text-indigo-200/80 max-w-lg text-lg leading-relaxed">System tracking <strong className="text-white">450 Faculty</strong>, <strong className="text-white">2800 Students</strong>, and <strong className="text-white">12 HODs</strong> securely via Firebase Identity Access Management.</p>
      </div>
    </div>
  );
}
