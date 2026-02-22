import { getSupabaseAdmin } from "@/lib/supabase/server";
import { generateReviewToken } from "@/lib/shortId";
import { NextRequest } from "next/server";

/**
 * GET /api/review/test-link?type=booking|rental&shortId=BK-xxx|VR-xxx
 * Dev only: returns a review link for the given booking/rental so you can test the form
 * without waiting for the cron email. In production returns 404.
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, error: "Not available in production" }, { status: 404 });
  }

  const u = new URL(req.url);
  const type = u.searchParams.get("type") ?? "";
  const shortId = u.searchParams.get("shortId") ?? "";

  if ((type !== "booking" && type !== "rental") || !shortId.trim()) {
    return Response.json(
      { ok: false, error: "Use: /api/review/test-link?type=booking&shortId=BK-xxxxx or type=rental&shortId=VR-xxxxx" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const table = type === "booking" ? "bookings" : "vehicle_rentals";

  const { data: row, error } = await supabase
    .from(table)
    .select("id, review_token")
    .eq("short_id", shortId.trim())
    .maybeSingle();

  if (error || !row) {
    return Response.json(
      { ok: false, error: `${type} with short_id "${shortId}" not found` },
      { status: 404 }
    );
  }

  let token = (row as { review_token?: string | null }).review_token;
  if (!token) {
    token = generateReviewToken();
    await supabase.from(table).update({ review_token: token }).eq("id", row.id);
  }

  const baseUrl = process.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const reviewLink = `${baseUrl}/review?type=${type}&token=${encodeURIComponent(token)}`;

  return Response.json({
    ok: true,
    reviewLink,
    message: "Open this link in your browser to test the review form.",
  });
}
