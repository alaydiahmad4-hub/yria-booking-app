import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Hotel, 
  Map, 
  Heart, 
  Crown,
  Building2,
  WifiOff
} from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    favorites, 
    setIsFavoritesModalOpen,
    setIsAddPropertyOpen,
    setIsOfflineModalOpen,
    offlineBookings,
    properties
  } = useApp();

  const damascusHotelsCount = properties.filter(p => p.governorate === 'دمشق' && p.type === 'hotel').length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Tab 1: Explore / Home */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'explore'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeTab === 'explore' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5">استكشاف</span>
          {activeTab === 'explore' && (
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>
          )}
        </button>

        {/* Tab 2: Damascus Hotels */}
        <button
          onClick={() => setActiveTab('hotels')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'hotels'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Hotel className={`w-5 h-5 ${activeTab === 'hotels' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black px-1 rounded-full shadow-2xs">
              {damascusHotelsCount}
            </span>
          </div>
          <span className="text-[10px] mt-0.5">فنادق دمشق</span>
          {activeTab === 'hotels' && (
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>
          )}
        </button>

        {/* Tab 3: Host & Hotel Portal (Direct Mobile Access) */}
        <button
          onClick={() => setIsAddPropertyOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative text-emerald-800 hover:text-emerald-950 font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-4 h-4 text-amber-300" />
          </div>
          <span className="text-[9px] mt-0.5 font-black text-emerald-800">بوابة المضيف</span>
        </button>

        {/* Tab 4: Offline Resilient & Emergency Voucher */}
        <button
          onClick={() => setIsOfflineModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative text-slate-500 hover:text-slate-900 font-medium"
        >
          <div className="relative">
            <WifiOff className="w-5 h-5 text-slate-600 hover:text-emerald-700" />
            {offlineBookings.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                {offlineBookings.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">أوفلاين</span>
        </button>

        {/* Tab 5: Favorites */}
        <button
          onClick={() => setIsFavoritesModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative text-slate-500 hover:text-slate-900 font-medium"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">المفضلة</span>
        </button>

      </div>
    </div>
  );
};
