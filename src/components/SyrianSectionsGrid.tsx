import React from 'react';
import { useApp } from '../context/AppContext';
import { Hotel, Palmtree, Waves, Building2, ChevronLeft, MapPin, Sparkles, DollarSign } from 'lucide-react';
import { PropertyType } from '../types';

export const SyrianSectionsGrid: React.FC = () => {
  const { 
    selectedType, 
    setSelectedType, 
    setSelectedGovernorate, 
    properties,
    formatPrice,
    setActiveTab
  } = useApp();

  const hotelCount = properties.filter(p => p.type === 'hotel').length;
  const farmCount = properties.filter(p => p.type === 'farm' || p.type === 'villa').length;
  const chaletCount = properties.filter(p => p.type === 'chalet').length;
  const aptCount = properties.filter(p => p.type === 'apartment').length;

  const sections = [
    {
      id: 'hotel' as PropertyType,
      title: 'قسم الفنادق والأجنحة',
      subtitle: 'قصور دمشق القديمة التراثية وأفخم فنادق الـ 5 نجوم في سوريا',
      count: hotelCount,
      countLabel: 'فندق وقصر تراثي',
      priceRangeUsd: '$50 - $180',
      priceRangeSyp: '725,000 - 2,610,000 ل.س',
      areas: ['دمشق القديمة (باب توما والقيمرية)', 'ساحة الأمويين', 'شارع الصالحية', 'اللاذقية', 'حلب'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      icon: Hotel,
      badge: '5 نجوم وتراثي',
      color: 'from-amber-600 to-amber-800',
      accentBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      actionText: 'تصفح الفنادق'
    },
    {
      id: 'farm' as PropertyType,
      title: 'قسم المزارع والاستراحات',
      subtitle: 'مسابح خاصة معقمة، سواتر عائلية 100%، وطاقة شمسية ليثيوم 24/7',
      count: farmCount,
      countLabel: 'مزرعة واستراحة',
      priceRangeUsd: '$75 - $150',
      priceRangeSyp: '1,087,500 - 2,175,000 ل.س',
      dayUseNotice: 'سيران نهاري من $50 (~725 ألف ل.س)',
      areas: ['يعفور (طريق الصبورة)', 'صحنايا', 'غوطة دمشق (طريق المطار)', 'قرى الأسد'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      icon: Palmtree,
      badge: 'مسابح وسواتر خاصة',
      color: 'from-emerald-600 to-teal-800',
      accentBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      actionText: 'تصفح المزارع'
    },
    {
      id: 'chalet' as PropertyType,
      title: 'قسم الشاليهات والمصايف',
      subtitle: 'شاليهات بورتو طرطوس والشاطئ الأزرق وأكواخ بلودان ومشتى الحلو',
      count: chaletCount,
      countLabel: 'شاليه ومصيف',
      priceRangeUsd: '$45 - $95',
      priceRangeSyp: '652,500 - 1,377,500 ل.س',
      areas: ['بورتو طرطوس (الكورنيش الجديد)', 'الشاطئ الأزرق (اللاذقية)', 'بلودان المشرف', 'مشتى الحلو', 'جزيرة أرواد'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      icon: Waves,
      badge: 'بحر وجبال ساحرة',
      color: 'from-blue-600 to-cyan-800',
      accentBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
      actionText: 'تصفح الشاليهات'
    },
    {
      id: 'apartment' as PropertyType,
      title: 'قسم الشقق المفروشة',
      subtitle: 'شقق سياحية وعائلية VIP مفروشة بالكامل مع إنفرتر ومصاعد في أرقى الأحياء',
      count: aptCount,
      countLabel: 'شقة مفروشة VIP',
      priceRangeUsd: '$40 - $85',
      priceRangeSyp: '580,000 - 1,232,500 ل.س',
      areas: ['المالكي (عبد المنعم رياض)', 'أبو رمانة (الجاحظ)', 'المزة فيلات', 'كفرسوسة', 'باب توما', 'حلب الشهباء'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      icon: Building2,
      badge: 'أرقى أحياء المدن',
      color: 'from-indigo-600 to-slate-800',
      accentBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      actionText: 'تصفح الشقق'
    }
  ];

  const handleSelectSection = (typeId: PropertyType) => {
    setSelectedType(typeId);
    setSelectedGovernorate('الكل');
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>الأقسام الرئيسية الأربعة للتطبيق • تصفح فوري حسب طلبك</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            أقسام الإقامات والمناطق في سوريا
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            اختر القسم الذي يناسب وجهتك للاطلاع على صور واقعية والأسعار التقريبية بالدولار والليرة السورية
          </p>
        </div>

        {/* Currency reminder pill */}
        <div className="bg-slate-100 border border-slate-200/90 text-slate-700 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>الدفع معتمد حصراً: 🇸🇾 ليرة سورية & 💵 دولار أمريكي</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isSelected = selectedType === sec.id;
          return (
            <div
              key={sec.id}
              onClick={() => handleSelectSection(sec.id)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                isSelected 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl scale-[1.02]' 
                  : 'border-slate-200/90 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 bg-white'
              }`}
            >
              {/* Card Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-md border ${sec.accentBg}`}>
                    {sec.badge}
                  </span>
                </div>

                {/* Count Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-white/20">
                    {sec.count} {sec.countLabel}
                  </span>
                </div>

                {/* Icon & Title Overlay */}
                <div className="absolute bottom-3 right-3 left-3 z-10 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-base text-white tracking-tight leading-snug">
                      {sec.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-white">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {sec.subtitle}
                  </p>

                  {/* Areas highlight */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>أبرز المناطق المتاحة:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sec.areas.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Approximate Price Strip */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-[10px] font-bold text-slate-500 mb-0.5">الأسعار التقريبية:</div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-black text-emerald-900">{sec.priceRangeUsd} / ليلة</span>
                      <span className="text-[10px] font-extrabold text-emerald-700">(≈ {sec.priceRangeSyp})</span>
                    </div>
                    {sec.dayUseNotice && (
                      <div className="text-[10px] font-bold text-amber-700 mt-0.5">
                        {sec.dayUseNotice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  type="button"
                  className={`w-full py-2.5 px-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800'
                  }`}
                >
                  <span>{sec.actionText}</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
