import React, { useState } from 'react';
import { FileText, Download, Video, Link as LinkIcon, BookOpen, Search, BookMarked, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

// Same data as faculty side (in production this would come from the backend)
const materialsData = {
  'Data Structures': {
    'Chapter 1: Stack & Queues': [
      { id: 1, title: 'Introduction to Stacks', type: 'PDF', size: '2.4 MB', date: '20 Oct, 2026' },
      { id: 2, title: 'Queue Implementation Guide', type: 'DOCX', size: '450 KB', date: '22 Oct, 2026' },
      { id: 3, title: 'Stack Visualization', type: 'VIDEO', size: 'Link', date: '23 Oct, 2026', link: 'https://youtube.com' },
    ],
    'Chapter 2: Linked Lists': [
      { id: 4, title: 'Singly Linked List Lab Manual', type: 'LAB', size: '1.2 MB', date: '24 Oct, 2026' },
    ],
  },
  'Operating Systems': {
    'Chapter 1: Process Management': [
      { id: 5, title: 'Process Scheduling Slides', type: 'PDF', size: '3.1 MB', date: '18 Oct, 2026' },
    ],
  },
  'Computer Networks': {
    'Chapter 1: OSI Model': [
      { id: 6, title: 'OSI Layers Reference', type: 'PDF', size: '1.8 MB', date: '15 Oct, 2026' },
      { id: 7, title: 'Networking Tutorial Video', type: 'VIDEO', size: 'Link', date: '16 Oct, 2026', link: 'https://youtube.com' },
    ],
  },
};

const typeConfig = {
  PDF:   { icon: FileText,  bg: 'bg-red-50',    color: 'text-brand-primary',   label: 'PDF' },
  DOCX:  { icon: FileText,  bg: 'bg-blue-50',   color: 'text-blue-600',    label: 'DOCX' },
  VIDEO: { icon: Video,     bg: 'bg-red-50',    color: 'text-red-500',     label: 'Video' },
  LAB:   { icon: BookOpen,  bg: 'bg-purple-50', color: 'text-purple-600',  label: 'Lab' },
  LINK:  { icon: LinkIcon,  bg: 'bg-gray-100',  color: 'text-gray-700',    label: 'Link' },
};

export default function StudentMaterials() {
  const subjects = Object.keys(materialsData);
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [search, setSearch] = useState('');

  const toggleChapter = (ch) =>
    setExpandedChapters((prev) => ({ ...prev, [ch]: !prev[ch] }));

  const chapters = Object.entries(materialsData[activeSubject] || {});

  // Flatten all files for search
  const allFiles = chapters.flatMap(([ch, files]) =>
    files.map((f) => ({ ...f, chapter: ch }))
  );
  const searchResults = search.trim()
    ? allFiles.filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
    : null;

  const totalFiles = allFiles.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary text-white p-2.5 rounded-xl shadow">
              <BookMarked size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Course Materials</h1>
              <p className="text-sm text-gray-500 mt-0.5">Browse and download resources uploaded by your faculty</p>
            </div>
          </div>
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/40 bg-gray-50"
            />
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {subjects.map((sub) => {
            const count = Object.values(materialsData[sub]).flat().length;
            return (
              <button
                key={sub}
                onClick={() => { setActiveSubject(sub); setSearch(''); setExpandedChapters({}); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                  activeSubject === sub && !search
                    ? 'bg-brand-primary text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sub}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeSubject === sub && !search ? 'bg-white/20 text-white' : 'bg-white text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-bold text-gray-900">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{search}"</p>
            <button onClick={() => setSearch('')} className="text-xs text-brand-primary font-bold hover:underline">Clear</button>
          </div>
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">No materials match your search.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {searchResults.map((file) => (
                <MaterialRow key={file.id} file={file} showChapter />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Chapter Accordion */
        <div className="space-y-3">
          {chapters.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
              No materials uploaded yet for this subject.
            </div>
          )}
          {chapters.map(([chapter, files]) => {
            const isOpen = expandedChapters[chapter] !== false; // default open
            return (
              <div key={chapter} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleChapter(chapter)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {isOpen ? <ChevronDown size={18} className="text-brand-primary" /> : <ChevronRight size={18} className="text-gray-400" />}
                    <span className="font-bold text-gray-900">{chapter}</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">{files.length} files</span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {files.length === 0 ? (
                      <p className="px-6 py-8 text-sm text-center text-gray-400">No files in this chapter yet.</p>
                    ) : (
                      files.map((file) => <MaterialRow key={file.id} file={file} />)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MaterialRow({ file, showChapter }) {
  const cfg = typeConfig[file.type] || typeConfig.PDF;
  const Icon = cfg.icon;
  const isLink = file.type === 'VIDEO' || file.type === 'LINK';

  const handleDownloadAction = (e) => {
    if (isLink) return;
    
    e.preventDefault();
    
    // Generate a mock file blob to vividly demonstrate the download flow natively
    const dummyContent = `[KINGSTON ENGINEERING COLLEGE]\n\nDocument Title: ${file.title}\nSubject Chapter: ${file.chapter || 'General'}\nGenerated Date: ${new Date().toLocaleDateString()}\n\n---\nThis is a securely authenticated simulated file download generated locally by your student dashboard. In production, this securely streams the actual ${file.type} binary from our AWS S3 Bucket storage!`;
    
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Trigger native browser download pipeline
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.title.replace(/\s+/g, '_')}_Secure.txt`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`p-3 rounded-xl shrink-0 shadow-sm border border-black/5 ${cfg.bg}`}>
          <Icon size={20} className={cfg.color} />
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <p className="font-bold text-sm text-gray-900 truncate group-hover:text-brand-primary transition leading-snug">{file.title}</p>
          <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400 font-medium mt-1">
            {showChapter && <><span className="text-gray-500 font-bold">{file.chapter}</span><span>·</span></>}
            <span className={`uppercase font-bold ${cfg.color}`}>{cfg.label}</span>
            <span>·</span>
            <span>{file.size}</span>
            <span>·</span>
            <span>{file.date}</span>
          </div>
        </div>
      </div>
      <a
        href={isLink ? (file.link || '#') : '#'}
        target={isLink ? '_blank' : undefined}
        rel="noreferrer"
        onClick={handleDownloadAction}
        className={`ml-4 shrink-0 flex items-center gap-1.5 px-4 py-2 hover:bg-brand-primary hover:text-white text-sm font-bold rounded-xl transition-all shadow-sm ${isLink ? 'bg-gray-100 text-gray-600' : 'bg-brand-primary/10 text-brand-primary hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]'}`}
      >
        {isLink ? <><ExternalLink size={16} /> Open Link</> : <><Download size={16} /> Download</>}
      </a>
    </div>
  );
}
