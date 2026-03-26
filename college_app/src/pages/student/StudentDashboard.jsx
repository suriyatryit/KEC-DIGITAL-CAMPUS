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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-brand-primary p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Hello, {studentName}! 👋</h1>
          <p className="text-white/80">{user?.role === 'student' ? 'Student' : 'Faculty'} • Kingston Engineering College</p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
           <div className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl border border-white/20 text-center">
             <div className="text-xs text-white uppercase tracking-wider font-bold mb-1">Overall Attendance</div>
             <div className="text-3xl font-bold flex items-center gap-2">{stats.attendance}%</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-brand-primary" /> Today's Classes
          </h2>
          
          <div className="glass-panel rounded-2xl p-6 space-y-4">
             {todaysClasses.length > 0 ? todaysClasses.map((cls, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition bg-white/50">
                  <div className="bg-gray-100 text-brand-dark font-bold text-sm px-3 py-2 rounded-lg text-center min-w-[120px] flex flex-col justify-center border border-gray-200">
                    <span>{cls.time_slot}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900">{cls.subject}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">Lecture</span>
                      <span>•</span>
                      <span>Main Block</span>
                    </div>
                  </div>
                </div>
             )) : (
               <div className="text-center py-4 text-gray-400">No classes scheduled for today.</div>
             )}
          </div>

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pt-4">
            <TrendingUp className="text-green-500" /> Recent Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500 group hover:shadow-lg transition">
              <h3 className="text-sm font-medium text-gray-500">Latest Assessment</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">Performance</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">{stats.latestMark}/100</span>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-center">Updated</span>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 group hover:shadow-lg transition">
              <h3 className="text-sm font-medium text-gray-500">Current SGPA</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">Aggregate</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{stats.gpa}</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-center flex items-center gap-1"><TrendingUp size={14} /> Live</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="text-orange-500" /> Upcoming Deadlines
          </h2>
          <div className="glass-panel p-6 rounded-2xl space-y-4 max-h-[400px] overflow-y-auto">
             {deadlines.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-orange-100 bg-orange-50/30 hover:shadow-md transition group shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-1">{item.subject}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-100 w-fit px-2 py-1 rounded-md">
                        <Clock size={12} /> Pending Submission
                      </div>
                    </div>
                  </div>
                </div>
             ))}
             {deadlines.length === 0 && (
                <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                  <CheckCircle2 size={32} className="text-green-500 mb-2 opacity-50" />
                  <p>All caught up!</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
