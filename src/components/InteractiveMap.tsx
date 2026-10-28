import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Star, SunMedium, X, Navigation, Eye } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties }) => {
  const { formatPrice, setSelectedProperty } = useApp();
  const [activePin, setActivePin] = useState<Property | null>(null);

  // Approximate relative mapping for Syrian coordinates to 0-100% SVG box
  // Lat: 32.5 (South) to 37.0 (North) -> Y axis
  // Lng: 35.5 (West/Mediterranean) to 39.0 (East) -> X axis
  const getPositionPercent = (lat: number, lng: number) => {
    const minLat = 32.8;
    const maxLat = 36.6;
    const minLng = 35.5;
    const maxLng = 38.0;

    // Invert Y because SVG/CSS 0 is at top
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.max(10, Math.min(88, y))}%`,
      left: `${Math.max(8, Math.min(90, x))}%`,
    };
  };

  return (
    <div className="relative w-full h-[620px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      
      {/* Map Background with Syrian Regional Contours */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/40">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Syrian Geographic Regions Overlay Labels */}
        <div className="absolute top-12 left-12 text-cyan-400/40 font-black text-sm tracking-widest select-none pointer-events-none">
          البحر الأبيض المتوسط (الساحل)
        </div>
        <div className="absolute top-16 right-16 text-emerald-400/30 font-black text-sm tracking-widest select-none pointer-events-none">
          حلب والشهباء
        </div>
        <div className="absolute top-1/2 left-28 text-emerald-400/30 font-black text-sm tracking-widest select-none pointer-events-none">
          حمص ووادي النضارة ومشتى الحلو
        </div>
        <div className="absolute bottom-20 left-32 text-emerald-400/40 font-black text-sm tracking-widest select-none pointer-events-none">
          دمشق وريفها (يعفور • بلودان • صحنايا)
        </div>
      </div>

      {/* Floating Info Pill */}
      <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-4 py-2 rounded-2xl text-xs flex items-center gap-2 shadow-lg">
        <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="font-bold">خريطة سيران التفاعلية: اضغط على أي سعر للاستعراض</span>
      </div>

      {/* Pins on the Map */}
      {properties.map((prop) => {
        const pos = getPositionPercent(prop.coordinates.lat, prop.coordinates.lng);
        const isSelected = activePin?.id === prop.id;

        return (
          <div
            key={prop.id}
            style={{ top: pos.top, left: pos.left }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          >
            {/* Price Pill Button */}
            <button
              onClick={() => setActivePin(prop)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-black text-xs shadow-xl transition-all hover:scale-110 active:scale-95 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 scale-110 ring-4 ring-emerald-400/40'
                  : 'bg-white text-slate-900 hover:bg-emerald-50'
              }`}
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{formatPrice(prop.priceUsd)}</span>
            </button>
          </div>
        );
      })}

      {/* Active Pin Property Preview Card (Airbnb Style) */}
      {activePin && (
        <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-96 z-30 animate-fadeIn">
          <div className="bg-white rounded-3xl p-3.5 shadow-2xl border border-slate-100 flex gap-3.5 relative">
            <button
              onClick={() => setActivePin(null)}
              className="absolute top-2 left-2 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={activePin.images[0]}
              alt={activePin.title}
              className="w-28 h-28 rounded-2xl object-cover flex-shrink-0"
            />

            <div className="flex flex-col justify-between flex-1 py-0.5">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold mb-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{activePin.area}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                  {activePin.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {activePin.rating} ({activePin.reviewCount})
                  </span>
                  {activePin.electricity.type === 'solar_24_7' && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <SunMedium className="w-2.5 h-2.5 text-amber-500" />
                      طاقة 24/7
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="font-black text-emerald-700 text-sm">
                  {formatPrice(activePin.priceUsd)} <span className="text-[10px] font-normal text-slate-500">/ ليلة</span>
                </span>
                <button
                  onClick={() => setSelectedProperty(activePin)}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>عرض</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
