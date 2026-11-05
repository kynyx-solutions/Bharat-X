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
  });
}

/**
 * Sends a contact enquiry to both places that can take it:
 * - the admin dashboard (Supabase `leads` table), when Supabase is configured;
 * - the Express backend (/api/contact), which stores it in MongoDB and emails the team.
 * It succeeds when at least one of them accepted it, so the form keeps working if one is down.
 */
export async function submitInquiry(
  payload: ContactPayload & { interest: string; plainMessage: string },
): Promise<void> {
  const { interest, plainMessage, ...contact } = payload;
  const [saved, sent] = await Promise.allSettled([
    restInsert("leads", {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      organization: contact.organization || null,
      website: contact.website || null,
      interest,
      message: plainMessage,
      source_page: typeof window !== "undefined" ? window.location.pathname : null,
    }),
    submitContact(contact),
  ]);
  if (saved.status === "fulfilled" && saved.value) return;
  if (sent.status === "fulfilled") return;
  throw sent.reason instanceof Error ? sent.reason : new ApiError(0, "Something went wrong. Please try again.");
}

export function getHealth(): Promise<{ ok: boolean; db: string }> {
  return request("/api/health");
}

