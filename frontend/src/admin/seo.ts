/**
 * Yoast-style SEO and readability analysis for a blog post, run live in the editor.
 * Pure function over the post's fields and its HTML body; uses the browser's DOMParser.
 */

export type CheckStatus = "good" | "ok" | "bad";

export interface SeoCheck {
  id: string;
  group: "seo" | "readability";
  status: CheckStatus;
  text: string;
}

export interface SeoInput {
  title: string;
  seoTitle: string;
  description: string; // the meta description actually used (SEO description, else the summary)
  descriptionIsFallback: boolean;
  slug: string;
  keyword: string;
  html: string;
  coverImage: string | null;
}

export interface SeoResult {
  score: number; // 0-100, SEO checks
  readability: number; // 0-100, readability checks
  checks: SeoCheck[];
  words: number;
  fullTitle: string;
}

/** The page title as the site renders it (see InsightPostPage). */
export const TITLE_SUFFIX = " | BharatX Group";
export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 160;

const norm = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();

const wordsOf = (s: string) => norm(s).split(" ").filter(Boolean);

/** Whole-phrase occurrences of `kw` in `text` (both normalised). */
function countPhrase(text: string, kw: string): number {
  if (!kw) return 0;
  const t = ` ${norm(text)} `;
  const k = ` ${norm(kw)} `;
  let n = 0;
  for (let i = t.indexOf(k); i !== -1; i = t.indexOf(k, i + k.length - 1)) n++;
  return n;
}
const has = (text: string, kw: string) => countPhrase(text, kw) > 0;

const isInternal = (href: string) => href.startsWith("/") || /^https?:\/\/(www\.)?bharatxgroup\.com/i.test(href);

export function analyzeSeo(p: SeoInput): SeoResult {
  const doc = new DOMParser().parseFromString(`<!doctype html><html><head></head><body>${p.html || ""}</body></html>`, "text/html");
  const body = doc.body;
  const text = (body.textContent ?? "").replace(/\s+/g, " ").trim();
  const words = wordsOf(text).length;
  const paragraphs = [...body.querySelectorAll("p, li")].map((el) => (el.textContent ?? "").trim()).filter(Boolean);
  const firstPara = [...body.querySelectorAll("p")].map((el) => el.textContent ?? "").find((t) => t.trim()) ?? "";
  const subheads = [...body.querySelectorAll("h2, h3, h4")].map((h) => h.textContent ?? "");
  const h1s = body.querySelectorAll("h1").length;
  const imgs = [...body.querySelectorAll("img")];
  const links = [...body.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") ?? "");
  const internal = links.filter(isInternal).length;
  const external = links.length - internal;

  const kw = p.keyword.trim();
  const kwWords = wordsOf(kw).length;
  const shownTitle = p.seoTitle.trim() || p.title.trim();
  const fullTitle = `${shownTitle}${TITLE_SUFFIX}`;
  const desc = p.description.trim();
  const checks: SeoCheck[] = [];
  const add = (group: SeoCheck["group"], id: string, status: CheckStatus, t: string) => checks.push({ id, group, status, text: t });

  // ---------- SEO ----------
  if (!kw) {
    add("seo", "kw", "bad", "Set a focus keyphrase: the search words this article should rank for. Most checks below use it.");
  } else {
    add("seo", "kw", "good", `Focus keyphrase: “${kw}”.`);

    const inTitle = has(shownTitle, kw);
    const atStart = inTitle && norm(shownTitle).startsWith(norm(kw));
    add("seo", "kw-title", inTitle ? "good" : "bad",
      inTitle ? (atStart ? "Keyphrase is at the start of the SEO title. Great." : "Keyphrase is in the SEO title. Moving it nearer the start helps a little.")
        : "Put the keyphrase in the SEO title (or the article title).");

    add("seo", "kw-desc", has(desc, kw) ? "good" : "bad",
      has(desc, kw) ? "Keyphrase appears in the meta description." : "Use the keyphrase in the meta description.");

    const slugKw = norm(kw).replace(/\s+/g, "-");
    const slugHit = p.slug.includes(slugKw) || wordsOf(kw).every((w) => p.slug.split("-").includes(w));
    add("seo", "kw-slug", slugHit ? "good" : "ok", slugHit ? "Keyphrase is in the web address." : "Add the keyphrase to the web address (slug).");

    add("seo", "kw-intro", has(firstPara, kw) ? "good" : "bad",
      has(firstPara, kw) ? "Keyphrase appears in the first paragraph." : "Use the keyphrase in the first paragraph, so readers and Google know the topic straight away.");

    const hits = countPhrase(text, kw);
    const density = words ? ((hits * Math.max(kwWords, 1)) / words) * 100 : 0;
    const d = density.toFixed(1);
    if (words < 100) add("seo", "kw-density", "ok", `Keyphrase used ${hits}×. Write more text to judge keyphrase density.`);
    else if (density < 0.5) add("seo", "kw-density", hits ? "ok" : "bad", `Keyphrase used ${hits}× (${d}%). Aim for 0.5–3%: use it a few more times, naturally.`);
    else if (density > 3) add("seo", "kw-density", "bad", `Keyphrase used ${hits}× (${d}%). That's over 3%, which reads as stuffing. Use it less or use synonyms.`);
    else add("seo", "kw-density", "good", `Keyphrase used ${hits}× (${d}%). Good density.`);

    if (subheads.length) {
      const n = subheads.filter((h) => has(h, kw)).length;
      add("seo", "kw-subheads", n ? "good" : "ok", n ? `Keyphrase is in ${n} subheading${n > 1 ? "s" : ""}.` : "Use the keyphrase (or a close variant) in at least one subheading.");
    }

    if (imgs.length) {
      const n = imgs.filter((i) => has(i.getAttribute("alt") ?? "", kw)).length;
      add("seo", "kw-alt", n ? "good" : "ok", n ? "Keyphrase is in an image's alt text." : "Use the keyphrase in at least one image's alt text.");
    }
  }

  const tl = fullTitle.length;
  if (!shownTitle) add("seo", "title-len", "bad", "Add a title.");
  else if (tl > TITLE_MAX) add("seo", "title-len", "bad", `Page title is ${tl} characters; Google cuts it off after about ${TITLE_MAX}. Shorten the SEO title.`);
  else if (tl < 35) add("seo", "title-len", "ok", `Page title is only ${tl} characters. A slightly longer, descriptive SEO title can earn more clicks.`);
  else add("seo", "title-len", "good", `Page title length is good (${tl} characters).`);

  const dl = desc.length;
  if (!dl) add("seo", "desc-len", "bad", "Write a meta description (or a summary): the text Google shows under the title.");
  else if (dl > DESC_MAX) add("seo", "desc-len", "ok", `Meta description is ${dl} characters; Google shows about ${DESC_MAX}. Shorten it.`);
  else if (dl < DESC_MIN) add("seo", "desc-len", "ok", `Meta description is ${dl} characters. Aim for ${DESC_MIN}–${DESC_MAX} to use the space.`);
  else add("seo", "desc-len", "good", `Meta description length is good (${dl} characters).${p.descriptionIsFallback ? " (Taken from the summary.)" : ""}`);

  if (words < 300) add("seo", "length", "bad", `${words} words. Articles under 300 words rarely rank; aim for 600+.`);
  else if (words < 600) add("seo", "length", "ok", `${words} words. Good start; 600+ words usually ranks better.`);
  else add("seo", "length", "good", `${words} words. Good length.`);

  add("seo", "internal", internal ? "good" : "ok",
    internal ? `${internal} link${internal > 1 ? "s" : ""} to other BharatX pages.` : "Link to at least one other BharatX page (e.g. a business or another insight).");
  add("seo", "external", external ? "good" : "ok",
    external ? `${external} link${external > 1 ? "s" : ""} to other websites.` : "Link to a trustworthy outside source where it helps the reader.");

  add("seo", "cover", p.coverImage ? "good" : "bad",
    p.coverImage ? "Cover image is set (used on Insights and when shared)." : "Add a cover image: it shows on Insights and in WhatsApp/LinkedIn shares.");

  const noAlt = imgs.filter((i) => !(i.getAttribute("alt") ?? "").trim()).length;
  if (imgs.length) add("seo", "alt", noAlt ? "ok" : "good", noAlt ? `${noAlt} image${noAlt > 1 ? "s have" : " has"} no alt text. Click the image in the editor to add it.` : "All images have alt text.");

  if (h1s) add("seo", "h1", "bad", "The article body has a Heading 1. The title is already the H1: use Heading 2 and 3 inside the article.");

  // ---------- Readability ----------
  if (words >= 300) {
    add("readability", "subheads", subheads.length ? "good" : "bad",
      subheads.length ? `${subheads.length} subheading${subheads.length > 1 ? "s break" : " breaks"} up the text.` : "Break the text up with subheadings (Heading 2).");

    // Longest stretch of text without a subheading
    let run = 0;
    let longest = 0;
    for (const el of [...body.children]) {
      if (/^H[2-4]$/.test(el.tagName)) run = 0;
      else run += wordsOf(el.textContent ?? "").length;
      longest = Math.max(longest, run);
    }
    if (subheads.length) add("readability", "subhead-gap", longest > 300 ? "ok" : "good",
      longest > 300 ? `One section runs ${longest} words without a subheading. Add one around every 250–300 words.` : "Subheadings are well spread out.");
  }

  const sentences = text.split(/(?<=[.!?।])\s+/).map((s) => wordsOf(s).length).filter((n) => n > 0);
  if (sentences.length >= 5) {
    const long = sentences.filter((n) => n > 20).length / sentences.length;
    const pct = Math.round(long * 100);
    add("readability", "sentences", long <= 0.25 ? "good" : long <= 0.35 ? "ok" : "bad",
      long <= 0.25 ? `Sentences are easy to read (${pct}% are over 20 words).` : `${pct}% of sentences are over 20 words. Keep that under 25%: split long sentences.`);
  }

  const longParas = paragraphs.filter((t) => wordsOf(t).length > 150).length;
  if (paragraphs.length) add("readability", "paragraphs", longParas ? "ok" : "good",
    longParas ? `${longParas} paragraph${longParas > 1 ? "s are" : " is"} over 150 words. Shorter paragraphs read better on phones.` : "Paragraphs are a comfortable length.");

  if (words >= 150) {
    const lists = body.querySelectorAll("ul, ol").length;
    add("readability", "lists", lists ? "good" : "ok", lists ? "Uses lists, which are easy to scan." : "A bullet list can make key points easier to scan.");
  }

  const score = (g: SeoCheck["group"]) => {
    const list = checks.filter((c) => c.group === g);
    if (!list.length) return 0;
    const pts = list.reduce((s, c) => s + (c.status === "good" ? 1 : c.status === "ok" ? 0.5 : 0), 0);
    return Math.round((pts / list.length) * 100);
  };

  return { score: score("seo"), readability: score("readability"), checks, words, fullTitle };
}

export const scoreTone = (n: number) => (n >= 80 ? "good" : n >= 50 ? "ok" : "bad") as CheckStatus;
export const toneColor: Record<CheckStatus, string> = { good: "#16a34a", ok: "#f59e0b", bad: "#dc2626" };
export const toneLabel: Record<CheckStatus, string> = { good: "Good", ok: "Needs work", bad: "Poor" };
