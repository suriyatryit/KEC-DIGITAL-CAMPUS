import React, { useState, useEffect } from 'react';
import { Calendar, FilePenLine, CheckCircle2, Clock, XCircle, PlusCircle, X, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const LEAVE_TYPES = ['Casual Leave', 'Medical Leave', 'Earned Leave', 'Emergency Leave'];

const statusConfig = {
  pending:  { label: 'Pending',  icon: Clock,         cls: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', icon: CheckCircle2,  cls: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', icon: XCircle,       cls: 'bg-red-100 text-brand-primary' },
};

function daysBetween(from, to) {
  const d1 = new Date(from), d2 = new Date(to);
  return Math.max(1, Math.round((d2 - d1) / 86400000) + 1);
}

export default function StudentLeaves() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Casual Leave', from: '', to: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) fetchLeaves();
  }, [user]);

  const fetchLeaves = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching leaves:', error);
    else setLeaves(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason.trim()) {
      setError('Please fill all fields.');
      return;
    }
    if (new Date(form.to) < new Date(form.from)) {
      setError('"To" date cannot be before "From" date.');
      return;
    }

    setLoading(true);
    const { error: submitError } = await supabase
      .from('leaves')
      .insert({
        student_id: user.id,
        reason: form.reason,
        start_date: form.from,
        end_date: form.to,
        status: 'pending'
      });

    if (submitError) {
      setError('Failed to submit request: ' + submitError.message);
    } else {
      await fetchLeaves();
      setShowForm(false);
      setSubmitted(true);
      setForm({ type: 'Casual Leave', from: '', to: '', reason: '' });
      setError('');
      setTimeout(() => setSubmitted(false), 3000);
    }
    setLoading(false);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const pending = leaves.filter(l => l.status === 'pending').length;
  const approved = leaves.filter(l => l.status === 'approved').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Registry Clearance</h1>
          <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">Apply for leave and track your nodes</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSubmitted(false); }}
          className="relative z-10 flex items-center gap-3 px-10 py-5 bg-brand-accent text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all"
        >
          <PlusCircle size={20} /> Initiate Request
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-6">
        {[
          ['Total Applied', leaves.length, 'text-white', 'glass-panel border-white/5'],
          ['Pending Hubs', pending, 'text-brand-accent', 'glass-panel border-brand-accent/10'],
          ['Cleared Nodes', approved, 'text-emerald-500', 'glass-panel border-emerald-500/10'],
        ].map(([label, val, textCls, bgCls]) => (
          <div key={label} className={`p-8 rounded-[2rem] text-center relative overflow-hidden group hover:bg-white/[0.04] transition-all ${bgCls}`}>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
            <p className={`text-4xl font-black mt-2 tracking-tighter ${textCls}`}>{val}</p>
          </div>
        ))}
      </div>

      {submitted && (
        <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 font-black text-xs uppercase tracking-widest animate-in slide-in-from-top-4">
          <CheckCircle2 size={20} /> Request transmitted successfully. Awaiting clearance.
        </div>
      )}

      {/* Leave history */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
        <div className="px-10 py-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="font-black text-white text-xs uppercase tracking-[0.2em]">Registry History</h2>
        </div>
        {leaves.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No leave requests yet. Apply for your first leave.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {leaves.map((leave) => {
              const cfg = statusConfig[leave.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={leave.id} className="px-10 py-8 hover:bg-white/[0.02] transition-colors group relative">
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 flex-wrap">
                        <p className="font-black text-white text-lg tracking-tight">{leave.reason.split(' ').slice(0, 4).join(' ')}...</p>
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          leave.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          leave.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
                        }`}>
                          <StatusIcon size={12} /> {leave.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 mt-3 text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded border border-white/5"><Calendar size={14} className="text-brand-accent" /> {formatDate(leave.start_date)}{leave.start_date !== leave.end_date ? ` → ${formatDate(leave.end_date)}` : ''}</span>
                        <span className="text-[10px] bg-brand-primary border border-white/10 px-3 py-1 rounded-full text-slate-400">{daysBetween(leave.start_date, leave.end_date)} DAY CYCLE</span>
                      </div>
                      <p className="mt-4 text-sm text-slate-300 bg-white/[0.03] px-6 py-4 rounded-2xl border border-white/5">{leave.reason}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Applied on</p>
                       <p className="text-xs font-black text-slate-400 mt-1">{formatDate(leave.created_at)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Apply form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[#050A14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-brand-primary w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-white/[0.02]">
              <h3 className="font-black text-white text-xl tracking-tight flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <FilePenLine size={24} />
                </span>
                Initiate Clearance
              </h3>
              <button onClick={() => { setShowForm(false); setError(''); }} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              {error && (
                <div className="flex items-center gap-3 p-5 bg-brand-accent/10 text-brand-accent text-[10px] font-black uppercase tracking-widest rounded-2xl border border-brand-accent/20">
                  <AlertTriangle size={18} /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">Protocol Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}
                    className="w-full px-6 py-4 text-sm border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white cursor-pointer font-bold appearance-none hover:bg-white/[0.08] transition-all">
                    {LEAVE_TYPES.map(t => <option key={t} className="bg-brand-primary text-white">{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">Mission Start</label>
                    <input type="date" value={form.from} onChange={e => setForm(f => ({...f, from: e.target.value}))}
                      className="w-full px-6 py-4 text-sm border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold [color-scheme:dark] hover:bg-white/[0.08] transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">Mission End</label>
                    <input type="date" value={form.to} onChange={e => setForm(f => ({...f, to: e.target.value}))}
                      className="w-full px-6 py-4 text-sm border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold [color-scheme:dark] hover:bg-white/[0.08] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">Intelligence Report (Reason)</label>
                  <textarea value={form.reason} onChange={e => setForm(f => ({...f, reason: e.target.value}))}
                    rows={4} placeholder="Detail mission objective..."
                    className="w-full px-6 py-4 text-sm border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold placeholder:text-slate-600 resize-none hover:bg-white/[0.08] transition-all" />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-brand-accent text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#b91c1c] transition-all shadow-2xl shadow-brand-accent/20">
                Authorize Clearance Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
