import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SYP_PER_USD } from '../data/mockData';
import { 
  X, 
  Calendar, 
  Users, 
  Phone, 
  User, 
  Building, 
  Banknote,
  Send,
  Clock,
  Tag,
  Check,
  Percent,
  Sparkles,
  Coffee,
  ShieldCheck,
  Bed,
  Globe,
  Coins,
  Copy,
  CheckCircle2,
  CreditCard,
  QrCode,
  FileText,
  Building2,
  HelpCircle,
  MessageCircle,
  Car,
  Crown,
  Lock,
  DollarSign,
  Gift,
  AlertCircle
} from 'lucide-react';
import { PaymentMethod } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    selectedProperty, 
    isBookingOpen, 
    setIsBookingOpen, 
    currency, 
    createBooking,
    setLatestConfirmedBooking,
    setIsVoucherModalOpen,
    formatPrice,
    geniusTier,
    isPriceFrozen,
    getFrozenPrice,
    selectedRoomId,
    setSelectedRoomId,
    sypExchangeRate
  } = useApp();

  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (isBookingOpen) {
      setBookingStep(1);
      setBookingError(null);
    }
  }, [isBookingOpen, selectedProperty?.id]);

  const [bookingType, setBookingType] = useState<'overnight' | 'day_use'>('overnight');
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    return new Date(Date.now() + 86400000).toISOString().split('T')[0];
  });
  const [nights, setNights] = useState(2);
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('syriatel_cash');

  const computedCheckOutDate = (() => {
    const baseMs = Date.parse(checkInDate) || Date.now();
    const daysToAdd = bookingType === 'day_use' ? 1 : nights;
    return new Date(baseMs + daysToAdd * 86400000).toISOString().split('T')[0];
  })();

  // Expatriate Family Gifting Feature
  const [isFamilyGift, setIsFamilyGift] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [hasWelcomeBasket, setHasWelcomeBasket] = useState(true);

  // VIP Chauffeur Transfer State
  const [hasChauffeur, setHasChauffeur] = useState(false);
  const [chauffeurLocation, setChauffeurLocation] = useState('مطار دمشق الدولي (صالة الوصول)');
  const [chauffeurTime, setChauffeurTime] = useState('الساعة 03:00 عصراً');

  // Strictly USD ($) and Syrian Pound (SYP ل.س) Payment State
  const [payCurrency, setPayCurrency] = useState<'USD' | 'SYP'>(currency === 'USD' ? 'USD' : 'SYP');
  const [sypMethod, setSypMethod] = useState<'syriatel_cash' | 'mtn_cash' | 'al_haram_local' | 'cash_on_arrival'>('syriatel_cash');
  const [usdMethod, setUsdMethod] = useState<'al_haram_usd' | 'western_union_usd' | 'gcc_bank_transfer' | 'intl_card' | 'cash_on_arrival_usd'>('al_haram_usd');
  const [expatCountry, setExpatCountry] = useState('السعودية');
  const [transactionReference, setTransactionReference] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedSyriatel, setCopiedSyriatel] = useState(false);
  const [copiedMtn, setCopiedMtn] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);
  const [copiedHaramAccount, setCopiedHaramAccount] = useState(false);
  const [gccBankChoice, setGccBankChoice] = useState<'rajhi' | 'dib'>('rajhi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  useEffect(() => {
    if (selectedProperty?.roomOptions && selectedProperty.roomOptions.length > 0) {
      if (!selectedRoomId || !selectedProperty.roomOptions.some(r => r.id === selectedRoomId)) {
        setSelectedRoomId(selectedProperty.roomOptions[0].id);
      }
    }
  }, [selectedProperty?.id, selectedRoomId, setSelectedRoomId]);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isBookingOpen || !selectedProperty) return null;

  // Selected room calculation (honoring Hopper Price Freeze if active)
  const isFrozen = isPriceFrozen(selectedProperty.id);
  const frozenPriceVal = isFrozen ? getFrozenPrice(selectedProperty.id) : null;

  const activeRoom = selectedProperty.roomOptions?.find(r => r.id === selectedRoomId);
  const defaultPropertyPrice = frozenPriceVal ?? selectedProperty.priceUsd;
  const baseRate = activeRoom
    ? activeRoom.pricePerNightUsd
    : (bookingType === 'day_use' && selectedProperty.dayUsePriceUsd ? selectedProperty.dayUsePriceUsd : defaultPropertyPrice);

  const durationMultiplier = bookingType === 'day_use' ? 1 : nights;
  const subtotalUsd = baseRate * durationMultiplier;

  // Discounts: Weekly discount (Booking.com style)
  const weeklyDiscountPercent = (bookingType === 'overnight' && nights >= 7)
    ? (selectedProperty.discountWeeklyPercent || 10)
    : 0;
  const weeklyDiscountUsd = Math.round((subtotalUsd * weeklyDiscountPercent) / 100);

  // Genius VIP Loyalty Discount (Booking.com style)
  const geniusDiscountPercent = (selectedProperty.isGeniusDeal || geniusTier >= 2) 
    ? (geniusTier === 3 ? 20 : geniusTier === 2 ? 15 : 10)
    : 0;
  const geniusDiscountUsd = Math.round((subtotalUsd * geniusDiscountPercent) / 100);

  // Promo Coupon Discount
  const promoDiscountPercent = appliedPromo ? appliedPromo.percent : 0;
  const promoDiscountUsd = Math.round(((subtotalUsd - weeklyDiscountUsd - geniusDiscountUsd) * promoDiscountPercent) / 100);

  const totalDiscountUsd = weeklyDiscountUsd + geniusDiscountUsd + promoDiscountUsd;
  const chauffeurFeeUsd = hasChauffeur ? 25 : 0;
  const totalUsd = Math.max(0, subtotalUsd - totalDiscountUsd) + chauffeurFeeUsd;
  const totalSyp = totalUsd * (sypExchangeRate || SYP_PER_USD);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'HAJZ20') {
      setAppliedPromo({ code: 'HAJZ20', percent: 20 });
    } else if (code === 'GENIUS15') {
      setAppliedPromo({ code: 'GENIUS15', percent: 15 });
    } else if (code === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', percent: 10 });
    } else {
      setPromoError('كود الخصم غير صحيح. جرّب: HAJZ20 أو GENIUS15');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    if (!guestName.trim() || !guestPhone.trim()) {
      setBookingError('يرجى كتابة الاسم ورقم الهاتف أو الواتساب للمتابعة');
      return;
    }

    const bookingId = `HJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPaymentMethod: PaymentMethod = payCurrency === 'USD' ? usdMethod : sypMethod;
    const isUsd = payCurrency === 'USD';

    const newBooking = {
      id: bookingId,
      propertyId: selectedProperty.id,
      bookingType,
      checkIn: checkInDate,
      checkOut: computedCheckOutDate,
      guestsCount,
      guestName,
      guestPhone,
      paymentMethod: finalPaymentMethod,
      totalPriceUsd: totalUsd,
      totalPriceSyp: totalSyp,
      discountAppliedUsd: totalDiscountUsd,
      promoCodeApplied: appliedPromo?.code,
      selectedRoomId: activeRoom?.id,
      selectedRoomName: activeRoom?.name || 'الإقامة القياسية',
      createdAt: new Date().toISOString(),
      // بيانات العملة والمغتربين
      isExpatriate: isUsd,
      expatCountry: isUsd ? expatCountry : undefined,
      transactionReference: transactionReference.trim() || undefined,
      // ميزات إهداء الأهل في سوريا
      isFamilyGift,
      recipientName: isFamilyGift ? recipientName : undefined,
      recipientPhone: isFamilyGift ? recipientPhone : undefined,
      giftMessage: isFamilyGift ? giftMessage : undefined,
      hasWelcomeBasket: isFamilyGift ? hasWelcomeBasket : undefined
    };

    setIsSubmitting(true);
    try {
      const res = await createBooking(newBooking);
      if (!res.success) {
        setBookingError(res.error || 'عذراً، هذا العقار محجوز مسبقاً في هذه التواريخ المحددة.');
        setIsSubmitting(false);
        return;
      }
      setLatestConfirmedBooking(newBooking);
      setIsBookingOpen(false);
      setIsVoucherModalOpen(true);
    } catch (err: any) {
      setBookingError(err.message || 'تعذر استكمال الحجز، يرجى المحاولة لاحقاً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = async () => {
    setBookingError(null);
    if (!guestName.trim() || !guestPhone.trim()) {
      setBookingError('يرجى كتابة الاسم ورقم الهاتف أو الواتساب للمتابعة');
      return;
    }

    const bookingId = `HJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPaymentMethod: PaymentMethod = payCurrency === 'USD' ? usdMethod : sypMethod;
    const isUsd = payCurrency === 'USD';
    const depositUsd = Math.round(totalUsd * 0.25);
    const depositSyp = Math.round(totalSyp * 0.25);

    const newBooking = {
      id: bookingId,
      propertyId: selectedProperty.id,
      bookingType,
      checkIn: checkInDate,
      checkOut: computedCheckOutDate,
      guestsCount,
      guestName,
      guestPhone,
      paymentMethod: finalPaymentMethod,
      totalPriceUsd: totalUsd,
      totalPriceSyp: totalSyp,
      discountAppliedUsd: totalDiscountUsd,
      promoCodeApplied: appliedPromo?.code,
      selectedRoomId: activeRoom?.id,
      selectedRoomName: activeRoom?.name || 'الإقامة القياسية',
      createdAt: new Date().toISOString(),
      isExpatriate: isUsd,
      expatCountry: isUsd ? expatCountry : undefined,
      transactionReference: transactionReference.trim() || undefined,
      // ميزات إهداء الأهل في سوريا
      isFamilyGift,
      recipientName: isFamilyGift ? recipientName : undefined,
      recipientPhone: isFamilyGift ? recipientPhone : undefined,
      giftMessage: isFamilyGift ? giftMessage : undefined,
      hasWelcomeBasket: isFamilyGift ? hasWelcomeBasket : undefined
    };

    setIsSubmitting(true);
    try {
      const res = await createBooking(newBooking);
      if (!res.success) {
        setBookingError(res.error || 'عذراً، هذا العقار غير متاح في التواريخ المختارة.');
        setIsSubmitting(false);
        return;
      }
      setLatestConfirmedBooking(newBooking);
      setIsBookingOpen(false);
      setIsVoucherModalOpen(true);

    const paymentLabel = isUsd
      ? `بالدولار الأمريكي ($ USD) - ${
          usdMethod === 'al_haram_usd' ? 'حوالة الهرم بالدولار' :
          usdMethod === 'western_union_usd' ? 'ويسترن يونيون بالدولار' :
          usdMethod === 'gcc_bank_transfer' ? 'تحويل بنكي بالدولار' :
          usdMethod === 'intl_card' ? 'بطاقة ائتمان دولية بالدولار' : 'دفع نقدي بالدولار عند الوصول'
        } (${expatCountry})`
      : `بالليرة السورية (ل.س SYP) - ${
          sypMethod === 'syriatel_cash' ? 'سيريتل كاش' :
          sypMethod === 'mtn_cash' ? 'MTN كاش' :
          sypMethod === 'al_haram_local' ? 'حوالة الهرم بالليرة' : 'دفع نقدي بالليرة عند الوصول'
        }`;

    const waMsg =
      `السلام عليكم، أود تأكيد حجز إقامتي عبر منصة سيران سوريا 🌿\n\n` +
      `📌 *رقم الحجز:* ${bookingId}\n` +
      `🏡 *العقار:* ${selectedProperty.title} (${selectedProperty.area} - ${selectedProperty.governorate})\n` +
      (activeRoom ? `🛏️ *فئة الغرفة المحجوزة:* ${activeRoom.name} (${activeRoom.bedType})\n` : '') +
      `👤 *صاحب الحجز:* ${guestName}\n` +
      `📱 *رقم الهاتف/الواتساب:* ${guestPhone}\n` +
      (isFamilyGift ? `🎁 *نوع الطلب:* إهداء خاص للأهل في سوريا من المغترب\n👨‍👩‍👧‍👦 *المستفيد بالداخل:* ${recipientName || 'العائلة الكريمة'} (${recipientPhone || 'نفس الرقم'})\n💌 *رسالة الإهداء:* "${giftMessage || 'ألف صحة وهنا يا غوالي وعطلة سعيدة'}"\n🧺 *سلة الضيافة الشامية المجانية:* مشمولة ومؤكدة\n` : '') +
      (hasChauffeur ? `🚗 *خدمة الاستقبال والتوصيل VIP:* نعم، من (${chauffeurLocation}) في (${chauffeurTime})\n` : '') +
      `📅 *نوع الحجز:* ${bookingType === 'day_use' ? 'سيران نهاري' : `مبيت (${nights} ليالٍ)`} - ${guestsCount} ضيوف\n` +
      `💰 *المبلغ الكلي:* $${totalUsd} USD (${totalSyp.toLocaleString('ar-SY')} ل.س)\n` +
      `🛡️ *عربون الضمان (25%):* $${depositUsd} USD (${depositSyp.toLocaleString('ar-SY')} ل.س)\n` +
      `💳 *وسيلة الدفع:* ${paymentLabel}\n` +
      (transactionReference ? `🔖 *رمز المعاملة / الإشعار:* ${transactionReference}\n` : '') +
      `\nأرجو التحقق وتأكيد استلام العربون وحجز الموعد. شكراً لكم!`;

    window.open(`https://wa.me/963933112233?text=${encodeURIComponent(waMsg)}`, '_blank');
    } catch (err: any) {
      setBookingError(err.message || 'تعذر استكمال الحجز عبر واتساب.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header with 3-Step Progressive Wizard Stepper */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 sticky top-0 z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs px-2 py-0.5 font-bold rounded-full bg-emerald-600 text-white">سيران سوريا</span>
                <h3 className="font-black text-slate-900 text-lg">إتمام الحجز وتأكيد الغرفة</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {selectedProperty.title} ({selectedProperty.area})
              </p>
            </div>
            <button
              onClick={() => setIsBookingOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3-Step Interactive Progress Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { step: 1 as const, label: '1. بيانات الإقامة' },
              { step: 2 as const, label: '2. وسيلة الدفع' },
              { step: 3 as const, label: '3. التأكيد والقسيمة' }
            ].map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => {
                  if (item.step > 1 && (!guestName.trim() || !guestPhone.trim())) {
                    setBookingError('يرجى إدخال الاسم الثلاثي ورقم الهاتف أولاً للانتقال لخطوة الدفع');
                    return;
                  }
                  setBookingError(null);
                  setBookingStep(item.step);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border ${
                  bookingStep === item.step
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : bookingStep > item.step
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-white/80 text-slate-500 border-slate-200 hover:bg-white'
                }`}
              >
                {bookingStep > item.step && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Inline Error & Double-Booking Guard Banner */}
            {bookingError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start justify-between gap-3 animate-fadeIn shadow-xs">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-rose-900 text-sm">تنبيه الحجز</p>
                    <p className="leading-relaxed">{bookingError}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingError(null)}
                  className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 1: Stay Details, Guest Info & Expat Gift */}
            {bookingStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
            
            {/* Hotel Room Options Selector (Booking.com style) */}
            {selectedProperty.roomOptions && selectedProperty.roomOptions.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  اختر نوع الغرفة أو الجناح الفندقي
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedProperty.roomOptions.map((room) => {
                    const isSelected = (selectedRoomId === room.id) || (!selectedRoomId && room.id === selectedProperty.roomOptions![0].id);
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                          isSelected 
                            ? 'border-emerald-600 bg-emerald-50/40 shadow-xs' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{room.name}</span>
                            {room.freeBreakfast && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Coffee className="w-2.5 h-2.5" /> إفطار مشمول
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{room.bedType}</span>
                            <span>•</span>
                            <span>يتسع لـ {room.maxGuests} ضيوف</span>
                            {room.viewType && (
                              <>
                                <span>•</span>
                                <span className="text-cyan-700 font-medium">{room.viewType}</span>
                              </>
                            )}
                          </div>
                          <div className="text-[11px] text-emerald-600 flex items-center gap-1 pt-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{room.freeCancellation ? 'إلغاء مجاني متاح' : 'حجز غير قابل للإلغاء'}</span>
                            <span className="text-rose-600 font-bold mr-2">متبقي {room.availableRoomsCount} غرف فقط</span>
                          </div>
                        </div>
                        <div className="text-left font-black text-emerald-700 text-sm">
                          ${room.pricePerNightUsd}
                          <span className="text-[10px] font-normal text-slate-400 block">/ ليلة</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rental Type Picker (Day-Use vs Overnight) */}
            {selectedProperty.rentalType === 'both' && (
              <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setBookingType('overnight')}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    bookingType === 'overnight'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>مبيت كامل (إقامة بالأيام)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('day_use')}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    bookingType === 'day_use'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>سيران نهاري (10ص - 8م)</span>
                </button>
              </div>
            )}

            {/* Trip Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  تاريخ تسجيل الوصول (Check-in)
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-emerald-700 font-bold mt-1 block">
                  المغادرة التلقائية: {computedCheckOutDate}
                </span>
              </div>

              {bookingType === 'overnight' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    مدة الإقامة (عدد الليالي)
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14, 30].map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'ليلة واحدة' : n === 2 ? 'ليلتان' : 'ليالٍ'}
                        {n >= 7 ? ' (يشمل خصم أسبوعي)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={bookingType === 'overnight' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  عدد النزلاء
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Array.from({ length: selectedProperty.maxGuests }, (_, i) => i + 1).map(g => (
                    <option key={g} value={g}>{g} {g === 1 ? 'نزيل واحد' : 'نزلاء'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Information */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">بيانات النزيل الأساسية</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> الاسم الثلاثي
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="مثال: المهندس أحمد الدمشقي"
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> رقم الموبايل (واتساب)
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="0933123456"
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Expatriate Family Gifting Card (باقة المغتربين لإسعاد الأهل) */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              isFamilyGift 
                ? 'bg-gradient-to-br from-amber-50 to-orange-50/80 border-amber-300 shadow-sm' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsFamilyGift(!isFamilyGift)}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isFamilyGift ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-200 text-slate-700'}`}>
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                        خدمة المغتربين
                      </span>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                        هل هذا الحجز هدية لأهلك داخل سوريا؟
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تنسيق مهني مع الأهل، سلة ضيافة شامية مجانية، ورسالة إهداء شخصية
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isFamilyGift}
                  onChange={(e) => setIsFamilyGift(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {isFamilyGift && (
                <div className="mt-4 pt-3.5 border-t border-amber-200/80 space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        اسم المستفيد / العائلة داخل سوريا *
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="مثال: الوالد أبو محمد والعائلة"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        رقم هاتف المستفيد في سوريا (للتنسيق والتسليم) *
                      </label>
                      <input
                        type="tel"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-left focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1">
                      رسالة إهداء شخصية للأهل (تُطبع في قسيمة الحجز الفاخرة)
                    </label>
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      rows={2}
                      placeholder="مثال: ألف صحة وهنا يا غوالي، عطلة مباركة من ابنكم في الغربة..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-amber-100/70 rounded-xl border border-amber-200 text-xs text-amber-950 font-bold">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>سلة ضيافة وفواكه وحلويات شامية ترحيبية مهداة باسمك</span>
                    </div>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-black">
                      مجاناً
                    </span>
                  </div>
                </div>
              )}
            </div>

                {/* Step 1 Footer Bar: Live Total Preview + Next Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">التكلفة التقديرية ({bookingType === 'day_use' ? 'سيران نهاري' : `${nights} ليالٍ`}):</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-emerald-800 text-base">${totalUsd} USD</span>
                      <span className="text-xs text-slate-500 font-bold">({totalSyp.toLocaleString('ar-SY')} ل.س)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!guestName.trim() || !guestPhone.trim()) {
                        setBookingError('يرجى إدخال الاسم الثلاثي ورقم الموبايل أولاً للمتابعة إلى خطوة الدفع');
                        return;
                      }
                      setBookingError(null);
                      setBookingStep(2);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-95"
                  >
                    التالي: وسيلة الدفع ⬅️
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Promo Code, Currency & Payment Method */}
            {bookingStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
            {/* Promo Code Box */}
            <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 space-y-2">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                هل تملك كود خصم أو قسيمة فندقية؟
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="جرّب: HAJZ20 أو GENIUS15"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  تطبيق
                </button>
              </div>
              {appliedPromo && (
                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  تم تفعيل كود ({appliedPromo.code}): خصم {appliedPromo.percent}% فوري!
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-600 font-semibold">
                  {promoError}
                </div>
              )}
            </div>

            {/* Payment Category Selector: Strictly USD ($) vs SYP (ل.س) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">عملة وطرق دفع عربون الحجز</h4>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  عربون ضامن 25% محمي
                </span>
              </div>

              {/* Currency Selector Tabs: SYP vs USD */}
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPayCurrency('SYP')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    payCurrency === 'SYP' 
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇸🇾 دفع بالليرة السورية (ل.س SYP)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayCurrency('USD')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    payCurrency === 'USD' 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>💵 دفع بالدولار الأمريكي ($ USD)</span>
                </button>
              </div>

              {/* Tab 1: Local Syrian Pound (SYP) Payment Options */}
              {payCurrency === 'SYP' ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200 text-slate-700">
                    <span className="font-bold">قيمة عربون الضمان (25% بالليرة):</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{Math.round(totalSyp * 0.25).toLocaleString('ar-SY')} ل.س</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Syriatel Cash */}
                    <label 
                      className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        sypMethod === 'syriatel_cash' 
                          ? 'border-emerald-600 bg-white shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white/70'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="syp_payment" 
                        value="syriatel_cash" 
                        checked={sypMethod === 'syriatel_cash'}
                        onChange={() => setSypMethod('syriatel_cash')}
                        className="mt-1 accent-emerald-600"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <span>سيريتل كاش</span>
                          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded">Syriatel</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">تحويل العربون لمحفظة سيران الرسمية</div>
                      </div>
                    </label>

                    {/* MTN Cash */}
                    <label 
                      className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        sypMethod === 'mtn_cash' 
                          ? 'border-emerald-600 bg-white shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white/70'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="syp_payment" 
                        value="mtn_cash" 
                        checked={sypMethod === 'mtn_cash'}
                        onChange={() => setSypMethod('mtn_cash')}
                        className="mt-1 accent-emerald-600"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <span>إم تي إن كاش</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">MTN</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">دفع العربون عبر تطبيق كاش المعتمد</div>
                      </div>
                    </label>

                    {/* Al-Haram Local */}
                    <label 
                      className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        sypMethod === 'al_haram_local' 
                          ? 'border-emerald-600 bg-white shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white/70'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="syp_payment" 
                        value="al_haram_local" 
                        checked={sypMethod === 'al_haram_local'}
                        onChange={() => setSypMethod('al_haram_local')}
                        className="mt-1 accent-emerald-600"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <span>حوالة الهرم / الفؤاد</span>
                          <span className="text-[10px] bg-yellow-100 text-yellow-800 font-bold px-1.5 py-0.2 rounded">بين المحافظات</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">إرسال الحوالة لفرع دمشق المزة بالليرة</div>
                      </div>
                    </label>

                    {/* Cash on arrival (SYP) */}
                    <label 
                      className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        sypMethod === 'cash_on_arrival' 
                          ? 'border-emerald-600 bg-white shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white/70'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="syp_payment" 
                        value="cash_on_arrival" 
                        checked={sypMethod === 'cash_on_arrival'}
                        onChange={() => setSypMethod('cash_on_arrival')}
                        className="mt-1 accent-emerald-600"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <span>دفع نقدي عند الوصول</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">ل.س</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">تثبيت عبر الهاتف والدفع بالليرة عند استلام المفتاح</div>
                      </div>
                    </label>
                  </div>

                  {/* Interactive Details for Selected SYP Method */}
                  {sypMethod === 'syriatel_cash' && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-bold">رقم حساب سيريتل كاش المعتمد:</span>
                        <div className="flex items-center gap-1.5">
                          <code className="bg-red-50 text-red-700 font-mono font-bold px-2 py-0.5 rounded border border-red-200" dir="ltr">
                            0933-112-233
                          </code>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('0933112233');
                              setCopiedSyriatel(true);
                              setTimeout(() => setCopiedSyriatel(false), 2000);
                            }}
                            className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold"
                          >
                            {copiedSyriatel ? 'تم النسخ' : 'نسخ الرقم'}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-slate-600 font-bold">كود التحويل السريع المباشر (USSD):</span>
                        <div className="flex items-center gap-1.5">
                          <code className="bg-slate-100 text-slate-800 font-mono text-[10px] px-2 py-0.5 rounded" dir="ltr">
                            {`*304*1*0933112233*${Math.round(totalSyp * 0.25)}#`}
                          </code>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`*304*1*0933112233*${Math.round(totalSyp * 0.25)}#`);
                              setCopiedUssd(true);
                              setTimeout(() => setCopiedUssd(false), 2000);
                            }}
                            className="px-2 py-0.5 bg-slate-800 text-white rounded text-[10px] font-bold"
                          >
                            {copiedUssd ? 'تم' : 'نسخ الكود'}
                          </button>
                        </div>
                      </div>

                      <div className="pt-1">
                        <label className="block text-[11px] text-slate-600 font-bold mb-1">
                          رمز إشعار عملية التحويل (يصلك برسالة SMS من سيريتل):
                        </label>
                        <input
                          type="text"
                          value={transactionReference}
                          onChange={(e) => setTransactionReference(e.target.value)}
                          placeholder="مثال: رقم العملية 847291"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}

                  {sypMethod === 'mtn_cash' && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-bold">رقم حساب إم تي إن كاش:</span>
                        <div className="flex items-center gap-1.5">
                          <code className="bg-amber-50 text-amber-800 font-mono font-bold px-2 py-0.5 rounded border border-amber-200" dir="ltr">
                            0944-556-677
                          </code>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('0944556677');
                              setCopiedMtn(true);
                              setTimeout(() => setCopiedMtn(false), 2000);
                            }}
                            className="px-2 py-0.5 bg-amber-500 text-white rounded text-[10px] font-bold"
                          >
                            {copiedMtn ? 'تم النسخ' : 'نسخ'}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-600 font-bold mb-1">
                          رقم إشعار عملية MTN كاش:
                        </label>
                        <input
                          type="text"
                          value={transactionReference}
                          onChange={(e) => setTransactionReference(e.target.value)}
                          placeholder="مثال: 554312"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}

                  {sypMethod === 'al_haram_local' && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-yellow-200 space-y-2 text-xs">
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        📌 <strong>اسم المستلم بدمشق:</strong> شركة سيران سوريا للسياحة (فرع المزة المركزي)  
                        <br />📞 <strong>هاتف التنسيق المباشر:</strong> 0933-112-233
                      </p>
                      <div>
                        <label className="block text-[11px] text-slate-600 font-bold mb-1">
                          رقم إشعار الحوالة (رقم الوصل):
                        </label>
                        <input
                          type="text"
                          value={transactionReference}
                          onChange={(e) => setTransactionReference(e.target.value)}
                          placeholder="مثال: 01-445892"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Tab 2: US Dollar (USD $) Payment Options */
                <div className="space-y-3 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-4 rounded-2xl border border-emerald-500/30 text-white shadow-xl">
                  {/* Country Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <span className="text-xs text-emerald-200 font-bold flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      اختر دولة التحويل / الإقامة:
                    </span>
                    <select
                      value={expatCountry}
                      onChange={(e) => setExpatCountry(e.target.value)}
                      className="bg-slate-800 text-xs font-bold text-white rounded-xl px-3 py-1.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="السعودية">🇸🇦 المملكة العربية السعودية</option>
                      <option value="الإمارات">🇦🇪 دولة الإمارات العربية المتحدة</option>
                      <option value="الكويت">🇰🇼 دولة الكويت</option>
                      <option value="قطر">🇶🇦 دولة قطر</option>
                      <option value="ألمانيا">🇩🇪 ألمانيا والاتحاد الأوروبي</option>
                      <option value="السويد">🇸🇪 مملكة السويد</option>
                      <option value="هولندا">🇳🇱 هولندا</option>
                      <option value="تركيا">🇹🇷 تركيا</option>
                      <option value="لبنان">🇱🇧 لبنان</option>
                      <option value="أمريكا/كندا">🇺🇸 أمريكا وكندا</option>
                      <option value="دولة أخرى">🌍 دولة أخرى</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 text-slate-300">
                    <span className="font-semibold">عربون الضمان بالدولار (25%):</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">${Math.round(totalUsd * 0.25)} USD</span>
                  </div>

                  {/* USD Methods Radios */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* Method 1: Al-Haram USD */}
                    <div
                      onClick={() => setUsdMethod('al_haram_usd')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        usdMethod === 'al_haram_usd'
                          ? 'border-emerald-400 bg-emerald-900/50 shadow-md ring-1 ring-emerald-400'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Send className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>حوالة الهرم بالدولار</span>
                          <span className="text-[9px] bg-amber-500/30 text-amber-300 font-bold px-1 rounded">$ USD</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">استلام وتسليم مباشر بالدولار بدمشق</p>
                      </div>
                    </div>

                    {/* Method 2: Western Union USD */}
                    <div
                      onClick={() => setUsdMethod('western_union_usd')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        usdMethod === 'western_union_usd'
                          ? 'border-emerald-400 bg-emerald-900/50 shadow-md ring-1 ring-emerald-400'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Globe className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>ويسترن يونيون بالدولار</span>
                          <span className="text-[9px] bg-rose-500/30 text-rose-300 font-bold px-1 rounded">MTCN</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">إرسال دولي مباشر من أي دولة بالعالم</p>
                      </div>
                    </div>

                    {/* Method 3: Direct Bank Wire USD */}
                    <div
                      onClick={() => setUsdMethod('gcc_bank_transfer')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        usdMethod === 'gcc_bank_transfer'
                          ? 'border-emerald-400 bg-emerald-900/50 shadow-md ring-1 ring-emerald-400'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>تحويل بنكي مباشر (IBAN)</span>
                          <span className="text-[9px] bg-cyan-500/30 text-cyan-300 font-bold px-1 rounded">$ Wire</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">حساب معتمد للتحويلات البنكية بالدولار</p>
                      </div>
                    </div>

                    {/* Method 4: International Card */}
                    <div
                      onClick={() => setUsdMethod('intl_card')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        usdMethod === 'intl_card'
                          ? 'border-emerald-400 bg-emerald-900/50 shadow-md ring-1 ring-emerald-400'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>بطاقة بنكية دولية</span>
                          <span className="text-[9px] bg-emerald-500/30 text-emerald-300 font-bold px-1 rounded">Visa / MC</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">دفع إلكتروني آمن بالدولار الأمريكي</p>
                      </div>
                    </div>

                    {/* Method 5: Cash on Arrival in USD */}
                    <div
                      onClick={() => setUsdMethod('cash_on_arrival_usd')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 sm:col-span-2 ${
                        usdMethod === 'cash_on_arrival_usd'
                          ? 'border-emerald-400 bg-emerald-900/50 shadow-md ring-1 ring-emerald-400'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>دفع نقدي بالدولار عند الوصول (USD Cash)</span>
                          <span className="text-[9px] bg-emerald-500/30 text-emerald-300 font-bold px-1 rounded">نقداً $</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">تثبيت الحجز بضمان سيران ودفع كامل المبلغ بالدولار عند استلام المفتاح</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Details for Selected USD Method */}
                  <div className="mt-2 p-3 bg-black/40 rounded-xl border border-white/10 text-xs space-y-2">
                    {usdMethod === 'al_haram_usd' && (
                      <div className="space-y-2">
                        <div className="text-[11px] text-slate-300 leading-relaxed bg-white/5 p-2 rounded-lg">
                          <p>📌 <strong>بيانات المستلم بدمشق (بالدولار):</strong> شركة سيران سوريا للسياحة (فرع المزة المركزي المعتمد)</p>
                          <p className="mt-0.5">📞 <strong>هاتف التأكيد المباشر:</strong> +963 933 112 233</p>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">رقم إشعار الحوالة بالدولار (رقم الوصل):</label>
                          <input
                            type="text"
                            value={transactionReference}
                            onChange={(e) => setTransactionReference(e.target.value)}
                            placeholder="مثال: وصل رقم 04-984421"
                            className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    )}

                    {usdMethod === 'western_union_usd' && (
                      <div className="space-y-2">
                        <div className="text-[11px] text-slate-300 leading-relaxed bg-white/5 p-2 rounded-lg">
                          <p>📌 <strong>اسم المستلم باللغة الإنجليزية:</strong> Seyran Syria Hospitality LLC</p>
                          <p className="mt-0.5">📍 <strong>المدينة والبلد:</strong> Damascus, Syrian Arab Republic</p>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">رقم الحوالة الدولي MTCN (10 أرقام):</label>
                          <input
                            type="text"
                            value={transactionReference}
                            onChange={(e) => setTransactionReference(e.target.value)}
                            placeholder="مثال: 123-456-7890"
                            className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400 font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    )}

                    {usdMethod === 'gcc_bank_transfer' && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setGccBankChoice('rajhi')}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold ${
                              gccBankChoice === 'rajhi' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            🇸🇦 مصرف الراجحي (USD)
                          </button>
                          <button
                            type="button"
                            onClick={() => setGccBankChoice('dib')}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold ${
                              gccBankChoice === 'dib' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            🇦🇪 بنك دبي الإسلامي (USD)
                          </button>
                        </div>
                        <div className="bg-slate-950 p-2 rounded-lg border border-cyan-500/40 flex items-center justify-between">
                          <code className="text-[11px] text-cyan-300 font-mono select-all" dir="ltr">
                            {gccBankChoice === 'rajhi' ? 'SA4480000492608010199999' : 'AE210240001099999999999'}
                          </code>
                          <button
                            type="button"
                            onClick={() => {
                              const iban = gccBankChoice === 'rajhi' ? 'SA4480000492608010199999' : 'AE210240001099999999999';
                              navigator.clipboard.writeText(iban);
                              setCopiedIban(true);
                              setTimeout(() => setCopiedIban(false), 2500);
                            }}
                            className="px-2 py-0.5 bg-cyan-600 text-white rounded text-[10px] font-bold"
                          >
                            {copiedIban ? 'تم النسخ!' : 'نسخ IBAN'}
                          </button>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">اسم صاحب الحساب ورقم الحوالة البنكية:</label>
                          <input
                            type="text"
                            value={transactionReference}
                            onChange={(e) => setTransactionReference(e.target.value)}
                            placeholder="مثال: مرجع الحوالة البنكية #88412"
                            className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                    )}

                    {usdMethod === 'intl_card' && (
                      <div className="space-y-2">
                        <div className="text-[11px] text-slate-300 leading-relaxed bg-white/5 p-2 rounded-lg flex items-center gap-2">
                          <Lock className="w-4 h-4 text-emerald-400" />
                          <span>بوابة دفع آمنة مشفرة بتقنية SSL 256-bit بالدولار الأمريكي ($ USD)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2">
                            <label className="block text-[11px] text-slate-300 mb-1">رقم البطاقة (Visa / MasterCard):</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4000 1234 5678 9010"
                              className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                              dir="ltr"
                              maxLength={19}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-300 mb-1">تاريخ الصلاحية:</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 font-mono text-center"
                              dir="ltr"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-300 mb-1">رمز الأمان (CVC):</label>
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              className="w-full bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 font-mono text-center"
                              dir="ltr"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {usdMethod === 'cash_on_arrival_usd' && (
                      <div className="space-y-1.5 text-emerald-300 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/30">
                        <p className="font-bold text-xs flex items-center gap-1.5 text-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          دفع كاش بالدولار الصافي عند الوصول ($ USD)
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          يتم تثبيت الحجز مسبقاً، وتدفع المبلغ الإجمالي بالكامل (${totalUsd} USD) نقداً بالدولار الأمريكي الصافي عند تسجيل الوصول ومطابقة الهوية أو جواز السفر.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* VIP Airport / Border Chauffeur Transfer Selector */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-800">
                  <input
                    type="checkbox"
                    checked={hasChauffeur}
                    onChange={(e) => setHasChauffeur(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>إضافة سيارة استقبال وتوصيل VIP خاصة (+25$)</span>
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  مرسيدس / هيونداي VIP
                </span>
              </div>

              {hasChauffeur && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs animate-fadeIn">
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">نقطة الاستقبال والالتقاء:</label>
                    <select
                      value={chauffeurLocation}
                      onChange={(e) => setChauffeurLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-slate-800"
                    >
                      <option value="مطار دمشق الدولي (صالة الوصول)">مطار دمشق الدولي (صالة الوصول)</option>
                      <option value="معبر جديدة يابوس / المصنع الحدودي">معبر جديدة يابوس / المصنع (حدود لبنان)</option>
                      <option value="معبر نصيب الحدودي (حدود الأردن)">معبر نصيب الحدودي (حدود الأردن)</option>
                      <option value="وسط مدينة دمشق (ساحة الأمويين)">وسط مدينة دمشق (ساحة الأمويين)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">وقت وصول الرحلة / الحضور:</label>
                    <input
                      type="text"
                      value={chauffeurTime}
                      onChange={(e) => setChauffeurTime(e.target.value)}
                      placeholder="مثال: الساعة 03:00 عصراً"
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>

                {/* Step 2 Navigation Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                  >
                    ➡️ السابق: بيانات الإقامة
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingStep(3)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-95"
                  >
                    التالي: الملخص والتأكيد ⬅️
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Final Summary, Syrian Escrow Guarantee & Instant Confirmation */}
            {bookingStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
            {/* Price Breakdown Summary (Booking.com style) */}
            <div className="bg-slate-100 rounded-2xl p-4 space-y-2 border border-slate-200">
              <div className="flex justify-between text-xs text-slate-600">
                <span>الغرفة / نوع الإقامة:</span>
                <span className="font-bold text-slate-800">
                  {activeRoom?.name || (bookingType === 'day_use' ? 'سيران نهاري' : `مبيت كامل (${nights} ليالٍ)`)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>المبلغ الأساسي:</span>
                <span className="font-semibold">${subtotalUsd}</span>
              </div>
              {weeklyDiscountUsd > 0 && (
                <div className="flex justify-between text-xs text-rose-600 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> خصم الإقامة الأسبوعية ({weeklyDiscountPercent}%):
                  </span>
                  <span>-${weeklyDiscountUsd}</span>
                </div>
              )}
              {geniusDiscountUsd > 0 && (
                <div className="flex justify-between text-xs text-blue-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-500 fill-amber-500" /> خصم برنامج الولاء Genius {geniusTier} ({geniusDiscountPercent}%):
                  </span>
                  <span>-${geniusDiscountUsd}</span>
                </div>
              )}
              {promoDiscountUsd > 0 && (
                <div className="flex justify-between text-xs text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3 h-3" /> كود الخصم ({appliedPromo?.code}):
                  </span>
                  <span>-${promoDiscountUsd}</span>
                </div>
              )}
              {hasChauffeur && (
                <div className="flex justify-between text-xs text-slate-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-slate-500" /> خدمة التوصيل VIP ({chauffeurLocation}):
                  </span>
                  <span className="font-bold text-slate-900">+$25</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-slate-600">
                <span>رسوم الخدمة والنظافة:</span>
                <span className="font-semibold text-emerald-700">مجاناً (ضمان سيران سوريا)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">الإجمالي الكلي للإقامة:</span>
                <div className="text-left" dir="ltr">
                  <div className="font-black text-emerald-800 text-lg">${totalUsd} USD</div>
                  <div className="text-xs text-slate-500 font-semibold" dir="rtl">يعادل: {totalSyp.toLocaleString('ar-SY')} ل.س</div>
                </div>
              </div>

              {/* Syrian Escrow Deposit Breakdown */}
              <div className="mt-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    عربون التثبيت المحول للمنصة (25%):
                  </span>
                  <div className="flex items-center gap-1.5" dir="ltr">
                    <span className="text-sm font-black text-emerald-700">${Math.round(totalUsd * 0.25)} USD</span>
                    <span className="text-xs text-slate-500 font-semibold" dir="rtl">({Math.round(totalSyp * 0.25).toLocaleString('ar-SY')} ل.س)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-slate-600 font-medium">
                  <span>المبلغ المتبقي يُدفع نقداً للمالك عند الوصول:</span>
                  <div className="flex items-center gap-1.5" dir="ltr">
                    <span className="font-bold text-slate-900">${totalUsd - Math.round(totalUsd * 0.25)} USD</span>
                    <span className="text-xs text-slate-500 font-semibold" dir="rtl">({Math.round(totalSyp * 0.75).toLocaleString('ar-SY')} ل.س)</span>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-800 bg-white/70 p-2 rounded-lg border border-emerald-100 leading-relaxed font-medium">
                  🛡️ <strong>ضمان سيران للأمان المالي:</strong> عربونك محفوظ في حساب الضمان لدى المنصة، ولا يُحول لصاحب المزرعة إلا بعد استلامك للمكان والتأكد من مطابقة الطاقة الشمسية والنظافة للصور.
                </div>
              </div>
            </div>


            {/* Submit & WhatsApp Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5 text-emerald-400" />
                <span>تأكيد الحجز وإصدار القسيمة الفندقية الرسمية</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 border border-emerald-400"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>تأكيد الحجز فورياً عبر واتساب (WhatsApp)</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingStep(2)}
                className="w-full py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors"
              >
                ➡️ العودة لتعديل وسيلة الدفع أو البيانات
              </button>
            </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};
