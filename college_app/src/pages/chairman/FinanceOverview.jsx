import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, Download } from 'lucide-react';

export default function FinanceOverview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12 relative">
      <div className="bg-brand-primary border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-accent opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Fiscal Intel</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 opacity-80">Institutional Revenue & Fiscal Governance</p>
        </div>
        <button className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
          <Download size={18} /> Export Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-[0.05] rounded-full blur-[60px] -mr-16 -mt-16 group-hover:opacity-[0.1] transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Total Revenue (YTD)</h3>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-2xl">
              <DollarSign size={22} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-4xl font-black text-white tracking-tight">$4.2M</p>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-2 flex items-center gap-2"><TrendingUp size={14} /> +12% Efficiency</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-[0.05] rounded-full blur-[60px] -mr-16 -mt-16 group-hover:opacity-[0.1] transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Fee Collection Index</h3>
            <div className="text-2xl font-black text-brand-accent bg-brand-accent/10 w-16 h-12 flex items-center justify-center rounded-xl border border-brand-accent/20">85%</div>
          </div>
          <div className="relative z-10">
            <div className="w-full bg-white/5 rounded-full h-3 border border-white/5 mb-3 p-0.5 mt-4">
              <div className="bg-brand-accent h-full rounded-full shadow-[0_0_15px_rgba(153,27,27,0.4)]" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Projection: Synchronized for Q4</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-[0.05] rounded-full blur-[60px] -mr-16 -mt-16 group-hover:opacity-[0.1] transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Pending Assets</h3>
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-2xl">
              <AlertCircle size={22} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-4xl font-black text-white tracking-tight">$450k</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2 tracking-tight">Across 1200 Terminal Points</p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-[0.02] rounded-full blur-[80px]" />
         <h3 className="text-xl font-black text-white mb-8 tracking-tight flex items-center gap-4">
           <div className="w-1.5 h-6 bg-brand-accent rounded-full" />
           Transaction Protocol History
         </h3>
         <div className="text-center py-24 text-slate-500 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Temporal Ledger Visualization: Initializing Data Streams...</p>
         </div>
      </div>
    </div>
  );
}
