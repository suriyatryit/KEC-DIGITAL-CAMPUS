'use client';

import { useState } from 'react';
import { Send, AlertTriangle, Users, BookOpen } from 'lucide-react';

export default function BroadcastPanel() {
  const [isUrgent, setIsUrgent] = useState(false);
  const [target, setTarget] = useState('all');

  return (
    <div className="glass-panel p-8 max-w-3xl border-t border-t-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <h2 className="text-2xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-8">Compose Broadcast</h2>
      
      <div className="space-y-6 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target Audience</label>
             <select 
               value={target}
               onChange={(e) => setTarget(e.target.value)}
               className="glass-select border border-white/20"
             >
               <option value="all">All Students & Faculty</option>
               <option value="faculty">All Faculty Only</option>
               <option value="students">All Students Only</option>
               <option value="cs_dept">Computer Science Dept</option>
             </select>
           </div>
           
           <div>
             <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Broadcast Type</label>
             <div 
               onClick={() => setIsUrgent(!isUrgent)}
               className={`w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                 isUrgent ? 'bg-danger/20 border-danger/40 text-danger-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-slate-900/50 border-white/20 text-slate-400 hover:bg-white/5'
               }`}
             >
               <div className="flex items-center gap-2 font-medium text-sm text-white">
                 <AlertTriangle size={18} className={isUrgent ? 'text-danger' : 'text-slate-500'}/>
                 Mark as Urgent Alert
               </div>
               <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${isUrgent ? 'bg-danger shadow-inner shadow-black/50' : 'bg-slate-700 shadow-inner shadow-black/50'}`}>
                 <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${isUrgent ? 'translate-x-4' : 'translate-x-0'}`}></div>
               </div>
             </div>
           </div>
         </div>

         <div>
           <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subject Line</label>
           <input 
             type="text" 
             placeholder="Enter announcement subject..." 
             className="glass-input border-white/20"
           />
         </div>

         <div>
           <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message Body</label>
           <textarea 
             rows={8}
             placeholder="Type your broadcast message here..." 
             className="glass-input resize-y min-h-[150px] border-white/20"
           />
         </div>

         <div className="pt-4 justify-end flex items-center gap-4 border-t border-white/10 mt-6 pt-6">
           <button className="btn-secondary border-transparent bg-transparent text-slate-400 hover:text-white">Save Draft</button>
           <button className={`btn-primary px-8 ${isUrgent ? '!bg-danger hover:!bg-red-600 !shadow-[0_0_20px_rgba(239,68,68,0.4)] !border-danger' : '!bg-secondary hover:!bg-sky-400 !shadow-[0_0_20px_rgba(14,165,233,0.4)]'}`}>
             <Send size={16} className="-ml-1 text-white" /> Send Broadcast
           </button>
         </div>
      </div>
    </div>
  );
}
