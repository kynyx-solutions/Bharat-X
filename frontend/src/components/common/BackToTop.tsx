import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLenis } from "../scroll/SmoothScrollProvider";
import { Icon } from "../../utils/icons";

/** Floating back-to-top control (Section 44). */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo, active } = useLenis();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));

  const goTop = () => {
    if (active) scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          data-cursor="button"
          data-motion="true"
          whileTap={{ scale: 0.94 }}
          whileHover={{ y: -3, scale: 1.05 }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          // Stacked above the WhatsApp button (56px + 12px gap) and centred on it (6px inset = (56 - 44) / 2)
          className="group fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] right-[calc(1.875rem+env(safe-area-inset-right,0px))] z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-[#111827] shadow-[0_12px_40px_-12px_rgba(48,38,179,0.3)] backdrop-blur-md transition-colors hover:border-[#3026B3] hover:text-[#3026B3] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#3026B3]"
        >
          <Icon name="chevron-up" width={18} height={18} strokeWidth={2} className="transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
