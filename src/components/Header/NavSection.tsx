"use client";

import React, { FC } from "react";
import Link from "next/link";
import NotifyDropdown from "./components/NotifyDropdown";
import AvatarDropdown from "./components/AvatarDropdown";

interface NavSectionProps {
  className?: string;
  listPropertyHref?: string;
  listPropertyText?: string;
}

const NavSection: FC<NavSectionProps> = ({
  className = "",
  listPropertyHref = "/add-listing/1",
  listPropertyText = "List your property",
}) => {
  return (
    <div
      className={`hidden md:flex relative z-10 flex-1 justify-end text-[#64748B] ${className}`}
    >
      <div className="flex space-x-1">
        <Link
          href={listPropertyHref}
          className="self-center hidden xl:inline-flex px-4 py-2 border border-[#E5E7EB] hover:border-[#2563EB] rounded-lg items-center text-sm text-[#64748B] hover:text-[#2563EB] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-opacity-75 transition-colors"
        >
          {listPropertyText}
        </Link>

        <NotifyDropdown />
        <AvatarDropdown />
      </div>
    </div>
  );
};

export default NavSection;

