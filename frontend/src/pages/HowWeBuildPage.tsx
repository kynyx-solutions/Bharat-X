import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

// ── 02. Formula items for "Our Philosophy" ───────────────────────────
const philosophyInputs = [
  { label: "Opportunity", icon: "target" as const, color: "#3026B3" },
  { label: "People", icon: "users" as const, color: "#15966B" },
  { label: "Capital", icon: "landmark" as const, color: "#F54900" },
  { label: "Technology", icon: "cpu" as const, color: "#00B8D9" },
  { label: "Execution", icon: "cog" as const, color: "#4B40D4" },
];

// ── 03. Five-Step Build Cycle ─────────────────────────────────────────
const buildCycleSteps: {
  step: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  borderHover: string;
  image: string;
}[] = [
    {
      step: "01",
      name: "IDENTIFY",
      tagline: "Find the opportunity.",
      description: "We look for meaningful problems, market gaps and emerging opportunities where a strong business can be built.",
      icon: "target" as const,
      accent: "#3026B3",
      borderHover: "hover:border-[#3026B3]",
      image: cardImage("how-we-build-02-step-identify"),
    },
    {
      step: "02",
      name: "BUILD",
      tagline: "Turn opportunity into capability.",
      description: "We develop the product, business model, team and operating foundation required to create a viable enterprise.",
      icon: "hard-hat" as const,
      accent: "#F54900",
      borderHover: "hover:border-[#F54900]",
      image: cardImage("how-we-build-03-step-build"),
    },
    {
      step: "03",
      name: "INVEST",
      tagline: "Put resources behind potential.",
      description: "We bring together capital, technology, talent, partnerships and strategic capabilities.",
      icon: "landmark" as const,
      accent: "#00B8D9",
      borderHover: "hover:border-[#00B8D9]",
      image: cardImage("how-we-build-04-step-invest"),
    },
    {
      step: "04",
      name: "SCALE",
      tagline: "Build for sustainable growth.",
      description: "We strengthen operations, distribution, technology, market access and organisational capability.",
      icon: "trending-up" as const,
      accent: "#15966B",
      borderHover: "hover:border-[#15966B]",
      image: cardImage("how-we-build-05-step-scale"),
    },
    {
      step: "05",
      name: "IMPACT",
      tagline: "Create lasting value.",
      description: "We measure success through business performance, jobs, innovation, infrastructure, sustainability and wider economic contribution.",
      icon: "sparkles" as const,
      accent: "#4B40D4",
      borderHover: "hover:border-[#4B40D4]",
      image: cardImage("how-we-build-06-step-impact"),
    },
  ];

// ── 04. Five Pillars of BharatX Advantage ─────────────────────────────
const bharatxAdvantage: { pillar: string; description: string; icon: string; color: string }[] = [
  {
    pillar: "Capital",
    description: "Financial resources and access to strategic capital.",
    icon: "landmark" as const,
    color: "#3026B3",
  },
  {
    pillar: "Technology",
    description: "AI, automation and digital capabilities.",
    icon: "cpu" as const,
    color: "#4B40D4",
  },
  {
    pillar: "Talent",
    description: "Entrepreneurs, operators, specialists and domain expertise.",
    icon: "users" as const,
    color: "#15966B",
  },
  {
    pillar: "Execution",
    description: "Hands-on operating and implementation capability.",
    icon: "cog" as const,
    color: "#00B8D9",
  },
  {
    pillar: "Ecosystem",
    description: "Partnerships, businesses, networks and market access.",
    icon: "layers" as const,
    color: "#D97706",
  },
];

// ── 05. Nine Sectors Where We Build ───────────────────────────────────
const buildSectors: { name: string; tag: string; icon: string; link: string; accent: string; image: string }[] = [
  { name: "Innovation", tag: "Research & Deep-Tech Labs", icon: "flask-conical", link: "/verticals#labs", accent: "#0D9488", image: cardImage("how-we-build-20-sector-innovation") },
  { name: "Venture Building", tag: "Capital & Enterprise GTM", icon: "landmark", link: "/verticals#ventures", accent: "#211B72", image: cardImage("how-we-build-18-sector-venture-building") },
  { name: "Agriculture", tag: "Agro Commodities & Export", icon: "sprout", link: "/verticals#agriculture", accent: "#15966B", image: cardImage("how-we-build-13-sector-agriculture") },
  { name: "Infrastructure", tag: "Civil & Transport Assets", icon: "hard-hat", link: "/verticals#infrastructure", accent: "#3026B3", image: cardImage("how-we-build-12-sector-infrastructure") },
  { name: "Social Impact", tag: "Education & Community Programmes", icon: "graduation-cap", link: "/verticals#foundation", accent: "#F54900", image: cardImage("how-we-build-19-sector-social-impact") },
  { name: "Manufacturing", tag: "Precision Casters & Mobility", icon: "cog", link: "/verticals#manufacturing", accent: "#00B8D9", image: cardImage("how-we-build-14-sector-manufacturing") },
  { name: "Technology", tag: "Applied AI & Automation", icon: "cpu", link: "/verticals#tech-ai", accent: "#4B40D4", image: cardImage("how-we-build-15-sector-technology") },
  { name: "Packaging", tag: "Sustainable Industrial Barriers", icon: "boxes", link: "/verticals#packaging", accent: "#D97706", image: cardImage("how-we-build-16-sector-packaging") },
  { name: "Sustainability", tag: "Circularity & Net-Zero Systems", icon: "recycle", link: "/verticals#sustainability", accent: "#059669", image: cardImage("how-we-build-17-sector-sustainability") },
];

export default function HowWeBuildPage() {
  usePageMeta({
    title: "How We Build — BharatX Group | From Opportunity to Impact",
    description:
      "We identify opportunities, build businesses, bring together capital and technology, and scale them with disciplined execution. Build. Scale. Impact.",
    path: "/how-we-build",
  });

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (From Opportunity to Impact) ─────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Abstract/Industrial Progression Background Image: Blueprint -> Factory -> Tech -> People */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/backgrounds/how-we-build-hero.png"
            alt="From Blueprint and Infrastructure to Technology and People"
            className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-[1.12] animate-hero-zoom"
            data-cursor="image"
          />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <div>
            {/* H1 Headline — single line from lg up */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,3.9vw,3.5rem)] lg:whitespace-nowrap font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] cursor-text"
              data-cursor="text"
            >
              Building Businesses.{" "}
              <span className="text-[#F54900] hover:text-[#ffb86a] transition-colors duration-300">Creating Wider Value.</span>
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  to="#build-cycle"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("build-cycle")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/25 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Explore The Process</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="rotate-90 transition-transform duration-300 group-hover:translate-y-1"
                  />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. OUR PHILOSOPHY (We Are Builders, Not Just Investors.) ─────── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4 hover:border-[#3026B3] transition-colors">
                <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
                <span>OUR PHILOSOPHY</span>
              </div>

              <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
                We Are Builders, <span className="text-[#3026B3]">Not Just Investors.</span>
              </AnimatedHeading>

              <p className="mt-6 text-base sm:text-lg text-[#596579] leading-relaxed font-normal">
                BharatX was built around a simple belief: meaningful businesses are created by combining a strong opportunity with the right people, technology, capital and execution.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#111827] font-medium leading-relaxed">
                We don’t believe in building businesses for the sake of having a portfolio. We build where we see a genuine opportunity to create long-term value.
              </p>
            </div>

            {/* Visual Formula: Opportunity + People + Capital + Technology + Execution -> Enterprise */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-[#F4F3FB] p-7 sm:p-9 shadow-lg fx-lift">
                <CardFill accent="#3026B3" tone="tint" />
                <div className="relative">
                  <div className="text-center mb-6">
                    <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#3026B3] font-bold block">
                      The Enterprise Engine
                    </span>
                    <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                      How core capabilities assemble into enduring institutions
                    </span>
                  </div>

                  {/* 5 Input Badges */}
                  <Stagger staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {philosophyInputs.map((item) => (
                      <StaggerItem key={item.label}>
                        <div
                          data-cursor="card"
                          className="group flex items-center gap-2 sm:gap-2.5 rounded-xl border border-l-4 p-2.5 sm:p-3 shadow-xs transition-all hover:shadow-md fx-lift h-full"
                          style={{ backgroundColor: `color-mix(in srgb, ${item.color} 9%, white)`, borderColor: `${item.color}40`, borderLeftColor: item.color }}
                        >
                          <FeatureIcon
                            name={item.icon}
                            accent={item.color}
                            size={32}
                            className="transition-transform group-hover:scale-110"
                          />
                          <span className="font-sans text-sm font-medium text-[#111827]">
                            {item.label}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}

                    {/* 6th Slot: Compounding Catalyst */}
                    <StaggerItem>
                      <div className="flex items-center justify-center rounded-xl border border-dashed border-[#211B72]/35 bg-[color-mix(in_srgb,#211B72_7%,white)] p-3 h-full">
                        <span className="font-sans text-xs text-[#211B72] font-bold tracking-wider">
                          + DISCIPLINE
                        </span>
                      </div>
                    </StaggerItem>
                  </Stagger>

                  {/* Downward Connector */}
                  <div className="my-5 flex items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3026B3] text-white shadow-md animate-bounce">
                      <Icon name="arrow-right" width={16} height={16} className="rotate-90" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Result Node: Enterprise */}
                  <div
                    data-cursor="card"
                    className="rounded-2xl border border-[#3026B3]/40 bg-gradient-to-r from-[#211B72] via-[#3026B3] to-[#211B72] p-5 sm:p-6 text-center text-white shadow-xl transition-all duration-300 hover:scale-[1.02] fx-glow-indigo"
                  >
                    <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold block mb-1">
                      CENTRAL OUTCOME
                    </span>
                    {/* `!` keeps the gold hover: the panel's light card-surface rule would otherwise force indigo on this dark box */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white transition-colors duration-300 hover:text-gold-400!">
                      Enterprise
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-slate-200 font-normal">
                      Self-sustaining, profitable, and structurally vital to India’s compounding growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 03. THE BHARATX BUILD CYCLE (Our Five-Step Approach) ─────────── */}
      <SectionTransition id="build-cycle" className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#008299] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00B8D9]" />
              <span>THE BHARATX BUILD CYCLE</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Our Five-Step <span className="text-[#3026B3]">Approach</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              A systematic progression transforming market challenges into scalable industrial champions.
            </p>
          </div>

          {/* 5-Step Interactive Timeline */}
          <Stagger staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3.5 relative">
            {buildCycleSteps.map((step, idx) => (
              <StaggerItem key={step.name}>
                <div
                  data-cursor="card"
                  className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D1026] p-6 sm:p-7 shadow-md transition-all duration-300 hover:shadow-2xl fx-lift h-full ${step.borderHover}`}
                >
                  {/* No overflow-hidden: the connector chevron overhangs the edge; CardPhoto clips itself */}
                  <CardPhoto src={step.image} accent={step.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <div className="flex items-center justify-between mb-4">
                      {/* White, not tintOnDark: it must also read on the solid fallback colour until the photo exists */}
                      <span className="font-sans text-xs font-bold tracking-widest text-white/90 transition-transform duration-300 group-hover:scale-110">
                        {step.step}
                      </span>
                      <FeatureIcon
                        name={step.icon}
                        accent={step.accent}
                        size={36}
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                    </div>

                    <h3 className="font-sans text-sm sm:text-base font-bold tracking-[0.16em] text-white uppercase group-hover:text-[#FF8904] transition-colors">
                      {step.name}
                    </h3>

                    <p className="mt-1 text-xs sm:text-[13px] font-sans font-semibold text-white/90">
                      {step.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting arrow indicator on desktop */}
                  {idx < buildCycleSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white border border-[#E3E5EF] items-center justify-center text-[#3026B3] shadow-md group-hover:scale-110 transition-transform">
                      <Icon name="chevron-right" width={13} height={13} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12 text-center">
            <p className="text-sm sm:text-base text-[#111827] font-medium max-w-xl mx-auto leading-relaxed">
              Our approach is simple: build with discipline, scale with purpose and think long term.
            </p>
          </div>
        </div>
      </SectionTransition>

      {/* ── 04. WHAT WE BRING (The BharatX Advantage — Five Pillars) ───────── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#15966B]" />
              <span>WHAT WE BRING</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              The BharatX <span className="text-[#3026B3]">Advantage</span>
            </AnimatedHeading>

            <p className="mt-3 text-base text-[#596579]">
              Five foundational pillars deployed synchronously across every venture.
            </p>
          </div>

          {/* 5 Pillars Grid */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {bharatxAdvantage.map((item) => (
              <StaggerItem key={item.pillar}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-2xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardFill accent={item.color} />
                  <div className="relative">
                    <FeatureIcon
                      name={item.icon}
                      accent={item.color}
                      size={44}
                      className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <h3 className="font-heading text-xl font-medium text-white group-hover:text-[#FF8904] transition-colors duration-300">
                      {item.pillar}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative mt-4 pt-3 border-t border-white/20 font-sans text-[9px] uppercase tracking-wider text-white/90">
                    Institutional Pillar
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Central Anchor Line */}
          <div className="mt-14 max-w-2xl mx-auto rounded-2xl border border-[#211B72] border-t-4 border-t-[#F54900] bg-[#211B72] p-6 text-center shadow-md fx-lift">
            <p className="font-heading text-base sm:text-lg font-medium text-white leading-relaxed">
              “When these capabilities come together, opportunities become scalable businesses.”
            </p>
          </div>
        </div>
      </SectionTransition>

      {/* ── 05. WHERE WE BUILD (Building Across the Real and Digital Economy) ── */}
      <SectionTransition className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>OPERATING FOOTPRINT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Building Across the <span className="text-[#3026B3]">Real and Digital Economy</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              Our sectors may differ, but the underlying approach remains the same: identify real opportunities, build strong businesses and create long-term value.
            </p>
          </div>

          {/* Clean Set of 9 Sectors */}
          <Stagger staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {buildSectors.map((sector) => (
              <StaggerItem key={sector.name}>
                <Link
                  to={sector.link}
                  data-cursor="card"
                  className="group relative overflow-hidden flex items-center justify-between rounded-xl border border-white/10 bg-[#0D1026] p-4 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift h-full"
                >
                  <CardPhoto src={sector.image} accent={sector.accent} />
                  <div className="relative flex items-center gap-3 [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={sector.icon}
                      accent={sector.accent}
                      size={36}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h4 className="font-heading text-base font-medium text-white group-hover:text-[#FF8904] transition-colors">
                        {sector.name}
                      </h4>
                      <span className="text-[11px] sm:text-xs font-sans text-slate-200 block">
                        {sector.tag}
                      </span>
                    </div>
                  </div>
                  <Icon name="arrow-up-right" width={14} height={14} className="relative text-white/80 group-hover:text-[#FF8904] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 06. CLOSING CTA (The Next Business Could Be Built Here.) ─────────── */}
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("how-we-build-cta-next-venture")} />}
        className="relative overflow-hidden bg-gradient-to-br from-[#211B72] via-[#1D1763] to-[#120E3E] text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#3026B3]/30 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
              <span>THE NEXT VENTURE</span>
            </div>

            {/* Headline */}
            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-slate-200">
              The Next Business Could Be Built Here.
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-2 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
              We are always looking for entrepreneurs, partners, investors and opportunities that can become the foundation of the next BharatX business.
            </p>

            {/* Three CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact?inquiry=partner"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Partner With Us</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <Link
                to="/verticals"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs fx-lift"
              >
                <span>Explore Our Businesses</span>
                <Icon
                  name="arrow-right"
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact?inquiry=build"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs fx-lift"
              >
                <span>Build With BharatX</span>
                <Icon
                  name="arrow-right"
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Signature Tagline */}
            <div className="mt-12 pt-8 border-t border-white/15 max-w-xl mx-auto">
              <p className="font-sans text-sm sm:text-base uppercase tracking-[0.24em] text-[#F54900] font-bold">
                Building Businesses. Enabling Bharat.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
