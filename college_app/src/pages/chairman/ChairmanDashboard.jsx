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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-10 rounded-[3rem] border border-white/10 bg-[#0F172A] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#991B1B]/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white tracking-tighter">Executive Hub</h1>
          <p className="text-slate-400 font-black text-xs mt-3 uppercase tracking-[0.3em] opacity-80">Institutional Analytics & Performance Tracking</p>
        </div>
        <div className="flex gap-4 relative z-10 mt-8 md:mt-0">
           <button className="px-10 py-4 bg-[#991B1B] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-red-900/40 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all">
             Generate Briefing
           </button>
           <button className="px-10 py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] hover:bg-white/5 transition-all">
             View Registry
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Students', value: '3,980', trend: '+2.4%', color: '#991B1B', icon: Users },
          { label: 'Academic Staff', value: '312', trend: '+12 Active', color: '#0F172A', icon: GraduationCap },
          { label: 'Success Rate', value: '92.4%', trend: '+1.2%', color: '#1E293B', icon: AlertCircle },
          { label: 'Departments', value: '8', trend: 'Operational', color: '#64748B', icon: Building }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] flex flex-col items-start group relative overflow-hidden shadow-xl border border-slate-50 hover:shadow-2xl transition-all duration-500" style={{animationDelay: `${i * 100}ms`}}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform`} style={{ backgroundColor: kpi.color, color: '#fff' }}>
              <kpi.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{kpi.label}</p>
            <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter mb-4">{kpi.value}</h3>
            <p className={`text-[10px] font-black px-4 py-2 rounded-xl inline-flex items-center gap-2 ${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
              {kpi.trend.startsWith('+') && <TrendingUp size={12} />} {kpi.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 flex flex-col h-[520px] group transition-all">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-black text-[#1E293B] flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center text-white shadow-xl shadow-slate-900/20"><BarChart3 width={24} /></span>
                Enrollment Overview
              </h3>
              <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">Departmental Distribution Matrix</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(15,23,42,0.02)' }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', background: 'white' }}
                />
                <Bar dataKey="students" fill="#0F172A" radius={[12, 12, 0, 0]} barSize={40}>
                  {
                    studentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0F172A' : '#991B1B'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 flex flex-col h-[520px] group transition-all">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-black text-[#1E293B] flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#991B1B] flex items-center justify-center text-white shadow-xl shadow-red-900/20"><Activity width={24} /></span>
                Academic Performance
              </h3>
              <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">Institutional Progress History</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', background: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="passPercentage" 
                  stroke="#0F172A" 
                  strokeWidth={8} 
                  dot={{ r: 10, fill: 'white', stroke: '#991B1B', strokeWidth: 5 }} 
                  activeDot={{ r: 14, strokeWidth: 0, fill: '#991B1B' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
