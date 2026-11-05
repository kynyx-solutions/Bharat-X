import { createClient, type Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import { supabaseConfig, supabaseConfigured } from "../services/supabase";

/**
 * Supabase client for the admin dashboard only. Security is enforced by the database rules in
 * supabase/schema.sql; the dashboard only decides what to show.
 */
export const db = supabaseConfigured ? createClient(supabaseConfig.url, supabaseConfig.anonKey) : null;

/** db is only null when Supabase isn't configured, and AdminApp shows a setup screen then. */
export const sb = () => db!;

export const ADMIN_BASE = "/admin";
export const adminUrl = (path = "") => `${window.location.origin}${ADMIN_BASE}${path}`;

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: "owner" | "staff";
  created_at: string;
}

export interface AdminCtx {
  session: Session;
  profile: Profile;
  isOwner: boolean;
  refreshProfile: () => Promise<void>;
}

export const AdminContext = createContext<AdminCtx | null>(null);
export const useAdmin = () => useContext(AdminContext)!;

export const MEDIA_BUCKET = "media";

/** Public URL of a file in the media bucket → its storage path (for deleting), or null for built-in images. */
export function mediaPath(url: string | undefined | null): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
}
