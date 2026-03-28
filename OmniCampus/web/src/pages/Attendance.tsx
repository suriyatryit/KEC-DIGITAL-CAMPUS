import { useState } from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';

export default function Attendance() {
  const [sessionActive, setSessionActive] = useState(false);
  const students = [
    { id: 1, name: 'John Doe', rollNo: '21CS101', status: 'present' },
    { id: 2, name: 'Alice Smith', rollNo: '21CS102', status: 'absent' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">CS401 Computer Networks</h1>
          <p className="text-blue-700">Period 3 (10:00 AM) • Room 4B</p>
        </div>
        <button 
          onClick={() => setSessionActive(!sessionActive)}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${sessionActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {sessionActive ? 'End Session' : 'Start QR Session'}
        </button>
      </div>

      {sessionActive && (
        <div className="bg-white p-12 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-64 h-64 bg-black flex items-center justify-center text-white font-bold text-xl rounded">
            [ ROTATING QR CODE ]
          </div>
          <p className="text-gray-600 flex items-center space-x-2">
            <ShieldAlert size={18} className="text-yellow-600" />
            <span>Anti-fraud dynamic QR enabled. Expires in 5s.</span>
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Roll No</th>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 text-gray-600">{student.rollNo}</td>
                <td className="p-4 font-medium text-gray-800">{student.name}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {student.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-2 border rounded hover:bg-green-50 text-green-600"><Check size={16}/></button>
                  <button className="p-2 border rounded hover:bg-red-50 text-red-600"><X size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
