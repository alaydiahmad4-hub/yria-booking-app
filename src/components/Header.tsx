import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Search, 
  Crown,
  Hotel,
  Compass,
  Map,
  WifiOff,
  Building2,
  Bell,
  Globe,
  User,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { SeyranBrandLogo } from './SeyranBrandLogo';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    currency, 
    setCurrency, 
    favorites, 
    setIsFavoritesModalOpen, 
    geniusTier,
    setIsGeniusModalOpen,
    activeTab,
    setActiveTab,
    properties,
    setIsOfflineModalOpen,
    offlineBookings,
    unreadNotificationCount,
    setIsNotificationOpen,
    currentUser,
    setIsAuthModalOpen,
    logout,
    isAdminMode,
    setIsAdminMode
  } = useApp();

  const damascusHotelsCount = properties.filter(p => p.governorate === 'دمشق' && p.type === 'hotel').length;

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0" 
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <SeyranBrandLogo variant="full" size="md" />
          </div>

          {/* Desktop Sub-pages Navigation Tabs (Large Screens) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 text-xs font-bold">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('nav.explore', 'الرئيسية والاستكشاف')}</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all relative ${
                activeTab === 'hotels'
                  ? 'bg-emerald-600 text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>{t('nav.hotels', 'فنادق دمشق')}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                activeTab === 'hotels' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {damascusHotelsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'map'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>{t('nav.map', 'الخريطة التفاعلية')}</span>
            </button>

            <button
              onClick={() => setActiveTab('host')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'host'
                  ? 'bg-emerald-700 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('nav.host', 'بوابة المضيفين')}</span>
            </button>
          </nav>

          {/* Actions & Controls — Streamlined on mobile to eliminate icon crowding */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Language Switcher (AR / EN) - Desktop & Tablet */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 text-[11px] sm:text-xs font-bold transition-all shadow-2xs"
              title={i18n.language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-black text-emerald-800">
                {i18n.language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Genius Loyalty Badge - Desktop & Tablet */}
            <button
              onClick={() => setIsGeniusModalOpen(true)}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-black shadow-xs hover:shadow-md transition-all flex-shrink-0"
              title="برنامج الولاء Genius"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Genius {geniusTier}</span>
            </button>

            {/* Currency 2-Way Segmented Toggle: USD ($) vs SYP (ل.س) — Always visible for instant price check */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 text-[11px] sm:text-xs font-bold flex-shrink-0 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currency === 'USD' 
                    ? 'bg-white text-emerald-800 shadow-xs font-black' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="عرض الأسعار بالدولار الأمريكي ($)"
              >
                <span className="hidden sm:inline">$ USD</span>
                <span className="sm:hidden font-black">$ دولار</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency('SYP')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currency === 'SYP' 
                    ? 'bg-emerald-600 text-white shadow-xs font-black' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="عرض الأسعار بالليرة السورية (ل.س)"
              >
                <span className="hidden sm:inline">ل.س SYP</span>
                <span className="sm:hidden font-black">ل.س</span>
              </button>
            </div>

            {/* Notification Center Bell */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              aria-label="مركز الإشعارات والتنبيهات المباشرة"
              className="relative p-2 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 transition-all flex-shrink-0 shadow-2xs"
              title="مركز الإشعارات والتنبيهات المباشرة"
            >
              <Bell className="w-4 h-4 text-emerald-800" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Offline Emergency Voucher Button - Desktop & Tablet (on mobile inside Quick Services sheet) */}
            <button
              onClick={() => setIsOfflineModalOpen(true)}
              aria-label="سند الطوارئ والحجوزات بدون إنترنت"
              className="hidden sm:flex relative p-2 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 transition-all flex-shrink-0 shadow-2xs"
              title="سند الطوارئ والحجوزات بدون إنترنت (Offline Mode)"
            >
              <WifiOff className="w-4 h-4 text-emerald-700" />
              {offlineBookings.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {offlineBookings.length}
                </span>
              )}
            </button>

            {/* Favorites Wishlist - Desktop & Tablet (on mobile directly in BottomNavBar) */}
            <button
              onClick={() => setIsFavoritesModalOpen(true)}
              aria-label="المفضلة"
              className="hidden sm:flex relative p-2 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 text-slate-700 transition-all flex-shrink-0 shadow-2xs"
              title="المفضلة"
            >
              <Heart className={`w-4 h-4 transition-colors ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') setIsAdminMode(!isAdminMode);
                    else if (currentUser.role === 'host') setActiveTab('host');
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white shadow-2xs font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                  title={`الحساب: ${currentUser.name}`}
                >
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="max-w-[70px] sm:max-w-[120px] truncate">{currentUser.name}</span>
                  {currentUser.role === 'admin' && (
                    <span className="text-[9px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black">مدير</span>
                  )}
                  {currentUser.role === 'host' && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-black">مضيف</span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-1 hover:text-rose-600 text-slate-500 rounded-lg hover:bg-rose-50 transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex-shrink-0"
                title="تسجيل الدخول أو إنشاء حساب"
              >
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
                <span className="sm:hidden">دخول</span>
              </button>
            )}

            {/* Host & Hotel Portal Button */}
            <button
              onClick={() => setActiveTab('host')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black shadow-md shadow-emerald-700/20 transition-all hover:shadow-lg active:scale-95 flex-shrink-0 border border-emerald-600/30"
              title="بوابة المضيفين وأصحاب الفنادق والمزارع"
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>{t('nav.host', 'بوابة المضيفين')}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
