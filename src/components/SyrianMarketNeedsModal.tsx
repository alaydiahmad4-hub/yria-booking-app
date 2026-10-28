import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  TrendingUp, 
  SunMedium, 
  Users, 
  Gift, 
  Car, 
  ShieldCheck, 
  Globe, 
  Building2, 
  Heart, 
  CheckCircle2, 
  Zap, 
  Coins, 
  Sparkles,
  MapPin,
  Clock,
  Coffee,
  HelpCircle
} from 'lucide-react';

export const SyrianMarketNeedsModal: React.FC = () => {
  const { isMarketStudyModalOpen, setIsMarketStudyModalOpen } = useApp();

  if (!isMarketStudyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md">
                  دراسة السوق 2026
                </span>
                <h3 className="font-black text-lg sm:text-xl text-white">
                  دراسة السوق السوري للضيافة والإقامات
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                رؤية هندسية وتطبيقية: كيف تجعل المنصة مفيدة للساكنين داخل سوريا وسهلة للمغتربين
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMarketStudyModalOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-right">
          
          {/* Executive Strategy Banner */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 p-5 rounded-3xl border border-emerald-200/80 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>الخلاصة الإستراتيجية</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              سوق ثنائي الأقطاب: حل أزمات الداخل المالية واللوجستية، وتوفير الأمان والبرّ للمغتربين
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              يتميز السوق السوري بوجود شريحتين متكاملتين: المقيم بالداخل الذي يعاني من تقنين الطاقة والسيولة النقدية ويبحث عن سيران نهاري مبهج أو إقامة قريبة من مراجعات العاصمة؛ والمغترب بالخارج الذي يملك القدرة المالية ويريد إهداء عائلته لحظات سعادة مدفوعة بالكامل أو تأمين إجازته الصيفية دون مفاجآت وسوء خدمات.
            </p>
          </div>

          {/* Two Pillars Grid: Inside Syria vs Expatriates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1: Residents Inside Syria */}
            <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  🇸🇾
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    احتياجات المقيمين داخل سوريا
                  </h4>
                  <p className="text-xs text-slate-500">حلول ملموسة للواقع المعيشي اليومي</p>
                </div>
              </div>

              <div className="space-y-3">
                
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <SunMedium className="w-4 h-4 text-amber-500" />
                    <span>ضمان الطاقة المستمرة 24/7 (أولوية قصوى)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    شفافية كاملة حول استطاعة منظومة الطاقة الشمسية والليثيوم، وضمان تشغيل المكيفات صيفاً والتدفئة شتاءً دون أي انقطاع أثناء التقنين.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>سيران نهاري عائلي ومسابح بسواتر خاصة (100% خصوصية)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    إمكانية حجز المزارع من 10 صباحاً لـ 8 مساءً مع مسابح معقمة وسواتر خشبية عالية تمنع الرؤية الخارجية، ومرافق باربيكيو متكاملة.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span>دفع محلي بالليرة السورية وميزة "القطة"</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    دعم فوري لسيريتل كاش، MTN كاش، وشركة الهرم والدفع عند الوصول، مع أداة تقسيم التكلفة (Split Bill) بين الأصدقاء والعائلات.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>إقامات المراجعات الطبية والمعاملات والسفارات</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    شقق مفروشة هادئة قريبة من مشافي دمشق (المواساة، الأسد، الشامي) والسفارات، مع مصاعد وطاقة 24/7 بأسعار محلية مدروسة.
                  </p>
                </div>

              </div>
            </div>

            {/* Pillar 2: Syrian Expatriates Abroad */}
            <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                  🌍
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    احتياجات المغتربين السوريين بالخارج
                  </h4>
                  <p className="text-xs text-slate-500">سهولة وموثوقية وخدمات VIP</p>
                </div>
              </div>

              <div className="space-y-3">
                
                <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Gift className="w-4 h-4 text-indigo-600" />
                    <span>باقة "إهداء الحجز للأهل في سوريا"</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    واجهة مخصصة للمغترب لحجز فيلا أو شاليه أو جناح فاخر لأهله كهدية، مع إضافة رسالة شخصية، وسلة ضيافة وفواكه شامية مجانية وتنسيق كامل نيابة عنه.
                  </p>
                </div>

                <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Car className="w-4 h-4 text-amber-600" />
                    <span>استقبال VIP وتوصيل من مطار دمشق أو بيروت/المصنع</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    تأمين سيارة حديثة مكيفة وسائق خاص موثوق لاستقبال المغترب وعائلته فور وصولهم مطار دمشق الدولي أو نقطة المصنع الحدودية وإيصالهم لباب الإقامة.
                  </p>
                </div>

                <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>ضمان الصور الواقعية 100% وحماية العربون (Escrow)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    القضاء على عمليات الاحتيال وإعلانات السوشيال ميديا الوهمية، عبر عربون أمانة محمي لا يُسلّم للمضيف إلا بعد تسجيل الدخول والتأكد من مطابقة المكان.
                  </p>
                </div>

                <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Globe className="w-4 h-4 text-cyan-600" />
                    <span>دفع موثوق بالدولار الأمريكي وتجميد السعر 24 ساعة</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    دعم كامل لويسترن يونيون، حوالات الهرم بالدولار، وحسابات بنك الراجحي وبنك دبي الإسلامي، مع ميزة تجميد السعر ضد تقلبات الصرف.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Golden 5 Product Sections Highlight */}
          <div className="space-y-4">
            <h4 className="font-black text-base text-slate-900">
              الأقسام الخمسة الأكثر طلباً في السوق السوري (المدرجة بالتطبيق):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <span>🎁</span>
                  <span>باقات المغتربين لإسعاد الأهل</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  إقامات مختارة بعناية للمغتربين لإهدائها للأهل مع ضيافة مجانية وتوصيل.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                  <span>🥩</span>
                  <span>سيران نهاري ومناسبات عائلية</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  مزارع بمسابح معقمة وسواتر خصوصية للجمعات العائلية من الصباح للمساء.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                  <span>🩺</span>
                  <span>إقامات المعاملات والمراجعات الطبية</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  شقق وأجنحة هادئة قريبة من المشافي والسفارات بدمشق مع كهرباء 24/7.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                  <span>💍</span>
                  <span>باقات العرسان وقصور دمشق التراثية</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  أجنحة ملكية في قصور دمشق القديمة مع بحرات رخامية وفطور في الإيوان.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                  <span>💻</span>
                  <span>إقامات العمل عن بعد والإنترنت فايبر</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  مجهزة بإنترنت سريع 50 ميغا وكهرباء مستمرة للمستشارين ورواد الأعمال.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
                  <span>🌊</span>
                  <span>شاليهات ومصايف البحر والجبل</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  بورتو طرطوس والشاطئ الأزرق ومصايف بلودان ومشتى الحلو بإطلالات ساحرة.
                </p>
              </div>

            </div>
          </div>

          {/* Currency and Operational Commitments */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                  ضمان العملة المعتمدة والشفافية التامة
                </h5>
                <p className="text-[11px] text-slate-600">
                  الدفع محصور حصراً بالليرة السورية 🇸🇾 والدولار الأمريكي 💵 بدون أي عملات افتراضية أو رسوم مخفية.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMarketStudyModalOpen(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              فهمت، تصفح الإقامات
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
