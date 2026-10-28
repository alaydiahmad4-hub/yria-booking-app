import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Coffee, 
  Clock, 
  ShieldCheck, 
  Gift, 
  Star,
  ChevronRight,
  Zap
} from 'lucide-react';
import { GeniusTier } from '../types';

export const GeniusLoyaltyModal: React.FC = () => {
  const { 
    isGeniusModalOpen, 
    setIsGeniusModalOpen, 
    geniusTier, 
    setGeniusTier 
  } = useApp();

  if (!isGeniusModalOpen) return null;

  const tiersData = [
    {
      level: 1 as GeniusTier,
      name: 'Genius المستوى 1',
      badge: 'برونزي معتمد',
      discount: '10% خصم فوري',
      requiredStays: '2 حجوزات',
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-800',
      perks: [
        'خصم 10% على مئات المزارع والشاليهات في يعفور وطرطوس',
        'تأكيد حجز سريع مع المضيفين الموثوقين',
        'دعم عبر الواتساب على مدار الساعة'
      ]
    },
    {
      level: 2 as GeniusTier,
      name: 'Genius المستوى 2',
      badge: 'فضي مميز (مستواك الحالي)',
      discount: '15% خصم فوري',
      requiredStays: '5 حجوزات',
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800',
      perks: [
        'خصم 15% على العقارات المميزة المؤهلة',
        'تسجيل وصول مبكر مجاني (دخول الساعة 12:00 ظهراً)',
        'إفطار دمشقي مجاني أو ضيافة ترحيبية في الفنادق المشاركة',
        'أولوية حجز مزارع الأعياد وعطلات نهاية الأسبوع'
      ]
    },
    {
      level: 3 as GeniusTier,
      name: 'Genius المستوى 3 VIP',
      badge: 'ذهبي نخبوي',
      discount: '20% خصم نخبوي',
      requiredStays: '10 حجوزات',
      color: 'from-emerald-600 to-teal-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-800',
      perks: [
        'خصم يصل حتى 20% على أفخم الفلل والقصور السورية',
        'ترقية مجانية للغرفة أو الجناح عند التوفر',
        'توصيل مجاني أو خصم 50% على سيارة الاستقبال VIP من المطار أو الحدود',
        'سلة فواكه وحلويات شامية فاخرة عند الاستلام',
        'خط تواصل مباشر مع مدير المنصة لخدمة كبار الشخصيات'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-blue-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={() => setIsGeniusModalOpen(false)}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30 text-blue-300">
              <Crown className="w-6 h-6 text-amber-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              برنامج الولاء العالمي • Seyran Genius VIP
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mt-1">
            سيران Genius: خصومات ومكافآت مدى الحياة
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/90 mt-1 max-w-lg">
            مستوحى من نظام Genius العالمي من Booking.com لتقديم خصومات حصرية وضيافة استثنائية لمسافري سوريا ومغتربيها.
          </p>

          {/* Current Tier Pill */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold text-white">
              أنت حالياً في: المستوى {geniusTier} Genius
            </span>
          </div>
        </div>

        {/* Tiers List */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            اختر المستوى لتجربة الميزات والخصومات المطبقة:
          </div>

          <div className="space-y-4">
            {tiersData.map((tier) => {
              const isActive = geniusTier === tier.level;
              return (
                <div
                  key={tier.level}
                  onClick={() => setGeniusTier(tier.level)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    isActive 
                      ? `${tier.bgColor} ${tier.borderColor} shadow-md ring-2 ring-blue-500/30` 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tier.color} text-white flex items-center justify-center font-black text-sm shadow-sm`}>
                        {tier.level}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                          <span>{tier.name}</span>
                          {isActive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                              مفعّل الآن
                            </span>
                          )}
                        </h4>
                        <span className="text-xs font-medium text-slate-500">
                          {tier.requiredStays} لإلغاء القفل
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm sm:text-base text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                        {tier.discount}
                      </span>
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60">
                    {tier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{perk}</span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-800">ميزة دائمة: </span>
            لا تنتهي صلاحية مستويات Genius أبداً بمجرد فتحها.
          </div>

          <button
            onClick={() => setIsGeniusModalOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
          >
            تم، تطبيق الخصومات
          </button>
        </div>

      </div>
    </div>
  );
};
