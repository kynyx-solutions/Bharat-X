import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type CSSProperties } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { DuotoneIcon, Icon } from "../../utils/icons";
import { menuServices } from "../../data/servicesData";
import { brandConfig } from "../../config/brand";
import { navigation } from "../../data/navigation";
import { Logo } from "./Logo";

// Accent per operating sector, used for the sector tiles' tint, left border and index number.
const sectorAccents: Record<string, string> = {
  "tech-ai": "#4B40D4",
  infrastructure: "#3026B3",
  manufacturing: "#008299",
  agriculture: "#15966B",
  labs: "#047857",
  ventures: "#211B72",
};

const socialIcons: Record<string, string> = {
  LinkedIn: "arrow-up-right",
  Instagram: "arrow-up-right",
  YouTube: "arrow-up-right",
  Facebook: "arrow-up-right",
  X: "arrow-up-right",
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-night-950/[0.98] backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
          <div className="container-x relative flex min-h-full flex-col pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex items-center justify-between">
              <img src="/bharatxgroup.png" alt="BharatX Group" className="h-10 w-auto object-contain" />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-ink-100 shadow-xs hover:border-slate-300 dark:border-white/12 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:border-white/30"
                >
                  <Icon name="x" width={18} height={18} />
                </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex flex-col">
              {navigation.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    data-cursor="link"
                    className={({ isActive }) => cn(mobileLinkClass(isActive), "group fx-arrow")}
                    onClick={onClose}
                  >
                    <DuotoneIcon name={item.icon} size={17} className="transition-transform group-hover:scale-115 fx-icon-pop" />
                    <span className="fx-underline">{item.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Core Sectors */}
            <div className="mt-10">
              <div className="mb-3 font-sans text-[10px] uppercase tracking-[0.28em] text-[#3026B3] dark:text-gold-400 font-semibold">
                Core Operating Sectors
              </div>
              <div className="grid grid-cols-2 gap-2">
                {menuServices.map((svc, i) => {
                  const accent = sectorAccents[svc.id] ?? "#3026B3";
                  return (
                    <Link
                      key={svc.id}
                      to={`/verticals#${svc.id}`}
                      onClick={onClose}
                      data-cursor="card"
                      className="flex flex-col gap-1 rounded-xl border border-l-4 border-[color:var(--tile-border)] border-l-[color:var(--tile-accent)] p-3 text-left transition-all hover:border-[#3026B3] fx-lift shadow-xs"
                      style={
                        {
                          backgroundColor: `color-mix(in srgb, ${accent} 9%, white)`,
                          "--tile-border": `${accent}40`,
                          "--tile-accent": accent,
                        } as CSSProperties
                      }
                    >
                      <span className="font-sans text-[9px] font-semibold" style={{ color: accent }}>
                        0{i + 1}
                      </span>
                      <span className="truncate text-[12.5px] font-medium text-[#111827]">{svc.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto pt-10">
              <Link
                to="/verticals"
                onClick={onClose}
                data-cursor="button"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#3026B3] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#3026B3]/25 transition-all hover:bg-[#211B72] fx-press fx-shine dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
              >
                <span>Explore All Services</span>
                <Icon name="arrow-right" width={15} height={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="mt-6 flex items-center justify-center gap-5">
                {brandConfig.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    data-cursor="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3E5EF] bg-white dark:border-white/10 dark:bg-white/5 text-[#596579] shadow-xs transition-all hover:border-[#3026B3] hover:text-[#3026B3] fx-lift"
                  >
                    <Icon name={socialIcons[s.label] ?? "arrow-up-right"} width={14} height={14} className="fx-icon-pop" />
                  </a>
                ))}
              </div>
              <p className="mt-5 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-[#596579]">
                BharatX Group — {location.pathname}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function mobileLinkClass(isActive: boolean): string {
  return cn(
    "flex items-center gap-3.5 border-b border-[#E3E5EF] dark:border-white/10 py-3 sm:py-3.5 font-sans text-[17px] sm:text-[19px] font-medium tracking-tight transition-colors",
    isActive ? "text-[#3026B3] dark:text-gold-400 font-semibold" : "text-ink-900 dark:text-white hover:text-[#3026B3] dark:hover:text-gold-300",
  );
}
