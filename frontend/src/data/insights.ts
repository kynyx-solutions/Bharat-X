import { partnerships } from "./partnerships";

export type InsightCategory = "Partnerships" | "Perspectives" | "Stories";

export interface Insight {
  id: string;
  category: InsightCategory;
  title: string;
  summary: string;
  /** Display date, e.g. "18 Sep 2026". Leave out when it isn't confirmed. */
  date?: string;
  /** Square logo for partnership items, or a photo for articles. */
  logo?: string;
  image?: string;
  /** Where "Read more" goes: an in-site path or a full URL. The card shows no link when it is missing. */
  href?: string;
}

/** Category display order and accent colour. Categories with no items are hidden on the page. */
export const insightCategories: Record<InsightCategory, { accent: string }> = {
  Partnerships: { accent: "#163A7A" },
  Perspectives: { accent: "#F54900" },
  Stories: { accent: "#15966B" },
};

/**
 * Articles written by the team go here, newest first. Partnership announcements are added below
 * from data/partnerships.ts, so a new MoU shows up on this page without editing this file.
 */
const articles: Insight[] = [];

const partnershipUpdates: Insight[] = partnerships.map((p) => ({
  id: `partnership-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  category: "Partnerships",
  title: p.description,
  summary: `${p.type === "MoU" ? "A memorandum of understanding" : `A ${p.type.toLowerCase()}`} with ${p.name}${
    p.affiliation ? ` (${p.affiliation})` : ""
  }, part of how BharatX works with government, institutions and industry on AI adoption, skills and research.`,
  logo: p.logo,
  href: p.href ?? "/partnerships",
}));

export const insights: Insight[] = [...articles, ...partnershipUpdates];
