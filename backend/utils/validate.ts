import type { ContactPayload } from "../types";

/** Minimal sanitisation: trim + strip angle brackets (Section 48). */
function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/</g, "‹").replace(/>/g, "›").trim().slice(0, max);
}

/**
 * Single-line fields (name, email, phone…) also lose line breaks and other control characters, so nothing can be
 * smuggled into the notification email's headers (the subject includes the name).
 */
function cleanLine(v: unknown, max: number): string {
  return clean(typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]+/g, " ") : v, max);
}

/** The message keeps its line breaks; other control characters are removed. */
function cleanText(v: unknown, max: number): string {
  return clean(typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") : v, max);
}

/** Messages stuffed with links are almost always spam; real inquiries rarely need more than a few. */
const MAX_LINKS_IN_MESSAGE = 5;
const LINK_RE = /(https?:\/\/|www\.)\S+/gi;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;
const URL_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}([^\s]*)$/i;

const INQUIRY_TYPES = new Set([
  "venture-building",
  "ai-automation",
  "infrastructure",
  "manufacturing",
  "agriculture",
  "export",
  "partnerships",
  "careers",
]);

const COMPANY_IDS = new Set([
  "ventures",
  "aixperts",
  "infratech",
  "casters",
  "bharatx-agro",
  "bharatx-labs",
]);

export interface ValidationIssue {
  field: string;
  message: string;
}

export function validateContact(body: Record<string, unknown>): {
  payload: ContactPayload;
  issues: ValidationIssue[];
} {
  const issues: ValidationIssue[] = [];
  const payload: ContactPayload = {
    name: cleanLine(body.name, 80),
    email: cleanLine(body.email, 120).toLowerCase(),
    phone: cleanLine(body.phone, 24),
    organization: cleanLine(body.organization, 120),
    website: cleanLine(body.website, 300),
    inquiryType: cleanLine(body.inquiryType, 80),
    company: cleanLine(body.company, 80),
    message: cleanText(body.message, 2000),
  };

  if (payload.name.length < 2) issues.push({ field: "name", message: "Please enter your full name." });
  if (!EMAIL_RE.test(payload.email)) issues.push({ field: "email", message: "Enter a valid email address." });
  if (payload.phone && !PHONE_RE.test(payload.phone))
    issues.push({ field: "phone", message: "Enter a valid phone number." });
  if (payload.website && !URL_RE.test(payload.website))
    issues.push({ field: "website", message: "Enter a valid website URL." });
  if (!payload.inquiryType || payload.inquiryType.trim().length < 2)
    issues.push({ field: "inquiryType", message: "Select a valid inquiry type." });
  if (payload.message.length < 5)
    issues.push({ field: "message", message: "Message is too short." });
  if ((payload.message.match(LINK_RE) ?? []).length > MAX_LINKS_IN_MESSAGE)
    issues.push({ field: "message", message: "Please include fewer links in your message." });

  return { payload, issues };
}
