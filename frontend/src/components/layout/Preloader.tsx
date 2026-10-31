import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { track } from "../../services/analytics";
import { LogoMark } from "./Logo"; // re-exported below for external use

const SESSION_KEY = "bxg:preloader:done";
const STATUS_LINES = [
  "BUILDING CONNECTIONS",
  "CONNECTING DIVERSE ENTERPRISES",
  "ALIGNING THE ECOSYSTEM",
];

/**
 * Branded preloader (Section 46):
 * logo build-in + real progress (gated on window load and fonts, capped at 1.2s)
 * + cycling status line. Once per session.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const startedAt = useRef(performance.now());
  const finished = useRef(false);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let done = false;

    const statusTimer = window.setInterval(() => {
      if (!reduced) setStatusIdx((i) => (i + 1) % STATUS_LINES.length);
    }, 650);

    const tick = () => {
      setProgress((p) => {
        if (done) return p;
        const target = 100;
        const next = p + (target - p) * 0.075;
        return next > 99.6 ? 100 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ready = Promise.all([
      window.document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
      Promise.resolve().then(() => document.fonts?.ready ?? null),
    ]);
    // Hard cap: race (not all) so a slow image or font can never hold the page behind the loader
    const gate = Promise.race([ready, new Promise<void>((r) => setTimeout(r, 1200))]).then(() => {
      done = true;
      setProgress(100);
    });

    gate.then(
      () =>
        new Promise<void>((r) => setTimeout(r, 250)).then(() => {
          if (finished.current) return;
          finished.current = true;
          setExiting(true);
          window.setTimeout(() => {
            setVisible(false);
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* private mode */
            }
            track("preloader_complete", {
              duration_ms: Math.round(performance.now() - startedAt.current),
            });
          }, 750);
        }),
    );

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(statusTimer);
    };
  }, [visible, reduced]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const letters = "BHARATX GROUP".split(""); // kept to avoid breaking reduced-motion path

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-night-950"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={exiting}
        >
          <div aria-hidden className="noise pointer-events-none absolute inset-0" />
          <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-50" />
          <div aria-hidden className="aurora absolute inset-0 opacity-60" />

          <div className="relative z-10 flex flex-col items-center px-6">
            {/* BharatX Group Logo — fade + scale in */}
            <motion.img
              src="/bharatxgroup.webp"
              alt="BharatX Group"
              className="h-24 sm:h-28 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.82, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />

            {/* Progress */}
            <div className="mt-10 w-56">
              <div className="h-px w-full overflow-hidden bg-slate-200/80">
                <div
                  className="h-full bg-gradient-to-r from-pulse-400 to-gold-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.24em] text-ink-500">
                <span aria-live="polite">
                  {reduced
                    ? "LOADING"
                    : STATUS_LINES[statusIdx]}
                  <span className="text-pulse-400">…</span>
                </span>
                <span className="tabular-nums text-ink-300">
                  {String(Math.floor(progress)).padStart(3, "0")}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Re-export for potential use outside the chrome
export { LogoMark };
