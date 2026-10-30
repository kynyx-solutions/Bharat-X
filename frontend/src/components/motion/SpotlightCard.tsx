import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
} from "react";
import { cn } from "../../utils/cn";

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightRadius?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(22, 58, 122, 0.12)",
  spotlightRadius = 380,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -500, y: -500, active: false });

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType !== "mouse" || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x, y, active: true });
      });
      onPointerMove?.(e);
    },
    [reduced, onPointerMove],
  );

  const handlePointerLeave = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafRef.current);
      setPos({ x: -500, y: -500, active: false });
      onPointerLeave?.(e);
    },
    [onPointerLeave],
  );

  if (reduced) {
    return (
      <div ref={containerRef} className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor="card"
      className={cn("group/spotlight relative overflow-hidden", className)}
      style={style}
      {...props}
    >
      {/* Dynamic spotlight layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(${spotlightRadius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
