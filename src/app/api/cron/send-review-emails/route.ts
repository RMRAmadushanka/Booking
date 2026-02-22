import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendReviewRequestEmail } from "@/lib/email";
import { generateReviewToken } from "@/lib/shortId";
import { NextResponse } from "next/server";

function getBaseUrl(): string {
  const site = process.env.SITE_URL?.trim();
  if (site) return site.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

function checkCronAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  const auth = req.headers.get("authorization");
  const provided =
    auth?.startsWith("Bearer ") ? auth.slice(7) : req.headers.get("x-cron-secret") ?? "";
  return provided === secret;
}

async function runSendReviewEmails() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const baseUrl = getBaseUrl();
  const supabase = getSupabaseAdmin();
  let sent = 0;
  let errors = 0;

  // Bookings: end_date < today, review_email_sent_at is null
  const { data: bookings, error: bookErr } = await supabase
    .from("bookings")
    .select("id, package_title, traveler_name, email, review_token")
    .lt("end_date", today)
    .is("review_email_sent_at", null);

  if (bookErr) {
    console.error("[cron send-review-emails] bookings", bookErr);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }

  for (const b of bookings ?? []) {
    let token = (b as { review_token?: string | null }).review_token;
    if (!token) {
      token = generateReviewToken();
      const { error: up } = await supabase
        .from("bookings")
        .update({ review_token: token })
        .eq("id", b.id);
      if (up) {
        console.error("[cron] update booking review_token", up);
        errors++;
        continue;
      }
    }

    const link = `${baseUrl}/review?type=booking&token=${encodeURIComponent(token)}`;
    const ok = await sendReviewRequestEmail({
      type: "booking",
      travelerName: (b as { traveler_name: string }).traveler_name,
      email: (b as { email: string }).email,
      reviewLink: link,
      title: (b as { package_title: string }).package_title,
    });
    if (ok) {
      await supabase
        .from("bookings")
        .update({ review_email_sent_at: new Date().toISOString() })
        .eq("id", b.id);
      sent++;
    } else {
      errors++;
    }
  }

  // Vehicle rentals: same
  const { data: rentals, error: rentErr } = await supabase
    .from("vehicle_rentals")
    .select("id, vehicle_title, traveler_name, email, review_token")
    .lt("end_date", today)
    .is("review_email_sent_at", null);

  if (rentErr) {
    console.error("[cron send-review-emails] vehicle_rentals", rentErr);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }

  for (const r of rentals ?? []) {
    let token = (r as { review_token?: string | null }).review_token;
    if (!token) {
      token = generateReviewToken();
      const { error: up } = await supabase
        .from("vehicle_rentals")
        .update({ review_token: token })
        .eq("id", r.id);
      if (up) {
        console.error("[cron] update rental review_token", up);
        errors++;
        continue;
      }
    }

    const link = `${baseUrl}/review?type=rental&token=${encodeURIComponent(token)}`;
    const ok = await sendReviewRequestEmail({
      type: "rental",
      travelerName: (r as { traveler_name: string }).traveler_name,
      email: (r as { email: string }).email,
      reviewLink: link,
      title: (r as { vehicle_title: string }).vehicle_title,
    });
    if (ok) {
      await supabase
        .from("vehicle_rentals")
        .update({ review_email_sent_at: new Date().toISOString() })
        .eq("id", r.id);
      sent++;
    } else {
      errors++;
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    errors,
    message: `Sent ${sent} review email(s), ${errors} error(s).`,
  });
}

/**
 * GET/POST /api/cron/send-review-emails
 * Call daily (e.g. Vercel Cron) to send "Leave your review" emails for
 * bookings and vehicle_rentals where end_date has passed and we haven't sent yet.
 * Secured by CRON_SECRET (Vercel sends it as Bearer token when CRON_SECRET is set).
 */
export async function GET(req: Request) {
  if (!checkCronAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return runSendReviewEmails();
}

export async function POST(req: Request) {
  if (!checkCronAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return runSendReviewEmails();
}
