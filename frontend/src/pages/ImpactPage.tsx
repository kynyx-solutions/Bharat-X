import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { DuotoneIcon, Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, cardImage, solidTextColours } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

interface ImpactArea {
  id: string;
  number: string;
  sector: string;
  title: string;
  description: string;
  entityName: string;
  logo?: string;
  image: string;
  accent: string;
  link: string;
}

const impactAreas: ImpactArea[] = [
  {
    id: "innovation",
    number: "01",
    sector: "Innovation",
    title: "Turning Research Into New Ventures",
    description:
      "Through BharatX Labs, we back research, experimentation and entrepreneurship that can grow into the next generation of Indian businesses.",
    entityName: "BharatX Labs",
    logo: "/Bharatxlabs_logo.svg",
    image: "/assets/backgrounds/innovation-story.jpg",
    accent: "#0D9488",
    link: "/verticals#labs",
  },
  {
    id: "agriculture",
    number: "02",
    sector: "Agriculture",
    title: "Creating Value From India’s Agriculture",
    description:
      "Through processing, value addition and global trade, BharatX Agro aims to strengthen agricultural value chains and connect Indian products with wider markets.",
    entityName: "BharatX Agro",
    logo: "/Bharatxagro_logo.png",
    image: "/assets/backgrounds/agri-dusk.jpg",
    accent: "#15966B",
    link: "/verticals#agriculture",
  },
  {
    id: "infrastructure",
    number: "03",
    sector: "Infrastructure",
    title: "Building the Foundations of Growth",
    description:
      "Through infrastructure and engineering, BharatX contributes to the physical assets that enable communities, businesses and economies to grow.",
    entityName: "BharatX Infratech",
    logo: "/Infra_logo1.png",
    image: "/companies/bharatx-infratech/hero.jpg",
    accent: "#3026B3",
    link: "/verticals#infrastructure",
  },
  {
    id: "people",
    number: "04",
    sector: "People & Education",
    title: "Investing in Human Potential",
    description:
      "Through BharatX Foundation and the wider Group ecosystem, we aim to support education, skills and opportunity.",
    entityName: "BharatX Foundation",
    image: "/assets/backgrounds/impact-story.jpg",
    accent: "#F54900",
    link: "/verticals#foundation",
  },
  {
    id: "technology",
    number: "05",
    sector: "Technology",
    title: "Making Businesses Smarter",
    description:
      "AI, automation and digital technologies can improve productivity, decision-making and access to new capabilities.",
    entityName: "Aixperts Labs",
    logo: "/Ai-Experts_logo.png",
    image: "/companies/aixperts-labs/hero.jpg",
    accent: "#4B40D4",
    link: "/verticals#tech-ai",
  },
  {
    id: "sustainability",
    number: "06",
    sector: "Sustainability",
    title: "Turning Waste Into Opportunity",
    description:
      "Our sustainability initiatives focus on better waste management, resource recovery, recycling and the development of circular business models.",
    entityName: "BharatX Sustainability",
    image: "/assets/backgrounds/sustainability-story.jpg",
    accent: "#059669",
    link: "/verticals#sustainability",
  },
  {
    id: "manufacturing",
    number: "07",
    sector: "Manufacturing",
    title: "Strengthening Industrial Capability",
    description:
      "Our manufacturing businesses contribute to India’s industrial ecosystem by developing products, engineering capabilities and domestic production capacity.",
    entityName: "BharatX Engineering",
    logo: "/Casters_logo.png",
    image: "/companies/casters-global/hero.jpg",
    accent: "#00B8D9",
    link: "/verticals#manufacturing",
  },
];

/** Grid placement for the seven impactAreas cards, in order (see the Where We Create Impact section). */
const AREA_LAYOUT = [
  "md:col-span-2 lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

const commitmentPrinciples: { title: string; description: string; icon: string; accent: string; image: string }[] = [
  {
    title: "Economic Value",
    description: "Build businesses that generate sustainable economic activity.",
    icon: "landmark",
    accent: "#3026B3",
    image: cardImage("impact-08-commitment-economic-value"),
  },
  {
    title: "Employment & Skills",
    description: "Create meaningful opportunities and develop capable teams.",
    icon: "users",
    accent: "#15966B",
    image: cardImage("impact-09-commitment-employment-skills"),
  },
  {
    title: "Innovation",
    description: "Use technology and entrepreneurship to solve real problems.",
    icon: "cpu",
    accent: "#00B8D9",
    image: cardImage("impact-10-commitment-innovation"),
  },
  {
    title: "Sustainability",
    description: "Improve resource efficiency and support more circular business models.",
    icon: "recycle",
    accent: "#059669",
    image: cardImage("impact-11-commitment-sustainability"),
  },
];

const futureFocusAreas: { step: string; headline: string; detail: string; icon: string; accent: string }[] = [
  {
    step: "BUILD",
    headline: "Create businesses that solve meaningful problems.",
    detail: "Targeting high-friction structural deficits across physical and industrial supply lines.",
    icon: "hard-hat",
    accent: "#3026B3",
  },
  {
    step: "ENABLE",
    headline: "Create jobs, capabilities and opportunities.",
    detail: "Equipping grassroots producers, industrial trades, and engineering specialists across Bharat.",
    icon: "trending-up",
    accent: "#F54900",
  },
  {
    step: "SUSTAIN",
    headline: "Build more efficient and responsible systems.",
    detail: "Integrating low-carbon materials, resource recovery, and zero-effluent manufacturing standards.",
    icon: "sparkles",
    accent: "#15966B",
  },
  {
    step: "MEASURE",
    headline: "Hold every business to measurable outcomes.",
    detail: "Tracking jobs created, resources saved and value generated, and reporting progress openly.",
    icon: "gauge",
    accent: "#00B8D9",
  },
];

export default function ImpactPage() {
  usePageMeta({
    title: "BharatX Group Impact | Building Economic & Social Value",
    description:
      "Explore how BharatX Group creates economic, social and environmental impact through infrastructure, agriculture, manufacturing, technology, sustainability and entrepreneurship.",
    path: "/impact",
  });

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (Building Businesses. Creating Wider Value.) ─────────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed authentic hero background image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/backgrounds/impact_hero.png"
            alt="BharatX Infrastructure, Agriculture, Industry and People"
            className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.10] animate-hero-zoom"
            data-cursor="image"
          />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <div>
            {/* H1 Headline — single line from lg up */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,3.9vw,3.5rem)] lg:whitespace-nowrap font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] cursor-text"
              data-cursor="text"
            >
              From Opportunity to{" "}
              <span className="text-[#F54900] transition-colors duration-300">Impact.</span>
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  to="#impact-areas"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("impact-areas")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Explore Impact Areas</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <Link
                to="/verticals"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>Our Businesses</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. OUR IMPACT PHILOSOPHY (Growth Should Create More Than Profit.) ── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs mb-4 hover:border-[#15966B] transition-colors">
                <span className="h-2 w-2 rounded-full bg-[#15966B]" />
                <span>OUR IMPACT PHILOSOPHY</span>
              </div>

              <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
                Growth Should Create <span className="text-[#3026B3]">More Than Profit.</span>
              </AnimatedHeading>

              <p className="mt-6 text-base sm:text-lg text-[#596579] leading-relaxed font-normal">
                We believe successful businesses should strengthen the ecosystems around them.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#111827] font-medium leading-relaxed">
                Our businesses contribute to economic development through infrastructure, employment, manufacturing, agricultural value chains, technology adoption and more responsible use of resources.
              </p>
            </div>

            {/* Visual Formula: BUSINESS GROWTH -> ECONOMY | PEOPLE | ENVIRONMENT */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-[#FAF9F6] p-7 sm:p-9 shadow-lg fx-lift">
                <CardFill accent="#3026B3" tone="tint" />
                <div className="relative">
                  {/* Root: BUSINESS GROWTH */}
                  <div className="text-center">
                    <div
                      data-cursor="card"
                      className="inline-flex flex-col items-center rounded-2xl border border-[#163A7A]/40 bg-gradient-to-r from-[#0B1F47] via-[#163A7A] to-[#0B1F47] px-8 py-3.5 text-white shadow-lg transition-transform hover:scale-105 fx-glow-indigo"
                    >
                      <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold">
                        FOUNDATIONAL CATALYST
                      </span>
                      <span className="font-heading text-xl sm:text-2xl font-medium tracking-tight mt-0.5">
                        BUSINESS GROWTH
                      </span>
                    </div>
                  </div>

                  {/* Downward Connector */}
                  <div className="my-5 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3026B3] text-white shadow-md animate-bounce">
                      <Icon name="arrow-right" width={14} height={14} className="rotate-90" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* 3 Outcome Pillars: ECONOMY | PEOPLE | ENVIRONMENT */}
                  <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Economy */}
                    <StaggerItem>
                      <div data-cursor="card" className="group rounded-2xl border border-[#3026B3]/25 border-t-4 border-t-[#3026B3] p-4 text-center shadow-xs transition-all duration-300 hover:border-[#3026B3] fx-lift h-full" style={{ backgroundColor: "color-mix(in srgb, #3026B3 9%, white)" }}>
                        <FeatureIcon
                          name="landmark"
                          accent="#3026B3"
                          size={32}
                          className="mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#3026B3] block">
                          ECONOMY
                        </span>
                        <ul className="mt-3 space-y-1.5 text-xs sm:text-[13px] text-[#374151]">
                          <li className="font-medium text-[#111827]">Jobs</li>
                          <li className="font-medium text-[#111827]">Enterprises</li>
                          <li className="font-medium text-[#111827]">Infrastructure</li>
                        </ul>
                      </div>
                    </StaggerItem>

                    {/* People */}
                    <StaggerItem>
                      <div data-cursor="card" className="group rounded-2xl border border-[#15966B]/25 border-t-4 border-t-[#15966B] p-4 text-center shadow-xs transition-all duration-300 hover:border-[#15966B] fx-lift h-full" style={{ backgroundColor: "color-mix(in srgb, #15966B 9%, white)" }}>
                        <FeatureIcon
                          name="users"
                          accent="#15966B"
                          size={32}
                          className="mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#15966B] block">
                          PEOPLE
                        </span>
                        <ul className="mt-3 space-y-1.5 text-xs sm:text-[13px] text-[#374151]">
                          <li className="font-medium text-[#111827]">Skills</li>
                          <li className="font-medium text-[#111827]">Opportunity</li>
                          <li className="font-medium text-[#111827]">Inclusion</li>
                        </ul>
                      </div>
                    </StaggerItem>

                    {/* Environment */}
                    <StaggerItem>
                      <div data-cursor="card" className="group rounded-2xl border border-[#00B8D9]/25 border-t-4 border-t-[#00B8D9] p-4 text-center shadow-xs transition-all duration-300 hover:border-[#00B8D9] fx-lift h-full" style={{ backgroundColor: "color-mix(in srgb, #00B8D9 9%, white)" }}>
                        <FeatureIcon
                          name="recycle"
                          accent="#00B8D9"
                          size={32}
                          className="mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#008299] block">
                          ENVIRONMENT
                        </span>
                        <ul className="mt-3 space-y-1.5 text-xs sm:text-[13px] text-[#374151]">
                          <li className="font-medium text-[#111827]">Resource Efficiency</li>
                          <li className="font-medium text-[#111827]">Circularity</li>
                          <li className="font-medium text-[#111827]">Low-Carbon Systems</li>
                        </ul>
                      </div>
                    </StaggerItem>
                  </Stagger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 03. WHERE WE CREATE IMPACT (Impact Across the Economy — 6 Large Cards) ── */}
      <SectionTransition id="impact-areas" className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>WHERE WE CREATE IMPACT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Impact Across the <span className="text-[#3026B3]">Economy</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed">
              Key foundational domains where BharatX businesses drive economic capabilities, industrial sovereignty, and societal uplift.
            </p>
          </div>

          {/*
            Bento grid of photo-first cards: the photo fills the card, with only a slim frosted strip (sector, title, arrow)
            at the bottom. Desktop: two rows on 12 columns, a wide feature card and two medium cards (6+3+3), then four
            even cards (3+3+3+3). Tablet: the feature card spans both columns so the other six pair up. AREA_LAYOUT
            assumes the seven impactAreas.
          */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {impactAreas.map((area, i) => {
              const isFeature = i === 0;
              // The accent darkened enough for small text on the light panel (4.5:1)
              const accentText = solidTextColours(area.accent).deep;

              return (
                <StaggerItem key={area.id} className={cn("h-full", AREA_LAYOUT[i])}>
                  <Link
                    to={area.link}
                    data-cursor="card"
                    aria-label={`${area.title}: explore ${area.entityName}`}
                    className={cn(
                      "group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-[#0B1F47] p-3 shadow-sm transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-26px_rgba(11,31,71,0.6)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F54900] focus-visible:ring-offset-2",
                      i < 3 ? "lg:min-h-[400px]" : "lg:min-h-[340px]",
                    )}
                  >
                    {/* Full-bleed photo; slow zoom on hover */}
                    <img
                      src={area.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/45 to-transparent" />

                    {/* Top: large number and the company logo (or its name, where there's no logo) */}
                    <div className="relative flex items-start justify-between gap-3 p-2">
                      <span className="font-heading text-4xl font-medium leading-none tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                        {area.number}
                      </span>
                      <span className="flex h-10 items-center rounded-xl bg-white/95 px-2.5 shadow-md backdrop-blur-sm">
                        {area.logo ? (
                          // h-7 w-auto: the Labs SVG has no built-in size, so it needs a set height to get a width
                          <img src={area.logo} alt={`${area.entityName} logo`} className="h-7 w-auto max-w-[88px] object-contain" />
                        ) : (
                          <span className="whitespace-nowrap text-[11px] font-semibold text-[#0B1F47]">{area.entityName}</span>
                        )}
                      </span>
                    </div>

                    {/* Slim frosted strip: sector, title and an arrow that fills navy on hover */}
                    <div
                      className={cn(
                        "relative flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3.5 shadow-lg ring-1 ring-white/70 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-0.5",
                        isFeature && "lg:max-w-[440px] lg:px-5 lg:py-4",
                      )}
                    >
                      <div className="min-w-0">
                        <span className="block font-sans text-[10.5px] font-bold uppercase tracking-[0.18em]" style={{ color: accentText }}>
                          {area.sector}
                        </span>
                        <h3 className={cn("mt-1 font-heading font-medium leading-snug tracking-tight text-[#0B1F47]", isFeature ? "text-xl sm:text-2xl" : "text-lg")}>
                          {area.title}
                        </h3>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0B1F47]/15 text-[#0B1F47] transition-all duration-300 group-hover:border-[#0B1F47] group-hover:bg-[#0B1F47] group-hover:text-white">
                        <Icon name="arrow-up-right" width={15} height={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 04. IMPACT IN NUMBERS (Our Growing Footprint — Measuring What Matters) ── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#008299] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00B8D9]" />
              <span>IMPACT IN NUMBERS</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Our Growing <span className="text-[#3026B3]">Footprint</span>
            </AnimatedHeading>

            <p className="mt-2 font-heading text-xl sm:text-2xl text-[#3026B3] font-medium">
              Measuring What Matters
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              As the BharatX ecosystem grows, we are building a transparent framework to measure our economic, social and environmental contribution.
            </p>
          </div>

          {/* Clean 6-metric Framework Band */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#3026B3]/25 border-t-4 border-t-[#3026B3] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #3026B3 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#3026B3] block transition-transform duration-300 group-hover:scale-105">
                8+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                Businesses
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Operating verticals &amp; incubating platforms
              </span>
            </div>

            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#15966B]/25 border-t-4 border-t-[#15966B] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#15966B] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #15966B 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#15966B] block transition-transform duration-300 group-hover:scale-105">
                1,500+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                Jobs
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Engineers, operators, agronomists &amp; crew
              </span>
            </div>

            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#00B8D9]/25 border-t-4 border-t-[#00B8D9] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#00B8D9] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #00B8D9 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#008299] block transition-transform duration-300 group-hover:scale-105">
                50+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                Projects
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Civil works, industrial runs &amp; AI pipelines
              </span>
            </div>

            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#F54900]/25 border-t-4 border-t-[#F54900] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#F54900] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #F54900 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#CA3500] block transition-transform duration-300 group-hover:scale-105">
                14+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                Locations
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Tier-1 and Tier-2 growth corridors across India
              </span>
            </div>

            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#4B40D4]/25 border-t-4 border-t-[#4B40D4] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#4B40D4] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #4B40D4 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#4B40D4] block transition-transform duration-300 group-hover:scale-105">
                18+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                Markets
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Domestic industrial networks &amp; export ports
              </span>
            </div>

            <div
              data-cursor="card"
              className="group rounded-2xl border border-[#15966B]/25 border-t-4 border-t-[#15966B] p-6 sm:p-7 text-center transition-all duration-300 hover:border-[#15966B] hover:shadow-xl fx-lift"
              style={{ backgroundColor: "color-mix(in srgb, #15966B 9%, white)" }}
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#15966B] block transition-transform duration-300 group-hover:scale-105">
                10,000+
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-[#111827] font-semibold mt-1 block">
                People Reached
              </span>
              <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                Agrarian growers, technicians &amp; families
              </span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs text-[#596579] font-sans shadow-xs fx-lift">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Transparent telemetry &amp; validated ESG framework</span>
            </span>
          </div>
        </div>
      </SectionTransition>

      {/* ── 05. OUR COMMITMENT (Building Responsibly — Four Principles) ─────── */}
      <SectionTransition className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>OUR COMMITMENT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Building <span className="text-[#3026B3]">Responsibly</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              Our ambition is to grow responsibly while building enterprises that remain valuable for the long term.
            </p>
          </div>

          {/* 4 Concise Principles Grid */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {commitmentPrinciples.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 sm:p-7 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardPhoto src={item.image} accent={item.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={item.icon}
                      accent={item.accent}
                      size={44}
                      className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <h3 className="font-heading text-xl font-medium text-white transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative mt-5 pt-3 border-t border-white/20 font-sans text-[9.5px] uppercase tracking-wider text-white/85 [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    Commitment Standard
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 06. THE FUTURE OF IMPACT (The Opportunity Ahead & Final CTA) ─────── */}
      {/* Light by request: warm off-white, the city photo at 30% fading up from the bottom, soft glows */}
      <SectionTransition
        backdrop={
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={cardImage("impact-cta-opportunity-ahead")}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 bottom-0 h-[75%] w-full object-cover object-bottom opacity-30 [mask-image:linear-gradient(to_top,black_25%,transparent)]"
            />
            <div className="absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-[#F54900]/10 blur-[120px]" />
            <div className="absolute -bottom-24 left-[8%] h-72 w-72 rounded-full bg-[#163A7A]/10 blur-[110px]" />
          </div>
        }
        className="relative overflow-hidden bg-[#FAF9F6] text-[#111827] py-6 sm:py-9"
      >
        <div className="container-x relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#9f2d00] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
              <span>THE FUTURE OF IMPACT</span>
            </div>

            {/* Headline */}
            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-[#111827]">
              The Opportunity <span className="text-[#3026B3]">Ahead</span>
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#596579] max-w-3xl mx-auto">
              As BharatX expands into packaging, waste management, sustainability and new industrial businesses, our opportunity to create measurable impact grows with it.
            </p>

            {/*
              Four Focus Areas (Build, Enable, Sustain, Measure) as small, simple cards: white with a thin border, the step icon
              in an outlined circle, the step name and the headline. Hover: the global card rule lifts the card; the circle
              fills with the step colour, the border takes that colour and a thin line runs along the bottom. The `!` on the
              hover border beats the global rule's !important card border. Step colours are only accents; text sits on white.
            */}
            <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">
              {futureFocusAreas.map((area) => (
                <StaggerItem key={area.step} className="h-full">
                  <div
                    data-cursor="card"
                    style={
                      {
                        "--accent": area.accent,
                        // The step colour darkened enough for small text and icons on white (4.5:1)
                        "--ink": solidTextColours(area.accent).deep,
                        "--ring": `color-mix(in srgb, ${area.accent} 30%, white)`,
                      } as React.CSSProperties
                    }
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-[0_1px_2px_rgba(11,31,71,0.04),0_14px_34px_-22px_rgba(11,31,71,0.3)] hover:border-(--ring)!"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-(--ring) text-(--ink) transition-colors duration-300 group-hover:border-(--accent) group-hover:bg-(--accent) group-hover:text-white">
                      <DuotoneIcon name={area.icon} size={20} />
                    </span>

                    <span className="mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-(--ink)">
                      {area.step}
                    </span>

                    <h3 className="mt-1.5 font-heading text-lg font-medium leading-snug tracking-tight text-[#0B1F47]">
                      {area.headline}
                    </h3>

                    {/* Thin line along the bottom that runs across on hover */}
                    <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-0 bg-(--accent) transition-all duration-500 ease-out group-hover:w-full" />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Final CTA Action */}
            <div className="mt-8 pt-8 border-t border-[#E3E5EF] max-w-2xl mx-auto">
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[#111827] mb-4 transition-colors duration-300">
                Build a Better Bharat With Us.
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton strength={0.25}>
                  <Link
                    to="/contact?inquiry=partner"
                    data-cursor="button"
                    data-motion="true"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                  >
                    <span>Partner With BharatX</span>
                    <Icon
                      name="arrow-right"
                      width={16}
                      height={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </MagneticButton>

                <Link
                  to="/verticals"
                  data-cursor="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#0B1F47]/20 bg-white px-8 py-4 text-[15px] font-semibold text-[#0B1F47] transition-all duration-300 hover:border-[#0B1F47] shadow-xs fx-lift"
                >
                  <span>Explore Our Businesses</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8">
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-[#CA3500] font-bold">
                  Building Businesses. Enabling Bharat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
