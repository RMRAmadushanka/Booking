import type { TravelPackage } from "@/types/packages";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type DbDestinationDetail = {
  name: string;
  description: string;
  image_url: string;
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
};

function mapRowToPackage(row: DbPackage): TravelPackage {
  const destDetails = row.destination_details;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    packageType: row.package_type as TravelPackage["packageType"],
    destinations: row.destinations as TravelPackage["destinations"],
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
