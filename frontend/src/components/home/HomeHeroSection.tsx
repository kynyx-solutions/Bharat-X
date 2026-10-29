import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { Button } from "../common/Button";

export interface HeroSlide {
  id: string;
  name: string;
  shortLabel: string;
  image: string;
  companyLogo: string;
  heroTagline: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "infra",
    name: "Infrastructure & Heavy Engineering",
    shortLabel: "INFRASTRUCTURE",
    image: "/assets/hero1.png",
    companyLogo: "/Infra_logo1.png",
    heroTagline: "Building Arteries Of Bharat",
  },
  {
    id: "tech-ai",
    name: "Technology, AI & Automation",
    shortLabel: "TECHNOLOGY & AI",
    image: "/assets/hero2.jpeg",
    companyLogo: "/Ai-Experts_logo.png",
    heroTagline: "Intelligence Engineered For Bharat",
  },
  // {
  //   id: "packaging",
  //   name: "Packaging & Industrial Protection",
  //   shortLabel: "PACKAGING & SCALE",
  //   image: "/assets/hero3.png",
  //   companyLogo: "/Bharatxlabs_logo.svg",
  //   heroTagline: "Engineered For Enterprise Scale",
  // },
  {
    id: "labs",
    name: "Sustainable Materials & Packaging Labs",
    shortLabel: "BHARATX LABS",
    image: "/assets/hero5.png",
    companyLogo: "/Bharatxlabs_logo.svg",
    heroTagline: "Ideas. People. Possibilities.",
  },
  {
    id: "manufacturing",
    name: "Precision Mobility & Manufacturing",
    shortLabel: "MANUFACTURING",
    image: "/assets/hero4.png",
    companyLogo: "/Casters_logo.png",
    heroTagline: "Precision Engineering At Scale",
  },
  {
    id: "civil",
    name: "Heavy Civil & Transport Corridors",
    shortLabel: "HEAVY ENGINEERING",
    image: "/assets/hero6.png",
    companyLogo: "/Infra_logo1.png",
    heroTagline: "Connecting India's Corridors",
  },
  {
    id: "sustainability",
    name: "Sustainability & Circular Economy",
    shortLabel: "CIRCULAR ECONOMY",
    image: "/assets/hero7.png",
    companyLogo: "/Bharatxlabs_logo.svg",
    heroTagline: "Pioneering Sustainable Horizons",
  },
  {
    id: "clean-energy",
    name: "Renewable Energy & Solar Infrastructure",
    shortLabel: "CLEAN ENERGY",
    image: "/assets/hero8.png",
    companyLogo: "/Bharatxlabs_logo.svg",
    heroTagline: "Powering Sovereign Clean Energy",
  },
  {
    id: "ecosystem",
    name: "Connected Conglomerate Operations",
    shortLabel: "BHARATX GROUP",
    image: "/assets/hero9.png",
    companyLogo: "/bharatxgroup.png",
    heroTagline: "Building Businesses. Enabling Bharat.",
  },
];

const SLIDE_DURATION = 5000; // 5.0 seconds per slide

export function HomeHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Preload all hero images immediately on mount
  useEffect(() => {
    heroSlides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Automatic Infinite Loop Timer (re-arms whenever currentIndex changes)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, handleNext]);

  const current = heroSlides[currentIndex];

  return (
    // flex-1: takes the height HomePage's one-screen wrapper leaves above the stats strip
    <section
      aria-label="BharatX Group Conglomerate Hero"
      className="relative flex flex-1 w-full items-end justify-start overflow-hidden bg-black select-none"
    >
      {/* ── BACKGROUND FULL-BLEED IMAGERY CROSSFADE ─────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Persistent base image to prevent any blank screen flashes */}
        <img
          src={current.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top object-center filter brightness-[0.98] contrast-[1.04]"
        />

        {/* Smooth animated crossfade layer */}
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={current.image}
              alt={current.name}
              className="h-full w-full object-cover object-top object-center filter brightness-[0.98] contrast-[1.04]"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette Overlays with light touch */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30 lg:via-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent max-w-4xl" />
      </div>

      {/* ── HERO CONTENT (Dynamic 3-4 Word Tagline, Nothing Else) ─────── */}
      {/*
        Pinned to the bottom-left of the hero. Desktop: 40px up, with the slide control's pill level with the CTAs.
        Phones/tablets keep extra bottom padding because the slide control spans the bottom there.
        The group figures that used to sit under the CTAs now lead the stats strip (StatsMarquee).
      */}
      <div className="container-x max-w-none! relative z-10 w-full pt-28 pb-32 sm:pt-36 lg:pb-10">
        <div className="max-w-6xl xl:max-w-7xl">
          {/* Subtle Conglomerate Eyebrow 
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-3.5 sm:mb-4 flex items-center gap-3 font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.32em] text-[#F54900]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
            <span>BHARATX GROUP</span>
            <span aria-hidden className="h-px w-10 sm:w-16 bg-[#F54900]/40" />
          </motion.div>*/}

          {/* Three or four word Hero Tagline that changes dynamically with images */}
          <div className="min-h-[75px] sm:min-h-[90px] md:min-h-[105px] lg:min-h-[3.6rem] xl:min-h-[4.25rem] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current.id}
                initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] min-h-[2.2em] text-balance lg:min-h-0 lg:whitespace-nowrap cursor-default transition-colors duration-300 hover:text-[#F54900]"
              >
                {current.heroTagline}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/verticals" data-cursor="button">
              <Button variant="ember" size="lg" withArrow>
                Explore Our Businesses
              </Button>
            </Link>
            <Link to="/contact" data-cursor="button">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── CORNER CURRENT INDUSTRY LABEL & PROGRESS BAR ─── */}
      {/*
        lg:right-24 keeps the control 16px clear of the floating WhatsApp button in the bottom-right corner;
        lg:bottom-6 lines its pill up with the hero CTAs and leaves room above it for long taglines
      */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 lg:bottom-6 lg:right-24 z-20 flex flex-col items-end gap-2.5">
        {/* Industry Tag & Play/Pause State */}
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/70 backdrop-blur-xl px-4 py-2 shadow-2xl">
          <button
            type="button"
            data-cursor="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
            className="flex h-5 w-5 items-center justify-center rounded-full text-[#F54900] hover:scale-110 transition-transform"
          >
            <span
              className={`block h-2 w-2 rounded-full bg-[#F54900] ${isPaused ? "opacity-40" : "animate-pulse"
                }`}
            />
          </button>

          <span className="font-sans text-[11px] font-bold text-[#F54900] tracking-wider">
            0{currentIndex + 1} / 0{heroSlides.length}
          </span>

          <span className="h-3 w-px bg-white/20" />

          {/* Company Mini Logo */}
          <div className="w-4 h-4 rounded bg-white p-0.5 flex items-center justify-center shrink-0">
            <img
              src={current.companyLogo}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            {current.shortLabel}
          </span>
        </div>

        {/* Thin Linear Progress Bar (Synchronized with SLIDE_DURATION) */}
        <div className="w-56 sm:w-64 h-[2.5px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            key={`bar-${currentIndex}-${isPaused}`}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{
              duration: isPaused ? 0 : SLIDE_DURATION / 1000,
              ease: "linear",
            }}
            className="h-full bg-[#F54900] shadow-[0_0_8px_rgba(245,73,0,0.6)]"
          />
        </div>

        {/* Navigation Dots and Chevrons */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            data-cursor="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1 rounded-full text-white/50 hover:text-white transition-all hover:scale-110"
          >
            <Icon name="chevron-left" width={12} height={12} />
          </button>

          <div className="flex items-center gap-1.5">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                data-cursor="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Jump to ${s.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                  ? "w-6 bg-[#F54900] shadow-[0_0_8px_#F54900]"
                  : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            data-cursor="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1 rounded-full text-white/50 hover:text-white transition-all hover:scale-110"
          >
            <Icon name="chevron-right" width={12} height={12} />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Scroll Hint — only from 1360px, where it clears the bottom-left stats row */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden min-[1360px]:flex flex-col items-center gap-1.5 text-white/50 pointer-events-none animate-bounce">
        <span className="font-sans text-[9px] uppercase tracking-[0.3em]">scroll</span>
        <span className="h-5 w-px bg-gradient-to-b from-gold-400/80 to-transparent" />
      </div>
    </section>
  );
}
