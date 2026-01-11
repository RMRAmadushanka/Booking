"use client";

import React from "react";
import { TravelPackage } from "@/types/packages";
import { CommonCard } from "@/components/common";

interface TravelPackageCardProps {
  package: TravelPackage;
  onBookNow?: (pkg: TravelPackage) => void;
  onFavorite?: (pkg: TravelPackage, isFavorite: boolean) => void;
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({
  package: pkg,
  onBookNow,
  onFavorite,
}) => {
  return (
    <CommonCard
      type="travel"
      data={pkg}
      onBookNow={onBookNow}
      onFavorite={onFavorite}
    />
  );
};

export default TravelPackageCard;
