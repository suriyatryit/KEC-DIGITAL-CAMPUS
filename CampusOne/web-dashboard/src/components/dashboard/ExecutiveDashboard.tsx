'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { 
  Sparkles, Users, TrendingUp, TrendingDown, 
  AlertTriangle, BookOpen, Activity, ArrowRight 
} from 'lucide-react';

export default function ExecutiveDashboard() {
  const { user } = useAuth();
  const isGlobal = user?.role === 'CHAIRMAN' || user?.role === 'PRINCIPAL';
  const scopeText = isGlobal ? 'Institution-Wide' : 'Departmental';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-2">{scopeText} Command Center</h1>
          <p className="text-slate-400 text-lg">
            Real-time insights and operational health for {user?.department || 'Nexus University'}.
          </p>
        </div>
      </div>

      {/* AI Pulse Card */}
      <div className="glass-panel p-6 md:p-8 border-l border-l-primary/50 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full point-events-none"></div>
        <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
          <div className="p-4 bg-primary/20 rounded-2xl text-primary flex-shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-primary/30">
            <Sparkles size={32} />
          </div>
          <div className="mt-1">
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-xl font-bold text-white mb-0 uppercase tracking-widest">Campus Pulse</h2>
              <span className="px-3 py-1 bg-success/20 text-success text-[11px] border border-success/30 font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div> AI Synthesized
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[16px] max-w-4xl">
              Overall attendance is stable at <strong className="text-white">87%</strong>. We detected a <strong className="text-danger">4% drop in the Mechanical Department</strong> over the last 3 days. There are currently <strong className="text-warning">3 critical infrastructure grievances</strong> open, primarily concerning Lab Equipment. Faculty engagement is high, with 92% of mid-term grades already published.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Avg. Attendance" value="87.2%" trend="+1.2%" isUp={true} icon={<Users size={24}/>} color="text-secondary" bg="bg-secondary/20" border="border-secondary/30" />
        <KpiCard title="Active Grievances" value="14" trend="-3" isUp={true} icon={<AlertTriangle size={24}/>} color="text-warning" bg="bg-warning/20" border="border-warning/30" />
        <KpiCard title="Syllabus Coverage" value="64%" trend="+4%" isUp={true} icon={<BookOpen size={24}/>} color="text-success" bg="bg-success/20" border="border-success/30" />
        <KpiCard title="System Health" value="99.9%" trend="Stable" isUp={null} icon={<Activity size={24}/>} color="text-primary" bg="bg-primary/20" border="border-primary/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* At-Risk Students */}
        <div className="lg:col-span-2 glass-panel p-6 border-t border-t-danger/50 bg-gradient-to-b from-danger/5 to-transparent">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center gap-3 mb-0 text-white font-bold text-lg">
               <AlertTriangle className="text-danger"/> At-Risk Students 
               <span className="text-[10px] font-bold text-danger border border-danger/30 px-2 py-1 rounded-full uppercase bg-danger/20 tracking-widest">Flagged</span>
            </h3>
            <button className="text-sm text-primary hover:text-white font-bold transition-colors flex items-center gap-1.5 border border-primary/30 px-3 py-1.5 rounded-lg bg-primary/10">Full Report <ArrowRight size={16}/></button>
          </div>
          
          <div className="space-y-3">
            <RiskRow name="Samuel Adams" id="CS24099" dept="Comp Sci" factor="Consecutive Absences (5 Days)" risk="High" />
            <RiskRow name="Priya Kumar" id="ME24102" dept="Mechanical" factor="Sudden drop in Assignment Grades" risk="Medium" />
            <RiskRow name="Liam Chen" id="EE24055" dept="Electrical" factor="Multiple Grievance Flags" risk="Low" />
          </div>
        </div>

        {/* Attendance Heatmap Mock */}
        <div className="glass-panel p-6 flex flex-col bg-gradient-to-b from-slate-800/50 to-transparent">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-white font-bold text-lg"><Activity className="text-secondary"/> Dept Heatmap</h3>
            <p className="text-[13px] text-slate-400 font-medium">Today's relative attendance ranking.</p>
          </div>
          
          <div className="flex-1 space-y-6 mt-2">
            <Bar dept="Computer Sci" percent={92} color="bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <Bar dept="Electrical"   percent={85} color="bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <Bar dept="Business"     percent={88} color="bg-secondary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
            <Bar dept="Mechanical"   percent={74} color="bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, isUp, icon, color, bg, border }: any) {
  return (
    <div className={`glass-card p-6 flex flex-col justify-between group`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-xl ${bg} ${color} border ${border} flex items-center justify-center transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        {isUp !== null && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${isUp ? 'text-success bg-success/10 border-success/20' : 'text-danger bg-danger/10 border-danger/20'}`}>
            {isUp ? <TrendingUp size={14}/> : <TrendingDown size={14}/>} {trend}
          </div>
        )}
      </div>
      <div>
         <div className="text-[12px] font-bold text-slate-400 tracking-widest uppercase mb-1">{title}</div>
         <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      </div>
    </div>
  );
}

function RiskRow({ name, id, dept, factor, risk }: any) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/10 transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-white text-[15px] mb-0.5 group-hover:text-primary-300 transition-colors">{name} <span className="text-slate-500 text-[11px] ml-2 font-bold tracking-widest uppercase">{id}</span></div>
          <div className="text-[13px] text-slate-400">{dept} <span className="mx-2 text-white/20">•</span> <span className="text-warning/90 font-medium">{factor}</span></div>
        </div>
      </div>
      <div className="flex sm:justify-end">
        <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase border ${
          risk === 'High' ? 'bg-danger/20 text-danger-300 border-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 
          risk === 'Medium' ? 'bg-warning/20 text-warning border-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 
          'bg-success/20 text-success border-success/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
        }`}>
          {risk}
        </span>
      </div>
    </div>
  );
}

function Bar({ dept, percent, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between text-[13px] mb-2 font-bold">
        <span className="text-slate-400 group-hover:text-white transition-colors">{dept}</span>
        <span className="text-white">{percent}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
