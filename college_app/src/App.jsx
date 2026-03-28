import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';

import DepartmentManagement from './pages/chairman/DepartmentManagement';
import FacultyManagement from './pages/chairman/FacultyManagement';
import FinanceOverview from './pages/chairman/FinanceOverview';
import Announcements from './components/common/Announcements';

import Timetable from './pages/hod/Timetable';
import StudentMonitoring from './pages/hod/StudentMonitoring';
import Attendance from './pages/faculty/Attendance';
import MarksEntry from './pages/faculty/MarksEntry';

import StudyMaterials from './pages/faculty/StudyMaterials';
import LeaveRequests from './pages/faculty/LeaveRequests';

import ExamResults from './pages/student/ExamResults';
import Assignments from './pages/student/Assignments';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentMaterials from './pages/student/StudentMaterials';
import StudentLeaves from './pages/student/StudentLeaves';

// A simple component to protect routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-primary gap-8">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 bg-brand-accent/10 rounded-xl backdrop-blur-sm border border-brand-accent/20 animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2 animate-pulse">Kingston Institutional Node</h2>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Synchronizing Encrypted Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Role-aware attendance page
const AttendancePage = () => {
  const { user } = useAuth();
  if (user?.role === 'student') return <StudentAttendance />;
  return <Attendance />;
};

// Role-aware materials page
const MaterialsPage = () => {
  const { user } = useAuth();
  if (user?.role === 'student') return <StudentMaterials />;
  return <StudyMaterials />;
};

// Role-aware leaves page
const LeavesPage = () => {
  const { user } = useAuth();
  if (user?.role === 'student') return <StudentLeaves />;
  return <LeaveRequests />;
};

const PlaceholderPage = ({ title }) => (
  <div className="p-8 text-center animate-in fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-500">This module is currently under development.</p>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="departments" element={<DepartmentManagement />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="finance" element={<FinanceOverview />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="students" element={<StudentMonitoring />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="marks" element={<MarksEntry />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="leaves" element={<LeavesPage />} />
        <Route path="results" element={<ExamResults />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="settings" element={<PlaceholderPage title="Profile Settings" />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Supabase Connection:', session ? 'Active Session' : 'No Active Session');
    }).catch(err => {
      console.error('Supabase Connection Error:', err);
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
