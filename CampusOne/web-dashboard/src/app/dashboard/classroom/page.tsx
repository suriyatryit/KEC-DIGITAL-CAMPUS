'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import CourseStream from '@/components/classroom/CourseStream';
import AssignmentTracker from '@/components/classroom/AssignmentTracker';
import { BookOpen, Users, GraduationCap } from 'lucide-react';

export default function ClassroomPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('stream');

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0 border-b border-white/10 pb-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-gradient-to-br from-secondary to-blue-600 rounded-xl text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-1">Classroom Studio</h1>
            <p className="text-slate-400 font-medium">CS301: Data Structures & Algorithms</p>
          </div>
        </div>
        
        <div className="flex bg-slate-900/50 backdrop-blur-md border border-white/10 p-1.5 rounded-xl">
          <button 
             onClick={() => setActiveTab('stream')} 
             className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'stream' ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen size={16}/> Stream
          </button>
          <button 
             onClick={() => setActiveTab('classwork')} 
             className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'classwork' ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <GraduationCap size={16}/> Classwork
          </button>
          <button 
             onClick={() => setActiveTab('people')} 
             className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'people' ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={16}/> People
          </button>
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'stream' && <CourseStream />}
        {activeTab === 'classwork' && <AssignmentTracker />}
        {activeTab === 'people' && <div className="glass-panel border-dashed border-white/20 text-center py-20"><Users size={48} className="mx-auto text-slate-600 mb-4"/><h2 className="text-xl font-bold text-slate-500">Directory Integrated</h2></div>}
      </div>
    </div>
  );
}
