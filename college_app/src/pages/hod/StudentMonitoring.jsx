import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const mockStudents = [
  { id: 'STU001', name: 'Suriya', semester: 3, attendance: 92, sgpa: 8.5, status: 'Good' },
  { id: 'STU002', name: 'Sarah Williams', semester: 3, attendance: 65, sgpa: 5.2, status: 'Critical' },
  { id: 'STU003', name: 'Michael Brown', semester: 3, attendance: 88, sgpa: 7.8, status: 'Average' },
  { id: 'STU004', name: 'Emma Davis', semester: 3, attendance: 98, sgpa: 9.6, status: 'Excellent' },
  { id: 'STU005', name: 'James Wilson', semester: 3, attendance: 55, sgpa: 4.5, status: 'Critical' },
];

export default function StudentMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Monitoring</h1>
          <p className="text-gray-500 text-sm mt-1">Track academic performance and identify at-risk students</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center gap-2 px-4 shadow-sm">
            <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
           <h3 className="font-bold text-gray-700">Performance Metrics Overview</h3>
           <div className="flex gap-4 text-sm font-medium">
             <span className="flex items-center gap-1 text-red-600"><AlertTriangle size={14} /> 12 Critical</span>
             <span className="flex items-center gap-1 text-green-600"><TrendingUp size={14} /> 145 Excellent</span>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">SGPA</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold mr-3">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    Sem {student.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className="w-full bg-gray-200 rounded-full h-1.5 w-16">
                         <div className={`h-1.5 rounded-full ${student.attendance < 75 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${student.attendance}%` }}></div>
                       </div>
                       <span className={`text-sm font-bold ${student.attendance < 75 ? 'text-red-600' : 'text-gray-700'}`}>{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${student.sgpa < 6.0 ? 'text-red-600 flex items-center gap-1' : 'text-gray-900 flex items-center gap-1'}`}>
                       {student.sgpa}
                       {student.sgpa < 6.0 ? <TrendingDown size={14} className="text-red-500" /> : <TrendingUp size={14} className="text-green-500" />}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-lg ${
                      student.status === 'Critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                      student.status === 'Excellent' ? 'bg-green-100 text-green-800 border border-green-200' :
                      student.status === 'Average' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button className="text-brand-primary hover:underline font-bold text-xs bg-brand-primary/10 px-3 py-1.5 rounded-md hover:bg-brand-primary/20 transition">View Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
