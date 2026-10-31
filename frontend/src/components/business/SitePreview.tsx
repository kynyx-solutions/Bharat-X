import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { DuotoneIcon, Icon } from "../../utils/icons";

/**
 * View-only preview of a business website, in a browser-window frame.
 *
 * - `url` + embeddable: the live site in an iframe, rendered at a real viewport (1440×900 on wide frames, 390×640 on
 *   phones) and scaled down to fit, so it reads like a crisp miniature. It can't be clicked or scrolled (the page
 *   scrolls past it); "Open site" opens the real thing in a new tab.
 * - `url` + `screenshot`: for sites that refuse to be embedded (X-Frame-Options), a screenshot in the same frame.
 * - no `url`: a photo in the same frame, for businesses without a website yet.
 */
export interface SitePreviewProps {
  name: string;
  url?: string;
  domain?: string;
  /** Screenshot used instead of a live iframe */
  screenshot?: string;
  /** Photo for businesses without a website */
  image: string;
  /** Business accent colour, used for the soft glow behind the frame */
  accent: string;
  className?: string;
}

const DESKTOP = { w: 1440, h: 900 };
const PHONE = { w: 390, h: 640 };

export function SitePreview({ name, url, domain, screenshot, image, accent, className }: SitePreviewProps) {
  const mode = !url ? "photo" : screenshot ? "screenshot" : "live";

  return (
    <div className={cn("relative", className)}>
      {/* Soft glow in the business colour behind the frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-60 blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 60% 40%, color-mix(in srgb, ${accent} 35%, transparent), transparent 70%)` }}
      />

      <div className="relative overflow-hidden rounded-[22px] bg-white shadow-[0_40px_80px_-32px_rgba(11,31,71,0.38)] ring-1 ring-bx-line">
        {mode !== "photo" && <BrowserBar name={name} url={url!} domain={domain} />}

        {mode === "live" && <LiveFrame name={name} url={url!} domain={domain} />}

        {mode === "screenshot" && (
          <img
            src={screenshot}
            alt={`${name} website homepage`}
            loading="lazy"
            decoding="async"
            className="block aspect-[1440/900] w-full object-cover object-top"
          />
        )}

        {mode === "photo" && (
          <div className="relative aspect-[16/10]">
            <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Browser chrome: window dots, the address, and a link that opens the real site. */
function BrowserBar({ name, url, domain }: { name: string; url: string; domain?: string }) {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-bx-line-soft bg-bx-surface px-4">
      <span aria-hidden className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-bx-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-bx-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-bx-line-strong" />
      </span>
      <span className="mx-auto flex min-w-0 max-w-[60%] items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs text-bx-slate ring-1 ring-bx-line">
        <DuotoneIcon name="globe" size={12} className="shrink-0" />
        <span className="truncate">{domain ?? url}</span>
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${name} website in a new tab`}
        data-cursor="link"
        className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-bx-navy-700 transition-colors hover:text-bx-orange-dark"
      >
        Open site
        <Icon name="arrow-up-right" width={13} height={13} />
      </a>
    </div>
  );
}

/** The live site, rendered at a real viewport and scaled to the frame's width. View-only. */
function LiveFrame({ name, url, domain }: { name: string; url: string; domain?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Narrow frames (phones) show the site's mobile layout; wider ones its desktop layout
  const view = width > 0 && width < 560 ? PHONE : DESKTOP;
  const scale = width ? width / view.w : 0;

  return (
    <div ref={box} className="relative w-full overflow-hidden bg-bx-surface" style={{ height: scale ? view.h * scale : undefined, aspectRatio: scale ? undefined : "1440 / 900" }}>
      <p className="sr-only">Preview of the {name} website ({domain ?? url}).</p>
      {scale > 0 && (
        <iframe
          src={url}
          title={`${name} website preview`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          className={cn("pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700", loaded ? "opacity-100" : "opacity-0")}
          style={{ width: view.w, height: view.h, transform: `scale(${scale})` }}
        />
      )}
      {/* Shimmer until the site has loaded */}
      {!loaded && (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-bx-surface">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent motion-safe:animate-pulse" />
          <span className="relative font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bx-slate">Loading {domain ?? "site"}…</span>
        </div>
      )}
    </div>
  );
}
