import DOMPurify from "dompurify";
import { marked } from "marked";

// Links to other sites open in a new tab. Runs on every sanitize; registered once.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName !== "A") return;
  const href = node.getAttribute("href") ?? "";
  if (/^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?bharatxgroup\.com(\/|$)/i.test(href)) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  } else {
    node.removeAttribute("target");
  }
});

const sanitize = (html: string) => DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });

/** Markdown → safe HTML. */
export function renderMarkdown(md: string): string {
  return sanitize(marked.parse(md ?? "", { async: false, gfm: true, breaks: false }) as string);
}

/** Articles written in the visual editor are HTML; older ones are Markdown. */
export const isHtmlBody = (body: string) => /^\s*</.test(body ?? "");

/** A blog post body (HTML or Markdown) → safe HTML for the post page. */
export function renderPostBody(body: string): string {
  return isHtmlBody(body) ? sanitize(body) : renderMarkdown(body);
}
