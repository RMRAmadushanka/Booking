import VehicleDetailSkeleton from "@/components/Vehicles/VehicleDetailSkeleton";

/**
 * Shown while the vehicle detail page is loading (server fetch).
 */
export default function VehicleDetailLoading() {
  return <VehicleDetailSkeleton />;
}
