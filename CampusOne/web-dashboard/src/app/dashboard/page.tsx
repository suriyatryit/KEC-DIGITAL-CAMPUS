'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import ExecutiveDashboard from '@/components/dashboard/ExecutiveDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import FacultyDashboard from '@/components/dashboard/FacultyDashboard';

export default function DashboardOverview() {
  const { user } = useAuth();

  if (!user) return null;

  if (['CHAIRMAN', 'PRINCIPAL', 'HOD'].includes(user.role)) {
    return <ExecutiveDashboard />;
  }
  
  if (user.role === 'FACULTY') {
    return <FacultyDashboard />;
  }

  return <StudentDashboard />;
}
