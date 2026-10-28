import React from 'react';

interface SeyranBrandLogoProps {
  variant?: 'full' | 'icon' | 'emblem' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const SeyranBrandLogo: React.FC<SeyranBrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showText = true,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-2xl',
    lg: 'text-xl sm:text-3xl',
    xl: 'text-2xl sm:text-4xl',
  };

  // World-Class Master Vector: Syrian Palace Arch + Imperial Damascus Jasmine + Luxury Villa Gable + Mediterranean Azure Waves
  const SvgIcon = () => (
    <div className={`relative ${iconSizes[size]} flex-shrink-0 group select-none`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-xl"
      >
        <defs>
          {/* Deep Imperial Syrian Emerald */}
          <radialGradient id="seyranRoyalEmerald" cx="50%" cy="30%" r="70%" fx="50%" fy="25%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="45%" stopColor="#047857" />
            <stop offset="80%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </radialGradient>

          {/* 24K Polished Damascus Imperial Gold */}
          <linearGradient id="damascusImperialGold" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Light Champagne Gold Accent */}
          <linearGradient id="champagneGold" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Mediterranean Azure Blue Oasis */}
          <linearGradient id="medAzureOasis" x1="20" y1="85" x2="100" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Royal Obsidian Dark Shield */}
          <linearGradient id="obsidianShield" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Luster Gold Glow Filter */}
          <filter id="jasmineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Medallion Outer Container (Squircle) */}
        <rect
          x="5"
          y="5"
          width="110"
          height="110"
          rx={variant === 'emblem' ? 55 : 30}
          fill={variant === 'emblem' ? 'url(#obsidianShield)' : 'url(#seyranRoyalEmerald)'}
          stroke="url(#damascusImperialGold)"
          strokeWidth="3.2"
        />

        {/* Outer Bevel Highlight */}
        <rect
          x="7"
          y="7"
          width="106"
          height="106"
          rx={variant === 'emblem' ? 53 : 28}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* Inner Guilloché / Filigree Inset Ring */}
        <rect
          x="11"
          y="11"
          width="98"
          height="98"
          rx={variant === 'emblem' ? 49 : 25}
          fill="none"
          stroke="url(#damascusImperialGold)"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          strokeDasharray="4 2.5"
        />

        {/* 2. Sacred Syrian Andalusian Archway (قوس العمارة الدمشقية التراثي) */}
        <path
          d="M32 90 V58 C32 42, 44 32, 60 28 C76 32, 88 42, 88 58 V90"
          stroke="url(#damascusImperialGold)"
          strokeWidth="2.2"
          strokeOpacity="0.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 3. Luxury Syrian Chalet Roofline & Sunbeam Arch */}
        {/* Main Gable Peak */}
        <path
          d="M23 66 L60 33 L97 66"
          stroke="url(#damascusImperialGold)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Gable Accent */}
        <path
          d="M34 57 L60 34 L86 57"
          stroke="#ffffff"
          strokeOpacity="0.65"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Architectural Chimney Feature */}
        <path
          d="M77 44 V30 H84 V50"
          stroke="url(#damascusImperialGold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. Imperial Damascus Jasmine Blossom (زهرة الياسمين الدمشقي الملكية 8 بتلات) */}
        <g transform="translate(60, 68)" filter="url(#jasmineGlow)">
          {/* Subtle Octagram Halo */}
          <rect x="-16" y="-16" width="32" height="32" rx="3" fill="none" stroke="url(#damascusImperialGold)" strokeWidth="0.8" strokeOpacity="0.35" transform="rotate(0)" />
          <rect x="-16" y="-16" width="32" height="32" rx="3" fill="none" stroke="url(#damascusImperialGold)" strokeWidth="0.8" strokeOpacity="0.35" transform="rotate(45)" />

          {/* 8 Jasmine Petals radiating around core */}
          {/* North */}
          <path d="M0 -3 C-3 -13 3 -13 0 -3" fill="url(#champagneGold)" />
          {/* North-East */}
          <path d="M2 -2 C9 -9 11 -3 2 -2" fill="url(#champagneGold)" />
          {/* East */}
          <path d="M3 0 C13 -3 13 3 3 0" fill="url(#champagneGold)" />
          {/* South-East */}
          <path d="M2 2 C10 8 5 11 2 2" fill="url(#champagneGold)" />
          {/* South */}
          <path d="M0 3 C-3 13 3 13 0 3" fill="url(#champagneGold)" />
          {/* South-West */}
          <path d="M-2 2 C-10 8 -5 11 -2 2" fill="url(#champagneGold)" />
          {/* West */}
          <path d="M-3 0 C-13 -3 -13 3 -3 0" fill="url(#champagneGold)" />
          {/* North-West */}
          <path d="M-2 -2 C-9 -9 -11 -3 -2 -2" fill="url(#champagneGold)" />

          {/* Glowing Pearl Jasmine Center */}
          <circle cx="0" cy="0" r="4.2" fill="#ffffff" />
          <circle cx="0" cy="0" r="2.2" fill="url(#damascusImperialGold)" />
          <circle cx="0" cy="0" r="1.1" fill="#f59e0b" />
        </g>

        {/* 5. Mediterranean Azure Oasis Waves (أمواج المسبح والساحل الفيروزي) */}
        <path
          d="M30 87 C39 84.5 49 88.5 60 86.5 C71 84.5 81 88.5 90 86.5"
          stroke="url(#medAzureOasis)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M38 93.5 C45 92 52 94.5 60 93.5 C68 92 75 94.5 82 93.5"
          stroke="url(#medAzureOasis)"
          strokeOpacity="0.75"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 6. Northern Guide Orient Star of Damascus */}
        <polygon
          points="60,15 62.5,21 68,21.5 63.5,25 65.5,30.5 60,27 54.5,30.5 56.5,25 52,21.5 57.5,21"
          fill="url(#damascusImperialGold)"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <SvgIcon />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <SvgIcon />
        <div className="flex flex-col text-right leading-none">
          <span className="font-black text-slate-900 text-base tracking-tight">سيران</span>
          <span className="text-[11px] text-emerald-700 font-extrabold tracking-wider">سوريا</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      <SvgIcon />
      
      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-2">
            <span className={`font-black tracking-tight bg-gradient-to-l from-emerald-950 via-teal-900 to-emerald-900 bg-clip-text text-transparent ${textSizes[size]} whitespace-nowrap`}>
              سيران سوريا
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 font-black rounded-lg bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 text-amber-950 border border-amber-300/80 shadow-xs">
              <span className="text-amber-600 font-black">★</span>
              <span>SEYRAN LUXURY</span>
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500 tracking-wide hidden sm:block">
            منظومة حجز الفنادق، الشاليهات، والمزارع في سوريا
          </span>
          <span className="text-[9px] font-extrabold text-emerald-800 tracking-wider hidden lg:block uppercase">
            Damascus Jasmine Certified • 24/7 Solar Stays
          </span>
        </div>
      )}
    </div>
  );
};
