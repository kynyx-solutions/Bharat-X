import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { DuotoneIcon, Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { tintOnDark } from "../components/common/CardArt";
import { CardFill, CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

interface BusinessVertical {
  id: string;
  category: string;
  name: string;
  description: string;
  status: "Active" | "Coming Soon";
  websiteUrl?: string;
  logo?: string;
  image: string;
  accent: string;
  icon: string;
}

const businessPortfolio: BusinessVertical[] = [
  {
    id: "labs",
    category: "Innovation & Research",
    name: "BharatX Labs",
    description: "Building initiatives around research, innovation and entrepreneurship that grow into new ventures.",
    status: "Coming Soon",
    logo: "/Bharatxlabs_logo.svg",
    image: "/assets/backgrounds/innovation-story.jpg",
    accent: "#0D9488",
    icon: "flask-conical",
  },
  {
    id: "ventures",
    category: "Capital & Venture Building",
    name: "BharatX Ventures",
    description: "Combining capital, strategy and execution to build and scale enterprises.",
    status: "Active",
    websiteUrl: "https://bharatx.vc",
    logo: "/Ventures_logo.png",
    image: "/companies/bharatx-ventures/hero.jpg",
    accent: "#211B72",
    icon: "landmark",
  },
  {
    id: "tech-ai",
    category: "Deep-Tech & AI",
    name: "Aixperts Labs",
    description: "Building AI, automation and digital solutions for modern businesses.",
    status: "Active",
    websiteUrl: "https://aixpertslabs.com",
    logo: "/Ai-Experts_logo.png",
    image: "/companies/aixperts-labs/hero.jpg",
    accent: "#4B40D4",
    icon: "cpu",
  },
  {
    id: "agriculture",
    category: "Agriculture & Food",
    name: "BharatX Agro",
    description: "Connecting agricultural products, value addition and Indian capabilities with global markets.",
    status: "Active",
    websiteUrl: "https://bharatxagro.com",
    logo: "/Bharatxagro_logo.png",
    image: "/assets/backgrounds/agri-dusk.jpg",
    accent: "#15966B",
    icon: "sprout",
  },
  {
    id: "infrastructure",
    category: "Infrastructure & Engineering",
    name: "BharatX Infratech",
    description: "Building infrastructure and engineering capabilities for a growing India.",
    status: "Active",
    websiteUrl: "https://bharatxinfratech.com",
    logo: "/Infra_logo1.png",
    image: "/companies/bharatx-infratech/hero.jpg",
    accent: "#3026B3",
    icon: "hard-hat",
  },
  {
    id: "foundation",
    category: "Education & Social Impact",
    name: "BharatX Foundation",
    description: "Building initiatives around education, skills and social development.",
    status: "Coming Soon",
    image: "/assets/backgrounds/impact-story.jpg",
    accent: "#F54900",
    icon: "graduation-cap",
  },
  {
    id: "manufacturing",
    category: "Industrial Manufacturing",
    name: "BharatX Engineering",
    description: "Engineering precision mobility and caster solutions for industrial applications.",
    status: "Active",
    websiteUrl: "https://castersglobal.com",
    logo: "/Casters_logo.png",
    image: "/companies/casters-global/hero.jpg",
    accent: "#00B8D9",
    icon: "cog",
  },
  {
    id: "packaging",
    category: "Packaging & Materials",
    name: "BharatX Enterprises",
    description: "Complete industrial packaging materials, corrugated boxes, protective cushioning and bulk logistics containers.",
    status: "Active",
    websiteUrl: "https://srm.kynyx.com/",
    image: "/assets/backgrounds/packaging.jpg",
    accent: "#D97706",
    icon: "boxes",
  },
  {
    id: "sustainability",
    category: "Waste Management & Sustainability",
    name: "BharatX Sustainability",
    description: "Building solutions around waste management, recycling, resource recovery and the circular economy.",
    status: "Coming Soon",
    image: "/assets/backgrounds/sustainability-story.jpg",
    accent: "#059669",
    icon: "recycle",
  },
];

const futureHorizons: { title: string; description: string; accent: string; image: string }[] = [
  {
    title: "Packaging",
    description: "Eco-conscious materials, automated barrier packaging, and supply-chain logistics containers.",
    accent: "#D97706",
    image: cardImage("services-13-horizon-packaging"),
  },
  {
    title: "Circular Economy",
    description: "Industrial waste recovery, closed-loop polymer recycling, and zero-effluent manufacturing systems.",
    accent: "#059669",
    image: cardImage("services-14-horizon-circular-economy"),
  },
  {
    title: "New Industrial Businesses",
    description: "Advanced metallurgy, automated robotics components, and high-spec sovereign civil technologies.",
    accent: "#3026B3",
    image: cardImage("services-15-horizon-new-industrial"),
  },
];

export default function ServicesPage() {
  usePageMeta({
    title: "Our Businesses | BharatX Group — Building Across India's Growth Economy",
    description:
      "BharatX Group builds and operates businesses across infrastructure, agriculture, manufacturing, technology, packaging and sustainability — supported by capital, venture building and social impact initiatives.",
    path: "/verticals",
  });

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (Our Businesses — Building Across India's Growth Economy) ── */}
      <section className="relative overflow-hidden min-h-[90vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed background panorama */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/backgrounds/business_hero.png"
            alt="India's Growth Economy and Industrial Transformation"
            className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.12] animate-hero-zoom"
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
              Building Across India’s{" "}
              <span className="text-[#F54900] transition-colors duration-300">Growth Economy.</span>
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Partner With Us</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. BUSINESS PORTFOLIO (Our Business Ecosystem — 8 Verticals Grid) ── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4 hover:border-[#3026B3] transition-colors">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>BUSINESS PORTFOLIO</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Our Business <span className="text-[#3026B3]">Ecosystem</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed">
              Nine operating verticals engineered for scale, operational autonomy, and compound value across Bharat.
            </p>
          </div>

          {/* Clean 8-Card Grid (4 cols on lg, 2 cols on md, 1 col on mobile) */}
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessPortfolio.map((biz) => {
              const isActive = biz.status === "Active";

              return (
                <StaggerItem key={biz.id}>
                  <div
                    id={biz.id}
                    data-cursor="card"
                    className="group relative scroll-mt-28 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] shadow-md transition-all duration-300 hover:border-[#3026B3] fx-lift hover:shadow-2xl h-full"
                  >
                    <CardFill accent={biz.accent} />

                    {/* Top Thumbnail Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900" data-cursor="image">
                      <img
                        src={biz.image}
                        alt={biz.name}
                        className="h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Category Tag */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-white border border-white/20">
                          <DuotoneIcon name={biz.icon} size={13} className="shrink-0 text-[#FF8904]" />
                          <span className="truncate max-w-[150px]">{biz.category}</span>
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold border backdrop-blur-md ${isActive
                            ? "bg-emerald-950/75 text-emerald-300 border-emerald-400/40"
                            : "bg-orange-950/75 text-orange-300 border-orange-400/40"
                            }`}
                        >
                          {biz.status}
                        </span>
                      </div>

                      {/* Logo Overlay if available */}
                      {biz.logo && (
                        <div className="absolute bottom-3 left-3 h-8 w-auto max-w-[110px] rounded-lg bg-white/95 backdrop-blur-sm p-1.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                          <img src={biz.logo} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="relative p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-heading text-xl sm:text-2xl font-medium text-white group-hover:text-[#FF8904] transition-colors duration-300">
                          {biz.name}
                        </h3>

                        <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                          {biz.description}
                        </p>
                      </div>

                      {/* Action Link / Status Footer */}
                      <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                        {isActive && biz.websiteUrl ? (
                          <a
                            href={biz.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="link"
                            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-white/90 hover:text-[#FF8904] transition-colors group/link fx-underline"
                          >
                            <span>Visit Website</span>
                            {/* <Icon 
                              // name="arrow-up-right"
                              // width={13}
                              // height={13}
                              // className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            // >*/}
                          </a>
                        ) : (
                          <span className="font-sans text-xs uppercase tracking-wider text-[#FF8904] font-semibold flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F54900] animate-pulse" />
                            <span>Coming Soon</span>
                          </span>
                        )}

                        <FeatureIcon
                          name={biz.icon}
                          accent={biz.accent}
                          size={28}
                          className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. HOW THEY CONNECT (Different Businesses. One Ecosystem.) ─────────── */}
      <SectionTransition className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>HOW THEY CONNECT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              Different Businesses. <span className="text-[#3026B3]">One Ecosystem.</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              Each BharatX business operates within its own market while benefiting from the wider Group’s capabilities, relationships, technology, talent and entrepreneurial ecosystem.
            </p>
          </div>

          {/* Interactive Flow Architecture: BUILD | OPERATE | INVEST -> IMPACT */}
          <div className="relative overflow-hidden max-w-4xl mx-auto rounded-3xl border border-[#E3E5EF] bg-white p-7 sm:p-12 shadow-xl fx-lift">
            <CardFill accent="#3026B3" tone="tint" />
            <div className="relative">
              {/* Top Root: BHARATX GROUP */}
              <div className="flex flex-col items-center text-center">
                <div
                  data-cursor="card"
                  className="inline-flex flex-col items-center rounded-2xl border border-[#163A7A]/40 bg-gradient-to-r from-[#0B1F47] via-[#163A7A] to-[#0B1F47] px-8 py-4 text-white shadow-xl transition-all duration-300 hover:scale-105 fx-glow-indigo"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold">
                    THE ECOSYSTEM CORE
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl font-medium tracking-tight mt-0.5">
                    BHARATX GROUP
                  </span>
                </div>
                <div className="h-8 w-px bg-[#3026B3]/40 my-1 animate-pulse" />
              </div>

              {/* Tri-Column Engine: BUILD | OPERATE | INVEST */}
              <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                {/* Pillar 1: BUILD */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 text-center shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#3026B3" />
                    <div className="relative">
                      <FeatureIcon
                        name="hard-hat"
                        accent="#3026B3"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-[#FF8904]">
                        BUILD
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 group-hover:text-[#FF8904] transition-colors">
                        New Businesses
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Incubating new industrial and technological opportunities with native capabilities.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Pillar 2: OPERATE */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 text-center shadow-md transition-all duration-300 hover:border-[#15966B] hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#15966B" />
                    <div className="relative">
                      <FeatureIcon
                        name="cog"
                        accent="#15966B"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-[#FF8904]">
                        OPERATE
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 group-hover:text-[#FF8904] transition-colors">
                        Core Companies
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Executing across infrastructure, agro commodities, precision casters and applied AI.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Pillar 3: INVEST */}
                <StaggerItem>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 text-center shadow-md transition-all duration-300 hover:border-[#00B8D9] hover:shadow-xl fx-lift h-full"
                  >
                    <CardFill accent="#00B8D9" />
                    <div className="relative">
                      <FeatureIcon
                        name="landmark"
                        accent="#00B8D9"
                        size={36}
                        className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <span className="font-sans text-xs uppercase tracking-[0.24em] font-bold block text-[#FF8904]">
                        INVEST
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1 group-hover:text-[#FF8904] transition-colors">
                        Ventures
                      </h4>
                      <p className="mt-2 text-xs sm:text-[13px] text-white/90 leading-relaxed">
                        Deploying patient balance-sheet capital, strategy and governance to accelerate growth.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              {/* Downward Connector to Impact */}
              <div className="my-6 flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15966B] text-white shadow-md animate-bounce">
                  <Icon name="arrow-right" width={16} height={16} className="rotate-90" strokeWidth={2.5} />
                </div>
              </div>

              {/* Convergence Output: IMPACT */}
              <div
                data-cursor="card"
                className="rounded-2xl border border-[#15966B]/40 bg-gradient-to-r from-[#0F766E] via-[#15966B] to-[#0F766E] p-6 text-center text-white shadow-xl transition-all duration-300 hover:scale-[1.02] fx-glow-gold"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold block mb-1">
                  NATIONAL VALUE CREATION
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white transition-colors duration-300 hover:text-gold-400">
                  IMPACT
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-100 font-normal max-w-xl mx-auto">
                  Creating lasting economic resilience, high-quality jobs, and sustainable industrial progress across Bharat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 04. WHAT’S NEXT (The Portfolio Is Growing — 3 Small Tags/Cards) ──── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#9f2d00] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#F54900]" />
              <span>WHAT’S NEXT</span>
            </div>

            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
              The Portfolio Is <span className="text-[#3026B3]">Growing</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              BharatX continues to explore opportunities across India’s emerging industries and essential economic sectors.
            </p>
          </div>

          {/* 3 Small Tags / Cards */}
          <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {futureHorizons.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift h-full"
                >
                  <CardPhoto src={item.image} accent={item.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-sm text-white px-3 py-1 font-sans text-[10px] uppercase tracking-wider font-bold">
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: tintOnDark(item.accent) }} />
                        <span>Horizon</span>
                      </span>
                      <span className="text-xs font-sans text-white/80">2026+</span>
                    </div>

                    <h3 className="font-heading text-xl font-medium text-white group-hover:text-[#FF8904] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 05. FINAL CTA (Interested in Building With BharatX?) ─────────────── */}
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("services-cta-partner")} />}
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2A5C] via-[#0B1F47] to-[#06122E] text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#1E4A9E]/35 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
              <span>PARTNER WITH US</span>
            </div>

            {/* Headline */}
            <AnimatedHeading as="h2" effect="words" hover="color" className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              Interested in Building With BharatX?
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
              We welcome conversations with entrepreneurs, investors, institutions, technology partners and businesses looking to create long-term opportunities.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 sm:px-9 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine active:scale-95"
                >
                  <span>Partner With Us</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <Link
                to="/about"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 sm:px-9 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs fx-lift"
              >
                <span>Explore About Group</span>
                <Icon
                  name="arrow-right"
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
