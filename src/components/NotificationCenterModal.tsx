import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  X, 
  CheckCheck, 
  CheckCircle2, 
  MessageCircle, 
  Smartphone, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  Trash2
} from 'lucide-react';

export const NotificationCenterModal: React.FC = () => {
  const { 
    notifications, 
    isNotificationOpen, 
    setIsNotificationOpen, 
    markAllNotificationsRead,
    setIsVoucherModalOpen,
    bookings,
    setLatestConfirmedBooking
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'booking' | 'system'>('all');

  if (!isNotificationOpen) return null;

  const filtered = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'booking') return n.type === 'booking' || n.type === 'whatsapp' || n.type === 'sms';
    return n.type === 'system' || n.type === 'discount';
  });

  const handleOpenVoucher = (bookingId?: string) => {
    if (bookingId) {
      const b = bookings.find(item => item.id === bookingId);
      if (b) {
        setLatestConfirmedBooking(b);
        setIsVoucherModalOpen(true);
        setIsNotificationOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">مركز التنبيهات وإشعارات الحجز</h3>
              <p className="text-xs text-slate-500 mt-0.5">سجل الإشعارات المباشرة وتأكيدات الهاتف</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1"
              title="تحديد الكل كمقروء"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تحديد كمقروء</span>
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 bg-white border-b border-slate-100 flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع التنبيهات ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('booking')}
            className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'booking'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>حجوزات وواتساب</span>
          </button>
          <button
            onClick={() => setActiveFilter('system')}
            className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'system'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>النظام والكهرباء</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Bell className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-xs font-bold text-slate-500">لا توجد تنبيهات حالياً في هذا القسم</p>
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  notif.read 
                    ? 'bg-slate-50/70 border-slate-200/60' 
                    : 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    notif.type === 'booking' 
                      ? 'bg-emerald-600 text-white' 
                      : notif.type === 'discount' 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'bg-slate-800 text-white'
                  }`}>
                    {notif.type === 'booking' ? <CheckCircle2 className="w-4 h-4" /> :
                     notif.type === 'discount' ? <Zap className="w-4 h-4" /> :
                     <Smartphone className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.bookingId && (
                      <button
                        onClick={() => handleOpenVoucher(notif.bookingId)}
                        className="mt-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 w-fit"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>فتح سند الحجز الإلكتروني</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold">
            🇸🇾 منصة سيران سوريا | إشعارات فورية متصلة برقم الواتساب والرسائل القصيرة SMS
          </p>
        </div>

      </div>
    </div>
  );
};
