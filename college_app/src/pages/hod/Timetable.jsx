import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Edit2, Plus, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['09:00 AM', '10:00 AM', '11:15 AM', '12:05 PM', '12:55 PM', '01:45 PM', '02:35 PM', '03:40 PM'];

export default function Timetable() {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('Semester 6');
  const [selectedSection, setSelectedSection] = useState('AI&DS');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTimetable();
  }, [selectedSemester, selectedSection]);

  const fetchTimetable = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('timetable')
      .select('*')
      .eq('semester', selectedSemester)
      .eq('section', selectedSection);

    if (error) {
      console.error('Error fetching timetable:', error);
    } else {
      // Reconstruct the 2D object structure from DB rows
      const reconstructed = {};
      data.forEach(item => {
        if (!reconstructed[item.day]) reconstructed[item.day] = {};
        reconstructed[item.day][item.time_slot] = item.subject;
      });
      setSchedule(reconstructed);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const rows = [];
    days.forEach(day => {
      times.forEach(time => {
        const subject = schedule[day]?.[time] || '';
        rows.push({
          day,
          time_slot: time,
          subject,
          semester: selectedSemester,
          section: selectedSection
        });
      });
    });

    // Strategy: Delete existing and insert new (simplest for a small timetable grid)
    await supabase
      .from('timetable')
      .delete()
      .eq('semester', selectedSemester)
      .eq('section', selectedSection);

    const { error } = await supabase.from('timetable').insert(rows);

    if (error) {
      alert('Error saving timetable: ' + error.message);
    } else {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCellChange = (day, time, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: value
      }
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Timeline Allocation</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Strategic Resource Scheduling Protocol</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none focus:ring-2 focus:ring-brand-accent/40 cursor-pointer hover:bg-white/10 transition-all appearance-none pr-10"
            >
              <option className="bg-brand-primary">Semester 2</option>
              <option className="bg-brand-primary">Semester 4</option>
              <option className="bg-brand-primary">Semester 6</option>
              <option className="bg-brand-primary">Semester 8</option>
            </select>
            <select 
              value={selectedSection} 
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none focus:ring-2 focus:ring-brand-accent/40 cursor-pointer hover:bg-white/10 transition-all appearance-none pr-10"
            >
              <option className="bg-brand-primary">AI&DS</option>
              <option className="bg-brand-primary">AIML</option>
              <option className="bg-brand-primary">CSE</option>
            </select>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={loading}
              className={`flex items-center gap-3 px-8 py-4 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl disabled:opacity-50 ${
                isEditing 
                  ? 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600' 
                  : 'bg-brand-accent shadow-brand-accent/20 hover:bg-[#b91c1c]'
              }`}
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : (isEditing ? <Check size={18} /> : <Edit2 size={18} />)} 
              {loading ? 'SYNCING...' : (isEditing ? 'COMMIT GRID' : 'ALLOCATION MODE')}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 p-1 shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-center border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="p-8 w-40 border-r border-white/5">
                  <div className="flex flex-col items-center text-slate-500">
                    <Clock size={24} className="mb-2 text-brand-accent" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Temporal</span>
                  </div>
                </th>
                {days.map(day => (
                  <th key={day} className="p-8 font-black text-[10px] text-slate-500 uppercase tracking-[0.3em] border-r border-white/5 last:border-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {times.map((time, idx) => (
                <tr key={time} className={`group ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}`}>
                  <td className="p-6 font-black text-xs text-slate-600 bg-white/[0.02] border-r border-white/5 whitespace-nowrap">
                    {time}
                  </td>
                  {days.map(day => {
                    const subject = schedule[day]?.[time] || '';
                    const isBreak = subject === 'Lunch';
                    
                    return (
                      <td key={`${day}-${time}`} className={`p-4 border-r border-white/5 last:border-0 hover:bg-brand-accent/[0.03] transition-all group/cell`}>
                        {isBreak ? (
                          <div className="text-[9px] font-black text-slate-600 tracking-[0.3em] uppercase py-4">
                            System Cycle
                          </div>
                        ) : (
                          <div className={`rounded-2xl p-4 h-full flex flex-col justify-center min-h-[80px] transition-all relative overflow-hidden ${isEditing ? 'bg-white/5 ring-1 ring-brand-accent/30 shadow-lg shadow-brand-accent/10 border border-brand-accent/20' : 'bg-white/[0.03] border border-white/5 hover:bg-white/10 group-hover/cell:border-brand-accent/30'}`}>
                            {isEditing ? (
                              <input 
                                type="text"
                                value={subject}
                                onChange={(e) => handleCellChange(day, time, e.target.value)}
                                className="w-full text-sm font-black text-white text-center outline-none bg-transparent placeholder:text-slate-700"
                                placeholder="NODE ID"
                              />
                            ) : (
                              <>
                                <span className="block text-sm font-black text-white tracking-tight">{subject || <span className="text-slate-700 font-bold opacity-30">FREE HUB</span>}</span>
                                {subject && <span className="block text-[9px] text-brand-accent mt-2 font-black uppercase tracking-widest opacity-80">Sector 407</span>}
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
