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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">Subject-wise breakdown overview</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">Overall Attendance</p>
            <h2 className="text-3xl font-bold text-brand-dark">{overallPercentage}%</h2>
          </div>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 ${overallPercentage >= 75 ? 'border-green-500 text-green-500' : 'border-brand-primary text-brand-primary'}`}>
            {overallPercentage >= 75 ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
          </div>
        </div>
      </div>

      {/* View Toggle + Attendance Table/Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-base">Subject-wise Attendance</h2>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                view === 'table' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TableProperties size={13} /> Table
            </button>
            <button
              onClick={() => setView('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                view === 'cards' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutList size={13} /> Cards
            </button>
          </div>
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sessions</th>
                  <th className="text-center px-6 py-3 text-xs font-bold text-green-600 uppercase tracking-wider">Present</th>
                  <th className="text-center px-6 py-3 text-xs font-bold text-brand-primary uppercase tracking-wider">Absent</th>
                  <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">%</th>
                  <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {attendanceData.map((item, idx) => {
                  const isLow = item.percentage < 75;
                  const absent = item.total - item.attended;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition">
                      <td className="px-6 py-4 text-gray-400 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{item.subject}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{item.total}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">{item.attended}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-brand-primary">{absent}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`font-black text-sm ${isLow ? 'text-brand-primary' : 'text-green-600'}`}>{item.percentage}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${isLow ? 'bg-brand-primary' : 'bg-green-500'}`} style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          isLow ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {isLow ? '⚠ Low' : '✓ Good'}
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
