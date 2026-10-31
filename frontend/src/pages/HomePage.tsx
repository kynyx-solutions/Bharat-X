import { usePageMeta } from "../hooks/usePageMeta";
import { HomeHeroSection } from "../components/home/HomeHeroSection";
import { PartnershipsSection } from "../components/home/PartnershipsSection";
import { StatsMarquee } from "../components/home/StatsMarquee";
import { AboutBharatXSection } from "../components/home/AboutBharatXSection";
import { BusinessEcosystemGrid } from "../components/home/BusinessEcosystemGrid";
import { OurApproachSection } from "../components/home/OurApproachSection";
import { WhyBharatXSection } from "../components/home/WhyBharatXSection";
import { HomeImpactSection } from "../components/home/HomeImpactSection";
import { WhatComesNextSection } from "../components/home/WhatComesNextSection";
import { InsideBharatXSection } from "../components/home/InsideBharatXSection";
import { HomeFinalCTA } from "../components/home/HomeFinalCTA";

export default function HomePage() {
  usePageMeta({
    title: "BharatX Group — Building Businesses. Enabling Bharat.",
    description:
      "BharatX Group is a diversified Indian business group bringing together businesses, capital, technology and talent to create enduring enterprises across infrastructure, agriculture, manufacturing, technology, packaging, sustainability and venture building.",
    path: "/",
  });

  return (
    <main className="w-full bg-bx-cream text-bx-ink min-h-screen">
      {/* Hero + stats strip fill exactly one screen together (svh = the visible height on phones) */}
      <div className="flex min-h-[100svh] flex-col">
        {/* ── 01. HERO (Brand First - Retained intact as requested) ── */}
        <HomeHeroSection />

        {/* ── STATS STRIP (Group figures, scrolling ticker) ───────── */}
        <StatsMarquee />
      </div>

      {/* ── PARTNERSHIPS & PROGRAMMES (Institutions, MoUs) ─────────── */}
      {/* <PartnershipsSection /> */}

      {/* ── 02. ABOUT BHARATX — WHO WE ARE ──────────────────────── */}
      {/* <AboutBharatXSection />*/}

      {/* ── 03. OUR BUSINESSES — CORE VERTICALS ─ */}
      <BusinessEcosystemGrid />

      {/* ── 04. OUR APPROACH (Opportunity to Enterprise Flow) ───── */}
      <OurApproachSection />

      {/* ── 05. WHY BHARATX (4 Pillars + Operating Statement) ───── */}
      <WhyBharatXSection />

      {/* ── 06. IMPACT (Economic Value & Wider Impact) ───────────── */}
      <HomeImpactSection />

      {/* ── 07. BUILDING WHAT COMES NEXT (Upcoming Businesses) ───── */}
      <WhatComesNextSection />

      {/* ── 08. INSIGHTS + CAREERS (Inside BharatX Combined) ─────── */}
      <InsideBharatXSection />

      {/* ── 09. FINAL CTA (Let's Build What Comes Next) ──────────── */}
      <HomeFinalCTA />
    </main>
  );
}
