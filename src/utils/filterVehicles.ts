import { Vehicle, VehicleFilters } from "@/types/vehicle";

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  return vehicles.filter((vehicle) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        vehicle.title,
        vehicle.description,
        vehicle.brand,
        vehicle.model,
        vehicle.location,
        vehicle.vehicleType,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Vehicle type filter
    if (
      filters.vehicleTypes.length > 0 &&
      !filters.vehicleTypes.includes(vehicle.vehicleType)
    ) {
      return false;
    }

    // Transmission filter
    if (
      filters.transmissions.length > 0 &&
      !filters.transmissions.includes(vehicle.transmission)
    ) {
      return false;
    }

    // Fuel type filter
    if (
      filters.fuelTypes.length > 0 &&
      !filters.fuelTypes.includes(vehicle.fuelType)
    ) {
      return false;
    }

    // Price range filter
    if (
      vehicle.pricePerDay < filters.priceRange[0] ||
      vehicle.pricePerDay > filters.priceRange[1]
    ) {
      return false;
    }

    // Minimum seats filter
    if (filters.minSeats > 0 && vehicle.seats < filters.minSeats) {
      return false;
    }

    // Minimum rating filter
    if (filters.minRating > 0 && vehicle.rating < filters.minRating) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      !vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}
