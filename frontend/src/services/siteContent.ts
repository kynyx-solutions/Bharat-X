import { useSyncExternalStore } from "react";
import { restGet } from "./supabase";

/**
 * Homepage content edited in the admin dashboard (Supabase table `settings`, key "home").
 * Everything is optional: whatever isn't set falls back to the built-in content in the components.
 */
export interface StatItem {
  value: string;
  label: string;
  color: string;
}

export interface HomeContent {
  /** Per hero slide id (HomeHeroSection heroSlides) */
  heroSlides?: Record<string, { image?: string; tagline?: string }>;
  /** Per core vertical id (BusinessEcosystemGrid verticals) */
  verticals?: Record<string, { image?: string }>;
  /** Replaces the whole stats ticker when set */
  stats?: StatItem[];
}

const CACHE_KEY = "bx-home-content";

/*
 * The last content seen is kept in localStorage, so a returning visitor's first paint already uses the
 * dashboard's images and numbers instead of flashing the built-in ones first.
 */
function readCache(): HomeContent | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as HomeContent) : null;
  } catch {
    return null;
  }
}

let content: HomeContent | null = typeof window === "undefined" ? null : readCache();
let started = false;
const listeners = new Set<() => void>();

function load() {
  if (started) return;
  started = true;
  void restGet<{ value: HomeContent }[]>("settings?key=eq.home&select=value").then((rows) => {
    if (!rows) return; // not configured or offline: keep built-in / cached content
    const next = rows[0]?.value ?? {};
    content = next;
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: fine */
    }
    listeners.forEach((l) => l());
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  load();
  return () => listeners.delete(listener);
}

/** Homepage overrides from the dashboard, or null until/unless there are any. */
export function useHomeContent(): HomeContent | null {
  return useSyncExternalStore(subscribe, () => content, () => null);
}
