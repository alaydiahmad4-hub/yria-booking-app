import React, { useState, useMemo } from 'react';
import { Property, Governorate, PropertyType } from '../types';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Star, 
  SunMedium, 
  X, 
  Navigation, 
  Eye, 
  Calendar, 
  Compass, 
  Waves, 
  Hotel, 
  Home, 
  Building2, 
  Check, 
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import { SYRIAN_GOVERNORATES } from '../data/mockData';

interface InteractiveMapProps {
  properties: Property[];
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties }) => {
  const { 
    formatPrice, 
    setSelectedProperty, 
    setIsBookingOpen, 
    currency,
    selectedGovernorate,
    setSelectedGovernorate
  } = useApp();

  const [activePin, setActivePin] = useState<Property | null>(null);
  const [localGovFilter, setLocalGovFilter] = useState<Governorate | 'الكل'>('الكل');
  const [localTypeFilter, setLocalTypeFilter] = useState<PropertyType>('all');
  const [mapStyle, setMapStyle] = useState<'night' | 'terrain'>('night');

  // Filter properties for map display
  const mapFilteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (localGovFilter !== 'الكل' && p.governorate !== localGovFilter) return false;
      if (localTypeFilter !== 'all' && p.type !== localTypeFilter) {
        if (localTypeFilter === 'farm' && p.type === 'villa') return true;
        return false;
      }
      return true;
    });
  }, [properties, localGovFilter, localTypeFilter]);

  // Coordinate projection for Syrian territory
  // Lat: 32.5 (South) to 37.0 (North) -> Y axis
  // Lng: 35.5 (West/Mediterranean) to 39.0 (East) -> X axis
  const getPositionPercent = (lat: number, lng: number) => {
    const minLat = 32.6;
    const maxLat = 36.8;
    const minLng = 35.3;
    const maxLng = 38.8;

    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.max(8, Math.min(90, y))}%`,
      left: `${Math.max(6, Math.min(92, x))}%`,
    };
  };

  const getPinColor = (type: string, isSelected: boolean) => {
    if (isSelected) return 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110';
    switch (type) {
      case 'hotel':
        return 'bg-purple-600 text-white hover:bg-purple-500';
      case 'farm':
      case 'villa':
        return 'bg-emerald-600 text-white hover:bg-emerald-500';
      case 'chalet':
        return 'bg-cyan-600 text-white hover:bg-cyan-500';
      case 'apartment':
        return 'bg-blue-600 text-white hover:bg-blue-500';
      default:
        return 'bg-white text-slate-900 hover:bg-slate-100';
    }
  };

  const getPinIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Hotel className="w-3 h-3" />;
      case 'farm':
      case 'villa':
        return <Home className="w-3 h-3" />;
      case 'chalet':
        return <Waves className="w-3 h-3" />;
      case 'apartment':
        return <Building2 className="w-3 h-3" />;
      default:
        return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col" dir="rtl">
      
      {/* Map Control Bar (Governorates & Types) */}
      <div className="bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 border-b border-slate-800 z-20 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Governorate Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pl-1 whitespace-nowrap">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>المحافظة:</span>
          </span>
          <button
            onClick={() => setLocalGovFilter('الكل')}
            className={`text-xs font-black px-3 py-1 rounded-xl transition-all whitespace-nowrap ${
              localGovFilter === 'الكل'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            كل سوريا ({properties.length})
          </button>
          {SYRIAN_GOVERNORATES.map((gov) => {
            const count = properties.filter(p => p.governorate === gov).length;
            if (count === 0) return null;
            return (
              <button
                key={gov}
                onClick={() => setLocalGovFilter(gov)}
                className={`text-xs font-black px-2.5 py-1 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                  localGovFilter === gov
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{gov}</span>
                <span className={`text-[10px] px-1 rounded-full ${
                  localGovFilter === gov ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Property Type Toggles & Map Theme */}
        <div className="flex items-center gap-2 justify-between md:justify-end flex-wrap">
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setLocalTypeFilter('all')}
              className={`px-2 py-1 rounded-lg transition-all ${
                localTypeFilter === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setLocalTypeFilter('hotel')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                localTypeFilter === 'hotel' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Hotel className="w-3 h-3" />
              <span>فنادق</span>
            </button>
            <button
              onClick={() => setLocalTypeFilter('farm')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                localTypeFilter === 'farm' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3 h-3" />
              <span>مزارع</span>
            </button>
            <button
              onClick={() => setLocalTypeFilter('chalet')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                localTypeFilter === 'chalet' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Waves className="w-3 h-3" />
              <span>شاليهات</span>
            </button>
          </div>

          <button
            onClick={() => setMapStyle(mapStyle === 'night' ? 'terrain' : 'night')}
            className="text-[11px] font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-xl flex items-center gap-1"
            title="تبديل نمط الخريطة"
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>{mapStyle === 'night' ? 'النمط الجغرافي' : 'النمط الليلي'}</span>
          </button>
        </div>

      </div>

      {/* Map Canvas Area */}
      <div className={`relative w-full h-[640px] select-none transition-colors duration-500 ${
        mapStyle === 'night' 
          ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/50' 
          : 'bg-gradient-to-tr from-stone-900 via-slate-900 to-emerald-950/70'
      }`}>
        
        {/* Topographic Background Grids & Contours */}
        <svg className="w-full h-full absolute inset-0 opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="syria-map-grid" width="45" height="45" patternUnits="userSpaceOnUse">
              <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#10b981" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#syria-map-grid)" />
        </svg>

        {/* Geographic Zones & Landmarks Labels */}
        <div className="absolute top-14 right-10 text-cyan-400/50 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          🌊 البحر الأبيض المتوسط • الساحل السوري
        </div>
        <div className="absolute top-24 left-16 text-emerald-400/40 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          🏛️ حلب الشهباء وسهول الشمال
        </div>
        <div className="absolute top-1/2 right-24 text-teal-400/40 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          🌲 وادي النضارة • مشتى الحلو • صلنفة
        </div>
        <div className="absolute bottom-28 right-32 text-emerald-400/50 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          🌸 دمشق الفيحاء • غوطة دمشق • يعفور
        </div>
        <div className="absolute bottom-40 right-14 text-emerald-400/40 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          ⛰️ مصايف بلودان والزبداني وجبال القلمون
        </div>
        <div className="absolute bottom-12 right-24 text-amber-400/40 font-black text-xs sm:text-sm tracking-widest pointer-events-none">
          🍇 السويداء وجبل العرب وسهل حوران
        </div>

        {/* Floating Counter & Live Pulse */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white px-3.5 py-1.5 rounded-2xl text-xs flex items-center gap-2 shadow-xl">
          <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold">
            معروض {mapFilteredProperties.length} إقامة موثقة على الخريطة
          </span>
        </div>

        {/* Interactive Pins on Map */}
        {mapFilteredProperties.map((prop) => {
          const pos = getPositionPercent(prop.coordinates.lat, prop.coordinates.lng);
          const isSelected = activePin?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            >
              <button
                onClick={() => setActivePin(prop)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs shadow-xl transition-all hover:scale-115 active:scale-95 ${getPinColor(
                  prop.type,
                  isSelected
                )}`}
              >
                {getPinIcon(prop.type)}
                <span>{formatPrice(prop.priceUsd)}</span>
              </button>
            </div>
          );
        })}

        {/* Active Pin Detailed Preview Drawer (Airbnb / Booking style) */}
        {activePin && (
          <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-[420px] z-30 animate-fadeIn">
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-slate-100 flex flex-col gap-3 relative">
              <button
                onClick={() => setActivePin(null)}
                className="absolute top-3 left-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-10"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-3.5">
                <img
                  src={activePin.images[0]}
                  alt={activePin.title}
                  className="w-32 h-32 rounded-2xl object-cover flex-shrink-0 shadow-xs"
                />

                <div className="flex flex-col justify-between flex-1 py-0.5 text-right">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold mb-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{activePin.governorate} • {activePin.area}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">
                      {activePin.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {activePin.rating} ({activePin.reviewCount} تقييم)
                      </span>

                      {activePin.electricity.type === 'solar_24_7' && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <SunMedium className="w-2.5 h-2.5 text-amber-500" />
                          <span>طاقة 24/7</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="text-base font-black text-emerald-800 block">
                      {formatPrice(activePin.priceUsd)} <span className="text-[10px] font-normal text-slate-500">/ ليلة</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedProperty(activePin);
                    setIsBookingOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>احجز الآن مباشرة</span>
                </button>

                <button
                  onClick={() => setSelectedProperty(activePin)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>تفاصيل الإقامة</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
