import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, GraduationCap, TrendingUp, AlertCircle, Building, BarChart3, Activity } from 'lucide-react';

const studentData = [
  { name: 'CSE', students: 1200 },
  { name: 'ECE', students: 850 },
  { name: 'MECH', students: 600 },
  { name: 'CIVIL', students: 450 },
  { name: 'IT', students: 880 },
];

const performanceData = [
  { semester: 'Sem 1', passPercentage: 88 },
  { semester: 'Sem 2', passPercentage: 85 },
  { semester: 'Sem 3', passPercentage: 92 },
  { semester: 'Sem 4', passPercentage: 90 },
  { semester: 'Sem 5', passPercentage: 95 },
  { semester: 'Sem 6', passPercentage: 94 },
];

const COLORS = ['#991B1B', '#0F172A', '#1E293B', '#334155', '#475569'];

export default function ChairmanDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-7xl mx-auto px-4 lg:px-0 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-12 rounded-[2.5rem] border border-white/10 bg-brand-primary relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-6">
            <Activity size={14} className="text-brand-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">Executive Node Alpha</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-1">Executive Hub</h1>
          <p className="text-slate-500 font-bold text-sm mt-3 uppercase tracking-[0.3em] opacity-80">Institutional Intel & Strategic Vectors</p>
        </div>
        <div className="flex gap-4 relative z-10 mt-10 md:mt-0">
           <button className="px-10 py-5 bg-brand-accent text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all flex items-center gap-3">
             <BarChart3 size={16} /> Generate Briefing
           </button>
           <button className="px-10 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all">
             Audit Registry
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Enrolment', value: '3,980', trend: '+2.4%', color: 'brand-accent', icon: Users },
          { label: 'Academic Assets', value: '312', trend: '+12 Active', color: 'brand-primary', icon: GraduationCap },
          { label: 'Institutional Success', value: '92.4%', trend: '+1.2%', color: 'brand-secondary', icon: AlertCircle },
          { label: 'Strategic Units', value: '8', trend: 'Operational', color: 'slate-500', icon: Building }
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-start group relative overflow-hidden hover:bg-white/[0.04] transition-all duration-500" style={{animationDelay: `${i * 100}ms`}}>
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-2xl transform group-hover:scale-110 rotate-3 group-hover:rotate-0 transition-all bg-brand-accent/10 border border-brand-accent/20 text-brand-accent`}>
              <kpi.icon size={32} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{kpi.label}</p>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-4">{kpi.value}</h3>
            <p className={`text-[9px] font-black px-4 py-2 rounded-xl inline-flex items-center gap-2 ${kpi.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-400'}`}>
              {kpi.trend.startsWith('+') && <TrendingUp size={12} />} {kpi.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12">
        <div className="glass-panel p-12 rounded-[3.5rem] flex flex-col h-[560px] group transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-[0.02] rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shadow-2xl"><BarChart3 width={28} /></span>
                Enrollment Overview
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-4 uppercase tracking-[0.3em] opacity-60">Departmental Distribution Matrix</p>
            </div>
          </div>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', background: '#0F172A', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                />
                <Bar dataKey="students" fill="#991B1B" radius={[14, 14, 0, 0]} barSize={45}>
                  {
                    studentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#991B1B' : '#64748B'} opacity={0.8} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-12 rounded-[3.5rem] flex flex-col h-[560px] group transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400 opacity-[0.02] rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shadow-2xl"><Activity width={28} /></span>
                Academic Performance
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-4 uppercase tracking-[0.3em] opacity-60">Institutional Progress History</p>
            </div>
          </div>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', background: '#0F172A', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="passPercentage" 
                  stroke="#991B1B" 
                  strokeWidth={6} 
                  dot={{ r: 8, fill: '#0F172A', stroke: '#991B1B', strokeWidth: 4 }} 
                  activeDot={{ r: 12, strokeWidth: 0, fill: '#white' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
