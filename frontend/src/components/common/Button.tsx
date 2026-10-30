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
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A] focus-visible:ring-offset-2 active:scale-[0.97]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "fx-shine bg-[#163A7A] text-white font-semibold shadow-md shadow-[#163A7A]/25 hover:bg-[#0F2A5C] hover:shadow-[0_8px_30px_-4px_rgba(22, 58, 122,0.4)] dark:bg-[#F54900] dark:text-[#111827] dark:hover:bg-[#ca3500] dark:hover:shadow-[0_8px_35px_-4px_rgba(245,73,0,0.5)]",
  secondary:
    "border border-[#E3E5EF] bg-white text-[#111827] font-semibold shadow-sm hover:border-[#163A7A] hover:text-[#163A7A] hover:shadow-md dark:border-white/20 dark:bg-white/[0.08] dark:text-white dark:hover:border-[#F54900] dark:hover:text-[#F54900] dark:hover:bg-white/[0.12]",
  teal: "fx-shine bg-[#00B8D9] text-white font-semibold shadow-md shadow-[#00B8D9]/25 hover:bg-[#009eb8] hover:shadow-[0_8px_30px_-4px_rgba(0,184,217,0.4)] dark:bg-[#00B8D9] dark:text-white dark:hover:bg-[#00c9ec]",
  ghost:
    "border border-[#E3E5EF] bg-white/80 text-[#596579] backdrop-blur-sm shadow-sm hover:border-[#163A7A] hover:text-[#111827] hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-ink-200 dark:hover:border-[#F54900] dark:hover:text-white",
  ember:
    "bg-[#F54900] text-[#111827] font-semibold shadow-md shadow-[#F54900]/25 hover:bg-[#ca3500] hover:shadow-[0_8px_30px_-4px_rgba(245,73,0,0.4)] dark:bg-[#F54900] dark:text-[#111827] dark:hover:bg-[#ffd054]",
  paper:
    "bg-[#111827] text-white font-semibold shadow-md hover:bg-[#0F2A5C] hover:shadow-lg dark:bg-[#FAF9F6] dark:text-[#111827] dark:hover:bg-white",
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
