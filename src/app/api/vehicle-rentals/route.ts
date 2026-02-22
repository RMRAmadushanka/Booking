import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendVehicleRentalEmails } from "@/lib/email";
import { generateShortId } from "@/lib/shortId";

type RentalPayload = {
  vehicleId: string;
  vehicleTitle: string;
  travelerName: string;
  email: string;
  country?: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  notes?: string;
  pricePerDay: number;
  totalPrice: number;
  numberOfDays: number;
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

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Partial<RentalPayload>;

  if (
    !isNonEmptyString(b.vehicleId) ||
    !isNonEmptyString(b.vehicleTitle) ||
    !isNonEmptyString(b.travelerName) ||
    !isValidEmail(b.email) ||
    !isNonEmptyString(b.country) ||
    !isValidDateString(b.startDate) ||
    !isValidDateString(b.endDate) ||
    !isNonEmptyString(b.pickupLocation) ||
    !isPositiveNumber(b.pricePerDay) ||
    !isPositiveNumber(b.totalPrice) ||
    !isPositiveNumber(b.numberOfDays)
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

  const shortId = generateShortId("VR");
  const row = {
    vehicle_id: b.vehicleId,
    vehicle_title: b.vehicleTitle,
    traveler_name: b.travelerName.trim(),
    email: b.email.trim(),
    country: b.country!.trim(),
    start_date: b.startDate,
    end_date: b.endDate,
    pickup_location: b.pickupLocation.trim(),
    notes: typeof b.notes === "string" && b.notes.trim() ? b.notes.trim() : null,
    price_per_day: b.pricePerDay,
    total_price: b.totalPrice,
    number_of_days: b.numberOfDays,
    short_id: shortId,
  };

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("vehicle_rentals")
      .insert(row)
      .select("id, short_id")
      .single();

    if (error) {
      console.error("[vehicle-rentals POST]", error);
      const message =
        error.message?.includes("does not exist") || error.message?.includes("relation")
          ? "Vehicle rentals table is missing. Run supabase/vehicle-rentals-table.sql in the Supabase SQL Editor."
          : error.message?.includes("short_id")
            ? "Table missing short_id column. Run supabase/add-short-ids.sql in the Supabase SQL Editor."
            : "Failed to save rental request.";
      return Response.json(
        { ok: false, error: message, detail: error.message },
        { status: 500 }
      );
    }

    const res = data as { id: string; short_id?: string | null };
    const rentalId = res.short_id ?? res.id;

    const emailPayload = {
      rentalId,
      vehicleTitle: b.vehicleTitle!,
      travelerName: b.travelerName!.trim(),
      email: b.email!.trim(),
      country: b.country!.trim(),
      startDate: b.startDate!,
      endDate: b.endDate!,
      pickupLocation: b.pickupLocation!.trim(),
      notes: typeof b.notes === "string" && b.notes.trim() ? b.notes.trim() : undefined,
      pricePerDay: b.pricePerDay!,
      totalPrice: b.totalPrice!,
      numberOfDays: b.numberOfDays!,
    };
    const emailResult = await sendVehicleRentalEmails(emailPayload);
    const emailConfigured = emailResult !== null;

    return Response.json({
      ok: true,
      rentalId,
      emailSent: emailResult?.userSent ?? false,
      emailConfigured,
    });
  } catch (err) {
    console.error("[vehicle-rentals POST]", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
