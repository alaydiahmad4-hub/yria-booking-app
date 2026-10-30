import React from 'react';

export const SmsConfirmationSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="max-w-sm w-full bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-700 animate-pulse">
        {/* Notch */}
        <div className="w-24 h-4 bg-slate-950 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Screen Canvas Skeleton */}
        <div className="bg-slate-950 rounded-[32px] p-4 text-white space-y-4 border border-slate-800">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <div className="h-3 bg-slate-800 rounded w-16"></div>
            <div className="h-3 bg-slate-800 rounded w-12"></div>
          </div>

          <div className="space-y-3 py-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl mx-auto"></div>
            <div className="h-5 bg-slate-700 rounded w-40 mx-auto"></div>
            <div className="h-3 bg-slate-800 rounded w-56 mx-auto"></div>
          </div>

          {/* SMS Bubble Skeleton */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="h-3 bg-slate-800 rounded w-24"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-700 rounded w-2/3"></div>
            <div className="h-10 bg-slate-800 rounded-xl w-full"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-slate-800 rounded-2xl w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SmsConfirmationSkeleton;
