'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { Clock, Calendar, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function FacultyDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-2">Good morning, {user?.name.split(' ')[0]}</h1>
          <p className="text-slate-400 text-lg">Your academic schedule and action items for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-6 md:p-8 bg-gradient-to-br from-slate-800/50 to-transparent">
            <h2 className="flex items-center gap-3 mb-6 text-white text-xl font-bold"><Calendar className="text-primary"/> Today's Schedule</h2>
            
            <div className="space-y-4">
              <ScheduleItem time="09:00 AM - 10:30 AM" course="CS301 - Data Structures" location="Lab 3" isNext={true} />
              <ScheduleItem time="11:00 AM - 12:00 PM" course="MA201 - Linear Algebra (Sub)" location="Room 402" isNext={false} />
              <ScheduleItem time="02:00 PM - 03:00 PM" course="Office Hours" location="Cabin 12" isNext={false} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 border-t-[4px] border-t-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-shadow">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-primary/20 text-primary flex items-center justify-center rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.4)]"><CheckCircle2 size={24}/></div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-0">Take Attendance</h3>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">2 active sessions</div>
                </div>
              </div>
              <Link href="/dashboard/attendance" className="btn-primary w-full shadow-md shadow-primary/20">Start Marking</Link>
           </div>
           
           <div className="glass-panel p-6 border-t-[4px] border-t-accent hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none blur-xl"></div>
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="p-3 bg-accent/20 text-accent flex items-center justify-center rounded-xl border border-accent/30 shadow-[0_0_15px_rgba(245,158,11,0.4)]"><FileText size={24}/></div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-0">Pending Grading</h3>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">42 submissions</div>
                </div>
              </div>
              <Link href="/dashboard/classroom" className="btn-secondary w-full relative z-10">Grade Now</Link>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({ time, course, location, isNext }: any) {
  return (
    <div className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all w-full cursor-pointer hover:bg-white/10 ${isNext ? 'bg-primary/5 border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.1)] relative overflow-hidden' : 'bg-white/5 border-white/10'}`}>
      {isNext && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>}
      <div className="flex items-center gap-5 pl-2 relative z-10">
        <div className={`p-3 rounded-xl border ${isNext ? 'bg-primary border-primary/50 text-white shadow-lg shadow-primary/40' : 'bg-slate-800 border-white/10 text-slate-400'}`}>
          <Clock size={20} />
        </div>
        <div>
           <div className="font-bold text-white text-[16px] mb-1">{course}</div>
           <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{time} <span className="mx-2 text-white/20">|</span> <span className="text-slate-300">{location}</span></div>
        </div>
      </div>
      {isNext && <span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-lg text-[10px] font-bold uppercase tracking-widest self-start md:self-auto relative z-10 shadow-[0_0_10px_rgba(139,92,246,0.2)]">Starting Now</span>}
    </div>
  );
}
