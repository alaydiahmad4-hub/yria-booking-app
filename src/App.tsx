import React, { Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { CategoryBar } from './components/CategoryBar';
import { PropertyCard } from './components/PropertyCard';
import { DamascusHotelsSection } from './components/DamascusHotelsSection';
import { BottomNavBar } from './components/BottomNavBar';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { BookingModal } from './components/BookingModal';
import { HostModal } from './components/HostModal';
import { FavoritesModal } from './components/FavoritesModal';
import { AdvancedFilterModal } from './components/AdvancedFilterModal';
import { ReviewsModal } from './components/ReviewsModal';
import { ComparisonModal } from './components/ComparisonModal';
import { VoucherModal } from './components/VoucherModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { SplitBillModal } from './components/SplitBillModal';
import { GeniusLoyaltyModal } from './components/GeniusLoyaltyModal';
import { BrandHeritageModal } from './components/BrandHeritageModal';
import { Footer } from './components/Footer';
import { SyrianSectionsGrid } from './components/SyrianSectionsGrid';
import { SyrianMarketShowcase } from './components/SyrianMarketShowcase';
import { SyrianMarketNeedsModal } from './components/SyrianMarketNeedsModal';
import { OfflineEmergencyModal } from './components/OfflineEmergencyModal';
import { AuthModal } from './components/AuthModal';
import { WhatsAppSupportFAB } from './components/WhatsAppSupportFAB';
import { useApp } from './context/AppContext';
import { 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  Hotel, 
  ArrowLeft, 
  Building2, 
  Award,
  ChevronLeft
} from 'lucide-react';

// Skeletons for Shimmer Fallbacks
import { HostPortalSkeleton } from './components/skeletons/HostPortalSkeleton';
import { NotificationCenterSkeleton } from './components/skeletons/NotificationCenterSkeleton';
import { SmsConfirmationSkeleton } from './components/skeletons/SmsConfirmationSkeleton';
import { InteractiveMapSkeleton } from './components/skeletons/InteractiveMapSkeleton';
import { ModalFallbackSkeleton } from './components/skeletons/ModalFallbackSkeleton';

// Lazy Loaded Heavy UI Components (with explicit named export mappings)
const HostPortalPage = lazy(() => import('./components/HostPortalPage').then(m => ({ default: m.HostPortalPage })));
const NotificationCenterModal = lazy(() => import('./components/NotificationCenterModal').then(m => ({ default: m.NotificationCenterModal })));
const SmsConfirmationModal = lazy(() => import('./components/SmsConfirmationModal').then(m => ({ default: m.SmsConfirmationModal })));
const InteractiveMap = lazy(() => import('./components/InteractiveMap').then(m => ({ default: m.InteractiveMap })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

export const MainContent: React.FC = () => {
  const { 
    properties, 
    viewMode,
    selectedGovernorate, 
    selectedType, 
    searchQuery, 
    onlySolar, 
    onlyPool, 
    onlySuperhost, 
    advancedFilters,
    setSelectedGovernorate,
    setSelectedType,
    setSearchQuery,
    setOnlySolar,
    setOnlyPool,
    setOnlySuperhost,
    setAdvancedFilters,
    isAdminMode,
    activeTab,
    setActiveTab,
    syrianSpecialCategory,
    setSyrianSpecialCategory
  } = useApp();

  // Damascus hotels subset for featured banner
  const damascusHotels = properties.filter(p => p.governorate === 'دمشق' && p.type === 'hotel');

  // Filter listings
  const filteredProperties = properties.filter((prop) => {
    // Governorate filter
    if (selectedGovernorate !== 'الكل' && prop.governorate !== selectedGovernorate) {
      return false;
    }

    // Property Type filter
    if (selectedType === 'farm') {
      if (prop.type !== 'farm' && prop.type !== 'villa') return false;
    } else if (selectedType !== 'all' && prop.type !== selectedType) {
      return false;
    }

    // Syrian Market Special Categories filter
    if (syrianSpecialCategory === 'expat_family') {
      const isExpatEligible = 
        prop.specialSyrianFeatures?.isExpatFamilyGiftRecommended || 
        (prop.hotelStars && prop.hotelStars >= 4) || 
        prop.type === 'villa' || 
        (prop.type === 'chalet' && prop.priceUsd >= 70);
      if (!isExpatEligible) return false;
    } else if (syrianSpecialCategory === 'day_use') {
      const isDayUseEligible = 
        prop.rentalType === 'day_use' || 
        prop.rentalType === 'both' || 
        prop.specialSyrianFeatures?.isDayUseBbqIdeal || 
        Boolean(prop.dayUsePriceUsd);
      if (!isDayUseEligible) return false;
    } else if (syrianSpecialCategory === 'medical_embassy') {
      const isCentralDamascus = prop.governorate === 'دمشق' && (
        prop.area.includes('المزة') || 
        prop.area.includes('الصالحية') || 
        prop.area.includes('الشعلان') || 
        prop.area.includes('الأمويين') || 
        prop.area.includes('أبو رمانة') || 
        prop.area.includes('كفرسوسة')
      );
      if (!prop.specialSyrianFeatures?.isMedicalEmbassyNear && !isCentralDamascus) return false;
    } else if (syrianSpecialCategory === 'honeymoon') {
      const isHeritageRomance = 
        prop.specialSyrianFeatures?.isHoneymoonSpecial ||
        prop.title.includes('التراثي') || 
        prop.title.includes('بيت') || 
        prop.title.includes('قصر') || 
        prop.area.includes('بلودان') || 
        prop.area.includes('مشتى الحلو') || 
        prop.hotelStars === 5;
      if (!isHeritageRomance) return false;
    } else if (syrianSpecialCategory === 'remote_work') {
      const isWorkReady = 
        prop.specialSyrianFeatures?.isRemoteWorkHub || 
        (prop.hasWifi && prop.electricity.type === 'solar_24_7');
      if (!isWorkReady) return false;
    }

    // Solar filter
    if (onlySolar && prop.electricity.type !== 'solar_24_7') {
      return false;
    }

    // Pool filter
    if (onlyPool && !prop.hasPool) {
      return false;
    }

    // Superhost filter
    if (onlySuperhost && !prop.host.isSuperhost) {
      return false;
    }

    // Advanced Global Filters
    if (prop.priceUsd < advancedFilters.minPrice || prop.priceUsd > advancedFilters.maxPrice) {
      return false;
    }

    if (advancedFilters.rentalType === 'day_use' && prop.rentalType !== 'day_use' && prop.rentalType !== 'both') {
      return false;
    }

    if (advancedFilters.rentalType === 'overnight' && prop.rentalType !== 'overnight' && prop.rentalType !== 'both') {
      return false;
    }

    if (advancedFilters.familiesOnly && !prop.houseRules?.familiesOnly) {
      return false;
    }

    if (advancedFilters.partiesAllowed && !prop.houseRules?.partiesAllowed) {
      return false;
    }

    if (advancedFilters.instantBookingOnly && !prop.instantBooking) {
      return false;
    }

    if (advancedFilters.poolPrivacy && (!prop.hasPool || !prop.poolDetails?.hasPrivacyScreen)) {
      return false;
    }

    if (advancedFilters.heatedPool && (!prop.hasPool || !prop.poolDetails?.isHeated)) {
      return false;
    }

    // Search query filter (matches title, area, governorate, description)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = 
        prop.title.toLowerCase().includes(q) ||
        prop.area.toLowerCase().includes(q) ||
        prop.governorate.toLowerCase().includes(q) ||
        prop.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedGovernorate('الكل');
    setSelectedType('all');
    setSyrianSpecialCategory('all');
    setSearchQuery('');
    setOnlySolar(false);
    setOnlyPool(false);
    setOnlySuperhost(false);
    setAdvancedFilters({
      minPrice: 0,
      maxPrice: 300,
      rentalType: 'all',
      familiesOnly: false,
      partiesAllowed: false,
      heatedPool: false,
      poolPrivacy: false,
      instantBookingOnly: false
    });
  };

  if (isAdminMode) {
    return (
      <Suspense fallback={<ModalFallbackSkeleton />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Sub-page 1: Dedicated Damascus Hotels Section */}
      {activeTab === 'hotels' && (
        <main className="flex-1">
          <DamascusHotelsSection />
        </main>
      )}

      {/* Sub-page 2: Dedicated Interactive Map Page */}
      {activeTab === 'map' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full animate-fadeIn">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                الخريطة التفاعلية للإقامات والفنادق في سوريا
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                تصفح المواقع والأسعار المباشرة في كافة المحافظات والمصايف
              </p>
            </div>
            <button
              onClick={() => setActiveTab('hotels')}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>فنادق دمشق</span>
            </button>
          </div>
          <Suspense fallback={<InteractiveMapSkeleton />}>
            <InteractiveMap properties={properties} />
          </Suspense>
        </main>
      )}

      {/* Sub-page 3: Dedicated Syrian Host Portal */}
      {activeTab === 'host' && (
        <main className="flex-1 animate-fadeIn">
          <Suspense fallback={<HostPortalSkeleton />}>
            <HostPortalPage />
          </Suspense>
        </main>
      )}

      {/* Sub-page 4: Main Explore & Stays Page */}
      {activeTab === 'explore' && (
        <>
          <HeroSearch />

          {/* Syrian 4 Primary Sections Grid: Hotels, Farms, Chalets, Apartments */}
          <SyrianSectionsGrid />

          {/* Syrian Market Specialized Pillars */}
          <SyrianMarketShowcase />

          {/* Featured Damascus Hotels Section Callout Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-right">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                  <Hotel className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md">
                      دليل 2026
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-white">
                      قسم فنادق دمشق العريقة والفاخرة
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                    استكشف {damascusHotels.length} فندقاً وقصراً دمشقياً معتمداً؛ من قصور دمشق القديمة التراثية إلى فنادق الـ 5 نجوم مع كهرباء وتكييف 24/7 دون انقطاع.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab('hotels');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <span>دخول قسم فنادق دمشق</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          <CategoryBar />

          {/* Main Listings Section */}
          <main id="properties-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            {/* Active Category Spotlight & Area Quick Filters */}
            {selectedType !== 'all' && (
              <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-emerald-700 text-white px-2.5 py-1 rounded-xl shadow-2xs">
                        {selectedType === 'hotel' ? '🏨 قسم الفنادق' :
                         selectedType === 'farm' ? '🏡 قسم المزارع' :
                         selectedType === 'chalet' ? '🏖️ قسم الشاليهات' : '🏢 قسم الشقق'}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {selectedType === 'hotel' ? 'فنادق دمشق وسوريا العريقة والـ 5 نجوم' :
                         selectedType === 'farm' ? 'مزارع واستراحات يعفور وصحنايا والغوطة بمسبح وسواتر' :
                         selectedType === 'chalet' ? 'شاليهات بورتو طرطوس، الشاطئ الأزرق، وأكواخ بلودان ومشتى الحلو' : 'شقق فندقية ومفروشة VIP في أرقى الأحياء'}
                      </h3>
                    </div>
                    <div className="text-xs text-slate-600 mt-1.5 flex items-center gap-2 flex-wrap font-medium">
                      <span>الأسعار التقريبية:</span>
                      <span className="font-black text-emerald-800">
                        {selectedType === 'hotel' ? '$50 - $180 ليلة (~725 ألف - 2.6 مليون ل.س)' :
                         selectedType === 'farm' ? '$75 - $150 ليلة (~1.08 - 2.17 مليون ل.س) | نهاري من $50' :
                         selectedType === 'chalet' ? '$45 - $95 ليلة (~650 ألف - 1.37 مليون ل.س)' : '$40 - $85 ليلة (~580 ألف - 1.23 مليون ل.س)'}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-emerald-700 font-bold">الدفع حصراً: 🇸🇾 ليرة سورية & 💵 دولار</span>
                    </div>
                  </div>

                  {/* Area Quick Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-500">أبرز المناطق:</span>
                    {(selectedType === 'hotel' ? ['باب توما', 'الأمويين', 'الصالحية', 'حلب', 'اللاذقية'] :
                      selectedType === 'farm' ? ['يعفور', 'الصبورة', 'صحنايا', 'الغوطة', 'قرى الأسد'] :
                      selectedType === 'chalet' ? ['بورتو طرطوس', 'الشاطئ الأزرق', 'بلودان', 'مشتى الحلو'] :
                      ['المالكي', 'أبو رمانة', 'المزة', 'كفرسوسة', 'حلب']
                    ).map((areaName) => (
                      <button
                        key={areaName}
                        onClick={() => setSearchQuery(areaName)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                          searchQuery === areaName 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50'
                        }`}
                      >
                        {areaName}
                      </button>
                    ))}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-[10px] font-bold text-rose-600 hover:text-rose-800 px-1.5 py-1 underline"
                      >
                        إلغاء التصفية
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Results Header Info & Reset */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>الإقامات المتاحة للحجز</span>
                  {selectedGovernorate !== 'الكل' && (
                    <span className="text-emerald-700 text-sm font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      في {selectedGovernorate}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  عُثر على {filteredProperties.length} من أصل {properties.length} إقامة موثقة
                </p>
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-xl transition-all shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            </div>

            {/* View Mode Switch: Map or Grid */}
            {viewMode === 'map' ? (
              <div className="space-y-4">
                <Suspense fallback={<InteractiveMapSkeleton />}>
                  <InteractiveMap properties={filteredProperties} />
                </Suspense>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {filteredProperties.slice(0, 4).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            ) : (
              /* Listings Grid */
              filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto my-8 space-y-4">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">لم نجد عقارات مطابقة لهذا البحث</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      جرب إزالة بعض الفلاتر المتقدمة (مثل نطاق السعر أو الحجز الفوري) أو البحث عن منطقة أخرى.
                    </p>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20"
                  >
                    إظهار كافة الإقامات
                  </button>
                </div>
              )
            )}

          </main>
        </>
      )}

      <Footer />
      <WhatsAppSupportFAB />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar />

      {/* Global Modals */}
      <PropertyDetailsModal />
      <BookingModal />
      <HostModal />
      <FavoritesModal />
      <AdvancedFilterModal />
      <ReviewsModal />
      <ComparisonModal />
      <VoucherModal />
      <PhotoLightboxModal />
      <SplitBillModal />
      <GeniusLoyaltyModal />
      <BrandHeritageModal />
      <SyrianMarketNeedsModal />
      <OfflineEmergencyModal />
      <AuthModal />

      {/* Lazy Loaded Modals with Shimmer Fallbacks */}
      <Suspense fallback={<NotificationCenterSkeleton />}>
        <NotificationCenterModal />
      </Suspense>

      <Suspense fallback={<SmsConfirmationSkeleton />}>
        <SmsConfirmationModal />
      </Suspense>
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
