import React, { useState, useEffect } from 'react';
import { Award, Download, TrendingUp, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ExamResults() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('marks')
        .select('*')
        .eq('student_id', user.id);

      if (error) {
        console.error('Error fetching results:', error);
      } else {
        const formatted = data.map(item => {
          const total = item.marks_obtained;
          let grade = 'F';
          if (total >= 90) grade = 'O';
          else if (total >= 80) grade = 'A';
          else if (total >= 70) grade = 'B+';
          else if (total >= 60) grade = 'B';
          else if (total >= 50) grade = 'C';

          return {
            ...item,
            total,
            grade,
            credits: 4 // Default credits
          };
        });
        setResults(formatted);
      }
      setLoading(false);
    };

    fetchResults();
  }, [user]);

  const calculateSGPA = () => {
    if (results.length === 0) return 0;
    const totalPoints = results.reduce((acc, curr) => {
      let points = 0;
      if (curr.grade === 'O') points = 10;
      else if (curr.grade === 'A') points = 9;
      else if (curr.grade === 'B+') points = 8;
      else if (curr.grade === 'B') points = 7;
      else if (curr.grade === 'C') points = 6;
      return acc + points;
    }, 0);
    return (totalPoints / results.length).toFixed(2);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="text-gray-500 text-sm mt-1">Semester 2 Final Results</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-brand-primary text-brand-primary text-sm font-medium rounded-lg hover:bg-brand-primary/5 transition">
           <Download size={18} /> Download Marksheet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 flex items-center gap-4">
           <div className="bg-blue-50 text-blue-500 p-4 rounded-full">
             <Award size={32} />
           </div>
           <div>
             <h3 className="text-gray-500 font-medium text-sm">Semester Grade Point Average (SGPA)</h3>
             <p className="text-3xl font-bold text-gray-900 mt-1">{calculateSGPA()}</p>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500 flex items-center gap-4">
           <div className="bg-green-50 text-green-500 p-4 rounded-full">
             <TrendingUp size={32} />
           </div>
           <div>
             <h3 className="text-gray-500 font-medium text-sm">Cumulative Grade Point Average (CGPA)</h3>
             <p className="text-3xl font-bold text-gray-900 mt-1">8.54</p>
           </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
           <h3 className="font-bold text-gray-700 flex items-center gap-2">
             <BookOpen size={18} className="text-gray-400" /> Subject-wise Performance
           </h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-primary border-t-transparent" /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Marks (100)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{result.subject}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{result.credits} Credits</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-gray-900">{result.marks_obtained}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded border ${
                        result.grade === 'O' ? 'bg-green-50 text-green-700 border-green-200' :
                        result.grade === 'A' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        result.grade === 'B+' || result.grade === 'B' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-400">No results found yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
