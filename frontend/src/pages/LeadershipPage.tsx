import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

const governance = [
  { icon: "scale", t: "Clear Division of Decision Rights", d: "Group stewardship governs capital discipline, risk management, and shared standards. Tactical execution belongs to sector teams.", color: "#163A7A", image: cardImage("leadership-02-governance-decision-rights") },
  { icon: "file-check", t: "Standardised Quality & Safety", d: "Quality, material integrity, and cryptographic data protocols are applied uniformly with auditable public accounting.", color: "#00B8D9", image: cardImage("leadership-03-governance-quality-safety") },
  { icon: "eye", t: "Independent Standards Oversight", d: "Each operating sector is benchmarked against international standards by the group's standards oversight council.", color: "#F54900", image: cardImage("leadership-04-governance-standards-oversight") },
  { icon: "shield-check", t: "Institutional Compliance", d: "Regulatory, phytosanitary, and trade compliance is embedded into foundational processes from day one.", color: "#15966B", image: cardImage("leadership-05-governance-compliance") },
];

const operating = [
  { n: "01", t: "The group sets the standard; the sector sets the pace.", d: "Standards are non-negotiable. Execution is owned at the sector level, with authentic decision rights and measurable KPIs.", color: "#163A7A" },
  { n: "02", t: "Capital discipline, not bureaucratic delay.", d: "Capital allocation follows evidence and multi-decade compounding — reviewed transparently across all sectors.", color: "#00B8D9" },
  { n: "03", t: "Synergies are proved, not mandated.", d: "Any cross-sector collaboration must create demonstrable economic and operational value before resources are committed.", color: "#F54900" },
  { n: "04", t: "Data sovereignty is absolute.", d: "Confidentiality, client data residency, and cryptographic isolation between sectors are maintained as constitutional rules.", color: "#15966B" },
];

export default function LeadershipPage() {
  usePageMeta({
    title: "Leadership & Corporate Governance — BharatX Group",
    description:
      "Leadership charter, corporate stewardship, and operational governance across BharatX Group's foundational operating sectors.",
    path: "/leadership",
  });

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#111827] pt-24 pb-8">
      {/* ── 1. LEADERSHIP HERO ────────────────────────────────── */}
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
              <span className="text-white">CORPORATE STEWARDSHIP</span>
            </div>
            <AnimatedHeading as="h1" effect="words" hover="color" className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-white">
              Led Like an Institution.
              <br />
              <span className="italic text-[#F54900]">Driven by National Purpose.</span>
            </AnimatedHeading>
            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              The leadership of BharatX Group operates with long-term capital horizons, rigorous corporate governance, and an unwavering commitment to India's industrial sovereignty.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. FOUNDER'S CHARTER PROFILE ───────────────────────────────── */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <div data-cursor="card" className="relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-white shadow-xl p-6 sm:p-10 lg:p-12 fx-lift">
            <CardFill accent="#163A7A" tone="tint" />
            <div className="relative grid items-stretch gap-10 lg:grid-cols-12">
              {/* Portrait */}
              <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[400px] lg:h-[610px] rounded-2xl overflow-hidden border border-[#E3E5EF] group" data-cursor="image">
                <img
                  src="/leadership/pradeep-kumar.png"
                  alt="Pradeep Kumar — Founder & Leader, BharatX Group"
                  className="h-full w-full object-cover object-top filter brightness-[0.98] transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Narrative & Quote */}
              <div className="lg:col-span-7">
                <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-[#163A7A] font-semibold">
                  NATIONAL ECONOMIC VISION
                </span>
                <AnimatedHeading as="h2" effect="words" hover="color" className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight">
                  Architecting <span className="text-[#163A7A]">Sovereign Industrial Depth</span> for Bharat.
                </AnimatedHeading>

                <div className="mt-6 rounded-2xl border-l-4 border-[#F54900] bg-[#0B1F47] p-6 shadow-md fx-lift">
                  <blockquote className="text-base sm:text-lg font-heading italic text-white leading-relaxed">
                    “Aligned with the national vision of <span className="text-[#FF8904] font-semibold not-italic">Viksit Bharat 2047</span>, we are committed to building sustainable, technology-driven industrial foundations that eliminate critical external dependencies and secure multi-generational prosperity.”
                  </blockquote>
                  <div className="mt-3 text-xs font-sans text-[#C7C2FF] font-semibold flex items-center gap-1.5">
                    <span className="text-[#F54900]">◆</span>
                    <span>Pradeep Kumar, Institutional Founder</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      icon: "compass",
                      title: "Sovereign Industrial Capacity",
                      desc: "Deploying permanent capital across civil infrastructure, heavy logistics, and automated precision robotics.",
                      color: "#163A7A",
                    },
                    {
                      icon: "cpu",
                      title: "Indigenous Deep-Tech & AI",
                      desc: "Engineering domestic neural intelligence models across 22 Indian regional languages with 100% data residency.",
                      color: "#00B8D9",
                    },
                    {
                      icon: "orbit",
                      title: "Integrated Macroeconomic Network",
                      desc: "Unifying agriculture, manufacturing, and transport into one self-reinforcing national supply chain.",
                      color: "#15966B",
                    },
                  ].map((m) => (
                    <div
                      key={m.title}
                      data-cursor="card"
                      className="group flex items-start gap-3 rounded-xl border border-l-4 p-3.5 transition-all duration-300 hover:border-[#163A7A] fx-lift"
                      style={{ backgroundColor: `color-mix(in srgb, ${m.color} 9%, white)`, borderColor: `${m.color}40`, borderLeftColor: m.color }}
                    >
                      <FeatureIcon
                        name={m.icon}
                        accent={m.color}
                        size={32}
                        className="mt-0.5 transition-transform group-hover:scale-110"
                      />
                      <div>
                        <span className="font-heading text-base text-[#111827] block font-medium">{m.title}</span>
                        <span className="text-xs sm:text-[13px] text-[#374151] leading-relaxed block mt-0.5 font-sans">{m.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 3. GOVERNANCE & DIVISION OF POWER ────────────────────────────── */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-[#163A7A] font-semibold">
              BOARDROOM ARCHITECTURE
            </span>
            <AnimatedHeading as="h2" effect="words" hover="color" className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827]">
              Institutional Governance
            </AnimatedHeading>
            <p className="mt-3 text-[#596579] text-sm sm:text-base font-sans">
              Four pillars safeguarding constitutional discipline and long-term shareholder trust.
            </p>
          </div>

          <Stagger staggerDelay={0.08} className="grid gap-6 sm:grid-cols-2">
            {governance.map((g) => (
              <StaggerItem key={g.t}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-7 flex gap-4 items-start shadow-md cursor-card hover:border-[#FF8904] transition-all duration-300 fx-lift hover:shadow-xl h-full"
                >
                  <CardPhoto src={g.image} accent={g.color} />
                  <FeatureIcon
                    name={g.icon}
                    accent={g.color}
                    size={40}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <div className="relative">
                    <h3 className="font-heading text-xl text-white font-medium transition-colors">{g.t}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{g.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 4. OPERATING PRINCIPLES ─────────────────────────────────────── */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <div className="max-w-2xl mb-9">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-[#163A7A] font-semibold">
              EXECUTIVE CONSTITUTION
            </span>
            <AnimatedHeading as="h2" effect="words" hover="color" className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827]">
              Four Operating Doctrines
            </AnimatedHeading>
          </div>

          <Stagger staggerDelay={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {operating.map((op) => (
              <StaggerItem key={op.n}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 flex flex-col justify-between shadow-md cursor-card hover:border-[#FF8904] transition-all duration-300 fx-lift hover:shadow-xl h-full"
                >
                  <CardFill accent={op.color} />
                  <div className="relative">
                    <span className="font-sans text-xs font-bold block mb-3 text-[#FF8904] transition-transform duration-300 group-hover:scale-125">
                      {op.n}
                    </span>
                    <h3 className="font-heading text-lg text-white font-medium transition-colors">{op.t}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed font-sans">{op.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16 text-center">
            <MagneticButton strength={0.25}>
              <Link
                to="/contact"
                data-cursor="button"
                data-motion="true"
                className="inline-flex items-center gap-3 rounded-full bg-[#163A7A] text-white hover:bg-[#0F2A5C] px-8 py-3.5 text-sm font-semibold transition-all shadow-md fx-shine active:scale-95"
              >
                <span>Connect with Corporate Secretariat</span>
                <Icon name="arrow-right" width={15} height={15} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}

