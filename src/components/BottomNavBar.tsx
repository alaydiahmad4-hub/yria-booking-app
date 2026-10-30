import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Hotel, 
  Map, 
  Heart, 
  Crown,
  Building2,
  WifiOff,
  User,
  Globe,
  X,
  LogOut,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { i18n } = useTranslation();
  const { 
    activeTab, 
    setActiveTab, 
    favorites, 
    setIsFavoritesModalOpen,
    setIsOfflineModalOpen,
    offlineBookings,
    properties,
    currentUser,
    setIsAuthModalOpen,
    logout,
    geniusTier,
    setIsGeniusModalOpen,
    isAdminMode,
    setIsAdminMode
  } = useApp();

  const [isServicesSheetOpen, setIsServicesSheetOpen] = useState(false);

  const damascusHotelsCount = properties.filter(p => p.governorate === 'دمشق' && p.type === 'hotel').length;

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
    setIsServicesSheetOpen(false);
  };

  return (
    <>
      {/* Mobile Quick Services & Account Slide-Up Sheet */}
      {isServicesSheetOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end justify-center animate-fadeIn"
          onClick={() => setIsServicesSheetOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl p-5 pb-8 shadow-2xl border-t border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    {currentUser ? `مرحباً، ${currentUser.name}` : 'حسابي وخدمات سيران'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {currentUser ? 'إدارة الحساب والحجوزات والخدمات السريعة' : 'وصول سريع لكافة خدمات المسافر والمضيف'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsServicesSheetOpen(false)}
                aria-label="إغلاق القائمة"
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Account Action */}
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    الصفة: {currentUser.role === 'admin' ? 'مدير النظام' : currentUser.role === 'host' ? 'مضيف معتمد' : 'مسافر موثق'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setIsAdminMode(!isAdminMode);
                        setIsServicesSheetOpen(false);
                      }}
                      className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl"
                    >
                      لوحة الإدارة
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsServicesSheetOpen(false);
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>خروج</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsServicesSheetOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black py-3 px-4 rounded-2xl text-xs flex items-center justify-between shadow-md shadow-emerald-600/20"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>تسجيل الدخول أو إنشاء حساب مجاني</span>
                </span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Quick Services Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Service 1: Offline Emergency Vouchers */}
              <button
                onClick={() => {
                  setIsServicesSheetOpen(false);
                  setIsOfflineModalOpen(true);
                }}
                className="flex flex-col items-start p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 transition-all text-right"
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <WifiOff className="w-4 h-4 text-emerald-700" />
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {offlineBookings.length} محفوظ
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xs">سندات بدون إنترنت</span>
                <span className="text-[10px] text-slate-500 mt-0.5">حجوزات الطوارئ والـ QR</span>
              </button>

              {/* Service 2: Damascus Heritage Hotels */}
              <button
                onClick={() => {
                  setIsServicesSheetOpen(false);
                  setActiveTab('hotels');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-start p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 transition-all text-right"
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Hotel className="w-4 h-4 text-amber-600" />
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {damascusHotelsCount} فنادق
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xs">فنادق دمشق العريقة</span>
                <span className="text-[10px] text-slate-500 mt-0.5">قصور دمشق وفنادق 5 نجوم</span>
              </button>

              {/* Service 3: Host Portal */}
              <button
                onClick={() => {
                  setIsServicesSheetOpen(false);
                  setActiveTab('host');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-start p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 transition-all text-right"
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span className="bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    للملّاك
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xs">بوابة المضيفين</span>
                <span className="text-[10px] text-slate-500 mt-0.5">أضف مزرعتك أو فندقك</span>
              </button>

              {/* Service 4: Genius Loyalty */}
              <button
                onClick={() => {
                  setIsServicesSheetOpen(false);
                  setIsGeniusModalOpen(true);
                }}
                className="flex flex-col items-start p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-50 border border-blue-200/70 transition-all text-right"
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <Crown className="w-4 h-4 text-blue-600 fill-amber-400" />
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    المستوى {geniusTier}
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-xs">مكافآت Genius</span>
                <span className="text-[10px] text-slate-500 mt-0.5">خصومات حتى 20% ومزايا</span>
              </button>
            </div>

            {/* Language Toggle Bar */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>لغة العرض في التطبيق</span>
              </span>
              <span className="bg-white px-3 py-1 rounded-xl font-black text-emerald-800 shadow-2xs border border-slate-200">
                {i18n.language === 'ar' ? 'التحويل إلى English' : 'التحويل إلى العربية'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Clean 4-Tab Mobile Bottom Navigation Bar */}
      <nav aria-label="التنقل السفلي" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl px-3 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom,0px))] transition-all">
        <div className="grid grid-cols-4 max-w-md mx-auto">
          
          {/* Tab 1: Explore / Home */}
          <button
            onClick={() => {
              setIsServicesSheetOpen(false);
              setActiveTab('explore');
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              activeTab === 'explore' && !isServicesSheetOpen
                ? 'text-emerald-700 font-black'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Compass className={`w-5 h-5 ${activeTab === 'explore' && !isServicesSheetOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[11px] mt-0.5">استكشاف</span>
            {activeTab === 'explore' && !isServicesSheetOpen && (
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>
            )}
          </button>

          {/* Tab 2: Interactive Map */}
          <button
            onClick={() => {
              setIsServicesSheetOpen(false);
              setActiveTab('map');
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              activeTab === 'map' && !isServicesSheetOpen
                ? 'text-emerald-700 font-black'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Map className={`w-5 h-5 ${activeTab === 'map' && !isServicesSheetOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[11px] mt-0.5">الخريطة</span>
            {activeTab === 'map' && !isServicesSheetOpen && (
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>
            )}
          </button>

          {/* Tab 3: Favorites */}
          <button
            onClick={() => {
              setIsServicesSheetOpen(false);
              setIsFavoritesModalOpen(true);
            }}
            className="flex flex-col items-center justify-center py-1 rounded-xl transition-all relative text-slate-500 hover:text-slate-900 font-medium"
          >
            <div className="relative">
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5">المفضلة</span>
          </button>

          {/* Tab 4: Account & Quick Services (Includes Offline, Damascus Hotels, Host Portal, Genius) */}
          <button
            onClick={() => setIsServicesSheetOpen(!isServicesSheetOpen)}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              isServicesSheetOpen || activeTab === 'host' || activeTab === 'hotels'
                ? 'text-emerald-700 font-black'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <div className="relative">
              <User className={`w-5 h-5 ${isServicesSheetOpen || activeTab === 'host' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {offlineBookings.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                  {offlineBookings.length}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5">حسابي وخدماتي</span>
            {(isServicesSheetOpen || activeTab === 'host' || activeTab === 'hotels') && (
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
