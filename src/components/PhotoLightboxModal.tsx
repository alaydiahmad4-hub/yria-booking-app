import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers,
  Share2
} from 'lucide-react';

export const PhotoLightboxModal: React.FC = () => {
  const { 
    isLightboxOpen, 
    lightboxImages, 
    lightboxActiveIndex, 
    closeLightbox, 
    setLightboxActiveIndex,
    selectedProperty 
  } = useApp();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<'all' | 'pool' | 'interior' | 'outdoor'>('all');

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxActiveIndex, lightboxImages.length]);

  if (!isLightboxOpen || lightboxImages.length === 0) return null;

  const currentImage = lightboxImages[lightboxActiveIndex] || lightboxImages[0];

  const handleNext = () => {
    setLightboxActiveIndex((lightboxActiveIndex + 1) % lightboxImages.length);
  };

  const handlePrev = () => {
    setLightboxActiveIndex((lightboxActiveIndex - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleSharePhoto = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProperty?.title || 'سيران سوريا',
        url: currentImage,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(currentImage);
      alert('تم نسخ رابط الصورة إلى الحافظة!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl animate-fadeIn text-white select-none">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-black/40 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الصور الاحترافي HD</span>
          </div>
          {selectedProperty && (
            <h3 className="text-sm font-semibold text-slate-300 hidden md:block line-clamp-1 max-w-md">
              {selectedProperty.title}
            </h3>
          )}
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full text-slate-200">
            {lightboxActiveIndex + 1} / {lightboxImages.length}
          </span>

          <button
            onClick={handleSharePhoto}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
            title="مشاركة الصورة"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
            title="ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={closeLightbox}
            className="p-2 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-colors"
            title="إغلاق (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-emerald-600/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl"
          title="الصورة السابقة (سهم يسار)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-emerald-600/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl"
          title="الصورة التالية (سهم يمين)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Display Image */}
        <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <img
            key={currentImage}
            src={currentImage}
            alt={`صورة ${lightboxActiveIndex + 1}`}
            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-all duration-300 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="px-4 py-3 bg-black/60 border-t border-white/10 overflow-x-auto z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2.5">
          {lightboxImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxActiveIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === lightboxActiveIndex 
                  ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/50' 
                  : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/40'
              }`}
            >
              <img src={img} alt={`مصغرة ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
