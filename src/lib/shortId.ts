import { randomBytes } from "crypto";

const ALPHANUM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0,O,1,I to avoid confusion

/**
 * Generate a short unique ID for display (e.g. BK-7x2Kp9, VR-M3nQ8r, CT-4nP2qR).
 * Collision risk is negligible for 6 chars (~2B combinations).
 */
export function generateShortId(prefix: "BK" | "VR" | "CT"): string {
  const bytes = randomBytes(6);
  let s = "";
  for (let i = 0; i < 6; i++) s += ALPHANUM[bytes[i]! % ALPHANUM.length];
  return `${prefix}-${s}`;
}

/**
 * Generate a secure token for review links (e.g. 32 bytes = 64 hex chars).
 * Used so the review form URL does not expose booking/rental UUIDs.
 */
export function generateReviewToken(): string {
  return randomBytes(32).toString("hex");
}
