import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Minus, Star, Zap, Waves, Coffee, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { 
    properties, 
    comparisonList, 
    removeFromComparison, 
    clearComparison, 
    isComparisonModalOpen, 
    setIsComparisonModalOpen, 
    formatPrice,
    setSelectedProperty,
    setIsBookingOpen
  } = useApp();

  if (!isComparisonModalOpen) return null;

  const comparedProperties = properties.filter(p => comparisonList.includes(p.id));

  const handleBookNow = (property: any) => {
    setSelectedProperty(property);
    setIsComparisonModalOpen(false);
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/60 to-teal-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">مقارنة الفنادق والعقارات</h2>
              <p className="text-xs text-slate-500">قارن بين خيارات الإقامة جنبًا إلى جنب لتختار الأنسب لك</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {comparedProperties.length > 0 && (
              <button 
                onClick={clearComparison}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح الكل</span>
              </button>
            )}
            <button 
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {comparedProperties.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Star className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-base font-bold text-slate-700">لم تختر أي فنادق للمقارنة بعد</p>
              <p className="text-xs text-slate-400 mt-1">انقر على أيقونة "مقارنة" في بطاقات الفنادق لتظهر هنا جنباً إلى جنب.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-400 w-44">المواصفات</th>
                    {comparedProperties.map(prop => (
                      <th key={prop.id} className="p-3 min-w-[240px] align-top">
                        <div className="relative group">
                          <img 
                            src={prop.images[0]} 
                            alt={prop.title} 
                            className="w-full h-36 object-cover rounded-2xl shadow-sm mb-3"
                          />
                          <button 
                            onClick={() => removeFromComparison(prop.id)}
                            className="absolute top-2 left-2 bg-slate-900/60 hover:bg-rose-600 text-white p-1.5 rounded-full backdrop-blur-sm transition"
                            title="إزالة من المقارنة"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{prop.area} • {prop.governorate}</p>
                          <div className="text-base font-black text-emerald-700 mt-1.5">
                            {formatPrice(prop.priceUsd)} <span className="text-xs font-normal text-slate-400">/ ليلة</span>
                          </div>
                          <button
                            onClick={() => handleBookNow(prop)}
                            className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1"
                          >
                            <span>احجز هذه الغرفة</span>
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  
                  {/* Category / Stars */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">تصنيف النجوم</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3 font-bold text-amber-500">
                        {p.hotelStars ? '★'.repeat(p.hotelStars) : 'إقامة سياحية خاصة'}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">تقييم النزلاء</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3">
                        <span className="inline-flex items-center gap-1 font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                          {p.rating} / 5 ({p.reviewCount} تقييم)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Free Breakfast */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">إفطار صباحي مجاني</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3">
                        {p.hasFreeBreakfast ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                            <Check className="w-4 h-4 text-emerald-600" /> مشمول مجاناً
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1"><Minus className="w-3 h-3" /> غير مشمول</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Electricity & Solar */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">الطاقة والتكييف 24/7</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3">
                        <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          {p.electricity.label}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Pool */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">المسبح والماء</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3">
                        {p.hasPool ? (
                          <span className="inline-flex items-center gap-1 text-cyan-600 font-semibold">
                            <Waves className="w-3.5 h-3.5" /> مسبح متاح {p.poolDetails?.isHeated ? '(مدفأ)' : ''}
                          </span>
                        ) : (
                          <span className="text-slate-400">لا يوجد مسبح</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Cancellation Policy */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">سياسة الإلغاء</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {p.freeCancellationDeadline || 'إلغاء مرن متاح'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Max Guests */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">السعة القصوى</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-3 font-bold text-slate-700">
                        حتى {p.maxGuests} ضيوف
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
