import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, X, Download, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingTask, setViewingTask] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchAssignments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching assignments:', error);
      } else {
        // Map DB fields to UI fields
        setAssignments(data.map(item => ({
          ...item,
          dueDate: item.deadline ? new Date(item.deadline).toLocaleDateString() : 'N/A',
          type: 'Standard' // Default for now
        })));
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [user]);

  const handleFileUpload = async (e, taskId) => {
    const file = e.target.files[0];
    if (file && user) {
      const fileUrl = URL.createObjectURL(file);
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const fileType = isImage ? 'image' : isPdf ? 'pdf' : 'other';

      // 1. In a real app, you would upload to Supabase Storage first.
      // 2. Here we update the assignment status in the DB.
      const { data, error } = await supabase
        .from('assignments')
        .update({ 
          status: 'Submitted',
          // file_url: uploaded_storage_url (omitted for local mock upload simulation)
        })
        .eq('id', taskId)
        .select();

      if (error) {
        alert('Failed to update submission in Supabase: ' + error.message);
      } else {
        setAssignments(prev => prev.map(task => 
          task.id === taskId 
            ? { ...task, status: 'Submitted', fileUrl, fileType, fileName: file.name } 
            : task
        ));
      }
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12">
        <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-white tracking-tight">Mission Briefings</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Academic Coursework & Submission Protocols</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {assignments.map((task, index) => (
              <div key={task.id} className="glass-panel p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 group relative overflow-hidden transition-all hover:bg-white/[0.03] border border-white/5" style={{ animationDelay: `${index * 100}ms` }}>
                 <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -mr-16 -mt-16 opacity-[0.05] transition-opacity duration-500 ${task.status === 'Submitted' ? 'bg-emerald-500' : 'bg-brand-accent'}`}></div>

                 <div className="flex items-center gap-8 flex-1 relative z-10">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl transition-transform duration-500 group-hover:scale-110 ${
                       task.status === 'Submitted' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                    }`}>
                       {task.status === 'Submitted' ? <CheckCircle size={28} strokeWidth={2.5} /> : <FileText size={28} strokeWidth={2.5} />}
                    </div>
                    <div>
                       <h3 className="font-black text-white text-xl tracking-tight mb-1">{task.title}</h3>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{task.subject}</p>
                       
                       <div className="flex items-center gap-4 mt-6">
                          {task.status === 'Pending' ? (
                             <span className="flex items-center gap-2 text-[10px] font-black bg-brand-accent/5 text-brand-accent border border-brand-accent/20 px-4 py-2 rounded-xl uppercase tracking-widest">
                                <Clock size={16} /> Deadline: {task.dueDate}
                             </span>
                          ) : (
                             <span className="flex items-center gap-2 text-[10px] font-black bg-emerald-500/5 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl uppercase tracking-widest">
                                <CheckCircle size={16} /> Status: Synchronized
                             </span>
                          )}
                          <span className="text-[10px] font-black text-slate-600 bg-white/5 px-4 py-2 rounded-xl border border-white/5 uppercase tracking-widest">Type: {task.type || 'Standard'}</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-auto mt-4 md:mt-0 relative z-10">
                    {task.status === 'Pending' ? (
                      <label className="w-full md:w-auto flex justify-center items-center gap-3 px-10 py-5 bg-brand-accent text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#b91c1c] transition-all shadow-2xl shadow-brand-accent/20 cursor-pointer hover:translate-y-[-2px]">
                        <Upload size={18} /> Transmit Work
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, task.id)} />
                      </label>
                    ) : (
                      <button 
                        onClick={() => setViewingTask(task)}
                        className="w-full md:w-auto flex justify-center items-center gap-3 px-10 py-5 bg-white/5 text-white border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all"
                      >
                        <Eye size={18} /> Inspect Asset
                      </button>
                    )}
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#050A14]/90 backdrop-blur-xl" onClick={() => setViewingTask(null)}></div>
          
          <div className="relative w-full max-w-6xl bg-brand-primary rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-300 border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-10 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="font-black text-white text-xl tracking-tight leading-tight">{viewingTask.title}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{viewingTask.subject} • Validated Asset</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="px-8 py-4 flex items-center gap-3 rounded-2xl bg-brand-accent text-white font-black text-[10px] uppercase tracking-widest hover:bg-[#b91c1c] transition-all shadow-2xl shadow-brand-accent/20">
                  <Download size={18} /> Export Index
                </button>
                <button 
                  onClick={() => setViewingTask(null)}
                  className="p-4 text-slate-500 hover:bg-white/10 hover:text-white rounded-2xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer */}
            <div className="flex-1 bg-slate-100 dark:bg-black/50 p-4 sm:p-4 overflow-hidden flex justify-center items-start">
              {viewingTask.fileUrl ? (
                /* Dynamic File Viewer for recently uploaded files */
                <div className="w-full h-full bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col relative">
                  {viewingTask.fileType === 'image' ? (
                     <div className="flex-1 flex justify-center items-center overflow-auto p-4 bg-gray-50 dark:bg-slate-900/50">
                        <img src={viewingTask.fileUrl} alt={viewingTask.fileName} className="max-w-full max-h-full object-contain rounded drop-shadow-md" />
                     </div>
                  ) : viewingTask.fileType === 'pdf' ? (
                     <iframe src={viewingTask.fileUrl} title={viewingTask.fileName} className="w-full h-full border-0 bg-transparent"></iframe>
                  ) : (
                     <div className="flex-1 flex flex-col justify-center items-center p-12 text-center">
                        <FileText size={80} className="text-slate-300 mb-4" />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{viewingTask.fileName}</h2>
                        <p className="text-slate-500 mb-6 max-w-md">This file type cannot be previewed directly in the browser. Please download the file to view it.</p>
                        <a href={viewingTask.fileUrl} download={viewingTask.fileName} className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-600 transition-colors">
                           Download File
                        </a>
                     </div>
                  )}
                  {viewingTask.score !== 'Under Review' && (
                    <div className="absolute bottom-6 right-8 text-5xl font-black text-emerald-500/10 rotate-[-15deg] pointer-events-none">
                      EVALUATED
                    </div>
                  )}
                </div>
              ) : (
                /* Static Dummy Viewer for pre-existing mock submissions */
                <div className="w-full max-w-2xl bg-white dark:bg-slate-800 shadow-xl rounded-lg h-full max-h-[1000px] overflow-y-auto p-8 sm:p-12 border border-slate-200 dark:border-white/10 relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-emerald-500"></div>
                  <div className="opacity-20 flex justify-center mb-8 mt-4">
                    <FileText size={80} className="text-slate-400" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-4">{viewingTask.title}</h1>
                  <p className="text-center text-slate-500 mb-12">Submission ID: #{viewingTask.id} • Secure Document Viewer</p>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-4/6"></div>
                    <div className="h-4 bg-transparent rounded w-full my-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4"></div>
                  </div>
                  
                  <div className="absolute bottom-8 right-12 text-5xl font-black text-emerald-500/10 rotate-[-15deg] pointer-events-none">
                    EVALUATED
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
