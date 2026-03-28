import React, { useState } from 'react';
import { UserCheck, UserX, Search, Filter } from 'lucide-react';

const mockFaculty = [
  { id: 1, name: 'Prof. Sarah Jenkins', dept: 'CSE', status: 'Pending', role: 'Assistant Professor' },
  { id: 2, name: 'Dr. Michael Chen', dept: 'ECE', status: 'Approved', role: 'Associate Professor' },
  { id: 3, name: 'Dr. Emily Carter', dept: 'MECH', status: 'Pending', role: 'Professor' },
  { id: 4, name: 'Prof. David Wilson', dept: 'IT', status: 'Approved', role: 'Assistant Professor' },
];

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = faculty.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleApprove = (id) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, status: 'Approved' } : f));
  };

  const handleReject = (id) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, status: 'Rejected' } : f));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Personnel Audit</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Faculty Authentication & Performance Registry</p>
        </div>
        <div className="relative z-10 flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-brand-accent" size={20} />
            <input 
              type="text" 
              placeholder="Search Personnel Hub..." 
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-white/10 outline-none bg-white/5 text-white font-black text-xs placeholder:text-slate-600 focus:ring-2 focus:ring-brand-accent/40 hover:bg-white/[0.08] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-white hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Hub & Rank</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sector Index</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Auth Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Protocol Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFaculty.map((person) => (
                <tr key={person.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 text-brand-accent flex items-center justify-center font-black text-lg border border-white/10 shadow-2xl mr-5 group-hover:scale-110 transition-transform">
                        {person.name.split(' ')[1]?.[0] || person.name.charAt(5)}
                      </div>
                      <div>
                        <div className="font-black text-white text-base tracking-tight">{person.name}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{person.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10">
                      {person.dept} Hub
                    </span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border ${
                      person.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      person.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
                    }`}>
                      {person.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-right text-sm font-medium">
                     {person.status === 'Pending' ? (
                       <div className="flex justify-end gap-3">
                         <button onClick={() => handleApprove(person.id)} className="text-emerald-500 hover:text-white hover:bg-emerald-500 bg-emerald-500/10 p-3 rounded-[1rem] border border-emerald-500/20 transition-all">
                           <UserCheck size={20} />
                         </button>
                         <button onClick={() => handleReject(person.id)} className="text-brand-accent hover:text-white hover:bg-brand-accent bg-brand-accent/10 p-3 rounded-[1rem] border border-brand-accent/20 transition-all">
                           <UserX size={20} />
                         </button>
                       </div>
                     ) : (
                       <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Inspect Profile</button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredFaculty.length === 0 && (
          <div className="p-8 text-center text-gray-500">No faculty members found.</div>
        )}
      </div>
    </div>
  );
}
