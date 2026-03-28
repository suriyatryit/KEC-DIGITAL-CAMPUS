import { useState } from 'react';
import { Users, BookOpen, PlusCircle } from 'lucide-react';

export default function Classroom() {
  const [classes, setClasses] = useState([{ id: 1, name: 'CS401 Computer Networks', students: 45 }]);
  const [newClassName, setNewClassName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    setClasses([...classes, { id: Date.now(), name: newClassName, students: 0 }]);
    setNewClassName('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <BookOpen className="text-blue-600" />
          <span>My Classrooms</span>
        </h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Create New Class</h2>
        <form onSubmit={handleCreate} className="flex space-x-4">
          <input 
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="e.g. EE200 Signals & Systems"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2">
            <PlusCircle size={20} />
            <span>Create</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex flex-col justify-end text-white relative">
              <h3 className="text-xl font-bold truncate">{cls.name}</h3>
            </div>
            <div className="p-4 bg-gray-50 flex items-center text-gray-600 space-x-2">
              <Users size={18} />
              <span>{cls.students} Enrolled Students</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
