import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { Icon } from "../utils/icons";
import { cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";
import { MagneticButton } from "../components/common/MagneticButton";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { PartnershipCard } from "../components/partnerships/PartnershipCard";
import { partnerships, partnershipTypes, type PartnershipType } from "../data/partnerships";

type Filter = PartnershipType | "All";

const filters: { key: Filter; label: string; count: number; accent?: string }[] = [
  { key: "All", label: "All", count: partnerships.length },
  ...(Object.keys(partnershipTypes) as PartnershipType[])
    .map((type) => {
      const count = partnerships.filter((p) => p.type === type).length;
      return { key: type, label: count === 1 ? type : partnershipTypes[type].plural, count, accent: partnershipTypes[type].accent };
    })
    .filter((f) => f.count > 0),
];

// Wording reused from the Businesses, Impact and labs copy elsewhere on the site.
const focusAreas = [
  {
    icon: "cpu",
    title: "AI adoption",
    description: "Building AI, automation and digital solutions for modern businesses.",
    accent: "#163A7A",
  },
  {
    icon: "graduation-cap",
    title: "Skills",
    description: "Create meaningful opportunities and develop capable teams.",
    accent: "#15966B",
  },
  {
    icon: "flask-conical",
    title: "Research",
    description: "Collaborative research with premier Indian technical universities.",
    accent: "#00B8D9",
  },
];

export default function PartnershipsPage() {
  usePageMeta({
    title: "Partnerships & Programmes | BharatX Group",
    description:
      "BharatX Group works with government, leading institutions and public-sector companies — including IIT Delhi, NSIC, ONGC and IGL — on AI adoption and skills.",
    path: "/partnerships",
  });

  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? partnerships : partnerships.filter((p) => p.type === filter);

  return (
    <main className="w-full min-h-screen bg-bx-cream text-bx-ink">
      {/* ── 01. HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={cardImage("how-we-build-04-step-invest")}
            alt="Leaders shaking hands on a factory floor"
            className="h-full w-full object-cover object-center filter brightness-[0.9] contrast-[1.08] animate-hero-zoom"
            data-cursor="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange-light font-bold backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-bx-orange shadow-[0_0_8px_#F54900]" />
            <span>PARTNERSHIPS &amp; PROGRAMMES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-4xl font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,4.4vw,4rem)] font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Working with{" "}
            <span className="text-bx-orange transition-colors duration-300">India&apos;s institutions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
          >
            Our AI and technology business works with government, leading institutions and public-sector companies on
            AI adoption and skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#partners-list"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("partners-list")?.scrollIntoView({ behavior: "smooth" });
                }}
                data-cursor="button"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
              >
                <span>Explore partnerships</span>
                <Icon name="arrow-right" width={16} height={16} className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </MagneticButton>

            <Link
              to="/contact?inquiry=partner"
              data-cursor="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
            >
              <span>Partner with us</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 02. PARTNER LIST (filterable) ─────────────────────────────── */}
      <SectionTransition
        id="partners-list"
        aria-label="Our partners"
        className="relative scroll-mt-24 overflow-hidden bg-bx-cream py-6 sm:py-9"
      >
        <div className="container-x relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl group/header">
              <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs cursor-default">
                <span className="h-2 w-2 rounded-full bg-bx-navy-700 transition-transform duration-300 group-hover/header:scale-125" />
                <span>OUR PARTNERS</span>
              </div>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-bx-ink">
                Institutions we <span className="text-bx-navy-700">work with</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-bx-slate">
                Government programmes, premier universities and public-sector companies, partnering with us on AI
                adoption and skills.
              </p>
            </div>

            {/* Filter by partnership type */}
            <div role="group" aria-label="Filter partnerships" className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={active}
                    data-cursor="button"
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-bx-navy-700 focus-visible:ring-offset-2",
                      active
                        ? "border-bx-navy-900 bg-bx-navy-900 text-white shadow-md shadow-bx-navy-900/20"
                        : "border-bx-line bg-white text-bx-ink-soft hover:border-bx-navy-700 hover:text-bx-navy-700",
                    )}
                  >
                    {f.accent && <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: f.accent }} />}
                    {f.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-xs tabular-nums",
                        active ? "bg-white/20 text-white" : "bg-bx-surface-grey text-bx-slate",
                      )}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Re-keyed on filter so the cards stagger in again */}
          <Stagger key={filter} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {shown.map((p) => (
              <StaggerItem key={p.name} className="h-full">
                <PartnershipCard partnership={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. WHAT WE WORK ON TOGETHER ──────────────────────────────── */}
      <SectionTransition aria-label="What we work on together" className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl text-center group/header">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-green/30 bg-bx-green/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-green-dark font-bold shadow-xs cursor-default">
              <span className="h-2 w-2 rounded-full bg-bx-green transition-transform duration-300 group-hover/header:scale-125" />
              <span>FOCUS AREAS</span>
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-bx-ink">
              What we work on <span className="text-bx-navy-700">together</span>
            </h2>
          </div>

          <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {focusAreas.map((area) => (
              <StaggerItem key={area.title} className="h-full">
                <div
                  data-cursor="card"
                  className="group h-full rounded-2xl border border-bx-line bg-bx-cream p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bx-navy-700/30 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(22, 58, 122,0.28)]"
                >
                  <FeatureIcon
                    name={area.icon}
                    accent={area.accent}
                    size={48}
                    className="transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
                  />
                  <h3 className="mt-5 font-heading text-2xl font-medium tracking-tight text-bx-ink transition-colors">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-bx-slate">{area.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 04. CTA ───────────────────────────────────────────────────── */}
      <SectionTransition
        aria-label="Partner with BharatX"
        className="relative overflow-hidden bg-gradient-to-br from-bx-navy-800 via-bx-navy-900 to-bx-navy-950 py-6 sm:py-9 text-white"
      >
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-bx-navy-600/35 via-bx-orange/20 to-transparent blur-[140px] sm:w-[700px]" />
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl py-6 text-center sm:py-8">
            <h2 className="font-heading text-3xl sm:text-5xl font-medium leading-[1.1] tracking-tight">
              Build a Better Bharat <span className="text-bx-orange-light">With Us.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80">
              Ministries, institutions and public-sector companies can partner with us on AI adoption, skills and
              research.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact?inquiry=partner"
                  data-cursor="button"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Partner With BharatX</span>
                  <Icon name="arrow-right" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <Link
                to="/verticals"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>Our Businesses</span>
              </Link>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
