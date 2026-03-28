import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, School } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login simulating a backend call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // Mock success routing
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col items-center">
        <div className="w-full bg-blue-600 p-8 flex flex-col items-center text-white">
          <School size={48} className="mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">OmniCampus</h1>
          <p className="text-blue-100 mt-2 text-center">Unified College OS</p>
        </div>
        <form onSubmit={handleLogin} className="w-full p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / ID</label>
            <input 
              required
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="faculty@college.edu or 21CS101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {loading ? <span>Authenticating...</span> : (
              <>
                <span>Sign In</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
