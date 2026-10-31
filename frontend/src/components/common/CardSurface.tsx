import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { NIGHT, WHITE, hexToRgb, mix, rgb, shade, whiteContrast } from "../../utils/color";

/**
 * Card backgrounds without SVG art.
 *
 * <CardFill>  — a solid brand colour (tone "solid", for white text) or a soft tint (tone "tint", for dark text)
 *               that shifts to a deeper shade while the card is hovered.
 * <CardPhoto> — a generated photo from /public/Cards background with a readability scrim. Its solid fill sits
 *               underneath, so a card whose image hasn't been added yet still shows its colour.
 * <SectionPhoto> — a full-bleed photo behind a dark section (the closing CTAs). It fades in once loaded and renders
 *               nothing if the image is missing, so the section's own gradient shows until the file is added.
 *
 * Make either one the FIRST, DIRECT child of a `relative` card (the hover styles key off `*:hover > .card-surface`),
 * and keep the card's content in `relative` wrappers so it paints above.
 */

/**
 * The accent, darkened only as far as white text needs (3.5:1) and keeping its saturation, so cyan, green and
 * amber stay vivid instead of turning teal, olive or brown; hover deepens it past 4.5:1.
 * `deep` (under a photo) instead blends toward the brand navy, so the card reads as dark while its image is missing.
 */
function solidShades(accent: string, deep = false) {
  const base = hexToRgb(accent);
  if (deep) {
    let t = 0;
    while (whiteContrast(mix(base, NIGHT, t)) < 4.6 && t < 0.9) t += 0.05;
    t = Math.max(t, 0.6);
    return { rest: mix(base, NIGHT, t), hover: mix(base, NIGHT, Math.min(t + 0.25, 0.92)) };
  }
  let k = 1;
  while (whiteContrast(shade(base, k)) < 3.5 && k > 0.3) k -= 0.01;
  return { rest: shade(base, k), hover: shade(base, k * 0.8) };
}

/**
 * CardFill's solid colours reused as text on white: `rest` is the fill itself (3.5:1, fine for headings),
 * `deep` its hover shade (past 4.5:1, for body copy).
 */
export function solidTextColours(accent: string) {
  const { rest, hover } = solidShades(accent);
  return { rest: rgb(rest), deep: rgb(hover) };
}

function tintShades(accent: string) {
  const base = hexToRgb(accent);
  return { rest: mix(WHITE, base, 0.08), hover: mix(WHITE, base, 0.15) };
}

/** Public URL of a card image saved in /public/Cards background as `<name>.webp`. */
export function cardImage(name: string) {
  return `/Cards%20background/${name}.webp`;
}

export interface CardFillProps {
  /** Brand accent hex, e.g. "#163A7A". */
  accent: string;
  tone?: "solid" | "tint";
  /** Darker solid fill (used under photos). */
  deep?: boolean;
  className?: string;
  children?: ReactNode;
}

export function CardFill({ accent, tone = "solid", deep = false, className, children }: CardFillProps) {
  const { rest, hover } = tone === "solid" ? solidShades(accent, deep) : tintShades(accent);
  return (
    <div
      aria-hidden
      data-tone={tone === "solid" ? "dark" : "light"}
      data-vivid={tone === "solid" && !deep ? "" : undefined}
      className={cn("card-surface pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]", className)}
      style={{ "--card-bg": rgb(rest), "--card-bg-hover": rgb(hover) } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface CardPhotoProps {
  /** Image URL, usually cardImage("home-01-approach-identify"). */
  src: string;
  /** Accent for the fallback colour and the hover tint. */
  accent: string;
  /** CSS object-position for the crop, e.g. "right center". */
  position?: string;
  className?: string;
}

export function CardPhoto({ src, accent, position = "center", className }: CardPhotoProps) {
  const [missing, setMissing] = useState(false);
  return (
    <CardFill accent={accent} deep className={className}>
      {!missing && (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bx-night/75 via-bx-night/45 to-bx-night/80" />
          <div className="card-photo-tint absolute inset-0" />
        </>
      )}
    </CardFill>
  );
}

/** Darkest behind the centred CTA copy, lighter toward the edges so the photo still reads. */
const SECTION_SCRIM =
  "radial-gradient(ellipse at center, rgba(6, 18, 46, 0.8) 0%, rgba(6, 18, 46, 0.62) 50%, rgba(6, 18, 46, 0.4) 100%)";

export interface SectionPhotoProps {
  /** Image URL, usually cardImage("home-cta-collaborate"). */
  src: string;
  /** CSS object-position for the crop, e.g. "center bottom". */
  position?: string;
}

/** Place inside a `relative overflow-hidden` section, ahead of its `relative z-10` content. */
export function SectionPhoto({ src, position = "center" }: SectionPhotoProps) {
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  if (state === "missing") return null;
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700",
        state === "ready" ? "opacity-100" : "opacity-0",
      )}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setState("ready")}
        onError={() => setState("missing")}
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0" style={{ background: SECTION_SCRIM }} />
    </div>
  );
}
