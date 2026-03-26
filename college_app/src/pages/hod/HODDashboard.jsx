import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, BookOpen, AlertCircle, Edit3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const COLORS = ['#E63946', '#1D3557', '#457B9D', '#A8DADC', '#F1FAEE'];

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading department metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Overview - CSE</h1>
          <p className="text-gray-500 text-sm mt-1">Computer Science & Engineering performance metrics</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-dark">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalStudents}</h3>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-primary">
          <p className="text-sm font-medium text-gray-500 mb-1">Average Attendance</p>
          <h3 className="text-3xl font-bold text-brand-primary">{stats.avgAttendance}%</h3>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500">
          <p className="text-sm font-medium text-gray-500 mb-1">System Health</p>
          <h3 className="text-3xl font-bold text-gray-900">Active</h3>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500">
          <p className="text-sm font-medium text-gray-500 mb-1">Low Performers</p>
          <h3 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            {stats.lowPerformers} <AlertCircle size={18} />
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Attendance by Subject (%)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 11 }} width={120} />
                <Tooltip cursor={{ fill: 'rgba(230, 57, 70, 0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="attendance" fill="#1D3557" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grades Pie Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col h-[400px]">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Latest Internal Marks Distribution</h3>
           <div className="flex-1 w-full relative -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
