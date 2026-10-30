import React from 'react';

export const NotificationCenterSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-pulse">
        {/* Header Skeleton */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-200"></div>
            <div className="space-y-1.5">
              <div className="h-5 bg-slate-300 rounded w-32"></div>
              <div className="h-3 bg-slate-100 rounded w-48"></div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="px-5 py-3 border-b border-slate-100 flex gap-2">
          <div className="h-7 bg-slate-300 rounded-lg w-24"></div>
          <div className="h-7 bg-slate-100 rounded-lg w-24"></div>
          <div className="h-7 bg-slate-100 rounded-lg w-24"></div>
        </div>

        {/* Notifications List Skeleton */}
        <div className="p-5 space-y-3 overflow-y-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-200"></div>
                  <div className="h-4 bg-slate-300 rounded w-28"></div>
                </div>
                <div className="h-3 bg-slate-200 rounded w-16"></div>
              </div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-100 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenterSkeleton;
