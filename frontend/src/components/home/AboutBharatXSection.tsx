import { motion } from "framer-motion";
import { Icon } from "../../utils/icons";
import { FeatureIcon } from "../common/FeatureIcon";
import { SectionTransition } from "../motion/SectionTransition";

// Accent colours are lightened tints so they stay legible on the dark image overlays.
const corePillars = [
  {
    step: "01",
    label: "Build",
    subtext: "Enterprise Creation & Core Operations",
    icon: "hard-hat" as const,
    image: "/companies/bharatx-infratech/hero.jpg",
    accent: "#163A7A",
    textAccent: "text-[#B9B4FF]",
    hoverText: "group-hover:text-[#B9B4FF]",
    tint: "from-[#163A7A]/45",
    borderHover: "hover:border-[#163A7A]",
    glowClass: "fx-lift-glow-indigo",
  },
  {
    step: "02",
    label: "Scale",
    subtext: "Capital Compounding & Market Expansion",
    icon: "trending-up" as const,
    image: "/assets/backgrounds/conglomerate-panorama.jpg",
    accent: "#F54900",
    textAccent: "text-[#FF8904]",
    hoverText: "group-hover:text-[#FF8904]",
    tint: "from-[#CA3500]/40",
    borderHover: "hover:border-[#F54900]",
    glowClass: "fx-lift-glow-gold",
  },
  {
    step: "03",
    label: "Innovate",
    subtext: "Technology, Talent & Future Capabilities",
    icon: "brain-circuit" as const,
    image: "/companies/aixperts-labs/hero.jpg",
    accent: "#00B8D9",
    textAccent: "text-[#67E8F9]",
    hoverText: "group-hover:text-[#67E8F9]",
    tint: "from-[#0E7490]/45",
    borderHover: "hover:border-[#00B8D9]",
    glowClass: "fx-lift-glow-cyan",
  },
  {
    step: "04",
    label: "Impact",
    subtext: "Sovereign Resilience & National Progress",
    icon: "sparkles" as const,
    image: "/assets/backgrounds/impact-story.jpg",
    accent: "#15966B",
    textAccent: "text-[#6EE7B7]",
    hoverText: "group-hover:text-[#6EE7B7]",
    tint: "from-[#15966B]/45",
    borderHover: "hover:border-[#15966B]",
    glowClass: "fx-lift-glow-cyan",
  },
];

export function AboutBharatXSection() {
  return (
    <SectionTransition
      id="about"
      aria-label="About BharatX Group"
      className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9"
    >
      {/* Subtle architectural grid pattern */}
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-25 pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-5xl text-center group/header">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#9f2d00] font-bold shadow-xs cursor-default"
          >
            <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900] transition-transform duration-300 group-hover/header:scale-125" />
            <span>WHO WE ARE</span>
          </motion.div>

          {/* High-Contrast Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium leading-[1.12] tracking-tight text-[#111827] transition-colors"
          >
            Building Across India’s{" "}
            <span className="text-[#163A7A] transition-colors">Growth Economy</span>
          </motion.h2>

          {/* Short High-Contrast Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#596579] max-w-3xl mx-auto"
          >
            BharatX Group is a diversified Indian business group bringing together businesses, capital, technology and talent to create enduring enterprises.
          </motion.p>
        </div>

        {/* Visual: Build → Scale → Innovate → Impact */}
        <div className="mt-14 sm:mt-16 max-w-6xl xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 relative items-stretch">
            {corePillars.map((pillar, idx) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 * idx }}
                data-cursor="card"
                className={`group relative flex min-h-[260px] sm:min-h-[300px] flex-col items-center justify-center text-center p-7 sm:p-8 lg:p-7 xl:p-9 rounded-2xl border border-white/10 bg-[#0B0F1E] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${pillar.borderHover} ${pillar.glowClass}`}
              >
                {/* Background image + overlays, clipped separately so the connector arrow can overhang the card edge */}
                <div aria-hidden className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                  <img
                    src={pillar.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Dark scrim for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1E]/60 via-[#0B0F1E]/75 to-[#0B0F1E]/90" />
                  {/* Brand accent tint */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${pillar.tint} to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                </div>

                <div className="relative z-10 flex flex-col items-center [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                  <FeatureIcon
                    name={pillar.icon}
                    accent={pillar.accent}
                    size={48}
                    className="mb-4 transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
                  />

                  {/* Step indicator */}
                  <span className={`font-sans text-xs font-bold tracking-[0.2em] ${pillar.textAccent} mb-1.5 transition-transform duration-300 group-hover:scale-105`}>
                    {pillar.step}
                  </span>

                  {/* Main Label */}
                  <h3 className={`font-heading text-2xl sm:text-[1.75rem] font-medium tracking-tight text-white mb-2 transition-colors ${pillar.hoverText}`}>
                    {pillar.label}
                  </h3>

                  {/* Subtext */}
                  <p className="text-xs sm:text-[13px] text-slate-200 font-normal leading-relaxed">
                    {pillar.subtext}
                  </p>
                </div>

                {/* Connecting arrow: only between cards in the same row (2-up on tablet, 4-up on desktop) */}
                {idx < corePillars.length - 1 && (
                  <div className={`${idx % 2 === 0 ? "hidden sm:flex" : "hidden lg:flex"} absolute -right-3.5 sm:-right-4 lg:-right-5.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-[#E3E5EF] items-center justify-center text-[#163A7A] shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform`}>
                    <Icon name="chevron-right" width={14} height={14} strokeWidth={2.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
