import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Governorate, PropertyType, Property, RoomOption } from '../types';
import { SYRIAN_GOVERNORATES, SYP_PER_USD } from '../data/mockData';
import { 
  X, 
  PlusCircle, 
  CheckCircle, 
  Home, 
  MapPin, 
  DollarSign, 
  SunMedium, 
  Waves, 
  Wifi, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Clock, 
  Sparkles, 
  Gift, 
  Check, 
  ToggleLeft, 
  ToggleRight, 
  Trash2, 
  Edit3, 
  Wallet, 
  Building2, 
  MessageCircle,
  TrendingUp,
  CreditCard,
  Zap,
  Droplet,
  Smartphone,
  BedDouble,
  Image as ImageIcon
} from 'lucide-react';

export const HostModal: React.FC = () => {
  const { 
    isAddPropertyOpen, 
    setIsAddPropertyOpen, 
    addNewProperty, 
    properties, 
    bookings, 
    currency,
    formatPrice,
    updatePropertyAvailability,
    updatePropertyPrice,
    deletePropertyLocal,
    hostTab,
    setHostTab,
    addNotification
  } = useApp();

  // Form State for Adding New Listing
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('farm');
  const [governorate, setGovernorate] = useState<Governorate>('ريف دمشق');
  const [area, setArea] = useState('يعفور');
  const [priceUsd, setPriceUsd] = useState(100);
  const [dayUsePriceUsd, setDayUsePriceUsd] = useState(65);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [maxGuests, setMaxGuests] = useState(8);
  const [description, setDescription] = useState('');
  
  // Syrian Energy & Infrastructure
  const [electricityType, setElectricityType] = useState<'solar_24_7' | 'generator_hours' | 'inverter_basic' | 'grid_only'>('solar_24_7');
  const [electricityLabel, setElectricityLabel] = useState('منظومة طاقة شمسية ليثيوم 24/7 مع تشغيل المكيفات');
  const [hasPool, setHasPool] = useState(true);
  const [poolPrivacy, setPoolPrivacy] = useState(true);
  const [hasWifi, setHasWifi] = useState(true);
  const [hasWaterReserve, setHasWaterReserve] = useState(true);

  // Host Contacts & Payout
  const [hostName, setHostName] = useState('م. سامر القوتلي');
  const [hostPhone, setHostPhone] = useState('0933456789');
  const [hostWhatsapp, setHostWhatsapp] = useState('963933456789');
  const [payoutMethod, setPayoutMethod] = useState<'syriatel_cash' | 'mtn_cash' | 'al_haram'>('syriatel_cash');
  const [payoutAccount, setPayoutAccount] = useState('0933456789');

  // Media
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80');

  // Multi-Room Creator State (for hotels and luxury villas)
  const [customRooms, setCustomRooms] = useState<RoomOption[]>([
    {
      id: `room-${Date.now()}-1`,
      name: 'جناح ملكي بإطلالة بانورامية',
      bedType: '1 سرير كينغ مزدوج كبير + صالون',
      maxGuests: 4,
      pricePerNightUsd: 120,
      freeBreakfast: true,
      freeCancellation: true,
      viewType: 'إطلالة على المسبح والحديقة',
      availableRoomsCount: 2,
      amenities: ['تكييف 24/7 على الطاقة', 'واي فاي فايبر', 'ميني بار', 'شاشة ذكية'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomPrice, setNewRoomPrice] = useState(80);
  const [newRoomBeds, setNewRoomBeds] = useState('1 سرير مزدوج');

  const [isSuccess, setIsSuccess] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState<number>(100);
  const [withdrawalToast, setWithdrawalToast] = useState(false);

  if (!isAddPropertyOpen) return null;

  // Preset Syrian Hospitality Images
  const presetImages = [
    { label: 'مزرعة واستراحة يعفور', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80' },
    { label: 'شاليه بورتو طرطوس البحري', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80' },
    { label: 'قصر فندقي دمشقي عريق', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80' },
    { label: 'فيلا مصيف بلودان الجبلية', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80' },
    { label: 'شقة فاخرة بأبو رمانة دمشق', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80' },
    { label: 'مسبح ومزرعة صيدنايا', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80' }
  ];

  const handleAddRoom = () => {
    if (!newRoomName) return;
    const newRoom: RoomOption = {
      id: `r-${Date.now()}`,
      name: newRoomName,
      bedType: newRoomBeds,
      maxGuests: 2,
      pricePerNightUsd: Number(newRoomPrice),
      freeBreakfast: true,
      freeCancellation: true,
      viewType: 'إطلالة حديقة ومسبح',
      availableRoomsCount: 2,
      amenities: ['طاقة شمسية 24/7', 'إنترنت سريع', 'تكييف'],
      image: selectedPresetImage
    };
    setCustomRooms([...customRooms, newRoom]);
    setNewRoomName('');
  };

  const handleRemoveRoom = (id: string) => {
    setCustomRooms(customRooms.filter(r => r.id !== id));
  };

  const handleSubmitNewProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !hostName || !hostPhone) {
      addNotification({ title: 'إضافة عقار جديد', message: 'يرجى ملء كافة الحقول الأساسية لضمان التوثيق الميداني.', type: 'booking' });
      return;
    }

    const finalImage = customImageUrl.trim() || selectedPresetImage;

    addNewProperty({
      title,
      type: type === 'all' ? 'farm' : type,
      governorate,
      area: `${area} - ${governorate}`,
      priceUsd: Number(priceUsd),
      dayUsePriceUsd: Number(dayUsePriceUsd) || Math.round(Number(priceUsd) * 0.7),
      rentalType: 'both',
      instantBooking: true,
      discountWeeklyPercent: 10,
      securityDepositUsd: 25,
      houseRules: {
        familiesOnly: true,
        partiesAllowed: false,
        petsAllowed: false
      },
      images: [finalImage],
      roomOptions: customRooms.length > 0 ? customRooms : undefined,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      maxGuests: Number(maxGuests),
      description: description || `منشأة إقامة مميزة في ${area} - ${governorate} معتمدة وموثقة من منصة سيران سوريا ومجهزة بأفضل حلول الطاقة والراحة.`,
      electricity: {
        type: electricityType,
        label: electricityLabel,
        hasAirConditioningOnSolar: true,
      },
      hasWifi,
      wifiSpeed: hasWifi ? 'إنترنت فايبر عالي السرعة' : undefined,
      hasPool,
      poolDetails: hasPool ? {
        isHeated: false,
        isIndoor: false,
        hasPrivacyScreen: poolPrivacy,
      } : undefined,
      hasWaterReserve,
      amenities: [
        electricityLabel,
        hasPool ? 'مسبح خاص عائلي' : 'حديقة وجلسات خارجية',
        hasWifi ? 'إنترنت سريع مستمر' : 'هدوء وطبيعة خلابة',
        'مطبخ مجهز بالكامل',
        'خزان مياه احتياطي مستمر',
        'أمان وخصوصية تامة'
      ],
      host: {
        name: hostName,
        phone: hostPhone,
        whatsapp: hostWhatsapp || hostPhone.replace('+', '').replace(/^0/, '963'),
        isSuperhost: true,
        responseRate: 'مضيف مميز — استجابة فورية'
      },
      featured: true,
      status: 'approved',
      isVerifiedField: true,
      isAvailable: true
    });

    setIsSuccess(true);
  };

  const handleWithdrawalRequest = () => {
    setWithdrawalToast(true);
    setTimeout(() => setWithdrawalToast(false), 4000);
  };

  // Host's managed properties (demo lists all or first 5 for rich experience)
  const managedProperties = properties.slice(0, 6);
  const totalVolumeUsd = bookings.reduce((sum, b) => sum + (b.totalPriceUsd || 0), 280);
  const totalEscrowUsd = Math.round(totalVolumeUsd * 0.25);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col border border-slate-200">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={() => {
              setIsAddPropertyOpen(false);
              setIsSuccess(false);
            }}
            className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة شركاء سيران سوريا المعتمدة</span>
            </span>
            <span className="text-xs text-emerald-200 font-bold hidden sm:inline">
              Host & Hotel Management
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <span>بوابة المضيفين وأصحاب الفنادق والمزارع</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            أدر عقاراتك وغرفك، اضبط الأسعار والتوافر اللحظي، وتابع طلبات الحجز وعربون الضمان (Escrow) بكل سهولة وأمان.
          </p>

          {/* 4 Segmented Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-5 bg-black/20 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => { setHostTab('listings'); setIsSuccess(false); }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                hostTab === 'listings' 
                  ? 'bg-white text-emerald-900 shadow-sm' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>عقاراتي وغرفي ({managedProperties.length})</span>
            </button>

            <button
              onClick={() => { setHostTab('add'); setIsSuccess(false); }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                hostTab === 'add' 
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>إضافة عقار أو فندق</span>
            </button>

            <button
              onClick={() => { setHostTab('bookings'); setIsSuccess(false); }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                hostTab === 'bookings' 
                  ? 'bg-white text-emerald-900 shadow-sm' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>الحجوزات والضمان ({bookings.length || 2})</span>
            </button>

            <button
              onClick={() => { setHostTab('wallet'); setIsSuccess(false); }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                hostTab === 'wallet' 
                  ? 'bg-white text-emerald-900 shadow-sm' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>المحفظة والأرباح</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* TAB 1: MY PROPERTIES & ROOMS */}
          {hostTab === 'listings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">إدارة التوافر والأسعار المباشرة</h3>
                  <p className="text-xs text-slate-500">تحكّم بظهور عقاراتك وتعديل الأسعار وإشغال الغرف في ثوانٍ</p>
                </div>
                <button
                  onClick={() => setHostTab('add')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة منشأة جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {managedProperties.map((prop) => {
                  const isAvailable = prop.isAvailable !== false;
                  return (
                    <div 
                      key={prop.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 transition-all hover:border-emerald-300"
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={prop.images[0]} 
                          alt={prop.title}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-2xs"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {prop.type === 'hotel' ? 'فندق' : prop.type === 'farm' ? 'مزرعة' : prop.type === 'chalet' ? 'شاليه' : 'شقة'}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>موثق ميدانياً</span>
                            </span>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm truncate" title={prop.title}>
                            {prop.title}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>{prop.area} • {prop.governorate}</span>
                          </p>
                        </div>
                      </div>

                      {/* Power and Services Pill */}
                      <div className="flex items-center gap-2 text-[11px] bg-emerald-50/70 p-2 rounded-xl text-emerald-900">
                        <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className="truncate font-semibold">{prop.electricity.label}</span>
                      </div>

                      {/* Price & Availability Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        {/* Inline Price Editor */}
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">السعر لليلة</span>
                          {editingPriceId === prop.id ? (
                            <div className="flex items-center gap-1 mt-0.5">
                              <input
                                type="number"
                                value={tempPriceInput}
                                onChange={(e) => setTempPriceInput(Number(e.target.value))}
                                className="w-20 border border-emerald-500 rounded-lg px-2 py-0.5 text-xs font-bold text-emerald-800"
                              />
                              <button
                                onClick={() => {
                                  updatePropertyPrice(prop.id, tempPriceInput);
                                  setEditingPriceId(null);
                                }}
                                className="p-1 bg-emerald-600 text-white rounded-md text-xs font-bold"
                              >
                                حفظ
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => {
                              setEditingPriceId(prop.id);
                              setTempPriceInput(prop.priceUsd);
                            }}>
                              <span className="text-sm font-black text-emerald-800">
                                ${prop.priceUsd} <span className="text-[10px] text-slate-400">/ ليلة</span>
                              </span>
                              <Edit3 className="w-3 h-3 text-slate-400 hover:text-emerald-600" />
                            </div>
                          )}
                        </div>

                        {/* Instant Booking Toggle */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updatePropertyAvailability(prop.id, !isAvailable)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                              isAvailable 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {isAvailable ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>متاح للحجز</span>
                              </>
                            ) : (
                              <>
                                <X className="w-3.5 h-3.5" />
                                <span>موقف مؤقتاً</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Room Inventory Expansion (if hotel) */}
                      {prop.roomOptions && prop.roomOptions.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <span className="text-[10px] font-bold text-slate-500 block">
                            الغرف المسجلة ({prop.roomOptions.length}):
                          </span>
                          <div className="space-y-1">
                            {prop.roomOptions.map(r => (
                              <div key={r.id} className="flex items-center justify-between text-[11px] bg-slate-50 px-2.5 py-1.5 rounded-lg">
                                <span className="font-semibold text-slate-800 truncate">{r.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-emerald-700">${r.pricePerNightUsd}</span>
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">شاغرة</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW PROPERTY / HOTEL */}
          {hostTab === 'add' && (
            <div>
              {isSuccess ? (
                <div className="text-center py-10 space-y-4 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">مبروك! تم نشر منشأتك في سيران سوريا</h4>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    منشأتك أصبحت متاحة الآن على المنصة وتطبيق الهاتف مع شارة «موثق ميدانياً من سيران» للزوار داخل وخارج سوريا.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setHostTab('listings')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-xs"
                    >
                      إدارة العقار في لوحة التحكم
                    </button>
                    <button
                      onClick={() => {
                        setIsAddPropertyOpen(false);
                        setIsSuccess(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl transition-all text-xs"
                    >
                      مشاهدة الصفحة الرئيسية
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitNewProperty} className="space-y-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
                  
                  {/* Category & Title */}
                  <div className="space-y-3">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Home className="w-4 h-4 text-emerald-600" />
                      <span>المعلومات الأساسية ونوع المنشأة</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">نوع المنشأة</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value as PropertyType)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="farm">مزرعة واستراحة خاصة</option>
                          <option value="hotel">فندق أو قصر دمشقي تراثي</option>
                          <option value="chalet">شاليه بحري سياحي</option>
                          <option value="villa">فيلا أو شاليه جبلي</option>
                          <option value="apartment">شقة فندقية مفروشة</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">المحافظة السورية</label>
                        <select
                          value={governorate}
                          onChange={(e) => setGovernorate(e.target.value as Governorate)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                        >
                          {SYRIAN_GOVERNORATES.filter(g => g !== 'الكل').map(gov => (
                            <option key={gov} value={gov}>{gov}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">المنطقة أو البلدة</label>
                        <input
                          type="text"
                          required
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="مثال: يعفور / باب توما / بلودان"
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الإعلان الرسمي</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثال: استراحة ومزرعة الأندلس الفاخرة مع مسبح خاص وإنترنت فايبر"
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Pricing Dual Engine (USD & SYP) */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>الأسعار والتسعير المزدوج ($ USD و ل.س SYP)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">سعر المبيت لليلة الواحدة ($ USD)</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min={10}
                            value={priceUsd}
                            onChange={(e) => setPriceUsd(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-black text-emerald-800"
                          />
                          <span className="text-[11px] text-slate-500 block mt-1">
                            يعادل تلقائياً بالليرة: {(priceUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">سعر السيران النهاري Day-Use (10ص - 8م)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={dayUsePriceUsd}
                            onChange={(e) => setDayUsePriceUsd(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-black text-emerald-800"
                          />
                          <span className="text-[11px] text-slate-500 block mt-1">
                            يعادل تلقائياً: {(dayUsePriceUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Syrian Infrastructure & Energy Features */}
                  <div className="space-y-3">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
                      <SunMedium className="w-4 h-4 text-amber-500" />
                      <span>رادار البنية التحتية السورية (الكهرباء، المياه، والإنترنت)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">منظومة الطاقة والكهرباء</label>
                        <select
                          value={electricityType}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setElectricityType(val);
                            if (val === 'solar_24_7') setElectricityLabel('منظومة طاقة شمسية ليثيوم 24/7 مع تكييف كامل');
                            else if (val === 'generator_hours') setElectricityLabel('خط معفى من التقنين + مولدة أمبيرات');
                            else setElectricityLabel('إنفرتر إنارة وتشغيل أجهزة أساسية');
                          }}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                        >
                          <option value="solar_24_7">☀️ طاقة شمسية ليثيوم 24/7 مع تشغيل المكيفات</option>
                          <option value="generator_hours">⚡ خط كهرباء معفى من التقنين (ذهبي) + مولدة</option>
                          <option value="inverter_basic">🔋 إنفرتر بطاريات للإضاءة والراوتر</option>
                          <option value="grid_only">🔌 شبكة كهرباء نظامية</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">وصف الطاقة المعروض للنزلاء</label>
                        <input
                          type="text"
                          value={electricityLabel}
                          onChange={(e) => setElectricityLabel(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={hasPool} 
                          onChange={(e) => setHasPool(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-slate-800">مسبح خاص</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={poolPrivacy} 
                          onChange={(e) => setPoolPrivacy(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-slate-800">سواتر خصوصية</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={hasWifi} 
                          onChange={(e) => setHasWifi(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-slate-800">واي فاي سريع</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={hasWaterReserve} 
                          onChange={(e) => setHasWaterReserve(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-slate-800">خزان مياه مستمر</span>
                      </label>
                    </div>
                  </div>

                  {/* Room Options Builder */}
                  <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100">
                    <h4 className="font-black text-emerald-950 text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-emerald-700" />
                        <span>أنواع الغرف والأجنحة الفندقية (Room Options)</span>
                      </span>
                      <span className="text-xs text-emerald-700 font-bold">
                        {customRooms.length} غرفة مسجلة
                      </span>
                    </h4>

                    {/* Room list */}
                    <div className="space-y-2">
                      {customRooms.map((r, i) => (
                        <div key={r.id || i} className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-black text-slate-900 block">{r.name}</span>
                            <span className="text-slate-500">{r.bedType} • السعر: ${r.pricePerNightUsd}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveRoom(r.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Room Inline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200/50">
                      <input
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="اسم الغرفة (مثال: غرفة ديلوكس بسرير كينغ)"
                        className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-white"
                      />
                      <input
                        type="number"
                        value={newRoomPrice}
                        onChange={(e) => setNewRoomPrice(Number(e.target.value))}
                        placeholder="السعر بالدولار"
                        className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddRoom}
                        className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>إضافة هذه الغرفة</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Presets & Custom URL */}
                  <div className="space-y-3">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <span>صور العقار المعتمدة</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {presetImages.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedPresetImage(img.url);
                            setCustomImageUrl('');
                          }}
                          className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${
                            selectedPresetImage === img.url && !customImageUrl 
                              ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/30' 
                              : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-20 object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 p-1 text-[10px] text-white font-bold truncate">
                            {img.label}
                          </div>
                          {selectedPresetImage === img.url && !customImageUrl && (
                            <div className="absolute top-1 left-1 bg-emerald-600 text-white p-1 rounded-full">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">أو أدخل رابط صورة مخصص (URL)</label>
                      <input
                        type="url"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  {/* Host Contact & Syrian Payout Details */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>بيانات المضيف وقناة استلام الأرباح في سوريا</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">اسم المضيف / مدير الفندق</label>
                        <input
                          type="text"
                          required
                          value={hostName}
                          onChange={(e) => setHostName(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف السوري</label>
                        <input
                          type="text"
                          required
                          value={hostPhone}
                          onChange={(e) => setHostPhone(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">رقم الواتساب للتنبيهات الفورية</label>
                        <input
                          type="text"
                          value={hostWhatsapp}
                          onChange={(e) => setHostWhatsapp(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">طريقة استلام الأرباح المفضلة</label>
                        <select
                          value={payoutMethod}
                          onChange={(e) => setPayoutMethod(e.target.value as any)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                        >
                          <option value="syriatel_cash">سيريتل كاش (Syriatel Cash)</option>
                          <option value="mtn_cash">إم تي إن كاش (MTN Cash)</option>
                          <option value="al_haram">حوالة الهرم / الفؤاد بدمشق</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">رقم الحساب أو المحفظة</label>
                        <input
                          type="text"
                          value={payoutAccount}
                          onChange={(e) => setPayoutAccount(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black rounded-2xl shadow-lg shadow-emerald-700/25 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>نشر المنشأة وتفعيل التوثيق الميداني المباشر</span>
                    </button>
                  </div>

                </form>
              )}
            </div>
          )}

          {/* TAB 3: RECEIVED BOOKINGS & ESCROW */}
          {hostTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">سجل طلبات الحجز وعربون الضمان (Escrow)</h3>
                  <p className="text-xs text-slate-500">حجوزات مؤكدة بعربون 25% محجوز في حساب الضمان لراحتك</p>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                  <Calendar className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">حجز تجريبي نشط جاهز للمراجعة</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    بإمكانك تجربة إجراء حجز من الصفحة الرئيسية لمشاهدة تفاصيل النزيل وخيار إهداء المغتربين هنا مباشرة.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b, idx) => {
                    const prop = properties.find(p => p.id === b.propertyId);
                    return (
                      <div key={b.id || idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                حجز مؤكد بالضمان (Escrow)
                              </span>
                              {b.isFamilyGift && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                                  <Gift className="w-3 h-3 text-amber-600" />
                                  <span>إهداء مغترب لعائلته</span>
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">{prop?.title || 'مكان إقامة سيران'}</h4>
                            <p className="text-xs text-slate-500">{prop?.area} • {prop?.governorate}</p>
                          </div>
                          <div className="text-left font-mono">
                            <span className="text-[10px] text-slate-400 block">الإجمالي</span>
                            <span className="text-sm font-black text-emerald-700">${b.totalPriceUsd} USD</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
                          <div>
                            <span className="text-slate-400 block text-[10px]">النزيل الرئيسي</span>
                            <span className="font-bold text-slate-800">{b.guestName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">رقم الهاتف</span>
                            <span className="font-bold text-slate-800 font-mono">{b.guestPhone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">الوصول</span>
                            <span className="font-bold text-emerald-800">{b.checkIn}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">المغادرة</span>
                            <span className="font-bold text-slate-800">{b.checkOut}</span>
                          </div>
                        </div>

                        {/* Expat Gift Info if present */}
                        {b.isFamilyGift && b.recipientName && (
                          <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-amber-950">
                              <Gift className="w-3.5 h-3.5 text-amber-600" />
                              <span>مستلم الهدية في سوريا: {b.recipientName} ({b.recipientPhone})</span>
                            </div>
                            {b.giftMessage && (
                              <p className="text-slate-600 italic text-[11px]">«{b.giftMessage}»</p>
                            )}
                          </div>
                        )}

                        {/* Host Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/${b.guestPhone.replace('+', '').replace(/^0/, '963')}?text=${encodeURIComponent(`أهلاً بك أستاذ ${b.guestName}، تم تأكيد حجزك في ${prop?.title}. نحن بانتظار تشريفكم بكل ترحيب!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>مراسلة النزيل على واتساب</span>
                          </a>

                          <button
                            onClick={() => addNotification({ title: 'جاهزية العقار', message: 'تم تأكيد جهوزية العقار واستقبال النزيل بنجاح.', type: 'booking' })}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>تأكيد الجهوزية</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WALLET & EARNINGS */}
          {hostTab === 'wallet' && (
            <div className="space-y-5">
              
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">إجمالي الأرباح المكتملة</span>
                  <div className="text-2xl font-black text-emerald-800 font-mono">${totalVolumeUsd} USD</div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    يعادل {(totalVolumeUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">عربون الضمان الجاهز للصرف</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">${totalEscrowUsd} USD</div>
                  <span className="text-xs text-emerald-600 mt-1 block font-bold">
                    جاهز للسحب الفوري للمحفظة
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">المنشآت النشطة</span>
                  <div className="text-2xl font-black text-slate-900">{managedProperties.length} منشآت</div>
                  <span className="text-xs text-slate-500 mt-1 block">نسبة الإشغال المقدرة: 85%</span>
                </div>
              </div>

              {/* Instant Withdrawal Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CreditCard className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">طلب سحب الأرباح الفوري إلى سوريا</h4>
                    <p className="text-xs text-slate-500">يتم التحويل خلال ساعتين كحد أقصى إلى محفظتك الإلكترونية</p>
                  </div>
                </div>

                {withdrawalToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>تم تسجيل طلب السحب بنجاح وجارٍ تحويل المبلغ إلى محفظة سيريتل كاش الخاصة بك!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">قناة التحويل</label>
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <Smartphone className="w-4 h-4 text-emerald-700" />
                      <span>سيريتل كاش (رقم المحفظة: {payoutAccount})</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المبلغ المطلوب سحبه</label>
                    <div className="text-sm font-black text-slate-900 bg-slate-100 p-2.5 rounded-xl font-mono">
                      ${totalEscrowUsd} USD ({Math.round(totalEscrowUsd * SYP_PER_USD).toLocaleString('ar-SY')} ل.س)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWithdrawalRequest}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>تأكيد سحب الرصيد إلى محفظة سيريتل كاش الآن</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">سيران سوريا — منصة الضيافة والاستثمار السياحي الوطني</span>
          </div>
          <button
            onClick={() => {
              setIsAddPropertyOpen(false);
              setIsSuccess(false);
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
          >
            إغلاق البوابة
          </button>
        </div>

      </div>
    </div>
  );
};
