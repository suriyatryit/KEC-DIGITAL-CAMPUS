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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
             <div className="bg-brand-primary text-white p-2 rounded-xl shadow-md"><FilePenLine size={20} /></div>
             Leave Approvals
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage leave requests from students and faculty</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={16} className="text-gray-400" /></div>
            <input type="text" placeholder="Search applicant..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/40" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
             className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/40 bg-gray-50 font-medium">
             <option value="all">All Requests</option>
             <option value="pending">Pending ({pendingCount})</option>
             <option value="approved">Approved</option>
             <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredLeaves.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No leave requests match your filters.</div>
        ) : (
           <div className="divide-y divide-gray-100">
              {filteredLeaves.map(leave => {
                const cfg = statusConfig[leave.status];
                const StatusIcon = cfg.icon;
                const studentName = leave.profiles?.name || 'Unknown';
                const studentRole = leave.profiles?.role || 'student';
                const duration = Math.max(1, Math.round((new Date(leave.end_date) - new Date(leave.start_date)) / 86400000) + 1);

                return (
                  <div key={leave.id} className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{studentName}</h3>
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${studentRole === 'faculty' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{studentRole}</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${cfg.cls}`}>
                             <StatusIcon size={12} /> {cfg.label}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                          <div>
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Leave Duration</p>
                             <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-0.5"><CalendarIcon size={14} className="text-gray-400" /> {formatDate(leave.start_date)} {leave.start_date !== leave.end_date ? `to ${formatDate(leave.end_date)}` : ''} ({duration} day{duration > 1 ? 's' : ''})</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Reason</p>
                             <p className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">{leave.reason}</p>
                          </div>
                        </div>
                        
                        {leave.remarks && (
                          <div className="mt-3 text-sm text-gray-500 bg-orange-50/50 p-2 rounded border border-orange-100">
                            <span className="font-bold text-gray-700">Approver Remarks:</span> {leave.remarks}
                          </div>
                        )}
                     </div>
                     
                     {leave.status === 'pending' && (
                        <div className="flex flex-row md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 justify-center">
                          <button onClick={() => handleAction(leave.id, 'approved')} className="flex-1 px-4 py-2 bg-green-50 text-green-700 border border-green-200 font-bold text-sm rounded-lg hover:bg-green-100 transition shadow-sm">
                            Approve
                          </button>
                          <button onClick={() => handleAction(leave.id, 'rejected')} className="flex-1 px-4 py-2 bg-red-50 text-red-700 border border-red-200 font-bold text-sm rounded-lg hover:bg-red-100 transition shadow-sm">
                            Reject
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                   {actionModal.status === 'approved' ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-brand-primary" />}
                   {actionModal.status === 'approved' ? 'Approve Leave' : 'Reject Leave'}
                 </h3>
              </div>
              <div className="p-5 space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Remarks (Optional)</label>
                    <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3} placeholder="Add a note for the applicant..." 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary resize-none text-sm"></textarea>
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => setActionModal(null)} className="flex-1 py-2 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button onClick={confirmAction} className={`flex-1 py-2 text-white font-bold rounded-lg shadow-md transition ${actionModal.status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-primary hover:bg-red-700'}`}>
                      Confirm
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
