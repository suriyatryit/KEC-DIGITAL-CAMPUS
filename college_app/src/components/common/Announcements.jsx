import React, { useState } from 'react';
import { Send, Megaphone, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';

const initialNotices = [
  { id: 1, title: 'Exam Schedule Released', content: 'The final semester exam schedule has been updated on the portal.', author: 'Admin', date: '2 hours ago', scope: 'All' },
  { id: 2, title: 'Department Faculty Meeting', content: 'Mandatory meeting for all CSE faculty at 3 PM today.', author: 'CSE HOD', date: '5 hours ago', scope: 'CSE Faculty' },
];

export default function Announcements() {
  const { user } = useAuth();
  const [notices, setNotices] = useState(initialNotices);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const canPost = user.role === ROLES.CHAIRMAN || user.role === ROLES.PRINCIPAL || user.role === ROLES.HOD || user.role === ROLES.FACULTY;

  const handlePost = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newNotice = {
      id: notices.length + 1,
      title: newTitle,
      content: newContent,
      author: user.username,
      date: 'Just now',
      scope: 'General'
    };

    setNotices([newNotice, ...notices]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
             <Megaphone size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
            <p className="text-gray-500 text-sm mt-1">Official announcements and communications</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2 pb-4">
          {notices.map((notice) => (
            <div key={notice.id} className="glass-panel p-5 rounded-2xl border-l-4 border-l-brand-dark hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{notice.scope}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{notice.content}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1"><Clock size={12} /> {notice.date}</span>
                <span>•</span>
                <span>Posted by <span className="text-brand-dark">{notice.author}</span></span>
              </div>
            </div>
          ))}
        </div>

        {canPost && (
          <div className="glass-panel p-6 rounded-2xl h-fit sticky top-6 border border-brand-primary/20 shadow-lg shadow-brand-primary/5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
               <Send size={18} className="text-brand-primary" />
               New Announcement
            </h3>
            <form onSubmit={handlePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none"
                  placeholder="Keep it brief"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg h-32 resize-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none"
                  placeholder="Detailed announcement content..."
                ></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-2.5 bg-brand-dark text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition shadow-md">
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
