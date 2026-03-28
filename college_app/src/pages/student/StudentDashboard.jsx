import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ attendance: 0, gpa: 0, latestMark: 0 });
  const [todaysClasses, setTodaysClasses] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashData = async () => {
      setLoading(true);
      
      // 1. Attendance
      const { data: attData } = await supabase.from('attendance').select('status').eq('student_id', user.id);
      const totalAtt = attData?.length || 0;
      const present = attData?.filter(a => a.status === 'present').length || 0;
      const attPercent = totalAtt > 0 ? ((present / totalAtt) * 100).toFixed(1) : 0;

      // 2. Marks & GPA
      const { data: marksData } = await supabase.from('marks').select('*').eq('student_id', user.id);
      const latest = marksData?.[marksData.length - 1]?.marks_obtained || 0;
      const gpa = marksData?.length > 0 
        ? (marksData.reduce((acc, m) => acc + (m.marks_obtained / 10), 0) / marksData.length).toFixed(2)
        : 0;

      // 3. Timetable (Today)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = days[new Date().getDay()];
      const { data: timeData } = await supabase.from('timetable').select('*').eq('day', today);

      // 4. Deadlines
      const { data: assignData } = await supabase.from('assignments').select('*').eq('student_id', user.id).eq('status', 'pending').limit(3);

      setStats({ attendance: attPercent, gpa, latestMark: latest });
      setTodaysClasses(timeData || []);
      setDeadlines(assignData || []);
      setLoading(false);
    };

    fetchDashData();
  }, [user]);

  const studentName = (user?.name || user?.username || '').split(' ')[0] || 'Student';
  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto px-4 lg:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-accent opacity-[0.05] rounded-full transform translate-x-1/4 -translate-y-1/4 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Hello, {studentName}! 👋</h1>
          <p className="text-white/80">{user?.role === 'student' ? 'Student' : 'Faculty'} • Kingston Engineering College</p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0 flex gap-6">
           <div className="bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-[1.75rem] border border-white/10 text-center shadow-xl">
             <div className="text-[10px] text-brand-accent uppercase tracking-[0.2em] font-black mb-1">AGGREGATE UPTIME</div>
             <div className="text-4xl font-black flex items-center gap-2 tracking-tighter">{stats.attendance}%</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 ml-2">
            <Clock size={16} className="text-brand-accent" /> Active Nodes (Timetable)
          </h2>
          
          <div className="space-y-4">
             {todaysClasses.length > 0 ? todaysClasses.map((cls, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-[2rem] border border-white/5 hover:border-brand-accent/30 transition-all bg-white/[0.02] group/item hover:bg-white/[0.04] shadow-sm">
                  <div className="bg-brand-primary/50 text-white font-black text-xs px-5 py-3 rounded-2xl text-center min-w-[140px] flex flex-col justify-center border border-white/10 group-item-hover:border-brand-accent/20 transition-colors">
                    <span className="tracking-widest uppercase opacity-60 text-[9px] mb-1">Time Slot</span>
                    <span className="tracking-tighter text-sm">{cls.time_slot}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-black text-xl text-white tracking-tight">{cls.subject}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">
                      <span className="bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded text-brand-accent">Lecture Node</span>
                      <span>•</span>
                      <span>Main Institutional Block</span>
                    </div>
                  </div>
                </div>
             )) : (
               <div className="text-center py-12 text-slate-500 border border-dashed border-white/5 rounded-[2rem]">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">No classes detected in current node</p>
               </div>
             )}
          </div>

          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 pt-8 ml-2">
            <TrendingUp size={16} className="text-brand-accent" /> Strategic Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-[2.5rem] border-l-4 border-l-brand-accent relative overflow-hidden group hover:bg-white/[0.04] transition-all">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-accent opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Latest Audit</h3>
              <p className="text-2xl font-black text-white mt-1 tracking-tight">System Performance</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-4xl font-black text-brand-accent tracking-tighter">{stats.latestMark}/100</span>
                <span className="text-[10px] font-black text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">DB SYNCED</span>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-[2.5rem] border-l-4 border-l-slate-400 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
               <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-400 opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cumulative GPA</h3>
              <p className="text-2xl font-black text-white mt-1 tracking-tight">Institutional Aggregate</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-4xl font-black text-white tracking-tighter">{stats.gpa}</span>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> LIVE NODE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 ml-2">
            <AlertCircle size={16} className="text-brand-accent" /> Security Deadlines
          </h2>
          <div className="glass-panel p-8 rounded-[2.5rem] space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
             {deadlines.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:scale-125 transition-transform"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-white tracking-tight truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 opacity-70">{item.subject}</p>
                      <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-brand-accent bg-brand-accent/5 w-fit px-3 py-1.5 rounded-lg border border-brand-accent/10 uppercase tracking-widest">
                        <Clock size={12} className="animate-pulse" /> Pending Submission
                      </div>
                    </div>
                  </div>
                </div>
             ))}
             {deadlines.length === 0 && (
                <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/5 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-brand-accent opacity-20" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">All nodes operational</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
