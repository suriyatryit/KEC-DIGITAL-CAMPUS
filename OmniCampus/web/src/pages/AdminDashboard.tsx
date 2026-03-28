import { useState } from 'react';
import { BarChart3, Bell, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  const [announcement, setAnnouncement] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;
    alert('Announcement posted globally to all departments!');
    setAnnouncement('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Governance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600"><BarChart3 size={32} /></div>
          <div>
            <p className="text-sm text-gray-500">Today's Attendance</p>
            <p className="text-2xl font-bold">94.2%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-red-100 rounded-full text-red-600"><ShieldAlert size={32} /></div>
          <div>
            <p className="text-sm text-gray-500">At-Risk Students (AI Flag)</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow border border-gray-100">
        <h2 className="text-xl font-bold flex items-center space-x-2 mb-4">
          <Bell className="text-yellow-600" />
          <span>Publish Institution Notice</span>
        </h2>
        <form onSubmit={handlePost} className="space-y-4">
          <textarea 
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full text-lg p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
            placeholder="Important announcement for all students and staff..."
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded text-blue-600" />
              <span>Require Acknowledgment from recipients</span>
            </label>
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              Broadcast Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
