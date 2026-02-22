import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type ReviewItem = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  travelerName: string;
  /** Gravatar URL for reviewer (from booking/rental email). Optional. */
  avatarUrl: string | null;
};

function gravatarUrl(email: string): string {
  const hash = createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=96&d=identicon`;
}

export type PaginatedReviews = {
  reviews: ReviewItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const DEFAULT_LIMIT = 5;

/**
 * Fetch paginated reviews for a travel package (reviews linked to bookings for this package).
 */
export async function getPackageReviews(
  packageId: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedReviews> {
  const supabase = getSupabaseAdmin();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id")
    .eq("package_id", packageId);

  const bookingIds = (bookings ?? []).map((b) => (b as { id: string }).id);
  if (bookingIds.length === 0) {
    return { reviews: [], total: 0, page: 1, limit, totalPages: 0 };
  }

  const { count } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("type", "booking")
    .in("reference_id", bookingIds);

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const from = (safePage - 1) * limit;

  const { data: rows } = await supabase
    .from("reviews")
    .select("id, reference_id, rating, comment, created_at")
    .eq("type", "booking")
    .in("reference_id", bookingIds)
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  const refIds = (rows ?? []).map((r) => (r as { reference_id: string }).reference_id);
  let nameMap: Record<string, string> = {};
  let emailMap: Record<string, string> = {};
  if (refIds.length > 0) {
    const { data: bookingRows } = await supabase
      .from("bookings")
      .select("id, traveler_name, email")
      .in("id", refIds);
    for (const b of bookingRows ?? []) {
      const row = b as { id: string; traveler_name: string; email: string };
      nameMap[row.id] = row.traveler_name;
      emailMap[row.id] = row.email ?? "";
    }
  }

  const reviews: ReviewItem[] = (rows ?? []).map((r) => {
    const row = r as {
      id: string;
      reference_id: string;
      rating: number;
      comment: string | null;
      created_at: string;
    };
    const email = emailMap[row.reference_id];
    return {
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      createdAt: row.created_at,
      travelerName: nameMap[row.reference_id] ?? "Traveler",
      avatarUrl: email?.trim() ? gravatarUrl(email) : null,
    };
  });

  return {
    reviews,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

/**
 * Fetch paginated reviews for a vehicle (reviews linked to rentals for this vehicle).
 */
export async function getVehicleReviews(
  vehicleId: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedReviews> {
  const supabase = getSupabaseAdmin();

  const { data: rentals } = await supabase
    .from("vehicle_rentals")
    .select("id")
    .eq("vehicle_id", vehicleId);

  const rentalIds = (rentals ?? []).map((r) => (r as { id: string }).id);
  if (rentalIds.length === 0) {
    return { reviews: [], total: 0, page: 1, limit, totalPages: 0 };
  }

  const { count } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("type", "rental")
    .in("reference_id", rentalIds);

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const from = (safePage - 1) * limit;

  const { data: rows } = await supabase
    .from("reviews")
    .select("id, reference_id, rating, comment, created_at")
    .eq("type", "rental")
    .in("reference_id", rentalIds)
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  const refIds = (rows ?? []).map((r) => (r as { reference_id: string }).reference_id);
  let nameMap: Record<string, string> = {};
  let emailMap: Record<string, string> = {};
  if (refIds.length > 0) {
    const { data: rentalRows } = await supabase
      .from("vehicle_rentals")
      .select("id, traveler_name, email")
      .in("id", refIds);
    for (const r of rentalRows ?? []) {
      const row = r as { id: string; traveler_name: string; email: string };
      nameMap[row.id] = row.traveler_name;
      emailMap[row.id] = row.email ?? "";
    }
  }

  const reviews: ReviewItem[] = (rows ?? []).map((r) => {
    const row = r as {
      id: string;
      reference_id: string;
      rating: number;
      comment: string | null;
      created_at: string;
    };
    const email = emailMap[row.reference_id];
    return {
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      createdAt: row.created_at,
      travelerName: nameMap[row.reference_id] ?? "Traveler",
      avatarUrl: email?.trim() ? gravatarUrl(email) : null,
    };
  });

  return {
    reviews,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

/**
 * Get review counts for multiple packages (for listing pages).
 * Returns a map of package_id -> number of reviews.
 */
export async function getPackageReviewCounts(
  packageIds: string[]
): Promise<Record<string, number>> {
  if (packageIds.length === 0) return {};
  const supabase = getSupabaseAdmin();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, package_id")
    .in("package_id", packageIds);

  const bookingIds = (bookings ?? []).map((b) => (b as { id: string }).id);
  if (bookingIds.length === 0) {
    return Object.fromEntries(
      packageIds.map((id) => [id, { count: 0, averageRating: null }])
    );
  }

  const refToPackage: Record<string, string> = {};
  for (const b of bookings ?? []) {
    const row = b as { id: string; package_id: string };
    refToPackage[row.id] = row.package_id;
  }

  const { data: reviewRows } = await supabase
    .from("reviews")
    .select("reference_id, rating")
    .eq("type", "booking")
    .in("reference_id", bookingIds);

  const countByPackage: Record<string, number> = {};
  const sumByPackage: Record<string, number> = {};
  for (const id of packageIds) {
    countByPackage[id] = 0;
    sumByPackage[id] = 0;
  }
  for (const r of reviewRows ?? []) {
    const row = r as { reference_id: string; rating: number };
    const pkgId = refToPackage[row.reference_id];
    if (pkgId != null) {
      countByPackage[pkgId] = (countByPackage[pkgId] ?? 0) + 1;
      sumByPackage[pkgId] = (sumByPackage[pkgId] ?? 0) + row.rating;
    }
  }
  const result: Record<string, { count: number; averageRating: number | null }> = {};
  for (const id of packageIds) {
    const count = countByPackage[id] ?? 0;
    const sum = sumByPackage[id] ?? 0;
    result[id] = {
      count,
      averageRating: count > 0 ? Math.round((sum / count) * 10) / 10 : null,
    };
  }
  return result;
}

/**
 * Get review counts for multiple vehicles (for listing pages).
 * Returns a map of vehicle_id -> number of reviews.
 */
export async function getVehicleReviewCounts(
  vehicleIds: string[]
): Promise<Record<string, number>> {
  if (vehicleIds.length === 0) return {};
  const supabase = getSupabaseAdmin();

  const { data: rentals } = await supabase
    .from("vehicle_rentals")
    .select("id, vehicle_id")
    .in("vehicle_id", vehicleIds);

  const rentalIds = (rentals ?? []).map((r) => (r as { id: string }).id);
  if (rentalIds.length === 0) {
    return Object.fromEntries(
      vehicleIds.map((id) => [id, { count: 0, averageRating: null }])
    );
  }

  const refToVehicle: Record<string, string> = {};
  for (const r of rentals ?? []) {
    const row = r as { id: string; vehicle_id: string };
    refToVehicle[row.id] = row.vehicle_id;
  }

  const { data: reviewRows } = await supabase
    .from("reviews")
    .select("reference_id, rating")
    .eq("type", "rental")
    .in("reference_id", rentalIds);

  const countByVehicle: Record<string, number> = {};
  const sumByVehicle: Record<string, number> = {};
  for (const id of vehicleIds) {
    countByVehicle[id] = 0;
    sumByVehicle[id] = 0;
  }
  for (const r of reviewRows ?? []) {
    const row = r as { reference_id: string; rating: number };
    const vehId = refToVehicle[row.reference_id];
    if (vehId != null) {
      countByVehicle[vehId] = (countByVehicle[vehId] ?? 0) + 1;
      sumByVehicle[vehId] = (sumByVehicle[vehId] ?? 0) + row.rating;
    }
  }
  const result: Record<string, { count: number; averageRating: number | null }> = {};
  for (const id of vehicleIds) {
    const count = countByVehicle[id] ?? 0;
    const sum = sumByVehicle[id] ?? 0;
    result[id] = {
      count,
      averageRating: count > 0 ? Math.round((sum / count) * 10) / 10 : null,
    };
  }
  return result;
}

/**
 * Get total review count and average rating for a single package (detail page).
 */
export async function getPackageReviewStats(
  packageId: string
): Promise<{ total: number; averageRating: number | null }> {
  const map = await getPackageReviewCounts([packageId]);
  const entry = map[packageId];
  return entry ? { total: entry.count, averageRating: entry.averageRating } : { total: 0, averageRating: null };
}

/**
 * Get total review count and average rating for a single vehicle (detail page).
 */
export async function getVehicleReviewStats(
  vehicleId: string
): Promise<{ total: number; averageRating: number | null }> {
  const map = await getVehicleReviewCounts([vehicleId]);
  const entry = map[vehicleId];
  return entry ? { total: entry.count, averageRating: entry.averageRating } : { total: 0, averageRating: null };
}

/** Testimonial for "Trusted by Travelers Worldwide" (from reviews with comments). */
export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
};

/**
 * Get recent reviews that have a comment, for use as testimonials on the home page.
 * Returns traveler name, comment as quote, and country as location (no package/vehicle names).
 */
export async function getRecentTestimonials(
  limit: number = 6
): Promise<TestimonialItem[]> {
  const supabase = getSupabaseAdmin();

  const { data: rows } = await supabase
    .from("reviews")
    .select("id, type, reference_id, rating, comment, created_at")
    .not("comment", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit * 2);

  const list = (rows ?? []).filter(
    (r) => typeof (r as { comment: string | null }).comment === "string" && (r as { comment: string }).comment.trim().length > 0
  ).slice(0, limit) as Array<{
    id: string;
    type: string;
    reference_id: string;
    rating: number;
    comment: string;
    created_at: string;
  }>;

  if (list.length === 0) return [];

  const bookingRefs = list.filter((r) => r.type === "booking").map((r) => r.reference_id);
  const rentalRefs = list.filter((r) => r.type === "rental").map((r) => r.reference_id);

  let bookingMap: Record<string, { name: string; location: string }> = {};
  let rentalMap: Record<string, { name: string; location: string }> = {};

  if (bookingRefs.length > 0) {
    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, traveler_name, country")
      .in("id", bookingRefs);
    for (const b of bookings ?? []) {
      const row = b as { id: string; traveler_name: string; country: string | null };
      bookingMap[row.id] = {
        name: row.traveler_name,
        location: row.country?.trim() || "Traveler",
      };
    }
  }
  if (rentalRefs.length > 0) {
    const { data: rentals } = await supabase
      .from("vehicle_rentals")
      .select("id, traveler_name, country")
      .in("id", rentalRefs);
    for (const r of rentals ?? []) {
      const row = r as { id: string; traveler_name: string; country: string | null };
      rentalMap[row.id] = {
        name: row.traveler_name,
        location: row.country?.trim() || "Traveler",
      };
    }
  }

  return list.map((r) => {
    const meta = r.type === "booking" ? bookingMap[r.reference_id] : rentalMap[r.reference_id];
    return {
      id: r.id,
      quote: r.comment.trim(),
      name: meta?.name ?? "Traveler",
      location: meta?.location ?? "Traveler",
      rating: r.rating,
    };
  });
}
