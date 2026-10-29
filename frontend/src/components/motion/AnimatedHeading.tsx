import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ElementType, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { EASINGS, DURATIONS } from "./variants";

export type HeadingEffect =
  | "mask"
  | "words"
  | "chars"
  | "gradient"
  | "underline"
  | "blur"
  | "fadeUp";

export type HeadingHover =
  | "color"
  | "shift"
  | "tracking"
  | "underline"
  | "gradient"
  | "none";

export interface AnimatedHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  effect?: HeadingEffect;
  hover?: HeadingHover;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export function AnimatedHeading({
  children,
  as: Component = "h2",
  effect = "fadeUp",
  hover = "color",
  className,
  delay = 0,
  immediate = false,
}: AnimatedHeadingProps) {
  const reduced = useReducedMotion();

  const hoverClass = {
    color: "", // Handled by the global CSS rule, which only turns h1s (hero titles) orange on hover
    shift: "hover:translate-x-1 transition-transform duration-300",
    tracking: "fx-tracking",
    underline: "fx-underline",
    gradient: "fx-gradient-text",
    none: "",
  }[hover];

  if (reduced) {
    const Tag = Component;
    return <Tag className={cn(className, hoverClass)}>{children}</Tag>;
  }

  // Effect: Line-mask reveal
  // The heading (not the clipped inner span) watches the viewport: a span that starts pushed out of its
  // overflow-hidden box never counts as "in view", so it would never animate in.
  if (effect === "mask") {
    const MotionTag = motion[Component];
    return (
      <MotionTag
        className={cn("overflow-hidden", className, hoverClass)}
        initial="hidden"
        animate={immediate ? "visible" : undefined}
        whileInView={immediate ? undefined : "visible"}
        viewport={{ once: true, margin: "0px 0px 40px 0px" }}
      >
        <motion.span
          className="block will-change-transform"
          variants={{
            hidden: { y: "110%" },
            visible: { y: "0%", transition: { duration: DURATIONS.reveal, delay, ease: EASINGS.premium } },
          }}
        >
          {children}
        </motion.span>
      </MotionTag>
    );
  }

  // Effect: Blur-to-sharp reveal
  if (effect === "blur") {
    const MotionTag = motion[Component];
    return (
      <MotionTag
        initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
        animate={immediate ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
        whileInView={immediate ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "0px 0px 40px 0px" }}
        transition={{ duration: DURATIONS.reveal, delay, ease: EASINGS.premium }}
        className={cn(className, hoverClass)}
      >
        {children}
      </MotionTag>
    );
  }

  // Effect: Word-by-word fade up if children is a plain string
  // As with "mask", the heading watches the viewport and the words follow via variants.
  // Words stay in normal text flow with real spaces, so wrapped lines follow the parent's text-align.
  if (effect === "words" && typeof children === "string") {
    const words = children.split(" ");
    const MotionTag = motion[Component];
    // fx-gradient-text paints a clipped background through transparent text, but the moving word spans sit on
    // their own layers outside that clip, so they'd render invisible. Word headings keep their own text colour.
    const wordsHoverClass = hover === "gradient" ? "" : hoverClass;
    return (
      <MotionTag
        className={cn("text-balance", className, wordsHoverClass)}
        initial="hidden"
        animate={immediate ? "visible" : undefined}
        whileInView={immediate ? undefined : "visible"}
        viewport={{ once: true, margin: "0px 0px 40px 0px" }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "115%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.6, delay: delay + i * 0.045, ease: EASINGS.premium },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </MotionTag>
    );
  }

  // Default: smooth fadeUp
  const MotionTag = motion[Component];
  return (
    <MotionTag
      initial={{ opacity: 0, y: 22 }}
      animate={immediate ? { opacity: 1, y: 0 } : undefined}
      whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 40px 0px" }}
      transition={{ duration: DURATIONS.slow, delay, ease: EASINGS.premium }}
      className={cn(className, hoverClass)}
    >
      {children}
    </MotionTag>
  );
}
