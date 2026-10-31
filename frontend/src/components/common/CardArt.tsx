import { useMemo, type SVGProps } from "react";
import { cn } from "../../utils/cn";

/**
 * Generated card backdrops.
 *
 * Every card passes its own `seed`, which drives every random choice (composition
 * corner, density, shape sizes and placement), so no two cards render the same image.
 * `motif` picks the subject so the art relates to what the card is about.
 *
 * Usage: make <CardArt> the first, direct child of a `relative` card, and keep the
 * card's content in a `relative` wrapper so it paints above the art.
 *   tone="dark"  → deep base, use white / slate-200 text
 *   tone="light" → soft tinted base, use #111827 / #374151 text
 */

export type CardArtMotif =
  | "circuit" // technology, AI, digital, data
  | "network" // ecosystem, partnerships, community, connectivity
  | "contour" // impact, land, regions, sustainability
  | "blueprint" // build, engineering, infrastructure, process
  | "growth" // scale, capital, finance, metrics, performance
  | "waves" // culture, values, people, flow, water
  | "orbit" // vision, strategy, global reach, leadership
  | "fields" // agriculture, rural, food, livelihoods
  | "skyline" // enterprise, cities, offices, careers
  | "routes" // logistics, locations, contact, expansion
  | "bloom" // wellbeing, CSR, care, growth of people
  | "lattice" // governance, trust, security, compliance, legal
  | "burst"; // innovation, ideas, launches, recognition

export type CardArtTone = "dark" | "light";

export type CardArtAnchor = "tl" | "tr" | "bl" | "br";

export interface CardArtProps {
  /** Unique per card. Changing it gives a different image. */
  seed: string;
  motif: CardArtMotif;
  /** Hex accent, e.g. "#163A7A". */
  accent: string;
  tone?: CardArtTone;
  /** Corner the art grows from. Defaults to a seeded pick, biased to the bottom (where card copy rarely sits). */
  anchor?: CardArtAnchor;
  className?: string;
}

const W = 400;
const H = 260;
const NIGHT: Rgb = [13, 16, 38];
const WHITE: Rgb = [255, 255, 255];

/* ── colour ─────────────────────────────────────────────────────────── */

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const rgb = (c: Rgb) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
const rgba = (c: Rgb, a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

/** An accent lightened for text and icons that sit on a dark CardArt (e.g. step numbers, icon colour). */
export function tintOnDark(accent: string) {
  return rgb(mix(hexToRgb(accent), WHITE, 0.55));
}

/* ── seeded randomness ──────────────────────────────────────────────── */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 */
function createRng(seed: string) {
  let a = hash(seed);
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    range: (min: number, max: number) => min + next() * (max - min),
    int: (min: number, max: number) => Math.floor(min + next() * (max - min + 1)),
    pick: <T,>(items: readonly T[]) => items[Math.floor(next() * items.length)],
    chance: (p: number) => next() < p,
  };
}

type Rng = ReturnType<typeof createRng>;

/* ── geometry ───────────────────────────────────────────────────────── */

type Pt = [number, number];
type Layer = "faint" | "line" | "strong" | "soft" | "dashed" | "dots" | "specks";

const f = (n: number) => n.toFixed(1);
const P = (x: number, y: number) => `${f(x)} ${f(y)}`;
const TAU = Math.PI * 2;
const polar = (cx: number, cy: number, r: number, a: number): Pt => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

/** Catmull-Rom through the points, as cubic Béziers. */
function smooth(pts: Pt[], closed: boolean) {
  const n = pts.length;
  const at = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${P(...pts[0])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d +=
      `C${P(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)} ` +
      `${P(p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)} ${P(...p2)}`;
  }
  return closed ? `${d}Z` : d;
}

function createSketch() {
  const d: Record<Layer, string> = { faint: "", line: "", strong: "", soft: "", dashed: "", dots: "", specks: "" };
  const path = (layer: Layer, s: string) => {
    d[layer] += s;
  };
  return {
    d,
    path,
    line: (layer: Layer, x1: number, y1: number, x2: number, y2: number) => path(layer, `M${P(x1, y1)}L${P(x2, y2)}`),
    poly: (layer: Layer, pts: Pt[], closed = false) =>
      path(layer, `M${pts.map((p) => P(...p)).join("L")}${closed ? "Z" : ""}`),
    curve: (layer: Layer, pts: Pt[], closed = false) => path(layer, smooth(pts, closed)),
    circle: (layer: Layer, x: number, y: number, r: number) =>
      path(layer, `M${P(x - r, y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`),
    rect: (layer: Layer, x: number, y: number, w: number, h: number) =>
      path(layer, `M${P(x, y)}h${f(w)}v${f(h)}h${f(-w)}Z`),
    ellipse: (layer: Layer, cx: number, cy: number, rx: number, ry: number, rot: number) => {
      const [dx, dy] = [rx * Math.cos(rot), rx * Math.sin(rot)];
      const deg = f((rot * 180) / Math.PI);
      path(
        layer,
        `M${P(cx + dx, cy + dy)}A${f(rx)} ${f(ry)} ${deg} 1 0 ${P(cx - dx, cy - dy)}` +
          `A${f(rx)} ${f(ry)} ${deg} 1 0 ${P(cx + dx, cy + dy)}`,
      );
    },
  };
}

type Sketch = ReturnType<typeof createSketch>;

/** The corner the composition grows from; `inward` measures away from it. */
interface Frame {
  ax: number;
  ay: number;
  inward: (dx: number, dy: number) => Pt;
}

function createFrame(r: Rng, bottomOnly: boolean, anchor?: CardArtAnchor): Frame {
  const seededX = r.chance(0.5) ? W : 0;
  const seededY = r.chance(0.75) ? H : 0;
  const ax = anchor ? (anchor[1] === "l" ? 0 : W) : seededX;
  const ay = bottomOnly ? H : anchor ? (anchor[0] === "t" ? 0 : H) : seededY;
  return { ax, ay, inward: (dx, dy) => [ax === 0 ? dx : W - dx, ay === 0 ? dy : H - dy] };
}

/* ── motifs ─────────────────────────────────────────────────────────── */

function circuit(s: Sketch, r: Rng, fr: Frame) {
  const g = 10;
  const snap = (v: number) => Math.round(v / g) * g;
  const cw = snap(r.range(70, 110));
  const ch = snap(r.range(50, 80));
  const [mx, my] = fr.inward(r.range(70, 130), r.range(50, 90));
  const cx = snap(mx - cw / 2);
  const cy = snap(my - ch / 2);
  s.rect("soft", cx, cy, cw, ch);
  s.rect("faint", cx + 8, cy + 8, cw - 16, ch - 16);
  s.circle("line", cx + 16, cy + 16, 3);

  const dirs: Pt[] = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  const pins: { x: number; y: number; di: number }[] = [];
  for (let x = cx + g; x < cx + cw; x += g) {
    pins.push({ x, y: cy, di: 6 }, { x, y: cy + ch, di: 2 });
  }
  for (let y = cy + g; y < cy + ch; y += g) {
    pins.push({ x: cx, y, di: 4 }, { x: cx + cw, y, di: 0 });
  }

  for (const pin of pins) {
    const [ox, oy] = dirs[pin.di];
    let [x, y] = [pin.x + ox * 6, pin.y + oy * 6];
    s.line("line", pin.x, pin.y, x, y);
    if (!r.chance(0.55)) continue;
    const pts: Pt[] = [[x, y]];
    const jog = r.pick([-1, 1]);
    const plan = [pin.di, (pin.di + jog + 8) % 8, pin.di, (pin.di - jog + 8) % 8].slice(0, r.int(2, 4));
    for (const di of plan) {
      const steps = r.int(2, 7);
      x += dirs[di][0] * steps * g;
      y += dirs[di][1] * steps * g;
      pts.push([x, y]);
    }
    s.poly(r.chance(0.25) ? "strong" : "line", pts);
    if (r.chance(0.6)) s.circle("soft", x, y, 3.2);
    else s.circle("dots", x, y, 1.8);
  }

  // Bus lines across the far side of the board
  const busCount = r.int(3, 5);
  const by = r.range(30, H - 60);
  for (let i = 0; i < busCount; i++) {
    const y = by + i * 8;
    const bend = r.range(W * 0.3, W * 0.7);
    s.poly("faint", [[-5, y], [bend, y], [bend + 30, y + 30], [W + 5, y + 30]]);
  }
  for (let i = 0; i < 12; i++) s.circle("faint", r.range(0, W), r.range(0, H), 2);
}

function network(s: Sketch, r: Rng, fr: Frame) {
  const n = r.int(18, 28);
  const nodes: Pt[] = Array.from({ length: n }, () =>
    fr.inward(W * 0.95 * Math.pow(r.next(), 1.3), H * 0.95 * Math.pow(r.next(), 1.3)),
  );
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, dist: Math.hypot(a[0] - b[0], a[1] - b[1]) }))
      .filter((e) => e.j !== i)
      .sort((p, q) => p.dist - q.dist)
      .slice(0, r.int(1, 3));
    for (const { j } of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const layer = r.chance(0.15) ? "dashed" : r.chance(0.3) ? "line" : "faint";
      s.line(layer, a[0], a[1], nodes[j][0], nodes[j][1]);
    }
  });
  nodes.forEach(([x, y], i) => {
    if (i < 4) {
      const rad = r.range(5, 8);
      s.circle("soft", x, y, rad);
      s.circle(r.chance(0.5) ? "faint" : "dashed", x, y, rad + r.range(5, 9));
    } else {
      s.circle("dots", x, y, r.range(1.4, 3));
    }
  });
}

function contour(s: Sketch, r: Rng, fr: Frame) {
  const peaks = r.int(1, 2);
  for (let c = 0; c < peaks; c++) {
    const [cx, cy] = c === 0 ? fr.inward(r.range(40, 170), r.range(30, 120)) : [r.range(0, W), r.range(0, H)];
    const rings = c === 0 ? r.int(8, 12) : r.int(4, 6);
    const gap = r.range(13, 19);
    const r0 = r.range(10, 20);
    const stretch = r.range(0.7, 1.35);
    const rot = r.range(0, Math.PI);
    const harm = [1, 2, 3].map((j) => ({ j, amp: r.range(0.04, 0.12) / j + 0.02, ph: r.range(0, TAU) }));
    for (let k = 0; k < rings; k++) {
      const R = r0 + k * gap;
      const pts: Pt[] = Array.from({ length: 36 }, (_, i) => {
        const t = (i / 36) * TAU;
        const rr = R * (1 + harm.reduce((acc, h) => acc + h.amp * Math.sin(h.j * t + h.ph + k * 0.12), 0));
        const [x, y] = [rr * Math.cos(t) * stretch, rr * Math.sin(t)];
        return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];
      });
      s.curve(k % 4 === 3 ? "line" : "faint", pts, true);
    }
    if (c === 0) {
      s.poly("line", [[cx - 5, cy + 4], [cx, cy - 5], [cx + 5, cy + 4]], true);
    }
  }
  const trail: Pt[] = Array.from({ length: 5 }, (_, i) => [(i / 4) * W, r.range(H * 0.2, H * 0.85)]);
  s.curve("dashed", trail);
}

function blueprint(s: Sketch, r: Rng, fr: Frame) {
  const step = r.pick([16, 20, 24]);
  for (let x = step; x < W; x += step) s.line("faint", x, 0, x, H);
  for (let y = step; y < H; y += step) s.line("faint", 0, y, W, y);

  const [bx, by] = fr.inward(r.range(110, 170), r.range(30, 60));
  const count = r.int(3, 5);
  const dir = fr.ax === 0 ? 1 : -1;
  for (let i = 0; i < count; i++) {
    const a = r.range(16, 32);
    const b = r.range(16, 32);
    const h = r.range(24, 96);
    const ox = bx + dir * (i - count / 2) * r.range(30, 42);
    const oy = (fr.ay === 0 ? Math.max(by, h + 50) : by) + r.range(-8, 8);
    const at = (l: number, rr: number, up: number): Pt => [
      ox - 0.866 * a * l + 0.866 * b * rr,
      oy - 0.5 * a * l - 0.5 * b * rr - h * up,
    ];
    s.poly("soft", [at(0, 0, 0), at(1, 0, 0), at(1, 0, 1), at(0, 0, 1)], true);
    s.poly("line", [at(0, 0, 0), at(0, 1, 0), at(0, 1, 1), at(0, 0, 1)], true);
    s.poly("line", [at(0, 0, 1), at(1, 0, 1), at(1, 1, 1), at(0, 1, 1)], true);
    for (let fl = 12; fl < h; fl += 12) {
      const u = fl / h;
      s.poly("faint", [at(1, 0, u), at(0, 0, u), at(0, 1, u)]);
    }
  }

  // Dimension line with end ticks
  const dy = fr.ay === 0 ? r.range(20, 40) : H - r.range(14, 26);
  const dx1 = r.range(20, 120);
  const dx2 = dx1 + r.range(120, 220);
  s.line("line", dx1, dy, dx2, dy);
  s.line("line", dx1, dy - 5, dx1, dy + 5);
  s.line("line", dx2, dy - 5, dx2, dy + 5);
  s.line("faint", (dx1 + dx2) / 2, dy - 3, (dx1 + dx2) / 2, dy + 3);

  // Drafting compass mark on the far side
  const [kx, ky] = [W - fr.inward(r.range(40, 90), 0)[0], r.range(40, H - 40)];
  const kr = r.range(14, 24);
  s.circle("line", kx, ky, kr);
  s.circle("dashed", kx, ky, kr + 9);
  s.line("faint", kx - kr - 16, ky, kx + kr + 16, ky);
  s.line("faint", kx, ky - kr - 16, kx, ky + kr + 16);
}

function growth(s: Sketch, r: Rng, fr: Frame) {
  const n = r.int(7, 11);
  const bw = r.range(12, 18);
  const gap = r.range(6, 10);
  const total = n * (bw + gap);
  const x0 = fr.ax === W ? W - total - r.range(10, 40) : r.range(10, 50);
  const base = H - r.range(14, 30);
  const lo = r.range(16, 36);
  const hi = r.range(120, 170);
  const curve = r.range(1, 1.8);

  for (let y = base - 40; y > 30; y -= r.range(36, 52)) s.line("dashed", 0, y, W, y);
  s.line("line", 0, base, W, base);

  const tops: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const h = lo + (hi - lo) * Math.pow(i / (n - 1), curve) + r.range(-10, 10);
    const x = x0 + i * (bw + gap);
    s.rect(i % 3 === 0 ? "soft" : "line", x, base - h, bw, h);
    tops.push([x + bw / 2, base - h - r.range(14, 24)]);
  }
  s.curve("strong", tops);
  tops.forEach(([x, y]) => s.circle("dots", x, y, 2.2));
  const [ex, ey] = tops[n - 1];
  const [px, py] = tops[n - 2];
  const ang = Math.atan2(ey - py, ex - px);
  s.poly("strong", [polar(ex, ey, 9, ang + 2.6), [ex, ey], polar(ex, ey, 9, ang - 2.6)]);
}

function waves(s: Sketch, r: Rng, fr: Frame) {
  const n = r.int(12, 18);
  const spacing = r.range(7, 12);
  const [f1, f2] = [r.range(0.008, 0.016), r.range(0.02, 0.035)];
  const [a1, a2] = [r.range(10, 26), r.range(3, 8)];
  const [p1, p2] = [r.range(0, TAU), r.range(0, TAU)];
  const drift = r.range(0.15, 0.4);
  const tilt = r.range(-0.25, 0.25);
  const y0 = fr.ay === 0 ? r.range(0, 40) : H - n * spacing - r.range(0, 40);
  const hero = r.int(2, n - 3);

  for (let i = 0; i < n; i++) {
    const pts: Pt[] = [];
    for (let x = -20; x <= W + 20; x += 20) {
      pts.push([
        x,
        y0 + i * spacing + tilt * (x - W / 2) + a1 * Math.sin(f1 * x + p1 + i * drift) + a2 * Math.sin(f2 * x + p2 - i * drift * 0.7),
      ]);
    }
    s.curve(i === hero ? "strong" : i % 5 === 0 ? "line" : "faint", pts);
    if (i === hero) pts.filter((_, k) => k % 3 === 1).forEach(([x, y]) => s.circle("dots", x, y, 2));
  }
}

function orbit(s: Sketch, r: Rng, fr: Frame) {
  const [cx, cy] = fr.inward(r.range(60, 150), r.range(40, 110));
  const tilt = r.range(-0.6, 0.6);
  const squash = r.range(0.32, 0.55);
  const rings = r.int(4, 6);
  const gap = r.range(24, 34);
  const sun = r.range(12, 18);
  s.circle("soft", cx, cy, sun);
  s.circle("faint", cx, cy, sun + 7);

  for (let i = 0; i < rings; i++) {
    const rx = sun + 22 + i * gap;
    const ry = rx * squash;
    s.ellipse(i === 1 ? "dashed" : i % 2 ? "faint" : "line", cx, cy, rx, ry, tilt);
    if (!r.chance(0.75)) continue;
    const t = r.range(0, TAU);
    const [ex, ey] = [rx * Math.cos(t), ry * Math.sin(t)];
    const px = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
    const py = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
    const pr = r.range(2.5, 5.5);
    s.circle(pr > 4 ? "soft" : "dots", px, py, pr);
    if (pr > 4.5) s.ellipse("faint", px, py, pr * 2.2, pr * 0.6, tilt);
  }
  const stars = r.int(26, 44);
  for (let i = 0; i < stars; i++) s.circle("specks", r.range(0, W), r.range(0, H), r.range(0.5, 1.3));
}

function fields(s: Sketch, r: Rng) {
  const hy = r.range(H * 0.36, H * 0.52);
  const vx = r.range(W * 0.25, W * 0.75);
  const sp = r.range(26, 38);
  let k = 0;
  for (let xb = -W; xb < 2 * W; xb += sp, k++) {
    s.line(k % 2 ? "faint" : "line", vx + (xb - vx) * 0.04, hy + 2, xb, H + 4);
  }
  const furrows = r.int(6, 9);
  for (let i = 1; i <= furrows; i++) {
    const y = hy + (H - hy) * Math.pow(i / furrows, 1.8);
    s.line("faint", 0, y, W, y);
  }
  for (let h = 0; h < 2; h++) {
    const amp = r.range(10, 26);
    const ph = r.range(0, TAU);
    const fr = r.range(0.008, 0.016);
    const pts: Pt[] = [];
    for (let x = -20; x <= W + 20; x += 30) pts.push([x, hy - 4 - h * 8 - amp * (0.5 + 0.5 * Math.sin(fr * x + ph))]);
    s.curve(h ? "faint" : "line", pts);
  }
  const [sx, sy, sr] = [vx + r.range(-130, 130), hy - r.range(40, 70), r.range(12, 20)];
  s.circle("soft", sx, sy, sr);
  const rays = r.int(10, 14);
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * TAU;
    s.line("faint", ...polar(sx, sy, sr + 5, a), ...polar(sx, sy, sr + 11, a));
  }
  const sprouts = r.int(4, 7);
  for (let i = 0; i < sprouts; i++) {
    const [x, y] = [r.range(10, W - 10), r.range(hy + 50, H - 8)];
    const h = r.range(8, 14);
    s.line("line", x, y, x, y - h);
    s.path("soft", `M${P(x, y - h * 0.6)}q-7-2-9-9q7 1 9 9`);
    s.path("soft", `M${P(x, y - h * 0.8)}q7-2 9-9q-7 1-9 9`);
  }
}

function skyline(s: Sketch, r: Rng, fr: Frame) {
  const ground = H - r.range(8, 26);
  let x = r.range(-20, 0);
  while (x < W + 10) {
    const w = r.range(18, 44);
    const toward = fr.ax === W ? x / W : 1 - x / W;
    const h = r.range(30, 150) * (0.45 + 0.55 * toward);
    const top = ground - h;
    if (r.chance(0.25)) {
      const inset = w * 0.22;
      const step = r.range(10, 18);
      s.poly(r.chance(0.3) ? "soft" : "line", [[x, ground], [x, top + step], [x + inset, top + step], [x + inset, top], [x + w - inset, top], [x + w - inset, top + step], [x + w, top + step], [x + w, ground]]);
    } else {
      s.rect(r.chance(0.3) ? "soft" : "line", x, top, w, h);
    }
    if (r.chance(0.2)) {
      const ah = r.range(10, 24);
      s.line("line", x + w / 2, top, x + w / 2, top - ah);
      s.circle("dots", x + w / 2, top - ah, 1.5);
    }
    if (w > 22 && h > 40 && r.chance(0.6)) {
      for (let wy = top + 10; wy < ground - 8; wy += 9) {
        for (let wx = x + 5; wx < x + w - 6; wx += 7) {
          if (r.chance(0.35)) s.rect("specks", wx, wy, 2.4, 3.2);
        }
      }
    }
    x += w + r.range(2, 8);
  }
  s.line("line", 0, ground, W, ground);
  s.circle("soft", r.range(30, W - 30), r.range(22, 56), r.range(9, 15));
  if (r.chance(0.5)) {
    const cx = r.range(60, W - 60);
    const top = r.range(30, 60);
    const jib = r.range(60, 110);
    const dir = r.pick([-1, 1]);
    s.line("line", cx, ground, cx, top);
    s.line("line", cx - 20 * dir, top, cx + jib * dir, top);
    s.line("faint", cx, top - 14, cx + jib * 0.7 * dir, top);
    s.line("faint", cx, top - 14, cx - 20 * dir, top);
    const hx = cx + jib * r.range(0.4, 0.9) * dir;
    s.line("faint", hx, top, hx, top + r.range(30, 70));
  }
}

function routes(s: Sketch, r: Rng, fr: Frame) {
  for (let i = 1; i < 5; i++) {
    const y = (i * H) / 5;
    s.path("faint", `M-5 ${f(y)}Q${f(W / 2)} ${f(y - 18)} ${W + 5} ${f(y)}`);
  }
  for (let i = 1; i < 7; i++) {
    const x = (i * W) / 7;
    s.path("faint", `M${f(x)} -5Q${f(x + 14)} ${f(H / 2)} ${f(x)} ${H + 5}`);
  }

  const n = r.int(4, 6);
  const pins: Pt[] = Array.from({ length: n }, (_, i) => [((i + r.range(0.2, 0.8)) * W) / n, r.range(46, H - 30)]);
  pins.forEach((p, i) => {
    if (i === 0) return;
    const q = pins[i - 1];
    const [mx, my] = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + r.range(-60, 60)];
    s.path("dashed", `M${P(...q)}Q${P(mx, my)} ${P(...p)}`);
    for (const t of [0.33, 0.66]) {
      const u = 1 - t;
      s.circle("dots", u * u * q[0] + 2 * u * t * mx + t * t * p[0], u * u * q[1] + 2 * u * t * my + t * t * p[1], 1.6);
    }
  });
  if (n > 3) {
    const [a, b] = [pins[0], pins[n - 1]];
    s.path("faint", `M${P(...a)}Q${P(W / 2, r.range(0, 40))} ${P(...b)}`);
  }
  for (const [x, y] of pins) {
    s.path("soft", `M${P(x, y)}C${P(x - 4, y - 6)} ${P(x - 8, y - 9)} ${P(x - 8, y - 14)}a8 8 0 1 1 16 0c0 5-4 8-8 14Z`);
    s.circle("line", x, y - 14, 3);
  }

  const [kx, ky] = fr.inward(r.range(34, 56), r.range(34, 56));
  s.circle("line", kx, ky, 16);
  s.circle("faint", kx, ky, 22);
  s.poly("soft", [[kx, ky - 13], [kx + 4, ky], [kx, ky + 13], [kx - 4, ky]], true);
  s.line("faint", kx - 13, ky, kx + 13, ky);
}

function bloom(s: Sketch, r: Rng, fr: Frame) {
  const flower = (cx: number, cy: number, rings: number, layerA: Layer, layerB: Layer) => {
    let outer = 0;
    for (let j = 0; j < rings; j++) {
      const count = r.int(8, 14);
      const rIn = 6 + j * r.range(14, 20);
      const rOut = rIn + r.range(22, 36);
      const width = r.range(0.22, 0.4);
      const phase = j * (Math.PI / count) + r.range(0, 1);
      outer = Math.max(outer, rOut);
      for (let i = 0; i < count; i++) {
        const a = phase + (i / count) * TAU;
        const mid = (rIn + rOut) / 2;
        s.path(
          j === 0 ? layerA : layerB,
          `M${P(...polar(cx, cy, rIn, a))}Q${P(...polar(cx, cy, mid, a + width))} ${P(...polar(cx, cy, rOut, a))}` +
            `Q${P(...polar(cx, cy, mid, a - width))} ${P(...polar(cx, cy, rIn, a))}`,
        );
      }
    }
    return outer;
  };
  const [cx, cy] = fr.inward(r.range(50, 140), r.range(40, 110));
  const outer = flower(cx, cy, r.int(2, 3), "soft", "line");
  s.circle("dashed", cx, cy, outer + 10);
  s.circle("faint", cx, cy, outer + 24);
  s.circle("dots", cx, cy, 3);
  const [ox, oy] = [W - cx + r.range(-40, 40), H - cy + r.range(-30, 30)];
  flower(ox, oy, 1, "faint", "faint");
  for (let i = 0; i < 24; i++) s.circle("specks", r.range(0, W), r.range(0, H), r.range(0.6, 1.4));
}

function lattice(s: Sketch, r: Rng, fr: Frame) {
  const size = r.range(14, 22);
  const hw = Math.sqrt(3) * size;
  const hex = (cx: number, cy: number, rad: number): Pt[] =>
    Array.from({ length: 6 }, (_, i) => polar(cx, cy, rad, Math.PI / 6 + (i * Math.PI) / 3));
  const reach = Math.hypot(W, H);
  const lit: Pt[] = [];
  for (let row = -1; row * 1.5 * size < H + size; row++) {
    for (let col = -1; col * hw < W + hw; col++) {
      const cx = col * hw + (row % 2 ? hw / 2 : 0);
      const cy = row * 1.5 * size;
      const dist = Math.hypot(cx - fr.ax, cy - fr.ay) / reach;
      if (!r.chance(1.05 - dist * 1.3)) continue;
      const roll = r.next();
      s.poly(roll < 0.1 ? "soft" : roll < 0.16 ? "line" : "faint", hex(cx, cy, size - 1.5), true);
      if (roll < 0.1) lit.push([cx, cy]);
      if (roll > 0.94) s.poly("line", hex(cx, cy, size * 0.5), true);
    }
  }
  lit.slice(0, 5).forEach((p, i, arr) => {
    if (i) s.line("strong", arr[i - 1][0], arr[i - 1][1], p[0], p[1]);
    s.circle("dots", p[0], p[1], 2.2);
  });
}

function burst(s: Sketch, r: Rng, fr: Frame) {
  const [cx, cy] = fr.inward(r.range(60, 140), r.range(50, 110));
  const count = r.int(28, 44);
  const r1 = r.range(16, 26);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * TAU + r.range(-0.04, 0.04);
    const len = r.range(30, 120);
    s.line(len > 80 ? "line" : "faint", ...polar(cx, cy, r1, a), ...polar(cx, cy, r1 + len, a));
  }
  s.circle("line", cx, cy, r1 - 6);
  s.circle("soft", cx, cy, r.range(6, 10));
  s.circle("dashed", cx, cy, r.range(70, 100));
  const sparkles = r.int(4, 7);
  for (let i = 0; i < sparkles; i++) {
    const [x, y, k] = [r.range(10, W - 10), r.range(10, H - 10), r.range(4, 9)];
    s.path("soft", `M${P(x, y - k)}Q${P(x, y)} ${P(x + k, y)}Q${P(x, y)} ${P(x, y + k)}Q${P(x, y)} ${P(x - k, y)}Q${P(x, y)} ${P(x, y - k)}Z`);
  }
  for (let i = 0; i < 26; i++) s.circle("specks", r.range(0, W), r.range(0, H), r.range(0.6, 1.5));
}

const motifs: Record<CardArtMotif, (s: Sketch, r: Rng, fr: Frame) => void> = {
  circuit,
  network,
  contour,
  blueprint,
  growth,
  waves,
  orbit,
  fields,
  skyline,
  routes,
  bloom,
  lattice,
  burst,
};

const bottomAnchored = new Set<CardArtMotif>(["growth", "fields", "skyline"]);

function drawArt(seed: string, motif: CardArtMotif, anchor?: CardArtAnchor) {
  const r = createRng(`${motif}:${seed}`);
  const fr = createFrame(r, bottomAnchored.has(motif), anchor);
  const s = createSketch();
  motifs[motif](s, r, fr);
  return {
    layers: s.d,
    left: fr.ax === 0,
    top: fr.ay === 0,
    glow: `${fr.ax === 0 ? 0 : 100}% ${fr.ay === 0 ? 0 : 100}%`,
    angle: Math.round(r.range(100, 170)) * (fr.ax === 0 ? -1 : 1),
  };
}

const layerProps: Record<Layer, SVGProps<SVGPathElement>> = {
  faint: { strokeOpacity: 0.4, strokeWidth: 0.75 },
  soft: { fill: "currentColor", fillOpacity: 0.14, strokeOpacity: 0.7 },
  line: { strokeOpacity: 0.8 },
  dashed: { strokeOpacity: 0.7, strokeDasharray: "3 5" },
  strong: { strokeWidth: 1.7 },
  dots: { fill: "currentColor", stroke: "none" },
  specks: { fill: "currentColor", fillOpacity: 0.5, stroke: "none" },
};

export function CardArt({ seed, motif, accent, tone = "dark", anchor, className }: CardArtProps) {
  const art = useMemo(() => drawArt(seed, motif, anchor), [seed, motif, anchor]);
  const tint = hexToRgb(accent);
  const dark = tone === "dark";

  const background = dark
    ? `radial-gradient(420px circle at ${art.glow}, ${rgba(tint, 0.38)}, transparent), ` +
      `linear-gradient(${art.angle}deg, ${rgb(mix(NIGHT, tint, 0.24))}, ${rgb(NIGHT)} 72%)`
    : `radial-gradient(420px circle at ${art.glow}, ${rgba(tint, 0.14)}, transparent), ` +
      `linear-gradient(${art.angle}deg, ${rgb(mix(WHITE, tint, 0.1))}, ${rgb(mix(WHITE, tint, 0.03))})`;
  const mask = `radial-gradient(130% 130% at ${art.glow}, #000 22%, transparent 80%)`;

  return (
    <div
      aria-hidden
      data-tone={tone}
      className={cn("card-art pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]", className)}
      style={{ background }}
    >
      {/* Covers small cards; on large panels it stays a corner piece so strokes keep their weight */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio={`${art.left ? "xMin" : "xMax"}${art.top ? "YMin" : "YMax"} slice`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        className={cn(
          "absolute h-full max-h-[420px] w-full max-w-[640px]",
          art.left ? "left-0" : "right-0",
          art.top ? "top-0" : "bottom-0",
        )}
        style={{
          color: rgb(dark ? mix(tint, WHITE, 0.45) : tint),
          opacity: dark ? 0.62 : 0.34,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {(Object.keys(layerProps) as Layer[]).map((layer) =>
          art.layers[layer] ? <path key={layer} d={art.layers[layer]} {...layerProps[layer]} /> : null,
        )}
      </svg>
      {dark && <div className="absolute inset-0 bg-bx-night/15" />}
    </div>
  );
}
