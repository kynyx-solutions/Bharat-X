import { useEffect, useState } from "react";
import { verticals } from "../../components/home/BusinessEcosystemGrid";
import { heroSlides } from "../../components/home/HomeHeroSection";
import { defaultStats, statColors } from "../../components/home/StatsMarquee";
import type { HomeContent, StatItem } from "../../services/siteContent";
import { cn } from "../../utils/cn";
import { mediaPath, MEDIA_BUCKET, sb } from "../db";
import { Btn, Field, inputClass, Loading, PageHead, Panel, UploadButton, useFail, useToast } from "../ui";

/** Homepage content editor: hero slides, Core Verticals images and the stats ticker (settings "home"). */
export function HomepageView() {
  const [saved, setSaved] = useState<HomeContent | null>(null);
  const [c, setC] = useState<HomeContent | null>(null);
  const [busy, setBusy] = useState(false);
  const fail = useFail();
  const toast = useToast();

  useEffect(() => {
    void sb()
      .from("settings")
      .select("value")
      .eq("key", "home")
      .maybeSingle()
      .then(({ data, error }) => {
        if (fail(error, "Homepage")) return;
        const v = ((data as { value: HomeContent } | null)?.value ?? {}) as HomeContent;
        setSaved(v);
        setC(v);
      });
  }, [fail]);

  if (!c || !saved) return <Loading />;

  const dirty = JSON.stringify(c) !== JSON.stringify(saved);
  const stats = c.stats ?? defaultStats;

  const setSlide = (id: string, patch: { image?: string; tagline?: string }) =>
    setC({ ...c, heroSlides: { ...c.heroSlides, [id]: { ...c.heroSlides?.[id], ...patch } } });
  const setVertical = (id: string, image: string | undefined) => setC({ ...c, verticals: { ...c.verticals, [id]: { image } } });
  const setStats = (next: StatItem[]) => setC({ ...c, stats: next });

  async function save() {
    if (!c || !saved) return;
    // Drop empty values so the site falls back to its built-in content for them
    const clean: HomeContent = JSON.parse(JSON.stringify(c, (_k, v) => (v === "" || v === undefined ? undefined : v)));
    if (clean.stats) clean.stats = clean.stats.filter((s) => s.value?.trim() && s.label?.trim());
    setBusy(true);
    const { error } = await sb().from("settings").upsert({ key: "home", value: clean });
    setBusy(false);
    if (fail(error, "Save")) return;
    // Delete uploaded images that are no longer used
    const used = new Set(JSON.stringify(clean).match(/https?:[^"]+/g) ?? []);
    const gone = (JSON.stringify(saved).match(/https?:[^"]+/g) ?? []).filter((u) => !used.has(u)).map(mediaPath).filter(Boolean) as string[];
    if (gone.length) await sb().storage.from(MEDIA_BUCKET).remove(gone);
    setSaved(clean);
    setC(clean);
    toast("Homepage saved. It's live on the website.");
  }

  return (
    <>
      <PageHead
        title="Homepage"
        sub="Change the hero slides, Core Verticals images and the stats strip. Changes go live when you save; visitors see them on their next page load."
        actions={
          <>
            <a className="inline-flex items-center rounded-lg border border-bx-line-strong bg-white px-4 py-2.5 text-sm font-semibold hover:border-bx-navy-700/50" href="/" target="_blank" rel="noopener">
              View homepage ↗
            </a>
            <Btn variant="primary" disabled={busy || !dirty} onClick={() => void save()}>
              {busy ? "Saving…" : dirty ? "Save changes" : "Saved"}
            </Btn>
          </>
        }
      />

      <div className="space-y-6">
        <Panel title="Hero slides">
          <p className="-mt-2 mb-4 text-sm text-bx-slate">
            Full-screen photos, landscape, at least 1920×1080. Keep the bottom-left calm: the headline sits there.
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {heroSlides.map((s, i) => {
              const o = c.heroSlides?.[s.id] ?? {};
              return (
                <div key={s.id} className="rounded-xl border border-bx-line p-3">
                  <img src={o.image || s.image} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-bx-slate">
                    Slide {i + 1} · {s.shortLabel}
                  </p>
                  <Field label="Headline" className="mt-2">
                    <input className={inputClass} placeholder={s.heroTagline} value={o.tagline ?? ""} onChange={(e) => setSlide(s.id, { tagline: e.target.value })} />
                  </Field>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <UploadButton folder="hero" maxSize={2400} label="Change photo" onUploaded={(url) => setSlide(s.id, { image: url })} />
                    {(o.image || o.tagline) && (
                      <Btn size="sm" variant="ghost" onClick={() => setSlide(s.id, { image: undefined, tagline: undefined })}>
                        Reset to original
                      </Btn>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-bx-slate">
            Slide 1 is preloaded by the site for speed; after changing its photo, ask the developer to update the preload in index.html
            too.
          </p>
        </Panel>

        <Panel title="Core Verticals images">
          <p className="-mt-2 mb-4 text-sm text-bx-slate">
            Landscape, 1920×1080. White text sits on the left quarter (menu) and the right half (title and paragraphs), so keep
            those areas plain and medium-dark; put people and the main subject between them.
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {verticals.map((v) => {
              const img = c.verticals?.[v.id]?.image;
              return (
                <div key={v.id} className="rounded-xl border border-bx-line p-3">
                  <img src={img || v.image} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
                  <p className="mt-3 text-sm font-semibold">{v.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <UploadButton folder="verticals" maxSize={1920} label="Change photo" onUploaded={(url) => setVertical(v.id, url)} />
                    {img && (
                      <Btn size="sm" variant="ghost" onClick={() => setVertical(v.id, undefined)}>
                        Reset
                      </Btn>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Stats strip"
          actions={
            c.stats && (
              <Btn size="sm" variant="ghost" onClick={() => setC({ ...c, stats: undefined })}>
                Reset to original list
              </Btn>
            )
          }
        >
          <p className="-mt-2 mb-4 text-sm text-bx-slate">The scrolling numbers under the hero, in this order.</p>
          <div className="space-y-2">
            {stats.map((s, i) => (
              <div key={i} className="grid grid-cols-[90px_1fr] gap-2 rounded-xl border border-bx-line p-2 sm:grid-cols-[110px_1fr_auto_auto]">
                <input
                  className={cn(inputClass, "font-semibold")}
                  style={{ color: s.color }}
                  placeholder="150+"
                  value={s.value}
                  onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
                />
                <input
                  className={inputClass}
                  placeholder="Projects"
                  value={s.label}
                  onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                />
                <div className="flex items-center gap-1">
                  {statColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      aria-label={`Colour ${col}`}
                      onClick={() => setStats(stats.map((x, j) => (j === i ? { ...x, color: col } : x)))}
                      className={cn("h-6 w-6 rounded-full border-2", s.color === col ? "border-bx-ink" : "border-transparent")}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Btn size="sm" variant="ghost" disabled={i === 0} aria-label="Move up" onClick={() => setStats(move(stats, i, -1))}>↑</Btn>
                  <Btn size="sm" variant="ghost" disabled={i === stats.length - 1} aria-label="Move down" onClick={() => setStats(move(stats, i, 1))}>↓</Btn>
                  <Btn size="sm" variant="danger" aria-label="Remove" onClick={() => setStats(stats.filter((_, j) => j !== i))}>✕</Btn>
                </div>
              </div>
            ))}
          </div>
          <Btn className="mt-3" size="sm" onClick={() => setStats([...stats, { value: "", label: "", color: statColors[stats.length % statColors.length] }])}>
            + Add a stat
          </Btn>
        </Panel>
      </div>
    </>
  );
}

function move<T>(list: T[], i: number, by: number): T[] {
  const next = list.slice();
  const [item] = next.splice(i, 1);
  next.splice(i + by, 0, item);
  return next;
}
