import React, { useState, useEffect } from 'react';
import { Save, FileSpreadsheet } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function MarksEntry() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [subject] = useState('Data Structures');
  const [examType] = useState('Mid-Term');

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
        // Initialize marks object
        const initialMarks = {};
        data.forEach(s => { initialMarks[s.id] = ''; });
        setMarks(initialMarks);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const handleMarkChange = (id, value) => {
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setMarks(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const records = students.map(s => ({
      student_id: s.id,
      subject,
      exam_type: examType,
      marks_obtained: marks[s.id] ? parseInt(marks[s.id]) : 0,
      total_marks: 100
    }));

    const { error } = await supabase
      .from('marks')
      .insert(records);

    if (error) {
      alert('Error saving marks: ' + error.message);
    } else {
      alert('Marks saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Academic Audit</h1>
          <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">{examType} Examination • {subject}</p>
        </div>
        <div className="relative z-10 flex gap-4">
          <button className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 transition-all shadow-xl">
             <FileSpreadsheet size={18} className="text-emerald-500" /> Data Import
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional ID</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Student Node</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Performance Vector (/100)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {students.map((student) => (
                 <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                   <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-slate-600">{(student.id || '').split('-')[0].toUpperCase()}</td>
                   <td className="px-10 py-6 whitespace-nowrap text-base font-black text-white tracking-tight">{student.name}</td>
                   <td className="px-10 py-6 whitespace-nowrap text-right">
                     <div className="flex justify-end items-center gap-4">
                        <input 
                           type="text" 
                           value={marks[student.id] || ''} 
                           onChange={(e) => handleMarkChange(student.id, e.target.value)}
                           className={`w-24 px-4 py-3 text-center text-sm font-black border rounded-2xl outline-none focus:ring-4 transition-all focus:ring-brand-accent/20 bg-white/5 ${
                             parseInt(marks[student.id]) < 40 ? 'text-brand-accent border-brand-accent/30 bg-brand-accent/5' : 'text-white border-white/10 focus:border-brand-accent/50'
                           }`}
                           placeholder="00"
                        />
                     </div>
                   </td>
                 </tr>
               ))}
            </tbody>
         </table>
         
         <div className="p-10 bg-white/[0.02] border-t border-white/5 flex justify-end items-center gap-6">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-3 px-12 py-5 bg-brand-accent text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all transform disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Save size={20} />}
              {loading ? 'Transmitting...' : 'Commit Audit Data'}
            </button>
         </div>
      </div>
    </div>
  );
}
