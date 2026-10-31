import { timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import { isDbReady } from "../config/db";
import { ContactInquiry } from "../models/ContactInquiry";
import { sendInquiryEmail } from "../services/mailer";
import { validateContact } from "../utils/validate";

const SUCCESS_MESSAGE = "Your inquiry has been received. Our team will review it and get back to you.";
/** The same email sending the same message again within this window is treated as a repeat (double-click or flood). */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

/** POST /api/contact */
export async function createContact(req: Request, res: Response) {
  const { payload, issues } = validateContact((req.body ?? {}) as Record<string, unknown>);
  if (issues.length > 0) {
    // Log only which fields failed: the body holds personal details (name, email, phone, message)
    console.warn("[contact] ⚠️ Validation failed:", issues.map((i) => i.field).join(", "));
    return res.status(400).json({ message: issues[0].message, issues });
  }

  try {
    // Repeat of a recent identical inquiry: answer as before, but don't store or email it again
    if (isDbReady()) {
      const repeat = await ContactInquiry.exists({
        email: payload.email,
        message: payload.message,
        createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      });
      if (repeat) {
        console.warn("[contact] ⚠️ Repeat inquiry ignored (same email and message within 10 minutes).");
        return res.status(201).json({ ok: true, message: SUCCESS_MESSAGE });
      }
    }

    if (isDbReady()) {
      const saved = await ContactInquiry.create(payload);
      console.log(`[contact] ✅ Saved inquiry to MongoDB Atlas | Collection: "${ContactInquiry.collection.name}" | ID: ${saved._id}`);
    } else {
      console.warn("[contact] ⚠️ MongoDB is not connected; inquiry processed without database persistence.");
    }

    // Notification email is fire-and-forget — never fails the request.
    void sendInquiryEmail(payload);

    return res.status(201).json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (err) {
    console.error("[contact] Failed to store inquiry:", err instanceof Error ? err.message : err);
    return res.status(500).json({
      message: "We couldn't save your inquiry. Please try again in a moment.",
    });
  }
}

/** True when the request carries `Authorization: Bearer <ADMIN_TOKEN>` (compared in constant time). */
function isAdmin(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  const header = req.get("authorization") ?? "";
  if (!token || !header.startsWith("Bearer ")) return false;
  const given = Buffer.from(header.slice(7));
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/**
 * GET /api/contact — inquiry count, for the team only. Needs `Authorization: Bearer <ADMIN_TOKEN>`; without it (or
 * when ADMIN_TOKEN isn't set) it answers 404, as if the route didn't exist.
 */
export async function countContact(req: Request, res: Response) {
  if (!isAdmin(req)) return res.status(404).json({ message: "This API route does not exist." });
  try {
    if (isDbReady()) {
      const count = await ContactInquiry.countDocuments();
      return res.json({ ok: true, count, source: "mongo" });
    }
    return res.json({ ok: true, count: 0, source: "disconnected" });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Database inquiry check failed" });
  }
}
