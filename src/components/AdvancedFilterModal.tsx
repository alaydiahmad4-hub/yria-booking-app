import React from 'react';
import { useApp } from '../context/AppContext';
import { X, SlidersHorizontal, SunMedium, Waves, Zap, Users, Music, Flame, RotateCcw } from 'lucide-react';

export const AdvancedFilterModal: React.FC = () => {
  const { 
    isAdvancedFilterOpen, 
    setIsAdvancedFilterOpen, 
    advancedFilters, 
    setAdvancedFilters,
    currency,
    formatPrice 
  } = useApp();

  if (!isAdvancedFilterOpen) return null;

  const handleReset = () => {
    setAdvancedFilters({
      minPrice: 0,
      maxPrice: 300,
      rentalType: 'all',
      familiesOnly: false,
      partiesAllowed: false,
      heatedPool: false,
      poolPrivacy: false,
      instantBookingOnly: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">فلاتر متقدمة وشاملة</h3>
          </div>
          <button
            onClick={() => setIsAdvancedFilterOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Price Range */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">نطاق السعر لكل ليلة</h4>
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>الحد الأدنى: {formatPrice(advancedFilters.minPrice)}</span>
                <span className="text-emerald-700">الحد الأقصى: {formatPrice(advancedFilters.maxPrice)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={advancedFilters.maxPrice}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Rental Type: Day-use vs Overnight */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">نوع الحجز والإقامة</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'day_use', label: 'سيران نهاري (10ص - 8م)' },
                { id: 'overnight', label: 'مبيت كامل 24 ساعة' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAdvancedFilters(prev => ({ ...prev, rentalType: opt.id as any }))}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                    advancedFilters.rentalType === opt.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Booking (Airbnb Best Practice) */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">حجز فوري ومباشر (Instant Book)</div>
                <div className="text-[11px] text-slate-600">عقارات يمكنك تثبيت حجزها فوراً دون انتظار رد المضيف</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={advancedFilters.instantBookingOnly}
              onChange={(e) => setAdvancedFilters(prev => ({ ...prev, instantBookingOnly: e.target.checked }))}
              className="w-5 h-5 accent-emerald-600 cursor-pointer rounded"
            />
          </div>

          {/* House Rules & Social Suitability */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5">قوانين المكان والمناسبات</h4>
            <div className="space-y-2">
              
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <Users className="w-4 h-4 text-emerald-600" />
                  مخصص للعائلات فقط (أمان وهدوء)
                </span>
                <input
                  type="checkbox"
                  checked={advancedFilters.familiesOnly}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, familiesOnly: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <Music className="w-4 h-4 text-purple-600" />
                  مسموح إقامة الحفلات وأعياد الميلاد وتجمعات الأصدقاء
                </span>
                <input
                  type="checkbox"
                  checked={advancedFilters.partiesAllowed}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, partiesAllowed: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </label>

            </div>
          </div>

          {/* Swimming Pool Special Features */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5">مواصفات المسبح والخصوصية</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Waves className="w-4 h-4 text-cyan-600" />
                  سواتر خصوصية عائلية 100%
                </span>
                <input
                  type="checkbox"
                  checked={advancedFilters.poolPrivacy}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, poolPrivacy: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Flame className="w-4 h-4 text-orange-600" />
                  مسبح مدفأ للسباحة شتاءً
                </span>
                <input
                  type="checkbox"
                  checked={advancedFilters.heatedPool}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, heatedPool: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </label>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>

          <button
            onClick={() => setIsAdvancedFilterOpen(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
          >
            تطبيق الفلاتر وعرض النتائج
          </button>
        </div>

      </div>
    </div>
  );
};
