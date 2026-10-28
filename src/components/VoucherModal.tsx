import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Printer, 
  Share2, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  QrCode, 
  MessageCircle, 
  Download,
  WifiOff,
  Check,
  Gift,
  Car,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';
import { SeyranBrandLogo } from './SeyranBrandLogo';
import { SYP_PER_USD } from '../data/mockData';

export const VoucherModal: React.FC = () => {
  const { 
    latestConfirmedBooking, 
    isVoucherModalOpen, 
    setIsVoucherModalOpen, 
    properties,
    formatPrice,
    setIsOfflineModalOpen,
    saveBookingOffline
  } = useApp();

  const [savedOffline, setSavedOffline] = useState(false);

  if (!isVoucherModalOpen || !latestConfirmedBooking) return null;

  const property = properties.find(p => p.id === latestConfirmedBooking.propertyId);
  const bookingRef = latestConfirmedBooking.id || `#HJ-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const host = window.location.hostname || 'localhost';
    const bookingId = latestConfirmedBooking?.id || 'book-1';
    const pdfUrl = `http://${host}:5001/api/bookings/${bookingId}/pdf`;
    window.open(pdfUrl, '_blank');
  };

  const handleSaveOffline = () => {
    saveBookingOffline(latestConfirmedBooking);
    setSavedOffline(true);
    setTimeout(() => setSavedOffline(false), 3000);
  };

  const depositUsd = latestConfirmedBooking.depositUsd || Math.round(latestConfirmedBooking.totalPriceUsd * 0.25);
  const depositSyp = Math.round(depositUsd * SYP_PER_USD);
  const remainingUsd = latestConfirmedBooking.totalPriceUsd - depositUsd;
  const remainingSyp = Math.round(remainingUsd * SYP_PER_USD);

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌿 *سند تأكيد الحجز الإلكتروني الرسمي - سيران سوريا* 🌿\n\n` +
      `📌 *رقم الحجز المرجعي:* ${bookingRef}\n` +
      `🏡 *العقار/الفندق:* ${property?.title} (${property?.area} - ${property?.governorate})\n` +
      `👤 *النزيل الرئيسي:* ${latestConfirmedBooking.guestName}\n` +
      `📱 *الهاتف:* ${latestConfirmedBooking.guestPhone}\n` +
      `📅 *تسجيل الوصول:* ${latestConfirmedBooking.checkIn} (02:00 م)\n` +
      `📅 *تسجيل المغادرة:* ${latestConfirmedBooking.checkOut} (12:00 ظهراً)\n` +
      `💰 *المبلغ الإجمالي:* $${latestConfirmedBooking.totalPriceUsd} USD (${(latestConfirmedBooking.totalPriceSyp || latestConfirmedBooking.totalPriceUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)\n` +
      `🛡️ *عربون الضمان (المسدد بنظام Escrow):* $${depositUsd} USD (${depositSyp.toLocaleString('ar-SY')} ل.س)\n` +
      `💵 *المتبقي عند الوصول:* $${remainingUsd} USD (${remainingSyp.toLocaleString('ar-SY')} ل.س)\n` +
      (latestConfirmedBooking.isFamilyGift ? `🎁 *ملاحظة:* الحجز هدية عائلية مرسلة للأهل في سوريا باسم (${latestConfirmedBooking.recipientName})\n` : '') +
      `\n✅ الحجز مضمون ومؤكد 100% بنظام الضمان لدى سيران سوريا.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const contactSupportWhatsApp = () => {
    const text = encodeURIComponent(
      `مرحباً فريق سيران سوريا، لدي استفسار بخصوص الحجز رقم: ${bookingRef} باسم ${latestConfirmedBooking.guestName}.`
    );
    window.open(`https://wa.me/963933112233?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-5 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Header Card */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white relative">
          <button 
            onClick={() => setIsVoucherModalOpen(false)}
            className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 uppercase tracking-wider">
                قسيمة حجز إلكترونية معتمدة
              </span>
              <span className="text-xs text-amber-300 font-bold">VIP ESCROW</span>
            </div>
            <SeyranBrandLogo variant="icon" size="sm" />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">تم تأكيد حجزك بنجاح!</h2>
              <p className="text-xs text-emerald-100 mt-0.5">احتفظ بهذه القسيمة لإبرازها عند تسجيل الوصول (Check-in)</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Voucher Ticket Body */}
        <div className="p-4 sm:p-6 space-y-4 bg-slate-50/60 overflow-y-auto flex-1">
          
          {/* Reference & Property Header */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block">رقم الحجز المرجعي</span>
              <div className="text-base sm:text-lg font-black text-emerald-700 font-mono">{bookingRef}</div>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 block">حالة الحجز</span>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>مؤكد ومحمي بالضمان 100%</span>
              </div>
            </div>
          </div>

          {/* Expatriate Family Gifting Banner (if applicable) */}
          {latestConfirmedBooking.isFamilyGift && (
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-emerald-500/10 border-2 border-amber-300/80 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">هدية إقامة عائلية فاخرة</span>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                      مهداة إلى: {latestConfirmedBooking.recipientName || 'الأهل في سوريا'}
                    </h4>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  سلة ترحيبية مجانية
                </span>
              </div>

              {latestConfirmedBooking.giftMessage && (
                <p className="text-xs text-slate-700 italic bg-white/70 p-2 rounded-xl border border-amber-200/50">
                  «{latestConfirmedBooking.giftMessage}»
                </p>
              )}

              <div className="flex items-center justify-between text-[11px] text-amber-950 pt-1 font-semibold">
                <span>رقم هاتف المستلم في سوريا: {latestConfirmedBooking.recipientPhone}</span>
                <span className="text-emerald-700 font-bold">استقبال VIP عند الوصول</span>
              </div>
            </div>
          )}

          {/* Property Info */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <img 
                src={property?.images[0]} 
                alt={property?.title} 
                className="w-16 h-16 rounded-xl object-cover shadow-2xs flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-slate-900 truncate">{property?.title}</h3>
                <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{property?.area} • {property?.governorate}</span>
                </p>
                {latestConfirmedBooking.selectedRoomName && (
                  <p className="text-emerald-700 font-semibold mt-1">
                    الغرفة / الجناح: {latestConfirmedBooking.selectedRoomName}
                  </p>
                )}
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-100">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold">تسجيل الوصول (Check-in)</span>
                <span className="font-bold text-slate-800 text-xs">{latestConfirmedBooking.checkIn}</span>
                <span className="text-[10px] text-slate-500 block">ابتداءً من 02:00 م</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold">تسجيل المغادرة (Check-out)</span>
                <span className="font-bold text-slate-800 text-xs">{latestConfirmedBooking.checkOut}</span>
                <span className="text-[10px] text-slate-500 block">حتى 12:00 ظهراً</span>
              </div>
            </div>
          </div>

          {/* Guest & Escrow Payment Breakdown */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">اسم النزيل الرئيسي:</span>
              <span className="font-bold text-slate-800">{latestConfirmedBooking.guestName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">رقم الهاتف / واتساب:</span>
              <span className="font-bold text-slate-800 font-mono">{latestConfirmedBooking.guestPhone}</span>
            </div>
            
            {/* Escrow Deposit Breakdown */}
            <div className="flex justify-between py-1 border-b border-slate-100 bg-emerald-50/50 p-2 rounded-lg">
              <span className="text-emerald-900 font-bold">عربون الضمان (المسدد 25%):</span>
              <span className="font-black text-emerald-700 font-mono">
                ${depositUsd} USD ({depositSyp.toLocaleString('ar-SY')} ل.س)
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">المبلغ المتبقي عند الوصول (75%):</span>
              <span className="font-bold text-slate-800 font-mono">
                ${remainingUsd} USD ({remainingSyp.toLocaleString('ar-SY')} ل.س)
              </span>
            </div>

            <div className="flex justify-between pt-1 text-sm font-black text-slate-900">
              <span>المبلغ الإجمالي للحجز:</span>
              <div className="text-left font-mono" dir="ltr">
                <span className="text-emerald-700 font-black">${latestConfirmedBooking.totalPriceUsd} USD</span>
                <span className="text-[11px] text-slate-500 block font-normal" dir="rtl">
                  ({(latestConfirmedBooking.totalPriceSyp || latestConfirmedBooking.totalPriceUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)
                </span>
              </div>
            </div>
          </div>

          {/* Official Visual SVG QR Code Matrix */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-emerald-700 text-white">
                  FAST CHECK-IN
                </span>
                <h4 className="font-black text-xs text-emerald-950">رمز التحقق الفندقي السريع</h4>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                أبرز هذا الرمز لموظف الاستقبال أو ناطور المزرعة لتأكيد الحجز فورياً.
              </p>
              <div className="text-[10px] text-slate-400 font-mono">
                SECURE HASH: {bookingRef.replace('#', '')}-{property?.id.slice(-4) || '8841'}
              </div>
            </div>

            {/* Crisp High-Res SVG QR Representation */}
            <div className="p-2 bg-white rounded-2xl shadow-sm border border-emerald-200 flex-shrink-0">
              <svg width="76" height="76" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* QR Background & Corner Positioning Squares */}
                <rect width="100" height="100" fill="white" />
                {/* Top-Left Finder */}
                <rect x="10" y="10" width="26" height="26" rx="4" fill="#047857" />
                <rect x="16" y="16" width="14" height="14" rx="2" fill="white" />
                <rect x="20" y="20" width="6" height="6" rx="1" fill="#047857" />
                {/* Top-Right Finder */}
                <rect x="64" y="10" width="26" height="26" rx="4" fill="#047857" />
                <rect x="70" y="16" width="14" height="14" rx="2" fill="white" />
                <rect x="74" y="20" width="6" height="6" rx="1" fill="#047857" />
                {/* Bottom-Left Finder */}
                <rect x="10" y="64" width="26" height="26" rx="4" fill="#047857" />
                <rect x="16" y="70" width="14" height="14" rx="2" fill="white" />
                <rect x="20" y="74" width="6" height="6" rx="1" fill="#047857" />
                {/* Module Data Pattern */}
                <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="22" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="30" width="6" height="6" fill="#047857" />
                <rect x="12" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="22" y="44" width="6" height="6" fill="#047857" />
                <rect x="32" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="44" width="16" height="6" fill="#0f172a" />
                <rect x="64" y="44" width="6" height="6" fill="#047857" />
                <rect x="74" y="44" width="16" height="6" fill="#0f172a" />
                <rect x="44" y="62" width="8" height="8" fill="#047857" />
                <rect x="62" y="62" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="62" width="12" height="6" fill="#0f172a" />
                <rect x="52" y="76" width="6" height="14" fill="#0f172a" />
                <rect x="68" y="76" width="12" height="14" fill="#047857" />
                <rect x="86" y="76" width="6" height="6" fill="#0f172a" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            
            {/* Offline Save & Toast */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveOffline}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  savedOffline 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                {savedOffline ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>تم حفظ القسيمة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-emerald-700" />
                    <span>حفظ القسيمة للعمل بدون إنترنت</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsVoucherModalOpen(false);
                  setIsOfflineModalOpen(true);
                }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="عرض سند الطوارئ"
              >
                <span>سند الطوارئ</span>
              </button>
            </div>

            {/* WhatsApp Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={shareWhatsApp}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة السند عبر واتساب</span>
              </button>
              
              <button
                onClick={contactSupportWhatsApp}
                className="py-3 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                title="تواصل مع خدمة العملاء"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-700" />
                <span className="hidden sm:inline">دعم سيران</span>
              </button>
            </div>

            {/* Official PDF Voucher Download */}
            <button
              onClick={handleDownloadPdf}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 hover:from-emerald-500 hover:to-slate-800 text-white rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 border border-emerald-500/30"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>تحميل وثيقة الحجز الرسمية المعتمدة (PDF)</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة القسيمة فورياً</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
