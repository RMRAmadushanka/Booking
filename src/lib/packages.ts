import type { TravelPackage } from "@/types/packages";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/** Parse package duration to a fixed day count (e.g. "5 Days" -> 5, "4-6 Days" -> 5). */
export function getDayCountFromDuration(duration: string): number {
  const s = String(duration).trim();
  const singleMatch = s.match(/^(\d+)\s*Day(s)?$/i);
  if (singleMatch) {
    const n = parseInt(singleMatch[1], 10);
    return Number.isFinite(n) && n >= 1 ? n : 3;
  }
  switch (s) {
    case "1-3 Days":
      return 3;
    case "4-6 Days":
      return 5;
    case "7-10 Days":
      return 8;
    case "10+ Days":
      return 10;
    default:
      return 3;
  }
}

type DbDestinationDetail = {
  name: string;
  description: string;
  image_url: string;
};

type DbDestinationDay = {
  day: number;
  name: string;
};

type DbRouteDay = {
  day: number;
  name: string;
  image_url: string;
  description: string;
  accommodation?: string | null;
  meal_plan?: string | null;
  travel_time?: string | null;
  transport_mode?: string | null;
};

type DbPackage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  package_type: string;
  destinations: string[];
  duration: string;
  price: number;
  rating: number;
  best_for: string[];
  highlights: string[];
  gallery_urls?: string[] | null;
  destination_details?: DbDestinationDetail[] | null;
  destination_days?: DbDestinationDay[] | null;
  route_days?: DbRouteDay[] | null;
};

function mapRowToPackage(row: DbPackage): TravelPackage {
  const destDetails = row.destination_details;
  const destDays = row.destination_days;
  const routeDaysRaw = row.route_days;
  const destinations = row.destinations as TravelPackage["destinations"];
  const destinationDays =
    Array.isArray(destDays) && destDays.length > 0
      ? destDays
          .filter((d) => typeof d.day === "number" && typeof d.name === "string")
          .map((d) => ({ name: d.name, day: Number(d.day) }))
      : undefined;
  const routeDays =
    Array.isArray(routeDaysRaw) && routeDaysRaw.length > 0
      ? routeDaysRaw
          .filter((r) => typeof r.day === "number" && typeof r.name === "string")
          .map((r) => ({
            day: Number(r.day),
            name: String(r.name),
            imageUrl: typeof r.image_url === "string" && r.image_url.trim() ? r.image_url : "https://picsum.photos/seed/route/1200/800",
            description: typeof r.description === "string" && r.description.trim() ? r.description : "A day on your route. Explore at your own pace.",
            accommodation: typeof r.accommodation === "string" && r.accommodation.trim() ? r.accommodation : undefined,
            mealPlan: typeof r.meal_plan === "string" && r.meal_plan.trim() ? r.meal_plan : undefined,
            travelTime: typeof r.travel_time === "string" && r.travel_time.trim() ? r.travel_time : undefined,
            transportMode: typeof r.transport_mode === "string" && r.transport_mode.trim() ? r.transport_mode : undefined,
          }))
      : undefined;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    packageType: row.package_type as TravelPackage["packageType"],
    destinations,
    duration: row.duration as TravelPackage["duration"],
    price: Number(row.price),
    rating: Number(row.rating),
    bestFor: row.best_for as TravelPackage["bestFor"],
    highlights: row.highlights ?? [],
    galleryUrls:
      Array.isArray(row.gallery_urls) && row.gallery_urls.length > 0
        ? row.gallery_urls
        : undefined,
    destinationDetails:
      Array.isArray(destDetails) && destDetails.length > 0
        ? destDetails.map((d) => ({
            name: d.name,
            description: d.description,
            imageUrl: d.image_url,
          }))
        : undefined,
    destinationDays: destinationDays?.length ? destinationDays : undefined,
    routeDays: routeDays?.length ? routeDays : undefined,
  };
}

/**
 * Fetch all packages from Supabase (for packages list and home page).
 * Returns empty array if table missing or env not set.
 */
export async function getPackages(): Promise<TravelPackage[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("packages")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("[getPackages]", error);
      return [];
    }

    return (data ?? []).map((row) => mapRowToPackage(row as DbPackage));
  } catch (err) {
    console.error("[getPackages]", err);
    return [];
  }
}

/**
 * Get unique destination names from a list of packages, sorted alphabetically.
 * Use for hero search destination dropdown and filters.
 */
export function getUniqueDestinations(packages: TravelPackage[]): string[] {
  const set = new Set<string>();
  for (const pkg of packages) {
    if (Array.isArray(pkg.destinations)) {
      for (const d of pkg.destinations) if (typeof d === "string" && d.trim()) set.add(d.trim());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Get unique package type names from a list of packages, sorted alphabetically.
 * Use for hero search package type dropdown and filters.
 */
export function getUniquePackageTypes(packages: TravelPackage[]): string[] {
  const set = new Set<string>();
  for (const pkg of packages) {
    if (typeof pkg.packageType === "string" && pkg.packageType.trim()) set.add(pkg.packageType.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export type PopularDestination = {
  name: string;
  country: string;
  imageUrl: string;
};

/**
 * Build popular destinations with images from package data (destination_details and route_days).
 * Uses first image found per destination name. Limit to top N for the home section.
 */
export function getPopularDestinationsWithImages(
  packages: TravelPackage[],
  limit = 4,
  country = "Sri Lanka"
): PopularDestination[] {
  const byName = new Map<string, string>();

  for (const pkg of packages) {
    if (Array.isArray(pkg.destinationDetails)) {
      for (const d of pkg.destinationDetails) {
        if (typeof d.name === "string" && d.name.trim() && typeof d.imageUrl === "string" && d.imageUrl.trim()) {
          const key = d.name.trim();
          if (!byName.has(key)) byName.set(key, d.imageUrl.trim());
        }
      }
    }
    if (Array.isArray(pkg.routeDays)) {
      for (const r of pkg.routeDays) {
        if (typeof r.name === "string" && r.name.trim() && typeof r.imageUrl === "string" && r.imageUrl.trim()) {
          const key = r.name.trim();
          if (!byName.has(key)) byName.set(key, r.imageUrl.trim());
        }
      }
    }
  }

  const order = ["Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Galle", "Colombo", "Bentota", "Yala"];
  const sorted = Array.from(byName.entries()).sort(([a], [b]) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  return sorted.slice(0, limit).map(([name, imageUrl]) => ({
    name,
    country,
    imageUrl,
  }));
}

/**
 * Fetch a single package by id. Returns null if not found.
 */
export async function getPackageById(id: string): Promise<TravelPackage | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("packages")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToPackage(data as DbPackage);
  } catch {
    return null;
  }
}
