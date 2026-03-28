'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';

const routes = {
  global: [
    { name: 'Launchpad', href: '/', icon: <ShieldCheck size={20} /> },
  ],
  admin: [
    { name: 'Command Center', href: '/dashboard/executive', icon: <LayoutDashboard size={20} /> },
    { name: 'Communications', href: '/dashboard/communications', icon: <MessageSquare size={20} /> },
    { name: 'Grievance Tracking', href: '/dashboard/grievances', icon: <AlertTriangle size={20} /> },
  ],
  academic: [
    { name: 'Smart Attendance', href: '/dashboard/attendance', icon: <Users size={20} /> },
    { name: 'Classroom Studio', href: '/dashboard/classroom', icon: <BookOpen size={20} /> },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isGlobal = ['CHAIRMAN', 'PRINCIPAL'].includes(user.role);
  const isFaculty = user.role === 'FACULTY' || user.role === 'HOD';

  return (
    <aside className="hidden md:flex flex-col w-[260px] glass-panel !rounded-none !border-y-0 !border-l-0 shadow-none border-r border-white/10 h-[calc(100vh-72px)] sticky top-[72px] shrink-0 z-40">
      <div className="p-4 flex flex-col gap-6 pt-6">
        
        <NavSection title="System Access">
          {routes.global.map(route => (
             <NavItem key={route.href} route={route} isActive={pathname === route.href} />
          ))}
        </NavSection>

        {(isGlobal || user.role === 'HOD') && (
          <NavSection title="Administration">
            {routes.admin.map(route => (
              <NavItem key={route.href} route={route} isActive={pathname === route.href} />
            ))}
          </NavSection>
        )}

        <NavSection title="Academic Services">
          {routes.academic.map(route => (
            <NavItem key={route.href} route={route} isActive={pathname.startsWith(route.href)} />
          ))}
        </NavSection>

        {(user.role === 'STUDENT' || user.role === 'FACULTY') && (
          <NavSection title="Support">
            <NavItem route={{ name: 'Grievance Portal', href: '/dashboard/grievances', icon: <AlertTriangle size={20}/> }} isActive={pathname === '/dashboard/grievances'} />
          </NavSection>
        )}

      </div>
      
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-center">
          <div className="w-10 h-10 bg-primary/20 text-primary mx-auto rounded-full flex items-center justify-center mb-2">
             <ShieldCheck size={20}/>
           </div>
          <p className="text-xs font-semibold text-slate-300 mb-1">Campus Connectivity</p>
          <div className="text-[10px] text-green-400 font-mono flex items-center justify-center gap-1.5 uppercase tracking-widest"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div> Secure</div>
        </div>
      </div>
    </aside>
  );
}

function NavSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-3 mb-3">{title}</h4>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function NavItem({ route, isActive }: { route: any, isActive: boolean }) {
  return (
    <Link 
      href={route.href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
        isActive 
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
          : 'text-slate-400 border border-transparent hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={`${isActive ? 'text-primary' : 'text-slate-500'}`}>
        {route.icon}
      </div>
      {route.name}
    </Link>
  );
}
