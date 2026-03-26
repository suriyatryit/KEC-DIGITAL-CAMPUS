import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { KingstonLogo } from '../components/common/KingstonLogo';
import milestoneImg from '../assets/autonomous_milestone.jpg';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const { login, signUp } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Security Check: Role-based passcode (Case-insensitive & Trimmed)
    const normalizedPasscode = passcode.trim().toUpperCase();
    if (role === 'faculty' && normalizedPasscode !== 'KEC-FAC-2026') {
      setError('Invalid Faculty Passcode. Please contact HOD.');
      return;
    }
    if (role === 'hod' && normalizedPasscode !== 'KEC-HOD-2026') {
      setError('Invalid HOD Passcode. Please contact Principal.');
      return;
    }

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, name, role);
      setError('Registration successful! Please check your email for confirmation or sign in.');
      setIsSignUp(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#050A14]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #991B1B, transparent)', transform: 'translate(-30%, -30%)' }}></div>

      <div className="hidden lg:flex flex-col items-center justify-center flex-1 p-16 relative z-10 overflow-hidden">
        {/* Poster Image Layer with Advanced Effects */}
        <div className="absolute inset-0 z-0">
           <img src={milestoneImg} alt="KEC Milestone" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 via-[#0F172A]/40 to-transparent"></div>
           <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Banner Logo Overlay - Premium Glass */}
        <div className="relative z-10 glass-panel p-12 rounded-[3rem] border border-white/5 shadow-2xl scale-110">
           <KingstonLogo variant="banner" iconSize={140} textColor="text-white" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-[500px] shrink-0 p-8 relative z-20">
        <div className="lg:hidden mb-12">
          <KingstonLogo textColor="text-white" iconSize={64} />
        </div>
        
        <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="bg-[#991B1B] text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-900/20 transform hover:rotate-3 transition-transform">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-black text-[#1E293B] tracking-tight">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest">{isSignUp ? 'Institutional Network' : 'Authorized Access Only'}</p>
          </div>

          {error && (
            <div className={`p-5 rounded-2xl mb-8 text-[11px] font-black uppercase tracking-wider border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${error.includes('successful') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
              <AlertCircle size={20} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-2 focus:ring-[#0F172A] focus:bg-white outline-none text-sm transition-all font-bold group-hover:bg-slate-100"
                    placeholder="Principal / Faculty Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-2 focus:ring-[#0F172A] focus:bg-white outline-none text-sm transition-all font-bold"
                placeholder="name@kec.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Secure Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-2 focus:ring-[#0F172A] focus:bg-white outline-none text-sm transition-all font-bold"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-4.5 text-slate-300 hover:text-slate-500 transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Select Designation</label>
                  <div className="flex gap-2 p-1.5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                    {['student', 'faculty', 'hod'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRole(r); setPasscode(''); setError(''); }}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === r ? 'bg-white text-[#991B1B] shadow-md border border-slate-100 scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {role !== 'student' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black text-[#991B1B] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                       Verification Passcode
                    </label>
                    <div className="relative">
                      <input
                        type={showPasscode ? "text" : "password"}
                        required
                        className="w-full px-6 py-4 bg-red-50/20 border border-red-50 rounded-[1.5rem] focus:ring-2 focus:ring-[#991B1B] outline-none text-sm placeholder:text-red-200 font-bold"
                        placeholder={`ENTER ${role.toUpperCase()} CODE`}
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute right-6 top-4.5 text-red-200 hover:text-[#991B1B] transition-colors"
                      >
                        {showPasscode ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <button type="button" onClick={() => setError("Institutional reset required. Contact Administrator.")} className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest hover:text-[#991B1B] transition-colors ml-2">Reset Credentials</button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-[#991B1B] text-white rounded-[1.75rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-red-900/30 hover:bg-[#7f1d1d] hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex justify-center items-center gap-4 ${loading ? 'opacity-70' : ''}`}
            >
              {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
              {isSignUp ? 'Confirm Registration' : 'Authorize Access'}
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-slate-50">
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0F172A] transition-colors"
            >
              {isSignUp ? 'Back to Authorization' : 'Request Access Node'}
            </button>
          </div>
        </div>
        
        {/* Footer Fineprint */}
        <p className="mt-12 text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-40 text-center leading-loose">
          Secure Academic Information System<br />
          Kingston Engineering College &copy; 2026
        </p>
      </div>
    </div>
  );
}
