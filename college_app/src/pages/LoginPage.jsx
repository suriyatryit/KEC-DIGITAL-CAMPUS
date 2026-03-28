import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';
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
      setError(err.message || 'Invalid institutional credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Security Check: Role-based passcode
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
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, name, role);
      setError('Registration successful! Check email for confirmation.');
      setIsSignUp(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-brand-accent/30 bg-[#050A14] text-slate-200">
      {/* Visual Side - Fixed on Desktop */}
      <div className="hidden lg:flex flex-col w-[55%] relative overflow-hidden border-r border-white/5 bg-[#080E1A]">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,27,27,0.05),transparent)]"></div>
        </div>
        
        <div className="relative z-10 p-20 flex flex-col h-full justify-center">
          <KingstonLogo variant="banner" className="animate-in fade-in zoom-in duration-700" />
        </div>
      </div>

      {/* Auth Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 relative bg-[#050A14]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full max-w-md relative z-10 group">
          <div className="text-center mb-12">
            <div className="lg:hidden mb-8">
              <KingstonLogo className="justify-center" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-6">
              <ShieldCheck size={14} className="text-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">Secure Session v2.0</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-3">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </h1>
            <p className="text-slate-400 font-bold text-sm">
              {isSignUp ? 'Create your institutional account' : 'Enter your email and password'}
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl mb-8 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-accent focus:bg-white/10 outline-none text-sm transition-all font-bold placeholder:text-slate-600"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-accent focus:bg-white/10 outline-none text-sm transition-all font-bold placeholder:text-slate-600"
                placeholder="email@kec.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-accent focus:bg-white/10 outline-none text-sm transition-all font-bold placeholder:text-slate-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-5 py-2 animate-in fade-in duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Type</label>
                  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                    {['student', 'faculty', 'hod'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRole(r); setPasscode(''); setError(''); }}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === r ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {role !== 'student' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest ml-1">Verification Code</label>
                    <div className="relative">
                      <input
                        type={showPasscode ? "text" : "password"}
                        required
                        className="w-full px-6 py-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl focus:ring-2 focus:ring-brand-accent outline-none text-sm placeholder:text-brand-accent/30 font-bold"
                        placeholder={`KEC-${role.toUpperCase()}-XXXX`}
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-accent/40 hover:text-brand-accent transition-colors"
                      >
                        {showPasscode ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isSignUp && (
              <div className="flex justify-end pr-1">
                <button type="button" onClick={() => setError("Please contact the administrator to reset your password.")} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-accent transition-colors">Forgot Password?</button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-brand-accent text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-accent/20 hover:bg-[#b91c1c] hover:-translate-y-0.5 active:translate-y-0 transition-all flex justify-center items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
              <span>{isSignUp ? 'Sign Up' : 'Login'}</span>
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-white/5">
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className="mt-auto pt-10 text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em] text-center opacity-50">
          Persistent Academic Operating System | KEC Institutional Node
        </p>
      </div>
    </div>
  );
}
