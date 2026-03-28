import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, LayoutList, TableProperties } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function StudentAttendance() {
  const { user } = useAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('table');

  useEffect(() => {
    if (!user) return;

    const fetchAttendance = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select('subject, status')
        .eq('student_id', user.id);

      if (error) {
        console.error('Error fetching student attendance:', error);
      } else {
        // Group by subject
        const grouped = data.reduce((acc, curr) => {
          if (!acc[curr.subject]) {
            acc[curr.subject] = { subject: curr.subject, total: 0, attended: 0 };
          }
          acc[curr.subject].total += 1;
          if (curr.status === 'present') {
            acc[curr.subject].attended += 1;
          }
          return acc;
        }, {});

        // Convert to array and add percentage
        const finalData = Object.values(grouped).map(item => ({
          ...item,
          percentage: Math.round((item.attended / item.total) * 100),
          id: item.subject // Use subject as ID for now
        }));

        setAttendanceData(finalData);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [user]);

  const overallAttended = attendanceData.reduce((acc, curr) => acc + curr.attended, 0);
  const overallTotal = attendanceData.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = overallTotal > 0 ? Math.round((overallAttended / overallTotal) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Institutional Attendance</h1>
          <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">Subject-wise breakdown overview</p>
        </div>
        <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl px-10 py-6 rounded-3xl border border-white/10 relative z-10 shadow-2xl">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AGGREGATE UPTIME</p>
            <h2 className="text-4xl font-black text-white tracking-tighter">{overallPercentage}%</h2>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl ${overallPercentage >= 75 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand-accent/10 text-brand-accent'}`}>
            {overallPercentage >= 75 ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
          </div>
        </div>
      </div>

      {/* View Toggle + Attendance Table/Cards */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
        <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="font-black text-white text-xs uppercase tracking-[0.2em]">Subject-wise Vector Analysis</h2>
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === 'table' ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'text-slate-500 hover:text-white'
              }`}
            >
              <TableProperties size={14} /> Matrix
            </button>
            <button
              onClick={() => setView('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === 'cards' ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'text-slate-500 hover:text-white'
              }`}
            >
              <LayoutList size={14} /> Nodes
            </button>
          </div>
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5">
                  <th className="text-left px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">#</th>
                  <th className="text-left px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Subject Node</th>
                  <th className="text-center px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total SESS</th>
                  <th className="text-center px-10 py-5 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Uptime</th>
                  <th className="text-center px-10 py-5 text-[10px] font-black text-brand-accent uppercase tracking-[0.2em]">Downtime</th>
                  <th className="text-center px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Ratio (%)</th>
                  <th className="text-center px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendanceData.map((item, idx) => {
                  const isLow = item.percentage < 75;
                  const absent = item.total - item.attended;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.04] transition-colors group">
                      <td className="px-10 py-6 text-slate-600 font-bold text-xs">{idx + 1}</td>
                      <td className="px-10 py-6 font-black text-white text-base tracking-tight">{item.subject}</td>
                      <td className="px-10 py-6 text-center font-black text-slate-400">{item.total}</td>
                      <td className="px-10 py-6 text-center">
                        <span className="font-black text-emerald-500">{item.attended}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="font-black text-brand-accent">{absent}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className={`font-black text-sm tracking-tighter ${isLow ? 'text-brand-accent' : 'text-emerald-500'}`}>{item.percentage}%</span>
                          <div className="w-20 bg-white/5 rounded-full h-1.5 border border-white/5 overflow-hidden">
                            <div className={`h-full rounded-full ${isLow ? 'bg-brand-accent shadow-[0_0_10px_rgba(153,27,27,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          isLow ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                          {isLow ? '⚠ Risk' : '✓ Secure'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 gap-4">
            {attendanceData.map((item) => {
              const isLow = item.percentage < 75;
              return (
                <div key={item.id} className="p-5 rounded-xl border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition bg-gray-50/50">
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="font-bold text-base text-gray-900">{item.subject}</h3>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${isLow ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                       <div className={`h-2 rounded-full ${isLow ? 'bg-brand-primary' : 'bg-green-500'}`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                       <span>{item.attended} Attended</span>
                       <span>{item.total - item.attended} Absent</span>
                       <span>{item.total} Total</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
