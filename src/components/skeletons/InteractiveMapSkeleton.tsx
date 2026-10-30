import React from 'react';

export const InteractiveMapSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-slate-100 rounded-3xl border border-slate-200/80 p-8 shadow-xs animate-pulse space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-slate-300 rounded-lg w-52"></div>
          <div className="h-4 bg-slate-200 rounded-md w-80"></div>
        </div>
        <div className="h-9 bg-slate-200 rounded-xl w-32"></div>
      </div>

      {/* Map visual canvas placeholder */}
      <div className="w-full h-96 bg-gradient-to-br from-slate-200 via-emerald-100/30 to-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <div className="w-6 h-6 bg-emerald-600 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="h-4 bg-slate-300 rounded w-40 mx-auto"></div>
          <div className="h-3 bg-slate-200 rounded w-56 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMapSkeleton;
