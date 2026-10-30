import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../../utils/icons";
import { servicesData } from "../../data/servicesData";
import { navigation } from "../../data/navigation";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent background scrolling when search modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        services: servicesData.slice(0, 4),
        pages: navigation.slice(0, 5),
      };
    }

    return {
      services: servicesData.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortLabel.toLowerCase().includes(q) ||
          s.descriptor.toLowerCase().includes(q) ||
          s.capabilities.some((c) => c.toLowerCase().includes(q)),
      ),
      pages: navigation.filter((p) => p.label.toLowerCase().includes(q)),
    };
  }, [query]);

  const handleSelect = (to: string) => {
    onClose();
    navigate(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E3E5EF] bg-white shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-night-900/95"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-[#E3E5EF] px-4 py-3.5 dark:border-white/10">
              <Icon name="search" width={18} height={18} className="text-[#163A7A] dark:text-gold-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search BharatX sectors, services, capabilities..."
                className="w-full bg-transparent text-[15px] font-medium text-[#111827] placeholder:text-[#596579] focus:outline-none dark:text-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full p-1 text-[#596579] hover:text-[#111827]"
                >
                  <Icon name="x" width={14} height={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-block rounded border border-[#E3E5EF] px-2 py-0.5 font-sans text-[10px] text-[#596579] dark:border-white/15">
                ESC
              </kbd>
            </div>

            {/* Content Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
              {/* Services Section */}
              {results.services.length > 0 && (
                <div>
                  <div className="mb-2.5 px-2 font-sans text-[10.5px] uppercase tracking-[0.2em] text-[#596579]">
                    Sectors &amp; Services
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {results.services.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        data-cursor="button"
                        onClick={() => handleSelect(`/verticals#${s.id}`)}
                        className="group relative flex items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-[#FAF9F6] hover:translate-x-1 dark:hover:bg-white/[0.05]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F6] border border-[#E3E5EF] font-sans text-[11px] font-bold text-[#163A7A] transition-transform duration-200 group-hover:scale-110">
                          0{i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-sans text-[13.5px] font-semibold text-[#111827] group-hover:text-[#163A7A] dark:text-white dark:group-hover:text-gold-400 truncate transition-colors">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-[#596579] truncate">
                            {s.descriptor}
                          </div>
                        </div>
                        <Icon
                          name="arrow-up-right"
                          width={14}
                          height={14}
                          className="shrink-0 text-[#163A7A] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages & Portals */}
              {results.pages.length > 0 && (
                <div>
                  <div className="mb-2.5 px-2 font-sans text-[10.5px] uppercase tracking-[0.2em] text-[#596579]">
                    Corporate Navigation
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {results.pages.map((p) => (
                      <button
                        key={p.to}
                        type="button"
                        data-cursor="button"
                        onClick={() => handleSelect(p.to)}
                        className="group relative flex items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-[#FAF9F6] hover:translate-x-1 dark:hover:bg-white/[0.05]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F6] border border-[#E3E5EF] text-[#163A7A] transition-transform duration-200 group-hover:scale-110 dark:bg-white/[0.06] dark:text-ink-400">
                          <Icon name={p.icon} width={15} height={15} />
                        </span>
                        <div className="font-sans text-[13.5px] font-medium text-[#111827] group-hover:text-[#163A7A] dark:text-white truncate transition-colors">
                          {p.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.services.length === 0 && results.pages.length === 0 && (
                <div className="py-8 text-center text-sm text-[#596579]">
                  No matching services or portals found for "{query}"
                </div>
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="border-t border-[#E3E5EF] bg-[#F7F7FC] px-4 py-2 text-[11px] font-sans text-[#596579] flex items-center justify-between dark:border-white/10 dark:bg-white/[0.02]">
              <span>Search BharatX Group</span>
              <span>Press ESC to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}