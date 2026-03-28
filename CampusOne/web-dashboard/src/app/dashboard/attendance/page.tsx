'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import FacultyAttendanceGrid from '@/components/attendance/FacultyAttendanceGrid';
import StudentAttendanceView from '@/components/attendance/StudentAttendanceView';
import { CalendarCheck } from 'lucide-react';

export default function AttendancePage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const isFacultyRole = ['FACULTY', 'HOD', 'PRINCIPAL', 'CHAIRMAN'].includes(user.role);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg shadow-primary/20">
          <CalendarCheck size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Smart Attendance</h1>
          <p className="text-slate-400">Manage and track student presence accurately.</p>
        </div>
      </div>

      {isFacultyRole ? <FacultyAttendanceGrid /> : <StudentAttendanceView />}
    </div>
  );
}
