import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const mockStudents = [
  { id: 'STU001', name: 'Suriya', semester: 3, attendance: 92, sgpa: 8.5, status: 'Good' },
  { id: 'STU002', name: 'Sarah Williams', semester: 3, attendance: 65, sgpa: 5.2, status: 'Critical' },
  { id: 'STU003', name: 'Michael Brown', semester: 3, attendance: 88, sgpa: 7.8, status: 'Average' },
  { id: 'STU004', name: 'Emma Davis', semester: 3, attendance: 98, sgpa: 9.6, status: 'Excellent' },
  { id: 'STU005', name: 'James Wilson', semester: 3, attendance: 55, sgpa: 4.5, status: 'Critical' },
];

export default function StudentMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Node Surveillance</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Academic Trajectory & Risk Mitigation Protocol</p>
        </div>
        <div className="relative z-10 flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-brand-accent" size={20} />
            <input 
              type="text" 
              placeholder="Search Student Hub..." 
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-white/10 outline-none bg-white/5 text-white font-black text-xs placeholder:text-slate-600 focus:ring-2 focus:ring-brand-accent/40 hover:bg-white/[0.08] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3 px-6 shadow-2xl">
            <Filter size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="px-10 py-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
           <h3 className="text-xl font-black text-white tracking-tight">Matrix Performance Metrics</h3>
           <div className="flex gap-6">
             <span className="flex items-center gap-2 text-[10px] font-black text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-4 py-2 rounded-xl border border-brand-accent/20"><AlertTriangle size={16} /> 12 Critical</span>
             <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/20"><TrendingUp size={16} /> 145 Excellent</span>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Student Unit</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Temporal Sem</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Presence Index</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">SGPA Rating</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Class Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">System Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 text-brand-accent flex items-center justify-center font-black text-lg border border-white/10 shadow-2xl mr-5 group-hover:scale-110 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-white text-base tracking-tight">{student.name}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-[11px] text-white font-black uppercase tracking-widest">
                    Sem {student.semester}
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                       <div className="w-32 bg-white/5 rounded-full h-2 border border-white/5 p-0.5">
                         <div className={`h-full rounded-full ${student.attendance < 75 ? 'bg-brand-accent' : 'bg-emerald-500'}`} style={{ width: `${student.attendance}%` }}></div>
                       </div>
                       <span className={`text-[10px] font-black ${student.attendance < 75 ? 'text-brand-accent' : 'text-slate-400'}`}>{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span className={`text-[11px] font-black flex items-center gap-2 ${student.sgpa < 6.0 ? 'text-brand-accent' : 'text-white'}`}>
                       {student.sgpa}
                       {student.sgpa < 6.0 ? <TrendingDown size={16} className="text-brand-accent" /> : <TrendingUp size={16} className="text-emerald-500" />}
                    </span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border ${
                      student.status === 'Critical' ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/20' :
                      student.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      student.status === 'Average' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-right">
                     <button className="text-[10px] font-black text-brand-accent hover:text-white hover:bg-brand-accent bg-brand-accent/10 px-6 py-3 rounded-xl border border-brand-accent/20 transition-all uppercase tracking-widest">Inspect Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
