import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "teal" | "ghost" | "ember" | "paper";
type ButtonSize = "md" | "lg" | "sm";

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withArrow?: boolean;
  [key: string]: unknown;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-bx-navy-700 focus-visible:ring-offset-2 active:scale-[0.97]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "fx-shine bg-bx-navy-700 text-white font-semibold shadow-md shadow-bx-navy-700/25 hover:bg-bx-navy-800 hover:shadow-[0_8px_30px_-4px_rgba(22, 58, 122,0.4)] dark:bg-bx-orange dark:text-bx-ink dark:hover:bg-bx-orange-dark dark:hover:shadow-[0_8px_35px_-4px_rgba(245,73,0,0.5)]",
  secondary:
    "border border-bx-line bg-white text-bx-ink font-semibold shadow-sm hover:border-bx-navy-700 hover:text-bx-navy-700 hover:shadow-md dark:border-white/20 dark:bg-white/[0.08] dark:text-white dark:hover:border-bx-orange dark:hover:text-bx-orange dark:hover:bg-white/[0.12]",
  teal: "fx-shine bg-bx-cyan text-white font-semibold shadow-md shadow-bx-cyan/25 hover:bg-bx-cyan-mid hover:shadow-[0_8px_30px_-4px_rgba(0,184,217,0.4)] dark:bg-bx-cyan dark:text-white dark:hover:bg-bx-cyan-bright",
  ghost:
    "border border-bx-line bg-white/80 text-bx-slate backdrop-blur-sm shadow-sm hover:border-bx-navy-700 hover:text-bx-ink hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-ink-200 dark:hover:border-bx-orange dark:hover:text-white",
  ember:
    "bg-bx-orange text-bx-ink font-semibold shadow-md shadow-bx-orange/25 hover:bg-bx-orange-dark hover:shadow-[0_8px_30px_-4px_rgba(245,73,0,0.4)] dark:bg-bx-orange dark:text-bx-ink dark:hover:bg-bx-gold",
  paper:
    "bg-bx-ink text-white font-semibold shadow-md hover:bg-bx-navy-800 hover:shadow-lg dark:bg-bx-cream dark:text-bx-ink dark:hover:bg-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      data-cursor="button"
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {withArrow && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </span>
    </button>
  );
}
