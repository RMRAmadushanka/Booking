import { getSupabaseAdmin } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

const VALID_TYPES = ["booking", "rental"] as const;

function getQuery(req: NextRequest): { type: string; token: string } {
  const u = new URL(req.url);
  return {
    type: u.searchParams.get("type") ?? "",
    token: u.searchParams.get("token") ?? "",
  };
}

/**
 * GET /api/review?type=booking|rental&token=xxx
 * Returns booking or rental details for the review form. 404 if invalid token or already reviewed.
 */
export async function GET(req: NextRequest) {
  const { type, token } = getQuery(req);
  if (!VALID_TYPES.includes(type as "booking" | "rental") || !token.trim()) {
    return Response.json({ ok: false, error: "Missing or invalid type/token" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const table = type === "booking" ? "bookings" : "vehicle_rentals";

  const { data: row, error } = await supabase
    .from(table)
    .select("*")
    .eq("review_token", token.trim())
    .maybeSingle();

  if (error) {
    console.error("[review GET]", error);
    return Response.json({ ok: false, error: "Failed to load details" }, { status: 500 });
  }
  if (!row) {
    return Response.json({ ok: false, error: "Invalid or expired link" }, { status: 404 });
  }

  const id = row.id as string;

  // Check if already reviewed
  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("type", type)
    .eq("reference_id", id)
    .maybeSingle();

  if (existing) {
    return Response.json(
      { ok: false, error: "You have already submitted a review for this trip." },
      { status: 409 }
    );
  }

  if (type === "booking") {
    const b = row as {
      id: string;
      package_id: string;
      package_title: string;
      traveler_name: string;
      start_date: string;
      end_date: string;
      short_id?: string | null;
    };
    return Response.json({
      ok: true,
      type: "booking",
      id: b.id,
      shortId: b.short_id ?? b.id,
      title: b.package_title,
      travelerName: b.traveler_name,
      startDate: b.start_date,
      endDate: b.end_date,
    });
  }

  const r = row as {
    id: string;
    vehicle_id: string;
    vehicle_title: string;
    traveler_name: string;
    start_date: string;
    end_date: string;
    short_id?: string | null;
  };
  return Response.json({
    ok: true,
    type: "rental",
    id: r.id,
    shortId: r.short_id ?? r.id,
    title: r.vehicle_title,
    travelerName: r.traveler_name,
    startDate: r.start_date,
    endDate: r.end_date,
  });
}

/**
 * POST /api/review
 * Body: { type: "booking"|"rental", token: string, rating: number, comment?: string }
 * Validates token, saves review, returns ok.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as { type?: string; token?: string; rating?: number; comment?: string };
  const type = b.type;
  const token = typeof b.token === "string" ? b.token.trim() : "";
  const rating = typeof b.rating === "number" ? b.rating : NaN;
  const comment = typeof b.comment === "string" ? b.comment.trim() : "";

  if (!VALID_TYPES.includes(type as "booking" | "rental") || !token) {
    return Response.json({ ok: false, error: "Missing or invalid type/token" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ ok: false, error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const table = type === "booking" ? "bookings" : "vehicle_rentals";

  const { data: row, error: findError } = await supabase
    .from(table)
    .select("id")
    .eq("review_token", token)
    .maybeSingle();

  if (findError || !row) {
    return Response.json(
      { ok: false, error: "Invalid or expired link" },
      { status: 404 }
    );
  }

  const referenceId = row.id as string;

  // Idempotent: if review exists, return success (avoid duplicate on double submit)
  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("type", type)
    .eq("reference_id", referenceId)
    .maybeSingle();

  if (existing) {
    return Response.json({ ok: true, message: "Review already submitted." });
  }

  const { error: insertError } = await supabase.from("reviews").insert({
    type,
    reference_id: referenceId,
    rating,
    comment: comment || null,
  });

  if (insertError) {
    console.error("[review POST]", insertError);
    return Response.json({ ok: false, error: "Failed to save review" }, { status: 500 });
  }

  return Response.json({ ok: true, message: "Thank you for your feedback!" });
}
