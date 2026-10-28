import { Property } from '../types';

export const SYP_PER_USD = 14500; // Realistic conversion rate for SYP

export const SYRIAN_GOVERNORATES = [
  'الكل',
  'دمشق',
  'ريف دمشق',
  'طرطوس',
  'اللاذقية',
  'حمص',
  'حلب',
  'السويداء'
] as const;

export const POPULAR_DESTINATIONS = [
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
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'فيلا ومزرعة الزمرد الفاخرة مع مسبح خاص وسواتر',
    type: 'farm',
    governorate: 'ريف دمشق',
    area: 'يعفور - طريق الصبورة',
    priceUsd: 120,
    dayUsePriceUsd: 80,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 15,
    securityDepositUsd: 40,
    rating: 4.95,
    reviewCount: 38,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      electricity: 4.9,
      host: 5.0,
      value: 4.8
    },
    houseRules: {
      familiesOnly: true,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5200,
      lng: 36.1400
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 12,
    description: 'مزرعة راقية جداً في أرقى مناطق يعفور، مسبح خاص معقم بالفلترة الأوتوماتيكية وسواتر خشبية تضمن الخصوصية العائلية التامة. حديقة واسعة مع مسطحات خضراء، منطقة شواء وباربيكيو متكاملة، وجلسات خارجية مكيفة ومظللة.',
    electricity: {
      type: 'solar_24_7',
      label: 'منظومة طاقة شمسية ليثيوم 24/7 تشغل المكيفات',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر نت ألياف ضوئية 40 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: true,
      isIndoor: false,
      hasPrivacyScreen: true
    },
    hasWaterReserve: true,
    amenities: [
      'مسبح خاص كبير معقم',
      'سواتر خصوصية عائلية 100%',
      'طاقة شمسية 24/7 مستمرة',
      'إنترنت سريع فايبر',
      'منطقة باربيكيو ومشاوي',
      'مطبخ مجهز بالكامل',
      'ألعاب أطفال ومسطحات عشبية',
      'موقف سيارات يتسع لـ 5 سيارات',
      'حارس خاص على مدار الساعة'
    ],
    host: {
      name: 'أبو عمر الدمشقي',
      phone: '+963933112233',
      whatsapp: '963933112233',
      isSuperhost: true,
      responseRate: '100% خلال أقل من 15 دقيقة'
    },
    featured: true,
    urgencyTag: 'طلب مرتفع جداً لعطلة الأسبوع',
    isGeniusDeal: true,
    hasPriceFreeze: true,
    energyMetrics: {
      batteryPercent: 96,
      solarKw: 15,
      generatorBackup: true
    }
  },
  {
    id: 'prop-2',
    title: 'شاليه بورتو طرطوس إطلالة بانورامية مباشرة على البحر',
    type: 'chalet',
    governorate: 'طرطوس',
    area: 'بورتو طرطوس - الكورنيش الجديد',
    priceUsd: 85,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 30,
    rating: 4.88,
    reviewCount: 44,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.9,
      electricity: 4.8,
      host: 4.9,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 34.8890,
      lng: 35.8866
    },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    description: 'شاليه فاخر ومجدد بالكامل في مجمع بورتو طرطوس الراقي. شرفة واسعة بإطلالة ساحرة على البحر وغروب الشمس. خطوات من الشاطئ الرملي والمطاعم والمقاهي. تكييف كامل، ومجهز بأحدث الأجهزة الكهربائية.',
    electricity: {
      type: 'solar_24_7',
      label: 'أمبيرات المجمع 24 ساعة + طاقة شمسية احتياطية',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت واي فاي سريع 4G',
    hasPool: true,
    poolDetails: {
      isHeated: false,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    amenities: [
      'إطلالة مباشرة على البحر',
      'شاطئ خاص ومسابح المجمع',
      'مصعد يعمل على مدار الساعة',
      'أمن وحراسة 24/7',
      'مطبخ أمريكي متكامل',
      'غسالة ملابس وشاشة ذكية',
      'قريب من الأسواق والمطاعم'
    ],
    host: {
      name: 'م. سامر الساحلي',
      phone: '+963944556677',
      whatsapp: '963944556677',
      isSuperhost: true,
      responseRate: '98% خلال 30 دقيقة'
    },
    featured: true,
    urgencyTag: 'بقي شاليه واحد فقط بهذا السعر',
    isGeniusDeal: true,
    hasPriceFreeze: true,
    energyMetrics: {
      batteryPercent: 88,
      solarKw: 8,
      generatorBackup: true
    }
  },
  {
    id: 'prop-3',
    title: 'كوخ جبلي دافئ بإطلالة على جبال بلودان الساحرة',
    type: 'chalet',
    governorate: 'ريف دمشق',
    area: 'بلودان - التل المشرف',
    priceUsd: 70,
    dayUsePriceUsd: 50,
    rentalType: 'both',
    instantBooking: false,
    discountWeeklyPercent: 12,
    securityDepositUsd: 25,
    rating: 4.92,
    reviewCount: 29,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      electricity: 4.7,
      host: 4.9,
      value: 5.0
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: true,
      petsAllowed: true
    },
    coordinates: {
      lat: 33.7333,
      lng: 36.0000
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 6,
    description: 'كوخ خشبي وحجري أصيل بين أشجار الصنوبر والتفاح في بلودان. جو عليل وطبيعة خلابة، موقد حطب (شومينيه) دافئ للأمسيات الشتوية والخريفية، مع تراس واسع يطل على سهل الزبداني بالكامل.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة شمسية مستمرة مع تدفئة مركزية وشومينيه',
      hasAirConditioningOnSolar: false
    },
    hasWifi: true,
    wifiSpeed: 'شبكة 4G جيدة',
    hasPool: false,
    hasWaterReserve: true,
    amenities: [
      'موقد نار حطب (شومينيه)',
      'تراس جبلي بانورامي',
      'حديقة فواكه خاصة',
      'طاقة شمسية مستمرة',
      'تدفئة شتوية مجهزة',
      'شواية حجرية خارجية'
    ],
    host: {
      name: 'كريم بلودان',
      phone: '+963955443322',
      whatsapp: '963955443322',
      isSuperhost: false,
      responseRate: '95% خلال ساعة'
    }
  },
  {
    id: 'prop-4',
    title: 'شقة دمشقية تراثية مرممة مع بحرة وأرابيسك',
    type: 'apartment',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حارة الزيتون (باب توما)',
    priceUsd: 65,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 20,
    rating: 4.97,
    reviewCount: 52,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 4.9,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5138,
      lng: 36.3130
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    description: 'عيش سحر الشام العتيقة في بيت دمشقي أصيل مرمم بأعلى معايير الرفاهية. فناء سماوي تتوسطه بحرة رخامية ونارنج وياسمين. جدران حجرية مزينة بالخشب المدهون والموزاييك والزجاج الملون. دقائق مشياً عن ساحة باب توما والقيمرية.',
    electricity: {
      type: 'solar_24_7',
      label: 'نظام طاقة شمسية وإنفيرتر 24/7 متواصل',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر نت سريع 30 ميغا',
    hasPool: false,
    hasWaterReserve: true,
    amenities: [
      'بحرة دمشقية وفناء مفتوح',
      'طاقة شمسية 24/7',
      'تكييف وتدفئة',
      'إنترنت عالي السرعة',
      'مطبخ تقليدي مجهز',
      'موقع سياحي وتراثي استثنائي'
    ],
    host: {
      name: 'سارة التراثية',
      phone: '+963988119944',
      whatsapp: '963988119944',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'prop-5',
    title: 'فيلا الشاطئ الأزرق مع مسبح خاص وقرب البحر',
    type: 'chalet',
    governorate: 'اللاذقية',
    area: 'الشاطئ الأزرق - قرب منتجع الكوت ديزور',
    priceUsd: 110,
    dayUsePriceUsd: 75,
    rentalType: 'both',
    instantBooking: true,
    discountWeeklyPercent: 12,
    securityDepositUsd: 35,
    rating: 4.85,
    reviewCount: 31,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 4.9,
      host: 4.8,
      value: 4.7
    },
    houseRules: {
      familiesOnly: true,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 35.5317,
      lng: 35.7901
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    description: 'فيلا مستقلة راقية قريبة جداً من رمال الشاطئ الأزرق باللاذقية. مسبح خاص وحديقة محاطة بالأشجار، غرف نوم واسعة مكيفة، صالة جلوس عصرية، مياه عذبة مستمرة، ومثالية للعائلات والتجمعات الصيفية.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدة خاصة بالفيلا + طاقة شمسية للإضاءة والتبريد',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي 4G عالي السرعة',
    hasPool: true,
    poolDetails: {
      isHeated: false,
      isIndoor: false,
      hasPrivacyScreen: true
    },
    hasWaterReserve: true,
    amenities: [
      'مسبح خاص معقم',
      'على بعد 150 متر من البحر',
      'طاقة مستمرة 24/7',
      'تكييف في جميع الغرف',
      'جلسات شواء خارجية',
      'كراج خاص مغلق'
    ],
    host: {
      name: 'هاني اللاذقاني',
      phone: '+963966778899',
      whatsapp: '963966778899',
      isSuperhost: false,
      responseRate: '92% خلال ساعتين'
    }
  },
  {
    id: 'prop-6',
    title: 'شقة VIP فندقية مفروشة في أرقى أحياء حلب الشهباء',
    type: 'apartment',
    governorate: 'حلب',
    area: 'حلب - حي الشهباء الجديدة',
    priceUsd: 55,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    securityDepositUsd: 20,
    rating: 4.89,
    reviewCount: 24,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      electricity: 4.8,
      host: 4.9,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 36.2021,
      lng: 37.1343
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: 'شقة مودرن ومؤثثة بأفخر الأثاث التركي والإيطالي في حي الشهباء الجديدة الهادئ. تدفئة وتكييف مركزي، شاشات سمارت، مطبخ راقٍ مجهز بأدوات إعداد القهوة والطبخ، ومصعد يعمل على الطاقة البديلة.',
    electricity: {
      type: 'solar_24_7',
      label: 'أمبيرات مخصصة 24/7 + إنفيرتر داخلي ذكي',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر سريع',
    hasPool: false,
    hasWaterReserve: true,
    amenities: [
      'أثاث VIP حديث جداً',
      'كهرباء وأمبيرات 24 ساعة',
      'إنترنت سريع',
      'موقف سيارة آمن',
      'قريب من كافيهات ومطاعم الشهباء'
    ],
    host: {
      name: 'عمار الحلبي',
      phone: '+963933990011',
      whatsapp: '963933990011',
      isSuperhost: true,
      responseRate: '99% خلال 10 دقائق'
    }
  },
  {
    id: 'prop-7',
    title: 'فيلا خضراء وإطلالة على وادي النضارة ومشتى الحلو',
    type: 'chalet',
    governorate: 'حمص',
    area: 'مشتى الحلو - الوادي الأخضر',
    priceUsd: 75,
    dayUsePriceUsd: 55,
    rentalType: 'both',
    instantBooking: false,
    discountWeeklyPercent: 10,
    securityDepositUsd: 25,
    rating: 4.94,
    reviewCount: 36,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      electricity: 4.8,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: true,
      petsAllowed: true
    },
    coordinates: {
      lat: 34.9200,
      lng: 36.2300
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    description: 'استمتع بنسيم الجبل والضباب الصباحي في مشتى الحلو ووادي النضارة. فيلا جبلية بموقع مرتفع يطل على أشجار السنديان والتفاح. أجواء ريفية أصيلة مع كافة وسائل الراحة الحديثة.',
    electricity: {
      type: 'solar_24_7',
      label: 'منظومة طاقة شمسية كاملة 24 ساعة',
      hasAirConditioningOnSolar: false
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي 4G',
    hasPool: false,
    hasWaterReserve: true,
    amenities: [
      'إطلالة خضراء خلابة',
      'طاقة شمسية 24/7',
      'تراس واسع للشاي والقهوة',
      'شواية ومعدات نزهة وسيران',
      'مياه ينابيع عذبة ونقية'
    ],
    host: {
      name: 'طوني الوادي',
      phone: '+963955661122',
      whatsapp: '963955661122',
      isSuperhost: true,
      responseRate: '100% خلال 20 دقيقة'
    }
  },
  {
    id: 'prop-8',
    title: 'فندق ونزل دمشق البوتيكي - غرف وأجنحة ساحرة',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - حي القنوات العريق',
    priceUsd: 50,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    rating: 4.82,
    reviewCount: 67,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 4.9,
      host: 4.9,
      value: 4.7
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5080,
      lng: 36.2950
    },
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'غرفة فندقية ديلوكس في فندق بوتيكي أنيق يجمع بين عبق التاريخ السوري والخدمة الفندقية الحديثة. يتضمن بوفيه إفطار دمشقي يومي، خدمة تنظيف الغرف، واستقبال يعمل على مدار 24 ساعة.',
    electricity: {
      type: 'solar_24_7',
      label: 'كهرباء فندقية متواصلة 24 ساعة بمولدات خاصة',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر نت فندقي مجاني ومفتوح',
    hasPool: false,
    hasWaterReserve: true,
    hotelStars: 4,
    urgencyTag: 'بقي غرفتان فقط بهذا السعر!',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 29,
    roomOptions: [
      {
        id: 'r-8-std',
        name: 'غرفة قياسية كلاسيكية بسرير كينغ',
        bedType: '1 سرير كينغ مزدوج',
        maxGuests: 2,
        pricePerNightUsd: 50,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على الحارة الدمشقية القديمة',
        availableRoomsCount: 2,
        amenities: ['تكييف مركزي', 'واي فاي فايبر', 'إفطار دمشقي', 'شاشة ذكية 43 بوصة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-8-dlx',
        name: 'جناح ديلوكس ياسمين مع شرفة تراثية',
        bedType: '1 سرير كينغ + أريكة سرير',
        maxGuests: 3,
        pricePerNightUsd: 75,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة الفندق والنافورة',
        availableRoomsCount: 3,
        amenities: ['جاكوزي خاص', 'إفطار مجاني VIP', 'ميني بار مجاني', 'آلة إسبريسو']
        ,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'إفطار صباحي دمشقي مجاني',
      'كهرباء وتكييف 24/7',
      'استقبال وحراسة 24 ساعة',
      'تنظيف غرف يومي',
      'قريب من سوق الحميدية والقلعة'
    ],
    host: {
      name: 'إدارة فندق الياسمين',
      phone: '+963112233445',
      whatsapp: '963944001122',
      isSuperhost: true,
      responseRate: 'فورية خلال دقيقتين'
    }
  },
  {
    id: 'prop-9',
    title: 'منتجع وفندق الريفيرا 5 نجوم مع شاطئ ومسبح خاص',
    type: 'hotel',
    governorate: 'اللاذقية',
    area: 'الشاطئ الأزرق - الواجهة البحرية',
    priceUsd: 95,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 15,
    hotelStars: 5,
    urgencyTag: 'طلب مرتفع جداً - تم حجزه 42 مرة هذا الأسبوع!',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 48 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 42,
    rating: 4.96,
    reviewCount: 118,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      electricity: 5.0,
      host: 4.9,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 35.5800,
      lng: 35.7400
    },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: 'منتجع فندقي خمس نجوم بإطلالة ساحلية مباشرة على البحر الأبيض المتوسط. شاطئ رملي خاص، مسابح أولمبية مدفأة، نادي صحي وسبا، ومطاعم تقدم أشهى المأكولات البحرية والعالمية. خدمة فندقية على مدار الساعة مع كهرباء وتكييف متواصل بنسبة 100%.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة طاقة وتوليد خاصة بالمنتجع 24/7 متواصلة',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر أوبتك فندقي بسرعة 100 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: true,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    roomOptions: [
      {
        id: 'r-9-std',
        name: 'غرفة سوبيريور بإطلالة بحرية جانبية',
        bedType: '1 سرير كينغ فاخر أو سريرين منفصلين',
        maxGuests: 2,
        pricePerNightUsd: 95,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بحرية جانبية رائعة',
        availableRoomsCount: 4,
        amenities: ['شرفة خاصة', 'بوفيه إفطار إنتركونتيننتال', 'دخول مجاني للنادي الصحي والمسابح']
        ,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-9-royal',
        name: 'جناح الملوك البانورامي مع شرفة على البحر مباشرة',
        bedType: '1 سرير كينغ ملكي + صالون منفصل',
        maxGuests: 4,
        pricePerNightUsd: 160,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بحرية بانورامية كاملة 180 درجة',
        availableRoomsCount: 1,
        amenities: ['جاكوزي خاص مع إطلالة بحرية', 'بوفيه إفطار وعشاء مشمول', 'خدمة الكونسيرج الخاصة', 'ميني بار مجاني']
        ,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'شاطئ رملي خاص مجهز',
      'مسابح إنفينيتي مدفأة',
      'بوفيه إفطار مفتوح عالمي',
      'نادي صحي وسبا وجاكوزي',
      'خدمة غرف وكونسيرج 24/7',
      'مواقف سيارات خاصة مع حراسة'
    ],
    host: {
      name: 'منتجع الريفيرا اللاذقية',
      phone: '+96341221100',
      whatsapp: '963966554433',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'prop-10',
    title: 'فندق قصر الشام التراثي 5 نجوم - أجنحة ملكية',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - باب توما والقيمرية',
    priceUsd: 110,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'بقي جناح واحد فقط لهذا اليوم!',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 34,
    rating: 4.98,
    reviewCount: 94,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 5.0,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5115,
      lng: 36.3120
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: 'قصر شامي أصيل يعود للقرن الثامن عشر تم ترميمه وتحويله إلى فندق فخم من فئة 5 نجوم. بحرة شمسية رخامية، جدران مزينة بالعجمي الدمشقي، أثاث مطعم بالصدف، وإفطار شرقي غني يقدم في الإيوان التراثي مع ألحان العود.',
    electricity: {
      type: 'solar_24_7',
      label: 'نظام طاقة مزدوج هجين يضمن الكهرباء والتكييف 24 ساعة دون أي انقطاع',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر نت فائق السرعة 80 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    roomOptions: [
      {
        id: 'r-10-suite',
        name: 'جناح العجمي التراثي الملكي',
        bedType: '1 سرير كينغ شامي مطعم بالصدف',
        maxGuests: 2,
        pricePerNightUsd: 110,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة القصر والبحرة الرخامية',
        availableRoomsCount: 2,
        amenities: ['إفطار دمشقي ملكي في الغرفة', 'حمام رخامي تركي مع جاكوزي', 'ضيافة فواكه وحلويات شامية ترحيبية']
        ,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-10-grand',
        name: 'الجناح الأموي الرئاسي الفاخر',
        bedType: 'سريرين كينغ ملكي في غرفتين متصلتين',
        maxGuests: 4,
        pricePerNightUsd: 190,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'شرفة خاصة تطل على حارات دمشق القديمة',
        availableRoomsCount: 1,
        amenities: ['غرفتي نوم وصالون استقبال خاص', 'خدمة المساعد الشخصي (Butler)', 'جولة سياحية خاصة مجانية في دمشق القديمة']
        ,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'إفطار دمشقي ملكي فاخر مجاني',
      'كهرباء وتكييف متواصل 24/7',
      'خدمة استقبال وتوصيل خاصة',
      'مقهى ومطعم تراثي في باحة القصر',
      'خدمة تنظيف الغرف مرتين يومياً',
      'أمن واستقبال على مدار الساعة'
    ],
    host: {
      name: 'فندق قصر الشام التراثي',
      phone: '+963115432100',
      whatsapp: '963933887766',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-fs-damascus',
    title: 'فندق فور سيزونز دمشق 5 نجوم ديلوكس (Four Seasons Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع شكري القوتلي (المرجة / ضفاف بردى)',
    priceUsd: 180,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 5,
    urgencyTag: 'مطلوب بشدة - إطلالة بانورامية على جبل قاسيون',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 42,
    rating: 4.97,
    reviewCount: 184,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 5.0,
      host: 4.9,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5138,
      lng: 36.2917
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'أرقى فنادق العاصمة السورية فئة 5 نجوم ديلوكس. غرف وأجنحة فسيحة مع إطلالات ساحرة على جبل قاسيون ودمشق القديمة، مسبح دافئ خارجي، مركز سبا وحمام بخار، مطاعم عالمية فاخرة، وخدمة فندقية بمستويات عالمية تلبي متطلبات الدبلوماسيين والمغتربين ورجال الأعمال.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة طاقة وتكييف مركزي متواصل 24/7 دون أي انقطاع',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 100,
      solarKw: 120,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر ألياف ضوئية فندقية فائقة السرعة 100 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: true,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-fs-deluxe',
        name: 'غرفة ديلوكس كينغ بإطلالة على قاسيون',
        bedType: '1 سرير كينغ مزدوج فاخر',
        maxGuests: 2,
        pricePerNightUsd: 180,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مباشرة على جبل قاسيون ونهر بردى',
        availableRoomsCount: 3,
        amenities: ['بوفيه إفطار عالمي مفتوح', 'حمام رخامي إيطالي وحوض استحمام', 'خدمة الكونسيرج 24 ساعة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-fs-suite',
        name: 'جناح تنفيذي مع صالون استقبال خاص',
        bedType: '1 سرير كينغ كبير + صوفا دمشقية',
        maxGuests: 3,
        pricePerNightUsd: 270,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بانورامية بزاوية 180 درجة على دمشق',
        availableRoomsCount: 1,
        amenities: ['تسجيل وصول ومغادرة سريع VIP', 'ضيافة فواكه وشوكولا ترحيبية', 'دخول مجاني للنادي الصحي والسبا']
        ,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'مسبح خارجي دافئ ومنطقة استجمام',
      'بوفيه إفطار عالمي ومأكولات شرقية فاخرة',
      'كهرباء وتكييف مركزي 24/7',
      'سبا ومركز لياقة بدنية حديث',
      'مواقف سيارات مع خدمة الفاليه',
      'أمن فندقي واستقبال على مدار الساعة'
    ],
    host: {
      name: 'إدارة فندق فور سيزونز دمشق',
      phone: '+963113391000',
      whatsapp: '963944112233',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-sheraton-damascus',
    title: 'فندق شيراتون دمشق 5 نجوم (Sheraton Damascus Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - ساحة الأمويين / أوتوستراد المزة',
    priceUsd: 140,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'موقع استراتيجي بساحة الأمويين',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 37,
    rating: 4.89,
    reviewCount: 210,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      electricity: 5.0,
      host: 4.9,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5118,
      lng: 36.2730
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'الفندق الأيقوني الشهير بتصميمه المعماري الشرقي الفريد المستوحى من العمارة الإسلامية والأقواس الشامية. يتميز بموقعه الاستراتيجي في ساحة الأمويين قرب دار الأوبرا، وتحيط به حدائق شاسعة ومسبح خارجي بمقاييس نصف أولمبية.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة ومولدات ضخمة مستمرة 24 ساعة بدون انقطاع',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 98,
      solarKw: 95,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر عالي السرعة 60 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: false,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-sheraton-classic',
        name: 'غرفة كلاسيكية مزدوجة مطلة على الحدائق',
        bedType: '1 سرير كينغ أو سريرين منفصلين',
        maxGuests: 2,
        pricePerNightUsd: 140,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على مسبح الفندق وحدائق ساحة الأمويين',
        availableRoomsCount: 4,
        amenities: ['إفطار بوفيه شامي مفتوح', 'مكتب عمل وشاشة ذكية', 'ماكينة قهوة وشاي']
        ,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-sheraton-diplomatic',
        name: 'جناح دبلوماسي فاخر',
        bedType: '1 سرير كينغ ملكي + صالون واسع',
        maxGuests: 3,
        pricePerNightUsd: 220,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بانورامية على ساحة الأمويين وجبل قاسيون',
        availableRoomsCount: 2,
        amenities: ['ميني بار مجاني', 'دخول صالة كبار الشخصيات Executive Lounge', 'خدمة غسيل وكي ملابس سريعة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'مسبح نصف أولمبي وسط حدائق الفندق',
      'مطاعم شرقية وإيطالية راقية',
      'ملاعب تنس وحدائق للتنزه',
      'قاعات مؤتمرات واجتماعات مجهزة',
      'كهرباء وتكييف متواصل 24/7',
      'أمن واستقبال 24 ساعة'
    ],
    host: {
      name: 'فندق شيراتون دمشق',
      phone: '+963112229300',
      whatsapp: '963955223344',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-mamlouka-damascus',
    title: 'فندق بيت المملوكة التراثي - قصر مملوكي من القرن الـ17 (Beit Al Mamlouka)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حارة الجورة (باب توما)',
    priceUsd: 95,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 15,
    hotelStars: 5,
    urgencyTag: 'قصر أثري أصيل - غرف محدودة جداً',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 28,
    rating: 4.98,
    reviewCount: 142,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 4.9,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5135,
      lng: 36.3150
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'أول فندق بوتيكي تاريخي في دمشق القديمة، قصر مملوكي عريق يعود للقرن السابع عشر. صحن دار فسيح بالحجر الأبلق الأسود والأبيض، بحرة رخامية دمشقية خريرها يملأ المكان، وأشجار النارنج والياسمين الدمشقي العبق. أجنحة ملكية بأسماء قادة التاريخ (بيبرس، قطز، شجرة الدر) مع أسقف خشبية عجمية مذهبة ومفروشات مرصعة بالصدف.',
    electricity: {
      type: 'solar_24_7',
      label: 'منظومة طاقة شمسية ليثيوم 24/7 خاصة بالقصور التراثية',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 96,
      solarKw: 45,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر مجاني 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-mamlouka-baybars',
        name: 'جناح الظاهر بيبرس الملكي (سقف عجمي مذهب)',
        bedType: '1 سرير كينغ دمشقي مطعم بالصدف',
        maxGuests: 2,
        pricePerNightUsd: 125,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مباشرة على صحن الدار والبحرة الرخامية',
        availableRoomsCount: 1,
        amenities: ['فطور شامي أصيل مع فتة بالسمنة والمربيات الدمشقية', 'حمام شامي تقليدي من الرخام الأصيل', 'قهوة عربية وضيافة راحة الحلقوم']
        ,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-mamlouka-durr',
        name: 'غرفة شجرة الدر التراثية',
        bedType: '1 سرير مزدوج مريح',
        maxGuests: 2,
        pricePerNightUsd: 95,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة الياسمين الدمشقي',
        availableRoomsCount: 2,
        amenities: ['إفطار دمشقي يومي في صحن الدار', 'تكييف وتدفئة مستقلة', 'مشروبات شامية طبيعية ترحيبية']
        ,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'فطور شامي أصيل يومي في صحن القصر',
      'طاقة شمسية وتكييف مستمر 24/7',
      'جلسات شاي بالنعناع وأركيلة في الإيوان',
      'قريب جداً من كنيسة حنانيا والشارع المستقيم',
      'خدمة تنظيم جولات سياحية مشياً بدمشق القديمة',
      'استقبال دافئ على مدار الساعة'
    ],
    host: {
      name: 'فندق بيت المملوكة التراثي',
      phone: '+963115430445',
      whatsapp: '963933771122',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-wali-damascus',
    title: 'فندق بيت الوالي 5 نجوم التراثي الفاخر (Beit Al Wali Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حارة بولاد (باب شرقي)',
    priceUsd: 115,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 5,
    urgencyTag: 'تحفة العمارة الدمشقية العثمانية',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
    isGeniusDeal: true,
    bookingCountPastWeek: 31,
    rating: 4.97,
    reviewCount: 166,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 5.0,
      host: 4.9,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5098,
      lng: 36.3180
    },
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'قصر دمشقي عثماني فخم من القرن الثامن عشر، يمثل أوج الفخامة والضيافة الشامية. باحة سماوية واسعة تزينها بحرة نافورة ضخمة ونباتات البوغنفيل والياسمين، إيوان عريق بجلسات دمشقية مطرزة، وغرف مزينة بالزجاج المعشق والفسيفساء الخشبية النادرة.',
    electricity: {
      type: 'solar_24_7',
      label: 'نظام طاقة شمسية ومولدات هجينة 24/7 دون انقطاع',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 97,
      solarKw: 60,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر سريع 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-wali-royal',
        name: 'جناح الوالي الملكي الفاخر',
        bedType: '1 سرير كينغ عثماني مطعم بالصدف',
        maxGuests: 2,
        pricePerNightUsd: 155,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على إيوان القصر والبحرة الرخامية',
        availableRoomsCount: 1,
        amenities: ['إفطار شامي ملكي متعدد الأصناف', 'حمام رخامي واسع مع جاكوزي', 'شاي شامي وحلويات دمشقية']
        ,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-wali-jasmine',
        name: 'غرفة ياسمين الشام ديلوكس',
        bedType: '1 سرير كينغ مريح',
        maxGuests: 2,
        pricePerNightUsd: 115,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على ممرات القصر التراثية',
        availableRoomsCount: 3,
        amenities: ['إفطار غني في الصحن السماوي', 'تكييف مركزي متواصل 24/7', 'واي فاي سريع']
        ,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'إفطار دمشقي شهي متكامل في الباحة السماوية',
      'تكييف وكهرباء 24/7 دون أي انقطاع',
      'مطعم شامي فاخر يقدم أشهى الأطباق التراثية',
      'موقع هادئ جداً قرب باب شرقي والأسواق القديمة',
      'خدمة حجز سيارات VIP وسائقين',
      'استقبال وأمن على مدار الساعة'
    ],
    host: {
      name: 'فندق بيت الوالي',
      phone: '+963115434500',
      whatsapp: '963944556677',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-damarose-damascus',
    title: 'فندق داما روز دمشق 5 نجوم (Dama Rose Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - أوتوستراد شكري القوتلي (جسر الرئيس / المعرض القديم)',
    priceUsd: 130,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 5,
    urgencyTag: 'قلب العاصمة التجاري والسياحي',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني متاح',
    isGeniusDeal: true,
    bookingCountPastWeek: 33,
    rating: 4.86,
    reviewCount: 195,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.9,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5145,
      lng: 36.2905
    },
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'فندق داما روز (المريديان سابقاً)، أحد أعرق معالم الضيافة في قلب دمشق. يطل على نهر بردى وحديقة المعرض وقاسيون، ويحتوي على مسبح خارجي ونادي صحي ومطاعم إيطالية وشرقية متميزة وقاعات مؤتمرات دولية.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة كهرباء فندقية وتكييف مركزي 24/7',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 99,
      solarKw: 80,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'فايبر ألياف ضوئية فندقية 70 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: false,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-damarose-standard',
        name: 'غرفة سوبيريور كينغ مطلة على المدينة',
        bedType: '1 سرير كينغ مزدوج',
        maxGuests: 2,
        pricePerNightUsd: 130,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على وسط دمشق وجسر الرئيس',
        availableRoomsCount: 5,
        amenities: ['بوفيه إفطار غني مفتوح', 'تكييف مركزي', 'موقف سيارات مجاني']
        ,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'مسبح خارجي ونادي صحي',
      'بوفيه إفطار دمشقي وعالمي',
      'موقع مركزي دقيقة واحدة عن جسر الرئيس ومتحف دمشق الوطني',
      'كهرباء وتكييف 24/7',
      'مواقف سيارات واسعة ومجانية',
      'استقبال وأمن على مدار الساعة'
    ],
    host: {
      name: 'فندق داما روز دمشق',
      phone: '+963113329000',
      whatsapp: '963955443322',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-cham-damascus',
    title: 'فندق الشام بالاس 5 نجوم (Cham Palace Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع ميسلون (الصالحية والشعلان)',
    priceUsd: 110,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 5,
    urgencyTag: 'قلب الأسواق والمقاهي في الصالحية والشعلان',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 35,
    rating: 4.84,
    reviewCount: 170,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.9,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5170,
      lng: 36.2965
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقع فندق الشام بالاس في أرقى نقطة تسوق وسياحة بدمشق في شارع ميسلون بين الشعلان والصالحية. يمتاز ببهوه الداخلي الفسيح المصمم على شكل أذريوم بارتفاع 11 طابقاً ومصاعده الزجاجية البانورامية ومطعمه الدوار في الطابق العلوي.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة طاقة مستقلة وتكييف مركزي متواصل 24 ساعة',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 95,
      solarKw: 75,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فندقي فايبر 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-cham-deluxe',
        name: 'غرفة ديلوكس كينغ مطلة على شوارع الشام',
        bedType: '1 سرير كينغ مزدوج',
        maxGuests: 2,
        pricePerNightUsd: 110,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على شارع ميسلون والصالحية',
        availableRoomsCount: 4,
        amenities: ['إفطار بوفيه صباحي مفتوح', 'تكييف مركزي 24 ساعة', 'شاشة تلفاز ذكية وميني بار']
        ,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع سياحي وتسوق من الدرجة الأولى',
      'بوفيه إفطار دمشقي وعالمي غني',
      'مصاعد بانورامية ومطاعم متنوعة',
      'كهرباء وتكييف 24/7 دون انقطاع',
      'استقبال وصرافة وخدمات رجال أعمال 24 ساعة'
    ],
    host: {
      name: 'فندق الشام بالاس',
      phone: '+963112232300',
      whatsapp: '963944665544',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-talisman-damascus',
    title: 'فندق طالسمان التراثي الفاخر مع مسبح صحن الدار (Talisman Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حارة القشلة / حي الأمين',
    priceUsd: 105,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'فندق بوتيكي مع مسبح خاص بصحن الدار',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 26,
    rating: 4.95,
    reviewCount: 118,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 4.9,
      host: 4.9,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5075,
      lng: 36.3130
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'قصر دمشقي تاريخي نادر يجمع بين الهدوء المطلق والجمال المعماري الآسر. ينفرد بوجود مسبح رائع في الفناء الأثري الداخلي تحيط به الأقواس الحجرية الأندلسية والدمشقية وأشجار الليمون، وتتميز غرفه بجدران حجرية عازلة للصوت ومفروشات شرقية باذخة.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة شمسية ليثيوم 24/7 مع تكييف كامل',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 96,
      solarKw: 40,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر مجاني 40 ميغابت',
    hasPool: true,
    poolDetails: {
      isHeated: true,
      isIndoor: false,
      hasPrivacyScreen: true
    },
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-talisman-suite',
        name: 'جناح طالسمان الحجري المطل على المسبح',
        bedType: '1 سرير كينغ ملكي فخم',
        maxGuests: 2,
        pricePerNightUsd: 135,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مباشرة على مسبح صحن الدار',
        availableRoomsCount: 2,
        amenities: ['إفطار دمشقي استثنائي بجانب المسبح', 'حمام رخامي تاريخي', 'هدوء تام وعزل صوتي كامل']
        ,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-talisman-standard',
        name: 'غرفة ديلوكس تراثية أنيقة',
        bedType: '1 سرير مزدوج دمشقي',
        maxGuests: 2,
        pricePerNightUsd: 105,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة الدار التاريخية',
        availableRoomsCount: 2,
        amenities: ['إفطار شامي مجاني', 'تكييف وتدفئة مستقلة', 'واي فاي سريع مجاني']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'مسبح معقم في باحة القصر التراثية',
      'فطور شامي استثنائي في صحن الدار',
      'طاقة شمسية وتكييف 24/7 مستمر',
      'جلسات رومانسية هادئة تحت النجوم',
      'أمن واستقبال عائلي دافئ 24 ساعة'
    ],
    host: {
      name: 'فندق طالسمان دمشق القديمة',
      phone: '+963115438800',
      whatsapp: '963933990011',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-ebla-damascus',
    title: 'فندق إيبلا الشام 5 نجوم (Ebla Cham Palace Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - طريق مطار دمشق الدولي (مدينة المعارض)',
    priceUsd: 95,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'مسبح أولمبي وحدائق استوائية واسعة',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 29,
    rating: 4.86,
    reviewCount: 145,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.9,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.4350,
      lng: 36.3850
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'منتجع وفندق إيبلا الشام 5 نجوم يقع على طريق مطار دمشق الدولي بمحاذاة مدينة المعارض. يمتاز بمساحاته الخضراء الهائلة ومسبحه الأولمبي الصيفي وملاعب التنس وقاعات المؤتمرات الفخمة، ويوفر خدمة نقل مجانية مباشرة من وإلى مطار دمشق الدولي.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة توليد كهربائية متواصلة 24/7 مع تكييف مركزي كامل',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 98,
      solarKw: 120,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر 50 ميغابت مجاني',
    hasPool: true,
    poolDetails: {
      isHeated: false,
      isIndoor: false,
      hasPrivacyScreen: false
    },
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-ebla-deluxe',
        name: 'غرفة ديلوكس كينغ مطلة على المسبح والحدائق',
        bedType: '1 سرير كينغ مريح جداً',
        maxGuests: 2,
        pricePerNightUsd: 95,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بانورامية على المسبح الأولمبي',
        availableRoomsCount: 5,
        amenities: ['بوفيه إفطار عالمي غني', 'دخول مجاني للمسبح وملاعب التنس', 'شاتل نقل المطار مجاناً']
        ,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-ebla-suite',
        name: 'جناح إيبلا التنفيذي الفاخر',
        bedType: '1 سرير كينغ كبير + صالون معيشة منفصل',
        maxGuests: 3,
        pricePerNightUsd: 140,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مزدوجة على الحدائق والمسبح',
        availableRoomsCount: 2,
        amenities: ['صالون ضيافة مستقل', 'إفطار في الجناح', 'سلة فواكه ومشروبات ترحيبية مجانية']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'مسبح أولمبي وحدائق شاسعة',
      'توصيل مجاني من وإلى مطار دمشق الدولي',
      'بوفيه إفطار مفتوح عالمي وسوري',
      'ملاعب تنس ونادٍ رياضي متكامل',
      'كهرباء وتكييف 24 ساعة دون أي انقطاع'
    ],
    host: {
      name: 'فندق إيبلا الشام 5 نجوم',
      phone: '+963112241100',
      whatsapp: '963955667788',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-bluetower-damascus',
    title: 'فندق بلو تاور 4 نجوم (Blue Tower Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع الحمراء (الصالحية والشعلان)',
    priceUsd: 85,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'قلب الأسواق والمطاعم في شارع الحمراء',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 31,
    rating: 4.82,
    reviewCount: 130,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5185,
      lng: 36.2940
    },
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقع فندق بلو تاور في قلب شارع الحمراء الراقي، أحد أشهر شوارع التسوق والمقاهي في دمشق بجوار حي الشعلان والصالحية. تصاميم عصرية غاية في الأناقة، خدمة فندقية 4 نجوم معتمدة، وقربه الشديد من كافة الأماكن الحيوية والمراكز التجارية.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدات فندقية ومنظومة طاقة 24/7 دون أي انقطاع',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر سريع 40 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-bluetower-standard',
        name: 'غرفة سوبيريور عصرية في شارع الحمراء',
        bedType: '1 سرير كينغ مزدوج',
        maxGuests: 2,
        pricePerNightUsd: 85,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على حيوية شارع الحمراء',
        availableRoomsCount: 4,
        amenities: ['إفطار بوفيه صباحي مجاني', 'شاشة ذكية وتكييف مركزي', 'ميني بار وغلاية قهوة']
        ,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع استراتيجي وسط أرقى شوارع التسوق',
      'إفطار صباحي بوفيه متنوع',
      'كهرباء وتكييف 24/7 متواصل',
      'خدمة غرف ومصبغة واستقبال على مدار الساعة',
      'خدمة حجز سيارات وتوصيل'
    ],
    host: {
      name: 'فندق بلو تاور دمشق',
      phone: '+963113340240',
      whatsapp: '963966554433',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-omayad-damascus',
    title: 'فندق أمية 4 نجوم العريق (Omayad Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع البرازيل / ساحة النجمة',
    priceUsd: 75,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'قرب السفارات وساحة النجمة وأبو رمانة',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 22,
    rating: 4.80,
    reviewCount: 95,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5180,
      lng: 36.2900
    },
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'فندق أمية هو أحد أعرق وأشهر فنادق دمشق الكلاسيكية. يقع في شارع البرازيل قرب ساحة النجمة وحي أبو رمانة الدبلوماسي. يجمع بين العراقة الدمشقية الكلاسيكية والخدمات الفندقية المتكاملة مع مطعم شرقي عريق يقدم أشهى الأطباق الشامية.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة ومولدات فندقية 24/7 مع تكييف كامل',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي فندقي سريع',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-omayad-standard',
        name: 'غرفة كلاسيكية مزدوجة في ساحة النجمة',
        bedType: '1 سرير مزدوج أو 2 سرير فردي',
        maxGuests: 2,
        pricePerNightUsd: 75,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على شارع البرازيل الهادئ',
        availableRoomsCount: 3,
        amenities: ['إفطار دمشقي بوفيه', 'تكييف مركزي متواصل', 'حمام خاص وتلفاز']
        ,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع هادئ وراقي في حي السفارات والنجمة',
      'مطعم شرقي عريق مشهور بأطباق المطبخ الشامي',
      'كهرباء وتكييف 24 ساعة دون انقطاع',
      'استقبال وصرافة 24/7',
      'مواقف سيارات آمنة'
    ],
    host: {
      name: 'فندق أمية دمشق',
      phone: '+963112217700',
      whatsapp: '963944332211',
      isSuperhost: false,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-zafran-damascus',
    title: 'فندق بيت زعفرانة التراثي الفاخر (Beit Zafran Hotel de Charme)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - باب توما / حارة القشلة',
    priceUsd: 115,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'قصر دمشقي ساحر من القرن الـ19 ببحرة ونارنج',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 25,
    rating: 4.97,
    reviewCount: 112,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 5.0,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5110,
      lng: 36.3150
    },
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'قصر "بيت زعفرانة" هو تحفة معمارية أندلسية دمشقية تعود للقرن التاسع عشر في حارة القشلة الأثرية بباب توما. يتميز بباحة سماوية باهرة تتوسطها نافورة مياه عذبة محاطة بأشجار الياسمين والنارنج والورد الجوري، وتتميز أجنحته بأسقف خشبية عجمية مذهبة تعكس أوج الفخامة الشامية التاريخية.',
    electricity: {
      type: 'solar_24_7',
      label: 'منظومة طاقة شمسية ليثيوم هجينة 24/7 مع تكييف كامل',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 97,
      solarKw: 45,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر عالي السرعة 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-zafran-suite',
        name: 'الجناح الملوكي العجمي بأسقف خشبية مذهبة',
        bedType: '1 سرير كينغ تاريخي ملوكي',
        maxGuests: 2,
        pricePerNightUsd: 135,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مباشرة على بحرة صحن الدار وشجر النارنج',
        availableRoomsCount: 2,
        amenities: ['إفطار شامي ملكي فخم في صحن الدار', 'حمام رخامي تاريخي واسع', 'ضيافة زعفران وياسمين مجانية']
        ,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-zafran-deluxe',
        name: 'غرفة زعفرانة ديلوكس التراثية الدافئة',
        bedType: '1 سرير مزدوج دمشقي فخم',
        maxGuests: 2,
        pricePerNightUsd: 115,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على الإيوان وباحة القصر',
        availableRoomsCount: 2,
        amenities: ['فطور شامي بيتي غني', 'تكييف وتدفئة مستقلة 24/7', 'هدوء تام وعزل صوتي']
        ,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'فناء قصر دمشقي تاريخي ببحرة رخامية وأشجار نارنج',
      'فطور شامي بيتي ملكي يقدَم في باحة القصر',
      'طاقة شمسية وتكييف وتدفئة 24/7',
      'موقع ساحر في أهدأ حارات باب توما التاريخية',
      'أجواء استثنائية للعرسان ومحبي التراث'
    ],
    host: {
      name: 'فندق بيت زعفرانة التراثي',
      phone: '+963115437890',
      whatsapp: '963933445566',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-beitsitti-damascus',
    title: 'فندق بيت ستي التراثي (Beit Sitti Boutique Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حي القيمرية (خلف الجامع الأموي)',
    priceUsd: 90,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'خطوات من سوق الحميدية والجامع الأموي الكبير',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 28,
    rating: 4.93,
    reviewCount: 104,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      electricity: 4.9,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5120,
      lng: 36.3090
    },
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقع فندق بيت ستي في قلب حي القيمرية النابض بالأصالة على بعد دقيقتين مشياً من الجامع الأموي وسوق الحميدية وقصر العظم. يتميز البيت بأجوائه الحميمية المستوحاة من الدار الشامية القديمة، مع تراس علوي ساحر يطل على مآذن دمشق التاريخية وسماء المدينة القديمة.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة شمسية 24/7 مع تكييف صيفي وتدفئة شتوية',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي فايبر سريع 35 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-beitsitti-damascene',
        name: 'غرفة الياسمين التراثية المريحة',
        bedType: '1 سرير كينغ دمشقي مريح',
        maxGuests: 2,
        pricePerNightUsd: 90,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة الدار والبحرة التراثية',
        availableRoomsCount: 3,
        amenities: ['فطور شامي تقليدي غني', 'شاي وزهورات دمشقية مجانية', 'تكييف 24 ساعة']
        ,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع مثالي في حي القيمرية بجوار الجامع الأموي',
      'تراس بانورامي مطل على أسطح دمشق القديمة ومآذنها',
      'فطور شامي أصيل مع مربيات منزلية وزيتون بلدي',
      'طاقة شمسية مستمرة 24 ساعة',
      'خدمة إرشاد سياحي واستقبال دافئ'
    ],
    host: {
      name: 'فندق بيت ستي التراثي',
      phone: '+963115423300',
      whatsapp: '963955112244',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-beaurivage-damascus',
    title: 'فندق البوريفاج الفاخر (Beaurivage Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - حي أبو رمانة (قرب حديقة الجاحظ)',
    priceUsd: 90,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'أرقى أحياء العاصمة السكنية والدبلوماسية',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 20,
    rating: 4.85,
    reviewCount: 88,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.9,
      value: 4.7
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5210,
      lng: 36.2860
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقع فندق البوريفاج في حي أبو رمانة الأرقى والأكثر هدوءاً في دمشق، بالقرب من حديقة الجاحظ والعديد من السفارات والمطاعم الراقية. يمتاز بغرفه الفسيحة ذات الطابع الكلاسيكي الفخم، ويوفر بيئة مثالية للدبلوماسيين ورجال الأعمال والعائلات الباحثة عن السكينة والفخامة.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة كهربائية متواصلة 24/7 مع تكييف مركزي',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر فندقي عالي السرعة',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-beaurivage-deluxe',
        name: 'غرفة ديلوكس واسعة مطلة على حدائق أبو رمانة',
        bedType: '1 سرير كينغ كبير جداً',
        maxGuests: 2,
        pricePerNightUsd: 90,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة هادئة على أشجار حي أبو رمانة',
        availableRoomsCount: 3,
        amenities: ['إفطار بوفيه صباحي فاخر', 'صالون جلوس مصغر وشاشة ذكية', 'تكييف مركزي 24 ساعة']
        ,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'الموقع الأكثر رقياً وأماناً في دمشق',
      'بوفيه إفطار صباحي منتقى بعناية',
      'كهرباء وتكييف 24 ساعة دون انقطاع',
      'خدمة غرف ومغسلة سريعة',
      'مواقف سيارات خاصة ومحروسة'
    ],
    host: {
      name: 'فندق البوريفاج دمشق',
      phone: '+963113312400',
      whatsapp: '963933221199',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-semiramis-damascus',
    title: 'فندق سميراميس التاريخي (Semiramis Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - جسر فيكتوريا / وسط دمشق التجاري',
    priceUsd: 70,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'فندق تاريخي عريق في قلب دمشق وقرب محطة الحجاز',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 27,
    rating: 4.79,
    reviewCount: 102,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5130,
      lng: 36.2970
    },
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يعد فندق سميراميس أحد معالم وسط مدينة دمشق منذ أكثر من نصف قرن، ويقع مباشرة عند جسر فيكتوريا بالقرب من محطة الحجاز التاريخية ونهر بردى وسوق الحميدية. يقدم إقامة فندقية كلاسيكية مريحة بأسعار ممتازة لزوار العاصمة بغرض السياحة والتجارة.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدات فندقية 24 ساعة مع تكييف كامل',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي فندقي سريع مجاني',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-semiramis-standard',
        name: 'غرفة قياسية مريحة في جسر فيكتوريا',
        bedType: '1 سرير مزدوج أو 2 سرير فردي',
        maxGuests: 2,
        pricePerNightUsd: 70,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على وسط مدينة دمشق ونهر بردى',
        availableRoomsCount: 4,
        amenities: ['إفطار صباحي سوري', 'تكييف كامل متواصل', 'خدمة استقبال 24 ساعة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع مركزي جداً قرب محطة الحجاز وسوق الحميدية',
      'إفطار صباحي شهي',
      'طاقة وتكييف 24 ساعة مستمرة',
      'خدمات استقبال وصرافة',
      'قريب من كافة المواصلات والأسواق التجارية'
    ],
    host: {
      name: 'فندق سميراميس دمشق',
      phone: '+963112229988',
      whatsapp: '963944556677',
      isSuperhost: false,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-daralsalam-damascus',
    title: 'فندق دار السلام التراثي (Dar Al Salam Heritage Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - باب شرقي (الشارع المستقيم)',
    priceUsd: 85,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'على الشارع المستقيم التاريخي والأقواس الأندلسية',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 21,
    rating: 4.88,
    reviewCount: 76,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      electricity: 4.9,
      host: 4.9,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5090,
      lng: 36.3170
    },
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقع فندق دار السلام التراثي مباشرة على الشارع المستقيم التاريخي في باب شرقي. صُمم البيت بمهارة يدوية تحاكي القصور الدمشقية الأندلسية، مع نوافذ زجاجية ملونة وأروقة حجرية فسيحة تتوسطها نافورة مياه عذبة تعبق برائحة الياسمين الدمشقي الأصيل.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة شمسية ليثيوم 24/7 مع تكييف وتدفئة كاملة',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر سريع 35 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-daralsalam-suite',
        name: 'غرفة التراث الشامي المطلة على صحن الدار',
        bedType: '1 سرير كينغ دمشقي مذهب',
        maxGuests: 2,
        pricePerNightUsd: 85,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة القصر والنوافير',
        availableRoomsCount: 3,
        amenities: ['إفطار شامي صباحي مجاني', 'شاي دمشقي بالنعناع عند الوصول', 'تكييف وتدفئة 24/7']
        ,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'موقع تاريخي استثنائي على الشارع المستقيم بباب شرقي',
      'فناء تراثي فسيح بنوافير مائية وأشجار كباد',
      'طاقة شمسية وتكييف 24 ساعة متواصل',
      'فطور شامي غني في صحن الدار',
      'قريب من كنائس وأسواق باب شرقي الأثرية'
    ],
    host: {
      name: 'فندق دار السلام التراثي',
      phone: '+963115412200',
      whatsapp: '963933667788',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-carlton-damascus',
    title: 'فندق كارلتون دمشق للأجنحة الفندقية (Carlton Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - كفرسوسة (قرب الشام سنتر)',
    priceUsd: 80,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'أجنحة فندقية واسعة لرجال الأعمال والعائلات',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 24,
    rating: 4.83,
    reviewCount: 92,
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.4980,
      lng: 36.2750
    },
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    description: 'يقع فندق كارلتون في منطقة كفرسوسة الراقية والحديثة بجوار مجمع الشام سنتر والوزارات والمؤسسات الكبرى. يوفر أجنحة فندقية رحبة مجهزة بصالون معيشة ومطبخ تحضيري، وتعتبر الخيار الأول لرجال الأعمال والعائلات الراغبة في رحابة المكان وقربه من قلب العاصمة.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدات فندقية متطورة 24/7 مع تكييف كامل',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر فائق السرعة 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-carlton-suite',
        name: 'جناح فندقي تنفيذي (غرفة نوم + صالون معيشة)',
        bedType: '1 سرير كينغ + أريكة سرير بالصالون',
        maxGuests: 3,
        pricePerNightUsd: 80,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة مفتوحة على كفرسوسة الحديثة',
        availableRoomsCount: 4,
        amenities: ['إفطار بوفيه مفتوح', 'مطبخ صغير مجهز وميكروويف', 'شاشتان ذكيتان وتكييف مركزي']
        ,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'أجنحة فندقية فسيحة للعائلات ورجال الأعمال',
      'بجوار الشام سنتر وأرقى المطاعم الحديثة',
      'كهرباء وتكييف 24/7 دون انقطاع',
      'مواقف سيارات خاصة تحت الأرض مجاناً',
      'خدمات رجال أعمال وقاعة اجتماعات'
    ],
    host: {
      name: 'فندق كارلتون كفرسوسة',
      phone: '+963112134400',
      whatsapp: '963955332211',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-juliadumna-damascus',
    title: 'فندق جوليا دومنا البوتيكي (Julia Dumna Boutique Hotel)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - حارة كنيسة حنانيا الرسول (باب شرقي)',
    priceUsd: 100,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'قصر بوتيكي ساحر للعرسان والباحثين عن الرومانسية',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 23,
    rating: 4.96,
    reviewCount: 98,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 4.9,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5105,
      lng: 36.3185
    },
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يستمد فندق "جوليا دومنا" اسمه من الإمبراطورة السورية الشهيرة. يقع في أقدم أزقة دمشق القديمة بحارة كنيسة حنانيا الرسول الأثرية. يمتاز بأروقته الحجرية المنحوتة وفنائه الداخلي المزين بنوافير المرمر والإيوان الدمشقي الفاخر، ويقدم تجربة إقامة بوتيكية رومانسية لا تُنسى.',
    electricity: {
      type: 'solar_24_7',
      label: 'طاقة شمسية ليثيوم 24/7 مع تكييف وتدفئة مستمرة',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر سريع 40 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-juliadumna-royal',
        name: 'جناح الإمبراطورة الملكي الفاخر',
        bedType: '1 سرير كينغ ملوكي فاخر جداً',
        maxGuests: 2,
        pricePerNightUsd: 120,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة حصرية على صحن الدار والبحرة',
        availableRoomsCount: 2,
        amenities: ['إفطار شامي ملكي فخم في صحن الدار', 'حمام رخامي تاريخي بدش مطري', 'ضيافة ترحيبية خاصة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-juliadumna-deluxe',
        name: 'غرفة دومنا التراثية الفاخرة',
        bedType: '1 سرير كينغ دمشقي أصيل',
        maxGuests: 2,
        pricePerNightUsd: 100,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على ممر الياسمين وباحة الدار',
        availableRoomsCount: 2,
        amenities: ['فطور صباحي دمشقي منزلي', 'تكييف وتدفئة 24/7', 'هدوء تام وعزل صوتي']
        ,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'فناء حجري عريق يعود للقرن الثامن عشر',
      'فطور دمشقي ملكي يُقدم في صحن الدار',
      'طاقة شمسية وتكييف 24/7 دون أي انقطاع',
      'أجواء رومانسية استثنائية للعرسان والضيوف',
      'بجوار كنيسة حنانيا ومطاعم باب شرقي الراقية'
    ],
    host: {
      name: 'فندق جوليا دومنا البوتيكي',
      phone: '+963115439900',
      whatsapp: '963944119988',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-beitzaman-damascus',
    title: 'فندق وسبا بيت زمان التراثي الفاخر (Beit Zaman Hotel & Spa)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق القديمة - باب شرقي (الشارع المستقيم)',
    priceUsd: 125,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 12,
    hotelStars: 5,
    urgencyTag: 'أكبر قصر فندقي تراثي مع حمام شرقي وسبا',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 34,
    rating: 4.96,
    reviewCount: 160,
    ratingBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      electricity: 5.0,
      host: 5.0,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5080,
      lng: 36.3160
    },
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يعد فندق "بيت زمان" جوهرة القصور الفندقية التراثية في دمشق القديمة، حيث يمتد على مساحة قصر دمشقي تاريخي مهيب يتألف من عدة أفنية متصلة تضم بحرات مرمرية ونوافير وأشجار ليمون ونارنج معمرة. يضم الفندق حماماً شرقياً تقليدياً ومركز سبا متكاملاً ومطعماً شرقياً راقياً.',
    electricity: {
      type: 'solar_24_7',
      label: 'محطة طاقة مستقلة 24/7 مع تكييف وتدفئة كاملة',
      hasAirConditioningOnSolar: true
    },
    energyMetrics: {
      batteryPercent: 99,
      solarKw: 80,
      generatorBackup: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر فندقي 50 ميغابت',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-beitzaman-royal',
        name: 'جناح الباشا الملكي الفاخر مع صالون عجمي',
        bedType: '1 سرير كينغ ملوكي فاخر + جلسة شرقية',
        maxGuests: 3,
        pricePerNightUsd: 155,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة حصرية على الفناء الرئيسي ونوافير المرمر',
        availableRoomsCount: 2,
        amenities: ['إفطار شامي ملكي فخم', 'جلسة مساج وحمام شرقي مجانية', 'ضيافة حلويات شامية فاخرة']
        ,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'r-beitzaman-deluxe',
        name: 'غرفة زمان التراثية الفخمة',
        bedType: '1 سرير كينغ دمشقي مذهب',
        maxGuests: 2,
        pricePerNightUsd: 125,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على باحة الياسمين الداخلية',
        availableRoomsCount: 3,
        amenities: ['فطور شامي بيتي غني', 'تكييف وتدفئة مستقلة 24/7', 'شاشة ذكية وميني بار']
        ,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'أكبر قصر فندقي تاريخي بأفنية مرمرية ونوافير شلالية',
      'حمام شرقي تقليدي ومركز سبا وعناية صحية',
      'مطعم راقٍ يقدم أشهى مأكولات المطبخ الشامي',
      'طاقة شمسية وتكييف 24 ساعة دون أي انقطاع',
      'موقع متميز في قلب باب شرقي التراثي'
    ],
    host: {
      name: 'فندق وسبا بيت زمان',
      phone: '+963115431122',
      whatsapp: '963933556677',
      isSuperhost: true,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-plaza-damascus',
    title: 'فندق بلازا دمشق 3 نجوم (Plaza Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع البرازيل / الصالحية',
    priceUsd: 65,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 3,
    urgencyTag: 'قيمة اقتصادية ممتازة في شارع البرازيل',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 21,
    rating: 4.76,
    reviewCount: 68,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.7,
      electricity: 5.0,
      host: 4.8,
      value: 4.9
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5175,
      lng: 36.2915
    },
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يقدم فندق بلازا دمشق خيار إقامة مريحاً واقتصادياً في شارع البرازيل بالقرب من ساحة النجمة وسوق الصالحية. يمتاز بنظافته العالية وكرم الضيافة وخدماته المستقرة مع توفير الطاقة والتكييف على مدار الساعة.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدات فندقية 24/7 مع تكييف مستمر',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'واي فاي مجاني سريع',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-plaza-standard',
        name: 'غرفة قياسية مزدوجة في الصالحية',
        bedType: '1 سرير مزدوج أو 2 سرير فردي',
        maxGuests: 2,
        pricePerNightUsd: 65,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة على شوارع دمشق الهادئة',
        availableRoomsCount: 4,
        amenities: ['إفطار صباحي خفيف مجاني', 'تكييف كامل متواصل', 'شاشة تلفاز وحمام خاص']
        ,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'سعر اقتصادي ممتاز في موقع راقٍ ومركزي',
      'فطور صباحي مجاني',
      'كهرباء وتكييف 24 ساعة مستمرة',
      'استقبال دافئ وخدمة غرف 24/7',
      'قريب من الأسواق والمطاعم'
    ],
    host: {
      name: 'فندق بلازا دمشق',
      phone: '+963112248811',
      whatsapp: '963944223344',
      isSuperhost: false,
      responseRate: '100% فورية'
    },
    featured: true
  },
  {
    id: 'hotel-alfardoss-damascus',
    title: 'فندق برج الفردوس 4 نجوم (Al Fardoss Tower Hotel Damascus)',
    type: 'hotel',
    governorate: 'دمشق',
    area: 'دمشق - شارع الفردوس / المرجة',
    priceUsd: 70,
    rentalType: 'overnight',
    instantBooking: true,
    discountWeeklyPercent: 10,
    hotelStars: 4,
    urgencyTag: 'إطلالة بانورامية ساحرة على جبل قاسيون ووسط دمشق',
    hasFreeBreakfast: true,
    freeCancellationDeadline: 'إلغاء مجاني حتى 24 ساعة',
    isGeniusDeal: true,
    bookingCountPastWeek: 26,
    rating: 4.81,
    reviewCount: 84,
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.8,
      electricity: 5.0,
      host: 4.8,
      value: 4.8
    },
    houseRules: {
      familiesOnly: false,
      partiesAllowed: false,
      petsAllowed: false
    },
    coordinates: {
      lat: 33.5145,
      lng: 36.2955
    },
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: 'يتميز فندق برج الفردوس بموقعه الاستراتيجي في شارع الفردوس التجاري، مع برجه الشاهق الذي يمنح النزلاء إطلالات بانورامية مفتوحة على جبل قاسيون ومعالم دمشق الشهيرة. يقدم خدمات 4 نجوم متكاملة مع سهولة الوصول السريع لكافة أسواق ومؤسسات العاصمة.',
    electricity: {
      type: 'solar_24_7',
      label: 'مولدات فندقية 24/7 مع تكييف مركزي متواصل',
      hasAirConditioningOnSolar: true
    },
    hasWifi: true,
    wifiSpeed: 'إنترنت فايبر فندقي سريع',
    hasPool: false,
    hasWaterReserve: true,
    hasPriceFreeze: true,
    roomOptions: [
      {
        id: 'r-alfardoss-panoramic',
        name: 'غرفة بانورامية بإطلالة على جبل قاسيون',
        bedType: '1 سرير كينغ مزدوج كبير',
        maxGuests: 2,
        pricePerNightUsd: 70,
        freeBreakfast: true,
        freeCancellation: true,
        viewType: 'إطلالة بانورامية مرتفعة على جبل قاسيون',
        availableRoomsCount: 4,
        amenities: ['إفطار بوفيه صباحي مجاني', 'شاشة ذكية وتكييف مركزي', 'ميني بار وخدمة غرف']
        ,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      }
    ],
    amenities: [
      'برج شاهق بإطلالات بانورامية خلابة على جبل قاسيون',
      'بوفيه إفطار صباحي مفتوح ومتنوع',
      'كهرباء وتكييف 24 ساعة دون انقطاع',
      'موقع تجاري وسياحي حيوي بقلب دمشق',
      'استقبال وخدمات مسافرين ورجال أعمال 24/7'
    ],
    host: {
      name: 'فندق برج الفردوس دمشق',
      phone: '+963112239900',
      whatsapp: '963955443322',
      isSuperhost: false,
      responseRate: '100% فورية'
    },
    featured: true
  },

  {
  "id": "farm-yaafour-rozana",
  "title": "مزرعة وقصر الروزانا VIP مع مسبح إنفينيتي وسواتر خصوصية",
  "type": "farm",
  "governorate": "ريف دمشق",
  "area": "يعفور - بوابة الصبورة",
  "priceUsd": 145,
  "dayUsePriceUsd": 90,
  "rentalType": "both",
  "instantBooking": true,
  "discountWeeklyPercent": 12,
  "securityDepositUsd": 50,
  "rating": 4.96,
  "reviewCount": 42,
  "ratingBreakdown": {
    "cleanliness": 5,
    "accuracy": 4.9,
    "electricity": 5,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": true,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.518,
    "lng": 36.142
  },
  "images": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 4,
  "bathrooms": 4,
  "maxGuests": 16,
  "description": "قصر ومزرعة VIP في أرقى مناطق يعفور، مسبح إنفينيتي مفلتر مع سواتر خصوصية تامة للعائلات، حدائق غناء بمساحة 4000م²، منظومة طاقة شمسية 20 كيلوواط تكيف المزرعة بالكامل 24/7 دون انقطاع.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية ليثيوم 20KW مع تكييف كامل 24/7",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت 50 ميغا فائق السرعة",
  "hasPool": true,
  "poolDetails": {
    "isHeated": true,
    "isIndoor": false,
    "hasPrivacyScreen": true
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "مسبح إنفينيتي خاص",
    "سواتر خصوصية 100%",
    "طاقة شمسية 24/7",
    "إنترنت فايبر",
    "مطبخ أمريكي متكامل",
    "منطقة باربيكيو ومشاوي حجرية",
    "ملعب كرة قدم معشب",
    "حراسة مدار الساعة"
  ],
  "host": {
    "name": "الحاج بشير الصباغ",
    "phone": "+963933221100",
    "whatsapp": "963933221100",
    "isSuperhost": true,
    "responseRate": "100% خلال 10 دقائق"
  },
  "featured": true,
  "urgencyTag": "متاح للحجز الفوري لعطلة الأسبوع",
  "isGeniusDeal": true,
  "energyMetrics": {
    "batteryPercent": 98,
    "solarKw": 20,
    "generatorBackup": true
  }
},

  {
  "id": "farm-sahnaya-palm",
  "title": "استراحة ومزرعة النخيل مع مسبح مغلق دافئ وسواتر كاملة",
  "type": "farm",
  "governorate": "ريف دمشق",
  "area": "صحنايا - طريق الكسوة القديم",
  "priceUsd": 95,
  "dayUsePriceUsd": 60,
  "rentalType": "both",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 35,
  "rating": 4.89,
  "reviewCount": 31,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 4.8,
    "electricity": 4.9,
    "host": 5,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.435,
    "lng": 36.255
  },
  "images": [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 3,
  "bathrooms": 2,
  "maxGuests": 12,
  "description": "مزرعة واستراحة عائلية متميزة في صحنايا، تمتاز بمسبح مغلق خاص مع تدفئة للمياه وسواتر تمنح راحة وخصوصية مطلقة. قعدة عربية شامية مظللة ومطبخ خارجي للمشاوي.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية مستمرة مع مولدة كاتمة للصوت",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "4G سيريتل سريع ومستقر",
  "hasPool": true,
  "poolDetails": {
    "isHeated": true,
    "isIndoor": true,
    "hasPrivacyScreen": true
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "مسبح مغلق دافئ",
    "خصوصية عائلية تامة",
    "كهرباء مستمرة 24/7",
    "جلسات عربية خارجية",
    "شوايات حجرية",
    "ألعاب أطفال",
    "مواقف سيارات مظللة"
  ],
  "host": {
    "name": "أبو فراس الحلبي",
    "phone": "+963944332211",
    "whatsapp": "963944332211",
    "isSuperhost": true,
    "responseRate": "100% خلال 15 دقيقة"
  },
  "isGeniusDeal": true
},

  {
  "id": "farm-ghouta-sandian",
  "title": "مزرعة وواحة السنديان العائلية بين بساتين الغوطة",
  "type": "farm",
  "governorate": "ريف دمشق",
  "area": "غوطة دمشق - طريق المطار الدولي",
  "priceUsd": 85,
  "dayUsePriceUsd": 55,
  "rentalType": "both",
  "instantBooking": true,
  "discountWeeklyPercent": 15,
  "securityDepositUsd": 30,
  "rating": 4.85,
  "reviewCount": 26,
  "ratingBreakdown": {
    "cleanliness": 4.8,
    "accuracy": 4.9,
    "electricity": 4.8,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.45,
    "lng": 36.38
  },
  "images": [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 3,
  "bathrooms": 2,
  "maxGuests": 14,
  "description": "واحة ريفية هادئة محاطة بأشجار المشمش والجوز في غوطة دمشق قرب طريق المطار. مسبح خاص معقم، جلسات عريشة خضراء، وطاقة شمسية مدار الساعة.",
  "electricity": {
    "type": "solar_24_7",
    "label": "منظومة طاقة شمسية تشغل المكيفات 24 ساعة",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "hasPool": true,
  "poolDetails": {
    "isHeated": false,
    "isIndoor": false,
    "hasPrivacyScreen": true
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "مسبح خاص عائلي",
    "أشجار فواكه وبساتين",
    "طاقة شمسية 24/7",
    "باربيكيو وموقد حطب",
    "جلسات عريشة مظللة",
    "مواقف خاصة"
  ],
  "host": {
    "name": "أبو طارق الغوطاني",
    "phone": "+963955667788",
    "whatsapp": "963955667788",
    "isSuperhost": false,
    "responseRate": "95% خلال 20 دقيقة"
  }
},

  {
  "id": "farm-qura-assad",
  "title": "استراحة كرز القلمون والديماس الجبلية مع إطلالة خلابة",
  "type": "farm",
  "governorate": "ريف دمشق",
  "area": "ريف دمشق - قرى الأسد / ديماس",
  "priceUsd": 110,
  "dayUsePriceUsd": 75,
  "rentalType": "both",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 40,
  "rating": 4.92,
  "reviewCount": 35,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 5,
    "electricity": 4.9,
    "host": 4.9,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.56,
    "lng": 36.1
  },
  "images": [
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 3,
  "bathrooms": 3,
  "maxGuests": 12,
  "description": "فيلا واستراحة جبلية راقية في قرى الأسد المطلة على وادي بردى، تجمع بين الهواء النقي العليل ومسبح خاص واسع مع سواتر خصوصية عالية. مثالية للعائلات السورية والمغتربين.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية كاملة مع بطاريات ليثيوم 24/7",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت 30 ميغابت",
  "hasPool": true,
  "poolDetails": {
    "isHeated": true,
    "isIndoor": false,
    "hasPrivacyScreen": true
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "مسبح بانورامي خاص",
    "سواتر خصوصية 100%",
    "تكييف وتدفئة بالطاقة الشمسية",
    "إنترنت سريع",
    "شرفة واسعة مطلة",
    "فرن ومشاوي"
  ],
  "host": {
    "name": "المهندس كمال الأيوبي",
    "phone": "+963966112233",
    "whatsapp": "963966112233",
    "isSuperhost": true,
    "responseRate": "100% خلال 10 دقائق"
  },
  "featured": true
},

  {
  "id": "farm-kesweh-balsan",
  "title": "مزرعة البيلسان والياسمين الشامي الريفية",
  "type": "farm",
  "governorate": "ريف دمشق",
  "area": "ريف دمشق - الكسوة / دروشا",
  "priceUsd": 75,
  "dayUsePriceUsd": 50,
  "rentalType": "both",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 25,
  "rating": 4.82,
  "reviewCount": 20,
  "ratingBreakdown": {
    "cleanliness": 4.8,
    "accuracy": 4.8,
    "electricity": 4.8,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.37,
    "lng": 36.21
  },
  "images": [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 2,
  "maxGuests": 10,
  "description": "مزرعة اقتصادية ومريحة لعائلات دمشق الراغبة بسيران نهاري أو مبيت هادئ، مسبح خاص معقم، جلسة تحت عريشة الياسمين، وطاقة شمسية تؤمن الإنارة والتبريد دون انقطاع.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية 24/7 مع إنفرتر احتياطي",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "hasPool": true,
  "poolDetails": {
    "isHeated": false,
    "isIndoor": false,
    "hasPrivacyScreen": true
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "مسبح خاص معقم",
    "سواتر خصوصية عائلية",
    "طاقة شمسية مستمرة",
    "شوايات باربيكيو",
    "مطبخ مجهز",
    "أراجيح للأطفال"
  ],
  "host": {
    "name": "أبو ماهر الشامي",
    "phone": "+963988776655",
    "whatsapp": "963988776655",
    "isSuperhost": false,
    "responseRate": "95% خلال نصف ساعة"
  }
},

  {
  "id": "chalet-porto-marina",
  "title": "شاليه ديلوكس مارينا بورتو طرطوس إطلالة مباشرة على اليخوت والبحر",
  "type": "chalet",
  "governorate": "طرطوس",
  "area": "بورتو طرطوس - الكورنيش الجديد والمارينا",
  "priceUsd": 70,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 30,
  "rating": 4.87,
  "reviewCount": 39,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 4.8,
    "electricity": 4.9,
    "host": 4.9,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 34.895,
    "lng": 35.882
  },
  "images": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 2,
  "maxGuests": 6,
  "description": "شاليه أنيق داخل منتجع بورتو طرطوس الفاخر، يتمتع بإطلالة خلابة على مارينا اليخوت والبحر الأبيض المتوسط. كهرباء ومصاعد وتكييف 24 ساعة دون أي انقطاع.",
  "electricity": {
    "type": "solar_24_7",
    "label": "كهرباء وتكييف 24/7 خاصة بمجمع بورتو طرطوس",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت 30 ميغا",
  "hasPool": true,
  "poolDetails": {
    "isHeated": false,
    "isIndoor": false,
    "hasPrivacyScreen": false
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "شرفة بحرية واسعة",
    "مسابح المجمع والشاطئ الخاص",
    "تكييف مركزي 24/7",
    "إنترنت سريع",
    "مصاعد تعمل باستمرار",
    "أمن وحراسة 24 ساعة"
  ],
  "host": {
    "name": "عصام الطرطوسي",
    "phone": "+963933887766",
    "whatsapp": "963933887766",
    "isSuperhost": true,
    "responseRate": "100% خلال 10 دقائق"
  },
  "featured": true
},

  {
  "id": "chalet-arwad-island",
  "title": "شاليهات نسيم البحر في جزيرة أرواد التاريخية",
  "type": "chalet",
  "governorate": "طرطوس",
  "area": "طرطوس - جزيرة أرواد التاريخية",
  "priceUsd": 60,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 12,
  "securityDepositUsd": 20,
  "rating": 4.81,
  "reviewCount": 22,
  "ratingBreakdown": {
    "cleanliness": 4.7,
    "accuracy": 4.9,
    "electricity": 4.8,
    "host": 5,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 34.855,
    "lng": 35.857
  },
  "images": [
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 1,
  "maxGuests": 5,
  "description": "تجربة إقامة أسطورية وفريدة في جزيرة أرواد، الجزيرة السورية الوحيدة المأهولة في البحر المتوسط. شرفة مباشرة على الأمواج، نسيم بحري عليل، وقارب خاص لنقل النزلاء.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية ليثيوم 24/7 متكاملة",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "إطلالة مباشرة على البحر",
    "خدمة نقل بالقارب السريع",
    "طاقة شمسية 24 ساعة",
    "شرفة على الصخور البحرية",
    "مطبخ مجهز للمأكولات البحرية"
  ],
  "host": {
    "name": "الريس نزار الأروادي",
    "phone": "+963944119988",
    "whatsapp": "963944119988",
    "isSuperhost": true,
    "responseRate": "100% خلال 15 دقيقة"
  }
},

  {
  "id": "chalet-kandil",
  "title": "شاليه وادي قنديل الرملي بين خضرة الجبل والأمواج",
  "type": "chalet",
  "governorate": "اللاذقية",
  "area": "اللاذقية - شاطئ وادي قنديل",
  "priceUsd": 55,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 20,
  "rating": 4.86,
  "reviewCount": 30,
  "ratingBreakdown": {
    "cleanliness": 4.8,
    "accuracy": 4.9,
    "electricity": 4.8,
    "host": 4.9,
    "value": 5
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 35.72,
    "lng": 35.84
  },
  "images": [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 1,
  "maxGuests": 6,
  "description": "شاليه شاطئي مستقل على رمال شاطئ وادي قنديل الذهبية الشهيرة باللاذقية، حيث تلتقي جبال السنديان بالبحر الأزرق النقي. هدوء وطبيعة عذراء مثالية للاستجمام.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية مستمرة مع بطاريات ليثيوم",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "نزول مباشر للرمال والبحر",
    "طاقة شمسية 24/7",
    "تراس مطل على الشاطئ",
    "شوايات سمك باربيكيو",
    "مواقف خاصة للسيارات"
  ],
  "host": {
    "name": "أبو سومر اللاذقاني",
    "phone": "+963955113355",
    "whatsapp": "963955113355",
    "isSuperhost": true,
    "responseRate": "100% خلال 10 دقائق"
  }
},

  {
  "id": "apt-malki-vip",
  "title": "شقة VIP ديلوكس في أرقى شوارع المالكي مع تكييف ومصعد دائم",
  "type": "apartment",
  "governorate": "دمشق",
  "area": "دمشق - المالكي / شارع عبد المنعم رياض",
  "priceUsd": 75,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 40,
  "rating": 4.95,
  "reviewCount": 48,
  "ratingBreakdown": {
    "cleanliness": 5,
    "accuracy": 4.9,
    "electricity": 5,
    "host": 5,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.518,
    "lng": 36.275
  },
  "images": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 3,
  "bathrooms": 2,
  "maxGuests": 6,
  "description": "شقة سكنية وفندقية فاخرة في قلب حي المالكي الراقي بدمشق. صالون واسع مفروش بأفخم الأثاث، 3 غرف نوم ماستر، منظومة إنفرتر ومولدة خاصة بالبناء تضمن الكهرباء والتكييف والمصعد 24/7.",
  "electricity": {
    "type": "solar_24_7",
    "label": "إنفرتر ومولدة خاصة للبناء 24/7 مع مصعد دائم",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت فائق السرعة 40 ميغا",
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "صالون VIP فخم",
    "تكييف وإنفرتر 24/7",
    "مصعد كهربائي يعمل دائماً",
    "إنترنت سريع فايبر",
    "مطبخ إيطالي مجهز بالكامل",
    "حراسة وكاميرات أمان للبناء"
  ],
  "host": {
    "name": "المهندس غياث الشماع",
    "phone": "+963933445566",
    "whatsapp": "963933445566",
    "isSuperhost": true,
    "responseRate": "100% خلال أقل من 10 دقائق"
  },
  "featured": true,
  "isGeniusDeal": true
},

  {
  "id": "apt-abu-roumaneh",
  "title": "بنتهاوس أبو رمانة الفاخر بإطلالة بانورامية على جبل قاسيون",
  "type": "apartment",
  "governorate": "دمشق",
  "area": "دمشق - أبو رمانة / حديقة الجاحظ",
  "priceUsd": 85,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 12,
  "securityDepositUsd": 40,
  "rating": 4.93,
  "reviewCount": 37,
  "ratingBreakdown": {
    "cleanliness": 5,
    "accuracy": 4.9,
    "electricity": 4.9,
    "host": 4.9,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.515,
    "lng": 36.282
  },
  "images": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 3,
  "bathrooms": 2,
  "maxGuests": 7,
  "description": "بنتهاوس ملكي في حي أبو رمانة الدبلوماسي العريق قرب حديقة الجاحظ، يتميز بتراس بانورامي ساحر يكشف جبل قاسيون ومعالم دمشق، تكييف وإنارة 24 ساعة ومطبخ حديث.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة ومولدة مستمرة 24/7 دون انقطاع",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت ألياف ضوئية 50 ميغا",
  "hasPool": false,
  "hasWaterReserve": true,
  

  "amenities": [
    "تراس بانورامي واسع على قاسيون",
    "كهرباء وتكييف 24/7",
    "شاشات ذكية سمارت",
    "مطبخ أمريكي مفتوح",
    "مواقف سيارات خاصة للبناء",
    "مصعد دائم"
  ],
  "host": {
    "name": "الدكتور طريف العظم",
    "phone": "+963944223344",
    "whatsapp": "963944223344",
    "isSuperhost": true,
    "responseRate": "100% خلال 15 دقيقة"
  },
  "featured": true
},

  {
  "id": "apt-mezzeh-villas",
  "title": "شقة فندقية مودرن المزة فيلات غربية خلف برج دمشق",
  "type": "apartment",
  "governorate": "دمشق",
  "area": "دمشق - المزة فيلات غربية",
  "priceUsd": 65,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 30,
  "rating": 4.88,
  "reviewCount": 34,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 4.8,
    "electricity": 4.9,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.498,
    "lng": 36.248
  },
  "images": [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 2,
  "maxGuests": 5,
  "description": "شقة فندقية ذات تصميم عصري أنيق في المزة فيلات غربية، قريبة من المطاعم والخدمات والسفارات، هدوء تام مع منظومة طاقة وإنفرتر تشغل المكيف والبراد والإنارة دون انقطاع.",
  "electricity": {
    "type": "solar_24_7",
    "label": "إنفرتر ليثيوم 24/7 مع تكييف مستمر",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "4G سيريتل سريع",
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "أثاث مودرن جديد بالكامل",
    "إنفرتر وطاقة 24 ساعة",
    "مطبخ متكامل بكافة التجهيزات",
    "غسالة أوتوماتيك وشاشة ذكية",
    "موقع هادئ وراقي"
  ],
  "host": {
    "name": "سناء البيطار",
    "phone": "+963955778899",
    "whatsapp": "963955778899",
    "isSuperhost": false,
    "responseRate": "95% خلال 20 دقيقة"
  }
},

  {
  "id": "apt-kafrsousa",
  "title": "شقة كفرسوسة تنظيم راقٍ قرب الشام سنتر والتسوق",
  "type": "apartment",
  "governorate": "دمشق",
  "area": "دمشق - كفرسوسة تنظيم جديد",
  "priceUsd": 60,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 10,
  "securityDepositUsd": 25,
  "rating": 4.85,
  "reviewCount": 29,
  "ratingBreakdown": {
    "cleanliness": 4.8,
    "accuracy": 4.9,
    "electricity": 4.8,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 33.49,
    "lng": 36.27
  },
  "images": [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 1,
  "maxGuests": 4,
  "description": "شقة ممتازة في كفرسوسة تنظيم جديد على بعد خطوات من الشام سنتر وأرقى المولات والمطاعم، تشطيب ممتاز وأثاث مريح مع كهرباء متواصلة عبر مولدة البناء.",
  "electricity": {
    "type": "solar_24_7",
    "label": "مولدة خاصة بالبناء ومصعد يعمل دائماً",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت 25 ميغا",
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "قرب المول والمطاعم",
    "مصعد كهربائي دائم",
    "مولدة كهرباء خاصة",
    "إنترنت سريع",
    "مطبخ كامل مع ميكروويف وغسالة"
  ],
  "host": {
    "name": "عمار الشاويش",
    "phone": "+963966554433",
    "whatsapp": "963966554433",
    "isSuperhost": true,
    "responseRate": "100% خلال 10 دقائق"
  }
},

  {
  "id": "apt-tartous-corniche",
  "title": "شقة بانورامية مفروشة على كورنيش طرطوس البحري",
  "type": "apartment",
  "governorate": "طرطوس",
  "area": "طرطوس - الكورنيش البحري الرئيسي",
  "priceUsd": 50,
  "rentalType": "overnight",
  "instantBooking": true,
  "discountWeeklyPercent": 12,
  "securityDepositUsd": 20,
  "rating": 4.83,
  "reviewCount": 25,
  "ratingBreakdown": {
    "cleanliness": 4.8,
    "accuracy": 4.9,
    "electricity": 4.8,
    "host": 4.9,
    "value": 4.9
  },
  "houseRules": {
    "familiesOnly": true,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 34.888,
    "lng": 35.875
  },
  "images": [
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 2,
  "bathrooms": 1,
  "maxGuests": 5,
  "description": "شقة مفروشة ذات إطلالة زجاجية مفتوحة على البحر الأبيض المتوسط على كورنيش طرطوس، نسيم البحر وموقع حيوي للمشاة والمقاهي، طاقة شمسية مستمرة تضمن عمل الإنارة والتكييف.",
  "electricity": {
    "type": "solar_24_7",
    "label": "طاقة شمسية ليثيوم 24/7",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "hasPool": false,
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],

  "amenities": [
    "واجهة بحرية بانورامية",
    "طاقة شمسية مدار الساعة",
    "موقع حيوي على الكورنيش",
    "مطبخ وتجهيزات متكاملة",
    "مصعد كهربائي"
  ],
  "host": {
    "name": "وسيم خضور",
    "phone": "+963944889900",
    "whatsapp": "963944889900",
    "isSuperhost": false,
    "responseRate": "95% خلال 20 دقيقة"
  }
},

  {
  "id": "hotel-porto-tartous",
  "title": "فندق ومنتجع بورتو طرطوس مارينا 5 نجوم (Porto Tartous Resort)",
  "type": "hotel",
  "governorate": "طرطوس",
  "area": "طرطوس - بورتو طرطوس الكورنيش الجديد",
  "priceUsd": 110,
  "rentalType": "overnight",
  "instantBooking": true,
  "hotelStars": 5,
  "urgencyTag": "إطلالة بحرية مباشرة ومارينا يخوت",
  "hasFreeBreakfast": true,
  "freeCancellationDeadline": "إلغاء مجاني حتى 24 ساعة قبل الوصول",
  "isGeniusDeal": true,
  "rating": 4.92,
  "reviewCount": 54,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 5,
    "electricity": 5,
    "host": 4.9,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": false,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 34.896,
    "lng": 35.881
  },
  "images": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 1,
  "bathrooms": 1,
  "maxGuests": 3,
  "description": "المنتجع البحري الأكبر والأحدث في الساحل السوري؛ أجنحة فندقية 5 نجوم بإطلالة بانورامية كاملة على مارينا اليخوت والبحر الأبيض المتوسط مع مسابح ومطاعم وشاطئ رملي خاص.\n\n📋 أسعار الغرف المعتمدة:\n• غرفة ديلوكس بحرية: $110 / ليلة (≈ 1,595,000 ل.س) - 1 سرير كينغ - إطلالة مارينا\n• جناح بورتو الملكي: $185 / ليلة (≈ 2,682,500 ل.س) - 1 سرير كينغ + صالون - إطلالة 180°\n✨ الميزات: فطور بوفيه مفتوح، كهرباء 24/7 دون انقطاع، شاطئ رملي ومسبح مدفأ.",
  "electricity": {
    "type": "solar_24_7",
    "label": "محطة طاقة وتكييف مركزي 24/7 خاصة بالمنتجع",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "فايبر نت عالي السرعة 50 ميغا",
  "hasPool": true,
  "poolDetails": {
    "isHeated": false,
    "isIndoor": true,
    "hasPrivacyScreen": false
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-pt-deluxe",
      "name": "غرفة ديلوكس بإطلالة بانورامية على مارينا اليخوت",
      "bedType": "1 سرير كينغ ملكي كبير",
      "maxGuests": 2,
      "pricePerNightUsd": 110,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة مباشرة على مارينا اليخوت والبحر",
      "availableRoomsCount": 3,
      "amenities": ["شرفة بحرية خاصة", "بوفيه إفطار إنتركونتيننتال", "دخول الشاطئ والمسبح", "واي فاي فايبر"],
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-pt-suite",
      "name": "جناح بورتو الملكي مع صالون وشرفة شاطئية واسعة",
      "bedType": "1 سرير كينغ + صالون كنب منفصل",
      "maxGuests": 4,
      "pricePerNightUsd": 185,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بحرية بانورامية مفتوحة 180 درجة",
      "availableRoomsCount": 2,
      "amenities": ["جاكوزي خاص", "بوفيه إفطار وعشاء", "خدمة كونسيرج خاصة", "ميني بار مجاني"],
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    }
  ],
  "specialSyrianFeatures": {
    "isExpatFamilyGiftRecommended": true,
    "isHoneymoonSpecial": true
  },
  "amenities": [
    "أجنحة فندقية فاخرة",
    "مسابح خارجية ومغلقة",
    "شاطئ خاص للمنتجع",
    "إفطار إنتركونتيننتال مفتوح",
    "نادي صحي وسبا",
    "مواقف خاصة وحراسة 24/7"
  ],
  "host": {
    "name": "إدارة منتجع بورتو طرطوس",
    "phone": "+96343221100",
    "whatsapp": "963933001122",
    "isSuperhost": true,
    "responseRate": "100% فورياً"
  },
  "featured": true
},

{
  "id": "hotel-sheraton-aleppo",
  "title": "فندق شيراتون حلب الشهباء 5 نجوم (Sheraton Aleppo Hotel)",
  "type": "hotel",
  "governorate": "حلب",
  "area": "حلب - حي العزيزية والحديقة العامة",
  "priceUsd": 125,
  "rentalType": "overnight",
  "instantBooking": true,
  "hotelStars": 5,
  "urgencyTag": "فخامة عالمية في قلب حلب العريقة",
  "hasFreeBreakfast": true,
  "freeCancellationDeadline": "إلغاء مجاني حتى 24 ساعة قبل الوصول",
  "isGeniusDeal": true,
  "rating": 4.91,
  "reviewCount": 46,
  "ratingBreakdown": {
    "cleanliness": 4.9,
    "accuracy": 4.9,
    "electricity": 5,
    "host": 4.9,
    "value": 4.8
  },
  "houseRules": {
    "familiesOnly": false,
    "partiesAllowed": false,
    "petsAllowed": false
  },
  "coordinates": {
    "lat": 36.211,
    "lng": 37.145
  },
  "images": [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
  ],
  "bedrooms": 1,
  "bathrooms": 1,
  "maxGuests": 3,
  "description": "تحفة معمارية تجمع بين طراز العمارة الحلبية التقليدية بالحجر الأصفر والأقواس الأندلسية وفخامة فنادق شيراتون العالمية. كهرباء وتكييف وخدمات 5 نجوم 24/7 دون انقطاع.\n\n📋 أسعار الغرف المعتمدة:\n• غرفة كلاسيكية فاخرة: $125 / ليلة (≈ 1,812,500 ل.س) - 1 سرير كينغ - إطلالة المسبح\n• جناح الشهباء الدبلوماسي: $210 / ليلة (≈ 3,045,000 ل.س) - 1 سرير كينغ + معيشة - إطلالة الحديقة\n✨ الميزات: بوفيه إفطار حلبي وشامي، نادي صحي ومسبح أولمبي، قاعات مؤتمرات.",
  "electricity": {
    "type": "solar_24_7",
    "label": "توليد طاقة وتكييف مركزي 24/7 دون انقطاع",
    "hasAirConditioningOnSolar": true
  },
  "hasWifi": true,
  "wifiSpeed": "إنترنت فايبر نت فائق السرعة",
  "hasPool": true,
  "poolDetails": {
    "isHeated": true,
    "isIndoor": false,
    "hasPrivacyScreen": false
  },
  "hasWaterReserve": true,
  "roomOptions": [
    {
      "id": "r-aleppo-deluxe",
      "name": "غرفة شيراتون كلاسيكية بالطراز الحلبي الفاخر",
      "bedType": "1 سرير كينغ أو سريرين منفصلين",
      "maxGuests": 2,
      "pricePerNightUsd": 125,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة على المسبح الخارجي والحدائق",
      "availableRoomsCount": 4,
      "amenities": ["بوفيه فطور حلبي وشامي", "دخول النادي الصحي", "شاشة 55 بوصة", "تكييف مركزي مستمر"],
      "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-aleppo-suite",
      "name": "جناح الشهباء الدبلوماسي مع إطلالة الحديقة العامة",
      "bedType": "1 سرير كينغ ملكي + غرفة معيشة مستقلة",
      "maxGuests": 3,
      "pricePerNightUsd": 210,
      "freeBreakfast": true,
      "freeCancellation": true,
      "viewType": "إطلالة بانورامية على مدينة حلب التاريخية",
      "availableRoomsCount": 2,
      "amenities": ["صالة رجال الأعمال", "إفطار VIP في الجناح", "حمام رخامي بجاكوزي", "خدمة تنقل مجانية"],
      "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    }
  ],
  "specialSyrianFeatures": {
    "isMedicalEmbassyNear": true,
    "isRemoteWorkHub": true
  },
  "amenities": [
    "أجنحة شيراتون الملكية",
    "مسبح خارجي فاخر",
    "إفطار حلبي وشامي غني",
    "نادي رياضي وسبا",
    "قاعات مؤتمرات ورجال أعمال"
  ],
  "host": {
    "name": "إدارة فندق شيراتون حلب",
    "phone": "+96321211111",
    "whatsapp": "963944005544",
    "isSuperhost": true,
    "responseRate": "100% فورياً"
  },
  "featured": true
}
];
