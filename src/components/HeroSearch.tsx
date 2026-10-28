import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { SYRIAN_GOVERNORATES } from '../data/mockData';
import { Governorate } from '../types';

export const HeroSearch: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedGovernorate,
    setSelectedGovernorate
  } = useApp();

  return (
    <div className="relative bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white overflow-hidden py-8 sm:py-12">
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Headlines */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>سيران سوريا • المنصة المعتمدة للمزارع والشاليهات الفاخرة</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
            إقامتك القادمة في سوريا، <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              بطاقة شمسية 24/7 وتأكيد فوري
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
            مزارع يعفور وصحنايا، شاليهات بورتو واللاذقية، مع دفع آمن محلياً وللمغتربين.
          </p>
        </div>

        {/* Hero Interactive Search Box */}
        <div className="mt-6 max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-white/20 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400">الوجهة أو المنطقة</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="يعفور، طرطوس، بلودان، باب توما..."
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Governorate Quick Dropdown */}
            <div className="md:col-span-3">
              <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[10px] font-bold text-slate-400">المحافظة</label>
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value as Governorate | 'الكل')}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {SYRIAN_GOVERNORATES.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search CTA Button */}
            <div className="md:col-span-3">
              <button 
                onClick={() => {
                  const el = document.getElementById('properties-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>بحث في الإقامات</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
