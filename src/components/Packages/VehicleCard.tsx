"use client";

import React from "react";
import { Vehicle } from "@/types/vehicle";
import { CommonCard } from "@/components/common";

interface VehicleCardProps {
  vehicle: Vehicle;
  onRentNow?: (vehicle: Vehicle) => void;
  onFavorite?: (vehicle: Vehicle, isFavorite: boolean) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onRentNow,
  onFavorite,
}) => {
  return (
    <CommonCard
      type="vehicle"
      data={vehicle}
      onBookNow={onRentNow}
      onFavorite={onFavorite}
    />
  );
};

export default VehicleCard;
