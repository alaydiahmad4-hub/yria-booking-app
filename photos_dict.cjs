const fs = require('fs');

// Realistic curated photos dictionary for Syria:
const REAL_PHOTOS = {
  // Courtyards & Damascus Old City (Beit Al Mamlouka, Beit Al Wali, Talisman, Beit Zafran, Beit Sitti, Beit Zaman, Julia Dumna, Dar Al Salam, Old City Apt)
  damascus_courtyard_1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', // Marble fountain & courtyard
  damascus_courtyard_2: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80', // Arched colonnades & ablaq
  damascus_suite_1: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80', // Traditional Oriental suite
  damascus_suite_2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Ajami painted ceiling & brass
  damascus_patio_1: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80', // Levantine stone courtyard
  damascus_lounge_1: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', // Arabesque salon
  damascus_lanterns: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Heritage courtyard with lights
  damascus_luxury_room: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', // Luxury heritage bed
  
  // Luxury 5-Star City Hotels (Four Seasons, Sheraton, Dama Rose, Cham Palace, Blue Tower, Carlton, Ebla Cham, Semiramis)
  fs_facade: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  fs_room: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
  fs_pool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  sheraton_facade: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  sheraton_suite: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  damarose_facade: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  city_tower: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',

  // Yaafour & Country Farms (Private pools, orchards, pergolas)
  yaafour_farm_pool: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  yaafour_villa_garden: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  farm_private_pool: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  farm_infinity_view: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
  farm_indoor_outdoor: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',

  // Coastal Chalets & Mountain Resorts (Porto Tartous, Latakia Blue Beach, Bloudan, Mashta)
  porto_tartous_sea: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  latakia_blue_beach: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  bloudan_mountain_cabin: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
  mashta_green_valley: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  chalet_stone_cabin: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
  chalet_sea_balcony: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',

  // Modern Furnished Apartments (Malki, Abu Roumaneh, Mezzeh, Kafr Sousa, Aleppo)
  malki_salon: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  abu_roumaneh_penthouse: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  mezzeh_modern_suite: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  kafrsousa_kitchen: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
  apt_city_balcony: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
  apt_elegant_suite: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  apt_cozy_bedroom: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
};

console.log('REAL_PHOTOS keys:', Object.keys(REAL_PHOTOS).length);
