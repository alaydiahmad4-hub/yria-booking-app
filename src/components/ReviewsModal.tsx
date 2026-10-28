import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, CheckCircle, ShieldCheck, UserCheck } from 'lucide-react';

export const ReviewsModal: React.FC = () => {
  const { selectedProperty, isReviewsModalOpen, setIsReviewsModalOpen } = useApp();

  if (!isReviewsModalOpen || !selectedProperty) return null;

  const breakdown = selectedProperty.ratingBreakdown || {
    cleanliness: 4.9,
    accuracy: 4.9,
    electricity: 4.9,
    host: 5.0,
    value: 4.8
  };

  const sampleReviews = [
    {
      name: 'م. أحمد البيطار',
      date: 'سبتمبر 2026',
      avatar: 'أ',
      rating: 5,
      comment: 'تجربة استثنائية جداً! المزرعة أنظف مما توقعنا، والمسبح معقم والماء نقي. والأهم أن الطاقة الشمسية لم تنقطع دقيقة واحدة والمكيفات كانت شغالة طول فترة إقامتنا.',
      stayType: 'سيران عائلي'
    },
    {
      name: 'د. ليلى خوري (مغتربة من دبي)',
      date: 'أغسطس 2026',
      avatar: 'ل',
      rating: 5,
      comment: 'حجزت المكان لعائلتي خلال زيارتي لدمشق. التواصل مع المضيف كان ممتاز وسلس جداً، السواتر أعطتنا راحة تامة، ودفعنا جزء عبر سيريتل كاش والباقي عند الوصول.',
      stayType: 'إقامة 4 ليالٍ'
    },
    {
      name: 'وسيم الحلبي',
      date: 'يوليو 2026',
      avatar: 'و',
      rating: 4.8,
      comment: 'مكان رائع وهادئ ومناسب للاسترخاء والباربيكيو. الإنترنت كان سريع والمطبخ متكامل بجميع أدواته.',
      stayType: 'سيران نهاري'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-slate-900 text-lg">
              تقييمات الضيوف ({selectedProperty.rating} من 5)
            </h3>
            <span className="text-xs text-slate-500 font-medium">({selectedProperty.reviewCount} تقييم موثق)</span>
          </div>
          <button
            onClick={() => setIsReviewsModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Criteria Breakdown Grid (Airbnb Style) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              تفاصيل التقييم وفق معايير الجودة العالمية
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>النظافة والتعقيم</span>
                  <span className="font-bold">{breakdown.cleanliness}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(breakdown.cleanliness / 5) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>مطابقة الواقع للصور</span>
                  <span className="font-bold">{breakdown.accuracy}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(breakdown.accuracy / 5) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>استقرار الطاقة والكهرباء 24/7</span>
                  <span className="font-bold">{breakdown.electricity}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(breakdown.electricity / 5) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>تعامل المضيف وسرعة الرد</span>
                  <span className="font-bold">{breakdown.host}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(breakdown.host / 5) * 100}%` }}></div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>القيمة والخدمات مقابل السعر المدفوع</span>
                  <span className="font-bold">{breakdown.value}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(breakdown.value / 5) * 100}%` }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Guest Reviews List */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">آراء المستأجرين الحقيقيين</h4>
            {sampleReviews.map((rev, i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{rev.name}</div>
                      <div className="text-[11px] text-slate-400">{rev.date} • {rev.stayType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/40">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
