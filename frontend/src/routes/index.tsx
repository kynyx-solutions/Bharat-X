import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";
import CareersPage from "../pages/CareersPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import ImpactPage from "../pages/ImpactPage";
import IndustriesPage from "../pages/IndustriesPage";
import HowWeBuildPage from "../pages/HowWeBuildPage";
import InnovationPage from "../pages/InnovationPage";
import InsightsPage from "../pages/InsightsPage";
import LeadershipPage from "../pages/LeadershipPage";
import NotFoundPage from "../pages/NotFoundPage";
import PartnershipsPage from "../pages/PartnershipsPage";
import PrivacyPage from "../pages/PrivacyPage";
import ServicesPage from "../pages/ServicesPage";
import TermsPage from "../pages/TermsPage";

/** Old /services URLs (incl. #section anchors) forward to /verticals. */
function ServicesRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: "/verticals", search, hash }} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout renders <Outlet> via children — see Layout usage in App.tsx */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="how-we-build" element={<HowWeBuildPage />} />
        <Route path="verticals" element={<ServicesPage />} />
        <Route path="services" element={<ServicesRedirect />} />
        <Route path="businesses" element={<ServicesPage />} />
        <Route path="companies" element={<Navigate to="/verticals" replace />} />
        <Route path="companies/:slug" element={<Navigate to="/verticals" replace />} />
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
