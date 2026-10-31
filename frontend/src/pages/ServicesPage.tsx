import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { DuotoneIcon, Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { tintOnDark } from "../components/common/CardArt";
import { CardFill, CardPhoto, SectionPhoto, cardImage, solidTextColours } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";
import { businessPortfolio } from "../data/businessPortfolio";

const futureHorizons: { title: string; description: string; accent: string; image: string }[] = [
  {
    title: "Packaging",
    description: "Eco-conscious materials, automated barrier packaging, and supply-chain logistics containers.",
    accent: "#D97706",
    image: cardImage("services-13-horizon-packaging"),
  },
  {
    title: "Circular Economy",
    description: "Industrial waste recovery, closed-loop polymer recycling, and zero-effluent manufacturing systems.",
    accent: "#059669",
    image: cardImage("services-14-horizon-circular-economy"),
  },
  {
    title: "New Industrial Businesses",
    description: "Advanced metallurgy, automated robotics components, and high-spec sovereign civil technologies.",
    accent: "#163A7A",
    image: cardImage("services-15-horizon-new-industrial"),
  },
];

export default function ServicesPage() {
  usePageMeta({
    title: "Our Businesses | BharatX Group — Building Across India's Growth Economy",
    description:
      "BharatX Group builds and operates businesses across infrastructure, agriculture, manufacturing, technology, packaging and sustainability — supported by capital, venture building and social impact initiatives.",
    path: "/verticals",
  });

  return (
    <main className="w-full min-h-screen bg-bx-cream text-bx-ink">
      {/* ── 01. HERO (Our Businesses — Building Across India's Growth Economy) ── */}
      <section className="relative overflow-hidden min-h-[90vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed background panorama */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/backgrounds/business_hero.webp"
            alt="India's Growth Economy and Industrial Transformation"
            className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.12] animate-hero-zoom"
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
              Building Across India’s{" "}
              <span className="text-bx-orange transition-colors duration-300">Growth Economy.</span>
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. BUSINESS PORTFOLIO (Our Business Ecosystem — 8 Verticals Grid) ── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs mb-4 hover:border-bx-navy-700 transition-colors">
              <span className="h-2 w-2 rounded-full bg-bx-navy-700" />
              <span>BUSINESS PORTFOLIO</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-ink leading-tight tracking-tight">
              Our Business <span className="text-bx-navy-700">Ecosystem</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-bx-slate leading-relaxed">
              Nine operating verticals engineered for scale, operational autonomy, and compound value across Bharat.
            </p>
          </div>

          {/* Portfolio cards (3 cols on lg, 2 on md, 1 on mobile): white card, inset photo, logo tile overlapping its edge */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessPortfolio.map((biz) => {
              // The accent darkened enough for small text on white (4.5:1)
              const accentText = solidTextColours(biz.accent).deep;

              return (
                <StaggerItem key={biz.id} className="h-full">
                  <article
                    id={biz.id}
                    data-cursor="card"
                    className="group relative scroll-mt-28 flex h-full flex-col overflow-hidden rounded-3xl border border-bx-line bg-white shadow-xs transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-bx-navy-900/15 hover:shadow-[0_28px_55px_-28px_rgba(11,31,71,0.45)]"
                  >
                    {/* Inset photo; slow zoom on hover */}
                    <div className="relative m-3 mb-0 h-40 overflow-hidden rounded-2xl bg-bx-surface-blue" data-cursor="image">
                      <img
                        src={biz.image}
                        alt={biz.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-6 pb-4">
                      {/* Logo tile overlapping the photo's bottom edge (the business icon where there's no logo) */}
                      <div className="relative z-10 -mt-7 mb-3 flex h-14 min-w-14 w-fit items-center justify-center rounded-2xl bg-white px-2.5 shadow-md ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-0.5">
                        {biz.logo ? (
                          <img src={biz.logo} alt={`${biz.name} logo`} className="max-h-9 max-w-[96px] object-contain" />
                        ) : (
                          <FeatureIcon name={biz.icon} accent={biz.accent} size={36} />
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accentText }}>
                        <DuotoneIcon name={biz.icon} size={14} className="shrink-0" />
                        {biz.category}
                      </span>

                      <h3 className="mt-1.5 font-heading text-2xl font-medium leading-tight tracking-tight text-bx-navy-900">
                        {/* Stretched link: its overlay makes the whole card open the business detail page */}
                        <Link
                          to={`/verticals/${biz.slug}`}
                          className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-hidden focus-visible:after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-bx-navy-700"
                        >
                          {biz.name}
                        </Link>
                      </h3>

                      {/* Footer: the card opens its detail page (stretched link on the title); the arrow fills navy on hover */}
                      <div aria-hidden className="mt-auto pt-4">
                        <div className="flex items-center justify-between gap-3 border-t border-bx-line pt-3.5">
                          <span className="text-[13px] font-semibold text-bx-navy-900">Explore business</span>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bx-navy-900/15 text-bx-navy-900 transition-all duration-300 group-hover:border-bx-navy-900 group-hover:bg-bx-navy-900 group-hover:text-white">
                            <Icon name="arrow-right" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. HOW THEY CONNECT (Different Businesses. One Ecosystem.) ─────────── */}
      <SectionTransition className="relative overflow-hidden bg-bx-cream py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-navy-700" />
              <span>HOW THEY CONNECT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-ink leading-tight tracking-tight">
              Different Businesses. <span className="text-bx-navy-700">One Ecosystem.</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-bx-slate leading-relaxed max-w-2xl mx-auto">
              Each BharatX business operates within its own market while benefiting from the wider Group’s capabilities, relationships, technology, talent and entrepreneurial ecosystem.
            </p>
          </div>

          {/* Interactive Flow Architecture: BUILD | OPERATE | INVEST -> IMPACT */}
          <div className="relative overflow-hidden max-w-4xl mx-auto rounded-3xl border border-bx-line bg-white p-7 sm:p-12 shadow-xl fx-lift">
            <CardFill accent="#163A7A" tone="tint" />
            <div className="relative">
              {/* Top Root: BHARATX GROUP */}
              <div className="flex flex-col items-center text-center">
                <div
                  data-cursor="card"
                  className="inline-flex flex-col items-center rounded-2xl border border-bx-navy-700/40 bg-gradient-to-r from-bx-navy-900 via-bx-navy-700 to-bx-navy-900 px-8 py-4 text-white shadow-xl transition-all duration-300 hover:scale-105 fx-glow-indigo"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-bx-orange font-bold">
                    THE ECOSYSTEM CORE
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl font-medium tracking-tight mt-0.5">
                    BHARATX GROUP
                  </span>
                </div>
                <div className="h-8 w-px bg-bx-navy-700/40 my-1 animate-pulse" />
              </div>

              {/* Tri-Column Engine: BUILD | OPERATE | INVEST */}
              <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                {/* Pillar 1: BUILD */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-6 text-center shadow-md transition-all duration-300 hover:border-bx-navy-700 hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#163A7A" />
                    <div className="relative">
                      <FeatureIcon
                        name="hard-hat"
                        accent="#163A7A"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-bx-orange-light">
                        BUILD
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 transition-colors">
                        New Businesses
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Incubating new industrial and technological opportunities with native capabilities.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Pillar 2: OPERATE */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-6 text-center shadow-md transition-all duration-300 hover:border-bx-green hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#15966B" />
                    <div className="relative">
                      <FeatureIcon
                        name="cog"
                        accent="#15966B"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-bx-orange-light">
                        OPERATE
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 transition-colors">
                        Core Companies
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Executing across infrastructure, agro commodities, precision casters and applied AI.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Pillar 3: INVEST */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-6 text-center shadow-md transition-all duration-300 hover:border-bx-cyan hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#00B8D9" />
                    <div className="relative">
                      <FeatureIcon
                        name="landmark"
                        accent="#00B8D9"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-bx-orange-light">
                        INVEST
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 transition-colors">
                        Ventures
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Deploying patient balance-sheet capital, strategy and governance to accelerate growth.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              {/* Downward Connector to Impact */}
              <div className="my-6 flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bx-green text-white shadow-md animate-bounce">
                  <Icon name="arrow-right" width={16} height={16} className="rotate-90" strokeWidth={2.5} />
                </div>
              </div>

              {/* Convergence Output: IMPACT */}
              <div
                data-cursor="card"
                className="rounded-2xl border border-bx-green/40 bg-gradient-to-r from-bx-teal via-bx-green to-bx-teal p-6 text-center text-white shadow-xl transition-all duration-300 hover:scale-[1.02] fx-glow-gold"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-bx-orange font-bold block mb-1">
                  NATIONAL VALUE CREATION
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white transition-colors duration-300">
                  IMPACT
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-100 font-normal max-w-xl mx-auto">
                  Creating lasting economic resilience, high-quality jobs, and sustainable industrial progress across Bharat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 04. WHAT’S NEXT (The Portfolio Is Growing — 3 Small Tags/Cards) ──── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-orange-deep font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-orange" />
              <span>WHAT’S NEXT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-ink leading-tight tracking-tight">
              The Portfolio Is <span className="text-bx-navy-700">Growing</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-bx-slate leading-relaxed max-w-2xl mx-auto">
              BharatX continues to explore opportunities across India’s emerging industries and essential economic sectors.
            </p>
          </div>

          {/* 3 Small Tags / Cards */}
          <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {futureHorizons.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-6 shadow-md transition-all duration-300 hover:border-bx-navy-700 hover:shadow-xl fx-lift h-full"
                >
                  <CardPhoto src={item.image} accent={item.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-sm text-white px-3 py-1 font-sans text-[10px] uppercase tracking-wider font-bold">
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: tintOnDark(item.accent) }} />
                        <span>Horizon</span>
                      </span>
                      <span className="text-xs font-sans text-white/80">2026+</span>
                    </div>

                    <h3 className="font-heading text-xl font-medium text-white transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 05. FINAL CTA (Interested in Building With BharatX?) ─────────────── */}
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("services-cta-partner")} />}
        className="relative overflow-hidden bg-gradient-to-br from-bx-navy-800 via-bx-navy-900 to-bx-navy-950 text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-bx-navy-600/35 via-bx-orange/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-orange shadow-[0_0_8px_#F54900]" />
              <span>PARTNER WITH US</span>
            </div>

            {/* Headline */}
            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              Interested in Building With BharatX?
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
              We welcome conversations with entrepreneurs, investors, institutions, technology partners and businesses looking to create long-term opportunities.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 sm:px-9 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
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
                to="/about"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 sm:px-9 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs fx-lift"
              >
                <span>Explore About Group</span>
                <Icon
                  name="arrow-right"
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
