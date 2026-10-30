import { motion, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface PressButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children?: ReactNode;
  shine?: boolean;
  className?: string;
}

export function PressButton({
  children,
  shine = false,
  className,
  disabled,
  ...props
}: PressButtonProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <button
        disabled={disabled}
        data-cursor="button"
        className={cn(className, shine && "fx-shine")}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { y: -1 }}
      data-cursor="button"
      data-motion="true"
      disabled={disabled}
      className={cn(
        "cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A]",
        shine && "fx-shine",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
