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
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Academic Outcome</h1>
          <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em] opacity-80">Cycle 2 Final Performance Metrics</p>
        </div>
        <button className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 transition-all shadow-xl">
           <Download size={18} className="text-brand-accent" /> Export Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-l-brand-accent flex items-center gap-8 group hover:bg-white/[0.04] transition-all">
           <div className="bg-brand-accent/10 text-brand-accent p-6 rounded-3xl border border-brand-accent/20 group-hover:scale-110 transition-transform shadow-2xl">
             <Award size={40} />
           </div>
           <div>
             <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">Cycle Grade Average (SGPA)</h3>
             <p className="text-5xl font-black text-white tracking-tighter">{calculateSGPA()}</p>
           </div>
        </div>
        <div className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-l-emerald-500 flex items-center gap-8 group hover:bg-white/[0.04] transition-all">
           <div className="bg-emerald-500/10 text-emerald-500 p-6 rounded-3xl border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-2xl">
             <TrendingUp size={40} />
           </div>
           <div>
             <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">Institutional Median (CGPA)</h3>
             <p className="text-5xl font-black text-white tracking-tighter">8.54</p>
           </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
           <h3 className="font-black text-white text-xs uppercase tracking-[0.2em] flex items-center gap-4">
             <BookOpen size={20} className="text-brand-accent" /> Institutional Node Performance
           </h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-accent/20 border-t-brand-accent" /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Hub</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Score Vector</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Grade Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="font-black text-white text-base tracking-tight">{result.subject}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{result.credits} CREDITS HUB</div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-center font-black text-white text-xl tracking-tighter">{result.marks_obtained}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-center">
                      <span className={`px-4 py-2 inline-flex text-[10px] font-black rounded-lg border uppercase tracking-widest ${
                        result.grade === 'O' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        result.grade === 'A' ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/20' :
                        'bg-slate-800 text-slate-400 border-white/10'
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
