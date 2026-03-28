'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { ShieldCheck, UserCog, GraduationCap, Users, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Launchpad() {
  const { user, login } = useAuth();
  const router = useRouter();

  if (user) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20 animate-in fade-in zoom-in duration-500">
        <div className="glass-panel p-10 md:p-14 border-t border-t-primary/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -top-10 -right-10 text-primary/10 group-hover:text-primary/20 transition-colors">
             <Sparkles size={120} />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent relative z-10">Welcome Back, {user.name}</h2>
          <p className="text-slate-400 mb-10 text-lg relative z-10">You are securely signed in as a {user.role}.</p>
          <button 
            onClick={() => router.push(user.role === 'STUDENT' ? '/dashboard/attendance' : '/dashboard/executive')}
            className="btn-primary w-full text-lg py-4 relative z-10"
          >
            Enter {user.role.replace('_', ' ')} Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="text-center max-w-3xl mx-auto pt-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          Unified Campus Intelligence
        </h1>
        <p className="text-lg md:text-xl text-slate-400">
          Select a role below to simulate the perspective of different stakeholders within the CampusOne ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <RoleCard 
          icon={<ShieldCheck size={32} />}
          title="Executive"
          desc="Institution-wide analytics, grievance tracking, and attendance overview."
          role="CHAIRMAN"
          login={login}
          glassClass="from-primary/20 to-primary/5 border-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] shadow-primary/10"
          textClass="text-primary-400"
        />
        <RoleCard 
          icon={<UserCog size={32} />}
          title="Principal / HOD"
          desc="Department supervision, broadcast messaging, and academic monitoring."
          role="HOD"
          login={login}
          glassClass="from-secondary/20 to-secondary/5 border-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] shadow-secondary/10"
          textClass="text-secondary-400"
        />
        <RoleCard 
          icon={<Users size={32} />}
          title="Faculty"
          desc="Classroom management, smart attendance grid, and assignment grading."
          role="FACULTY"
          login={login}
          glassClass="from-success/20 to-success/5 border-success/20 hover:border-success/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] shadow-success/10"
          textClass="text-success-400"
        />
        <RoleCard 
          icon={<GraduationCap size={32} />}
          title="Student"
          desc="Track attendance, submit grievances, and access the classroom studio."
          role="STUDENT"
          login={login}
          glassClass="from-accent/20 to-accent/5 border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] shadow-accent/10"
          textClass="text-accent-400"
        />
      </div>
      
      <div className="mt-20 pt-8 border-t border-white/10 text-center">
         <p className="text-sm text-slate-500 font-semibold mb-2 tracking-widest uppercase">Internal Demonstration Environment</p>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, desc, role, login, glassClass, textClass }: any) {
  return (
    <div 
      onClick={() => login(role)}
      className={`glass-panel p-6 md:p-8 cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 bg-gradient-to-b shadow-2xl ${glassClass}`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 ${textClass}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-sm text-slate-400 mb-8 flex-1">{desc}</p>
      <div className="w-full">
         <div className="btn-secondary w-full opacity-80 group-hover:opacity-100">
           Simulate Login
         </div>
      </div>
    </div>
  );
}
