'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { ClipboardList, CheckCircle2, Clock, FileText } from 'lucide-react';

const assignments = [
  { id: 1, title: 'Chapter 1: Linked Lists Review', due: 'Tomorrow, 11:59 PM', points: 100, topic: 'Data Structures', status: 'pending' },
  { id: 2, title: 'Tree Traversal Implementation', due: 'Oct 28, 11:59 PM', points: 50, topic: 'Data Structures', status: 'pending' },
  { id: 3, title: 'Array Fundamentals Quiz', due: 'Past Due', points: 20, topic: 'Basics', status: 'missing' },
  { id: 4, title: 'Course Primer Assignment', due: 'Sep 10', points: 10, topic: 'Introduction', status: 'done' },
];

export default function AssignmentTracker() {
  const { user } = useAuth();
  const isFaculty = ['FACULTY', 'HOD'].includes(user?.role || '');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 border-t-[4px] border-t-primary">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Assigned</div>
          <div className="text-4xl font-bold text-white">24</div>
        </div>
        {!isFaculty && (
          <div className="glass-card p-6 border-t-[4px] border-t-warning">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">To Review</div>
            <div className="text-4xl font-bold text-white flex items-center gap-3">
              2 <span className="text-[10px] px-2 py-1 bg-warning/20 border border-warning/30 text-warning-400 rounded-md uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.2)]">Due Soon</span>
            </div>
          </div>
        )}
        {isFaculty && (
          <div className="glass-card p-6 border-t-[4px] border-t-warning">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Needs Grading</div>
            <div className="text-4xl font-bold text-white">42</div>
          </div>
        )}
        <div className="glass-card p-6 border-t-[4px] border-t-success">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class Average</div>
          <div className="text-4xl font-bold text-white">84.2%</div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        {isFaculty && (
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-slate-900/50 relative z-10">
            <h2 className="text-lg font-bold text-white mb-0">Manage Assignments</h2>
            <button className="btn-secondary text-sm px-4 py-2 hover:bg-white/10 border-white/20">
              + Create New
            </button>
          </div>
        )}
        
        <div className="divide-y divide-white/10 relative z-10">
          {assignments.map(a => (
            <div key={a.id} className="p-6 hover:bg-white/5 transition-colors group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <div className={`p-4 rounded-xl flex-shrink-0 border shadow-lg ${
                  a.status === 'done' ? 'bg-success/10 text-success border-success/30 shadow-success/20' :
                  a.status === 'missing' ? 'bg-danger/10 text-danger border-danger/30 shadow-danger/20' :
                  'bg-primary/10 text-primary border-primary/30 shadow-primary/20 group-hover:bg-primary/20'
                }`}>
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary-300 transition-colors mb-1.5">{a.title}</h3>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                     <span className="text-primary-400 bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{a.topic}</span>
                     <span className="text-white/20">•</span>
                     <span className={a.status === 'missing' ? 'text-danger flex items-center gap-1 font-bold' : 'flex items-center gap-1'}>
                       <Clock size={14}/> Due: {a.due}
                     </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1 mt-2 md:mt-0 pl-16 md:pl-0">
                {!isFaculty && (
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                    a.status === 'done' ? 'bg-success/20 text-success border-success/30' :
                    a.status === 'missing' ? 'bg-danger/20 text-danger border-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                    'bg-slate-800 text-slate-400 border-white/10'
                  }`}>
                    {a.status === 'done' ? 'Turned In' : a.status === 'missing' ? 'Missing' : 'Assigned'}
                  </span>
                )}
                {isFaculty && (
                   <div className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-widest">12 / 60 Graded</div>
                )}
                <div className="text-sm font-bold text-white mt-1">{a.points} Points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
