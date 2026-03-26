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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-3xl border border-[var(--glass-border)] bg-gradient-to-r from-[var(--glass-bg)] to-transparent relative overflow-hidden mb-8">
        <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-primary-600 rounded-full blur-[40px] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Department Management</h1>
          <p className="text-[var(--text-secondary)] font-medium text-sm mt-1">Manage academic departments and assign Heads of Department</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="relative z-10 mt-4 md:mt-0 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-primary to-primary-600 text-white text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover-lift"
        >
          <Plus size={18} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between group relative overflow-hidden hover-lift" style={{ animationDelay: `${dept.id * 100}ms` }}>
            <div className="absolute top-1/2 left-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[40px] -ml-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500 pointer-events-none"></div>
            <div className="flex items-start gap-5 mb-6 md:mb-0 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-2xl flex items-center justify-center text-brand-primary border border-[var(--glass-border)] shadow-lg ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <Building2 size={26} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3 tracking-tight mb-1">
                  {dept.name} <span className="text-xs px-2.5 py-1 bg-brand-primary/10 text-brand-primary uppercase tracking-widest font-bold rounded-lg backdrop-blur-sm">{dept.code}</span>
                </h3>
                <p className="text-sm border-b border-[var(--border-color)] pb-2 mb-2 text-[var(--text-secondary)]">HOD: <span className="font-bold text-[var(--text-primary)] ml-1">{dept.hod}</span></p>
                <div className="flex gap-5 text-sm font-bold text-[var(--text-secondary)] mt-2">
                  <span className="flex items-center gap-1.5"><Users size={16} className="opacity-70" /> {dept.faculty} Faculty</span>
                  <span className="flex items-center gap-1.5"><Users size={16} className="opacity-70" /> {dept.students} Students</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 relative z-10 w-full md:w-auto justify-end mt-4 md:mt-0 pt-4 border-t border-[var(--border-color)] md:border-none md:pt-0">
              <button className="p-2.5 text-[var(--text-secondary)] hover:text-brand-primary transition-colors bg-white/50 dark:bg-black/20 rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(dept.id)}
                className="p-2.5 text-[var(--text-secondary)] hover:text-rose-500 transition-colors bg-white/50 dark:bg-black/20 rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Plus className="text-brand-primary" size={20} /> Add New Department
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 transition p-1 bg-white rounded-md border border-gray-200"><X size={18} /></button>
            </div>
            
            {success ? (
              <div className="p-12 text-center animate-in zoom-in">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <p className="font-bold text-gray-900">Success!</p>
                <p className="text-sm text-gray-500 mt-1">Department added to system.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase text-[10px]">Department Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={newDept.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40 bg-gray-50 text-sm font-medium" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase text-[10px]">Dept Code</label>
                    <input 
                      type="text" 
                      name="code"
                      required
                      value={newDept.code}
                      onChange={handleInputChange}
                      placeholder="e.g. CSE"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40 bg-gray-50 text-sm font-medium uppercase" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase text-[10px]">Head of Dept</label>
                    <input 
                      type="text" 
                      name="hod"
                      required
                      value={newDept.hod}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/40 bg-gray-50 text-sm font-medium" 
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:opacity-90 transition transform hover:-translate-y-0.5">
                    Save Department
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
