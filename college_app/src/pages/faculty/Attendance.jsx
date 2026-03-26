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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Register</h1>
            <p className="text-gray-500 text-sm mt-1">Select class and mark student attendance manually</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
              <input type="date" value={selectedDate} readOnly className="bg-transparent border-none text-sm font-bold text-gray-700 outline-none px-2" />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="bg-transparent border-none text-sm font-bold text-brand-dark outline-none cursor-pointer pr-2">
                <option>Data Structures</option>
                <option>Operating Systems</option>
                <option>Algorithms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 border-t border-gray-100 pt-6">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-500 text-xs font-bold uppercase">Total</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-2"><Users size={20} className="text-gray-400" /> {students.length}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-green-50 border border-green-100">
            <span className="text-green-600 text-xs font-bold uppercase">Present</span>
            <span className="text-2xl font-bold text-green-700 mt-1 flex items-center gap-2"><CheckCircle2 size={20} className="text-green-500" /> {presentCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-50 border border-red-100">
            <span className="text-brand-primary text-xs font-bold uppercase">Absent</span>
            <span className="text-2xl font-bold text-red-700 mt-1 flex items-center gap-2"><X size={20} className="text-red-500" /> {absentCount}</span>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={16} className="text-gray-400" /></div>
            <input type="text" placeholder="Search by name or ID..." className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/50 bg-gray-50" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => markAll('present')} className="flex-1 sm:flex-none text-xs font-bold px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition">Mark All Present</button>
            <button onClick={() => markAll('absent')} className="flex-1 sm:flex-none text-xs font-bold px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition">Mark All Absent</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto bg-gray-50/50">
          {filteredStudents.map(student => {
            const status = markedStudents[student.id];
            const isPresent = status === 'present';
            const isAbsent = status === 'absent';
            return (
              <div
                key={student.id}
                onClick={() => toggleManual(student.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md select-none ${
                  isPresent ? 'bg-white border-green-200 border-l-4 border-l-green-500'
                  : isAbsent ? 'bg-white border-red-200 border-l-4 border-l-brand-primary opacity-80'
                  : 'bg-white border-gray-200 border-l-4 border-l-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isPresent ? 'bg-green-50 text-green-600' : isAbsent ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${!isAbsent ? 'text-gray-900' : 'text-gray-500'}`}>{student.name}</p>
                    <p className="text-xs font-medium text-gray-400">{student.id}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPresent ? 'bg-green-500 text-white' : isAbsent ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {isPresent ? <Check size={16} strokeWidth={3} /> : isAbsent ? <X size={16} strokeWidth={3} /> : <span className="text-xs font-bold">?</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-4">
          {submitted && <p className="text-green-600 font-bold text-sm flex items-center gap-2"><CheckCircle2 size={16} /> Attendance submitted successfully!</p>}
          {!submitted && <button className="text-sm font-bold text-gray-500 hover:text-gray-700 flex items-center gap-2"><History size={16} /> View Past Records</button>}
          <button onClick={handleSubmit} disabled={submitted} className="px-8 py-3 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
