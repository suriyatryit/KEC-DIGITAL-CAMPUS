import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, BookOpen, AlertCircle, Edit3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const COLORS = ['#991B1B', '#0F172A', '#1E293B', '#334155', '#475569'];

export default function HODDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, avgAttendance: 0, lowPerformers: 0 });
  const [attendanceData, setAttendanceData] = useState([]);
  const [gradeDistribution, setGradeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHODData = async () => {
      setLoading(true);
      
      // 1. Total Students
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');

      // 2. Avg Attendance
      const { data: attData } = await supabase.from('attendance').select('status');
      const total = attData?.length || 0;
      const present = attData?.filter(a => a.status === 'present').length || 0;
      const avgAtt = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

      // 3. Low Performers & Grade Dist
      const { data: marksData } = await supabase.from('marks').select('marks_obtained');
      const low = marksData?.filter(m => m.marks_obtained < 40).length || 0;
      
      const counts = { O: 0, A: 0, B: 0, C: 0, F: 0 };
      marksData?.forEach(m => {
        if (m.marks_obtained >= 90) counts.O++;
        else if (m.marks_obtained >= 80) counts.A++;
        else if (m.marks_obtained >= 70) counts.B++;
        else if (m.marks_obtained >= 50) counts.C++;
        else counts.F++;
      });

      // Placeholder for attendance by subject - needs actual subject-wise data from DB
      // For now, let's create some dummy data or fetch if available
      const { data: subjectAttendanceData } = await supabase
        .from('attendance')
        .select('subject_name, status'); // Assuming 'subject_name' exists in attendance table

      const subjectAttendanceMap = {};
      subjectAttendanceData?.forEach(item => {
        if (!subjectAttendanceMap[item.subject_name]) {
          subjectAttendanceMap[item.subject_name] = { total: 0, present: 0 };
        }
        subjectAttendanceMap[item.subject_name].total++;
        if (item.status === 'present') {
          subjectAttendanceMap[item.subject_name].present++;
        }
      });

      const processedAttendanceData = Object.keys(subjectAttendanceMap).map(subject => ({
        subject: subject,
        attendance: ((subjectAttendanceMap[subject].present / subjectAttendanceMap[subject].total) * 100).toFixed(1)
      }));


      setStats({ totalStudents: count || 0, avgAttendance: avgAtt, lowPerformers: low });
      setGradeDistribution([
        { name: 'O (90+)', value: counts.O },
        { name: 'A (80+)', value: counts.A },
        { name: 'B (70+)', value: counts.B },
        { name: 'C (50+)', value: counts.C },
        { name: 'F (<50)', value: counts.F },
      ]);
      setAttendanceData(processedAttendanceData); // Set the processed attendance data
      setLoading(false);
    };

    fetchHODData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-6">
        <div className="w-16 h-16 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Synching Departmental Data Node...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Department Hub • <span className="text-brand-accent">CSE</span></h1>
          <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">Institutional Intel & Performance Vectors</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-8 rounded-[2rem] border-l-4 border-l-slate-400 group hover:bg-white/[0.04] transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Enrolment</p>
          <h3 className="text-3xl font-black text-white tracking-tighter">{stats.totalStudents}</h3>
        </div>
        <div className="glass-panel p-8 rounded-[2rem] border-l-4 border-l-brand-accent group hover:bg-white/[0.04] transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Aggregate Uptime</p>
          <h3 className="text-3xl font-black text-brand-accent tracking-tighter">{stats.avgAttendance}%</h3>
        </div>
        <div className="glass-panel p-8 rounded-[2rem] border-l-4 border-l-emerald-500 group hover:bg-white/[0.04] transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Node Security</p>
          <h3 className="text-3xl font-black text-emerald-500 tracking-tighter uppercase text-sm flex items-center gap-2">ACTIVE <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div></h3>
        </div>
        <div className="glass-panel p-8 rounded-[2rem] border-l-4 border-l-brand-accent group hover:bg-white/[0.04] transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Assessment</p>
          <h3 className="text-3xl font-black text-brand-accent tracking-tighter flex items-center gap-3">
            {stats.lowPerformers} <AlertCircle size={20} />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col h-[480px] relative overflow-hidden group hover:bg-white/[0.02] transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent opacity-[0.02] rounded-full blur-2xl"></div>
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 relative z-10">Attendance Vector by Unit (%)</h3>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} width={120} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: '#0F172A' }} />
                <Bar dataKey="attendance" fill="#991B1B" radius={[0, 8, 8, 0]} barSize={28}>
                   {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#991B1B' : '#0F172A'} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grades Pie Chart */}
        <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col h-[480px] relative overflow-hidden group hover:bg-white/[0.02] transition-all">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 relative z-10">Assessment Distribution Matrix</h3>
           <div className="flex-1 w-full relative -mt-4 z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: '#0F172A' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
