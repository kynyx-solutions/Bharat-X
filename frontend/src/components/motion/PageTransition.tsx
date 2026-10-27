import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { EASINGS } from "./variants";

export interface PageTransitionProps {
  children: ReactNode;
  pathname?: string;
  className?: string;
}

export function PageTransition({
  children,
  pathname,
  className,
}: PageTransitionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("flex flex-1 flex-col", className)}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      className={cn("flex flex-1 flex-col relative", className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: EASINGS.premium,
      }}
    >
      {/* Route entrance hairline sweep at top */}
      <motion.div
        key={`sweep-${pathname}`}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-[#3026B3] via-[#00B8D9] to-[#F54900] origin-left"
        initial={{ scaleX: 0, opacity: 0.8 }}
        animate={{ scaleX: 1, opacity: [0.8, 1, 0] }}
        transition={{ duration: 0.5, ease: EASINGS.premium }}
      />
      {children}
    </motion.div>
  );
}
