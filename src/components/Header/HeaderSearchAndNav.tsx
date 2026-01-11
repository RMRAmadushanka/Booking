"use client";

import React, { FC } from "react";
import SearchButton from "./SearchButton";

interface HeaderSearchAndNavProps {
  className?: string;
  // Search button props
  onLocationClick?: () => void;
  onCheckInClick?: () => void;
  onGuestsClick?: () => void;
  onSearchClick?: () => void;
  // Nav section props
  listPropertyHref?: string;
  listPropertyText?: string;
  // Show mobile search
  showMobileSearch?: boolean;
}

const HeaderSearchAndNav: FC<HeaderSearchAndNavProps> = ({
  className = "",
  onLocationClick,
  onCheckInClick,
  onGuestsClick,
  onSearchClick,
  listPropertyHref,
  listPropertyText,
  showMobileSearch = true,
}) => {
  return (
    <div className={`flex flex-[2] lg:flex-none mx-auto ${className}`}>
      <div className="flex-1 hidden lg:flex self-center">
        {/* Luxury container with glass effect */}
        <div className="relative group">
          {/* Subtle glow effect on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/20 via-cyan-100/10 to-blue-200/20 rounded-[var(--radius-xl)] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Main container */}
          <div className="relative">
            <SearchButton
              onLocationClick={onLocationClick}
              onCheckInClick={onCheckInClick}
              onGuestsClick={onGuestsClick}
              onSearchClick={onSearchClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchAndNav;
