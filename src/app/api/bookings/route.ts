import { getSupabaseAdmin } from "@/lib/supabase/server";

type BookingPayload = {
  packageId: string;
  packageTitle: string;
  travelerName: string;
  email: string;
  adultCount: number;
  childrenCount: number;
  guestCount: number;
  pricing?: {
    currency: "USD";
    adultPricePerPerson: number;
    childPricePerPerson: number;
    childPriceMultiplier: number;
    estimatedTotalPrice: number;
  };
  startDate: string;
  endDate: string;
  pickupLocation: string;
  notes?: string;
  imageUrls?: string[];
};

type DbBooking = {
  id: string;
  package_id: string;
  package_title: string;
  traveler_name: string;
  email: string;
  adult_count: number;
  children_count: number;
  guest_count: number;
  pricing: unknown;
  start_date: string;
  end_date: string;
  pickup_location: string;
  notes: string | null;
  image_urls: string[] | null;
  created_at: string;
};

function isValidDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isNonNegativeInt(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}

function isPositiveInt(value: unknown): value is number {
  return isNonNegativeInt(value) && value >= 1;
}

function toCamelBooking(row: DbBooking) {
  return {
    id: row.id,
    packageId: row.package_id,
    packageTitle: row.package_title,
    travelerName: row.traveler_name,
    email: row.email,
    adultCount: row.adult_count,
    childrenCount: row.children_count,
    guestCount: row.guest_count,
    pricing: row.pricing ?? undefined,
    startDate: row.start_date,
    endDate: row.end_date,
    pickupLocation: row.pickup_location,
    notes: row.notes ?? undefined,
    imageUrls: row.image_urls ?? undefined,
    createdAt: row.created_at,
  };
}

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[bookings GET]", error);
      return Response.json(
        { ok: false, error: "Failed to load bookings" },
        { status: 500 }
      );
    }

    const bookings = (data as DbBooking[] ?? []).map(toCamelBooking);
    return Response.json({ ok: true, bookings });
  } catch (err) {
    console.error("[bookings GET]", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Partial<BookingPayload> & {
    guestCount?: number;
    adultCount?: number;
    childrenCount?: number;
  };

  const hasSplitCounts =
    typeof b.adultCount !== "undefined" || typeof b.childrenCount !== "undefined";

  const adultCount = hasSplitCounts
    ? b.adultCount
    : typeof b.guestCount === "number"
      ? b.guestCount
      : undefined;
  const childrenCount = hasSplitCounts ? b.childrenCount ?? 0 : 0;
  const guestCount =
    typeof adultCount === "number" && typeof childrenCount === "number"
      ? adultCount + childrenCount
      : b.guestCount;

  if (
    !isNonEmptyString(b.packageId) ||
    !isNonEmptyString(b.packageTitle) ||
    !isNonEmptyString(b.travelerName) ||
    !isValidEmail(b.email) ||
    !isPositiveInt(adultCount) ||
    !isNonNegativeInt(childrenCount) ||
    !isPositiveInt(guestCount) ||
    !isValidDateString(b.startDate) ||
    !isValidDateString(b.endDate) ||
    !isNonEmptyString(b.pickupLocation)
  ) {
    return Response.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  if (b.startDate! > b.endDate!) {
    return Response.json(
      { ok: false, error: "Start date must be before end date" },
      { status: 400 }
    );
  }

  const row = {
    package_id: b.packageId,
    package_title: b.packageTitle,
    traveler_name: b.travelerName.trim(),
    email: b.email.trim(),
    adult_count: adultCount,
    children_count: childrenCount,
    guest_count: guestCount,
    pricing: b.pricing?.currency === "USD" ? b.pricing : null,
    start_date: b.startDate,
    end_date: b.endDate,
    pickup_location: b.pickupLocation.trim(),
    notes: typeof b.notes === "string" && b.notes.trim() ? b.notes.trim() : null,
    image_urls: Array.isArray(b.imageUrls) && b.imageUrls.length > 0 ? b.imageUrls : null,
  };

  try {
    const { data, error } = await getSupabaseAdmin().from("bookings").insert(row).select("id").single();

    if (error) {
      console.error("[bookings POST]", error);
      return Response.json(
        { ok: false, error: "Failed to save booking" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, bookingId: (data as { id: string }).id });
  } catch (err) {
    console.error("[bookings POST]", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
