import React, { useState } from 'react';
import { UserCheck, UserX, Search, Filter } from 'lucide-react';

const mockFaculty = [
  { id: 1, name: 'Prof. Sarah Jenkins', dept: 'CSE', status: 'Pending', role: 'Assistant Professor' },
  { id: 2, name: 'Dr. Michael Chen', dept: 'ECE', status: 'Approved', role: 'Associate Professor' },
  { id: 3, name: 'Dr. Emily Carter', dept: 'MECH', status: 'Pending', role: 'Professor' },
  { id: 4, name: 'Prof. David Wilson', dept: 'IT', status: 'Approved', role: 'Assistant Professor' },
];

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = faculty.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleApprove = (id) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, status: 'Approved' } : f));
  };

  const handleReject = (id) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, status: 'Rejected' } : f));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-500 text-sm mt-1">Approve accounts and monitor faculty performance</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search faculty..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name & Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredFaculty.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold mr-3">
                        {person.name.charAt(5)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-500">{person.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {person.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      person.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      person.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {person.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     {person.status === 'Pending' ? (
                       <div className="flex justify-end gap-2">
                         <button onClick={() => handleApprove(person.id)} className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-md transition">
                           <UserCheck size={18} />
                         </button>
                         <button onClick={() => handleReject(person.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md transition">
                           <UserX size={18} />
                         </button>
                       </div>
                     ) : (
                       <button className="text-gray-400 hover:text-brand-dark">View Profile</button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredFaculty.length === 0 && (
          <div className="p-8 text-center text-gray-500">No faculty members found.</div>
        )}
      </div>
    </div>
  );
}
