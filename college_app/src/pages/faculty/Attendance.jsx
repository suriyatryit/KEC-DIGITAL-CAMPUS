import React, { useState, useEffect } from 'react';
import { Search, Check, X, Users, CheckCircle2, History } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markedStudents, setMarkedStudents] = useState({});
  const [search, setSearch] = useState('');
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('role', 'student');

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const toggleManual = (id) => {
    setMarkedStudents(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present'
    }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => { updated[s.id] = status; });
    setMarkedStudents(updated);
  };

  const handleSubmit = async () => {
    const records = students.map(s => ({
      student_id: s.id,
      date: selectedDate,
      subject: selectedSubject,
      status: markedStudents[s.id] || 'absent'
    }));

    setLoading(true);
    const { error } = await supabase
      .from('attendance')
      .insert(records);

    if (error) {
      alert('Error submitting attendance: ' + error.message);
    } else {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
    setLoading(false);
  };

  const filteredStudents = students.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.id || '').toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = Object.values(markedStudents).filter(v => v === 'present').length;
  const absentCount = students.length - presentCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Attendance Register</h1>
            <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">Manual Entry • Node Verification Protocol</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl">
              <input type="date" value={selectedDate} readOnly className="bg-transparent border-none text-xs font-black text-white outline-none px-4 [color-scheme:dark]" />
              <div className="w-px h-8 bg-white/10 mx-1"></div>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="bg-transparent border-none text-xs font-black text-brand-accent outline-none cursor-pointer pr-4 appearance-none hover:text-white transition-colors">
                <option className="bg-brand-primary">Data Structures</option>
                <option className="bg-brand-primary">Operating Systems</option>
                <option className="bg-brand-primary">Algorithms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-10 border-t border-white/5 pt-10 relative z-10">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Nodes</span>
            <span className="text-3xl font-black text-white mt-1 flex items-center gap-3"><Users size={24} className="text-slate-600" /> {students.length}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-all">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Present</span>
            <span className="text-3xl font-black text-emerald-500 mt-1 flex items-center gap-3"><CheckCircle2 size={24} /> {presentCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 group hover:bg-brand-accent/10 transition-all">
            <span className="text-brand-accent text-[10px] font-black uppercase tracking-widest">Absent</span>
            <span className="text-3xl font-black text-brand-accent mt-1 flex items-center gap-3"><X size={24} /> {absentCount}</span>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.02]">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-accent"><Search size={18} className="text-slate-600" /></div>
            <input type="text" placeholder="Search Institutional Nodes..." className="block w-full pl-14 pr-6 py-4 border border-white/10 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white placeholder:text-slate-600 hover:bg-white/10 transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button onClick={() => markAll('present')} className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-6 py-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-2xl transition-all">Authorize All</button>
            <button onClick={() => markAll('absent')} className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-6 py-4 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/20 rounded-2xl transition-all">De-Authorize All</button>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto bg-transparent custom-scrollbar">
          {filteredStudents.map(student => {
            const status = markedStudents[student.id];
            const isPresent = status === 'present';
            const isAbsent = status === 'absent';
            return (
              <div
                key={student.id}
                onClick={() => toggleManual(student.id)}
                className={`p-5 rounded-[1.5rem] border flex items-center justify-between cursor-pointer transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] ${
                  isPresent ? 'bg-emerald-500/5 border-emerald-500/20 ring-1 ring-emerald-500/20'
                  : isAbsent ? 'bg-brand-accent/5 border-brand-accent/20 ring-1 ring-brand-accent/20'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-white opacity-[0.02] rounded-full blur-2xl -mr-12 -mt-12 group-hover:opacity-[0.05] transition-opacity" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-lg transition-transform group-active:scale-95 ${isPresent ? 'bg-emerald-500 text-white' : isAbsent ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`font-black text-sm tracking-tight ${!isAbsent ? 'text-white' : 'text-slate-500'}`}>{student.name}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-0.5">{student.id.substring(0, 10)}</p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-xl relative z-10 ${isPresent ? 'bg-emerald-500 text-white' : isAbsent ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-600'}`}>
                  {isPresent ? <Check size={20} strokeWidth={4} /> : isAbsent ? <X size={20} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-6">
          {submitted && <p className="text-emerald-500 font-black text-xs uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-left-4"><CheckCircle2 size={18} /> Records synchronized!</p>}
          {!submitted && <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-3 transition-colors"><History size={18} /> Protocol Logs</button>}
          <button onClick={handleSubmit} disabled={loading || submitted} className="px-12 py-5 bg-brand-accent text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all transform disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
            {loading ? 'Transmitting...' : 'Authorize Submission'}
          </button>
        </div>
      </div>
    </div>
  );
}
