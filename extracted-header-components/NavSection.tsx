"use client";

import React, { FC } from "react";
import Link from "next/link";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "./MenuBar";

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
      className={`hidden md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100 ${className}`}
    >
      <div className="flex space-x-1">
        <Link
          href={listPropertyHref}
          className="self-center hidden xl:inline-flex px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {listPropertyText}
        </Link>

        <NotifyDropdown />
        <AvatarDropdown />
        <MenuBar />
      </div>
    </div>
  );
};

export default NavSection;

