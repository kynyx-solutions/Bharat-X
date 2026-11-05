import DOMPurify from "dompurify";
import { marked } from "marked";

/** Markdown → safe HTML for blog posts (used by the post page and the dashboard's preview). */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md ?? "", { async: false, gfm: true, breaks: false }) as string;
  const clean = DOMPurify.sanitize(html, { ADD_ATTR: ["target", "rel"] });
  // Links to other sites open in a new tab
  return clean.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}
