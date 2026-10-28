import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palmtree, 
  Waves, 
  Building2, 
  Hotel, 
  Mountain, 
  LayoutGrid, 
  MapPin, 
  SlidersHorizontal, 
  Map, 
  List 
} from 'lucide-react';
import { PropertyType, Governorate } from '../types';
import { SYRIAN_GOVERNORATES } from '../data/mockData';

export const CategoryBar: React.FC = () => {
  const { 
    selectedType, 
    setSelectedType, 
    selectedGovernorate, 
    setSelectedGovernorate,
    viewMode,
    setViewMode,
    setIsAdvancedFilterOpen
  } = useApp();

  const categories = [
    { id: 'all', label: 'جميع الإقامات', icon: LayoutGrid },
    { id: 'hotel', label: 'فنادق وأجنحة', icon: Hotel },
    { id: 'farm', label: 'مزارع واستراحات', icon: Palmtree },
    { id: 'chalet', label: 'شاليهات ومصايف', icon: Waves },
    { id: 'apartment', label: 'شقق مفروشة', icon: Building2 },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Top Category Icons Row + Map Switcher */}
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar flex-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id as PropertyType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Airbnb-style Map/Grid Toggle & Advanced Filters */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                viewMode === 'map'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="التبديل بين عرض القائمة والخريطة التفاعلية"
            >
              {viewMode === 'map' ? (
                <>
                  <List className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">عرض القائمة</span>
                </>
              ) : (
                <>
                  <Map className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">عرض الخريطة</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">فلاتر متقدمة</span>
            </button>
          </div>

        </div>

        {/* Governorates Strip & View Controls */}
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
          
          {/* Governorate Select Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none no-scrollbar flex-1">
            <span className="flex items-center gap-1 text-slate-400 text-xs font-bold pl-1 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>المحافظة:</span>
            </span>
            {SYRIAN_GOVERNORATES.map((gov) => {
              const isActive = selectedGovernorate === gov;
              return (
                <button
                  key={gov}
                  onClick={() => setSelectedGovernorate(gov as Governorate | 'الكل')}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {gov}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
