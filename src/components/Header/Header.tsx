"use client";

import React, { FC } from "react";
import Link from "next/link";
import HeaderSearchAndNav from "./HeaderSearchAndNav";
import NavSection from "./NavSection";
import MenuBar from "./components/MenuBar";

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`nc-Header sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white shadow-sm transition-all ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 lg:h-[88px] flex items-center relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#2563EB]">
                HeroSearch
              </span>
            </Link>
          </div>

          {/* Search and Nav - Centered */}
          <div className="flex-1 flex justify-center absolute left-0 right-0">
            <HeaderSearchAndNav />
          </div>

          {/* Nav Section */}
          <div className="flex-shrink-0 ml-auto flex items-center space-x-1">
            <NavSection />
            {/* MenuBar - Mobile Only */}
            <div className="flex md:hidden">
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

