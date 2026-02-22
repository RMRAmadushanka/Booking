import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendCustomTripEmails } from "@/lib/email";
import { generateShortId } from "@/lib/shortId";

type CustomTripPayload = {
  name: string;
  email: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
  adults: number;
  children: number;
  dayPlan: string[];
  travelPlanNotes?: string;
  notes?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isNonNegativeInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isPositiveInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Partial<CustomTripPayload>;

  if (
    !isNonEmptyString(b.name) ||
    !isValidEmail(b.email) ||
    !isPositiveInt(b.adults) ||
    !isNonNegativeInt(b.children)
  ) {
    return Response.json(
      { ok: false, error: "Missing or invalid required fields (name, email, adults)" },
      { status: 400 }
    );
  }

  const startDate = b.startDate != null && isValidDateString(b.startDate) ? b.startDate : null;
  const endDate = b.endDate != null && isValidDateString(b.endDate) ? b.endDate : null;
  if (startDate && endDate && startDate > endDate) {
    return Response.json(
      { ok: false, error: "Start date must be before end date" },
      { status: 400 }
    );
  }

  const dayPlan = Array.isArray(b.dayPlan)
    ? (b.dayPlan as unknown[]).filter((x): x is string => typeof x === "string")
    : [];

  const shortId = generateShortId("CT");
  const row = {
    short_id: shortId,
    name: b.name!.trim(),
    email: b.email!.trim(),
    phone: typeof b.phone === "string" && b.phone.trim() ? b.phone.trim() : null,
    start_date: startDate,
    end_date: endDate,
    adults: b.adults!,
    children: b.children ?? 0,
    day_plan: dayPlan,
    travel_plan_notes: typeof b.travelPlanNotes === "string" && b.travelPlanNotes.trim() ? b.travelPlanNotes.trim() : null,
    notes: typeof b.notes === "string" && b.notes.trim() ? b.notes.trim() : null,
  };

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("custom_trip_requests")
      .insert(row)
      .select("id, short_id")
      .single();

    if (error) {
      console.error("[custom-trip-requests POST]", error);
      return Response.json(
        { ok: false, error: "Failed to save request" },
        { status: 500 }
      );
    }

    const res = data as { id: string; short_id?: string | null };
    const requestId = res.short_id ?? res.id;

    const dayPlanSummary =
      dayPlan.length > 0
        ? dayPlan.map((loc, i) => (loc ? `Day ${i + 1}: ${loc}` : `Day ${i + 1}: —`)).join("; ")
        : undefined;

    const emailPayload = {
      requestId,
      name: b.name!.trim(),
      email: b.email!.trim(),
      phone: row.phone ?? undefined,
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
      adultCount: b.adults!,
      childrenCount: b.children ?? 0,
      dayPlanSummary,
      travelPlanNotes: row.travel_plan_notes ?? undefined,
      notes: row.notes ?? undefined,
    };
    const emailResult = await sendCustomTripEmails(emailPayload);
    const emailConfigured = emailResult !== null;

    return Response.json({
      ok: true,
      requestId,
      emailSent: emailResult?.userSent ?? false,
      emailConfigured,
    });
  } catch (err) {
    console.error("[custom-trip-requests POST]", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
