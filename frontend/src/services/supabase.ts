/**
 * Public-site access to Supabase (site content, published posts, enquiry submission).
 *
 * This talks to Supabase's REST API with plain fetch, so visitors never download the Supabase client library;
 * only the admin dashboard (src/admin) loads it. When the two env variables are missing, every call returns
 * null / false and the site runs from its built-in content, exactly as before.
 */
// VITE_* names, or the NEXT_PUBLIC_* names that Vercel's Supabase integration adds (see envPrefix in vite.config.ts).
const env = import.meta.env as Record<string, string | undefined>;
const URL_ = (env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/+$/, "");
const ANON_KEY = (env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "").trim();

export const supabaseConfig = { url: URL_, anonKey: ANON_KEY };
export const supabaseConfigured = Boolean(URL_ && ANON_KEY);

const headers = () => ({ apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` });

/** GET /rest/v1/<path>. Returns null when Supabase isn't configured or the request fails. */
export async function restGet<T>(path: string, signal?: AbortSignal): Promise<T | null> {
  if (!supabaseConfigured) return null;
  try {
    const res = await fetch(`${URL_}/rest/v1/${path}`, { headers: headers(), signal });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** POST a row to a table. Returns true when it was stored. */
export async function restInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
  if (!supabaseConfigured) return false;
  try {
    const res = await fetch(`${URL_}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}
