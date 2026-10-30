import { useReducedMotion, motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { TiltCard } from "../three/TiltCard";
import { SpotlightCard } from "./SpotlightCard";

export type HoverCardVariant =
  | "lift"
  | "tilt"
  | "spotlight"
  | "border-glow"
  | "image-zoom"
  | "shine"
  | "scale";

export type HoverGlowColor = "indigo" | "gold" | "cyan";

export interface HoverCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: ReactNode;
  variant?: HoverCardVariant;
  glowColor?: HoverGlowColor;
  className?: string;
  maxTilt?: number;
}

export function HoverCard({
  children,
  variant = "lift",
  glowColor = "indigo",
  className,
  maxTilt = 6,
  ...props
}: HoverCardProps) {
  const reduced = useReducedMotion();

  const glowClass = {
    indigo: "fx-lift-glow-indigo",
    gold: "fx-lift-glow-gold",
    cyan: "fx-lift-glow-cyan",
  }[glowColor];

  if (reduced) {
    return (
      <div className={cn("rounded-2xl", className)} data-cursor="card" {...props}>
        {children}
      </div>
    );
  }

  if (variant === "tilt") {
    return (
      <TiltCard
        maxTilt={maxTilt}
        data-cursor="card"
        className={cn(
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A]",
          className
        )}
        {...props}
      >
        {children}
      </TiltCard>
    );
  }

  if (variant === "spotlight") {
    const spotlightColors = {
      indigo: "rgba(22, 58, 122, 0.14)",
      gold: "rgba(245, 73, 0, 0.16)",
      cyan: "rgba(0, 184, 217, 0.14)",
    };
    return (
      <SpotlightCard
        spotlightColor={spotlightColors[glowColor]}
        data-cursor="card"
        className={cn(
          "fx-lift focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A]",
          className
        )}
        {...props}
      >
        {children}
      </SpotlightCard>
    );
  }

  const variantClasses = {
    lift: glowClass,
    "border-glow": cn("fx-border-draw fx-lift", glowClass),
    "image-zoom": "fx-zoom-img fx-lift",
    shine: "fx-shine fx-lift",
    scale: "cursor-card",
  }[variant];

  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      data-cursor="card"
      data-motion="true"
      className={cn(
        "group/card transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A]",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
