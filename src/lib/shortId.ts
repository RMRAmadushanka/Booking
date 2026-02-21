import { randomBytes } from "crypto";

const ALPHANUM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0,O,1,I to avoid confusion

/**
 * Generate a short unique ID for display (e.g. BK-7x2Kp9, VR-M3nQ8r).
 * Collision risk is negligible for 6 chars (~2B combinations).
 */
export function generateShortId(prefix: "BK" | "VR"): string {
  const bytes = randomBytes(6);
  let s = "";
  for (let i = 0; i < 6; i++) s += ALPHANUM[bytes[i]! % ALPHANUM.length];
  return `${prefix}-${s}`;
}
