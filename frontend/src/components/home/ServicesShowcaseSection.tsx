import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { servicesData, ServiceItem } from "../../data/servicesData";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";

export function ServicesShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModal, setSelectedModal] = useState<ServiceItem | null>(null);

  const activeService = servicesData[activeIndex];

  return (
    <SectionTransition id="services" aria-label="BharatX Core Services & Sectors">
      <section className="relative w-full bg-night-950 text-white overflow-hidden">
        {/* ── DESKTOP FULL-BLEED INTERACTIVE CROSSFADE CONTAINER ── */}
        <div className="hidden lg:relative lg:flex lg:min-h-[820px] lg:h-[90vh] lg:max-h-[960px] w-full items-center">
          {/* Full-Bleed Background Images Crossfade */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={activeService.image}
                alt=""
                className="h-full w-full object-cover object-top object-center filter brightness-[0.95] contrast-[1.04]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette & Scrim Gradient Overlays — stronger for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Inner Content Grid */}
        <div className="container-x relative z-10 grid grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Eyebrow, Serif Title, 1-Line Descriptor, Pill Button */}
          <div className="col-span-7 xl:col-span-7 pr-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
              >
                {/* Gold Droplet / Diamond Eyebrow */}
                <div className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.28em] text-gold-400">
                  <span className="inline-block text-gold-400 text-sm">◆</span>
                  <span>OUR BUSINESSES & CAPABILITIES</span>
                </div>

                {/* Operating Enterprise Badge with Authentic Logo */}
                <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
                    <img src={activeService.companyLogo} alt={activeService.companyName} className="h-full w-full object-contain" />
                  </span>
                  <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider">
                    <span className="text-gold-400 uppercase font-semibold">ENTERPRISE:</span>
                    <span className="text-white font-medium">{activeService.companyName}</span>
                  </div>
                </div>

                {/* Majestic Serif Headline */}
                <h2 className="mt-3 font-heading text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-lg transition-colors duration-300">
                  {activeService.name}
                </h2>

                {/* 1-Line Punchy Descriptor */}
                <p className="mt-4 text-lg xl:text-xl font-semibold text-[#F54900] leading-snug drop-shadow-sm">
                  {activeService.descriptor}
                </p>

                {/* Short Impactful Narrative */}
                <p className="mt-4 text-[15px] xl:text-base text-white/90 leading-relaxed max-w-xl drop-shadow-sm">
                  {activeService.fullNarrative}
                </p>

                {/* Mini Stats Row */}
                <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-white/20 py-4 bg-black/20 backdrop-blur-sm rounded-lg px-4">
                  {activeService.stats.map((st) => (
                    <div key={st.label} className="flex flex-col">
                      <span className="font-heading text-xl xl:text-2xl font-semibold tracking-tight text-white">
                        {st.value}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-slate-300 font-medium">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pill Button: "read more →" */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedModal(activeService)}
                    className="group inline-flex items-center gap-3 rounded-full bg-white text-[#111827] hover:bg-[#FAF9F6] px-7 py-3.5 text-[14px] font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span>read more</span>
                    <Icon
                      name="arrow-right"
                      width={15}
                      height={15}
                      className="transition-transform duration-300 group-hover:translate-x-1 text-[#3026B3]"
                    />
                  </button>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 text-[14px] text-white font-medium underline-offset-2 hover:text-[#F54900] transition-colors duration-300"
                  >
                    <span>Inquire for sector partnership</span>
                    <Icon
                      name="arrow-up-right"
                      width={14}
                      height={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Vertical Sector Index Deck */}
          <div className="col-span-5 xl:col-span-5 pl-4">
            <div className="flex flex-col">
              {servicesData.map((svc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div key={svc.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`group relative w-full text-left py-4 sm:py-5 px-5 transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? "bg-white/15 backdrop-blur-md border border-[#F54900]/30 text-white shadow-xl rounded-lg"
                          : "border-b border-white/15 text-slate-300 hover:text-white hover:bg-white/10 hover:border-[#F54900]/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white p-0.5 shadow-sm">
                          <img src={svc.companyLogo} alt={svc.companyName} className="h-full w-full object-contain" />
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`font-sans text-xs sm:text-[13px] tracking-[0.16em] font-semibold uppercase transition-colors ${
                              isActive ? "text-[#F54900]" : "text-slate-200 group-hover:text-white"
                            }`}
                          >
                            {svc.shortLabel}
                          </span>
                          <span className={`font-sans text-[9px] ${isActive ? "text-slate-200" : "text-slate-400"}`}>
                            {svc.companyName}
                          </span>
                        </div>
                      </div>

                      <Icon
                        name="chevron-right"
                        width={15}
                        height={15}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-[#F54900] translate-x-1 opacity-100"
                            : "opacity-0 group-hover:opacity-60"
                        }`}
                      />

                      {/* Signature Saffron Line Underneath Active Item */}
                      {isActive && (
                        <motion.div
                          layoutId="services-active-bar"
                          className="absolute inset-x-0 bottom-0 h-[3px] bg-[#F54900] shadow-[0_0_10px_#F54900]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE STACKED IMAGE CARDS (< lg SCREEN) ────────────────────── */}
      <div className="block lg:hidden px-4 py-16 sm:px-6">
        <div className="mb-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-gold-400">
            <span className="text-gold-400">◆</span>
            <span>OUR BUSINESSES & SERVICES</span>
          </div>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl text-white transition-colors duration-300">
            Core Operating Sectors
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Select a sector to explore capabilities and specifications.
          </p>
        </div>

        <div className="space-y-6">
          {servicesData.map((svc, idx) => (
            <div
              key={svc.id}
              className="relative overflow-hidden rounded-2xl border border-[#E3E5EF] bg-white shadow-sm cursor-card dark:border-white/10 dark:bg-night-900"
            >
              {/* Full-bleed card image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={svc.image}
                  alt=""
                  className="h-full w-full object-cover object-top filter brightness-[0.92] contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#3026B3] border border-[#E3E5EF] font-semibold dark:bg-black/60 dark:text-gold-400">
                  0{idx + 1} · {svc.shortLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-heading text-2xl font-medium text-[#111827] dark:text-white transition-colors duration-300">
                  {svc.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#3026B3] dark:text-gold-200">
                  {svc.descriptor}
                </p>
                <p className="mt-2 text-xs text-[#596579] dark:text-slate-400 leading-relaxed">
                  {svc.fullNarrative}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#E3E5EF] dark:border-white/10 pt-4">
                  {svc.stats.slice(0, 2).map((st) => (
                    <div key={st.label}>
                      <span className="block font-heading text-lg font-semibold text-[#3026B3] dark:text-white">
                        {st.value}
                      </span>
                      <span className="block font-sans text-[9.5px] uppercase tracking-wider text-[#596579] dark:text-slate-400">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModal(svc)}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3026B3] hover:bg-[#211B72] py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  <span>read more</span>
                  <Icon name="arrow-right" width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICE DEEP-DIVE MODAL / DRAWER (Zero company names) ──────── */}
      <AnimatePresence>
        {selectedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E3E5EF] bg-white shadow-2xl p-6 sm:p-8 text-[#111827] dark:border-white/15 dark:bg-night-900 dark:text-white z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedModal(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#111827] hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                aria-label="Close dialog"
              >
                <Icon name="x" width={18} height={18} />
              </button>

              {/* Operating Enterprise Header with Logo */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E3E5EF] p-1.5 shadow-xs">
                  <img src={selectedModal.companyLogo} alt={selectedModal.companyName} className="h-full w-full object-contain" />
                </span>
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#3026B3] dark:text-gold-400 font-semibold block">
                    OPERATING ENTERPRISE
                  </span>
                  <a
                    href={selectedModal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-base text-[#111827] hover:text-[#3026B3] dark:text-white dark:hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    <span>{selectedModal.companyName}</span>
                    <Icon name="arrow-up-right" width={13} height={13} className="text-[#3026B3] dark:text-gold-400" />
                  </a>
                </div>
              </div>

              {/* Eyebrow */}
              <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#F54900] font-semibold">
                {selectedModal.eyebrow}
              </div>

              {/* Title in Serif */}
              <h3 className="mt-2 font-heading text-3xl sm:text-4xl text-[#111827] dark:text-white transition-colors duration-300">
                {selectedModal.name}
              </h3>

              {/* Descriptor */}
              <p className="mt-3 text-base text-[#3026B3] dark:text-gold-200 font-medium">
                {selectedModal.descriptor}
              </p>

              {/* Detailed Narrative */}
              <p className="mt-4 text-sm text-[#596579] dark:text-slate-300 leading-relaxed font-sans">
                {selectedModal.fullNarrative}
              </p>

              {/* Key Capabilities */}
              <div className="mt-6">
                <span className="block font-sans text-[11px] uppercase tracking-[0.2em] text-[#596579] dark:text-slate-400 mb-3">
                  Core Technical Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedModal.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2.5 rounded-xl border border-[#E3E5EF] bg-[#FAF9F6] px-3.5 py-2.5 text-xs text-[#111827] dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3026B3] dark:bg-gold-400" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#E3E5EF] dark:border-white/10 pt-5">
                {selectedModal.stats.map((st) => (
                  <div key={st.label} className="text-center sm:text-left">
                    <span className="block font-heading text-xl sm:text-2xl font-semibold text-[#3026B3] dark:text-white">
                      {st.value}
                    </span>
                    <span className="block font-sans text-[10px] uppercase tracking-wider text-[#596579] dark:text-slate-400">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E3E5EF] dark:border-white/10 pt-5">
                <Link
                  to="/contact"
                  onClick={() => setSelectedModal(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#3026B3] hover:bg-[#211B72] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
                >
                  <span>Inquire for {selectedModal.name}</span>
                  <Icon name="arrow-right" width={14} height={14} />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedModal(null)}
                  className="text-xs font-sans uppercase tracking-wider text-[#596579] hover:text-[#111827] dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </section>
    </SectionTransition>
  );
}
