"use client";

import React, { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface HeroSearchButtonProps {
  className?: string;
  showHeroSearch?: boolean;
}

const HeroSearchButton: FC<HeroSearchButtonProps> = ({
  className = "",
  showHeroSearch = false,
}) => {
  return (
    <div
      className={`w-full relative flex items-center justify-center border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all
visible
      ${className}`}
    >
      <div className="flex items-center font-medium text-sm">
        <span className="block pl-5 pr-4 py-3">Location</span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span className="block px-4 py-3">Check In</span>
        
        <span className="block px-4 py-3">Check In</span>
      </div>

    </div>
  );
};

export default HeroSearchButton;

