import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Building, 
  Users, 
  SunMedium, 
  Waves, 
  Search, 
  ArrowRight, 
  RefreshCw, 
  Trash2, 
  Wallet, 
  Check, 
  XCircle, 
  FileCheck2,
  ExternalLink,
  Smartphone,
  Banknote,
  MessageCircle,
  Bot,
  Send
} from 'lucide-react';
import { SYP_PER_USD } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { 
    setIsAdminMode, 
    formatPrice, 
    currency,
    chatMessages,
    sendChatMessage,
    resetChatMessages
  } = useApp();
  const [activeTab, setActiveTab] = useState<'bookings' | 'properties' | 'wallets' | 'chat'>('bookings');
  const [adminReplyText, setAdminReplyText] = useState('');
  
  const [stats, setStats] = useState<any>({
    totalBookings: 2,
    totalVolumeUsd: 335,
    totalDepositHeldUsd: 84,
    pendingApprovalsCount: 1,
    fieldVerifiedCount: 2,
    totalProperties: 3
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load backend data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsData, bookingsData, propsData] = await Promise.all([
        api.getStats(),
        api.getBookings(),
        api.getProperties(true) // include all including unapproved
      ]);

      if (statsData) setStats(statsData);
      if (bookingsData) setBookings(bookingsData);
      if (propsData) setProperties(propsData);
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Actions for Bookings
  const handleConfirmDeposit = async (bookingId: string) => {
    await api.updateBooking(bookingId, { paymentStatus: 'deposit_confirmed' });
    loadData();
  };

  const handleReleaseEscrow = async (bookingId: string) => {
    if (confirm('هل أنت متأكد من فك العربون وتحويله لصاحب المزرعة بعد التأكد من اكتمال الإقامة ورضا المستأجر؟')) {
      await api.updateBooking(bookingId, { 
        escrowStatus: 'released_to_host',
        paymentStatus: 'completed'
      });
      loadData();
    }
  };

  const handleRefundGuest = async (bookingId: string) => {
    if (confirm('هل ترغب بإعادة العربون للمستأجر (مثلاً بسبب انقطاع الطاقة الشمسية أو عدم مطابقة الخدمات)؟')) {
      await api.updateBooking(bookingId, { 
        escrowStatus: 'refunded_to_guest',
        paymentStatus: 'refunded'
      });
      loadData();
    }
  };

  // Actions for Properties
  const handleToggleVerified = async (propertyId: string, currentStatus: boolean) => {
    const notes = currentStatus ? '' : 'تم فحص الطاقة الشمسية وتشغيل المكيفات والمسبح ميدانياً بنجاح';
    await api.updateProperty(propertyId, { 
      isVerifiedField: !currentStatus,
      verificationNotes: notes
    });
    loadData();
  };

  const handleApproveProperty = async (propertyId: string) => {
    await api.updateProperty(propertyId, { status: 'approved' });
    loadData();
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار نهائياً؟')) {
      await api.deleteProperty(propertyId);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Navigation */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md">
            س
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base sm:text-lg">لوحة تحكم إدارة سيران سوريا</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                قاعدة البيانات متصلة 🟢
              </span>
            </div>
            <p className="text-xs text-slate-400">إدارة الحجوزات، فحص الطاقة الشمسية، واعتماد المحافظ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsAdminMode(false)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
          >
            <span>العودة لواجهة الزوار والمستأجرين</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* KPI Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">إجمالي الحجوزات</div>
              <div className="text-xl font-black text-white mt-0.5">{stats.totalBookings}</div>
              <div className="text-[10px] text-blue-400 font-bold">نشط ومسجل</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">حجم الحجوزات الكلي</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">${stats.totalVolumeUsd}</div>
              <div className="text-[10px] text-slate-400 font-mono">{(stats.totalVolumeUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">أموال الضمان المحجوزة</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">${stats.totalDepositHeldUsd}</div>
              <div className="text-[10px] text-amber-300 font-bold">عربون 25% محمي بالمنصة</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <SunMedium className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">مفحوصة ميدانياً (طاقة/مسبح)</div>
              <div className="text-xl font-black text-purple-300 mt-0.5">{stats.fieldVerifiedCount}</div>
              <div className="text-[10px] text-purple-400 font-bold">تحقق موثق 100%</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">عقارات بانتظار الاعتماد</div>
              <div className="text-xl font-black text-rose-400 mt-0.5">{stats.pendingApprovalsCount}</div>
              <div className="text-[10px] text-rose-300 font-bold">تتطلب مراجعة فورية</div>
            </div>
          </div>

        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>إدارة الحجوزات وضمان العربون (Escrow)</span>
            <span className="bg-slate-700 text-slate-200 text-[10px] px-2 py-0.5 rounded-full">{bookings.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>اعتماد وتوثيق المزارع والشاليهات</span>
            <span className="bg-slate-700 text-slate-200 text-[10px] px-2 py-0.5 rounded-full">{properties.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('wallets')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'wallets'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>مطابقة المحافظ (سيريتل كاش & MTN كاش)</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>محادثات النزلاء والدعم الذكي</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full">{chatMessages.length}</span>
          </button>
        </div>

        {/* TAB 1: Bookings & Escrow Management */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-800/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>سجل الحجوزات ومراقبة الأمان المالي</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full">
                    مباشر من db.json
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  العربون (25%) يبقى مجمداً لدى المنصة، ويمكنك فكه لصاحب العقار بعد التأكد من وصول الضيف وتشغيل الطاقة الشمسية.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-3">رقم الحجز</th>
                    <th className="py-3 px-3">المستأجر</th>
                    <th className="py-3 px-3">العقار</th>
                    <th className="py-3 px-3">النوع والتاريخ</th>
                    <th className="py-3 px-3">الإجمالي</th>
                    <th className="py-3 px-3">عربون التثبيت (25%)</th>
                    <th className="py-3 px-3">طريقة الدفع</th>
                    <th className="py-3 px-3">حالة الضمان (Escrow)</th>
                    <th className="py-3 px-3 text-center">إجراءات الإدارة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">{b.id}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{b.guestName}</div>
                        <div className="text-[11px] text-slate-400 font-mono" dir="ltr">{b.guestPhone}</div>
                      </td>
                      <td className="py-3.5 px-3 max-w-[200px] truncate">{b.propertyTitle || 'عقار سيران'}</td>
                      <td className="py-3.5 px-3">
                        <span className="bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold ml-1">
                          {b.bookingType === 'day_use' ? 'سيران نهاري' : 'مبيت'}
                        </span>
                        <span className="text-slate-400">{b.checkIn}</span>
                      </td>
                      <td className="py-3.5 px-3 font-bold">${b.totalPriceUsd}</td>
                      <td className="py-3.5 px-3 font-black text-amber-400">
                        ${b.depositUsd || Math.round(b.totalPriceUsd * 0.25)}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          متبقي: ${b.remainingUsd || Math.round(b.totalPriceUsd * 0.75)} عند الوصول
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {b.isExpatriate && (
                          <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full inline-block mb-1">
                            🌍 مغترب ({b.expatCountry || 'خارجي'})
                          </span>
                        )}
                        <span className="font-bold flex items-center gap-1">
                          {b.paymentMethod === 'syriatel_cash' && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                          {b.paymentMethod === 'mtn_cash' && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                          {b.paymentMethod === 'al_haram_usd' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                          {b.paymentMethod === 'western_union_usd' && <span className="w-2 h-2 rounded-full bg-rose-400"></span>}
                          {b.paymentMethod === 'al_haram_expat' && <span className="w-2 h-2 rounded-full bg-yellow-400"></span>}
                          {b.paymentMethod === 'al_haram_local' && <span className="w-2 h-2 rounded-full bg-yellow-500"></span>}
                          {b.paymentMethod === 'gcc_bank_transfer' && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                          {b.paymentMethod === 'western_union' && <span className="w-2 h-2 rounded-full bg-rose-400"></span>}
                          {b.paymentMethod === 'cash_on_arrival_usd' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                          {b.paymentMethod === 'al_haram_usd' ? '🏛️ الهرم بالدولار' :
                           b.paymentMethod === 'western_union_usd' ? '🌍 ويسترن يونيون ($)' :
                           b.paymentMethod === 'al_haram_expat' ? '🏛️ حوالة الهرم (خارجية)' :
                           b.paymentMethod === 'al_haram_local' ? '🏛️ حوالة الهرم (محلية)' :
                           b.paymentMethod === 'gcc_bank_transfer' ? '🏦 تحويل بنكي ($)' :
                           b.paymentMethod === 'western_union' ? '🌍 ويسترن يونيون' :
                           b.paymentMethod === 'intl_card' ? '💳 بطاقة دولية ($)' :
                           b.paymentMethod === 'cash_on_arrival_usd' ? '💵 كاش بالدولار' :
                           b.paymentMethod === 'syriatel_cash' ? 'سيريتل كاش' :
                           b.paymentMethod === 'mtn_cash' ? 'MTN كاش' : 'دفع عند الوصول'}
                        </span>
                        {(b.transactionReference || b.transactionRef) && (
                          <span className="text-[10px] text-slate-400 font-mono block break-all" dir="ltr">
                            مرجع: {b.transactionReference || b.transactionRef}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        {b.escrowStatus === 'held_in_escrow' && (
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3" />
                            محجوز بالضمان
                          </span>
                        )}
                        {b.escrowStatus === 'released_to_host' && (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                            <Check className="w-3 h-3" />
                            تم الفك للمالك
                          </span>
                        )}
                        {b.escrowStatus === 'refunded_to_guest' && (
                          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                            <XCircle className="w-3 h-3" />
                            مسترد للمستأجر
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {b.paymentStatus === 'pending_verification' && (
                            <button
                              onClick={() => handleConfirmDeposit(b.id)}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                              title="تأكيد وصول حوالة سيريتل كاش"
                            >
                              تأكيد العربون ✓
                            </button>
                          )}
                          {b.escrowStatus === 'held_in_escrow' && (
                            <>
                              <button
                                onClick={() => handleReleaseEscrow(b.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                                title="فك العربون وتحويله لصاحب المزرعة"
                              >
                                تحويل للمالك 💰
                              </button>
                              <button
                                onClick={() => handleRefundGuest(b.id)}
                                className="bg-rose-800/80 hover:bg-rose-700 text-rose-200 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
                                title="استرداد العربون للمستأجر"
                              >
                                استرداد ↩
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Properties Approvals & Inspection */}
        {activeTab === 'properties' && (
          <div className="bg-slate-800/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>اعتماد وتوثيق المزارع والشاليهات السورية</span>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full">
                    فحص الطاقة الشمسية والمسبح
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  منح شارة "مفحوص ميدانياً" بعد التأكد من كفاءة ألواح الطاقة وبطاريات الليثيوم ونظافة المسبح.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {properties.map((prop) => (
                <div 
                  key={prop.id}
                  className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img 
                      src={prop.images?.[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300'} 
                      alt="" 
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{prop.title}</h4>
                        <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {prop.area} ({prop.governorate})
                        </span>
                        {prop.status === 'pending_approval' && (
                          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            قيد المراجعة
                          </span>
                        )}
                        {prop.isVerifiedField ? (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            مفحوص ميدانياً ✓
                          </span>
                        ) : (
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            بانتظار الفحص الميداني
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span className="text-emerald-400 font-bold">${prop.priceUsd} / ليلة</span>
                        <span>•</span>
                        <span>المضيف: {prop.host?.name} ({prop.host?.phone})</span>
                      </div>

                      <div className="text-[11px] text-amber-300/90 font-medium">
                        ⚡ {prop.electricity?.label}
                      </div>

                      {prop.verificationNotes && (
                        <div className="text-[11px] text-slate-400 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                          📝 تقرير الفحص: {prop.verificationNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
                    {prop.status === 'pending_approval' && (
                      <button
                        onClick={() => handleApproveProperty(prop.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      >
                        اعتماد ونشر العقار ✓
                      </button>
                    )}

                    <button
                      onClick={() => handleToggleVerified(prop.id, prop.isVerifiedField)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        prop.isVerifiedField
                          ? 'bg-purple-900/60 text-purple-300 border-purple-700 hover:bg-purple-800'
                          : 'bg-purple-600 hover:bg-purple-500 text-white border-transparent'
                      }`}
                    >
                      {prop.isVerifiedField ? 'إلغاء شارة الفحص' : 'منح شارة مفحوص ميدانياً 🛡️'}
                    </button>

                    <button
                      onClick={() => handleDeleteProperty(prop.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors"
                      title="حذف العقار"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Wallets & Local Reconciliation */}
        {activeTab === 'wallets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Syriatel Cash Card */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xl border border-red-500/30">
                    SYR
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">محفظة سيريتل كاش للوساطة</h4>
                    <p className="text-xs text-slate-400 font-mono">رقم التاجر: 963933001122</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">
                  نشط ومطابق
                </span>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="text-xs text-slate-400">إجمالي العربونات المستلمة عبر سيريتل كاش</div>
                <div className="text-2xl font-black text-white font-mono">
                  {(1160000).toLocaleString('ar-SY')} ل.س <span className="text-xs font-normal text-slate-400">($80 USD)</span>
                </div>
                <div className="text-[11px] text-emerald-400">✓ تم التحقق الآلي من الحوالات</div>
              </div>
            </div>

            {/* MTN Cash Card */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/30">
                    MTN
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">محفظة MTN كاش للوساطة</h4>
                    <p className="text-xs text-slate-400 font-mono">رقم التاجر: 963944002233</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">
                  نشط ومطابق
                </span>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="text-xs text-slate-400">إجمالي العربونات المستلمة عبر MTN كاش</div>
                <div className="text-2xl font-black text-white font-mono">
                  {(928000).toLocaleString('ar-SY')} ل.س <span className="text-xs font-normal text-slate-400">($64 USD)</span>
                </div>
                <div className="text-[11px] text-amber-300">✓ الرصيد محجوز في حساب الضمان حتى تسليم المفتاح</div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: Guest Inquiries & Syrian AI Concierge Live Chat */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <span>مركز محادثات النزلاء ومستشار سيران الذكي</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  مراقبة استفسارات النزلاء والرد الميداني اللحظي على أسئلة الطاقة الشمسية، الدفع، والحجوزات.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('هل أنت متأكد من تفريغ المحادثات وإعادتها لرسالة الترحيب؟')) {
                    resetChatMessages();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>إعادة ضبط المحادثات</span>
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-4 sm:p-6 space-y-4">
              <div className="max-h-[480px] overflow-y-auto space-y-3 p-2">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    لا توجد رسائل حالياً.
                  </div>
                ) : (
                  chatMessages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                            isUser
                              ? 'bg-slate-900 border border-slate-700 text-slate-200'
                              : 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-100'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/10 pb-1">
                            <span className={`font-bold ${isUser ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {isUser ? `👤 ${msg.senderName}` : `🌿 ${msg.senderName}`}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(msg.timestamp).toLocaleTimeString('ar-SY')}
                            </span>
                          </div>

                          {msg.propertyTitle && (
                            <div className="text-[10px] font-bold text-cyan-300 mb-1">
                              🏡 العقار المعني: {msg.propertyTitle}
                            </div>
                          )}

                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Admin Direct Quick Reply Input */}
              <div className="pt-3 border-t border-slate-700/80 flex items-center gap-2">
                <input
                  type="text"
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && adminReplyText.trim()) {
                      sendChatMessage(adminReplyText.trim());
                      setAdminReplyText('');
                    }
                  }}
                  placeholder="اكتب رد الدعم الفني للإرسال للنزيل مباشرة..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    if (adminReplyText.trim()) {
                      sendChatMessage(adminReplyText.trim());
                      setAdminReplyText('');
                    }
                  }}
                  disabled={!adminReplyText.trim()}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5 rotate-180" />
                  <span>إرسال الرد</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
