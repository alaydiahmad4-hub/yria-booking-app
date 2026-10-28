export type PropertyType = 'all' | 'farm' | 'chalet' | 'apartment' | 'hotel' | 'villa';

export type Governorate = 
  | 'دمشق' 
  | 'ريف دمشق' 
  | 'طرطوس' 
  | 'اللاذقية' 
  | 'حمص' 
  | 'حلب' 
  | 'السويداء';

export type ElectricityType = 'solar_24_7' | 'generator_hours' | 'inverter_basic' | 'grid_only';

export type RentalType = 'overnight' | 'day_use' | 'both';

export interface RatingBreakdown {
  cleanliness: number;     // النظافة والتعقيم
  accuracy: number;        // مطابقة الواقع للصور
  electricity: number;     // استقرار الطاقة والخدمات
  host: number;            // تعامل المضيف وسرعة الاستجابة
  value: number;           // القيمة مقابل السعر
}

export interface HouseRules {
  familiesOnly: boolean;   // عائلات فقط
  partiesAllowed: boolean; // مسموح الحفلات وأعياد الميلاد
  petsAllowed: boolean;    // مسموح الحيوانات الأليفة
}

export interface RoomOption {
  id: string;
  name: string; // e.g. "غرفة ديلوكس بسرير كينغ"
  bedType: string; // e.g. "1 سرير مزدوج كبير جداً"
  maxGuests: number;
  pricePerNightUsd: number;
  freeBreakfast: boolean;
  freeCancellation: boolean;
  viewType?: string; // e.g. "إطلالة على المسبح", "إطلالة على البحر"
  availableRoomsCount: number; // e.g. 2
  amenities: string[];
  image?: string; // صورة واقعية ومعتمدة للغرفة أو الجناح
}

export interface Property {
  id: string;
  title: string;
  type: 'farm' | 'chalet' | 'apartment' | 'hotel' | 'villa';
  governorate: Governorate;
  area: string; // e.g. "يعفور", "صحنايا", "بلودان", "الشاطئ الأزرق", "باب توما", "مشتى الحلو"
  priceUsd: number; // Price per night in USD
  dayUsePriceUsd?: number; // Price for daytime "سيران نهاري" (10am - 8pm)
  rentalType: RentalType;
  instantBooking: boolean; // حجز فوري مباشر بدون انتظار موافقة المضيف
  discountWeeklyPercent?: number; // خصم الإقامات الأسبوعية (مثلاً 10%)
  securityDepositUsd?: number; // مبلغ تأمين مسترد

  // Hotel-Specific Enhanced Features
  hotelStars?: number; // 3, 4, 5 stars
  urgencyTag?: string; // e.g. "بقي غرفتان فقط بهذا السعر", "طلب مرتفع اليوم"
  hasFreeBreakfast?: boolean;
  freeCancellationDeadline?: string; // e.g. "إلغاء مجاني حتى 24 ساعة قبل الوصول"
  roomOptions?: RoomOption[];
  isGeniusDeal?: boolean; // خصم برنامج الولاء المميز
  bookingCountPastWeek?: number; // e.g. 24 حجز هذا الأسبوع

  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdown;
  houseRules: HouseRules;

  coordinates: {
    lat: number;
    lng: number;
  };

  status?: 'approved' | 'pending_approval' | 'paused';
  isVerifiedField?: boolean;
  verificationNotes?: string;
  isAvailable?: boolean;

  images: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  amenities: string[];
  
  // Syria-Specific Crucial Attributes
  electricity: {
    type: ElectricityType;
    label: string; // e.g. "طاقة شمسية 24/7 مع بطاريات ليثيوم"
    hasAirConditioningOnSolar: boolean;
  };
  hasWifi: boolean;
  wifiSpeed?: string; // e.g. "فايبر نت 50 ميغا" أو "4G سيريتل سريع"
  hasPool: boolean;
  poolDetails?: {
    isHeated: boolean;
    isIndoor: boolean;
    hasPrivacyScreen: boolean; // سواتر خصوصية عائلية
  };
  hasWaterReserve: boolean; // خزانات مياه ومضخة مستمرة
  virtualTourUrl?: string; // رابط الجولة الافتراضية 360
  hasPriceFreeze?: boolean; // إمكانية تجميد السعر 24 ساعة
  energyMetrics?: {
    batteryPercent: number; // نسبة شحن البطاريات الحالية
    solarKw: number; // استطاعة المنظومة بالكيلوواط
    generatorBackup: boolean; // وجود مولدة صامتة احتياطية
  };
  host: {
    name: string;
    phone: string;
    whatsapp: string;
    isSuperhost: boolean;
    responseRate: string;
  };
  featured?: boolean;
  specialSyrianFeatures?: {
    isExpatFamilyGiftRecommended?: boolean; // باقات المغتربين لإسعاد الأهل
    isDayUseBbqIdeal?: boolean;             // سيران نهاري وجمعات عائلية ومشاوي
    isMedicalEmbassyNear?: boolean;         // قريب من المشافي والسفارات والمراكز الخدمية
    isHoneymoonSpecial?: boolean;           // باقات العرسان وشهر العسل بالقصور الدمشقية
    isRemoteWorkHub?: boolean;              // إقامات العمل عن بعد والإنترنت فايبر السريع
  };
}

export type PaymentMethod = 
  // طرق الدفع بالليرة السورية (SYP ل.س)
  | 'syriatel_cash' 
  | 'mtn_cash' 
  | 'al_haram_local'
  | 'bemo_bank' 
  | 'cash_deposit'
  | 'cash_on_arrival'
  // طرق الدفع بالدولار الأمريكي (USD $)
  | 'al_haram_usd'
  | 'western_union_usd'
  | 'gcc_bank_transfer'
  | 'intl_card'
  | 'cash_on_arrival_usd'
  // للتوافق مع السجلات السابقة
  | 'al_haram_expat'
  | 'western_union';

export interface BookingRequest {
  id?: string;
  propertyId: string;
  bookingType: 'overnight' | 'day_use';
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  totalPriceUsd: number;
  totalPriceSyp: number;
  discountAppliedUsd?: number;
  promoCodeApplied?: string;
  selectedRoomId?: string;
  selectedRoomName?: string;
  createdAt?: string;
  // بيانات حجز المغتربين والضمان
  depositUsd?: number;
  remainingUsd?: number;
  escrowStatus?: string;
  isExpatriate?: boolean;
  expatCountry?: string;
  senderPhoneIntl?: string;
  transactionReference?: string; // رقم إشعار الحوالة أو مرجع العملية البنكية
  receiptNotes?: string;
  // ميزات إهداء الأهل في سوريا للمغتربين
  isFamilyGift?: boolean;
  recipientName?: string;
  recipientPhone?: string;
  giftMessage?: string;
  hasWelcomeBasket?: boolean;
  // ميزات التطبيقات العالمية
  hasChauffeurService?: boolean;
  chauffeurDetails?: {
    pickupLocation: string;
    pickupTime: string;
    priceUsd: number;
  };
  geniusDiscountUsd?: number;
  priceFrozen?: boolean;
}

export type Currency = 'USD' | 'SYP';
export type GeniusTier = 1 | 2 | 3;

export interface AdvancedFilterState {
  minPrice: number;
  maxPrice: number;
  rentalType: 'all' | 'overnight' | 'day_use';
  familiesOnly: boolean;
  partiesAllowed: boolean;
  heatedPool: boolean;
  poolPrivacy: boolean;
  instantBookingOnly: boolean;
  freeBreakfastOnly?: boolean;
  hotelStars?: number | null; // 3, 4, 5
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support' | 'host';
  senderName: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  propertyId?: string | null;
  propertyTitle?: string | null;
}
