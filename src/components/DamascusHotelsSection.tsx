import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { 
  Hotel, 
  Sparkles, 
  Building2, 
  Compass, 
  Coffee, 
  SunMedium, 
  ShieldCheck, 
  Search, 
  MapPin, 
  SlidersHorizontal,
  Star,
  Award
} from 'lucide-react';

export const DamascusHotelsSection: React.FC = () => {
  const { properties, formatPrice } = useApp();
  
  // Hotel sub-category filter
  const [hotelFilter, setHotelFilter] = useState<'all' | '5star' | 'heritage' | 'city'>('all');
  const [hotelSearch, setHotelSearch] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('الكل');

  // Filter only Damascus hotels
  const damascusHotels = properties.filter(p => p.governorate === 'دمشق' && p.type === 'hotel');

  // Neighborhoods list
  const neighborhoods = [
    'الكل',
    'باب توما',
    'القيمرية',
    'باب شرقي',
    'الصالحية والشعلان',
    'أبو رمانة',
    'ساحة الأمويين',
    'طريق المطار',
    'كفرسوسة',
    'المرجة وجسر فيكتوريا'
  ];

  // Apply filters
  const filteredHotels = damascusHotels.filter(hotel => {
    // Sub-category filter
    if (hotelFilter === '5star' && (hotel.hotelStars ?? 0) < 5) {
      return false;
    }
    if (hotelFilter === 'heritage') {
      const isHeritage = 
        hotel.area.includes('دمشق القديمة') || 
        hotel.title.includes('التراثي') || 
        hotel.title.includes('بيت') || 
        hotel.title.includes('دار');
      if (!isHeritage) return false;
    }
    if (hotelFilter === 'city') {
      const isHeritage = 
        hotel.area.includes('دمشق القديمة') || 
        hotel.title.includes('التراثي') || 
        hotel.title.includes('بيت') || 
        hotel.title.includes('دار');
      if (isHeritage) return false;
    }

    // Neighborhood filter
    if (selectedNeighborhood !== 'الكل' && !hotel.area.includes(selectedNeighborhood)) {
      return false;
    }

    // Search query
    if (hotelSearch.trim() !== '') {
      const q = hotelSearch.toLowerCase();
      const match = 
        hotel.title.toLowerCase().includes(q) ||
        hotel.area.toLowerCase().includes(q) ||
        hotel.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full animate-fadeIn">
      
      {/* Luxury Damascus Hotels Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-10 mb-8 border border-emerald-900/40 shadow-2xl">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>دليل فنادق دمشق المعتمدة 2026 • حجز فوري ومؤكد</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
            فنادق دمشق العريقة والفاخرة، <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-emerald-300 bg-clip-text text-transparent">
              أصالة الضيافة الشامية وراحة الـ 5 نجوم
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
            استكشف كافة فنادق دمشق العريقة؛ من قصور دمشق القديمة التراثية ببحراتها وأشجار النارنج، إلى أفخم الفنادق العالمية 5 نجوم في ساحة الأمويين والشارع الدبلوماسي، مع ضمان توفر الكهرباء والتكييف 24/7 دون انقطاع.
          </p>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs">
              <SunMedium className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-bold">كهرباء وتكييف 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs">
              <Coffee className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-bold">إفطار شامي ومفتوح</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="font-bold">حجز مؤكد 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs">
              <Star className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-bold">{damascusHotels.length} فندقاً معتمداً</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Filter Categories & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 space-y-4">
        
        {/* Top Category Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setHotelFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                hotelFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span>جميع فنادق دمشق ({damascusHotels.length})</span>
            </button>

            <button
              onClick={() => setHotelFilter('5star')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                hotelFilter === '5star'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>فنادق 5 نجوم الفاخرة</span>
            </button>

            <button
              onClick={() => setHotelFilter('heritage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                hotelFilter === 'heritage'
                  ? 'bg-emerald-800 text-white shadow-md font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>قصور وبيوت دمشق القديمة التراثية</span>
            </button>

            <button
              onClick={() => setHotelFilter('city')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                hotelFilter === 'city'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4 text-slate-600" />
              <span>فنادق وسط المدينة والتسوق</span>
            </button>
          </div>

          <div className="text-xs font-bold text-slate-500">
            عُثر على {filteredHotels.length} فندقاً
          </div>
        </div>

        {/* Search & Neighborhood Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100 items-center">
          
          {/* Quick Search */}
          <div className="md:col-span-7 relative">
            <input
              type="text"
              value={hotelSearch}
              onChange={(e) => setHotelSearch(e.target.value)}
              placeholder="ابحث باسم الفندق (شيراتون، فور سيزونز، بيت المملوكة، بلو تاور...)"
              className="w-full bg-slate-50 text-xs sm:text-sm rounded-xl py-2.5 pr-10 pl-4 border border-slate-200 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          {/* Neighborhood Pills Dropdown */}
          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              الحي:
            </span>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Hotels Listings Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <PropertyCard key={hotel.id} property={hotel} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
          <Hotel className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">لا توجد فنادق مطابقة لهذا الفلتر</h3>
          <p className="text-xs text-slate-500">جرب اختيار فئة أخرى أو إعادة تعيين البحث في أحياء دمشق.</p>
          <button
            onClick={() => {
              setHotelFilter('all');
              setHotelSearch('');
              setSelectedNeighborhood('الكل');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            عرض كافة فنادق دمشق
          </button>
        </div>
      )}

    </div>
  );
};
