import React from "react";
import { Vehicle } from "@/types/vehicle";
import { CommonCard } from "@/components/common";

interface VehicleCardProps {
  vehicle: Vehicle;
  reviewCount?: number;
  averageRating?: number | null;
  onRentNow?: (vehicle: Vehicle) => void;
  onFavorite?: (vehicle: Vehicle, isFavorite: boolean) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  reviewCount = 0,
  averageRating = null,
  onRentNow,
  onFavorite,
}) => {
  return (
    <CommonCard
      type="vehicle"
      data={vehicle}
      reviewCount={reviewCount}
      averageRating={averageRating}
      onBookNow={onRentNow}
      onFavorite={onFavorite}
    />
  );
};

export default VehicleCard;
