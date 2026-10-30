import React from 'react';

export const HostPortalSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8" dir="rtl">
      {/* Top Banner Skeleton */}
      <div className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-32 rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-slate-300 rounded-lg w-48"></div>
          <div className="h-4 bg-slate-200 rounded-md w-72"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-9 bg-slate-300 rounded-xl w-32"></div>
          <div className="h-9 bg-slate-200 rounded-xl w-28"></div>
        </div>
      </div>

      {/* 4 Stat Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="w-8 h-8 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="h-8 bg-slate-300 rounded-lg w-28"></div>
            <div className="h-3 bg-slate-100 rounded w-36"></div>
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <div className="h-10 bg-slate-300 rounded-xl w-36"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-36"></div>
        <div className="h-10 bg-slate-100 rounded-xl w-36"></div>
      </div>

      {/* Table / Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((row) => (
          <div key={row} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-slate-200 rounded-xl flex-shrink-0"></div>
              <div className="space-y-2">
                <div className="h-5 bg-slate-300 rounded w-48"></div>
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-100 rounded w-24"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-slate-200 rounded-lg w-20"></div>
              <div className="h-8 bg-slate-100 rounded-lg w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostPortalSkeleton;
