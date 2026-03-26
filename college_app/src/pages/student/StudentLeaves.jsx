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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Leave Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Apply for leave and track your approval status</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSubmitted(false); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow hover:opacity-90 transition"
        >
          <PlusCircle size={18} /> Apply for Leave
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Total Applied', leaves.length, 'text-gray-900', 'bg-gray-50 border-gray-100'],
          ['Pending', pending, 'text-yellow-700', 'bg-yellow-50 border-yellow-100'],
          ['Approved', approved, 'text-green-700', 'bg-green-50 border-green-100'],
        ].map(([label, val, textCls, bgCls]) => (
          <div key={label} className={`p-4 rounded-2xl border text-center ${bgCls}`}>
            <p className="text-xs font-bold text-gray-500 uppercase">{label}</p>
            <p className={`text-3xl font-black mt-1 ${textCls}`}>{val}</p>
          </div>
        ))}
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-bold text-sm">
          <CheckCircle2 size={18} /> Leave request submitted! Awaiting HOD approval.
        </div>
      )}

      {/* Leave history */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Leave History</h2>
        </div>
        {leaves.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No leave requests yet. Apply for your first leave.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {leaves.map((leave) => {
              const cfg = statusConfig[leave.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={leave.id} className="px-6 py-5 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-bold text-gray-900">{leave.reason.substring(0, 20)}...</p>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${cfg.cls}`}>
                          <StatusIcon size={11} /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(leave.start_date)}{leave.start_date !== leave.end_date ? ` → ${formatDate(leave.end_date)}` : ''}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-medium">{daysBetween(leave.start_date, leave.end_date)} day(s)</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">{leave.reason}</p>
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">Applied: {formatDate(leave.created_at)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Apply form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><FilePenLine size={18} className="text-brand-primary" /> Apply for Leave</h3>
              <button onClick={() => { setShowForm(false); setError(''); }} className="p-1 hover:bg-gray-200 rounded-lg"><X size={18} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-brand-primary text-sm font-bold rounded-lg border border-red-100">
                  <AlertTriangle size={14} /> {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Leave Type</label>
                <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white cursor-pointer font-medium">
                  {LEAVE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">From</label>
                  <input type="date" value={form.from} onChange={e => setForm(f => ({...f, from: e.target.value}))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">To</label>
                  <input type="date" value={form.to} onChange={e => setForm(f => ({...f, to: e.target.value}))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40" />
                </div>
              </div>
              {form.from && form.to && new Date(form.to) >= new Date(form.from) && (
                <p className="text-xs font-bold text-brand-primary">Duration: {daysBetween(form.from, form.to)} day(s)</p>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Reason</label>
                <textarea value={form.reason} onChange={e => setForm(f => ({...f, reason: e.target.value}))}
                  rows={3} placeholder="Briefly explain the reason for leave..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40 resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl hover:opacity-90 transition shadow-md">
                Submit Leave Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
