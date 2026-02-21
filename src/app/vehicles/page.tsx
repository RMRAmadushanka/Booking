import { getVehicles } from "@/lib/vehicles";
import VehiclesPageClient from "@/components/Vehicles/VehiclesPageClient";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return <VehiclesPageClient initialVehicles={vehicles} />;
}
