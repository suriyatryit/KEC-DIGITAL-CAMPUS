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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-3xl border border-[var(--glass-border)] bg-gradient-to-r from-[var(--glass-bg)] to-transparent relative overflow-hidden">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-primary-600 rounded-full blur-[40px] opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 tracking-tight">Assignments</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mt-2">Submit and track your academic coursework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
           {assignments.map((task, index) => (
              <div key={task.id} className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover-lift relative overflow-hidden group" style={{ animationDelay: `${index * 100}ms` }}>
                 <div className={`absolute top-1/2 left-0 w-32 h-32 rounded-full blur-[40px] -ml-16 -mt-16 transition-colors duration-500 pointer-events-none ${task.status === 'Submitted' ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-brand-primary/10 group-hover:bg-brand-primary/20'}`}></div>

                 <div className="flex items-start gap-5 flex-1 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-[var(--glass-border)] shadow-lg ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-500 ${
                       task.status === 'Submitted' ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-500' : 'bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] text-brand-primary'
                    }`}>
                       {task.status === 'Submitted' ? <CheckCircle size={26} /> : <FileText size={26} />}
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight mb-1">{task.title}</h3>
                       <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{task.subject}</p>
                       
                       <div className="flex items-center gap-3 mt-4">
                          {task.status === 'Pending' ? (
                             <span className="flex items-center gap-1.5 text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <AlertCircle size={14} /> Due {task.dueDate}
                             </span>
                          ) : (
                             <span className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <CheckCircle size={14} /> Submitted ({task.score})
                             </span>
                          )}
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">{task.type || 'Standard'}</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-auto mt-4 md:mt-0 relative z-10 pt-4 md:pt-0 border-t border-slate-200 dark:border-white/10 md:border-none">
                   {task.status === 'Pending' ? (
                     <label className="w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-primary-600 text-white text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover-lift cursor-pointer">
                       <Upload size={18} /> Submit Work
                       <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, task.id)} />
                     </label>
                   ) : (
                     <button 
                       onClick={() => setViewingTask(task)}
                       className="w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3 bg-white/50 dark:bg-black/20 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-sm font-bold rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all"
                     >
                       <Eye size={18} /> View Submission
                     </button>
                   )}
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setViewingTask(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{viewingTask.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{viewingTask.subject} • Submitted Document</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 sm:px-4 sm:py-2 flex items-center gap-2 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-primary-600 transition-colors">
                  <Download size={18} /> <span className="hidden sm:inline">Download PDF</span>
                </button>
                <button 
                  onClick={() => setViewingTask(null)}
                  className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
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
