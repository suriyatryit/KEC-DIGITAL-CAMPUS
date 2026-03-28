'use client';

import { useState } from 'react';
import { Check, X, Clock, Users } from 'lucide-react';

const mockStudents = [
  { id: 'CS24001', name: 'Aarav Patel', status: 'present' },
  { id: 'CS24002', name: 'Ishita Sharma', status: 'absent' },
  { id: 'CS24003', name: 'Rohan Gupta', status: 'present' },
  { id: 'CS24004', name: 'Ananya Singh', status: 'late' },
];

export default function FacultyAttendanceGrid() {
  const [students, setStudents] = useState(mockStudents);

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="glass-panel p-6 border-t border-t-primary/50 bg-gradient-to-b from-slate-900/80 to-slate-900/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">CS301: Data Structures</h2>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono text-primary-300">Section A</span>
            <span>10:00 AM - 11:30 AM</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Mark All Present</button>
          <button className="btn-primary shadow-lg shadow-primary/20 hover:shadow-primary/40">Submit Record</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <div key={student.id} className={`p-4 rounded-xl border transition-all hover:-translate-y-1 ${
            student.status === 'present' ? 'bg-success/10 border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
            student.status === 'absent' ? 'bg-danger/10 border-danger/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
            'bg-warning/10 border-warning/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                {student.name.charAt(0)}
              </div>
              <div className="flex gap-1 bg-black/40 border border-white/5 p-1 rounded-lg">
                <button 
                  onClick={() => toggleStatus(student.id, 'present')} 
                  className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${student.status === 'present' ? 'bg-success text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-slate-500 hover:bg-white/10 hover:text-white'}`}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
                <button 
                  onClick={() => toggleStatus(student.id, 'absent')} 
                  className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${student.status === 'absent' ? 'bg-danger text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-slate-500 hover:bg-white/10 hover:text-white'}`}
                >
                  <X size={14} strokeWidth={3} />
                </button>
                <button 
                  onClick={() => toggleStatus(student.id, 'late')} 
                  className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${student.status === 'late' ? 'bg-warning text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-slate-500 hover:bg-white/10 hover:text-white'}`}
                >
                  <Clock size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
            <div>
              <div className="font-bold text-white mb-0.5">{student.name}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-widest">{student.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
