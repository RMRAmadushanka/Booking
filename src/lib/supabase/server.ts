import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Server-only Supabase client (use in API routes / server components).
 * Uses service_role key so it bypasses RLS.
 * Returns null if env vars are missing (e.g. during build).
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local or Vercel."
    );
  }
  _client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return _client;
}
