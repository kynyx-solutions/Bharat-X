import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";
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
                      className="inline-flex flex-col items-center rounded-2xl border border-[#3026B3]/40 bg-gradient-to-r from-[#211B72] via-[#3026B3] to-[#211B72] px-8 py-3.5 text-white shadow-lg transition-transform hover:scale-105 fx-glow-indigo"
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

          {/* 6 Large Visual Cards Grid */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr items-stretch lg:[&>*:last-child:nth-child(3n+1)]:col-start-2">
            {impactAreas.map((area) => (
              <StaggerItem key={area.id} className="h-full">
                <div
                  data-cursor="card"
                  className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift"
                >
                  <CardFill accent={area.accent} />
                  {/* Image Container with Visual Depth */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 shrink-0" data-cursor="image">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Sector Tag & Number */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#F54900] border border-white/20">
                        {area.number} · {area.sector}
                      </span>
                    </div>

                    {/* Logo Overlay if present */}
                    {area.logo && (
                      <div className="absolute bottom-3 left-3.5 h-7 w-auto max-w-[110px] rounded-md bg-white/95 backdrop-blur-sm px-2 py-1 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                        <img src={area.logo} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Card Body & Footer */}
                  <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div className="flex-1 flex flex-col">
                      <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-bold block mb-1 truncate text-white/90">
                        {area.entityName}
                      </span>

                      <h3 className="font-heading text-xl sm:text-2xl font-medium text-white group-hover:text-[#FF8904] transition-colors leading-snug duration-300 min-h-[3.25rem] sm:min-h-[3.75rem] flex items-start">
                        {area.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal min-h-[3.5rem] sm:min-h-[4rem]">
                        {area.description}
                      </p>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-4 pt-3.5 border-t border-white/20 flex items-center justify-between">
                      <Link
                        to={area.link}
                        data-cursor="link"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#FF8904] hover:text-white transition-colors group/link fx-underline"
                      >
                        <span>Explore Vertical</span>
                      </Link>

                      <Link
                        to={area.link}
                        aria-label={`Explore ${area.sector}`}
                        className="h-7 w-7 rounded-lg bg-white/15 ring-1 ring-white/25 text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      >
                        <Icon name="arrow-right" width={13} height={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
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

                    <h3 className="font-heading text-xl font-medium text-white group-hover:text-[#FF8904] transition-colors duration-300">
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
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("impact-cta-opportunity-ahead")} />}
        className="relative overflow-hidden bg-gradient-to-br from-[#211B72] via-[#1D1763] to-[#120E3E] text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#3026B3]/30 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
              <span>THE FUTURE OF IMPACT</span>
            </div>

            {/* Headline */}
            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              The Opportunity Ahead
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-3xl mx-auto">
              As BharatX expands into packaging, waste management, sustainability and new industrial businesses, our opportunity to create measurable impact grows with it.
            </p>

            {/* Four Focus Areas: Build | Enable | Sustain | Measure */}
            <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 text-left">
              {futureFocusAreas.map((area) => (
                <StaggerItem key={area.step}>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:border-white/30 hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent={area.accent} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold text-white/90">
                          {area.step}
                        </span>
                        <FeatureIcon
                          name={area.icon}
                          accent={area.accent}
                          size={32}
                          className="transition-transform group-hover:scale-110"
                        />
                      </div>

                      <h4 className="font-heading text-lg font-medium text-white mb-2 leading-snug group-hover:text-[#FF8904] transition-colors">
                        {area.headline}
                      </h4>

                      <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                        {area.detail}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Final CTA Action */}
            <div className="mt-14 pt-10 border-t border-white/15 max-w-2xl mx-auto">
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-white mb-6 transition-colors duration-300 hover:text-gold-400">
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
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs fx-lift"
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
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-[#F54900] font-bold">
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
