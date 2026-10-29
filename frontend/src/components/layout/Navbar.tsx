import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { DuotoneIcon, Icon } from "../../utils/icons";
import { MobileMenu } from "./MobileMenu";
import { contactRoute, navigation } from "../../data/navigation";
import { menuServices } from "../../data/servicesData";

type MegaKey = "services" | "companies" | "ecosystem" | null;

const primaryNav = navigation.filter((item) => item.to !== contactRoute.to);
const contactNav = navigation.find((item) => item.to === contactRoute.to);

const liveMetrics = [
  "DIVERSE INDUSTRIAL SECTORS • SOVEREIGN ASSETS",
  "OPERATING IN AI • INFRASTRUCTURE • MANUFACTURING • AGRI • PACKAGING • CAPITAL",
  "NATION-FIRST SCALE & COMPOUND ENTERPRISE VALUE",
  "COMMITTED TO ADVANCING BHARAT'S INDUSTRIAL CORE",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Ticker rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveMetrics.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut Escape to close menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white pt-[env(safe-area-inset-top,0px)] transition-all duration-500",
          (scrolled || mega) && "shadow-[0_4px_20px_-5px_rgba(48,38,179,0.08)]",
        )}
        style={{ borderBottom: (scrolled || mega) ? "1px solid #E3E5EF" : "none" }}
        onMouseLeave={() => setMega(null)}
      >
        {/* Tier 1: Executive Conglomerate Status Deck (Currently commented out) */}
        {/*
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-b border-white/10 bg-black/25 hidden md:block"
            >
              <div className="container-x flex h-8 items-center justify-between text-[11px] font-sans">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300 font-semibold tracking-wider text-[10px]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    ECOSYSTEM LIVE
                  </span>

                  <span className="h-3 w-px bg-white/20" />

                  <div className="relative h-4 overflow-hidden min-w-[280px] lg:min-w-[380px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={tickerIndex}
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 truncate tracking-wide text-white/80"
                      >
                        {liveMetrics[tickerIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-white/70">
                  <Link
                    to="/verticals"
                    className="hover:text-[#F54900] transition-colors flex items-center gap-1.5"
                  >
                    <DuotoneIcon name="layers" size={12} />
                    <span>Our Services</span>
                  </Link>

                  <Link
                    to="/about"
                    className="hover:text-[#F54900] transition-colors"
                  >
                    Governance
                  </Link>

                  <Link
                    to="/contact"
                    className="hover:text-[#F54900] transition-colors text-[#F54900] font-medium"
                  >
                    Quick Inquire →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        */}

        {/* Tier 2: Main Executive Navigation Command Deck */}
        <div className="container-x flex h-[72px] sm:h-[84px] items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Link
            to="/"
            aria-label="BharatX Group — home"
            className="group relative z-10 flex items-center shrink-0 rounded-xl transition-all duration-300 hover:scale-[1.02] lg:justify-self-start"
          >
            <img
              src="/bharatxgroup.png"
              alt="BharatX Group"
              className="h-12 sm:h-14 md:h-[60px] max-h-[60px] w-auto object-contain shrink-0"
            />
          </Link>

          {/* Desktop nav, centered */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            {primaryNav.map((item) => (
              <NavItem
                key={item.to}
                item={item}
                active={isActive(item.to)}
                mega={item.mega}
                isMegaOpen={mega === item.mega}
                onEnter={() => setMega(item.mega ?? null)}
              />
            ))}
          </nav>

          {/* Contact, right-aligned */}
          <div className="hidden items-center lg:flex lg:justify-self-end">
            {contactNav && (
              <NavItem
                item={contactNav}
                active={isActive(contactNav.to)}
                onEnter={() => setMega(null)}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E3E5EF] bg-white text-[#111827] shadow-xs transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} width={18} height={18} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        {/* Mega menus */}
        <AnimatePresence>
          {mega && !reduced && (
            <motion.div
              key={mega}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-xl lg:block dark:border-white/8 dark:bg-night-950/95"
            >
              <MegaPanel kind={mega} />
            </motion.div>
          )}
        </AnimatePresence>
        {mega && reduced && (
          <MegaPanel
            kind={mega}
            className="absolute inset-x-0 top-full hidden border-b border-slate-200/80 bg-white/95 lg:block shadow-xl dark:border-white/8 dark:bg-night-950/95"
          />
        )}
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavItem({
  item,
  active,
  onEnter,
  mega,
  isMegaOpen,
}: {
  item: (typeof navigation)[number];
  active: boolean;
  onEnter: () => void;
  mega?: MegaKey;
  isMegaOpen?: boolean;
}) {
  return (
    <div onMouseEnter={onEnter} className="relative">
      <NavLink
        to={item.to}
        data-cursor="link"
        className={cn(
          "group relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[14px] xl:text-[15px] font-medium transition-all duration-300",
          active ? "text-[#3026B3] font-semibold" : "text-[#111827] hover:text-[#3026B3]",
        )}
      >
        <DuotoneIcon
          name={item.icon}
          size={17}
          className={cn(
            "shrink-0 transition-transform duration-300 group-hover:scale-110 fx-icon-pop",
            active ? "text-[#3026B3]" : "text-[#596579] group-hover:text-[#3026B3]",
          )}
        />
        <span className="whitespace-nowrap">{item.label}</span>
        {item.mega && (
          <Icon
            name="chevron-down"
            width={12}
            height={12}
            strokeWidth={2}
            className={cn(
              "transition-transform duration-200 opacity-70 group-hover:opacity-100",
              isMegaOpen ? "rotate-180 text-[#F54900]" : "",
            )}
          />
        )}
        {active ? (
          <motion.span
            aria-hidden
            layoutId="navbar-active-indicator"
            className="absolute inset-x-2.5 xl:inset-x-3.5 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#3026B3] to-[#F54900]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-x-2.5 xl:inset-x-3.5 bottom-0 h-[2px] rounded-full bg-[#3026B3]/30 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          />
        )}
      </NavLink>
    </div>
  );
}

function MegaPanel({ kind, className }: { kind: Exclude<MegaKey, null>; className?: string }) {
  return (
    <div className={className}>
      <ServicesMega />
    </div>
  );
}

function ServicesMega() {
  const [preview, setPreview] = useState(0);
  const activeSvc = menuServices[preview] ?? menuServices[0];
  const accentColors = ["#3026B3", "#F54900", "#00B8D9", "#15966B", "#211B72", "#3026B3"];

  return (
    <div className="container-x grid grid-cols-[1fr_340px] gap-8 py-8">
      <div className="grid grid-cols-2 gap-2">
        {menuServices.map((svc, i) => {
          const accent = accentColors[i % accentColors.length];
          return (
            <Link
              key={svc.id}
              to={`/verticals#${svc.id}`}
              onMouseEnter={() => setPreview(i)}
              onFocus={() => setPreview(i)}
              className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-[#E3E5EF] hover:bg-[#F7F7FC] hover:shadow-sm"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm mt-0.5 transition-all duration-300 group-hover:shadow-md"
                style={{ boxShadow: preview === i ? `0 0 0 2px ${accent}30` : undefined }}
              >
                <img src={svc.companyLogo} alt={svc.companyName} className="h-full w-full object-contain" />
              </span>
              <span className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="truncate font-sans text-[14px] font-semibold text-[#111827] transition-colors block"
                    style={{ color: preview === i ? accent : undefined }}
                  >
                    {svc.name}
                  </span>
                </div>
                <span className="mt-0.5 line-clamp-1 block text-[11.5px] text-[#596579] group-hover:text-[#111827] transition-colors">
                  {svc.descriptor}
                </span>
              </span>
              <Icon
                name="arrow-up-right"
                width={14}
                height={14}
                className="mt-1 shrink-0 text-[#596579] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: preview === i ? accent : undefined } as React.CSSProperties}
              />
            </Link>
          );
        })}
      </div>

      {/* Right Image Preview Deck */}
      <div className="relative hidden h-[260px] overflow-hidden rounded-2xl border border-[#E3E5EF] shadow-sm lg:block">
        {menuServices.map((svc, i) => (
          <img
            key={svc.id}
            src={svc.image}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-500",
              preview === i ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F54900] block">
            {activeSvc.shortLabel}
          </span>
          <span className="text-white text-xs line-clamp-1 mt-0.5 font-medium">
            {activeSvc.descriptor}
          </span>
        </div>
      </div>
    </div>
  );
}
