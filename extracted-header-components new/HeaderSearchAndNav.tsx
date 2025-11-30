"use client";

import React, { FC } from "react";
import SearchButton from "./SearchButton";
import NavSection from "./NavSection";
import HeroSearchForm2MobileFactory from "./components/MobileSearch/HeroSearchForm2MobileFactory";

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
        <SearchButton
          onLocationClick={onLocationClick}
          onCheckInClick={onCheckInClick}
          onGuestsClick={onGuestsClick}
          onSearchClick={onSearchClick}
        />
      </div>
      {showMobileSearch && (
        <div className="self-center flex-1 lg:hidden w-full max-w-lg mx-auto">
          <HeroSearchForm2MobileFactory />
        </div>
      )}
    </div>
  );
};

export default HeaderSearchAndNav;

