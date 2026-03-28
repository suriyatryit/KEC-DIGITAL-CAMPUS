'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import StudentGrievanceForm from '@/components/grievances/StudentGrievanceForm';
import AdminGrievanceList from '@/components/grievances/AdminGrievanceList';
import { AlertTriangle } from 'lucide-react';

export default function GrievancesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-5 px-4 md:px-0 mb-8 border-b border-white/10 pb-6">
        <div className="p-3 bg-gradient-to-br from-warning to-orange-600 rounded-xl text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-warning/50">
          <AlertTriangle size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-1">Student Feedback & Grievances</h1>
          <p className="text-slate-400 font-medium">Submit feedback or resolve active infrastructure and academic tickets.</p>
        </div>
      </div>

      <div className="px-4 md:px-0">
         {user.role === 'STUDENT' ? <StudentGrievanceForm /> : <AdminGrievanceList />}
      </div>
    </div>
  );
}
