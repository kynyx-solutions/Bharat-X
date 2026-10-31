import { lazy, useEffect, type ComponentType } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import HomePage from "../pages/HomePage";

/*
 * Pages load on demand: Home ships in the main bundle (most visitors land there); every other page is its own chunk.
 * - A direct visit to another page loads that page's chunk before the app's first render (preloadFirstPage, called
 *   from main.tsx), so it appears together with the navbar, as before.
 * - Once the site has loaded, the remaining pages are fetched in the background (usePrefetchPages).
 * - A page whose chunk is loaded renders directly; only one still downloading goes through React.lazy, and the
 *   Suspense boundary in Layout (above the page transition) keeps the current page on screen until it's ready.
 */
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const loadAndKeep = () =>
    load().then((module) => {
      Loaded = module.default;
      return module;
    });
  const Lazy = lazy(loadAndKeep);
  function Page() {
    return Loaded ? <Loaded /> : <Lazy />;
  }
  return { Page, load: loadAndKeep };
}

const pages = {
  about: lazyPage(() => import("../pages/AboutPage")),
  careers: lazyPage(() => import("../pages/CareersPage")),
  contact: lazyPage(() => import("../pages/ContactPage")),
  impact: lazyPage(() => import("../pages/ImpactPage")),
  industries: lazyPage(() => import("../pages/IndustriesPage")),
  "how-we-build": lazyPage(() => import("../pages/HowWeBuildPage")),
  innovation: lazyPage(() => import("../pages/InnovationPage")),
  insights: lazyPage(() => import("../pages/InsightsPage")),
  leadership: lazyPage(() => import("../pages/LeadershipPage")),
  notFound: lazyPage(() => import("../pages/NotFoundPage")),
  partnerships: lazyPage(() => import("../pages/PartnershipsPage")),
  privacy: lazyPage(() => import("../pages/PrivacyPage")),
  verticals: lazyPage(() => import("../pages/ServicesPage")),
  terms: lazyPage(() => import("../pages/TermsPage")),
  businessDetail: lazyPage(() => import("../pages/BusinessDetailPage")),
};

const AboutPage = pages.about.Page;
const CareersPage = pages.careers.Page;
const ContactPage = pages.contact.Page;
const ImpactPage = pages.impact.Page;
const IndustriesPage = pages.industries.Page;
const HowWeBuildPage = pages["how-we-build"].Page;
const InnovationPage = pages.innovation.Page;
const InsightsPage = pages.insights.Page;
const LeadershipPage = pages.leadership.Page;
const NotFoundPage = pages.notFound.Page;
const PartnershipsPage = pages.partnerships.Page;
const PrivacyPage = pages.privacy.Page;
const ServicesPage = pages.verticals.Page;
const TermsPage = pages.terms.Page;
const BusinessDetailPage = pages.businessDetail.Page;

/** Old /companies/:slug links go to the business detail page (casters-global was BharatX Engineering's old slug). */
function CompanyRedirect() {
  const { slug } = useParams();
  const target = slug === "casters-global" ? "bharatx-engineering" : slug;
  return <Navigate to={target ? `/verticals/${target}` : "/verticals"} replace />;
}

/** First URL segment → the page that renders it (redirecting URLs end up on the Businesses page). */
const pageForSegment: Record<string, keyof typeof pages> = {
  businesses: "verticals",
  services: "verticals",
  companies: "verticals",
  "bharatx-labs": "verticals",
  ecosystem: "verticals",
};

/** Load the page for the URL being opened, so the first render shows it straight away. Home needs nothing. */
export function preloadFirstPage(): Promise<unknown> {
  const [, segment = "", detail] = window.location.pathname.split("/");
  if (!segment) return Promise.resolve();
  // /verticals/<slug> and the old /companies/<slug> show a business detail page
  if ((segment === "verticals" || segment === "companies") && detail) return pages.businessDetail.load();
  const key = pageForSegment[segment] ?? (segment in pages && segment !== "notFound" ? (segment as keyof typeof pages) : "notFound");
  return pages[key].load();
}

/** Once the site has loaded, fetch the remaining pages in the background. */
function usePrefetchPages() {
  useEffect(() => {
    const prefetch = () => Object.values(pages).forEach((page) => void page.load());
    // Safari has no requestIdleCallback
    const whenIdle = () => (typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(prefetch) : window.setTimeout(prefetch, 1));
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
  }, []);
}

/** Old /services URLs (incl. #section anchors) forward to /verticals. */
function ServicesRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: "/verticals", search, hash }} replace />;
}

export function AppRoutes() {
  usePrefetchPages();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout renders <Outlet> via children — see Layout usage in App.tsx */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="how-we-build" element={<HowWeBuildPage />} />
        <Route path="verticals" element={<ServicesPage />} />
        <Route path="verticals/:slug" element={<BusinessDetailPage />} />
        <Route path="services" element={<ServicesRedirect />} />
        <Route path="businesses" element={<ServicesPage />} />
        <Route path="companies" element={<Navigate to="/verticals" replace />} />
        <Route path="companies/:slug" element={<CompanyRedirect />} />
        <Route path="bharatx-labs" element={<Navigate to="/verticals" replace />} />
        <Route path="ecosystem" element={<Navigate to="/verticals" replace />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="innovation" element={<InnovationPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="partnerships" element={<PartnershipsPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
