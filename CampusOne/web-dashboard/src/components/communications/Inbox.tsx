'use client';

import { Mail, Star, AlertCircle, Search, MoreVertical } from 'lucide-react';

const messages = [
  { id: 1, sender: 'Principal Office', subject: 'Urgent: Tomorrow\'s Holiday Declaration', preview: 'Due to severe weather conditions forecasted for tomorrow, the institution will remain closed...', date: '10:42 AM', isUrgent: true, isUnread: true },
  { id: 2, sender: 'CS Department HOD', subject: 'Mid-Term Examination Schedule', preview: 'Please find attached the finalized schedule for the upcoming Mid-Term examinations starting from...', date: 'Yesterday', isUrgent: false, isUnread: true },
  { id: 3, sender: 'Library Automation', subject: 'Overdue Books Warning', preview: 'This is an automated reminder that you have 2 books that are past their due date. Please return...', date: 'Oct 20', isUrgent: false, isUnread: false },
  { id: 4, sender: 'Campus Placement Cell', subject: 'Infosys Recruitment Drive Registration', preview: 'All eligible final year students must register for the upcoming Infosys campus drive by EOD...', date: 'Oct 18', isUrgent: false, isUnread: false },
];

export default function Inbox() {
  return (
    <div className="glass-panel overflow-hidden flex flex-col md:flex-row min-h-[600px] border-t-primary/50 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar List */}
      <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col bg-slate-900/50 backdrop-blur-md relative z-10">
        <div className="p-4 border-b border-white/10 bg-black/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search mail..." 
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.map(msg => (
            <div 
               key={msg.id} 
               className={`p-5 border-b border-white/5 cursor-pointer transition-colors relative ${msg.isUnread ? 'bg-primary/5' : 'hover:bg-white/5'}`}
            >
              {msg.isUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>}
              <div className="flex justify-between items-start mb-1">
                <div className={`font-bold text-sm ${msg.isUnread ? 'text-white' : 'text-slate-300'}`}>{msg.sender}</div>
                <div className="text-[10px] font-bold text-slate-500 whitespace-nowrap ml-2 uppercase tracking-[0.1em]">{msg.date}</div>
              </div>
              <div className={`text-sm mb-1.5 pr-4 ${msg.isUnread ? 'text-primary-300 font-bold' : 'text-slate-400 font-medium'}`}>
                {msg.isUrgent && <span className="inline-flex items-center gap-1 text-danger bg-danger/20 text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-danger/30 mr-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]"><AlertCircle size={10}/> Urgent</span>}
                {msg.subject}
              </div>
              <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{msg.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Reader */}
      <div className="hidden md:flex flex-col flex-1 relative z-10 bg-slate-900/30">
         <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/20">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">P</div>
               <div>
                  <div className="font-bold text-white text-lg">Principal Office</div>
                  <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mt-0.5">To: All Students & Faculty</div>
               </div>
            </div>
            <div className="flex gap-2">
               <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-accent transition-colors"><Star size={20}/></button>
               <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"><MoreVertical size={20}/></button>
            </div>
         </div>
         <div className="flex-1 p-8 md:p-12 overflow-y-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-danger/10 border border-danger/30 text-danger-400 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <AlertCircle size={14}/> High Priority Broadcast
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">Urgent: Tomorrow's Holiday Declaration Due to Severe Weather</h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-[15px] space-y-4">
              <p>Dear Students and Faculty,</p>
              <p>Due to the severe weather conditions and red alert issued by the meteorological department for tomorrow, the institution management has decided to declare a complete holiday for all academic and administrative activities.</p>
              <p>All scheduled examinations for tomorrow will be postponed. The revised dates will be communicated by the respective department heads shortly.</p>
              <p>Residential students are advised to stay indoors and contact the hostel warden for any emergencies.</p>
              <p>Stay safe.</p>
              <p className="pt-4 font-bold text-white">
                Regards,<br/>
                Dr. A. K. Sharma<br/>
                <span className="text-sm font-medium text-slate-400">Principal, Nexus University</span>
              </p>
            </div>
         </div>
         <div className="p-6 border-t border-white/10 bg-black/20 text-right">
            <button className="btn-primary inline-flex w-auto px-8 !bg-secondary hover:!bg-sky-400 !shadow-[0_0_15px_rgba(14,165,233,0.4)]">Acknowledge Receipt</button>
         </div>
      </div>
    </div>
  );
}
