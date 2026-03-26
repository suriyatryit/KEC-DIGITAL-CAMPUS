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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-brand-dark p-8 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {profName}</h1>
          <p className="text-gray-300">You have {schedule.length} classes scheduled for today.</p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
           <div className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl border border-white/20 text-center">
             <div className="text-xs text-brand-primary-light uppercase tracking-wider font-bold mb-1">Status</div>
             <div className="text-lg font-bold flex items-center gap-2"><CheckCircle2 size={18} /> Online</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-brand-primary" /> Today's Schedule
          </h2>
          
          <div className="space-y-4">
            {schedule.length > 0 ? schedule.map((cls, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-primary hover:shadow-md transition relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 text-brand-dark font-bold text-sm px-3 py-2 rounded-lg text-center min-w-[120px]">
                      {cls.time_slot}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{cls.subject}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 font-medium bg-gray-100 px-2 rounded"><Users size={14}/> {cls.semester} {cls.section}</span>
                        <span>•</span>
                        <span>Main Block</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600">
                      Upcoming
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
          <h2 className="text-xl font-bold text-gray-900">Task Overview</h2>
          <div className="glass-panel p-6 rounded-2xl space-y-4">
             {pendingTasks.marks && (
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><AlertCircle size={20} /></div>
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Marks Entry Active</h4>
                    <p className="text-xs text-gray-500">Mid-Term Assessment</p>
                 </div>
               </div>
             )}
             
             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
               <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Clock size={20} /></div>
               <div>
                  <h4 className="font-bold text-sm text-gray-900">{pendingTasks.leaves} Leave Requests</h4>
                  <p className="text-xs text-gray-500">Pending Approval</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
