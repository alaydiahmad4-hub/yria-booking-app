import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  WifiOff, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  User, 
  Copy, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  FileText,
  Building,
  QrCode,
  Download,
  Share2
} from 'lucide-react';
import { SeyranBrandLogo } from './SeyranBrandLogo';

export const OfflineEmergencyModal: React.FC = () => {
  const { 
    isOfflineModalOpen, 
    setIsOfflineModalOpen, 
    offlineBookings, 
    properties,
    formatPrice,
    setLatestConfirmedBooking,
    setIsVoucherModalOpen
  } = useApp();

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'emergency' | 'guide'>('bookings');

  if (!isOfflineModalOpen) return null;

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const emergencyContacts = [
    {
      name: 'منظومة الإسعاف السريع (الهلال الأحمر العربي السوري)',
      number: '133',
      category: 'طبي وإسعاف',
      desc: 'خدمة مجانية على مدار 24 ساعة للحالات الطبية الطارئة في كافة المحافظات',
      color: 'border-rose-500 bg-rose-50/70 text-rose-900',
      badgeBg: 'bg-rose-500 text-white'
    },
    {
      name: 'شرطة النجدة والأمن السياحي السوري',
      number: '112',
      category: 'أمن وسلامة',
      desc: 'حماية وتأمين الزوار والنزلاء وحل النزاعات وتأمين الطرق',
      color: 'border-blue-500 bg-blue-50/70 text-blue-900',
      badgeBg: 'bg-blue-600 text-white'
    },
    {
      name: 'مكتب كونسيرج وطوارئ سيران سوريا 24/7',
      number: '+963933112233',
      displayNumber: '0933 112 233',
      category: 'خدمة سيران VIP',
      desc: 'دعم فوري مباشر وميداني لمتابعة حجزك وتأمين المحروقات أو نقل الأهل عند الطوارئ',
      color: 'border-emerald-500 bg-emerald-50/70 text-emerald-900',
      badgeBg: 'bg-emerald-600 text-white'
    },
    {
      name: 'طوارئ الكهرباء المركزية',
      number: '117',
      category: 'خدمات طاقة',
      desc: 'الإبلاغ عن انقطاعات كابلات الشبكة العامة أو طوارئ المحولات',
      color: 'border-amber-500 bg-amber-50/70 text-amber-900',
      badgeBg: 'bg-amber-500 text-slate-950'
    },
    {
      name: 'طوارئ مياه الشرب والري',
      number: '116',
      category: 'مياه وري',
      desc: 'مؤسسة المياه العامة لمتابعة خطوط التغذية الرئيسية',
      color: 'border-cyan-500 bg-cyan-50/70 text-cyan-900',
      badgeBg: 'bg-cyan-600 text-white'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={() => setIsOfflineModalOpen(false)}
            className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <WifiOff className="w-3.5 h-3.5" />
              <span>نظام الأوفلاين والطوارئ السوري (Offline Resilience)</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <span>سند الطوارئ والحجوزات المحفوظة</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            هذه البيانات مخزنة محلياً في ذاكرة جهازك وتعمل بكفاءة حتى عند انقطاع الإنترنت أو ضعف شبكة الجوال في المزارع والمصايف.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-4 bg-white/10 p-1 rounded-2xl max-w-md">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bookings' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              حجوزاتي المحفوظة ({offlineBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'emergency' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              أرقام الطوارئ السورية
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'guide' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              دليل الإقامة الأوفلاين
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* TAB 1: SAVED BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {offlineBookings.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 mb-3">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">لا توجد حجوزات محفوظة محلياً بعد</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    عند قيامك بأي حجز في سيران سوريا، يتم تخزين قسيمة الحجز ورمز الـ QR ورقم المضيف تلقائياً هنا لتتمكن من الوصول إليها دون الحاجة للإنترنت.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {offlineBookings.map((b, idx) => {
                    const prop = properties.find(p => p.id === b.propertyId);
                    const bookingCode = b.id || `#SYR-${1000 + idx}`;
                    return (
                      <div key={b.id || idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                              قسيمة جاهزة بدون إنترنت
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm">
                              {prop?.title || 'مكان إقامة سيران سوريا'}
                            </h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              {prop?.area} • {prop?.governorate}
                            </p>
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block font-mono">المرجع</span>
                            <span className="text-xs font-mono font-bold text-slate-800">{bookingCode}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
                          <div>
                            <span className="text-slate-400 block text-[10px]">النزيل:</span>
                            <span className="font-bold text-slate-800">{b.guestName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">الهاتف:</span>
                            <span className="font-bold text-slate-800 font-mono">{b.guestPhone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">الوصول:</span>
                            <span className="font-bold text-emerald-800">{b.checkIn}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">المغادرة:</span>
                            <span className="font-bold text-slate-800">{b.checkOut}</span>
                          </div>
                        </div>

                        {/* Host Phone & Quick Call */}
                        {prop?.host?.phone && (
                          <div className="flex items-center justify-between bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-xs">
                            <div className="flex items-center gap-2">
                              <PhoneCall className="w-4 h-4 text-emerald-700" />
                              <div>
                                <span className="font-bold text-slate-900 block">هاتف المضيف: {prop.host.name}</span>
                                <span className="text-[11px] text-slate-600 font-mono">{prop.host.phone}</span>
                              </div>
                            </div>
                            <a
                              href={`tel:${prop.host.phone}`}
                              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700 transition"
                            >
                              اتصال فوري
                            </a>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setLatestConfirmedBooking(b);
                              setIsOfflineModalOpen(false);
                              setIsVoucherModalOpen(true);
                            }}
                            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <QrCode className="w-4 h-4 text-emerald-600" />
                            <span>عرض بطاقة الـ QR والقسيمة</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMERGENCY CONTACTS */}
          {activeTab === 'emergency' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  يمكنك النقر مباشرة على زر <strong>«اتصال»</strong> لإجراء مكالمة هاتفية عادية فورية عبر شبكة الخليوي المحلية دون الحاجة لتوافر رصيد إنترنت.
                </p>
              </div>

              {emergencyContacts.map((contact, i) => (
                <div 
                  key={i} 
                  className={`border rounded-2xl p-4 transition-all hover:shadow-xs flex items-center justify-between gap-3 ${contact.color}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${contact.badgeBg}`}>
                        {contact.category}
                      </span>
                      <h4 className="font-black text-sm">{contact.name}</h4>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed">{contact.desc}</p>
                    <div className="font-mono font-bold text-base tracking-wider pt-1">
                      {contact.displayNumber || contact.number}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCopy(contact.number)}
                      className="p-2.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 shadow-2xs transition"
                      title="نسخ الرقم"
                    >
                      {copiedNumber === contact.number ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`tel:${contact.number}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>اتصال</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: OFFLINE GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  إرشادات استقرار الطاقة الشمسية في المزارع والفنادق
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed">
                  <li><strong>فترة الذروة الشمسية:</strong> بين الساعة 10:00 صباحاً و 04:00 عصراً، تكون الطاقة الشمسية في أقصى كفاءتها لتشغيل المكيفات والغسالات والمضخات دون استهلاك بطاريات الليثيوم.</li>
                  <li><strong>التشغيل الليلي:</strong> ليلاً تُنصح إدارة الاستهلاك على الإضاءة والتلفاز والمراوح وشواحن الأجهزة للحفاظ على شحن البطارية حتى الصباح التالي.</li>
                  <li><strong>المولدات الاحتياطية:</strong> معظم مزارع وفنادق سيران سوريا توفر مولدة احتياطية في حال الغيوم أو الأحمال الكبيرة. يمكن التنسيق مع ناطور المزرعة لتشغيلها.</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-600" />
                  التصرف في حال انقطاع تغطية شبكة المحمول (No Signal)
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed">
                  <li>احتفظ دائماً بصورة شاشة (Screenshot) لعنوان المزرعة وخريطة الطريق قبل مغادرة مركز المحافظة.</li>
                  <li>عند الوصول إلى المزرعة، اتصل بالشبكة المحلية للواي فاي المعتمدة على الفايبر أو راوتر الجيل الرابع المشحون مسبقاً.</li>
                  <li>في حال طارئ صحي لا قدر الله، اتصل مباشرة برقم 133 فهو يعمل على جميع شبكات الخليوي مجاناً حتى دون وجود رصيد مكالمات.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <SeyranBrandLogo variant="icon" size="sm" />
            <span className="font-bold text-slate-700">سيران سوريا — رفيقك الموثوق للإقامة والاصطياف</span>
          </div>
          <button
            onClick={() => setIsOfflineModalOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
