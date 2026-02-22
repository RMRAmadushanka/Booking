import { Resend } from "resend";

export type BookingEmailPayload = {
  bookingId: string;
  packageTitle: string;
  travelerName: string;
  email: string;
  country?: string;
  adultCount: number;
  childrenCount: number;
  guestCount: number;
  estimatedTotalPrice?: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  notes?: string;
};

// Default: Resend sandbox. Only delivers to verified recipients (e.g. your admin email).
// To send to any customer email: verify your domain in Resend, then set RESEND_FROM_EMAIL e.g. "Hero Search <noreply@yourdomain.com>"
const DEFAULT_FROM = "Hero Search <onboarding@resend.dev>";

function getFromAddress(): string {
  const custom = process.env.RESEND_FROM_EMAIL?.trim();
  return custom || DEFAULT_FROM;
}

// Optional: full URL to your logo image (e.g. https://drimooria.com/logo.png). Used in email templates.
function getLogoUrl(): string | null {
  return process.env.EMAIL_LOGO_URL?.trim() || null;
}

const BRAND = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  accent: "#2DD4BF",
  dark: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  bgLight: "#F8FAFC",
};

function emailWrapper(content: string, title: string): string {
  const logoUrl = getLogoUrl();
  const logoBlock = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" alt="Drimooria" width="160" height="48" style="display:block;max-width:160px;height:auto;" />`
    : `<span style="font-size:24px;font-weight:700;color:${BRAND.primary};letter-spacing:-0.02em;">Drimooria</span>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.5;color:${BRAND.dark};background-color:#f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.primary} 0%,${BRAND.primaryDark} 100%);padding:32px 40px;text-align:center;">
              ${logoBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background-color:${BRAND.bgLight};border-top:1px solid ${BRAND.border};">
              <p style="margin:0;font-size:13px;color:${BRAND.muted};text-align:center;">
                © ${new Date().getFullYear()} Drimooria. All rights reserved.
              </p>
              <p style="margin:8px 0 0;font-size:13px;text-align:center;">
                <a href="https://drimooria.com" style="color:${BRAND.primary};text-decoration:none;font-weight:500;">drimooria.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailTableRows(rows: [string, string][]): string {
  return rows
    .map(
      (r, i) => `
    <tr>
      <td style="padding:12px 16px;${i % 2 === 1 ? `background-color:${BRAND.bgLight};` : ""}font-size:14px;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">${escapeHtml(r[0])}</td>
      <td style="padding:12px 16px;${i % 2 === 1 ? `background-color:${BRAND.bgLight};` : ""}font-size:14px;font-weight:600;color:${BRAND.dark};border-bottom:1px solid ${BRAND.border};text-align:right;">${escapeHtml(String(r[1]))}</td>
    </tr>`
    )
    .join("");
}

function userConfirmationHtml(p: BookingEmailPayload): string {
  const total = p.estimatedTotalPrice != null ? `$${Number(p.estimatedTotalPrice).toLocaleString()}` : "—";
  const rows: [string, string][] = [
    ["Booking ID", p.bookingId],
    ["Package", p.packageTitle],
    ["Travelers", `${p.adultCount} adult(s), ${p.childrenCount} child(ren) (${p.guestCount} total)`],
    ["Dates", `${p.startDate} to ${p.endDate}`],
    ["Country", p.country ?? "—"],
    ["Pickup", p.pickupLocation],
    ["Estimated total", total],
    ...(p.notes ? [["Notes", p.notes]] as [string, string][] : []),
  ];
  const tableRows = detailTableRows(rows);

  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      Booking confirmation
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${BRAND.muted};">
      Hi ${escapeHtml(p.travelerName)},
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.dark};">
      We've received your booking request. Our team will contact you shortly to confirm details and next steps.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
    <p style="margin:24px 0 0;font-size:15px;color:${BRAND.dark};">
      Thank you for choosing Drimooria.
    </p>
  `;
  return emailWrapper(content, `Booking confirmation – ${p.packageTitle}`);
}

function adminNotificationHtml(p: BookingEmailPayload): string {
  const total = p.estimatedTotalPrice != null ? `$${Number(p.estimatedTotalPrice).toLocaleString()}` : "—";
  const rows: [string, string][] = [
    ["Booking ID", p.bookingId],
    ["Package", p.packageTitle],
    ["Traveler", p.travelerName],
    ["Email", p.email],
    ["Country", p.country ?? "—"],
    ["Guests", `${p.adultCount} adult(s), ${p.childrenCount} child(ren)`],
    ["Dates", `${p.startDate} to ${p.endDate}`],
    ["Pickup", p.pickupLocation],
    ["Estimated total", total],
    ...(p.notes ? [["Notes", p.notes]] as [string, string][] : []),
  ];
  const tableRows = detailTableRows(rows);

  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      New booking request
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};">
      A new booking was submitted and needs follow-up.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
  `;
  return emailWrapper(content, `New booking: ${p.packageTitle}`);
}

// ---- Vehicle rental emails (same styled template + logo) ----

export type VehicleRentalEmailPayload = {
  rentalId: string;
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

function vehicleRentalUserConfirmationHtml(p: VehicleRentalEmailPayload): string {
  const rows: [string, string][] = [
    ["Rental ID", p.rentalId],
    ["Vehicle", p.vehicleTitle],
    ["Dates", `${p.startDate} to ${p.endDate}`],
    ["Country", p.country ?? "—"],
    ["Pickup", p.pickupLocation],
    ["Number of days", String(p.numberOfDays)],
    ["Price per day", `$${Number(p.pricePerDay).toLocaleString()}`],
    ["Total", `$${Number(p.totalPrice).toLocaleString()}`],
    ...(p.notes ? ([["Notes", p.notes]] as [string, string][]) : []),
  ];
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      Rental request confirmation
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${BRAND.muted};">
      Hi ${escapeHtml(p.travelerName)},
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.dark};">
      We've received your vehicle rental request. Our team will confirm availability and contact you shortly.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${detailTableRows(rows)}
    </table>
    <p style="margin:24px 0 0;font-size:15px;color:${BRAND.dark};">
      Thank you for choosing Drimooria.
    </p>
  `;
  return emailWrapper(content, `Rental confirmation – ${p.vehicleTitle}`);
}

function vehicleRentalAdminNotificationHtml(p: VehicleRentalEmailPayload): string {
  const rows: [string, string][] = [
    ["Rental ID", p.rentalId],
    ["Vehicle", p.vehicleTitle],
    ["Traveler", p.travelerName],
    ["Email", p.email],
    ["Country", p.country ?? "—"],
    ["Dates", `${p.startDate} to ${p.endDate}`],
    ["Pickup", p.pickupLocation],
    ["Number of days", String(p.numberOfDays)],
    ["Price per day", `$${Number(p.pricePerDay).toLocaleString()}`],
    ["Total", `$${Number(p.totalPrice).toLocaleString()}`],
    ...(p.notes ? ([["Notes", p.notes]] as [string, string][]) : []),
  ];
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      New vehicle rental request
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};">
      A new vehicle rental was submitted and needs follow-up.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${detailTableRows(rows)}
    </table>
  `;
  return emailWrapper(content, `New rental: ${p.vehicleTitle}`);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---- Review request email (sent after trip end_date) ----

export type ReviewRequestEmailPayload = {
  type: "booking" | "rental";
  travelerName: string;
  email: string;
  reviewLink: string;
  /** Package title (when type is booking) or vehicle title (when type is rental) */
  title: string;
};

function reviewRequestHtml(p: ReviewRequestEmailPayload): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      How was your ${p.type === "booking" ? "trip" : "rental"}?
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${BRAND.muted};">
      Hi ${escapeHtml(p.travelerName)},
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.dark};">
      Your ${p.type === "booking" ? "travel package" : "vehicle rental"} &ldquo;${escapeHtml(p.title)}&rdquo; has ended. We&rsquo;d love to hear your feedback—it helps us improve.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.dark};">
      <a href="${escapeHtml(p.reviewLink)}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,${BRAND.primary} 0%,${BRAND.primaryDark} 100%);color:#ffffff !important;text-decoration:none;font-weight:600;font-size:16px;border-radius:8px;">
        Leave your review
      </a>
    </p>
    <p style="margin:0;font-size:14px;color:${BRAND.muted};">
      If the button doesn&rsquo;t work, copy and paste this link into your browser:<br/>
      <a href="${escapeHtml(p.reviewLink)}" style="color:${BRAND.primary};word-break:break-all;">${escapeHtml(p.reviewLink)}</a>
    </p>
  `;
  return emailWrapper(content, `Share your feedback – ${p.title}`);
}

/**
 * Sends a single "Leave your review" email with a link to the review form.
 * Used by the cron job after trip/rental end_date.
 */
export async function sendReviewRequestEmail(
  payload: ReviewRequestEmailPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const resend = new Resend(apiKey);
  const from = getFromAddress();

  try {
    const { error } = await resend.emails.send({
      from,
      to: payload.email,
      subject: `How was your ${payload.type === "booking" ? "trip" : "rental"}? – ${payload.title}`,
      html: reviewRequestHtml(payload),
    });
    if (error) {
      console.error("[sendReviewRequestEmail]", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sendReviewRequestEmail]", err);
    return false;
  }
}

/**
 * Sends booking confirmation to the user and notification to the admin.
 * Uses Resend (free tier). No-op if RESEND_API_KEY or ADMIN_EMAIL is missing.
 * Returns { userSent, adminSent } or null if Resend not configured.
 */
export async function sendBookingEmails(
  payload: BookingEmailPayload
): Promise<{ userSent: boolean; adminSent: boolean } | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  if (!apiKey) {
    console.warn(
      "[sendBookingEmails] Skipped: RESEND_API_KEY is not set. Add it to .env.local and restart the dev server."
    );
    return null;
  }

  const resend = new Resend(apiKey);
  const results = { userSent: false, adminSent: false };
  const from = getFromAddress();
  const hasCustomFrom = Boolean(process.env.RESEND_FROM_EMAIL?.trim());

  if (!hasCustomFrom) {
    console.warn(
      "[sendBookingEmails] RESEND_FROM_EMAIL is not set. With Resend free tier, sending from onboarding@resend.dev only delivers to verified recipient addresses. Add RESEND_FROM_EMAIL to .env.local (use double quotes: RESEND_FROM_EMAIL=\"Hero Search <noreply@yourverifieddomain.com>\") and restart the server."
    );
  } else if (!from.includes("@")) {
    console.error(
      "[sendBookingEmails] RESEND_FROM_EMAIL is set but does not look like a valid email. Use double quotes in .env.local, e.g. RESEND_FROM_EMAIL=\"Hero Search <noreply@yourdomain.com>\""
    );
  }

  try {
    const [userResult, adminResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: payload.email,
        subject: `Booking confirmation – ${payload.packageTitle}`,
        html: userConfirmationHtml(payload),
      }),
      adminEmail
        ? resend.emails.send({
            from,
            to: adminEmail,
            subject: `New booking: ${payload.packageTitle} – ${payload.travelerName}`,
            html: adminNotificationHtml(payload),
          })
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (userResult.status === "fulfilled" && !userResult.value.error) {
      results.userSent = true;
    } else if (userResult.status === "rejected") {
      console.error("[sendBookingEmails] User email failed (rejected):", userResult.reason);
    } else if (userResult.status === "fulfilled" && userResult.value.error) {
      const err = userResult.value.error as { message?: string; name?: string };
      console.error(
        "[sendBookingEmails] User email not sent. From:",
        from,
        "| To:",
        payload.email,
        "| Resend error:",
        err?.message ?? JSON.stringify(err)
      );
    }

    if (adminEmail && adminResult.status === "fulfilled" && !(adminResult.value as { error?: unknown }).error) {
      results.adminSent = true;
    } else if (adminEmail && adminResult.status === "rejected") {
      console.error("[sendBookingEmails] Admin email failed (rejected):", adminResult.reason);
    } else if (adminEmail && adminResult.status === "fulfilled" && (adminResult.value as { error?: unknown }).error) {
      const err = (adminResult.value as { error?: { message?: string } }).error;
      console.error("[sendBookingEmails] Admin email error from Resend:", err?.message ?? err);
    }

    return results;
  } catch (err) {
    console.error("[sendBookingEmails]", err);
    return results;
  }
}

/**
 * Sends vehicle rental confirmation to the user and notification to the admin.
 * Uses same Resend config and styled template (logo, brand) as booking emails.
 * Returns { userSent, adminSent } or null if Resend not configured.
 */
export async function sendVehicleRentalEmails(
  payload: VehicleRentalEmailPayload
): Promise<{ userSent: boolean; adminSent: boolean } | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  if (!apiKey) {
    console.warn("[sendVehicleRentalEmails] Skipped: RESEND_API_KEY is not set.");
    return null;
  }

  const resend = new Resend(apiKey);
  const results = { userSent: false, adminSent: false };
  const from = getFromAddress();

  try {
    const [userResult, adminResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: payload.email,
        subject: `Rental request confirmation – ${payload.vehicleTitle}`,
        html: vehicleRentalUserConfirmationHtml(payload),
      }),
      adminEmail
        ? resend.emails.send({
            from,
            to: adminEmail,
            subject: `New vehicle rental: ${payload.vehicleTitle} – ${payload.travelerName}`,
            html: vehicleRentalAdminNotificationHtml(payload),
          })
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (userResult.status === "fulfilled" && !userResult.value.error) {
      results.userSent = true;
    } else if (userResult.status === "fulfilled" && userResult.value.error) {
      const err = userResult.value.error as { message?: string };
      console.error("[sendVehicleRentalEmails] User email not sent:", err?.message ?? err);
    }

    if (adminEmail && adminResult.status === "fulfilled" && !(adminResult.value as { error?: unknown }).error) {
      results.adminSent = true;
    }

    return results;
  } catch (err) {
    console.error("[sendVehicleRentalEmails]", err);
    return results;
  }
}

// ---- Custom trip request emails ----

export type CustomTripEmailPayload = {
  requestId: string;
  name: string;
  email: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
  adultCount: number;
  childrenCount: number;
  dayPlanSummary?: string;
  travelPlanNotes?: string;
  notes?: string;
};

function customTripUserConfirmationHtml(p: CustomTripEmailPayload): string {
  const rows: [string, string][] = [
    ["Request ID", p.requestId],
    ["Name", p.name],
    ["Email", p.email],
    ...(p.phone ? [["Phone", p.phone]] as [string, string][] : []),
    ...(p.startDate && p.endDate ? [["Dates", `${p.startDate} to ${p.endDate}`]] as [string, string][] : []),
    ["Travelers", `${p.adultCount} adult(s), ${p.childrenCount} child(ren)`],
    ...(p.dayPlanSummary ? [["Day plan", p.dayPlanSummary]] as [string, string][] : []),
    ...(p.travelPlanNotes ? [["Itinerary notes", p.travelPlanNotes]] as [string, string][] : []),
    ...(p.notes ? [["Additional notes", p.notes]] as [string, string][] : []),
  ];
  const tableRows = detailTableRows(rows);
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      Custom trip request received
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${BRAND.muted};">
      Hi ${escapeHtml(p.name)},
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.dark};">
      We've received your custom trip request. Our team will create a tailored package and get back to you shortly.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
    <p style="margin:24px 0 0;font-size:15px;color:${BRAND.dark};">
      Thank you for choosing Drimooria.
    </p>
  `;
  return emailWrapper(content, "Custom trip request received");
}

function customTripAdminNotificationHtml(p: CustomTripEmailPayload): string {
  const rows: [string, string][] = [
    ["Request ID", p.requestId],
    ["Name", p.name],
    ["Email", p.email],
    ...(p.phone ? [["Phone", p.phone]] as [string, string][] : []),
    ...(p.startDate && p.endDate ? [["Dates", `${p.startDate} to ${p.endDate}`]] as [string, string][] : []),
    ["Travelers", `${p.adultCount} adult(s), ${p.childrenCount} child(ren)`],
    ...(p.dayPlanSummary ? [["Day plan", p.dayPlanSummary]] as [string, string][] : []),
    ...(p.travelPlanNotes ? [["Itinerary notes", p.travelPlanNotes]] as [string, string][] : []),
    ...(p.notes ? [["Additional notes", p.notes]] as [string, string][] : []),
  ];
  const tableRows = detailTableRows(rows);
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.dark};">
      New custom trip request
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};">
      A new custom trip request was submitted and needs follow-up.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
  `;
  return emailWrapper(content, "New custom trip request");
}

export async function sendCustomTripEmails(
  payload: CustomTripEmailPayload
): Promise<{ userSent: boolean; adminSent: boolean } | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  if (!apiKey) {
    console.warn("[sendCustomTripEmails] Skipped: RESEND_API_KEY is not set.");
    return null;
  }

  const resend = new Resend(apiKey);
  const results = { userSent: false, adminSent: false };
  const from = getFromAddress();

  try {
    const [userResult, adminResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: payload.email,
        subject: "Custom trip request received",
        html: customTripUserConfirmationHtml(payload),
      }),
      adminEmail
        ? resend.emails.send({
            from,
            to: adminEmail,
            subject: `New custom trip request – ${payload.name}`,
            html: customTripAdminNotificationHtml(payload),
          })
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (userResult.status === "fulfilled" && !userResult.value.error) {
      results.userSent = true;
    } else if (userResult.status === "fulfilled" && userResult.value.error) {
      const err = userResult.value.error as { message?: string };
      console.error("[sendCustomTripEmails] User email not sent:", err?.message ?? err);
    }

    if (adminEmail && adminResult.status === "fulfilled" && !(adminResult.value as { error?: unknown }).error) {
      results.adminSent = true;
    }

    return results;
  } catch (err) {
    console.error("[sendCustomTripEmails]", err);
    return results;
  }
}
