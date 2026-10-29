import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Currency, BookingRequest, PropertyType, Governorate, AdvancedFilterState, ChatMessage, AppNotification, SmsMessage } from '../types';
import { MOCK_PROPERTIES, SYP_PER_USD } from '../data/mockData';
import { api } from '../services/api';

interface AppContextType {
  properties: Property[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (priceUsd: number) => string;
  getPriceValue: (priceUsd: number) => { value: number; label: string };
  
  // Navigation & Sub-pages
  activeTab: 'explore' | 'hotels' | 'map' | 'favorites' | 'host';
  setActiveTab: (tab: 'explore' | 'hotels' | 'map' | 'favorites' | 'host') => void;

  // View Mode: Grid or Airbnb-style Map
  viewMode: 'grid' | 'map';
  setViewMode: (v: 'grid' | 'map') => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Filter State
  selectedGovernorate: Governorate | 'الكل';
  setSelectedGovernorate: (g: Governorate | 'الكل') => void;
  selectedType: PropertyType;
  setSelectedType: (t: PropertyType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onlySolar: boolean;
  setOnlySolar: (b: boolean) => void;
  onlyPool: boolean;
  setOnlyPool: (b: boolean) => void;
  onlySuperhost: boolean;
  setOnlySuperhost: (b: boolean) => void;

  // Advanced Global Filter State
  advancedFilters: AdvancedFilterState;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<AdvancedFilterState>>;
  isAdvancedFilterOpen: boolean;
  setIsAdvancedFilterOpen: (b: boolean) => void;

  // Modals State
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (b: boolean) => void;
  isAddPropertyOpen: boolean;
  setIsAddPropertyOpen: (b: boolean) => void;
  isFavoritesModalOpen: boolean;
  setIsFavoritesModalOpen: (b: boolean) => void;
  isReviewsModalOpen: boolean;
  setIsReviewsModalOpen: (b: boolean) => void;

  // Comparison State
  comparisonList: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (b: boolean) => void;

  // Digital Voucher State
  latestConfirmedBooking: BookingRequest | null;
  setLatestConfirmedBooking: (b: BookingRequest | null) => void;
  isVoucherModalOpen: boolean;
  setIsVoucherModalOpen: (b: boolean) => void;

  // Admin Dashboard Mode
  isAdminMode: boolean;
  setIsAdminMode: (b: boolean) => void;

  // Operations
  bookings: BookingRequest[];
  createBooking: (booking: BookingRequest) => void;
  addNewProperty: (newProp: Omit<Property, 'id' | 'rating' | 'reviewCount' | 'ratingBreakdown' | 'coordinates'>) => void;

  // Global Features: Booking.com Genius Loyalty Tier
  geniusTier: 1 | 2 | 3;
  setGeniusTier: (tier: 1 | 2 | 3) => void;
  isGeniusModalOpen: boolean;
  setIsGeniusModalOpen: (b: boolean) => void;

  // Global Features: Airbnb Fullscreen Lightbox
  lightboxImages: string[];
  lightboxActiveIndex: number;
  isLightboxOpen: boolean;
  openLightbox: (images: string[], index?: number) => void;
  closeLightbox: () => void;
  setLightboxActiveIndex: (index: number) => void;

  // Global Features: Split-Bill & Group Booking
  isSplitPayModalOpen: boolean;
  setIsSplitPayModalOpen: (b: boolean) => void;
  splitPayProperty: Property | null;
  openSplitPayModal: (p: Property) => void;

  // Global Features: 24h Price Freeze (Hopper/Revolut)
  frozenPrices: Record<string, { priceUsd: number; expiresAt: number }>;
  freezePrice: (propertyId: string, priceUsd: number) => void;
  isPriceFrozen: (propertyId: string) => boolean;
  getFrozenPrice: (propertyId: string) => number | null;

  // Brand Heritage & Syrian Hospitality Charter
  isBrandHeritageModalOpen: boolean;
  setIsBrandHeritageModalOpen: (b: boolean) => void;

  // Syrian Market Specialized Pillars
  syrianSpecialCategory: 'all' | 'expat_family' | 'day_use' | 'medical_embassy' | 'honeymoon' | 'remote_work';
  setSyrianSpecialCategory: (cat: 'all' | 'expat_family' | 'day_use' | 'medical_embassy' | 'honeymoon' | 'remote_work') => void;
  isMarketStudyModalOpen: boolean;
  setIsMarketStudyModalOpen: (b: boolean) => void;

  // Room Selection Binding
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;

  // Offline-First & Emergency Voucher State
  isOfflineModalOpen: boolean;
  setIsOfflineModalOpen: (b: boolean) => void;
  offlineBookings: BookingRequest[];
  saveBookingOffline: (b: BookingRequest) => void;

  // Host Portal Management
  hostTab: 'listings' | 'add' | 'bookings' | 'wallet';
  setHostTab: (t: 'listings' | 'add' | 'bookings' | 'wallet') => void;
  updatePropertyAvailability: (propertyId: string, isAvailable: boolean) => void;
  updatePropertyPrice: (propertyId: string, priceUsd: number) => void;
  deletePropertyLocal: (propertyId: string) => void;

  // Real-time Notifications Engine
  notifications: AppNotification[];
  isNotificationOpen: boolean;
  setIsNotificationOpen: (b: boolean) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;
  addNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;

  // Instant SMS Confirmation Simulator
  isSmsModalOpen: boolean;
  setIsSmsModalOpen: (b: boolean) => void;
  latestSms: SmsMessage | null;
  triggerSmsConfirmation: (booking: BookingRequest) => void;

  // Seyran Live Chat & Syrian Smart Concierge
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  setIsChatOpen: (b: boolean) => void;
  chatPropertyContext: Property | null;
  setChatPropertyContext: (p: Property | null) => void;
  openChatWithProperty: (p: Property) => void;
  sendChatMessage: (text: string) => Promise<void>;
  resetChatMessages: () => Promise<void>;
  unreadChatCount: number;
  isChatSending: boolean;
}

const DEFAULT_FILTERS: AdvancedFilterState = {
  minPrice: 0,
  maxPrice: 300,
  rentalType: 'all',
  familiesOnly: false,
  partiesAllowed: false,
  heatedPool: false,
  poolPrivacy: false,
  instantBookingOnly: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('seyran_currency');
      return (saved === 'SYP' || saved === 'USD') ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('seyran_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });
  const [activeTab, setActiveTab] = useState<'explore' | 'hotels' | 'map' | 'favorites' | 'host'>('explore');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Persist currency and favorites
  useEffect(() => {
    try {
      localStorage.setItem('seyran_currency', currency);
    } catch {}
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('seyran_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);
  
  // Filters
  const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'الكل'>('الكل');
  const [selectedType, setSelectedType] = useState<PropertyType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySolar, setOnlySolar] = useState(false);
  const [onlyPool, setOnlyPool] = useState(false);
  const [onlySuperhost, setOnlySuperhost] = useState(false);

  // Advanced Global Filters
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>(DEFAULT_FILTERS);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Sync with real backend database
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const [backendProps, backendBookings] = await Promise.all([
          api.getProperties(true),
          api.getBookings()
        ]);
        if (backendProps && backendProps.length > 0) {
          const mockMap = new Map(MOCK_PROPERTIES.map(p => [p.id, p]));
          const backendIds = new Set(backendProps.map((p: any) => p.id));
          
          // Enrich backend properties with mockData's curated roomOptions, special features and photos
          const enrichedBackend = backendProps.map((bp: any) => {
            const mock = mockMap.get(bp.id);
            if (mock) {
              return {
                ...bp,
                roomOptions: mock.roomOptions || bp.roomOptions,
                specialSyrianFeatures: mock.specialSyrianFeatures || bp.specialSyrianFeatures,
                images: (mock.images && mock.images.length > 0) ? mock.images : bp.images,
                description: mock.description || bp.description
              };
            }
            return bp;
          });

          const combined = [
            ...enrichedBackend,
            ...MOCK_PROPERTIES.filter(p => !backendIds.has(p.id))
          ];
          setProperties(combined);
        } else {
          setProperties(MOCK_PROPERTIES);
        }
        if (backendBookings && backendBookings.length > 0) {
          setBookings(backendBookings);
        }
      } catch (err) {
        console.warn('Backend sync error', err);
      }
    };
    syncWithBackend();
  }, []);

  // Comparison State
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Digital Voucher State
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<BookingRequest | null>(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const addToComparison = (id: string) => {
    setComparisonList(prev => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        alert('يمكنك مقارنة 3 فنادق/عقارات كحد أقصى في نفس الوقت');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromComparison = (id: string) => {
    setComparisonList(prev => prev.filter(item => item !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Global Features States
  // 1. Genius Loyalty Tier (Booking.com style)
  const [geniusTier, setGeniusTier] = useState<1 | 2 | 3>(2);
  const [isGeniusModalOpen, setIsGeniusModalOpen] = useState(false);

  // 2. Lightbox (Airbnb style)
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (images: string[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // 3. Split-Bill Calculator
  const [isSplitPayModalOpen, setIsSplitPayModalOpen] = useState(false);
  const [splitPayProperty, setSplitPayProperty] = useState<Property | null>(null);

  const openSplitPayModal = (p: Property) => {
    setSplitPayProperty(p);
    setIsSplitPayModalOpen(true);
  };

  // 4. Price Freeze (Hopper/Revolut 24h freeze)
  const [frozenPrices, setFrozenPrices] = useState<Record<string, { priceUsd: number; expiresAt: number }>>({});

  const freezePrice = (propertyId: string, priceUsd: number) => {
    setFrozenPrices(prev => ({
      ...prev,
      [propertyId]: {
        priceUsd,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }
    }));
  };

  const isPriceFrozen = (propertyId: string) => {
    const item = frozenPrices[propertyId];
    return !!item && item.expiresAt > Date.now();
  };

  const getFrozenPrice = (propertyId: string) => {
    const item = frozenPrices[propertyId];
    if (item && item.expiresAt > Date.now()) {
      return item.priceUsd;
    }
    return null;
  };

  // 5. Brand Heritage & Charter
  const [isBrandHeritageModalOpen, setIsBrandHeritageModalOpen] = useState(false);

  // 6. Syrian Market Specialized Pillars
  const [syrianSpecialCategory, setSyrianSpecialCategory] = useState<'all' | 'expat_family' | 'day_use' | 'medical_embassy' | 'honeymoon' | 'remote_work'>('all');
  const [isMarketStudyModalOpen, setIsMarketStudyModalOpen] = useState(false);

  // 7. Room Selection Binding
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  // 8. Offline-First & Emergency Voucher State
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineBookings, setOfflineBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('seyran_offline_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveBookingOffline = (booking: BookingRequest) => {
    setOfflineBookings(prev => {
      const exists = prev.some(b => b.id === booking.id);
      const updated = exists ? prev.map(b => b.id === booking.id ? booking : b) : [booking, ...prev];
      try {
        localStorage.setItem('seyran_offline_bookings', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not save offline booking to localStorage', err);
      }
      return updated;
    });
  };

  // 9. Host Portal Management
  const [hostTab, setHostTab] = useState<'listings' | 'add' | 'bookings' | 'wallet'>('listings');

  const updatePropertyAvailability = (propertyId: string, isAvailable: boolean) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, isAvailable };
      }
      return p;
    }));
    api.updateProperty(propertyId, { isAvailable }).catch(e => console.warn(e));
  };

  const updatePropertyPrice = (propertyId: string, priceUsd: number) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, priceUsd };
      }
      return p;
    }));
    api.updateProperty(propertyId, { priceUsd }).catch(e => console.warn(e));
  };

  const deletePropertyLocal = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    api.deleteProperty(propertyId).catch(e => console.warn(e));
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'SYP' : 'USD');
  };

  const formatPrice = (priceUsd: number) => {
    if (currency === 'SYP') {
      const syp = Math.round(priceUsd * SYP_PER_USD);
      return `${syp.toLocaleString('ar-SY')} ل.س`;
    }
    return `$${priceUsd}`;
  };

  const getPriceValue = (priceUsd: number) => {
    if (currency === 'SYP') {
      return { value: Math.round(priceUsd * SYP_PER_USD), label: 'ل.س' };
    }
    return { value: priceUsd, label: '$' };
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Real-time Notifications Engine State
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: '🇸🇾 مرحباً بك في سيران سوريا',
      message: 'تم تفعيل حجز الفنادق والشاليهات والمزارع والشقق بالليرة السورية ($ USD & SYP) والدفع عبر سيريتل كاش وشام كاش.',
      time: 'الآن',
      type: 'system',
      read: false
    },
    {
      id: 'notif-2',
      title: '⚡ ضمان الطاقة والكهرباء 24/7',
      message: 'جميع المزارع والفنادق المميزة تحمل شارة الطاقة الشمسية الليثيوم 24/7 لتجربة صيف مريحة دون انقطاع.',
      time: 'منذ ساعة',
      type: 'discount',
      read: false
    },
    {
      id: 'notif-3',
      title: '🏨 افتتاح قسم فنادق دمشق العريقة',
      message: 'يمكنك الآن حجز فندق الفورسيزونز، داما روز، فندق الشام، والقصور التراثية في دمشق القديمة مع تأكيد فوري.',
      time: 'اليوم',
      type: 'booking',
      read: true
    }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: AppNotification = {
      ...n,
      id: `notif-${Date.now()}`,
      time: 'الآن',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Instant SMS Confirmation State
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [latestSms, setLatestSms] = useState<SmsMessage | null>(null);

  const triggerSmsConfirmation = (booking: BookingRequest) => {
    const prop = properties.find(p => p.id === booking.propertyId);
    const propTitle = prop ? prop.title : 'إقامة سيران سوريا';
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const sms: SmsMessage = {
      id: `sms-${Date.now()}`,
      sender: 'SYRIATEL',
      recipientPhone: booking.guestPhone,
      confirmationCode: otp,
      text: `سيران سوريا: تم تأكيد حجزك رقم (${booking.id}) بنجاح في ${propTitle}! رمز الدخول وتأكيد الحجز: [${otp}]. شكراً لاختيارك منصة سيران سوريا. لعرض سند الحجز: https://seyran.sy/v/${booking.id}`,
      timestamp: new Date().toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    setLatestSms(sms);
    setIsSmsModalOpen(true);
  };

  const createBooking = (booking: BookingRequest) => {
    setBookings(prev => [booking, ...prev]);
    saveBookingOffline(booking);

    // Add real-time in-app notification
    const prop = properties.find(p => p.id === booking.propertyId);
    addNotification({
      title: `🎉 تأكيد حجز جديد: ${booking.id}`,
      message: `تم تسجيل حجزك بنجاح في ${prop ? prop.title : 'العقار'} (${booking.guestsCount} ضيوف). تم إرسال سند الحجز إلى هاتفك.`,
      type: 'booking',
      bookingId: booking.id
    });

    // Trigger instant SMS simulation
    triggerSmsConfirmation(booking);

    // Persist to backend database
    api.createBooking(booking).catch(e => console.warn(e));
  };

  const addNewProperty = (newProp: Omit<Property, 'id' | 'rating' | 'reviewCount' | 'ratingBreakdown' | 'coordinates'>) => {
    const property: Property = {
      ...newProp,
      id: `prop-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      ratingBreakdown: {
        cleanliness: 5.0,
        accuracy: 5.0,
        electricity: 5.0,
        host: 5.0,
        value: 5.0
      },
      coordinates: {
        lat: 33.5138,
        lng: 36.2765
      }
    };
    setProperties(prev => [property, ...prev]);
    // Persist to backend database
    api.createProperty(property).catch(e => console.warn(e));
  };

  // --- Seyran Smart Concierge & Live Chat State ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('seyran_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: 'msg-welcome',
        sender: 'support',
        senderName: 'مستشار سيران الذكي',
        text: 'أهلاً بك في منصة سيران سوريا 🌿! كيف يمكننا مساعدتك اليوم؟ يمكنك الاستفسار عن توفر المزارع والشاليهات، منظومات الطاقة الشمسية، أو المساعدة في الحجز وطرق الدفع بالليرة والدولار.',
        timestamp: new Date().toISOString(),
        status: 'read'
      }
    ];
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPropertyContext, setChatPropertyContext] = useState<Property | null>(null);
  const [isChatSending, setIsChatSending] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Sync with backend chat on mount
  useEffect(() => {
    api.getChatMessages().then(msgs => {
      if (msgs && Array.isArray(msgs) && msgs.length > 0) {
        setChatMessages(msgs);
        try {
          localStorage.setItem('seyran_chat_messages', JSON.stringify(msgs));
        } catch (e) {}
      }
    }).catch(e => console.warn('Chat init sync fallback', e));
  }, []);

  const openChatWithProperty = (prop: Property) => {
    setChatPropertyContext(prop);
    setIsChatOpen(true);
  };

  const sendChatMessage = async (text: string) => {
    if (!text || !text.trim()) return;
    const trimmed = text.trim();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'أنت',
      text: trimmed,
      timestamp: new Date().toISOString(),
      status: 'sent',
      propertyId: chatPropertyContext?.id || null,
      propertyTitle: chatPropertyContext?.title || null
    };

    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    setIsChatSending(true);

    try {
      localStorage.setItem('seyran_chat_messages', JSON.stringify(newMsgs));
    } catch (e) {}

    try {
      const res = await api.sendChatMessage({
        text: trimmed,
        sender: 'user',
        senderName: 'الضيف',
        propertyId: chatPropertyContext?.id || null,
        propertyTitle: chatPropertyContext?.title || null
      });

      if (res && res.allMessages) {
        setChatMessages(res.allMessages);
        try {
          localStorage.setItem('seyran_chat_messages', JSON.stringify(res.allMessages));
        } catch (e) {}
      } else if (res && res.replyMessage) {
        const withReply = [...newMsgs, res.replyMessage];
        setChatMessages(withReply);
        try {
          localStorage.setItem('seyran_chat_messages', JSON.stringify(withReply));
        } catch (e) {}
      } else {
        // Fallback local smart Syrian concierge response if server offline
        const lower = trimmed.toLowerCase();
        let replyText = 'تم استلام استفسارك! مستشارو سيران متصلون ومستعدون لتأكيد حجزك ومساعدتك فوراً.';
        if (lower.includes('طاقة') || lower.includes('كهربا') || lower.includes('مكيف') || lower.includes('نت')) {
          replyText = '⚡ نؤكد لك أن كافة العقارات المعتمدة في سيران مزودة بإما منظومة طاقة شمسية ليثيوم 24/7 تشغل المكيفات أو مولدات احتياطية، مع خط فايبر/إنترنت مستمر ومفحوص ميدانياً.';
        } else if (lower.includes('دفع') || lower.includes('سيريتل') || lower.includes('كاش') || lower.includes('عربون') || lower.includes('دولار') || lower.includes('ليرة')) {
          replyText = '💳 الدفع في سيران آمن ومحمي بنظام الأمانات (Escrow): تدفع عربون 25% فقط عبر سيريتل كاش أو حوالة الهرم أو كاش باليد، والمبلغ محجوز ولا يُسلّم للمضيف إلا بعد دخولك ومعاينتك للعقار.';
        } else if (lower.includes('يعفور') || lower.includes('بلودان') || lower.includes('صحنايا') || lower.includes('مزرعة') || lower.includes('مسبح')) {
          replyText = '🏡 متوفر لدينا شاليهات ومزارع مميزة في يعفور وبلودان وصحنايا مع مسابح معقمة وسواتر خصوصية عائلية تامة. هل ترغب بحجز لقضاء يوم (Day Use) أم إقامة كاملة؟';
        } else if (lower.includes('فندق') || lower.includes('دمشق') || lower.includes('تراث')) {
          replyText = '🏨 فنادق دمشق القديمة وقصور باب توما وساروجة التراثية متاحة مع فطور شامي وضيافة فاخرة، مع تأكيد حجز فوري للمغتربين والزوار.';
        }
        const localReply: ChatMessage = {
          id: `msg-${Date.now() + 1}-reply`,
          sender: 'support',
          senderName: 'مستشار سيران الذكي',
          text: replyText,
          timestamp: new Date().toISOString(),
          status: 'delivered'
        };
        const updated = [...newMsgs, localReply];
        setChatMessages(updated);
        try {
          localStorage.setItem('seyran_chat_messages', JSON.stringify(updated));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Chat send fallback error:', err);
    } finally {
      setIsChatSending(false);
    }
  };

  const resetChatMessages = async () => {
    const welcomeMsg: ChatMessage = {
      id: 'msg-welcome',
      sender: 'support',
      senderName: 'مستشار سيران الذكي',
      text: 'أهلاً بك في منصة سيران سوريا 🌿! كيف يمكننا مساعدتك اليوم؟ يمكنك الاستفسار عن توفر المزارع والشاليهات، منظومات الطاقة الشمسية، أو المساعدة في الحجز وطرق الدفع بالليرة والدولار.',
      timestamp: new Date().toISOString(),
      status: 'read'
    };
    setChatMessages([welcomeMsg]);
    setChatPropertyContext(null);
    try {
      localStorage.setItem('seyran_chat_messages', JSON.stringify([welcomeMsg]));
    } catch (e) {}
    api.resetChatMessages().catch(e => console.warn(e));
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        getPriceValue,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedGovernorate,
        setSelectedGovernorate,
        selectedType,
        setSelectedType,
        searchQuery,
        setSearchQuery,
        onlySolar,
        setOnlySolar,
        onlyPool,
        setOnlyPool,
        onlySuperhost,
        setOnlySuperhost,
        advancedFilters,
        setAdvancedFilters,
        isAdvancedFilterOpen,
        setIsAdvancedFilterOpen,
        isReviewsModalOpen,
        setIsReviewsModalOpen,
        selectedProperty,
        setSelectedProperty,
        isBookingOpen,
        setIsBookingOpen,
        isAddPropertyOpen,
        setIsAddPropertyOpen,
        isFavoritesModalOpen,
        setIsFavoritesModalOpen,
        bookings,
        createBooking,
        addNewProperty,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        latestConfirmedBooking,
        setLatestConfirmedBooking,
        isVoucherModalOpen,
        setIsVoucherModalOpen,
        isAdminMode,
        setIsAdminMode,
        geniusTier,
        setGeniusTier,
        isGeniusModalOpen,
        setIsGeniusModalOpen,
        lightboxImages,
        lightboxActiveIndex,
        isLightboxOpen,
        openLightbox,
        closeLightbox,
        setLightboxActiveIndex,
        isSplitPayModalOpen,
        setIsSplitPayModalOpen,
        splitPayProperty,
        openSplitPayModal,
        frozenPrices,
        freezePrice,
        isPriceFrozen,
        getFrozenPrice,
        isBrandHeritageModalOpen,
        setIsBrandHeritageModalOpen,
        syrianSpecialCategory,
        setSyrianSpecialCategory,
        isMarketStudyModalOpen,
        setIsMarketStudyModalOpen,
        selectedRoomId,
        setSelectedRoomId,
        isOfflineModalOpen,
        setIsOfflineModalOpen,
        offlineBookings,
        saveBookingOffline,
        hostTab,
        setHostTab,
        updatePropertyAvailability,
        updatePropertyPrice,
        deletePropertyLocal,
        notifications,
        isNotificationOpen,
        setIsNotificationOpen,
        markAllNotificationsRead,
        unreadNotificationCount,
        addNotification,
        isSmsModalOpen,
        setIsSmsModalOpen,
        latestSms,
        triggerSmsConfirmation,
        chatMessages,
        isChatOpen,
        setIsChatOpen,
        chatPropertyContext,
        setChatPropertyContext,
        openChatWithProperty,
        sendChatMessage,
        resetChatMessages,
        unreadChatCount,
        isChatSending
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
