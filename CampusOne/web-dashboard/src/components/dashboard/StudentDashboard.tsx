'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { BookOpen, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Banner Area */}
      <div className="glass-panel overflow-hidden border-t border-t-primary/50 bg-gradient-to-br from-slate-900 to-slate-950 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row min-h-[200px]">
           <div className="p-8 md:p-12 lg:w-3/5 flex flex-col justify-center relative z-10">
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">Your Custom <br/>Action Hub</h1>
               <p className="text-slate-300 text-lg">
                 You have <strong className="text-primary-300 bg-primary/20 px-2 py-0.5 rounded border border-primary/30">2 pending assignments</strong> due this week and your attendance is at a healthy <strong className="text-success bg-success/10 px-2 py-0.5 rounded border border-success/30">82%</strong>.
               </p>
           </div>
           <div className="hidden lg:block lg:w-2/5 relative">
             <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950/80 z-10"></div>
             <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" alt="Students" className="w-full h-full object-cover opacity-60 mix-blend-overlay"/>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card hover:-translate-y-2 border-t-[4px] border-t-primary group">
            <div className="p-8 relative">
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors"><CheckCircle2 size={80}/></div>
              <div className="w-14 h-14 bg-primary/20 text-primary-400 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] relative z-10"><CheckCircle2 size={28}/></div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">My Attendance</h3>
              <p className="text-slate-400 mb-6 text-[14px] leading-relaxed relative z-10">Track your daily and subject-wise attendance percentages, securely verified.</p>
            </div>
            <div className="px-8 pb-8 pt-0 relative z-10">
               <Link href="/dashboard/attendance" className="btn-secondary w-full">View Details <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></Link>
            </div>
         </div>

         <div className="glass-card hover:-translate-y-2 border-t-[4px] border-t-secondary group">
            <div className="p-8 relative">
              <div className="absolute top-8 right-8 text-secondary/10 group-hover:text-secondary/20 transition-colors"><BookOpen size={80}/></div>
              <div className="w-14 h-14 bg-secondary/20 text-secondary-400 rounded-2xl flex items-center justify-center mb-6 border border-secondary/30 shadow-[0_0_15px_rgba(14,165,233,0.3)] relative z-10"><BookOpen size={28}/></div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Classroom Studio</h3>
              <p className="text-slate-400 mb-6 text-[14px] leading-relaxed relative z-10">Access premium study materials, assignments, and interact directly in class feeds.</p>
            </div>
             <div className="px-8 pb-8 pt-0 relative z-10">
               <Link href="/dashboard/classroom" className="btn-secondary w-full group">Go to Class <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></Link>
            </div>
         </div>

         <div className="glass-card border-dashed border-[2px] border-white/10 opacity-70 hover:opacity-100 transition-opacity">
            <div className="p-8">
               <div className="w-14 h-14 bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center mb-6 border border-white/10"><TrendingUp size={28}/></div>
               <h3 className="text-2xl font-bold text-slate-300 mb-3">Academic Vault</h3>
               <p className="text-slate-500 mb-6 text-[14px] leading-relaxed">View your official gradebook, CGPA roadmap, and CO-PO attainment evidence.</p>
               <span className="font-bold inline-flex items-center gap-2 uppercase tracking-[0.15em] text-[10px] text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 shadow-inner">Future Feature</span>
            </div>
         </div>
      </div>
    </div>
  );
}
