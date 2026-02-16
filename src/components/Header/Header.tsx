"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderSearchAndNav from "./HeaderSearchAndNav";
import NavSection from "./NavSection";
import MenuBar from "./components/MenuBar";
import MainLogo from "@/images/MainLogo.png";

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`
        nc-Header sticky top-0 z-40 w-full 
        bg-white/70 
        backdrop-blur-xl backdrop-saturate-150
        border-b border-white/20
        shadow-[0_4px_30px_rgba(0,0,0,0.05)]
        transition-all duration-300
        supports-[backdrop-filter]:bg-white/60
        ${className}
      `}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      
      {/* Bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-16 lg:h-[72px] flex items-center relative">
          {/* Logo */}
          <div className="flex-shrink-0 relative z-10">
            <Link href="/" className="flex items-center">
              <Image
                src={MainLogo}
                alt="Drimooria Travels"
                width={140}
                height={20}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Search and Nav - Centered */}
          <div className="flex-1 flex justify-center absolute left-0 right-0">
            <HeaderSearchAndNav />
          </div>

          {/* Nav Section */}
          <div className="flex-shrink-0 ml-auto flex items-center space-x-1 relative z-10">

            {/* MenuBar - Shows when HeaderSearchAndNav is hidden (below lg) */}
            <div className="flex lg:hidden">
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
