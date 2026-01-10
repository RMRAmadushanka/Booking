"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
      className={`w-full relative flex items-center justify-between border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow transition-all bg-white ${className}`}
    >
      <div className="flex items-center font-medium text-sm text-[#64748B]">
        <span
          onClick={handlePackagesClick}
          className={`block pl-5 pr-4 py-3 ${onLocationClick || true ? "cursor-pointer hover:text-[#2563EB] transition-colors" : ""}`}
        >
          Packages
        </span>
        <span className="h-5 w-[1px] bg-[#E5E7EB]"></span>
        <span
          onClick={onCheckInClick}
          className={`block px-4 py-3 ${onCheckInClick ? "cursor-pointer hover:text-[#2563EB] transition-colors" : ""}`}
        >
          Vehicles
        </span>
        <span className="h-5 w-[1px] bg-[#E5E7EB]"></span>
        <span
          onClick={onGuestsClick}
          className={`block px-4 font-normal py-3 ${onGuestsClick ? "cursor-pointer hover:text-[#2563EB] transition-colors" : ""}`}
        >
          Customize Your Trip
        </span>
      </div>

    </div>
  );
};

export default SearchButton;

