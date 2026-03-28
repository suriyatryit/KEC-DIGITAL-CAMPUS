import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Users, X, CheckCircle } from 'lucide-react';

const mockDepartments = [
  { id: 1, name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Alan Turing', faculty: 45, students: 1200 },
  { id: 2, name: 'Artificial Intelligence (AI&DS)', code: 'AI&DS', hod: 'Dr. John McCarthy', faculty: 22, students: 480 },
  { id: 3, name: 'AI & Machine Learning', code: 'AIML', hod: 'Dr. Geoffrey Hinton', faculty: 18, students: 350 },
  { id: 4, name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Claude Shannon', faculty: 38, students: 850 },
  { id: 5, name: 'Information Technology', code: 'IT', hod: 'Dr. Tim Berners-Lee', faculty: 25, students: 510 },
  { id: 6, name: 'Mechanical Engineering', code: 'MECH', hod: 'Dr. Henry Ford', faculty: 32, students: 600 },
  { id: 7, name: 'Civil Engineering', code: 'CIVIL', hod: 'Dr. Karl Terzaghi', faculty: 28, students: 450 },
];

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', code: '', hod: '' });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDept(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code || !newDept.hod) return;

    const department = {
      id: Date.now(),
      ...newDept,
      faculty: 0,
      students: 0
    };

    setDepartments(prev => [department, ...prev]);
    setSuccess(true);
    setNewDept({ name: '', code: '', hod: '' });
    
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
    }, 1500);
  };

  const handleDelete = (id) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12 relative">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Institutional Matrix</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Departmental Architecture & HOD Allocation</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="relative z-10 flex items-center gap-3 px-10 py-5 bg-brand-accent text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:translate-y-[-2px] transition-all"
        >
          <Plus size={18} /> Initialize Node
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="glass-panel p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between group relative overflow-hidden border border-white/5 transition-all hover:bg-white/[0.03]" style={{ animationDelay: `${dept.id * 100}ms` }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-[0.05] rounded-full blur-[60px] -mr-16 -mt-16 group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex items-center gap-8 mb-6 md:mb-0 relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500 shrink-0">
                <Building2 size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-4 tracking-tight mb-1">
                  {dept.name} <span className="text-[9px] px-3 py-1 bg-brand-accent/10 text-brand-accent uppercase tracking-widest font-black rounded-lg border border-brand-accent/20">{dept.code}</span>
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">HOD: <span className="text-white ml-1">{dept.hod}</span></p>
                <div className="flex gap-6 text-[10px] font-black text-slate-600 mt-4 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Users size={16} className="text-slate-700" /> {dept.faculty} Core Faculty</span>
                  <span className="flex items-center gap-2"><Users size={16} className="text-slate-700" /> {dept.students} Active Nodes</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto justify-end mt-4 md:mt-0 pt-6 border-t border-white/5 md:border-none md:pt-0">
              <button className="p-4 text-slate-500 hover:text-white transition-all bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 hover:scale-110">
                <Edit2 size={20} />
              </button>
              <button 
                onClick={() => handleDelete(dept.id)}
                className="p-4 text-slate-500 hover:text-brand-accent transition-all bg-white/5 rounded-2xl border border-white/5 hover:border-brand-accent/20 hover:scale-110"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#050A14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-brand-primary w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center px-10 py-8 border-b border-white/5 bg-white/[0.02]">
              <h3 className="font-black text-white text-xl tracking-tight flex items-center gap-4">
                <Plus className="text-brand-accent" size={24} /> Initialize Node
              </h3>
              <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all text-slate-400 group"><X size={20} className="group-hover:text-white" /></button>
            </div>
            
            {success ? (
              <div className="p-20 text-center animate-in zoom-in">
                <div className="bg-emerald-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                  <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <p className="font-black text-white text-xl tracking-tight leading-relaxed">System Synchronized</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Node successfully added to matrix.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest ml-1">Protocol Name (Department)</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={newDept.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Cognitive Intelligence Systems"
                    className="w-full px-6 py-4 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold placeholder:text-slate-600 hover:bg-white/[0.08] transition-all" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest ml-1">Index Code</label>
                    <input 
                      type="text" 
                      name="code"
                      required
                      value={newDept.code}
                      onChange={handleInputChange}
                      placeholder="e.g. CIS"
                      className="w-full px-6 py-4 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold placeholder:text-slate-600 uppercase hover:bg-white/[0.08] transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest ml-1">Lead Node (HOD)</label>
                    <input 
                      type="text" 
                      name="hod"
                      required
                      value={newDept.hod}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Turing"
                      className="w-full px-6 py-4 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white/5 text-white font-bold placeholder:text-slate-600 hover:bg-white/[0.08] transition-all" 
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full py-5 bg-brand-accent text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] transition-all">
                    Authorize Initialisation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
