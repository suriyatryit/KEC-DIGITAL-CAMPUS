'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Inbox from '@/components/communications/Inbox';
import BroadcastPanel from '@/components/communications/BroadcastPanel';
import { MessageSquare, Megaphone, Inbox as InboxIcon } from 'lucide-react';

export default function CommunicationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inbox');
  
  if (!user) return null;

  const canBroadcast = ['CHAIRMAN', 'PRINCIPAL', 'HOD', 'ADMIN'].includes(user.role);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0 mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-gradient-to-br from-primary to-violet-600 rounded-xl text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-primary/50">
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-1">Communications Hub</h1>
            <p className="text-slate-400 font-medium">Institutional messaging and priority broadcasts.</p>
          </div>
        </div>
        
        {canBroadcast && (
          <div className="flex bg-slate-900/50 backdrop-blur-md border border-white/10 p-1.5 rounded-xl">
            <button 
               onClick={() => setActiveTab('inbox')} 
               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inbox' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <InboxIcon size={16}/> Inbox
            </button>
            <button 
               onClick={() => setActiveTab('broadcast')} 
               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'broadcast' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Megaphone size={16}/> Broadcast Center
            </button>
          </div>
        )}
      </div>

      {activeTab === 'inbox' ? <Inbox /> : <BroadcastPanel />}
    </div>
  );
}
