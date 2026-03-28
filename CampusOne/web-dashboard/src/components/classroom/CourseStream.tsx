'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { Send, FileText, Image as ImageIcon, Link2 } from 'lucide-react';

export default function CourseStream() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-3/4 space-y-6">
        
        {/* Post Creator */}
        {['FACULTY', 'HOD'].includes(user?.role || '') && (
          <div className="glass-panel p-4 flex gap-4 bg-slate-900/60 border-t border-t-secondary/50">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold flex-shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.4)]">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Announce something to your class..." 
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 min-h-[100px] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-1 text-slate-400">
                  <button className="p-2 hover:bg-white/10 hover:text-white rounded-lg transition-colors"><FileText size={20}/></button>
                  <button className="p-2 hover:bg-white/10 hover:text-white rounded-lg transition-colors"><ImageIcon size={20}/></button>
                  <button className="p-2 hover:bg-white/10 hover:text-white rounded-lg transition-colors"><Link2 size={20}/></button>
                </div>
                <button className="btn-primary !bg-secondary hover:!bg-sky-400 !shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Posts */}
        <div className="glass-panel p-6 bg-slate-900/40">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-white/10 shadow-[inner_0_1px_0_rgba(255,255,255,0.1)]">
                P
              </div>
              <div>
                <div className="font-bold text-white tracking-wide">Prof. Alan Turing</div>
                <div className="text-xs text-slate-400 mt-0.5">Oct 24 • Faculty</div>
              </div>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">Please review Chapter 4 on Graph Traversal algorithms before tomorrow's lab session. I have attached the supplementary notes below.</p>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 cursor-pointer transition-colors group">
             <div className="p-3 bg-danger/20 text-danger-400 rounded-lg border border-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"><FileText size={24}/></div>
             <div>
               <div className="font-bold text-white group-hover:text-primary-300 transition-colors">Graphs_Notes.pdf</div>
               <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-mono">PDF Document • 2.4 MB</div>
             </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold flex-shrink-0 text-xs border border-white/10">
                {user?.name.charAt(0)}
              </div>
              <div className="relative flex-1">
                <input type="text" placeholder="Add class comment..." className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-slate-600" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-secondary text-white rounded-full hover:bg-sky-400 transition-colors shadow-[0_0_10px_rgba(14,165,233,0.5)]"><Send size={14}/></button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full md:w-1/4">
        {/* Sidebar Info */}
        <div className="glass-panel p-5 bg-gradient-to-b from-accent/10 to-transparent border-t border-t-accent/50">
           <div>
             <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3">Upcoming Status</h3>
             <p className="text-white font-bold mb-1 text-sm">Assignment 3 is due tomorrow.</p>
             <p className="text-slate-400 text-xs leading-relaxed">Make sure to submit via portal before 11:59 PM.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
