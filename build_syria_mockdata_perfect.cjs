const fs = require('fs');

// Build script for Syrian booking app mock data
const filePath = 'src/data/mockData.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Updated POPULAR_DESTINATIONS
const newDestinations = `export const POPULAR_DESTINATIONS = [
  { 
    name: 'يعفور ومزارع ريف دمشق', 
    governorate: 'ريف دمشق', 
    count: 48, 
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'شواطئ وبورتو طرطوس', 
    governorate: 'طرطوس', 
    count: 34, 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'اللاذقية والشاطئ الأزرق', 
    governorate: 'اللاذقية', 
    count: 41, 
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'بلودان والزبداني وجبال القلمون', 
    governorate: 'ريف دمشق', 
    count: 29, 
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'دمشق القديمة (باب توما والقيمرية)', 
    governorate: 'دمشق', 
    count: 25, 
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'مشتى الحلو ووادي النضارة', 
    governorate: 'حمص', 
    count: 22, 
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    name: 'أحياء دمشق الراقية (المالكي وأبو رمانة والمزة)', 
    governorate: 'دمشق', 
    count: 36, 
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' 
  }
];`;

content = content.replace(/export const POPULAR_DESTINATIONS = \[[\s\S]*?\];/m, newDestinations);

// Curated realistic images replacement for Damascus hotels:
const hotelImagesReplacements = {
  'hotel-fs-damascus': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-sheraton-damascus': [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-mamlouka-damascus': [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-wali-damascus': [
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-damarose-damascus': [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-cham-damascus': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-talisman-damascus': [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-ebla-damascus': [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-bluetower-damascus': [
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-omayad-damascus': [
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-zafran-damascus': [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-beitsitti-damascus': [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-beaurivage-damascus': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-semiramis-damascus': [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-daralsalam-damascus': [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-carlton-damascus': [
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-juliadumna-damascus': [
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-beitzaman-damascus': [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-plaza-damascus': [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ],
  'hotel-alfardoss-damascus': [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  ]
};

// Replace images for Damascus hotels
for (const [hotelId, imgs] of Object.entries(hotelImagesReplacements)) {
  const regex = new RegExp(`(id:\\s*['"]${hotelId}['"][\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
  const replacementImages = "\\n      '" + imgs.join("',\\n      '") + "'\\n    ";
  content = content.replace(regex, `$1${replacementImages}$3`);
}

console.log("Damascus hotels images updated.");

// Now prepare new rich properties for the 4 sections
const newProperties = [
  // --- قسم المزارع والاستراحات (Farms & Country Stays) ---
  {
    id: 'farm-yaafour-rozana',
    title: 'مزرعة وقصر الروزانا VIP مع مسبح إنفينيتي وسواتر خصوصية',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'يعفور - بوابة الصبورة',
    priceUsd: 145,
    dayUsePriceUsd: 90,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 12,
    securityDepositUsd: 50,
    rating: 4.96,
    reviewCount: 42,
    ratingBreakdown: { cleanliness: 5.0, accuracy: 4.9, electricity: 5.0, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: true, petsAllowed: false },
    coordinates: { lat: 33.518, lng: 36.142 },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 16,
    description: 'قصر ومزرعة VIP في أرقى مناطق يعفور، مسبح إنفينيتي مفلتر مع سواتر خصوصية تامة للعائلات، حدائق غناء بمساحة 4000م²، منظومة طاقة شمسية 20 كيلوواط تكيف المزرعة بالكامل 24/7 دون انقطاع.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية ليثيوم 20KW مع تكييف كامل 24/7', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت 50 ميغا فائق السرعة',
    hasPool: true,
    poolDetails: { isHeated: true, isIndoor: false, hasPrivacyScreen: true },
    hasWaterReserve: true,
    amenities: ['مسبح إنفينيتي خاص', 'سواتر خصوصية 100%', 'طاقة شمسية 24/7', 'إنترنت فايبر', 'مطبخ أمريكي متكامل', 'منطقة باربيكيو ومشاوي حجرية', 'ملعب كرة قدم معشب', 'حراسة مدار الساعة'],
    host: { name: 'الحاج بشير الصباغ', phone: '+963933221100', whatsapp: '963933221100', isSuperhost: true, responseRate: '100% خلال 10 دقائق' },
    featured: true,
    urgencyTag: 'متاح للحجز الفوري لعطلة الأسبوع',
    isGeniusDeal: true,
    energyMetrics: { batteryPercent: 98, solarKw: 20, generatorBackup: true }
  },
  {
    id: 'farm-sahnaya-palm',
    title: 'استراحة ومزرعة النخيل مع مسبح مغلق دافئ وسواتر كاملة',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'صحنايا - طريق الكسوة القديم',
    priceUsd: 95,
    dayUsePriceUsd: 60,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 35,
    rating: 4.89,
    reviewCount: 31,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 4.8, electricity: 4.9, host: 5.0, value: 4.8 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.435, lng: 36.255 },
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 12,
    description: 'مزرعة واستراحة عائلية متميزة في صحنايا، تمتاز بمسبح مغلق خاص مع تدفئة للمياه وسواتر تمنح راحة وخصوصية مطلقة. قعدة عربية شامية مظللة ومطبخ خارجي للمشاوي.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية مستمرة مع مولدة كاتمة للصوت', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: '4G سيريتل سريع ومستقر',
    hasPool: true,
    poolDetails: { isHeated: true, isIndoor: true, hasPrivacyScreen: true },
    hasWaterReserve: true,
    amenities: ['مسبح مغلق دافئ', 'خصوصية عائلية تامة', 'كهرباء مستمرة 24/7', 'جلسات عربية خارجية', 'شوايات حجرية', 'ألعاب أطفال', 'مواقف سيارات مظللة'],
    host: { name: 'أبو فراس الحلبي', phone: '+963944332211', whatsapp: '963944332211', isSuperhost: true, responseRate: '100% خلال 15 دقيقة' },
    isGeniusDeal: true
  },
  {
    id: 'farm-ghouta-sandian',
    title: 'مزرعة وواحة السنديان العائلية بين بساتين الغوطة',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'غوطة دمشق - طريق المطار الدولي',
    priceUsd: 85,
    dayUsePriceUsd: 55,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 15,
    securityDepositUsd: 30,
    rating: 4.85,
    reviewCount: 26,
    ratingBreakdown: { cleanliness: 4.8, accuracy: 4.9, electricity: 4.8, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.450, lng: 36.380 },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 14,
    description: 'واحة ريفية هادئة محاطة بأشجار المشمش والجوز في غوطة دمشق قرب طريق المطار. مسبح خاص معقم، جلسات عريشة خضراء، وطاقة شمسية مدار الساعة.',
    electricity: { type: 'solar_24_7', label: 'منظومة طاقة شمسية تشغل المكيفات 24 ساعة', hasAirConditioningOnSolar: true },
    hasWifi: true,
    hasPool: true,
    poolDetails: { isHeated: false, isIndoor: false, hasPrivacyScreen: true },
    hasWaterReserve: true,
    amenities: ['مسبح خاص عائلي', 'أشجار فواكه وبساتين', 'طاقة شمسية 24/7', 'باربيكيو وموقد حطب', 'جلسات عريشة مظللة', 'مواقف خاصة'],
    host: { name: 'أبو طارق الغوطاني', phone: '+963955667788', whatsapp: '963955667788', isSuperhost: false, responseRate: '95% خلال 20 دقيقة' }
  },
  {
    id: 'farm-qura-assad',
    title: 'استراحة كرز القلمون والديماس الجبلية مع إطلالة خلابة',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'ريف دمشق - قرى الأسد / ديماس',
    priceUsd: 110,
    dayUsePriceUsd: 75,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 40,
    rating: 4.92,
    reviewCount: 35,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 5.0, electricity: 4.9, host: 4.9, value: 4.8 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.560, lng: 36.100 },
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 12,
    description: 'فيلا واستراحة جبلية راقية في قرى الأسد المطلة على وادي بردى، تجمع بين الهواء النقي العليل ومسبح خاص واسع مع سواتر خصوصية عالية. مثالية للعائلات السورية والمغتربين.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية كاملة مع بطاريات ليثيوم 24/7', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت 30 ميغابت',
    hasPool: true,
    poolDetails: { isHeated: true, isIndoor: false, hasPrivacyScreen: true },
    hasWaterReserve: true,
    amenities: ['مسبح بانورامي خاص', 'سواتر خصوصية 100%', 'تكييف وتدفئة بالطاقة الشمسية', 'إنترنت سريع', 'شرفة واسعة مطلة', 'فرن ومشاوي'],
    host: { name: 'المهندس كمال الأيوبي', phone: '+963966112233', whatsapp: '963966112233', isSuperhost: true, responseRate: '100% خلال 10 دقائق' },
    featured: true
  },
  {
    id: 'farm-kesweh-balsan',
    title: 'مزرعة البيلسان والياسمين الشامي الريفية',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'ريف دمشق - الكسوة / دروشا',
    priceUsd: 75,
    dayUsePriceUsd: 50,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 25,
    rating: 4.82,
    reviewCount: 20,
    ratingBreakdown: { cleanliness: 4.8, accuracy: 4.8, electricity: 4.8, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.370, lng: 36.210 },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 10,
    description: 'مزرعة اقتصادية ومريحة لعائلات دمشق الراغبة بسيران نهاري أو مبيت هادئ، مسبح خاص معقم، جلسة تحت عريشة الياسمين، وطاقة شمسية تؤمن الإنارة والتبريد دون انقطاع.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية 24/7 مع إنفرتر احتياطي', hasAirConditioningOnSolar: true },
    hasWifi: true,
    hasPool: true,
    poolDetails: { isHeated: false, isIndoor: false, hasPrivacyScreen: true },
    hasWaterReserve: true,
    amenities: ['مسبح خاص معقم', 'سواتر خصوصية عائلية', 'طاقة شمسية مستمرة', 'شوايات باربيكيو', 'مطبخ مجهز', 'أراجيح للأطفال'],
    host: { name: 'أبو ماهر الشامي', phone: '+963988776655', whatsapp: '963988776655', isSuperhost: false, responseRate: '95% خلال نصف ساعة' }
  },

  // --- قسم الشاليهات والمصايف (Chalets & Beach/Mountain) ---
  {
    id: 'chalet-porto-marina',
    title: 'شاليه ديلوكس مارينا بورتو طرطوس إطلالة مباشرة على اليخوت والبحر',
    type: 'chalet',
    governorate: 'طرطوس',
    area: 'بورتو طرطوس - الكورنيش الجديد والمارينا',
    priceUsd: 70,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 30,
    rating: 4.87,
    reviewCount: 39,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 4.8, electricity: 4.9, host: 4.9, value: 4.8 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 34.895, lng: 35.882 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    description: 'شاليه أنيق داخل منتجع بورتو طرطوس الفاخر، يتمتع بإطلالة خلابة على مارينا اليخوت والبحر الأبيض المتوسط. كهرباء ومصاعد وتكييف 24 ساعة دون أي انقطاع.',
    electricity: { type: 'solar_24_7', label: 'كهرباء وتكييف 24/7 خاصة بمجمع بورتو طرطوس', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت 30 ميغا',
    hasPool: true,
    poolDetails: { isHeated: false, isIndoor: false, hasPrivacyScreen: false },
    hasWaterReserve: true,
    amenities: ['شرفة بحرية واسعة', 'مسابح المجمع والشاطئ الخاص', 'تكييف مركزي 24/7', 'إنترنت سريع', 'مصاعد تعمل باستمرار', 'أمن وحراسة 24 ساعة'],
    host: { name: 'عصام الطرطوسي', phone: '+963933887766', whatsapp: '963933887766', isSuperhost: true, responseRate: '100% خلال 10 دقائق' },
    featured: true
  },
  {
    id: 'chalet-arwad-island',
    title: 'شاليهات نسيم البحر في جزيرة أرواد التاريخية',
    type: 'chalet',
    governorate: 'طرطوس',
    area: 'طرطوس - جزيرة أرواد التاريخية',
    priceUsd: 60,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    securityDepositUsd: 20,
    rating: 4.81,
    reviewCount: 22,
    ratingBreakdown: { cleanliness: 4.7, accuracy: 4.9, electricity: 4.8, host: 5.0, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 34.855, lng: 35.857 },
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    description: 'تجربة إقامة أسطورية وفريدة في جزيرة أرواد، الجزيرة السورية الوحيدة المأهولة في البحر المتوسط. شرفة مباشرة على الأمواج، نسيم بحري عليل، وقارب خاص لنقل النزلاء.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية ليثيوم 24/7 متكاملة', hasAirConditioningOnSolar: true },
    hasWifi: true,
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['إطلالة مباشرة على البحر', 'خدمة نقل بالقارب السريع', 'طاقة شمسية 24 ساعة', 'شرفة على الصخور البحرية', 'مطبخ مجهز للمأكولات البحرية'],
    host: { name: 'الريس نزار الأروادي', phone: '+963944119988', whatsapp: '963944119988', isSuperhost: true, responseRate: '100% خلال 15 دقيقة' }
  },
  {
    id: 'chalet-kandil',
    title: 'شاليه وادي قنديل الرملي بين خضرة الجبل والأمواج',
    type: 'chalet',
    governorate: 'اللاذقية',
    area: 'اللاذقية - شاطئ وادي قنديل',
    priceUsd: 55,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 20,
    rating: 4.86,
    reviewCount: 30,
    ratingBreakdown: { cleanliness: 4.8, accuracy: 4.9, electricity: 4.8, host: 4.9, value: 5.0 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 35.720, lng: 35.840 },
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 6,
    description: 'شاليه شاطئي مستقل على رمال شاطئ وادي قنديل الذهبية الشهيرة باللاذقية، حيث تلتقي جبال السنديان بالبحر الأزرق النقي. هدوء وطبيعة عذراء مثالية للاستجمام.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية مستمرة مع بطاريات ليثيوم', hasAirConditioningOnSolar: true },
    hasWifi: true,
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['نزول مباشر للرمال والبحر', 'طاقة شمسية 24/7', 'تراس مطل على الشاطئ', 'شوايات سمك باربيكيو', 'مواقف خاصة للسيارات'],
    host: { name: 'أبو سومر اللاذقاني', phone: '+963955113355', whatsapp: '963955113355', isSuperhost: true, responseRate: '100% خلال 10 دقائق' }
  },

  // --- قسم الشقق المفروشة VIP (Furnished Apartments & Suites) ---
  {
    id: 'apt-malki-vip',
    title: 'شقة VIP ديلوكس في أرقى شوارع المالكي مع تكييف ومصعد دائم',
    type: 'apartment',
    governorate: 'دمشق',
    area: 'دمشق - المالكي / شارع عبد المنعم رياض',
    priceUsd: 75,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 40,
    rating: 4.95,
    reviewCount: 48,
    ratingBreakdown: { cleanliness: 5.0, accuracy: 4.9, electricity: 5.0, host: 5.0, value: 4.8 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.518, lng: 36.275 },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    description: 'شقة سكنية وفندقية فاخرة في قلب حي المالكي الراقي بدمشق. صالون واسع مفروش بأفخم الأثاث، 3 غرف نوم ماستر، منظومة إنفرتر ومولدة خاصة بالبناء تضمن الكهرباء والتكييف والمصعد 24/7.',
    electricity: { type: 'solar_24_7', label: 'إنفرتر ومولدة خاصة للبناء 24/7 مع مصعد دائم', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت فائق السرعة 40 ميغا',
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['صالون VIP فخم', 'تكييف وإنفرتر 24/7', 'مصعد كهربائي يعمل دائماً', 'إنترنت سريع فايبر', 'مطبخ إيطالي مجهز بالكامل', 'حراسة وكاميرات أمان للبناء'],
    host: { name: 'المهندس غياث الشماع', phone: '+963933445566', whatsapp: '963933445566', isSuperhost: true, responseRate: '100% خلال أقل من 10 دقائق' },
    featured: true,
    isGeniusDeal: true
  },
  {
    id: 'apt-abu-roumaneh',
    title: 'بنتهاوس أبو رمانة الفاخر بإطلالة بانورامية على جبل قاسيون',
    type: 'apartment',
    governorate: 'دمشق',
    area: 'دمشق - أبو رمانة / حديقة الجاحظ',
    priceUsd: 85,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    securityDepositUsd: 40,
    rating: 4.93,
    reviewCount: 37,
    ratingBreakdown: { cleanliness: 5.0, accuracy: 4.9, electricity: 4.9, host: 4.9, value: 4.8 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.515, lng: 36.282 },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 7,
    description: 'بنتهاوس ملكي في حي أبو رمانة الدبلوماسي العريق قرب حديقة الجاحظ، يتميز بتراس بانورامي ساحر يكشف جبل قاسيون ومعالم دمشق، تكييف وإنارة 24 ساعة ومطبخ حديث.',
    electricity: { type: 'solar_24_7', label: 'طاقة ومولدة مستمرة 24/7 دون انقطاع', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت ألياف ضوئية 50 ميغا',
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['تراس بانورامي واسع على قاسيون', 'كهرباء وتكييف 24/7', 'شاشات ذكية سمارت', 'مطبخ أمريكي مفتوح', 'مواقف سيارات خاصة للبناء', 'مصعد دائم'],
    host: { name: 'الدكتور طريف العظم', phone: '+963944223344', whatsapp: '963944223344', isSuperhost: true, responseRate: '100% خلال 15 دقيقة' },
    featured: true
  },
  {
    id: 'apt-mezzeh-villas',
    title: 'شقة فندقية مودرن المزة فيلات غربية خلف برج دمشق',
    type: 'apartment',
    governorate: 'دمشق',
    area: 'دمشق - المزة فيلات غربية',
    priceUsd: 65,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 30,
    rating: 4.88,
    reviewCount: 34,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 4.8, electricity: 4.9, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.498, lng: 36.248 },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    description: 'شقة فندقية ذات تصميم عصري أنيق في المزة فيلات غربية، قريبة من المطاعم والخدمات والسفارات، هدوء تام مع منظومة طاقة وإنفرتر تشغل المكيف والبراد والإنارة دون انقطاع.',
    electricity: { type: 'solar_24_7', label: 'إنفرتر ليثيوم 24/7 مع تكييف مستمر', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: '4G سيريتل سريع',
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['أثاث مودرن جديد بالكامل', 'إنفرتر وطاقة 24 ساعة', 'مطبخ متكامل بكافة التجهيزات', 'غسالة أوتوماتيك وشاشة ذكية', 'موقع هادئ وراقي'],
    host: { name: 'سناء البيطار', phone: '+963955778899', whatsapp: '963955778899', isSuperhost: false, responseRate: '95% خلال 20 دقيقة' }
  },
  {
    id: 'apt-kafrsousa',
    title: 'شقة كفرسوسة تنظيم راقٍ قرب الشام سنتر والتسوق',
    type: 'apartment',
    governorate: 'دمشق',
    area: 'دمشق - كفرسوسة تنظيم جديد',
    priceUsd: 60,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 25,
    rating: 4.85,
    reviewCount: 29,
    ratingBreakdown: { cleanliness: 4.8, accuracy: 4.9, electricity: 4.8, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 33.490, lng: 36.270 },
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    description: 'شقة ممتازة في كفرسوسة تنظيم جديد على بعد خطوات من الشام سنتر وأرقى المولات والمطاعم، تشطيب ممتاز وأثاث مريح مع كهرباء متواصلة عبر مولدة البناء.',
    electricity: { type: 'solar_24_7', label: 'مولدة خاصة بالبناء ومصعد يعمل دائماً', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت 25 ميغا',
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['قرب المول والمطاعم', 'مصعد كهربائي دائم', 'مولدة كهرباء خاصة', 'إنترنت سريع', 'مطبخ كامل مع ميكروويف وغسالة'],
    host: { name: 'عمار الشاويش', phone: '+963966554433', whatsapp: '963966554433', isSuperhost: true, responseRate: '100% خلال 10 دقائق' }
  },
  {
    id: 'apt-tartous-corniche',
    title: 'شقة بانورامية مفروشة على كورنيش طرطوس البحري',
    type: 'apartment',
    governorate: 'طرطوس',
    area: 'طرطوس - الكورنيش البحري الرئيسي',
    priceUsd: 50,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    securityDepositUsd: 20,
    rating: 4.83,
    reviewCount: 25,
    ratingBreakdown: { cleanliness: 4.8, accuracy: 4.9, electricity: 4.8, host: 4.9, value: 4.9 },
    houseRules: { familiesOnly: true, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 34.888, lng: 35.875 },
    images: [
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    description: 'شقة مفروشة ذات إطلالة زجاجية مفتوحة على البحر الأبيض المتوسط على كورنيش طرطوس، نسيم البحر وموقع حيوي للمشاة والمقاهي، طاقة شمسية مستمرة تضمن عمل الإنارة والتكييف.',
    electricity: { type: 'solar_24_7', label: 'طاقة شمسية ليثيوم 24/7', hasAirConditioningOnSolar: true },
    hasWifi: true,
    hasPool: false,
    hasWaterReserve: true,
    amenities: ['واجهة بحرية بانورامية', 'طاقة شمسية مدار الساعة', 'موقع حيوي على الكورنيش', 'مطبخ وتجهيزات متكاملة', 'مصعد كهربائي'],
    host: { name: 'وسيم خضور', phone: '+963944889900', whatsapp: '963944889900', isSuperhost: false, responseRate: '95% خلال 20 دقيقة' }
  },

  // --- فنادق المحافظات الأخرى (Provincial Syrian Hotels) ---
  {
    id: 'hotel-porto-tartous',
    title: 'فندق ومنتجع بورتو طرطوس مارينا 5 نجوم (Porto Tartous Resort)',
    type: 'hotel',
    governorate: 'طرطوس',
    area: 'طرطوس - بورتو طرطوس الكورنيش الجديد',
    priceUsd: 110,
    rentalType: 'overnight',
    instantBooking: true,
    hotelStars: 5,
    urgencyTag: 'إطلالة بحرية مباشرة ومارينا يخوت',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    rating: 4.92,
    reviewCount: 54,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 5.0, electricity: 5.0, host: 4.9, value: 4.8 },
    houseRules: { familiesOnly: false, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 34.896, lng: 35.881 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    description: 'المنتجع البحري الأكبر والأحدث في الساحل السوري؛ أجنحة فندقية 5 نجوم بإطلالة بانورامية كاملة على مارينا اليخوت والبحر الأبيض المتوسط مع مسابح ومطاعم وشاطئ رملي خاص.',
    electricity: { type: 'solar_24_7', label: 'محطة طاقة وتكييف مركزي 24/7 خاصة بالمنتجع', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'فايبر نت عالي السرعة 50 ميغا',
    hasPool: true,
    poolDetails: { isHeated: false, isIndoor: true, hasPrivacyScreen: false },
    hasWaterReserve: true,
    amenities: ['أجنحة فندقية فاخرة', 'مسابح خارجية ومغلقة', 'شاطئ خاص للمنتجع', 'إفطار إنتركونتيننتال مفتوح', 'نادي صحي وسبا', 'مواقف خاصة وحراسة 24/7'],
    host: { name: 'إدارة منتجع بورتو طرطوس', phone: '+96343221100', whatsapp: '963933001122', isSuperhost: true, responseRate: '100% فورياً' },
    featured: true
  },
  {
    id: 'hotel-sheraton-aleppo',
    title: 'فندق شيراتون حلب الشهباء 5 نجوم (Sheraton Aleppo Hotel)',
    type: 'hotel',
    governorate: 'حلب',
    area: 'حلب - حي العزيزية والحديقة العامة',
    priceUsd: 125,
    rentalType: 'overnight',
    instantBooking: true,
    hotelStars: 5,
    urgencyTag: 'فخامة عالمية في قلب حلب العريقة',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    rating: 4.91,
    reviewCount: 46,
    ratingBreakdown: { cleanliness: 4.9, accuracy: 4.9, electricity: 5.0, host: 4.9, value: 4.8 },
    houseRules: { familiesOnly: false, partiesAllowed: false, petsAllowed: false },
    coordinates: { lat: 36.211, lng: 37.145 },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    description: 'تحفة معمارية تجمع بين طراز العمارة الحلبية التقليدية بالحجر الأصفر والأقواس الأندلسية وفخامة فنادق شيراتون العالمية. كهرباء وتكييف وخدمات 5 نجوم 24/7 دون انقطاع.',
    electricity: { type: 'solar_24_7', label: 'توليد طاقة وتكييف مركزي 24/7 دون انقطاع', hasAirConditioningOnSolar: true },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر نت فائق السرعة',
    hasPool: true,
    poolDetails: { isHeated: true, isIndoor: false, hasPrivacyScreen: false },
    hasWaterReserve: true,
    amenities: ['أجنحة شيراتون الملكية', 'مسبح خارجي فاخر', 'إفطار حلبي وشامي غني', 'نادي رياضي وسبا', 'قاعات مؤتمرات ورجال أعمال'],
    host: { name: 'إدارة فندق شيراتون حلب', phone: '+96321211111', whatsapp: '963944005544', isSuperhost: true, responseRate: '100% فورياً' },
    featured: true
  }
];

// Append newProperties before the closing bracket of MOCK_PROPERTIES
const formattedProps = newProperties.map(p => '  ' + JSON.stringify(p, null, 2).replace(/\\n/g, '\\n  ')).join(',\\n\\n');

// Find the last closing bracket of MOCK_PROPERTIES
const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  content = content.slice(0, lastBracketIdx).trimEnd() + ',\\n\\n' + formattedProps + '\\n];\\n';
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('SUCCESS! mockData.ts updated with rich authentic properties and realistic photos.');
} else {
  console.error('Could not locate closing bracket of MOCK_PROPERTIES');
}
