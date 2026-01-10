"use client";

import React, { FC } from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold text-primary-600">HeroSearch</span>
    </Link>
  );
};

export default Logo;













