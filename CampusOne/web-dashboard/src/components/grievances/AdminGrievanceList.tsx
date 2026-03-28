'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

const activeTickets = [
  { id: 'TKT-1042', category: 'Infrastructure', student: 'Alex Harper', priority: 'High', status: 'Open', time: '2 hours ago', title: 'Broken A/C in Lab 3' },
  { id: 'TKT-1043', category: 'Academic', student: 'Anonymous', priority: 'Medium', status: 'In Progress', time: 'Yesterday', title: 'Unfair grading in Midterms' },
  { id: 'TKT-1044', category: 'General', student: 'Sarah Jenkins', priority: 'Low', status: 'Open', time: '2 days ago', title: 'Cafeteria food quality drop' },
];

export default function AdminGrievanceList() {
  const { user } = useAuth();
  const isAdmin = ['CHAIRMAN', 'PRINCIPAL', 'HOD'].includes(user?.role || '');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-2">
        <div className="glass-card p-6 border-l-[4px] border-white/50 bg-white/5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Open Tickets</div>
          <div className="text-4xl font-bold text-white">14</div>
        </div>
        <div className="glass-card p-6 border-l-[4px] border-danger bg-danger/10">
          <div className="text-[10px] font-bold text-danger uppercase tracking-widest mb-1">Critical Priority</div>
          <div className="text-4xl font-bold text-danger flex items-center gap-3">
             3 <AlertTriangle size={24} className="animate-pulse shadow-danger/50"/>
          </div>
        </div>
        <div className="glass-card p-6 border-l-[4px] border-secondary bg-secondary/10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">In Progress</div>
          <div className="text-4xl font-bold text-white">8</div>
        </div>
        <div className="glass-card p-6 border-l-[4px] border-success bg-success/10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resolved 7d</div>
          <div className="text-4xl font-bold text-white">42</div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden border-t-warning/30 bg-gradient-to-br from-warning/5 to-transparent">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 backdrop-blur-md relative z-10">
          <h2 className="text-xl font-bold text-white mb-0">Active Ticket Queue</h2>
          <div className="flex gap-2">
            <button className="btn-primary flex-1 md:flex-none text-xs px-4 py-2 !bg-warning hover:!bg-amber-500 !shadow-[0_0_15px_rgba(245,158,11,0.3)]">Needs Action</button>
            <button className="btn-secondary flex-1 md:flex-none text-xs px-4 py-2 border-white/20">All Tickets</button>
          </div>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-black/40">
                <th className="p-5 font-bold">Ticket ID</th>
                <th className="p-5 font-bold">Details</th>
                <th className="p-5 font-bold">Priority</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {activeTickets.map((ticket, i) => (
                <tr key={ticket.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer" tabIndex={0}>
                  <td className="p-5 align-top">
                    <div className="font-bold text-warning-400 tracking-wide text-[13px]">{ticket.id}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest">{ticket.time}</div>
                  </td>
                  <td className="p-5 align-top">
                    <div className="font-bold text-white text-[15px] mb-1.5 group-hover:text-warning-300 transition-colors">{ticket.title}</div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                      <span className="text-secondary bg-secondary/10 px-2 py-0.5 rounded-md border border-secondary/20">{ticket.category}</span>
                      <span className="text-white/20">•</span>
                      <span className={ticket.student === 'Anonymous' ? 'text-warning bg-warning/10 px-2 py-0.5 rounded-md border border-warning/20 italic' : ''}>{ticket.student}</span>
                    </div>
                  </td>
                  <td className="p-5 align-center">
                     <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md border inline-block ${
                       ticket.priority === 'High' ? 'bg-danger/20 text-danger border-danger/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 
                       ticket.priority === 'Medium' ? 'bg-warning/20 text-warning border-warning/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 
                       'bg-success/20 text-success border-success/40'
                     }`}>
                       {ticket.priority}
                     </span>
                  </td>
                  <td className="p-5 align-center">
                     <div className="flex items-center gap-2 text-[12px] font-bold text-slate-300">
                       {ticket.status === 'Open' && <span className="text-warning-400 flex items-center gap-1.5"><ShieldAlert size={14}/> Open</span>}
                       {ticket.status === 'In Progress' && <span className="text-secondary-400 flex items-center gap-1.5"><Clock size={14}/> Working</span>}
                     </div>
                  </td>
                  <td className="p-5 text-right align-middle">
                    <button className="btn-secondary border-white/20 shadow-none text-[12px] py-1.5 px-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                       Review <MessageSquare size={14}/>
                    </button>
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
