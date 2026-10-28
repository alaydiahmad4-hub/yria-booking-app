import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gift, 
  Users, 
  Building2, 
  Heart, 
  Wifi, 
  Sparkles, 
  ChevronLeft, 
  TrendingUp, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const SyrianMarketShowcase: React.FC = () => {
  const { 
    syrianSpecialCategory, 
    setSyrianSpecialCategory, 
    setIsMarketStudyModalOpen,
    properties,
    setSelectedGovernorate,
    setSelectedType
  } = useApp();

  const expatCount = properties.filter(p => p.specialSyrianFeatures?.isExpatFamilyGiftRecommended).length;
  const dayUseCount = properties.filter(p => p.rentalType === 'day_use' || p.rentalType === 'both' || p.specialSyrianFeatures?.isDayUseBbqIdeal).length;
  const medicalCount = properties.filter(p => p.specialSyrianFeatures?.isMedicalEmbassyNear || (p.governorate === 'دمشق' && (p.area.includes('المزة') || p.area.includes('الصالحية') || p.area.includes('الأمويين') || p.area.includes('أبو رمانة')))).length;
  const honeymoonCount = properties.filter(p => p.specialSyrianFeatures?.isHoneymoonSpecial || p.title.includes('التراثي') || p.title.includes('بيت') || p.hotelStars === 5).length;
  const remoteWorkCount = properties.filter(p => p.specialSyrianFeatures?.isRemoteWorkHub || (p.hasWifi && p.electricity.type === 'solar_24_7')).length;

  const marketPillars = [
    {
      id: 'expat_family' as const,
      title: 'باقات المغتربين لإسعاد الأهل',
      badge: 'خدمة المغتربين',
      desc: 'إقامات مهداة للأهل مع باقة ضيافة شامية وتوصيل VIP',
      count: expatCount || 18,
      icon: Gift,
      accent: 'from-amber-600 to-amber-700',
      pillBg: 'hover:border-amber-400 bg-amber-50/70 text-amber-900 border-amber-200'
    },
    {
      id: 'day_use' as const,
      title: 'سيران نهاري وجمعات عائلية',
      badge: '100% خصوصية عائلية',
      desc: 'مزارع بمسابح معقمة وسواتر خشبية وشواء من 10ص لـ 8م',
      count: dayUseCount || 12,
      icon: Users,
      accent: 'from-emerald-600 to-teal-700',
      pillBg: 'hover:border-emerald-400 bg-emerald-50/70 text-emerald-900 border-emerald-200'
    },
    {
      id: 'medical_embassy' as const,
      title: 'إقامات المعاملات والمراجعات الطبية',
      badge: 'دمشق المركزية',
      desc: 'أجنحة هادئة قرب المشافي والسفارات مع كهرباء ومصاعد 24/7',
      count: medicalCount || 16,
      icon: Building2,
      accent: 'from-blue-600 to-cyan-700',
      pillBg: 'hover:border-blue-400 bg-blue-50/70 text-blue-900 border-blue-200'
    },
    {
      id: 'honeymoon' as const,
      title: 'باقات العرسان وقصور دمشق التراثية',
      badge: 'رومانسية وأصالة',
      desc: 'أجنحة ملكية في قصور دمشق القديمة مع بحرات رخامية وياسمين',
      count: honeymoonCount || 15,
      icon: Heart,
      accent: 'from-rose-600 to-pink-700',
      pillBg: 'hover:border-rose-400 bg-rose-50/70 text-rose-900 border-rose-200'
    },
    {
      id: 'remote_work' as const,
      title: 'إقامات العمل عن بعد والإنترنت فايبر',
      badge: 'إنترنت 50 ميغا + طاقة 24/7',
      desc: 'مكاتب مجهزة وطاقة شمسية مستمرة للمستشارين ورواد الأعمال',
      count: remoteWorkCount || 20,
      icon: Wifi,
      accent: 'from-purple-600 to-indigo-700',
      pillBg: 'hover:border-purple-400 bg-purple-50/70 text-purple-900 border-purple-200'
    }
  ];

  const handleSelectPillar = (id: typeof syrianSpecialCategory) => {
    if (syrianSpecialCategory === id) {
      setSyrianSpecialCategory('all');
    } else {
      setSyrianSpecialCategory(id);
      setSelectedGovernorate('الكل');
      setSelectedType('all');
      const el = document.getElementById('properties-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
      {/* Header with Title and Market Study Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 border border-amber-400/40 text-amber-800 px-3 py-1 rounded-full text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>بناءً على دراسة السوق السوري الميدانية 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            أقسام تلبي احتياجات الأهالي بالداخل والمغتربين
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            تصنيفات مخصصة لحل أزمات الكهرباء، توفير سيران نهاري عائلي، وتسهيل إهداء الإقامات للأهل في سوريا من الخارج
          </p>
        </div>

        <button
          onClick={() => setIsMarketStudyModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>دراسة السوق واحتياجات المغتربين</span>
        </button>
      </div>

      {/* 5 Interactive Market Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {marketPillars.map((pillar) => {
          const Icon = pillar.icon;
          const isSelected = syrianSpecialCategory === pillar.id;

          return (
            <div
              key={pillar.id}
              onClick={() => handleSelectPillar(pillar.id)}
              className={`rounded-2xl p-4 border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {pillar.count} إقامة
                  </span>
                </div>

                <div className="text-[10px] font-black text-emerald-700 mb-1">
                  {pillar.badge}
                </div>

                <h3 className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={isSelected ? 'text-emerald-700' : 'text-slate-600'}>
                  {isSelected ? 'مفعل للتصفية' : 'تصفح الإقامات'}
                </span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                }`}>
                  {isSelected ? <Check className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Filter Notice */}
      {syrianSpecialCategory !== 'all' && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              عرض نتائج: {marketPillars.find(p => p.id === syrianSpecialCategory)?.title}
            </span>
          </div>
          <button
            onClick={() => setSyrianSpecialCategory('all')}
            className="text-emerald-700 hover:text-emerald-900 font-black underline cursor-pointer"
          >
            إلغاء التصفية وعرض الكل
          </button>
        </div>
      )}
    </div>
  );
};
