import React from "react";
import { Vehicle } from "@/types/vehicle";
import { CommonCard } from "@/components/common";

interface VehicleCardProps {
  vehicle: Vehicle;
  reviewCount?: number;
  averageRating?: number | null;
  onRentNow?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  reviewCount = 0,
  averageRating = null,
  onRentNow,
}) => {
  return (
    <CommonCard
      type="vehicle"
      data={vehicle}
      reviewCount={reviewCount}
      averageRating={averageRating}
      onBookNow={onRentNow}
    />
  );
};

export default VehicleCard;
