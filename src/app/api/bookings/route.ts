import { promises as fs } from "node:fs";
import path from "node:path";

type BookingPayload = {
  packageId: string;
  packageTitle: string;
  travelerName: string;
  email: string;
  // New: keep adults/children for better pricing & planning.
  // We still store `guestCount` as total for convenience.
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
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  pickupLocation: string;
  notes?: string;
};

type StoredBooking = BookingPayload & {
  id: string;
  createdAt: string;
};

function isValidDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  // simple, pragmatic email check
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

async function readBookingsFile(filePath: string): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

async function writeBookingsFile(filePath: string, bookings: StoredBooking[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(bookings, null, 2), "utf8");
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "bookings.json");
  const bookings = await readBookingsFile(filePath);
  return Response.json({ ok: true, bookings });
}

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "data", "bookings.json");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Backward compatible: accept either {adultCount, childrenCount} or {guestCount}.
  const b = body as Partial<
    BookingPayload & { guestCount: number } & { adultCount: number; childrenCount: number }
  >;

  const hasSplitCounts =
    typeof b.adultCount !== "undefined" || typeof b.childrenCount !== "undefined";

  const adultCount = hasSplitCounts
    ? b.adultCount
    : typeof b.guestCount === "number"
      ? b.guestCount
      : undefined;
  const childrenCount = hasSplitCounts ? b.childrenCount : 0;
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

  if (b.startDate > b.endDate) {
    return Response.json(
      { ok: false, error: "Start date must be before end date" },
      { status: 400 }
    );
  }

  const booking: StoredBooking = {
    packageId: b.packageId,
    packageTitle: b.packageTitle,
    travelerName: b.travelerName.trim(),
    email: b.email.trim(),
    adultCount: adultCount,
    childrenCount: childrenCount,
    guestCount: guestCount,
    pricing: b.pricing?.currency === "USD" ? b.pricing : undefined,
    startDate: b.startDate,
    endDate: b.endDate,
    pickupLocation: b.pickupLocation.trim(),
    notes: typeof b.notes === "string" ? b.notes.trim() : undefined,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const bookings = await readBookingsFile(filePath);
  bookings.unshift(booking);
  await writeBookingsFile(filePath, bookings);

  return Response.json({ ok: true, bookingId: booking.id });
}

