"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/images/MainLogo.png";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={MainLogo}
        alt="Drimooria Travels"
        width={140}
        height={200}
        className="h-8 sm:h-10 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;













