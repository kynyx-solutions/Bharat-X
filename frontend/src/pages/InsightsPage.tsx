import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { insightCategories, insights, type Insight, type InsightCategory } from "../data/insights";

type Filter = InsightCategory | "All";

const filters: { key: Filter; count: number }[] = [
  { key: "All", count: insights.length },
  ...(Object.keys(insightCategories) as InsightCategory[])
    .map((key) => ({ key, count: insights.filter((i) => i.category === key).length }))
    .filter((f) => f.count > 0),
];

function InsightCard({ item }: { item: Insight }) {
  const accent = insightCategories[item.category].accent;
  const isExternal = item.href?.startsWith("http");
  const linkClass =
    "mt-auto inline-flex items-center gap-2 pt-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#163A7A] transition-colors hover:text-[#F54900]";

  return (
    <article
      data-cursor="card"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E3E5EF] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#163A7A]/40 hover:shadow-lg"
    >
      {item.image && <img src={item.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span
            className="rounded-full px-3 py-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em]"
            style={{ color: accent, backgroundColor: `${accent}14` }}
          >
            {item.category}
          </span>
          {item.date && <time className="font-sans text-xs text-[#596579]">{item.date}</time>}
        </div>

        {item.logo && (
          <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-xl border border-[#E3E5EF] bg-white p-2">
            <img src={item.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
          </div>
        )}

        <h2 className="mt-5 font-heading text-xl font-medium leading-snug tracking-tight text-[#111827]">{item.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#596579]">{item.summary}</p>

        {item.href &&
          (isExternal ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" data-cursor="link" className={linkClass}>
              Read more <Icon name="arrow-up-right" width={14} height={14} />
            </a>
          ) : (
            <Link to={item.href} data-cursor="link" className={linkClass}>
              Read more <Icon name="arrow-right" width={14} height={14} />
            </Link>
          ))}
      </div>
    </article>
  );
}

export default function InsightsPage() {
  usePageMeta({
    title: "Insights | BharatX Group",
    description:
      "Ideas, perspectives and updates from across BharatX Group: partnerships, programmes and stories from our businesses in AI, infrastructure, manufacturing and agriculture.",
    path: "/insights",
  });

  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? insights : insights.filter((i) => i.category === filter);

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] w-full flex items-end justify-start pt-32 sm:pt-36 pb-14 sm:pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/backgrounds/innovation-story.jpg"
            alt=""
            className="h-full w-full object-cover object-center brightness-[0.9] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#FF8904] font-bold backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#F54900]" />
            <span>INSIGHTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-4xl font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Ideas and updates from across BharatX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/90"
          >
            Partnerships, perspectives and stories from our businesses and the people building them.
          </motion.p>
        </div>
      </section>

      {/* ── LISTING ──────────────────────────────────────────────────── */}
      <SectionTransition aria-label="All insights" className="relative py-12 sm:py-16">
        <div className="container-x">
          {filters.length > 2 && (
            <div role="group" aria-label="Filter insights" className="mb-8 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors",
                    filter === f.key
                      ? "border-[#163A7A] bg-[#163A7A] text-white"
                      : "border-[#D5D8E6] bg-white text-[#596579] hover:border-[#163A7A]/50 hover:text-[#163A7A]",
                  )}
                >
                  {f.key} <span className="opacity-70">({f.count})</span>
                </button>
              ))}
            </div>
          )}

          <Stagger key={filter} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <StaggerItem key={item.id}>
                <InsightCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#596579]">
            We'll publish perspectives and stories from across our businesses here. For media enquiries, please{" "}
            <Link to="/contact" className="font-semibold text-[#163A7A] underline-offset-4 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </SectionTransition>
    </main>
  );
}
