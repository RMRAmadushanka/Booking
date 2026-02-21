import { Vehicle, VehicleFilters } from "@/types/vehicle";

/** Normalize value to number for comparison (Supabase may return numeric columns as strings). */
function toNum(value: unknown): number {
  if (value == null) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  const [minPrice, maxPrice] = filters.priceRange;

  return vehicles.filter((vehicle) => {
    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      const searchableText = [
        vehicle.title,
        vehicle.description,
        vehicle.brand,
        vehicle.model,
        vehicle.location,
        vehicle.vehicleType,
      ]
        .filter(Boolean)
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

    // Price range filter (normalize for Supabase numeric/string)
    const price = toNum(vehicle.pricePerDay);
    if (price < minPrice || price > maxPrice) {
      return false;
    }

    // Minimum seats filter
    const seats = toNum(vehicle.seats);
    if (filters.minSeats > 0 && seats < filters.minSeats) {
      return false;
    }

    // Minimum rating filter
    const rating = toNum(vehicle.rating);
    if (filters.minRating > 0 && rating < filters.minRating) {
      return false;
    }

    // Location filter
    if (filters.location.trim()) {
      const loc = (vehicle.location ?? "").toString().toLowerCase();
      const filterLoc = filters.location.toLowerCase().trim();
      if (!loc.includes(filterLoc)) {
        return false;
      }
    }

    return true;
  });
}
