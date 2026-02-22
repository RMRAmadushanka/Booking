import React from "react";

const PackageSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[var(--radius)] overflow-hidden shadow-sm border border-[#E5E7EB] animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-1 w-full" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-5/6" />

        {/* Highlights Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>

        {/* Info Skeleton */}
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-28" />
        </div>

        {/* Rating Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-4 w-32" />

        {/* Price and CTA Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
          <div className="h-8 bg-gray-200 rounded w-24" />
          <div className="flex gap-2">
            <div className="h-9 bg-gray-200 rounded w-24" />
            <div className="h-9 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSkeleton;


