import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SYP_PER_USD } from '../data/mockData';
import { 
  X, 
  Star, 
  MapPin, 
  SunMedium, 
  Droplets, 
  Wifi, 
  Waves, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Bed, 
  Bath, 
  Users, 
  CheckCircle2, 
  Heart,
  Share2,
  Clock,
  Sparkles,
  Tag,
  Ban,
  Maximize2,
  Calculator,
  Lock,
  Check,
  Car,
  BatteryCharging,
  Coffee,
  Gift,
  ChevronLeft,
  Building,
  Bot
} from 'lucide-react';

export const PropertyDetailsModal: React.FC = () => {
  const { 
    selectedProperty, 
    setSelectedProperty, 
    formatPrice, 
    currency,
    isFavorite, 
    toggleFavorite,
    setIsBookingOpen,
    setIsReviewsModalOpen,
    openLightbox,
    openSplitPayModal,
    freezePrice,
    isPriceFrozen,
    getFrozenPrice,
    setSelectedRoomId,
    openChatWithProperty
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [freezeSuccess, setFreezeSuccess] = useState(false);

  if (!selectedProperty) return null;

  const favorited = isFavorite(selectedProperty.id);
  const frozen = isPriceFrozen(selectedProperty.id);
  const currentPrice = frozen ? (getFrozenPrice(selectedProperty.id) ?? selectedProperty.priceUsd) : selectedProperty.priceUsd;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProperty.title,
        text: `شاهد هذا العقار على سيران سوريا: ${selectedProperty.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط العقار إلى الحافظة!');
    }
  };

  const openWhatsApp = () => {
    const cleanPhone = (selectedProperty.host.whatsapp || '963933112233').replace(/\D/g, '').replace(/^0/, '963');
    const text = encodeURIComponent(
      `مرحباً، أود الاستفسار عن حجز: "${selectedProperty.title}" في (${selectedProperty.area}). السعر: ${formatPrice(selectedProperty.priceUsd)}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleInAppChat = () => {
    openChatWithProperty(selectedProperty);
  };

  const handleFreezePrice = () => {
    freezePrice(selectedProperty.id, selectedProperty.priceUsd);
    setFreezeSuccess(true);
    setTimeout(() => setFreezeSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-lg sm:text-xl line-clamp-1">
              {selectedProperty.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title="مشاركة"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleFavorite(selectedProperty.id)}
              className="p-2 rounded-full hover:bg-rose-50 text-slate-600 transition-colors"
              title="المفضلة"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={() => setSelectedProperty(null)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              title="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Gallery */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 relative shadow-sm group">
              <img
                src={selectedProperty.images[activeImageIndex]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* Fullscreen Lightbox Trigger */}
              <button
                onClick={() => openLightbox(selectedProperty.images, activeImageIndex)}
                className="absolute top-3 left-3 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>عرض الألبوم بدقة كاملة ({selectedProperty.images.length} صور)</span>
              </button>

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                صورة {activeImageIndex + 1} من {selectedProperty.images.length}
              </div>

              {selectedProperty.discountWeeklyPercent && (
                <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>خصم {selectedProperty.discountWeeklyPercent}% عند حجز 7 ليالٍ أو أكثر</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Global Feature Action Bar: Split-Bill & Price Freeze */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            
            {/* Split Bill Calculator Action */}
            <button
              onClick={() => openSplitPayModal(selectedProperty)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs transition-all shadow-xs"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>احسب القطة مع الأصدقاء (Group Split)</span>
            </button>

            {/* 24h Price Freeze Action */}
            <button
              onClick={handleFreezePrice}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border font-bold text-xs transition-all shadow-xs ${
                frozen 
                  ? 'bg-blue-50 text-blue-800 border-blue-300' 
                  : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-200'
              }`}
            >
              {frozen ? (
                <>
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>السعر مجمّد لمدة 24 ساعة بمبلغ ${currentPrice}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>{freezeSuccess ? 'تم التجميد بنجاح!' : 'تجميد السعر 24 ساعة (Hopper Freeze)'}</span>
                </>
              )}
            </button>

          </div>

          {/* Quick Info & Ratings */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">{selectedProperty.area}</span>
                <span>({selectedProperty.governorate})</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {selectedProperty.bedrooms} غرف</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {selectedProperty.bathrooms} حمامات</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> تسع حتى {selectedProperty.maxGuests} ضيوف</span>
              </div>
            </div>

            {/* Airbnb Style Rating Button */}
            <button 
              onClick={() => setIsReviewsModalOpen(true)}
              className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 rounded-2xl border border-amber-200/80 transition-colors cursor-pointer group"
              title="اضغط لعرض التقييمات المفصلة"
            >
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div>
                <span className="font-extrabold text-slate-900 text-base">{selectedProperty.rating}</span>
                <span className="text-xs text-emerald-700 font-bold mr-1 underline group-hover:text-emerald-800">
                  ({selectedProperty.reviewCount} تقييم موثق)
                </span>
              </div>
            </button>
          </div>

          {/* Rental Modes: Day-Use vs Overnight */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">خيارات الإقامة المتاحة</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {selectedProperty.rentalType === 'both' && 'متاح للحجز: سيران نهاري (10 صباحاً إلى 8 مساءً) أو مبيت كامل 24 ساعة'}
                  {selectedProperty.rentalType === 'overnight' && 'متاح للإقامة والمبيت الكامل فقط'}
                  {selectedProperty.rentalType === 'day_use' && 'متاح للسيران النهاري فقط'}
                </div>
              </div>
            </div>
            {selectedProperty.dayUsePriceUsd && (
              <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                سعر السيران النهاري: <span className="text-emerald-700">{formatPrice(selectedProperty.dayUsePriceUsd)}</span>
              </div>
            )}
          </div>

          {/* Syrian Vital Guarantees Highlight Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 p-4 rounded-2xl border border-emerald-100">
            
            {/* Electricity guarantee */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <SunMedium className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">الكهرباء والطاقة</div>
                <div className="text-xs text-slate-600 mt-0.5">{selectedProperty.electricity.label}</div>
                {selectedProperty.electricity.hasAirConditioningOnSolar && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    المكيفات تعمل 24/7
                  </span>
                )}
              </div>
            </div>

            {/* Water reserve */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">أمن المياه والمسابح</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {selectedProperty.hasWaterReserve ? 'خزانات مياه ومضخة 24/7' : 'مياه شبكة متوفرة'}
                </div>
                {selectedProperty.hasPool && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-cyan-700 bg-cyan-100/70 px-2 py-0.5 rounded-full">
                    مسبح مفلتر ومعقم
                  </span>
                )}
              </div>
            </div>

            {/* Escrow Guarantee */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">ضمانة سيران سوريا</div>
                <div className="text-xs text-slate-600 mt-0.5">عربون أمانة 25% محمي حتى الوصول والمطابقة</div>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  100% موثوق
                </span>
              </div>
            </div>

          </div>

          {/* VIP Chauffeur Transfer Option Banner */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-white">خدمة استقبال ونقل VIP خاصة (Concierge Chauffeur)</h5>
                <p className="text-[11px] text-slate-300">
                  توصيل فاخر من مطار دمشق الدولي أو نقطة المصنع / جديدة يابوس مباشرة إلى باب الشاليه.
                </p>
              </div>
            </div>
            <span className="text-[11px] bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg">
              متاح بالحجز
            </span>
          </div>

          {/* Special Syrian Market Features Badges */}
          {selectedProperty.specialSyrianFeatures && (
            <div className="flex items-center gap-2 flex-wrap">
              {selectedProperty.specialSyrianFeatures.isExpatFamilyGiftRecommended && (
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-black">
                  <Gift className="w-3.5 h-3.5 text-amber-600" />
                  <span>مثالي لإهداء الأهل في سوريا (خدمة المغتربين)</span>
                </div>
              )}
              {selectedProperty.specialSyrianFeatures.isDayUseBbqIdeal && (
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full text-xs font-black">
                  <span>🥩</span>
                  <span>موصى به للسيران النهاري والمشاوي العائلية</span>
                </div>
              )}
              {selectedProperty.specialSyrianFeatures.isMedicalEmbassyNear && (
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-full text-xs font-black">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span>موقع استراتيجي قرب المشافي والسفارات</span>
                </div>
              )}
              {selectedProperty.specialSyrianFeatures.isHoneymoonSpecial && (
                <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-900 border border-rose-200 px-3 py-1 rounded-full text-xs font-black">
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                  <span>باقة العرسان وشهر العسل وقصور الشام</span>
                </div>
              )}
              {selectedProperty.specialSyrianFeatures.isRemoteWorkHub && (
                <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1 rounded-full text-xs font-black">
                  <Wifi className="w-3.5 h-3.5 text-purple-600" />
                  <span>مجهز للعمل عن بعد والإنترنت فايبر 24/7</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-base">عن هذا العقار وتفاصيل الإقامة</h4>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                {selectedProperty.description}
              </p>
            </div>
          </div>

          {/* Dedicated Hotel Room Gallery & Live Price Cards (Added as requested) */}
          {selectedProperty.roomOptions && selectedProperty.roomOptions.length > 0 && (
            <div className="space-y-3.5 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      خيارات وأسعار الغرف والأجنحة الفندقية المعتمدة
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      صور واقعية وتفاصيل الأسعار الرسمية بالدولار الأمريكي والليرة السورية
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-black px-2.5 py-1 rounded-full">
                    {selectedProperty.roomOptions.length} فئات غرف متاحة
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full">
                    1 USD = {SYP_PER_USD.toLocaleString('ar-SY')} ل.س
                  </span>
                </div>
              </div>

              {/* Room Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {selectedProperty.roomOptions.map((room) => {
                  const sypPrice = Math.round(room.pricePerNightUsd * SYP_PER_USD);
                  const roomImg = room.image || selectedProperty.images[0];

                  return (
                    <div 
                      key={room.id}
                      className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Room Image with Lightbox and Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openLightbox([roomImg])}>
                        <img 
                          src={roomImg} 
                          alt={room.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-xs font-bold flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5" /> تكبير الصورة
                          </span>
                        </div>
                        {room.freeBreakfast && (
                          <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                            <Coffee className="w-2.5 h-2.5" /> إفطار مشمول
                          </span>
                        )}
                        {room.availableRoomsCount <= 3 && (
                          <span className="absolute bottom-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
                            متبقي {room.availableRoomsCount} غرف فقط
                          </span>
                        )}
                      </div>

                      {/* Room Body */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                            {room.name}
                          </h5>
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-700">{room.bedType}</span>
                            <span>•</span>
                            <span>تستوعب {room.maxGuests} ضيوف</span>
                            {room.viewType && (
                              <>
                                <span>•</span>
                                <span className="text-cyan-700 font-bold">{room.viewType}</span>
                              </>
                            )}
                          </div>

                          {/* Room Amenities Pills */}
                          <div className="flex items-center gap-1 flex-wrap mt-2">
                            {room.amenities.map((amenity, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Room Price & Direct Booking Trigger */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-base sm:text-lg font-black text-emerald-800">
                                ${room.pricePerNightUsd}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">/ ليلة</span>
                            </div>
                            <div className="text-[10px] font-black text-slate-600">
                              ≈ {sypPrice.toLocaleString('ar-SY')} ل.س
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedRoomId(room.id);
                              setIsBookingOpen(true);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-[11px] sm:text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>احجز هذه الغرفة</span>
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Amenities Grid */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3">ما يقدمه هذا المكان من خدمات</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {selectedProperty.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Card with Direct WhatsApp Contact */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                {selectedProperty.host.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <span>المضيف: {selectedProperty.host.name}</span>
                  {selectedProperty.host.isSuperhost && (
                    <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      مضيف متميز
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  معدل الاستجابة: {selectedProperty.host.responseRate}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleInAppChat}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                title="محادثة فورية مع مستشار سيران والمضيف داخل التطبيق"
              >
                <Bot className="w-4 h-4" />
                <span>محادثة فورية بالتطبيق</span>
              </button>
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-1.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs"
                title="محادثة عبر تطبيق واتساب"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>واتساب</span>
              </button>
              <a
                href={`tel:${selectedProperty.host.phone}`}
                className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                title="اتصال هاتفي"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Booking Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-800">
                {formatPrice(currentPrice)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ ليلة</span>
              {frozen && (
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded mr-1">
                  مجمّد 24h
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              تثبيت فوري وإمكانية الدفع عبر سيريتل كاش أو عند الوصول
            </div>
          </div>

          <button
            onClick={() => {
              setIsBookingOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 sm:px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-95"
          >
            متابعة الحجز
          </button>
        </div>

      </div>
    </div>
  );
};
