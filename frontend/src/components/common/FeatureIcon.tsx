import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";
import { DuotoneIcon } from "../../utils/icons";
import { NIGHT, WHITE, hexToRgb, hue, mix, rgb, rgba, whiteContrast } from "../../utils/color";

/**
 * The icon tile on cards, steps and pillars: a duotone glyph on a glossy tile in the card's accent,
 * with a sheen, an inner shadow and a soft glow in the same colour (styles: .feature-icon in index.css).
 *
 * `size` is the tile in px; the glyph scales with it. Layout and hover classes (mb-5, mx-auto,
 * group-hover:rotate-6, fx-icon-pop…) go in `className` as before.
 */

/** The brand highlight (a light tint of the logo orange) for the inner fill, except on orange tiles where it would vanish. */
const HIGHLIGHT = "#FF8904";
const WARM_HUES: [number, number] = [14, 60];

function tileColours(accent: string) {
  const base = hexToRgb(accent);
  // Darken light accents (cyan, orange) toward navy just enough for the white glyph to read (3:1, graphics).
  let t = 0;
  while (whiteContrast(mix(base, NIGHT, t)) < 3 && t < 0.9) t += 0.05;
  const mid = mix(base, NIGHT, t);
  const h = hue(base);
  const warm = h >= WARM_HUES[0] && h <= WARM_HUES[1];
  return {
    "--fi-hi": rgb(mix(mid, WHITE, 0.28)),
    "--fi-base": rgb(mid),
    "--fi-lo": rgb(mix(mid, NIGHT, 0.35)),
    "--fi-glow": rgba(base, 0.5),
    "--fi-sec": warm ? "rgba(255, 255, 255, 0.42)" : HIGHLIGHT,
  };
}

export interface FeatureIconProps {
  /** Icon key, as used by <Icon> / <DuotoneIcon>. */
  name: string;
  /** Brand accent hex for the tile. */
  accent?: string;
  /** Tile size in px. */
  size?: number;
  className?: string;
}

export function FeatureIcon({ name, accent = "#163A7A", size = 44, className }: FeatureIconProps) {
  const style = {
    ...tileColours(accent),
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.29),
  } as CSSProperties;
  return (
    <span aria-hidden className={cn("feature-icon", className)} style={style}>
      <DuotoneIcon name={name} size={Math.round(size * 0.56)} />
    </span>
  );
}
