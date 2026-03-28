'use client';

import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

const stats = [
  { subject: 'Data Structures', code: 'CS301', present: 24, total: 28, percentage: 85, status: 'good' },
  { subject: 'Operating Systems', code: 'CS302', present: 18, total: 20, percentage: 90, status: 'good' },
  { subject: 'Linear Algebra', code: 'MA201', present: 15, total: 22, percentage: 68, status: 'warning' },
];

export default function StudentAttendanceView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex flex-col justify-between border-t border-t-primary/50 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary-400 mb-2">Overall Attendance</div>
          <div className="text-5xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">81.4%</div>
          <div className="text-[11px] uppercase tracking-widest font-bold text-success mt-4 flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-lg w-max border border-success/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <CheckCircle2 size={16}/> Above 75% Criteria
          </div>
        </div>
        
        <div className="md:col-span-2 glass-panel p-6 bg-slate-900/50">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 border-b border-white/5 pb-3">Subject Breakdown</h3>
          <div className="space-y-6">
            {stats.map(stat => (
              <div key={stat.code}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="font-bold text-white text-[15px]">{stat.subject}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                       <span className="text-secondary-400 bg-secondary/10 border border-secondary/20 px-1.5 py-0.5 rounded">{stat.code}</span> • {stat.present}/{stat.total} Classes
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${stat.status === 'warning' ? 'text-danger' : 'text-success'}`}>
                    {stat.percentage}%
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full transition-all duration-1000 ${stat.status === 'warning' ? 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-success shadow-[0_0_10px_rgba(16,185,129,0.8)]'}`} style={{ width: `${stat.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/30 p-6 rounded-2xl flex items-start gap-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
        <div className="text-warning mt-0.5"><AlertTriangle size={24}/></div>
        <div>
          <h4 className="font-bold text-warning text-lg mb-1">Attendance Warning</h4>
          <p className="text-warning-100/70 text-sm leading-relaxed">Your attendance in Linear Algebra (MA201) has dropped below 75%. Please ensure you attend the upcoming classes to avoid a condonation fee.</p>
        </div>
      </div>
    </div>
  );
}
