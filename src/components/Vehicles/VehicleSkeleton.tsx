import React from "react";

const VehicleSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[var(--radius-md)] overflow-hidden shadow-sm border border-slate-200 animate-pulse">
      {/* Image skeleton */}
      <div className="h-64 bg-slate-200" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Title skeleton */}
        <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded-md w-full" />
          <div className="h-4 bg-slate-200 rounded-md w-2/3" />
        </div>

        {/* Info items skeleton */}
        <div className="flex gap-4 mb-4">
          <div className="h-5 bg-slate-200 rounded-md w-20" />
          <div className="h-5 bg-slate-200 rounded-md w-16" />
          <div className="h-5 bg-slate-200 rounded-md w-24" />
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-200 rounded-sm" />
            ))}
          </div>
          <div className="h-4 bg-slate-200 rounded-md w-12" />
        </div>

        {/* Price and CTA skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="h-8 bg-slate-200 rounded-md w-24" />
          <div className="h-10 bg-slate-200 rounded-[var(--radius)] w-28" />
        </div>
      </div>
    </div>
  );
};

export default VehicleSkeleton;
