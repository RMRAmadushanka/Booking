import Link from "next/link";
import React, { FC } from "react";

interface Props {
  href?: string;
}

const ButtonSubmit: FC<Props> = ({ href = "/listing-stay-map" }) => {
  return (
    <Link
      href={href}
      className="h-12 sm:h-14 lg:h-16 w-full lg:w-16 rounded-[var(--radius-xl)] bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-colors font-semibold"
    >
      <span className="mr-2 lg:hidden text-sm sm:text-base">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </Link>
  );
};

export default ButtonSubmit;

