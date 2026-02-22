import dynamic from "next/dynamic";
import { getVehicles } from "@/lib/vehicles";
import { getVehicleReviewCounts } from "@/lib/reviews";
import VehiclesLoading from "./loading";

const VehiclesPageClient = dynamic(
  () => import("@/components/Vehicles/VehiclesPageClient"),
  { loading: () => <VehiclesLoading /> }
);

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const reviewCounts = await getVehicleReviewCounts(vehicles.map((v) => v.id));
  return (
    <VehiclesPageClient
      initialVehicles={vehicles}
      reviewCounts={reviewCounts}
    />
  );
}
