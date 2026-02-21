import type { Vehicle } from "@/types/vehicle";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type DbVehicle = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year: number;
  transmission: string;
  fuel_type: string;
  seats: number;
  price_per_day: number;
  rating: number;
  location: string;
  features: string[] | null;
  is_available: boolean;
  gallery_urls?: string[] | null;
};

function mapRowToVehicle(row: DbVehicle): Vehicle {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    vehicleType: row.vehicle_type as Vehicle["vehicleType"],
    brand: row.brand,
    model: row.model,
    year: Number(row.year),
    transmission: row.transmission as Vehicle["transmission"],
    fuelType: row.fuel_type as Vehicle["fuelType"],
    seats: Number(row.seats),
    pricePerDay: Number(row.price_per_day),
    rating: Number(row.rating),
    location: row.location,
    features: Array.isArray(row.features) ? row.features : [],
    isAvailable: Boolean(row.is_available),
    galleryUrls:
      Array.isArray(row.gallery_urls) && row.gallery_urls.length > 0
        ? row.gallery_urls
        : undefined,
  };
}

/**
 * Fetch all vehicles from Supabase (for vehicles list page).
 * Returns empty array if table missing or env not set.
 */
export async function getVehicles(): Promise<Vehicle[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return [];
  }
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("vehicles")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("[getVehicles]", error);
      return [];
    }

    return (data ?? []).map((row) => mapRowToVehicle(row as DbVehicle));
  } catch (err) {
    console.error("[getVehicles]", err);
    return [];
  }
}

/**
 * Get unique pickup/location names from vehicles, sorted alphabetically.
 * Use for hero Cars tab and vehicles page location filter.
 */
export function getUniqueVehicleLocations(vehicles: Vehicle[]): string[] {
  const set = new Set<string>();
  for (const v of vehicles) {
    if (typeof v.location === "string" && v.location.trim()) set.add(v.location.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Get unique vehicle types from vehicles, sorted alphabetically.
 * Use for vehicles page filter options from DB.
 */
export function getUniqueVehicleTypes(vehicles: Vehicle[]): string[] {
  const set = new Set<string>();
  for (const v of vehicles) {
    if (typeof v.vehicleType === "string" && v.vehicleType.trim()) set.add(v.vehicleType.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Get unique transmission types from vehicles, sorted alphabetically.
 */
export function getUniqueTransmissions(vehicles: Vehicle[]): string[] {
  const set = new Set<string>();
  for (const v of vehicles) {
    if (typeof v.transmission === "string" && v.transmission.trim()) set.add(v.transmission.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Get unique fuel types from vehicles, sorted alphabetically.
 */
export function getUniqueFuelTypes(vehicles: Vehicle[]): string[] {
  const set = new Set<string>();
  for (const v of vehicles) {
    if (typeof v.fuelType === "string" && v.fuelType.trim()) set.add(v.fuelType.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Fetch a single vehicle by id. Returns null if not found.
 */
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null;
  }
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToVehicle(data as DbVehicle);
  } catch {
    return null;
  }
}
