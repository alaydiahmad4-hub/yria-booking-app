import React from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Star, 
  MapPin, 
  SunMedium, 
  Users, 
  Bed, 
  Zap, 
  Clock, 
  Coffee, 
  ShieldCheck,
  Lock,
  BatteryCharging
} from 'lucide-react';

import { SYP_PER_USD } from '../data/mockData';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { 
    formatPrice, 
    currency,
    isFavorite, 
    toggleFavorite, 
    setSelectedProperty, 
    setIsReviewsModalOpen,
    isPriceFrozen,
    getFrozenPrice
  } = useApp();

  const favorited = isFavorite(property.id);
  const frozen = isPriceFrozen(property.id);
  const effectivePrice = frozen ? (getFrozenPrice(property.id) ?? property.priceUsd) : property.priceUsd;

  const getTypeText = (type: Property['type']) => {
    switch(type) {
      case 'farm': return 'مزرعة واستراحة';
      case 'chalet': return 'شاليه بحري';
      case 'apartment': return 'شقة مفروشة';
      case 'villa': return 'فيلا وكوخ جبلي';
      case 'hotel': return 'جناح فندقي';
      default: return 'إقامة';
    }
  };

  return (
    <div 
      onClick={() => setSelectedProperty(property)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-emerald-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Thumbnail & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Favorite Wishlist Button (Single Clean Control) */}
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className="p-2.5 rounded-full bg-white/85 backdrop-blur-md hover:bg-white text-slate-700 transition-all hover:scale-110 shadow-sm"
            title="حفظ في المفضلة"
          >
            <Heart className={`w-4 h-4 transition-colors ${favorited ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
          </button>
        </div>

        {/* Property Type & Instant Booking Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <span className="bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-white/10">
            {getTypeText(property.type)}
          </span>
          {property.instantBooking && (
            <span className="bg-amber-500/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-0.5 border border-amber-300/30">
              <Zap className="w-3 h-3 fill-white" />
              حجز فوري
            </span>
          )}
        </div>

        {/* Clean Single Energy / Verification Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          {property.energyMetrics ? (
            <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-amber-400/30 shadow-sm">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              <span>{property.energyMetrics.batteryPercent}% بطارية شمسية</span>
            </span>
          ) : property.electricity.type === 'solar_24_7' ? (
            <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/30 shadow-sm">
              <SunMedium className="w-3.5 h-3.5 text-amber-400" />
              <span>طاقة 24/7</span>
            </span>
          ) : (
            <span className="bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/30 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>مفحوص ميدانياً</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 gap-1.5">
            <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100/90 px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate max-w-[170px] sm:max-w-[210px]">{property.area}</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(property);
                setIsReviewsModalOpen(true);
              }}
              className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-xl border border-amber-200/50 transition-colors flex-shrink-0"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{property.rating} ({property.reviewCount})</span>
            </button>
          </div>

          {/* Hotel Stars & Highlights */}
          {property.hotelStars && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-400 text-xs tracking-wider">
                {'★'.repeat(property.hotelStars)}
              </span>
              <span className="text-[11px] font-bold text-slate-600">
                فندق {property.hotelStars} نجوم
              </span>
              {property.hasFreeBreakfast && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Coffee className="w-3 h-3 text-emerald-600" />
                  إفطار مجاني
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {property.title}
          </h3>

          {/* Quick Specs */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              {property.bedrooms} غرف
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              حتى {property.maxGuests} ضيوف
            </span>
            {property.rentalType === 'both' && (
              <>
                <span>•</span>
                <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  نهاري / مبيت
                </span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <div className="text-emerald-800 font-black text-base sm:text-lg">
                {formatPrice(effectivePrice)}
                <span className="text-xs font-normal text-slate-500 mr-1">/ ليلة</span>
              </div>
              {frozen && (
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" />
                  مجمّد 24h
                </span>
              )}
            </div>

            {/* Approximate Dual Price (USD vs SYP) */}
            <div className="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-1">
              <span>(تقريباً:</span>
              <span className="text-emerald-700 font-extrabold">
                {currency === 'USD' 
                  ? `${Math.round(effectivePrice * SYP_PER_USD).toLocaleString('ar-SY')} ل.س`
                  : `$${effectivePrice} USD`
                }
              </span>
              <span>)</span>
            </div>

            {property.dayUsePriceUsd && (
              <div className="text-[10px] text-amber-800 font-bold mt-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 inline-flex items-center gap-1 w-fit">
                <Clock className="w-2.5 h-2.5 text-amber-600" />
                <span>نهاري: {formatPrice(property.dayUsePriceUsd)}</span>
                <span className="text-slate-500 font-normal">
                  (≈ {currency === 'USD' 
                    ? `${Math.round(property.dayUsePriceUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س` 
                    : `$${property.dayUsePriceUsd}`})
                </span>
              </div>
            )}
          </div>

          <button 
            className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-extrabold transition-all shadow-xs"
          >
            عرض وحجز
          </button>
        </div>

      </div>
    </div>
  );
};
