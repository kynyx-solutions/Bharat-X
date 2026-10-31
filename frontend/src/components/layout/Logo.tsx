import { cn } from "../../utils/cn";

/**
 * LogoMark — compact square version of the BharatX Group logo image.
 * Used in the Preloader and anywhere a small mark-only instance is needed.
 */
export function LogoMark({
  size = 30,
  className,
}: {
  size?: number;
  tone?: "gold" | "white" | "mono"; // kept for API compatibility
  className?: string;
}) {
  return (
    <img
      src="/bharatxgroup.webp"
      alt="BharatX Group"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Logo — full brand lockup using the new bharatxgroup.png asset.
 * Renders the image at a fixed height so it scales naturally on all backgrounds.
 */
export function Logo({
  className,
  markSize = 30,
  tone,        // kept for API compatibility
  compact = false,
}: {
  className?: string;
  markSize?: number;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const height = compact ? markSize : markSize + 10;

  return (
    <span className={cn("inline-flex items-center group/logo transition-transform duration-300 hover:scale-[1.03] select-none", className)}>
      <img
        src="/bharatxgroup.webp"
        alt="BharatX Group"
        className="object-contain w-auto transition-all duration-300 group-hover/logo:brightness-105"
        style={{ height }}
      />
    </span>
  );
}
