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
      className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${
        showHeroSearch
          ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible"
          : "visible"
      } ${className}`}
    >
      <div className="flex items-center font-medium text-sm">
        <span className="block pl-5 pr-4 py-3">Packages</span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span className="block px-4 py-3">Vehicles</span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span className="block px-4 font-normal py-3">Customize Your Trip</span>
      </div>

      <div className="flex-shrink-0 ml-auto pr-2">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000 text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default HeroSearchButton;

