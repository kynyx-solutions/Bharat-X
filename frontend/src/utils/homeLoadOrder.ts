/*
 * Home page load order (performance only: nothing on screen changes).
 *
 * On a direct visit to "/", the first hero slide is the page's largest image (its LCP). Until the browser has painted
 * it, work that would compete with it for the network waits: the home sections below the first screen, the other hero
 * slides and the background download of the other pages. All of it is released the moment that paint happens (or on
 * the first tap, scroll or key press, or after 5 seconds at most), so it still arrives well before anyone reaches it.
 * Any other first page, and links to a section of the home page ("/#..."), are not held back at all.
 */

// Keep in sync with the first slide in components/home/HomeHeroSection.tsx (and the preload in index.html)
const FIRST_SLIDE = "/assets/slides/hero-ai-first.webp";
const INPUT_EVENTS = ["pointerdown", "touchstart", "wheel", "keydown"] as const;

let open = window.location.pathname !== "/" || window.location.hash !== "";
const waiting: Array<() => void> = [];

function release() {
  if (open) return;
  open = true;
  INPUT_EVENTS.forEach((type) => window.removeEventListener(type, release));
  waiting.splice(0).forEach((resolve) => resolve());
}

/** True once nothing is being held back (always true unless the visit started on "/"). */
export const isHomeLoadReleased = () => open;

/** Resolves once the first hero slide has been painted (immediately if nothing is being held back). */
export const afterFirstSlidePaint = (): Promise<void> =>
  open ? Promise.resolve() : new Promise((resolve) => waiting.push(resolve));

if (!open) {
  try {
    const observer = new PerformanceObserver((list) => {
      const painted = list.getEntries().some((entry) => (entry as PerformanceEntry & { url?: string }).url?.endsWith(FIRST_SLIDE));
      if (painted) {
        observer.disconnect();
        release();
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    /* no LCP API (e.g. Safari): the fallbacks below release it */
  }
  INPUT_EVENTS.forEach((type) => window.addEventListener(type, release, { once: true, passive: true }));
  window.setTimeout(release, 5000);
}
