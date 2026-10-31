import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { trackPageView } from "../../services/analytics";
import { useLenis } from "../scroll/SmoothScrollProvider";
import { WhatsAppButton } from "../common/WhatsAppButton";
import { ScrollProgress } from "../common/ScrollProgress";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Preloader } from "./Preloader";
import { PageTransition } from "../motion/PageTransition";

export function Layout() {
  const location = useLocation();
  const { scrollTo } = useLenis();

  // Reset scroll on navigation or scroll smoothly to hash target
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          scrollTo(el, { offset: -80 });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      scrollTo(0, { immediate: true });
    }
    trackPageView(location.pathname);
  }, [location.pathname, location.hash, scrollTo]);

  return (
    <div className="relative min-h-screen bg-night-950 text-ink-100">
      {/* ── Static Global Background (Fixed across entire site) ── */}
      <div aria-hidden="true" className="global-static-bg">
        <div className="global-static-bg-image" />
        <div className="global-static-bg-aurora" />
        <div className="global-static-bg-vignette" />
        <div className="global-static-bg-gradient" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Preloader />
        <ScrollProgress />
        <Navbar />
        {/*
          Pages load on demand (routes/index.tsx). This boundary sits above the page transition so that navigating
          keeps the current page on screen until the next one is ready; only a first visit straight to a page that
          isn't loaded yet shows the fallback, which holds the footer below the fold.
        */}
        <Suspense fallback={<div className="flex-1 min-h-screen" />}>
          {/* Full route transition with enter & exit and route sweep */}
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname} pathname={location.pathname}>
              <div className="flex-1">
                <Outlet />
              </div>
            </PageTransition>
          </AnimatePresence>
        </Suspense>
        {/* {location.pathname !== "/" && <FooterCTA />} */}
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
