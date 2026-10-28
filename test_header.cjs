const fs = require('fs');

const script = `import { Property } from '../types';

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
    name: 'أحياء دمشق الراقية (المالكي وأبو رمانة)', 
    governorate: 'دمشق', 
    count: 36, 
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' 
  }
];
`;

console.log("Header length:", script.length);
