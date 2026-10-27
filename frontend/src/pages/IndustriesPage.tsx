import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { servicesData } from "../data/servicesData";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill } from "../components/common/CardSurface";

/** Card colour per sector (keyed by servicesData id): tint accent, and a darker ink for text on the tint. */
const sectorTone: Record<string, { accent: string; ink: string }> = {
  "tech-ai": { accent: "#4B40D4", ink: "#3026B3" },
  infrastructure: { accent: "#3026B3", ink: "#3026B3" },
  manufacturing: { accent: "#00B8D9", ink: "#007A8F" },
  agriculture: { accent: "#15966B", ink: "#0F7A56" },
  labs: { accent: "#059669", ink: "#047857" },
  ventures: { accent: "#211B72", ink: "#211B72" },
};
const fallbackTone = { accent: "#3026B3", ink: "#3026B3" };

export default function IndustriesPage() {
  usePageMeta({
    title: "Industries & Sectors — BharatX Group",
    description:
      "Explore the core strategic industries BharatX Group operates across: Technology & AI, Civil Infrastructure, Precision Manufacturing, Agriculture & Food Systems, Packaging, Sustainability, and Venture Building.",
    path: "/industries",
  });

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#111827] pt-24 pb-8">
      {/* ── 1. RIL-STYLE SECTOR HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="h-full w-full object-cover object-top filter brightness-[0.92] contrast-[1.1] animate-hero-zoom"
            data-cursor="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        </div>

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] mb-4">
              <span className="animate-pulse">◆</span>
              <span className="text-white">STRATEGIC DOMAINS</span>
            </div>
            <AnimatedHeading as="h1" effect="words" hover="color" className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-white">
              Sovereign Sectors.
              <br />
              <span className="italic text-[#F54900]">National Priority.</span>
            </AnimatedHeading>
            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              BharatX Group operates deliberately in sectors that determine India's macroeconomic autonomy: computing infrastructure, heavy civil arteries, precision manufacturing, and sovereign food security.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. SECTORS SHOWCASE (Visual cards with zero company names) ──── */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <Stagger staggerDelay={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((svc, i) => {
              const tone = sectorTone[svc.id] ?? fallbackTone;
              return (
                <StaggerItem key={svc.id}>
                  <div
                    data-cursor="card"
                    className="group relative flex flex-col justify-between h-full rounded-3xl border border-[#E3E5EF] bg-white overflow-hidden shadow-xl transition-all duration-300 hover:border-[#3026B3] hover:shadow-2xl fx-lift"
                  >
                    <CardFill accent={tone.accent} tone="tint" />
                    <div className="relative">
                      {/* Visual Card Image */}
                      <div className="relative h-56 w-full overflow-hidden" data-cursor="image">
                        <img
                          src={svc.image}
                          alt={svc.name}
                          className="h-full w-full object-cover object-top filter brightness-[0.98] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                        <span className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 font-sans text-[9px] uppercase tracking-wider text-[#F54900] border border-white/20 transition-transform group-hover:translate-y-[-2px]">
                          0{i + 1} · {svc.shortLabel}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-7">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#9f2d00] font-semibold">
                            {svc.eyebrow}
                          </span>
                          <div className="flex items-center gap-1.5 rounded-full border border-[#E3E5EF] bg-white/90 px-2.5 py-0.5">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-2xs border border-[#E3E5EF]">
                              <img src={svc.companyLogo} alt={svc.companyName} className="h-full w-full object-contain" />
                            </span>
                            <span className="font-sans text-[9px] text-[#374151]">
                              {svc.companyName}
                            </span>
                          </div>
                        </div>
                        <h2 className="mt-2 font-heading text-2xl font-medium text-[#111827] group-hover:text-[#F54900] transition-colors duration-300">
                          {svc.name}
                        </h2>
                        <p className="mt-2 text-sm font-semibold text-[#3026B3]">
                          {svc.descriptor}
                        </p>
                        <p className="mt-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-sans">
                          {svc.fullNarrative}
                        </p>

                        {/* Capabilities */}
                        <div className="mt-5">
                          <span className="block font-sans text-[9.5px] uppercase tracking-wider text-[#374151] mb-2 font-semibold">
                            Key Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {svc.capabilities.slice(0, 3).map((cap) => (
                              <span
                                key={cap}
                                className="rounded-md border border-[#E3E5EF] bg-white/90 px-2 py-0.5 text-[11px] text-[#211B72] font-medium transition-colors group-hover:border-[#3026B3]/40"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="relative p-6 sm:p-7 border-t border-[#211B72]/10 flex items-center justify-between">
                      <div>
                        <span
                          className="block font-heading text-lg font-semibold transition-transform group-hover:scale-105"
                          style={{ color: tone.ink }}
                        >
                          {svc.stats[0]?.value}
                        </span>
                        <span className="block font-sans text-[9px] uppercase text-[#374151]">
                          {svc.stats[0]?.label}
                        </span>
                      </div>

                      <Link
                        to={`/verticals#${svc.id}`}
                        data-cursor="button"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#3026B3] text-white hover:bg-[#211B72] px-4 py-2 text-xs font-semibold shadow-md transition-all fx-shine group/btn"
                      >
                        <span>Deep Dive</span>
                        <Icon name="arrow-right" width={12} height={12} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Bottom CTA with Infrastructure Visual */}
          <div
            data-cursor="card"
            className="relative overflow-hidden mt-20 rounded-3xl border border-[#E3E5EF] bg-white p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl fx-lift"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/backgrounds/infrastructure-real.jpg"
                alt=""
                className="h-full w-full object-cover object-top filter brightness-[0.92] contrast-[1.15]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60" />
            </div>

            <div className="relative z-10">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#3026B3] block mb-3 font-semibold">
                CROSS-SECTOR COOPERATION
              </span>
              <AnimatedHeading as="h3" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl text-ink-900 font-medium">
                Explore Institutional Sector Collaborations
              </AnimatedHeading>
              <p className="mt-4 text-[#374151] text-sm sm:text-base max-w-xl mx-auto font-sans">
                Engage with our sector directors for infrastructure engineering, sovereign AI integration, and large-scale industrial partnerships.
              </p>
              <div className="mt-8">
                <MagneticButton strength={0.25}>
                  <Link
                    to="/contact"
                    data-cursor="button"
                    data-motion="true"
                    className="inline-flex items-center gap-3 rounded-full bg-[#3026B3] text-white hover:bg-[#211B72] px-8 py-3.5 text-sm font-semibold transition-all shadow-md fx-shine active:scale-95"
                  >
                    <span>Initiate Sector Inquiry</span>
                    <Icon name="arrow-right" width={14} height={14} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
