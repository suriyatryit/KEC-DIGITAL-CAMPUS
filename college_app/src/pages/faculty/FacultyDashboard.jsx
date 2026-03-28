import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [pendingTasks, setPendingTasks] = useState({ leaves: 0, marks: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashData = async () => {
      setLoading(true);
      
      // 1. Schedule (Today)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = days[new Date().getDay()];
      const { data: timeData } = await supabase.from('timetable').select('*').eq('day', today);
      setSchedule(timeData || []);

      // 2. Pending Tasks
      const { count: leaveCount } = await supabase.from('leaves').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      setPendingTasks({ leaves: leaveCount || 0, marks: true }); // Marks usually always has some pending entry in a real app

      setLoading(false);
    };

    fetchDashData();
  }, [user]);

  const profName = (user?.name || user?.username || '').split(' ')[0] || 'Faculty';
  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-accent opacity-[0.05] rounded-full transform translate-x-1/4 -translate-y-1/4 blur-[100px]" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome back, {profName}</h1>
          <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] opacity-80">Institutional Node • {schedule.length} active sessions today</p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0 flex gap-4">
           <div className="bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-2xl border border-white/10 text-center shadow-xl flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <div className="text-[10px] font-black uppercase tracking-widest">LIVE STATUS: ONLINE</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 ml-2">
            <Clock size={16} className="text-brand-accent" /> Strategic Schedule
          </h2>
          
          <div className="space-y-4">
            {schedule.length > 0 ? schedule.map((cls, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-brand-accent/30 transition-all bg-white/[0.02] group/item hover:bg-white/[0.04] shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover/item:scale-125 transition-transform"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className="bg-brand-primary/50 text-white font-black text-xs px-5 py-3 rounded-2xl text-center min-w-[140px] border border-white/10">
                      <span className="tracking-widest uppercase opacity-60 text-[9px] block mb-1">Session Block</span>
                      <span className="text-sm tracking-tighter">{cls.time_slot}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">{cls.subject}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded border border-white/10"><Users size={14} className="text-brand-accent"/> {cls.semester} {cls.section}</span>
                        <span>•</span>
                        <span>Institutional Hub</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-2 text-[10px] font-black rounded-lg bg-brand-accent/10 text-brand-accent border border-brand-accent/20 uppercase tracking-widest">
                      ACTIVE NODE
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="glass-panel p-10 text-center text-gray-400 rounded-2xl">No classes for today.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Operational Tasks</h2>
          <div className="glass-panel p-8 rounded-[2.5rem] space-y-6">
             {pendingTasks.marks && (
               <div className="flex items-center gap-4 p-5 bg-brand-accent/5 rounded-2xl border border-brand-accent/10 group hover:bg-brand-accent/10 transition-colors">
                 <div className="bg-brand-accent text-white p-3 rounded-xl shadow-lg shadow-brand-accent/20"><AlertCircle size={20} /></div>
                 <div>
                    <h4 className="font-black text-sm text-white tracking-tight">Audit Entry Active</h4>
                    <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest mt-1">Institutional Assessment</p>
                 </div>
               </div>
             )}
             
             <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
               <div className="bg-slate-700 text-white p-3 rounded-xl"><Clock size={20} /></div>
               <div>
                  <h4 className="font-black text-sm text-white tracking-tight">{pendingTasks.leaves} Registry Requests</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Awaiting Clearance</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
