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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
          <p className="text-gray-500 text-sm mt-1">Create and allocate classes for the department</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-brand-primary cursor-pointer"
          >
            <option>Semester 2</option>
            <option>Semester 4</option>
            <option>Semester 6</option>
            <option>Semester 8</option>
          </select>
          <select 
            value={selectedSection} 
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-brand-primary cursor-pointer"
          >
            <option>AI&DS</option>
            <option>AIML</option>
            <option>CSE</option>
          </select>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50 ${
              isEditing 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-gradient-to-r from-brand-primary to-primary-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]'
            }`}
          >
            {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : (isEditing ? <Check size={18} /> : <Edit2 size={18} />)} 
            {loading ? 'Processing...' : (isEditing ? 'Save Changes' : 'Edit Mode')}
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200 p-1">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-brand-primary-light/50 border-b border-brand-primary/10">
                <th className="p-4 w-32 border-r border-gray-100">
                  <div className="flex flex-col items-center text-brand-dark">
                    <Clock size={20} className="mb-1" />
                    <span className="text-xs font-bold tracking-wider uppercase">Time</span>
                  </div>
                </th>
                {days.map(day => (
                  <th key={day} className="p-4 font-bold text-sm text-gray-700 uppercase tracking-wider border-r border-gray-100 last:border-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, idx) => (
                <tr key={time} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="p-3 font-semibold text-xs text-gray-500 bg-gray-50/50 border-r border-gray-100 whitespace-nowrap">
                    {time}
                  </td>
                  {days.map(day => {
                    const subject = schedule[day]?.[time] || '';
                    const isBreak = subject === 'Lunch';
                    
                    return (
                      <td key={`${day}-${time}`} className={`p-3 border-r border-gray-100 last:border-0 hover:bg-brand-primary/5 transition-colors group`}>
                        {isBreak ? (
                          <div className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase py-2">
                            Lunch Break
                          </div>
                        ) : (
                          <div className={`bg-white border rounded-lg p-2 h-full flex flex-col justify-center min-h-[64px] transition-all ${isEditing ? 'border-brand-primary/40 shadow-[0_0_8px_rgba(37,99,235,0.15)] ring-1 ring-brand-primary/20' : 'border-gray-200 shadow-sm relative group-hover:border-brand-primary/30 group-hover:shadow'}`}>
                            {isEditing ? (
                              <input 
                                type="text"
                                value={subject}
                                onChange={(e) => handleCellChange(day, time, e.target.value)}
                                className="w-full text-sm font-bold text-brand-dark text-center outline-none bg-transparent placeholder-gray-300"
                                placeholder="Free"
                              />
                            ) : (
                              <>
                                <span className="block text-sm font-bold text-brand-dark">{subject || <span className="text-gray-300 font-medium">Free</span>}</span>
                                {subject && <span className="block text-xs text-brand-primary mt-1 font-medium">Room 407</span>}
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
