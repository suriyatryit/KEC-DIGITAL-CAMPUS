import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, Download } from 'lucide-react';

export default function FinanceOverview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Overview</h1>
          <p className="text-gray-500 text-sm mt-1">High-level view of college finances and fee collection</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
          <Download size={16} /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue (YTD)</h3>
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
              <DollarSign size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">$4.2M</p>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12} /> +12% from last year</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-500">Fee Collection Target</h3>
            <div className="text-lg font-bold text-blue-600">85%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-gray-500 font-medium">On track for Q3</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-primary flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-500">Pending Dues</h3>
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <AlertCircle size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-brand-primary">$450k</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Across 1200 students</p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 rounded-2xl border border-gray-100">
         <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
         <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Transaction history visualization here.
         </div>
      </div>
    </div>
  );
}
