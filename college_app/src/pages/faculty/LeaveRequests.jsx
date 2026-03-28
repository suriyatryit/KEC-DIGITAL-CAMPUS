import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, FilePenLine, CheckCircle2, Clock, XCircle, Search, User, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const statusConfig = {
  pending:  { label: 'Pending',  icon: Clock,         cls: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', icon: CheckCircle2,  cls: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', icon: XCircle,       cls: 'bg-red-100 text-brand-primary' },
};

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [search, setSearch] = useState('');
  const [actionModal, setActionModal] = useState(null); 
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leaves')
      .select(`
        *,
        profiles:student_id (
          name,
          role
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leave requests:', error);
    } else {
      setLeaves(data);
    }
    setLoading(false);
  };

  const confirmAction = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('leaves')
      .update({ status: actionModal.status, remarks: remarks })
      .eq('id', actionModal.id);

    if (error) {
      alert('Error updating leave: ' + error.message);
    } else {
      await fetchLeaves();
      setActionModal(null);
    }
    setLoading(false);
  };

  const handleAction = (id, status) => {
    setActionModal({ id, status });
    setRemarks('');
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const filteredLeaves = leaves.filter(l => {
    if (filter !== 'all' && l.status !== filter) return false;
    const studentName = l.profiles?.name || '';
    if (search && !studentName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pendingCount = leaves.filter(l => l.status === 'pending').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12 relative">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-6">
             <div className="bg-brand-accent/10 text-brand-accent p-4 rounded-2xl border border-brand-accent/20 shadow-2xl"><FilePenLine size={28} /></div>
             Clearance Protocols
          </h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-3 opacity-80">Review and Authorize Personnel Leave Requests</p>
        </div>
        <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-accent transition-colors" />
            <input type="text" placeholder="Search Applicant Hub..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border border-white/10 rounded-2xl outline-none bg-white/5 text-white font-black text-xs placeholder:text-slate-600 focus:ring-2 focus:ring-brand-accent/40 hover:bg-white/[0.08] transition-all" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
             className="px-6 py-4 text-xs font-black uppercase tracking-widest border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white cursor-pointer hover:bg-white/10 transition-all appearance-none pr-10">
             <option value="all" className="bg-brand-primary text-white">All Protocols</option>
             <option value="pending" className="bg-brand-primary text-white">Pending ({pendingCount})</option>
             <option value="approved" className="bg-brand-primary text-white">Authorized</option>
             <option value="rejected" className="bg-brand-primary text-white">Denied</option>
          </select>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        {filteredLeaves.length === 0 ? (
          <div className="py-24 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">No clearance requests synchronized in this sector.</div>
        ) : (
           <div className="divide-y divide-white/5">
              {filteredLeaves.map(leave => {
                const cfg = statusConfig[leave.status];
                const StatusIcon = cfg.icon;
                const studentName = leave.profiles?.name || 'Unknown';
                const studentRole = leave.profiles?.role || 'student';
                const duration = Math.max(1, Math.round((new Date(leave.end_date) - new Date(leave.start_date)) / 86400000) + 1);

                return (
                  <div key={leave.id} className="p-8 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row justify-between gap-8 group">
                     <div className="flex-1 relative overflow-hidden">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="h-14 w-14 rounded-2xl bg-white/5 text-brand-accent flex items-center justify-center font-black text-xl border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
                            {studentName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-black text-white text-xl tracking-tight leading-tight mb-1">{studentName}</h3>
                            <div className="flex items-center gap-4">
                              <span className={`text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-lg border ${studentRole === 'faculty' ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/20' : 'bg-white/5 text-slate-500 border-white/10'}`}>{studentRole} Index</span>
                              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                                leave.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                leave.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
                              }`}>
                                 <StatusIcon size={14} /> {leave.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                             <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Temporal Duration</p>
                             <p className="text-sm text-white font-bold flex items-center gap-3"><CalendarIcon size={16} className="text-brand-accent" /> {formatDate(leave.start_date)} {leave.start_date !== leave.end_date ? `→ ${formatDate(leave.end_date)}` : ''} <span className="text-slate-500 ml-2">({duration} Units)</span></p>
                          </div>
                          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                             <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Mission Intelligence (Reason)</p>
                             <p className="text-sm text-slate-300 leading-relaxed font-medium italic">"{leave.reason}"</p>
                          </div>
                        </div>
                        
                        {leave.remarks && (
                          <div className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-widest bg-brand-accent/5 p-4 rounded-xl border border-brand-accent/10 flex items-center gap-3">
                            <div className="w-1.5 h-4 bg-brand-accent rounded-full" />
                            <span className="text-brand-accent opacity-80 mr-2">Lead Analyst Remarks:</span> {leave.remarks}
                          </div>
                        )}
                     </div>
                     
                     {leave.status === 'pending' && (
                        <div className="flex flex-row md:flex-col gap-3 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10 justify-center">
                          <button onClick={() => handleAction(leave.id, 'approved')} className="px-8 py-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl shadow-emerald-500/10">
                             Authorize
                          </button>
                          <button onClick={() => handleAction(leave.id, 'rejected')} className="px-8 py-4 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-brand-accent/10">
                             Deny
                          </button>
                        </div>
                     )}
                  </div>
                );
              })}
           </div>
        )}
      </div>

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-[#050A14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-brand-primary max-w-md w-full rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/10">
              <div className="px-10 py-8 border-b border-white/5 bg-white/[0.02]">
                 <h3 className="font-black text-white text-xl tracking-tight flex items-center gap-4">
                   {actionModal.status === 'approved' ? <CheckCircle2 className="text-emerald-500" /> : <XCircle className="text-brand-accent" />}
                   {actionModal.status === 'approved' ? 'Authorize Clearance' : 'Deny Clearance'}
                 </h3>
              </div>
              <div className="p-10 space-y-8">
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest ml-1">Protocol Remarks (Optional)</label>
                    <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3} placeholder="Add a note for the analyst..." 
                      className="w-full px-6 py-4 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold placeholder:text-slate-600 resize-none hover:bg-white/[0.08] transition-all"></textarea>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setActionModal(null)} className="flex-1 py-5 text-slate-400 font-black text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 rounded-2xl transition-all">Abort</button>
                    <button onClick={confirmAction} className={`flex-1 py-5 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl transition-all ${actionModal.status === 'approved' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-brand-accent hover:bg-[#b91c1c] shadow-brand-accent/20'}`}>
                      Confirm Protocol
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
