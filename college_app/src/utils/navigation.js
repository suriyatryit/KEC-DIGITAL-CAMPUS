import { ROLES } from './roles';
import { 
  BarChart3, Users, BookOpen, Calendar, FileText, Settings, 
  MessageSquare, LayoutDashboard, Calculator, Bell, CheckSquare,
  GraduationCap
} from 'lucide-react';

export const getNavigationByRole = (role) => {
  const commonNav = [
    { label: 'Profile Settings', path: '/dashboard/settings', icon: Settings }
  ];

  switch (role) {
    case ROLES.CHAIRMAN:
      return [
        { label: 'Analytics', path: '/dashboard', icon: BarChart3 },
        { label: 'Departments', path: '/dashboard/departments', icon: Building2_ICON_MAPPED },
        { label: 'Faculty Control', path: '/dashboard/faculty', icon: Users },
        { label: 'Announcements', path: '/dashboard/announcements', icon: Bell },
        ...commonNav
      ];
    case ROLES.HOD:
      return [
        { label: 'Dept Analytics', path: '/dashboard', icon: BarChart3 },
        { label: 'Faculty Workload', path: '/dashboard/faculty', icon: Users },
        { label: 'Timetable', path: '/dashboard/timetable', icon: Calendar },
        { label: 'Students', path: '/dashboard/students', icon: GraduationCap },
        { label: 'Dept Notices', path: '/dashboard/announcements', icon: Bell },
        ...commonNav
      ];
    case ROLES.FACULTY:
      return [
        { label: 'Schedule', path: '/dashboard', icon: Calendar },
        { label: 'Attendance', path: '/dashboard/attendance', icon: CheckSquare },
        { label: 'Marks Entry', path: '/dashboard/marks', icon: FileText },
        { label: 'Materials', path: '/dashboard/materials', icon: BookOpen },
        { label: 'Leave Requests', path: '/dashboard/leaves', icon: LayoutDashboard },
        ...commonNav
      ];
    case ROLES.STUDENT:
      return [
        { label: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Timetable', path: '/dashboard/timetable', icon: Calendar },
        { label: 'Attendance', path: '/dashboard/attendance', icon: CheckSquare },
        { label: 'Results', path: '/dashboard/results', icon: FileText },
        { label: 'Assignments', path: '/dashboard/assignments', icon: BookOpen },
        { label: 'Materials', path: '/dashboard/materials', icon: BookOpen },
        { label: 'Leave Requests', path: '/dashboard/leaves', icon: Calendar },
        { label: 'Notices', path: '/dashboard/announcements', icon: Bell },
        ...commonNav
      ];
    default:
      return [{ label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }, ...commonNav];
  }
};

// Import workaround for Building2 within the array since it wasn't statically imported above
import { Building2 } from 'lucide-react';
const Building2_ICON_MAPPED = Building2;
