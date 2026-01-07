"use client";

import React from "react";
import { PathName } from "@/routers/types";
import HeroSearchForm2Mobile from "@/components/HeroSearchForm2Mobile/HeroSearchForm2Mobile";
import { usePathname } from "next/navigation";

const PAGES_REAL_ESTATE: PathName[] = [
  "/home-2",
  "/listing-real-estate",
  "/listing-real-estate-map",
];

const HeroSearchForm2MobileFactory = () => {
  const pathname = usePathname();
  // For now, we'll use the same mobile form for all pages
  // You can add real estate specific form later if needed
  if (PAGES_REAL_ESTATE.includes(pathname as PathName)) {
    return <HeroSearchForm2Mobile />;
  }
  return <HeroSearchForm2Mobile />;
};

export default HeroSearchForm2MobileFactory;

