"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";

interface SearchButtonProps {
  className?: string;
  onLocationClick?: () => void;
  onCheckInClick?: () => void;
  onGuestsClick?: () => void;
  onSearchClick?: () => void;
}

const SearchButton: FC<SearchButtonProps> = ({
  className = "",
  onLocationClick,
  onCheckInClick,
  onGuestsClick,
  onSearchClick,
}) => {
  const router = useRouter();

  const handlePackagesClick = () => {
    if (onLocationClick) {
      onLocationClick();
    } else {
      router.push("/packages");
    }
  };

  return (
    <div
      className={`
        w-full relative flex items-center justify-between 
        bg-gradient-to-b from-white to-slate-50/80
        border border-slate-200/60
        rounded-[var(--radius-xl)]
        shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08),0_1px_3px_-1px_rgba(0,0,0,0.05)]
        hover:shadow-[0_4px_30px_-4px_rgba(37,99,235,0.15),0_2px_6px_-2px_rgba(0,0,0,0.06)]
        hover:border-blue-200/60
        transition-all duration-300 ease-out
        backdrop-blur-sm
        ${className}
      `}
    >
      {/* Accent line using primary blue */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent rounded-t-[var(--radius-xl)]" />
      
      <div className="flex items-center">
        {/* Packages */}
        <span
          onClick={handlePackagesClick}
          className={`
            relative block pl-6 pr-5 py-3.5
            font-medium text-sm tracking-wide
            text-slate-700
            cursor-pointer
            transition-all duration-200
            hover:text-[#2563EB]
            group/item
          `}
        >
          <span className="relative z-10">Packages</span>
          {/* Hover underline accent */}
          <span className="absolute bottom-2 left-6 right-5 h-[1.5px] bg-gradient-to-r from-[#2563EB] to-[#2DD4BF] scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
        </span>

        {/* Divider */}
        <span className="relative h-5 w-[1px]">
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        </span>

        {/* Vehicles */}
        <span
          onClick={onCheckInClick}
          className={`
            relative block px-5 py-3.5
            font-medium text-sm tracking-wide
            text-slate-700
            cursor-pointer
            transition-all duration-200
            hover:text-[#2563EB]
            group/item
          `}
        >
          <span className="relative z-10">Vehicles</span>
          <span className="absolute bottom-2 left-5 right-5 h-[1.5px] bg-gradient-to-r from-[#2563EB] to-[#2DD4BF] scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
        </span>

        {/* Divider */}
        <span className="relative h-5 w-[1px]">
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        </span>

        {/* Customize Your Trip */}
        <span
          onClick={onGuestsClick}
          className={`
            relative block px-5 pr-6 py-3.5
            font-normal text-sm tracking-wide
            text-slate-500
            cursor-pointer
            transition-all duration-200
            hover:text-[#2563EB]
            group/item
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            Customize Your Trip
            {/* Small diamond accent using teal */}
            <svg className="w-2.5 h-2.5 text-[#2DD4BF] opacity-70" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 0L6.5 3.5L10 5L6.5 6.5L5 10L3.5 6.5L0 5L3.5 3.5L5 0Z" />
            </svg>
          </span>
          <span className="absolute bottom-2 left-5 right-6 h-[1.5px] bg-gradient-to-r from-[#2563EB] to-[#2DD4BF] scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
        </span>
      </div>
    </div>
  );
};

export default SearchButton;
