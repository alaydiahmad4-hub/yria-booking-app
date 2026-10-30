import React from 'react';

export const ModalFallbackSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-pulse space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded-lg w-40"></div>
          <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
        </div>
        <div className="space-y-3 py-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
          <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

export default ModalFallbackSkeleton;
