import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  SunMedium, 
  Droplets, 
  Sparkles, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  FileCheck2,
  Award
} from 'lucide-react';
import { SeyranBrandLogo } from './SeyranBrandLogo';

export const BrandHeritageModal: React.FC = () => {
  const { isBrandHeritageModalOpen, setIsBrandHeritageModalOpen } = useApp();

  if (!isBrandHeritageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-emerald-100 flex flex-col">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />

          <button
            onClick={() => setIsBrandHeritageModalOpen(false)}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center relative z-10">
            <SeyranBrandLogo variant="emblem" size="lg" showText={false} className="mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300">
              ميثاق سيران سوريا للضيافة الفاخرة
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-md font-medium">
              الجمع بين كرم الضيافة الشامية الأصيلة وأعلى معايير الأمان والحجز الرقمي المعتمد عالمياً.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[60vh]">
          
          {/* Brand Philosophy */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>لماذا أطلقنا اسم "سيران سوريا"؟</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/85 leading-relaxed">
              "السيران" في التراث السوري العريق هو رحلة الانطلاق إلى الطبيعة الخلابة وبساتين الغوطة وربوع بلودان وشواطئ طرطوس برفقة الأهل والأحباب لتناول المشاوي والاستجمام. أعدنا إحياء هذه التجربة بأحدث تقنيات الحجوزات السحابية ليصبح الحجز آمناً، سهلاً، ومضموناً لكل عائلة في الداخل ولكل مغترب سوري حول العالم.
            </p>
          </div>

          {/* 4 Pillars of Syrian Security */}
          <div>
            <h4 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>أركان الأمان الأربعة في سيران سوريا:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Pillar 1: Solar Power */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                  <SunMedium className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">طاقة شمسية 24/7 موثقة</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    فحص ميداني حقيقي لبطاريات الليثيوم والإنفرتر لضمان تشغيل المكيفات والمضخات طوال فترة إقامتك بدون انقطاع.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Water Reserve */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-600 rounded-xl">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">أمن المياه والمسابح المعقمة</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    خزانات مياه احتياطية ضخمة ومسابح مفلترة دورياً مع كلور أوتوماتيكي وسواتر خصوصية عائلية تامة.
                  </p>
                </div>
              </div>

              {/* Pillar 3: 25% Escrow Protection */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">حماية العربون 25% (Escrow)</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    لا يتم تسليم العربون للمضيف إلا بعد استلامك للعقار والتأكد التام من مطابقته للمواصفات المعروضة في التطبيق.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Diaspora Friendly */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">بوابة دفع المغتربين</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    دعم كامل للتحويلات بالدولار الأمريكي (USD) عبر الهرم وويسترن يونيون، والحسابات البنكية المباشرة، وبالليرة السورية محلياً.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quality Seal */}
          <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-xs">ختم التوثيق الميداني المعتمد</h5>
                <p className="text-[11px] text-emerald-200">
                  كافة العقارات المضافة خاضعة للتصوير والمعاينة الفعلية من فريق سيران في دمشق والمحافظات.
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-800 text-emerald-200 font-bold px-2.5 py-1 rounded-full border border-emerald-700 whitespace-nowrap">
              شهادة 2026
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            سيران سوريا • سجل رقم 10484 دمشق
          </div>
          <button
            onClick={() => setIsBrandHeritageModalOpen(false)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-800/20"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
