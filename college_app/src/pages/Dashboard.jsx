import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/roles';

import ChairmanDashboard from './chairman/ChairmanDashboard';
import HODDashboard from './hod/HODDashboard';
import FacultyDashboard from './faculty/FacultyDashboard';
import StudentDashboard from './student/StudentDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  switch (user.role) {
    case ROLES.CHAIRMAN:
    case ROLES.PRINCIPAL:
      return <ChairmanDashboard />;
    case ROLES.HOD:
      return <HODDashboard />;
    case ROLES.FACULTY:
      return <FacultyDashboard />;
    case ROLES.STUDENT:
    default:
      return <StudentDashboard />;
  }
}
