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
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#FF8904] font-bold backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
            <span>PARTNERSHIPS &amp; PROGRAMMES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-4xl font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,4.4vw,4rem)] font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Working with{" "}
            <span className="text-[#F54900] transition-colors duration-300">India&apos;s institutions.</span>
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
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#CA3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
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
        className="relative scroll-mt-24 overflow-hidden bg-[#FAF9F6] py-6 sm:py-9"
      >
        <div className="container-x relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl group/header">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#163A7A]/25 bg-[#163A7A]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#163A7A] font-bold shadow-xs cursor-default">
                <span className="h-2 w-2 rounded-full bg-[#163A7A] transition-transform duration-300 group-hover/header:scale-125" />
                <span>OUR PARTNERS</span>
              </div>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-[#111827]">
                Institutions we <span className="text-[#163A7A]">work with</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-[#596579]">
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
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A] focus-visible:ring-offset-2",
                      active
                        ? "border-[#0B1F47] bg-[#0B1F47] text-white shadow-md shadow-[#0B1F47]/20"
                        : "border-[#E3E5EF] bg-white text-[#374151] hover:border-[#163A7A] hover:text-[#163A7A]",
                    )}
                  >
                    {f.accent && <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: f.accent }} />}
                    {f.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-xs tabular-nums",
                        active ? "bg-white/20 text-white" : "bg-[#F1F2F8] text-[#596579]",
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#0F7A56] font-bold shadow-xs cursor-default">
              <span className="h-2 w-2 rounded-full bg-[#15966B] transition-transform duration-300 group-hover/header:scale-125" />
              <span>FOCUS AREAS</span>
            </div>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-[#111827]">
              What we work on <span className="text-[#163A7A]">together</span>
            </h2>
          </div>

          <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {focusAreas.map((area) => (
              <StaggerItem key={area.title} className="h-full">
                <div
                  data-cursor="card"
                  className="group h-full rounded-2xl border border-[#E3E5EF] bg-[#FAF9F6] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#163A7A]/30 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(22, 58, 122,0.28)]"
                >
                  <FeatureIcon
                    name={area.icon}
                    accent={area.accent}
                    size={48}
                    className="transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
                  />
                  <h3 className="mt-5 font-heading text-2xl font-medium tracking-tight text-[#111827] transition-colors">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#596579]">{area.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 04. CTA ───────────────────────────────────────────────────── */}
      <SectionTransition
        aria-label="Partner with BharatX"
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2A5C] via-[#0B1F47] to-[#06122E] py-6 sm:py-9 text-white"
      >
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1E4A9E]/35 via-[#F54900]/20 to-transparent blur-[140px] sm:w-[700px]" />
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl py-6 text-center sm:py-8">
            <h2 className="font-heading text-3xl sm:text-5xl font-medium leading-[1.1] tracking-tight">
              Build a Better Bharat <span className="text-[#FF8904]">With Us.</span>
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
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#CA3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
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
