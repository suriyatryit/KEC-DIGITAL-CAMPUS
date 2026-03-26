import React, { useState, useRef } from 'react';
import { 
  UploadCloud, FileText, Download, Trash2, FolderPlus, X, CheckCircle, 
  FileUp, Video, Link as LinkIcon, BookOpen, ChevronDown 
} from 'lucide-react';

const initialData = {
  'Data Structures': {
    'Chapter 1: Stack & Queues': [
      { id: Date.now()+1, title: 'Introduction to Stacks', type: 'PDF', size: '2.4 MB', date: '20 Oct, 2026' },
      { id: Date.now()+2, title: 'Queue Implementation Guide', type: 'DOCX', size: '450 KB', date: '22 Oct, 2026' },
      { id: Date.now()+3, title: 'Stack Visualization', type: 'VIDEO', size: 'Link', date: '23 Oct, 2026' },
    ],
    'Chapter 2: Linked Lists': [
      { id: Date.now()+4, title: 'Singly Linked List Lab Manual', type: 'LAB', size: '1.2 MB', date: '24 Oct, 2026' },
    ]
  },
  'Operating Systems': {
    'Chapter 1: Process Management': []
  }
};

export default function StudyMaterials() {
  const [subjectData, setSubjectData] = useState(initialData);
  
  const handlingSubjects = Object.keys(initialData);
  const [activeSubject, setActiveSubject] = useState(handlingSubjects[0]);
  
  const activeChapters = Object.keys(subjectData[activeSubject] || {});

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(activeChapters[0] || 'General');
  const [materialType, setMaterialType] = useState('PDF');
  const [linkInput, setLinkInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [showChapterModal, setShowChapterModal] = useState(false);
  const [newChapterName, setNewChapterName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      if (!title) {
        const nameParts = e.target.files[0].name.split('.');
        const ext = nameParts.pop().toUpperCase();
        setTitle(nameParts.join('.'));
        if (materialType !== 'PDF' && materialType !== 'DOCX') {
          setMaterialType(ext === 'PDF' ? 'PDF' : ext.includes('DOC') ? 'DOCX' : 'PDF');
        }
      }
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!title || (!selectedFile && !linkInput)) return;

    let sizeStr = 'Link';
    if (selectedFile) {
        const sizeKB = Math.round(selectedFile.size / 1024);
        sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
    }

    const newMaterial = {
      id: Date.now(),
      title,
      type: materialType,
      size: sizeStr,
      link: linkInput || null,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const targetChapter = selectedChapter || 'General';

    setSubjectData(prev => ({
       ...prev,
       [activeSubject]: {
          ...prev[activeSubject],
          [targetChapter]: [newMaterial, ...(prev[activeSubject][targetChapter] || [])]
       }
    }));
    
    setTitle('');
    setSelectedFile(null);
    setLinkInput('');
    setShowUploadModal(false);
  };

  const handleAddChapter = (e) => {
     e.preventDefault();
     if (!newChapterName || subjectData[activeSubject][newChapterName]) return;
     
     setSubjectData(prev => ({
       ...prev,
       [activeSubject]: {
           ...prev[activeSubject],
           [newChapterName]: []
       }
     }));
     
     setSelectedChapter(newChapterName);
     setNewChapterName('');
     setShowChapterModal(false);
  };

  const handleDelete = (chapterName, id) => {
     setSubjectData(prev => ({
       ...prev,
       [activeSubject]: {
          ...prev[activeSubject],
          [chapterName]: prev[activeSubject][chapterName].filter(m => m.id !== id)
       }
     }));
  };

  const handleMockDownload = (file) => {
     if (file.type === 'VIDEO' || file.type === 'LINK') {
         if (file.link) window.open(file.link, '_blank');
         return;
     }
     const dummyContent = `Faculty Mock Download: ${file.title}`;
     const blob = new Blob([dummyContent], { type: 'text/plain' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = `${file.title.replace(/\s+/g, '_')}_FacultyView.txt`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const getIcon = (type) => {
     switch(type) {
        case 'VIDEO': return <Video size={24} className="text-red-500" />;
        case 'LINK': return <LinkIcon size={24} className="text-brand-dark" />;
        case 'LAB': return <BookOpen size={24} className="text-purple-500" />;
        case 'PDF': return <FileText size={24} className="text-red-500" />;
        default: return <FileText size={24} className="text-blue-500" />;
     }
  };

  const getIconBg = (type) => {
     switch(type) {
        case 'VIDEO': return 'bg-red-50';
        case 'LINK': return 'bg-gray-100';
        case 'LAB': return 'bg-purple-50';
        case 'PDF': return 'bg-red-50';
        default: return 'bg-blue-50';
     }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
             <div className="bg-brand-primary text-white p-2 rounded-xl shadow-md"><FolderPlus size={20} /></div>
             Course Materials Library
          </h1>
          <div className="flex items-center gap-3 mt-3">
             <label className="text-sm font-medium text-gray-500">Handling Subject:</label>
             <div className="relative">
                <select 
                   value={activeSubject}
                   onChange={(e) => setActiveSubject(e.target.value)}
                   className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 outline-none focus:border-brand-primary select-none"
                >
                   {handlingSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowChapterModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
          >
             <FolderPlus size={16} /> Add Chapter
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white hover:bg-gray-800 text-sm font-bold rounded-xl transition shadow-lg shadow-gray-200"
          >
             <UploadCloud size={18} /> Upload Material
          </button>
        </div>
      </div>

      <div className="space-y-8">
         {activeChapters.length === 0 && (
            <div className="p-16 text-center text-gray-500 bg-white rounded-3xl shadow-sm border border-gray-100">
               <div className="bg-gray-50 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6">
                 <FolderPlus size={40} className="text-brand-dark opacity-50" />
               </div>
               <p className="font-bold text-xl text-gray-900">No chapters found for {activeSubject}</p>
               <p className="text-sm mt-2 max-w-md mx-auto">Click "Upload Material" to automatically create a General folder, or create a specific chapter below.</p>
               <button onClick={() => setShowChapterModal(true)} className="mt-6 px-6 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                 Create Chapter
               </button>
            </div>
         )}

         {activeChapters.map(chapter => (
            <div key={chapter} className="glass-panel p-6 rounded-2xl border border-gray-100">
               <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex justify-between items-center">
                  {chapter}
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded-md">{subjectData[activeSubject][chapter].length} items</span>
               </h2>
               
               {subjectData[activeSubject][chapter].length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-100 rounded-xl">
                     This chapter is empty. Upload materials to fill it.
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjectData[activeSubject][chapter].map(file => (
                       <div key={file.id} className="bg-white p-4 rounded-xl flex items-center justify-between group hover:shadow-lg transition-all border border-gray-100 cursor-pointer">
                          <div className="flex items-center gap-4 min-w-0 pr-4">
                             <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(file.type)}`}>
                               {getIcon(file.type)}
                             </div>
                             <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm group-hover:text-brand-primary transition-colors truncate">{file.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-1">
                                   <span className="uppercase">{file.type}</span>
                                   <span>•</span>
                                   <span>{file.size}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex shrink-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                             {(file.type === 'LINK' || file.type === 'VIDEO') ? (
                                <button onClick={() => window.open(file.link || '#', '_blank')} className="p-2 text-gray-400 hover:text-brand-dark transition bg-gray-50 rounded-lg">
                                  <LinkIcon size={16} />
                                </button>
                             ) : (
                                <button onClick={(e) => { e.stopPropagation(); handleMockDownload(file); }} className="p-2 text-gray-400 hover:text-brand-dark transition bg-gray-50 rounded-lg">
                                  <Download size={16} />
                                </button>
                             )}
                             <button onClick={(e) => { e.stopPropagation(); handleDelete(chapter, file.id); }} className="p-2 ml-1 text-gray-400 hover:text-red-500 transition bg-red-50/50 rounded-lg">
                               <Trash2 size={16} />
                             </button>
                          </div>
                       </div>
                    ))}
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* Chapter Creation Modal */}
      {showChapterModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-900">Add New Chapter</h3>
                 <button onClick={() => setShowChapterModal(false)} className="text-gray-400 hover:text-gray-900"><X size={18}/></button>
              </div>
              <form onSubmit={handleAddChapter} className="p-5 space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Chapter Name / Number</label>
                    <input 
                      type="text" autoFocus
                      value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)}
                      placeholder="e.g. Chapter 3: Dynamic Programming"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                    />
                 </div>
                 <button type="submit" disabled={!newChapterName} className="w-full py-2.5 bg-brand-dark text-white font-bold rounded-lg disabled:bg-gray-300">Create Folder</button>
              </form>
           </div>
        </div>
      )}

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
               <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                 <FileUp className="text-brand-primary" size={20} /> Upload to {activeSubject}
               </h3>
               <button onClick={() => {
                 setShowUploadModal(false); setSelectedFile(null); setTitle(''); setLinkInput('');
               }} className="text-gray-400 hover:text-gray-700 transition p-1 bg-white rounded-md border border-gray-200"><X size={18} /></button>
             </div>
             
             <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Target Chapter</label>
                   <select 
                     value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}
                     className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary text-sm font-medium"
                   >
                     {activeChapters.map(chap => <option key={chap} value={chap}>{chap}</option>)}
                   </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div onClick={() => setMaterialType('PDF')} className={`p-3 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition ${materialType === 'PDF' ? 'border-brand-primary bg-red-50 text-brand-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                      <FileText size={24} /><span className="text-xs font-bold">Document</span>
                   </div>
                   <div onClick={() => setMaterialType('LAB')} className={`p-3 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition ${materialType === 'LAB' ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                      <BookOpen size={24} /><span className="text-xs font-bold">Lab Manual</span>
                   </div>
                   <div onClick={() => setMaterialType('VIDEO')} className={`p-3 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition ${materialType === 'VIDEO' ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                      <Video size={24} /><span className="text-xs font-bold">Video</span>
                   </div>
                   <div onClick={() => setMaterialType('LINK')} className={`p-3 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition ${materialType === 'LINK' ? 'border-brand-dark bg-gray-100 text-brand-dark' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                      <LinkIcon size={24} /><span className="text-xs font-bold">Web Link</span>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Material Title</label>
                   <input 
                     type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                     placeholder="Title of the resource..."
                     className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                   />
                </div>

                {(materialType === 'VIDEO' || materialType === 'LINK') ? (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Resource URL</label>
                    <input 
                      type="url" value={linkInput} onChange={(e) => setLinkInput(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Attach File</label>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.ppt,.txt" />
                    
                    {!selectedFile ? (
                      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:border-brand-primary/50">
                        <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-xs font-bold text-gray-600">Click to browse file</p>
                      </div>
                    ) : (
                      <div className="border border-green-200 bg-green-50 rounded-xl p-3 flex justify-between items-center">
                         <div className="flex gap-2 items-center text-sm font-medium text-gray-900 truncate">
                           <CheckCircle size={16} className="text-green-600 shrink-0" /> <span className="truncate">{selectedFile.name}</span>
                         </div>
                         <button type="button" onClick={() => setSelectedFile(null)} className="text-red-500 shrink-0"><Trash2 size={16}/></button>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                   <button 
                     type="submit" 
                     disabled={!title || ( (materialType==='VIDEO'||materialType==='LINK') ? !linkInput : !selectedFile )}
                     className="w-full py-3 rounded-xl font-bold text-sm bg-brand-primary text-white hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md shadow-brand-primary/20"
                   >
                     Upload Resource
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
