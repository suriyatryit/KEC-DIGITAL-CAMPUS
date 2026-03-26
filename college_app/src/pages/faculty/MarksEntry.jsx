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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
          <p className="text-gray-500 text-sm mt-1">Mid-Term Examination • Data Structures</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition shadow-sm">
             <FileSpreadsheet size={16} /> Import Excel
          </button>
        </div>
      </div>

      <div className="glass-panel p-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-dark text-white border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-bold tracking-wider">Roll No</th>
                <th className="px-6 py-4 text-sm font-bold tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-sm font-bold tracking-wider w-48 text-right">Marks (Out of 100)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
               {students.map((student) => (
                 <tr key={student.id} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{(student.id || '').substring(0, 8).toUpperCase()}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{student.name}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-right">
                     <div className="flex justify-end items-center gap-2">
                        <input 
                           type="text" 
                           value={marks[student.id] || ''} 
                           onChange={(e) => handleMarkChange(student.id, e.target.value)}
                           className={`w-20 px-3 py-2 text-center text-sm font-bold border rounded-lg outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                             parseInt(marks[student.id]) < 40 ? 'text-red-600 border-red-300 bg-red-50/50' : 'text-brand-dark border-gray-300'
                           }`}
                        />
                     </div>
                   </td>
                 </tr>
               ))}
            </tbody>
         </table>
         
         <div className="p-6 bg-gray-50/80 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-primary/30 hover:-translate-y-0.5 transition transform disabled:opacity-50"
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Save size={18} />}
              {loading ? 'Submitting...' : 'Save & Submit Marks'}
            </button>
         </div>
      </div>
    </div>
  );
}
