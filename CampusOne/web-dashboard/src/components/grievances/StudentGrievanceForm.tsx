'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { CheckCircle2, Ticket, ShieldOff, Send, Check } from 'lucide-react';

export default function StudentGrievanceForm() {
  const { user } = useAuth();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full lg:w-2/3 glass-panel p-8 relative overflow-hidden text-left border-t border-t-warning/50 bg-gradient-to-br from-warning/10 to-transparent">
        <div className="absolute top-0 right-0 w-64 h-64 bg-warning/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="flex items-center gap-3 mb-8 text-white font-bold text-2xl relative z-10">
          <Ticket className="text-warning"/> File New Ticket
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <select className="glass-select border-white/20">
                <option>Infrastructure & Maintenance</option>
                <option>Academic & Grades</option>
                <option>Harassment / Anti-Ragging</option>
                <option>Library & Resources</option>
                <option>General Feedback</option>
              </select>
            </div>
            <div>
               <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Priority</label>
               <select className="glass-select border-white/20">
                <option>Low / Suggestion</option>
                <option>Medium / Service Request</option>
                <option className="text-danger-400 font-bold">High / Critical Issue</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
            <textarea 
              required
              rows={6}
              className="glass-input resize-y min-h-[120px] border-white/20"
              placeholder="Provide specific details so we can assist you efficiently..."
            />
          </div>

          <div 
             className={`p-4 rounded-xl border transition-all cursor-pointer ${isAnonymous ? 'bg-warning/20 border-warning/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-900/50 border-white/10 hover:bg-white/5'}`} 
             onClick={() => setIsAnonymous(!isAnonymous)}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-0.5 w-6 h-6 rounded border flex items-center justify-center transition-all flex-shrink-0 shadow-sm ${isAnonymous ? 'bg-warning border-warning text-slate-900' : 'border-white/20 bg-black/40'}`}>
                {isAnonymous && <Check size={16} strokeWidth={4}/>}
              </div>
              <div>
                <div className={`font-bold flex items-center gap-2 mb-1 ${isAnonymous ? 'text-warning' : 'text-white'}`}>
                   <ShieldOff size={16} className={isAnonymous ? 'text-warning' : 'text-slate-500'}/> Submit Anonymously
                </div>
                <p className="text-[13px] text-slate-400 mb-0">Your name and student ID will be hidden from staff handlers. Use for sensitive reports.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 text-right">
             <button 
              type="submit"
              disabled={isSubmitted}
              className={`btn-primary px-8 text-[15px] inline-flex ${
                isSubmitted 
                  ? '!bg-success/20 !text-success border !border-success/40 cursor-not-allowed shadow-none' 
                  : '!bg-warning hover:!bg-amber-500 !shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              }`}
            >
              {isSubmitted ? (
                <><CheckCircle2 size={18} className="text-success"/> Submitted Successfully</>
              ) : (
                <><Send size={16} className="text-white"/> File Official Ticket</>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="w-full lg:w-1/3 flex flex-col gap-5">
        <h3 className="text-white font-bold mb-2 border-b border-white/10 pb-2">Your Open Tickets</h3>
        
        <div className="glass-card p-5 hover:border-warning/50 transition-colors cursor-pointer border-l-[4px] border-l-warning">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-warning bg-warning/20 px-2.5 py-1 rounded-md border border-warning/30">INFRASTRUCTURE</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Oct 20</span>
          </div>
          <h4 className="text-white font-bold text-[16px] mb-2 leading-tight">Broken A/C in Lab 3</h4>
          <p className="text-[13px] text-slate-400 mb-4 line-clamp-2">The air conditioning unit in CS Lab 3 is leaking water onto the floor.</p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-secondary bg-secondary/20 inline-flex px-2.5 py-1 rounded-md border border-secondary/30 uppercase tracking-widest">
            <Ticket size={12}/> In Progress
          </div>
        </div>

        <div className="glass-card p-5 hover:border-success/50 transition-colors cursor-pointer border-l-[4px] border-l-success">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-300 bg-primary/20 px-2.5 py-1 rounded-md border border-primary/30">ACADEMIC</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Sep 15</span>
          </div>
          <h4 className="text-white font-bold text-[16px] mb-2 leading-tight">Missing Assignment Grade</h4>
          <p className="text-[13px] text-slate-400 mb-4 line-clamp-2">My submission for CS301 Assignment 1 has not been graded yet.</p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-success bg-success/20 inline-flex px-2.5 py-1 rounded-md border border-success/30 uppercase tracking-widest">
            <CheckCircle2 size={12}/> Resolved
          </div>
        </div>
      </div>
    </div>
  );
}
