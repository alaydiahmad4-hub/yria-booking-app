import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Trash2, ArrowLeft } from 'lucide-react';

export const FavoritesModal: React.FC = () => {
  const { 
    isFavoritesModalOpen, 
    setIsFavoritesModalOpen, 
    favorites, 
    properties, 
    toggleFavorite,
    setSelectedProperty,
    formatPrice 
  } = useApp();

  if (!isFavoritesModalOpen) return null;

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-slate-900 text-lg">قائمة رغباتك والمفضلة</h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
              {favoriteProperties.length}
            </span>
          </div>
          <button
            onClick={() => setIsFavoritesModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Heart className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-semibold">لم تقم بإضافة أي عقار إلى المفضلة بعد.</p>
              <p className="text-xs">اضغط على أيقونة القلب على أي شاليه أو مزرعة لحفظها هنا.</p>
            </div>
          ) : (
            favoriteProperties.map(property => (
              <div
                key={property.id}
                className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedProperty(property);
                  setIsFavoritesModalOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {property.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {property.area}
                    </p>
                    <p className="text-xs font-black text-emerald-700 mt-1">
                      {formatPrice(property.priceUsd)} / ليلة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="إزالة من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 hover:bg-emerald-200 px-3 py-2 rounded-xl transition-colors">
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
