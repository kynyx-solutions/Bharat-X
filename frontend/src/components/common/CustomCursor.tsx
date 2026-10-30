import { useEffect, useRef, useState, useCallback } from "react";

type CursorState = "default" | "text" | "button" | "card" | "link" | "image";

const CURSOR_COLORS: Record<CursorState, string> = {
  default: "#163A7A",
  text:    "#F54900",
  button:  "#15966B",
  card:    "#00B8D9",
  link:    "#F54900",
  image:   "#0F2A5C",
};

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos    = useRef({ x: -200, y: -200 });
  const ring   = useRef({ x: -200, y: -200 });
  const raf    = useRef<number>(0);
  const state  = useRef<CursorState>("default");

  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible,   setIsVisible]   = useState(false);

  /* ── Smooth ring animation loop ─────────────────────────────── */
  const tick = useCallback(() => {
    const ease = 0.12;
    ring.current.x += (pos.current.x - ring.current.x) * ease;
    ring.current.y += (pos.current.y - ring.current.y) * ease;

    if (ringRef.current) {
      ringRef.current.style.transform =
        `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);

  /* ── Mouse tracking ──────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible]);

  /* ── Hover target detection ──────────────────────────────────── */
  useEffect(() => {
    const detect = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      let next: CursorState = "default";

      if (el.closest("button") || el.closest("[data-cursor='button']")) {
        next = "button";
      } else if (el.closest("a[href]")) {
        next = "link";
      } else if (el.closest("[data-cursor='card']") || el.closest(".cursor-card")) {
        next = "card";
      } else if (el.closest("img") || el.closest("[data-cursor='image']")) {
        next = "image";
      } else if (el.closest("h1,h2,h3,h4,h5,h6,p")) {
        next = "text";
      }

      if (next !== state.current) {
        state.current = next;
        setCursorState(next);
      }
    };

    window.addEventListener("mousemove", detect, { passive: true });
    return () => window.removeEventListener("mousemove", detect);
  }, []);

  const color    = CURSOR_COLORS[cursorState];
  const isButton = cursorState === "button";
  const isCard   = cursorState === "card";
  const isText   = cursorState === "text";

  return (
    <>
      {/* Fast-snapping dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          zIndex:        99999,
          pointerEvents: "none",
          width:         isButton ? "10px" : "7px",
          height:        isButton ? "10px" : "7px",
          borderRadius:  "50%",
          backgroundColor: color,
          opacity:       isVisible ? 1 : 0,
          transition:    "width 0.2s, height 0.2s, background-color 0.25s, opacity 0.3s",
          willChange:    "transform",
        }}
      />

      {/* Smooth lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          zIndex:          99998,
          pointerEvents:   "none",
          width:           isButton ? "52px" : isCard ? "60px" : isText ? "44px" : "36px",
          height:          isButton ? "52px" : isCard ? "60px" : isText ? "44px" : "36px",
          borderRadius:    "50%",
          border:          `1.5px solid ${color}`,
          backgroundColor: isButton
            ? `${color}18`
            : isCard
            ? `${color}12`
            : "transparent",
          opacity:       isVisible ? (isButton || isCard ? 0.85 : 0.65) : 0,
          transition:    "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background-color 0.3s, opacity 0.3s",
          willChange:    "transform",
          backdropFilter: isButton || isCard ? "blur(2px)" : "none",
        }}
      />
    </>
  );
}
