import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Users, 
  Calculator, 
  Copy, 
  Check, 
  MessageCircle, 
  Sparkles, 
  Share2, 
  Coins, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SYP_PER_USD } from '../data/mockData';

export const SplitBillModal: React.FC = () => {
  const { 
    isSplitPayModalOpen, 
    setIsSplitPayModalOpen, 
    splitPayProperty, 
    formatPrice,
    currency,
    setIsBookingOpen,
    setSelectedProperty
  } = useApp();

  const [peopleCount, setPeopleCount] = useState<number>(6);
  const [nightsCount, setNightsCount] = useState<number>(1);
  const [includeFoodBudget, setIncludeFoodBudget] = useState<boolean>(true);
  const [foodBudgetPerPersonUsd, setFoodBudgetPerPersonUsd] = useState<number>(8); // e.g. $8 for meat BBQ & appetizers
  const [copiedText, setCopiedText] = useState(false);

  if (!isSplitPayModalOpen || !splitPayProperty) return null;

  // Calculation
  const rentTotalUsd = splitPayProperty.priceUsd * nightsCount;
  const foodTotalUsd = includeFoodBudget ? foodBudgetPerPersonUsd * peopleCount : 0;
  const grandTotalUsd = rentTotalUsd + foodTotalUsd;

  const perPersonUsd = Math.round((grandTotalUsd / peopleCount) * 10) / 10;
  const perPersonSyp = Math.round((perPersonUsd * SYP_PER_USD) / 1000) * 1000;

  // Formatted message for WhatsApp
  const generateWhatsAppMessage = () => {
    return `🏕️ *دعوة سيران شبابنا / عيلتنا إلى ${splitPayProperty.title}* 🏕️
📍 المكان: ${splitPayProperty.area} (${splitPayProperty.governorate})
⏱️ المدة: ${nightsCount} ${nightsCount === 1 ? 'يوم/ليلة' : 'ليالٍ'}
👥 عدد الأشخاص: ${peopleCount} أشخاص
⚡ الكهرباء: ${splitPayProperty.electricity.label}
🏊 المسبح: ${splitPayProperty.hasPool ? 'مسبح خاص معقم' : 'غير متوفر'}

💰 *تفاصيل القطة وحصة كل شخص:*
💵 إجمالي إيجار المزرعة: $${rentTotalUsd} (${(rentTotalUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)
${includeFoodBudget ? `🍖 تقدير المشاوي والمشروبات: $${foodTotalUsd} (${(foodTotalUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)\n` : ''}
🔥 *حصة كل شخص الصافية:*
👉 *$${perPersonUsd} دولار* فقط أو *${perPersonSyp.toLocaleString('ar-SY')} ل.س*!

مين معنا لنثبت الحجز قبل ما تروح؟ 🙋‍♂️
📲 رابط الحجز المباشر عبر منصة سيران سوريا:
https://seyransyria.com/p/${splitPayProperty.id}`;
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleProceedToBooking = () => {
    setSelectedProperty(splitPayProperty);
    setIsSplitPayModalOpen(false);
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-emerald-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white p-6 relative">
          <button
            onClick={() => setIsSplitPayModalOpen(false)}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <span className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-400/30 text-emerald-300">
              <Calculator className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              حاسبة القطة وتقسيم التكلفة • Group Split
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            احسب قطة السيران مع الأصدقاء
          </h2>
          <p className="text-xs text-emerald-100/80 mt-1 line-clamp-1">
            {splitPayProperty.title}
          </p>
        </div>

        {/* Calculator Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Inputs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Number of People */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>عدد المشاركين (القطة):</span>
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPeopleCount(Math.max(2, peopleCount - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 active:scale-95 text-lg"
                >
                  -
                </button>
                <span className="text-lg font-black text-slate-900">
                  {peopleCount} أشخاص
                </span>
                <button
                  type="button"
                  onClick={() => setPeopleCount(Math.min(30, peopleCount + 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 active:scale-95 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Number of Nights */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>المدة (ليالٍ / أيام):</span>
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 active:scale-95 text-lg"
                >
                  -
                </button>
                <span className="text-lg font-black text-slate-900">
                  {nightsCount} {nightsCount === 1 ? 'يوم' : 'ليالٍ'}
                </span>
                <button
                  type="button"
                  onClick={() => setNightsCount(Math.min(14, nightsCount + 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 active:scale-95 text-lg"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Optional BBQ / Food Budget Toggle */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFoodBudget}
                  onChange={(e) => setIncludeFoodBudget(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-emerald-900">
                  إضافة ميزانية المشاوي والضيافة إلى القطة
                </span>
              </label>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                ${foodTotalUsd} إجمالي الأكل
              </span>
            </div>
            {includeFoodBudget && (
              <div className="text-xs text-slate-600 flex items-center justify-between mt-2 pt-2 border-t border-emerald-200/50">
                <span>معدل تكلفة الأكل للشخص الواحد:</span>
                <span className="font-bold text-slate-900">${foodBudgetPerPersonUsd} (~{(foodBudgetPerPersonUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)</span>
              </div>
            )}
          </div>

          {/* Grand Per-Person Highlight Box */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-1">
              حصة الفرد الواحد من السيران
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 my-2">
              ${perPersonUsd} <span className="text-base font-normal text-white">/ للشخص</span>
            </div>
            <div className="text-sm font-bold text-emerald-100">
              تعادل تقريباً: {perPersonSyp.toLocaleString('ar-SY')} ليرة سورية
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around text-xs text-slate-300">
              <div>
                <span className="block text-slate-400">إجمالي الحجز</span>
                <span className="font-bold text-white">${grandTotalUsd}</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div>
                <span className="block text-slate-400">عدد الأفراد</span>
                <span className="font-bold text-white">{peopleCount} أشخاص</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div>
                <span className="block text-slate-400">الضمانة</span>
                <span className="font-bold text-emerald-300">عربون 25% فقط</span>
              </div>
            </div>
          </div>

          {/* Social Share & WhatsApp Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShareWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>إرسال دعوة القطة إلى غروب الواتساب فوراً</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">تم نسخ نص القطة! جاهز للصق</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ نص الدعوة والأسعار لمشاركتها يدوياً</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Booking Link */}
          <div className="pt-2">
            <button
              onClick={handleProceedToBooking}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
            >
              <span>متابعة تثبيت الحجز باسم المجموعة الآن</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
