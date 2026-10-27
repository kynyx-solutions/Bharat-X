import { motion } from "framer-motion";
import { FeatureIcon } from "../common/FeatureIcon";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { CardFill } from "../common/CardSurface";

const pillars: {
  title: string;
  description: string;
  icon: string;
  accent: string;
  borderHover: string;
  glowClass: string;
}[] = [
    {
      title: "Capital",
      description: "Access to capital and financial resources.",
      icon: "landmark",
      accent: "#3026B3",
      borderHover: "hover:border-[#3026B3]",
      glowClass: "fx-lift-glow-indigo",
    },
    {
      title: "Technology",
      description: "AI, automation and digital capabilities.",
      icon: "cpu",
      accent: "#00B8D9",
      borderHover: "hover:border-[#00B8D9]",
      glowClass: "fx-lift-glow-cyan",
    },
    {
      title: "Execution",
      description: "Real operating experience across industries.",
      icon: "cog",
      accent: "#D97706",
      borderHover: "hover:border-[#D97706]",
      glowClass: "fx-lift-glow-gold",
    },
    {
      title: "Ecosystem",
      description: "Cross-business capabilities, partnerships and market access.",
      icon: "network",
      accent: "#15966B",
      borderHover: "hover:border-[#15966B]",
      glowClass: "fx-lift-glow-cyan",
    },
  ];

export function WhyBharatXSection() {
  return (
    <SectionTransition
      id="why-bharatx"
      aria-label="Why BharatX"
      className="relative overflow-hidden bg-white py-6 sm:py-9"
    >
      <div className="container-x relative z-10">
        {/* Header */}
        <div className="max-w-3xl group/header">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs cursor-default">
            <span className="h-2 w-2 rounded-full bg-[#3026B3] transition-transform duration-300 group-hover/header:scale-125" />
            <span>WHY BHARATX</span>
          </div>

          <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-6xl font-medium leading-tight tracking-tight text-[#111827] transition-colors hover:text-[#F54900]">
            More Than Capital.<br /> <span className="text-[#3026B3] transition-colors">More Than Strategy.</span>
          </h2>

          <p className="mt-3 text-base text-[#596579] max-w-2xl leading-relaxed">
            Four interconnected pillars that distinguish how BharatX originates, accelerates, and compounds enterprise value.
          </p>
        </div>

        {/* 4 Pillars High-Contrast Grid with Stagger & fx-icon-spin */}
        <Stagger className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((pillar, idx) => (
            <StaggerItem key={pillar.title}>
              <div
                data-cursor="card"
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#3026B3] ${pillar.borderHover} ${pillar.glowClass}`}
              >
                <CardFill accent={pillar.accent} />

                {/* Gold top-border that draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-[3px] w-0 bg-[#FF8904] transition-all duration-400 ease-out group-hover:w-full"
                />

                <div className="relative">
                  <FeatureIcon
                    name={pillar.icon}
                    accent={pillar.accent}
                    size={48}
                    className="mb-5 transition-transform duration-500 group-hover:rotate-[360deg]"
                  />

                  <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#FF8904] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-200 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative mt-6 pt-4 border-t border-white/20 flex items-center justify-between font-sans text-[10.5px] uppercase tracking-wider text-white/85">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Pillar 0{idx + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#FF8904] transition-transform duration-300 group-hover:scale-125" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Strong Statement Callout Banner — Royal Indigo & Gold Institutional Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fx-shine group/banner mt-12 sm:mt-14 relative overflow-hidden rounded-3xl border border-[#163A7A]/30 bg-gradient-to-r from-[#0B1F47] via-[#163A7A] to-[#0B1F47] p-8 sm:p-12 md:p-14 text-center text-white shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(11,31,71,0.45)]"
        >
          {/* Subtle gold line accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F54900] to-transparent opacity-80 transition-all duration-300 group-hover/banner:opacity-100" />

          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold mb-3">
            Operating Thesis
          </p>

          <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium leading-tight tracking-tight text-white max-w-4xl mx-auto drop-shadow-sm transition-transform duration-300 group-hover/banner:scale-[1.01]">
            “We don’t just back businesses.{" "}
            <span className="text-[#F54900]">We help build them.</span>”
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            From direct operating leadership and patient equity to institutional market access through the BharatX ecosystem.
          </p>
        </motion.div>
      </div>
    </SectionTransition>
  );
}
