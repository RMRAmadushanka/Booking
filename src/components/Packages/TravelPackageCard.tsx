"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleBookNow = (selected: TravelPackage) => {
    if (onBookNow) return onBookNow(selected);
    router.push(`/packages/${selected.id}`);
  };

  return (
    <CommonCard
      type="travel"
      data={pkg}
      onBookNow={handleBookNow}
      onFavorite={onFavorite}
    />
  );
};

export default TravelPackageCard;
