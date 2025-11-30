"use client";

import React, { FC } from "react";
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
  return (
    <div
      className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${className}`}
    >
      <div className="flex items-center font-medium text-sm">
        <span
          onClick={onLocationClick}
          className={`block pl-5 pr-4 py-3 ${onLocationClick ? "cursor-pointer" : ""}`}
        >
          Location
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span
          onClick={onCheckInClick}
          className={`block px-4 py-3 ${onCheckInClick ? "cursor-pointer" : ""}`}
        >
          Check In
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span
          onClick={onGuestsClick}
          className={`block px-4 font-normal py-3 ${onGuestsClick ? "cursor-pointer" : ""}`}
        >
          Add guests
        </span>
      </div>

      <div
        className={`flex-shrink-0 ml-auto pr-2 ${onSearchClick ? "cursor-pointer" : ""}`}
        onClick={onSearchClick}
      >
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000 text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default SearchButton;

