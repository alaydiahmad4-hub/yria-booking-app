import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property, RoomOption } from '../types';
import { SYP_PER_USD } from '../data/mockData';
import { 
  Building2, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Users, 
  Phone, 
  MessageCircle, 
  PlusCircle, 
  Eye, 
  SunMedium, 
  Waves, 
  Zap, 
  Wallet, 
  Check, 
  X, 
  ShieldCheck, 
  ArrowUpRight, 
  Edit3, 
  Trash2, 
  Smartphone,
  BedDouble,
  Sparkles,
  ArrowRight,
  Filter,
  FileText
} from 'lucide-react';

export const HostPortalPage: React.FC = () => {
  const { 
    properties, 
    bookings, 
    currency, 
    formatPrice, 
    setIsAddPropertyOpen, 
    setSelectedProperty,
    updatePropertyAvailability,
    updatePropertyPrice,
    deletePropertyLocal,
    setActiveTab,
    addNotification,
    sypExchangeRate
  } = useApp();

  const [activeHostTab, setActiveHostTab] = useState<'overview' | 'listings' | 'bookings' | 'wallet'>('overview');
  const [selectedHostId, setSelectedHostId] = useState<string>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceUsd, setTempPriceUsd] = useState<number>(100);
  const [payoutRequested, setPayoutRequested] = useState<boolean>(false);
  const [payoutMethod, setPayoutMethod] = useState<'syriatel' | 'sham' | 'alharam'>('syriatel');
  const [payoutPhone, setPayoutPhone] = useState<string>('0933456789');

  // Filter properties owned by this demo host
  const hostProperties = properties;

  // Calculate Host Financials
  const totalBookingsCount = bookings.length > 0 ? bookings.length : 12;
  const totalRevenueUsd = bookings.reduce((sum, b) => sum + (b.totalPriceUsd || 0), 0) || 2850;
  const totalRevenueSyp = Math.round(totalRevenueUsd * (sypExchangeRate || 14800));
  const availableBalanceUsd = Math.round(totalRevenueUsd * 0.85);
  const availableBalanceSyp = Math.round(availableBalanceUsd * (sypExchangeRate || 14800));

  const handleSavePrice = (propId: string) => {
    updatePropertyPrice(propId, tempPriceUsd);
    setEditingPriceId(null);
    addNotification({
      title: '💵 تحديث سعر الإقامة',
      message: `تم تحديث سعر الليلة بنجاح إلى $${tempPriceUsd} (~${(tempPriceUsd * (sypExchangeRate || 14800)).toLocaleString()} ل.س).`,
      type: 'system'
    });
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutRequested(true);
    addNotification({
      title: '💳 طلب سحب الأرباح',
      message: `تم استلام طلب تحويل رصيدك بقيمة $${availableBalanceUsd} (~${availableBalanceSyp.toLocaleString()} ل.س) عبر ${
        payoutMethod === 'syriatel' ? 'سيريتل كاش' : payoutMethod === 'sham' ? 'شام كاش' : 'شركة الهرم'
      } إلى الرقم ${payoutPhone}.`,
      type: 'system'
    });
    setTimeout(() => setPayoutRequested(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fadeIn text-right" dir="rtl">
      
      {/* Top Welcome & Navigation Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-800/40 relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>لوحة تحكم المضيفين المعتمدة</span>
              </span>
              <span className="text-emerald-300 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>حساب موثق ومطابق للمواصفات السورية</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              أهلاً بك في بوابة إدارة المنشآت والفنادق
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
              تابع حجوزات زوارك من المغتربين والداخل السوري، حدّث الأسعار بالدولار والليرة السورية، وتحكم في تقويم التوافر والطاقة الشمسية 24/7.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsAddPropertyOpen(true)}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة منشأة أو غرف جديدة</span>
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-white/20"
            >
              <span>معاينة كزائر</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 overflow-x-auto pb-1 text-xs font-bold">
          <button
            onClick={() => setActiveHostTab('overview')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeHostTab === 'overview'
                ? 'bg-white text-emerald-950 font-black shadow-md'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>نظرة عامة وإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveHostTab('listings')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeHostTab === 'listings'
                ? 'bg-white text-emerald-950 font-black shadow-md'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>عقاراتي والغرف ({hostProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveHostTab('bookings')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap relative ${
              activeHostTab === 'bookings'
                ? 'bg-white text-emerald-950 font-black shadow-md'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>الحجوزات الواردة</span>
            {bookings.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveHostTab('wallet')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeHostTab === 'wallet'
                ? 'bg-white text-emerald-950 font-black shadow-md'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>المحفظة واستلام الأرباح</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: OVERVIEW & PERFORMANCE */}
      {activeHostTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Revenue USD */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500">إجمالي الأرباح بالدولار</span>
                <h3 className="text-2xl font-black text-emerald-700 mt-1">${totalRevenueUsd.toLocaleString()}</h3>
                <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">
                  ~{(totalRevenueUsd * (sypExchangeRate || 14800)).toLocaleString()} ل.س
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            {/* Card 2: Bookings Count */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500">الحجوزات المؤكدة</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{totalBookingsCount} حجز</h3>
                <span className="text-[11px] font-bold text-emerald-600 mt-0.5 block flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+18% هذا الشهر</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Occupancy Rate */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500">نسبة الإشغال الحالية</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">84%</h3>
                <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">
                  عطلة نهاية الأسبوع مكتملة
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Card 4: Guest Rating */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500">تقييم النزلاء العام</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">4.92 / 5.0</h3>
                <span className="text-[11px] font-bold text-emerald-600 mt-0.5 block">
                  شارة المضيف المتميز (Superhost)
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Quick Actions & Energy Status Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Energy Infrastructure Banner */}
            <div className="lg:col-span-2 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl p-6 border border-emerald-200/80 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Zap className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    ضمان الطاقة الشمسية والكهرباء 24/7 للمنشآت
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    منصتنا تعطي أولوية الظهور للمنشآت التي توفر طاقة شمسية ليثيوم أو مولدات تعمل باستمرار لتشغيل المكيفات والمضخات. جميع عقاراتك موثقة حالياً مع وسم "طاقة 24/7".
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-xs font-bold">
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-emerald-800 flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>طاقة شمسية مستقرة</span>
                    </span>
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-teal-800 flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>إنترنت فايبر وتغطية سيريتل/MTN</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Balance Payout Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500">الرصيد المتاح للسحب الفوري</span>
                <h3 className="text-2xl font-black text-emerald-800 mt-1">
                  ${availableBalanceUsd.toLocaleString()}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  يعادل تقريباً {availableBalanceSyp.toLocaleString()} ليرة سورية
                </p>
              </div>

              <button
                onClick={() => setActiveHostTab('wallet')}
                className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-700/20"
              >
                <Wallet className="w-4 h-4" />
                <span>طلب سحب نقدي (سيريتل كاش / شام كاش)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: MY LISTINGS & ROOM INVENTORY */}
      {activeHostTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-black text-slate-900">عقاراتي وقائمة الغرف المسجلة</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                يمكنك تبديل حالة التوفر، تعديل الأسعار بالدولار والليرة، أو حظر أيام معينة في التقويم.
              </p>
            </div>
            <button
              onClick={() => setIsAddPropertyOpen(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة عقار جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostProperties.map((prop) => {
              const isEditing = editingPriceId === prop.id;

              return (
                <div 
                  key={prop.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Property Cover Image & Badges */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-xl">
                          {prop.governorate} • {prop.area}
                        </span>
                        {prop.electricity.type === 'solar_24_7' && (
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-xl flex items-center gap-1 shadow-xs">
                            <SunMedium className="w-3 h-3 text-amber-300" />
                            <span>طاقة 24/7</span>
                          </span>
                        )}
                      </div>

                      {/* Instant Booking Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                          {prop.type === 'hotel' ? '🏨 فندق معتمد' :
                           prop.type === 'farm' ? '🏡 مزرعة خاصة' :
                           prop.type === 'chalet' ? '🏖️ شاليه سياحي' : '🏢 شقة مفروشة'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{prop.description}</p>
                      </div>

                      {/* Pricing Block with Fast Edit */}
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-slate-500">سعر الليلة:</span>
                          {isEditing ? (
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="number"
                                value={tempPriceUsd}
                                onChange={(e) => setTempPriceUsd(Number(e.target.value))}
                                className="w-20 px-2 py-1 rounded-lg border border-emerald-400 text-xs font-black text-slate-900"
                              />
                              <button
                                onClick={() => handleSavePrice(prop.id)}
                                className="bg-emerald-600 text-white p-1 rounded-lg hover:bg-emerald-700"
                                title="حفظ السعر"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="bg-slate-200 text-slate-700 p-1 rounded-lg hover:bg-slate-300"
                                title="إلغاء"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-black text-emerald-800">
                                ${prop.priceUsd} <span className="text-[10px] font-normal text-slate-500">/ ليلة</span>
                              </span>
                              <span className="text-[10px] text-slate-400">
                                (~{(prop.priceUsd * (sypExchangeRate || 14800)).toLocaleString()} ل.س)
                              </span>
                              <button
                                onClick={() => {
                                  setEditingPriceId(prop.id);
                                  setTempPriceUsd(prop.priceUsd);
                                }}
                                className="text-slate-400 hover:text-emerald-700 p-0.5"
                                title="تعديل السعر"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Fast Availability Toggle */}
                        <div className="text-left">
                          <button
                            onClick={() => updatePropertyAvailability(prop.id, !prop.instantBooking)}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-xl transition-all border ${
                              prop.instantBooking
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border-rose-300'
                            }`}
                          >
                            {prop.instantBooking ? 'جاهز للحجز' : 'مغلق مؤقتاً'}
                          </button>
                        </div>
                      </div>

                      {/* Multi-rooms indicator if available */}
                      {prop.roomOptions && prop.roomOptions.length > 0 && (
                        <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 pt-1">
                          <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
                          <span>يحتوي على {prop.roomOptions.length} فئات من الغرف والأجنحة</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة صفحة العقار</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`هل أنت متأكد من حذف عقار "${prop.title}"؟`)) {
                          deletePropertyLocal(prop.id);
                          addNotification({
                            title: '🗑️ حذف العقار',
                            message: `تم حذف العقار "${prop.title}" بنجاح.`,
                            type: 'system'
                          });
                        }
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="حذف العقار"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: INCOMING GUEST BOOKINGS */}
      {activeHostTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-black text-slate-900">سجل حجوزات النزلاء الواردة</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                تأكيد طلبات الحجز والتواصل المباشر مع النزيل عبر واتساب.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              إجمالي الحجوزات: {bookings.length}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto my-6 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">لا توجد حجوزات واردة جديدة حتى الآن</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                ستظهر هنا فوراً كافة حجوزات النزلاء مع تفاصيل وسيلة الدفع ورقم الواتساب للتأكيد.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const prop = properties.find(p => p.id === booking.propertyId);
                const guestWhatsappClean = booking.guestPhone.replace(/[^0-9]/g, '');
                const whatsappUrl = `https://wa.me/${guestWhatsappClean.startsWith('0') ? '963' + guestWhatsappClean.substring(1) : guestWhatsappClean}?text=${encodeURIComponent(
                  `مرحباً ${booking.guestName}، معك مضيف ${prop ? prop.title : 'سيران سوريا'}. بخصوص حجزك رقم (${booking.id}) المؤكد لدينا للفترة ${booking.checkIn} إلى ${booking.checkOut}. أهلاً وسهلاً بك!`
                )}`;

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-xl">
                          {booking.id}
                        </span>
                        <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl">
                          {booking.bookingType === 'day_use' ? '☀️ سيران نهاري' : '🌙 مبيت فندقي'}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('ar-SY') : 'اليوم'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">
                          {prop ? prop.title : 'إقامة سيران'}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 flex-wrap">
                          <span className="font-bold text-slate-800">النزيل: {booking.guestName}</span>
                          <span className="text-slate-300">•</span>
                          <span>الهاتف: {booking.guestPhone}</span>
                          <span className="text-slate-300">•</span>
                          <span>الضيوف: {booking.guestsCount} أشخاص</span>
                          <span className="text-slate-300">•</span>
                          <span>من: {booking.checkIn} إلى: {booking.checkOut}</span>
                        </div>
                      </div>

                      {/* Expat or Family Gift Tag */}
                      {booking.isFamilyGift && (
                        <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>إهداء للأهل في سوريا من المغتربين: المستلم ({booking.recipientName} - {booking.recipientPhone})</span>
                        </div>
                      )}
                    </div>

                    {/* Financials & Contact Actions */}
                    <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                      <div className="text-left">
                        <span className="text-sm font-black text-emerald-800 block">
                          ${booking.totalPriceUsd} USD
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 block">
                          (~{(booking.totalPriceSyp || booking.totalPriceUsd * (sypExchangeRate || 14800)).toLocaleString()} ل.س)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                          {booking.paymentMethod}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all w-full sm:w-auto justify-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>تواصل واتساب</span>
                        </a>

                        <button
                          onClick={() => {
                            addNotification({
                              title: `✅ تم تأكيد الحجز ${booking.id}`,
                              message: `تم إرسال إشعار التأكيد للنزيل ${booking.guestName}. جهز المكان لاستقبال الضيوف!`,
                              type: 'booking'
                            });
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-all"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تأكيد جاهزية المنشأة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: FINANCIAL WALLET & PAYOUTS */}
      {activeHostTab === 'wallet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-200">الرصيد المتاح للسحب</span>
                <h3 className="text-3xl font-black text-white mt-2">${availableBalanceUsd.toLocaleString()}</h3>
                <span className="text-xs text-emerald-300 font-bold mt-1 block">
                  ~{availableBalanceSyp.toLocaleString()} ليرة سورية
                </span>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 text-xs text-emerald-100 space-y-1">
                <div className="flex justify-between">
                  <span>الأرباح الكلية:</span>
                  <span className="font-bold">${totalRevenueUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>عمولة المنصة الرمزية (15%):</span>
                  <span>-${Math.round(totalRevenueUsd * 0.15)}</span>
                </div>
              </div>
            </div>

            {/* Payout Request Form */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h4 className="text-base font-extrabold text-slate-900 mb-1">طلب سحب رصيد فوري</h4>
              <p className="text-xs text-slate-500 mb-4">
                يتم تحويل الأرباح خلال دقائق عبر شبكات الدفع الإلكتروني المعتمدة في سوريا.
              </p>

              {payoutRequested ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h5 className="font-black text-slate-900 text-sm">تم إرسال طلب السحب بنجاح!</h5>
                  <p className="text-xs text-slate-600">
                    جاري إرسال المبلغ ({availableBalanceSyp.toLocaleString()} ل.س) إلى رقم حسابك وسوف تصلك رسالة تأكيد قصيرة.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestPayout} className="space-y-4">
                  {/* Select Method */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">اختر وسيلة الاستلام في سوريا:</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPayoutMethod('syriatel')}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          payoutMethod === 'syriatel'
                            ? 'bg-rose-50 border-rose-400 text-rose-950 font-black shadow-xs ring-2 ring-rose-400/20'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-bold hover:bg-slate-100'
                        }`}
                      >
                        <Smartphone className="w-5 h-5 mx-auto mb-1 text-rose-600" />
                        <span className="text-xs block">سيريتل كاش</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPayoutMethod('sham')}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          payoutMethod === 'sham'
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-black shadow-xs ring-2 ring-emerald-400/20'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-bold hover:bg-slate-100'
                        }`}
                      >
                        <Wallet className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                        <span className="text-xs block">شام كاش</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPayoutMethod('alharam')}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          payoutMethod === 'alharam'
                            ? 'bg-blue-50 border-blue-400 text-blue-950 font-black shadow-xs ring-2 ring-blue-400/20'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-bold hover:bg-slate-100'
                        }`}
                      >
                        <Building2 className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                        <span className="text-xs block">شركة الهرم</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Phone Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      رقم محفظة {payoutMethod === 'syriatel' ? 'سيريتل كاش' : payoutMethod === 'sham' ? 'شام كاش' : 'الهرم'}:
                    </label>
                    <input
                      type="tel"
                      value={payoutPhone}
                      onChange={(e) => setPayoutPhone(e.target.value)}
                      placeholder="0933456789"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>تأكيد سحب ${availableBalanceUsd} (~{availableBalanceSyp.toLocaleString()} ل.س)</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
