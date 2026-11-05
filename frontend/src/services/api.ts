import type { ContactPayload } from "../types";
import { restInsert } from "./supabase";

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Network error — please check your connection and try again.");
  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export function submitContact(payload: ContactPayload): Promise<{ ok: boolean; message: string }> {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    // Keep sending even if the visitor leaves the page right after the thank-you message
    keepalive: true,
  });
}

/**
 * Sends a contact enquiry to both places that can take it:
 * - the admin dashboard (Supabase `leads` table), when Supabase is configured;
 * - the Express backend (/api/contact), which stores it in MongoDB and emails the team.
 * It succeeds when at least one of them accepted it, so the form keeps working if one is down.
 *
 * Supabase answers in well under a second, while the backend (Render free tier) can take 30-60 s to wake up. So once
 * the dashboard has saved the enquiry we return straight away and let the backend request (the email) finish in the
 * background. Only when Supabase is unavailable do we wait for the backend.
 */
export async function submitInquiry(
  payload: ContactPayload & { interest: string; plainMessage: string },
): Promise<void> {
  const { interest, plainMessage, ...contact } = payload;
  const sent = submitContact(contact);
  sent.catch(() => {}); // handled below if it matters; avoids an unhandled rejection when Supabase already succeeded
  const saved = await restInsert("leads", {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      organization: contact.organization || null,
      website: contact.website || null,
      interest,
      message: plainMessage,
      source_page: typeof window !== "undefined" ? window.location.pathname : null,
  });
  if (saved) return;
  await sent; // Supabase unavailable: the backend is the only copy, so wait for it (throws its error if it fails)
}

/** Wakes the backend (Render free tier sleeps when idle) so the enquiry email goes out quickly. Fire and forget. */
export function warmUpBackend(): void {
  if (!API_BASE) return;
  fetch(`${API_BASE}/api/health`).catch(() => {});
}

export function getHealth(): Promise<{ ok: boolean; db: string }> {
  return request("/api/health");
}

