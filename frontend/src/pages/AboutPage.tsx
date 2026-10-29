import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { DuotoneIcon, Icon } from "../utils/icons";
import { FeatureIcon } from "../components/common/FeatureIcon";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { tintOnDark } from "../components/common/CardArt";
import { CardFill, CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";

// ── 02. Formula items for "Who We Are" ──────────────────────────────
const formulaInputs = [
  { label: "Businesses", icon: "layers" as const, color: "#3026B3" },
  { label: "Capital", icon: "landmark" as const, color: "#F54900" },
  { label: "Technology", icon: "cpu" as const, color: "#00B8D9" },
  { label: "Talent", icon: "users" as const, color: "#15966B" },
  { label: "Execution", icon: "cog" as const, color: "#4B40D4" },
];

// ── Vision & Mission ──────────────────────────────────────────────────
const visionMission: {
  label: string;
  kicker: string;
  /** The statement, shown large as the panel headline. */
  statement: ReactNode;
  /** Supporting paragraph under the statement. */
  detail: string;
  /** Labelled row of chips at the bottom of the card. */
  focusLabel: string;
  focus: { label: string; icon: string }[];
  icon: string;
  accentText: string;
  /** Chip border, in the card's accent. */
  chip: string;
  ring: string;
  border: string;
  bracket: string;
  hairline: string;
  sweep: string;
  glow: string;
}[] = [
    {
      label: "Our Vision",
      kicker: "Where we’re headed",
      statement: (
        <>
          To build world-class Indian businesses that help make India a developed nation by{" "}
          <span className="text-[#F54900]">2047</span>.
        </>
      ),
      detail:
        "Aligned with India's national vision of Viksit Bharat @2047, BharatX Group builds world-class businesses in the sectors a developed India depends on — infrastructure, agriculture, manufacturing and technology — and creates value that lasts for generations.",
      focusLabel: "Sectors we build in",
      focus: [
        { label: "Infrastructure", icon: "hard-hat" },
        { label: "Agriculture", icon: "sprout" },
        { label: "Manufacturing", icon: "factory" },
        { label: "Technology", icon: "cpu" },
      ],
      icon: "eye",
      accentText: "text-[#3026B3]",
      chip: "border-[#00B8D9]/30",
      ring: "from-[#00B8D9] to-[#3026B3]",
      border: "from-[#00B8D9]/70 via-[#3026B3]/15 to-white",
      bracket: "border-[#00B8D9]",
      hairline: "via-[#00B8D9]",
      sweep: "via-[#00B8D9]/12",
      glow: "rgba(0, 184, 217, 0.35)",
    },
    {
      label: "Our Mission",
      kicker: "How we get there",
      statement: "To find real gaps in India's economy and build, operate and scale the businesses that fill them.",
      // The rest of the mission statement, plus the Our Approach line from the home page.
      detail:
        "We do it by creating jobs, raising farmer incomes, making more in India and bringing technology to every business we touch — combining capital, technology, talent and execution to turn real opportunities into enterprises that last.",
      focusLabel: "What we create",
      focus: [
        { label: "Jobs", icon: "users" },
        { label: "Farmer incomes", icon: "wheat" },
        { label: "Made in India", icon: "boxes" },
        { label: "Technology", icon: "cpu" },
      ],
      icon: "target",
      accentText: "text-[#CA3500]",
      chip: "border-[#F54900]/25",
      ring: "from-[#FFB86A] to-[#F54900]",
      border: "from-[#F54900]/70 via-[#F54900]/15 to-white",
      bracket: "border-[#F54900]",
      hairline: "via-[#F54900]",
      sweep: "via-[#F54900]/10",
      glow: "rgba(245, 73, 0, 0.3)",
    },
  ];

/** Light holographic wash behind the Vision & Mission scene. */
const visionMissionAurora = [
  "radial-gradient(50% 40% at 8% 8%, rgba(0, 184, 217, 0.16), transparent 70%)",
  "radial-gradient(45% 40% at 92% 12%, rgba(48, 38, 179, 0.14), transparent 70%)",
  "radial-gradient(60% 45% at 50% 108%, rgba(245, 73, 0, 0.12), transparent 70%)",
  "linear-gradient(180deg, #F7F7FD 0%, #F1F0FC 55%, #FBF7F2 100%)",
].join(", ");

/** HUD-style corner brackets for the Vision & Mission panels. */
const hudCorners = [
  "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
  "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
  "left-3 bottom-3 border-l-2 border-b-2 rounded-bl-lg",
  "right-3 bottom-3 border-r-2 border-b-2 rounded-br-lg",
];

/** Isometric wireframe cube used as floating decoration. */
function WireCube({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} style={style} aria-hidden>
      <path d="M50 6 L90 28 L90 72 L50 94 L10 72 L10 28 Z" />
      <path d="M10 28 L50 50 L90 28 M50 50 L50 94" opacity="0.6" />
    </svg>
  );
}

// ── 03. Four Pillars for "Why BharatX Exists" ─────────────────────────
const purposePillars = [
  {
    step: "01",
    title: "Build",
    descriptor: "Inception & Incubation",
    description: "We spot structural gaps in India’s economy and build operating companies to fill them.",
    points: ["Greenfield enterprise creation", "Governance from day one"],
    icon: "hard-hat" as const,
    image: cardImage("about-03-purpose-build"),
    accent: "#163A7A",
    borderHover: "hover:border-[#163A7A]",
  },
  {
    step: "02",
    title: "Invest",
    descriptor: "Capital & Commitment",
    description: "We back every business with patient, long-horizon capital and strategic resources.",
    points: ["Direct balance-sheet ownership", "Long-term capital, not quick exits"],
    icon: "landmark" as const,
    image: cardImage("about-06-purpose-invest"),
    accent: "#00B8D9",
    borderHover: "hover:border-[#00B8D9]",
  },
  {
    step: "03",
    title: "Scale",
    descriptor: "Compounding & Execution",
    description: "We combine technology, talent and disciplined execution to grow businesses into leaders.",
    points: ["Cross-group synergies", "Domestic and export growth"],
    icon: "trending-up" as const,
    image: cardImage("about-04-purpose-scale"),
    accent: "#F54900",
    borderHover: "hover:border-[#F54900]",
  },
  {
    step: "04",
    title: "Impact",
    descriptor: "Enduring Stewardship",
    description: "We measure success by jobs, resilient supply chains and value that outlasts market cycles.",
    points: ["Jobs, skills and local value", "Generational enterprise value"],
    icon: "sparkles" as const,
    image: cardImage("about-05-purpose-impact"),
    accent: "#15966B",
    borderHover: "hover:border-[#15966B]",
  },
];

// ── Leadership Team (photos in /public/leadership) ────────────────────
const leadershipTeam = [
  {
    name: "Nitin Arora",
    role: "Executive Vice President — Product, Technology & AI",
    bio: "Technologist with 15+ years across product, AI and entrepreneurship at Google, Amazon, GE and Deloitte, and founder of his own startup. B.Tech and PhD in Computer Science, IIT Delhi; master’s, NYU.",
    photo: "/leadership/nitin-arora.png",
    // 4:3 head-and-shoulders crop for the desktop card frame
    cardPhoto: "/leadership/nitin-arora-card.webp",
    linkedin: "https://www.linkedin.com/in/aronitin",
  },
  {
    name: "Dharampal Singh",
    role: "Chief Revenue & Operating Officer",
    bio: "Operations leader with 28+ years in automotive manufacturing. Former Plant Head at Jay Ushin Ltd (JPM Group), running three plants and teams of 1,000+. Expert in Lean, Six Sigma and IATF 16949.",
    photo: "/leadership/dharampal-singh.webp",
    cardPhoto: "/leadership/dharampal-singh-card.webp",
    linkedin: "https://www.linkedin.com/in/dharampal-singh-995aa2228",
  },
  {
    name: "Dr. Akanksha Verma",
    role: "Chief Human Resources Officer (CHRO)",
    bio: "Environmental scientist with an M.Phil. and Ph.D., and research in sustainability and pollution. As CHRO, she leads people, culture, hiring and talent across BharatX Group and its businesses.",
    // Both made from akanksha-verma-square.png, with its hard side edges faded into the white background
    photo: "/leadership/akanksha-verma-square.webp",
    cardPhoto: "/leadership/akanksha-verma-square-card.webp",
    linkedin: "https://www.linkedin.com/in/akanksha-verma-304a18191",
  },
];

/** LinkedIn's "in" logo mark (brand blue). `onDark` fills the "in" white, for dark backgrounds. */
function LinkedInLogo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {onDark && <rect x="1.5" y="1.5" width="21" height="21" rx="1" fill="#FFFFFF" />}
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

// ── Group Leadership Mandates ─────────────────────────────────────────
const leadershipMandates = [
  {
    icon: "compass",
    accent: "#F54900",
    borderHover: "hover:border-[#F54900]/40",
    title: "Sovereign Industrial Capacity",
    desc: "Engineering domestic manufacturing, resilient infrastructure, and high-duty cycle systems designed for decades of compounding value.",
  },
  {
    icon: "cpu",
    accent: "#3026B3",
    borderHover: "hover:border-[#3026B3]/30",
    title: "Indigenous Technology & Silicon",
    desc: "Fostering frontier AI foundational models, robotics, and deeptech skunkworks to eliminate reliance on foreign black-box dependencies.",
  },
  {
    icon: "orbit",
    accent: "#15966B",
    borderHover: "hover:border-[#15966B]/40",
    title: "Interconnected Economic Engine",
    desc: "Unifying cross-sector operating businesses under one institutional standard of quality, capital discipline, and governance.",
  },
];

// ── 04. Business Ecosystem Nodes ──────────────────────────────────────
interface EcosystemNode {
  sector: string;
  company: string;
  logo?: string;
  link: string;
  accent: string;
  badge: string;
}

const tier1EcosystemNodes: EcosystemNode[] = [
  {
    sector: "Innovation",
    company: "BharatX Labs",
    logo: "/Bharatxlabs_logo.svg",
    link: "/verticals#labs",
    accent: "#0D9488",
    badge: "Active",
  },
  {
    sector: "Venture Building",
    company: "BharatX Ventures",
    logo: "/Ventures_logo.png",
    link: "/verticals#ventures",
    accent: "#211B72",
    badge: "Active",
  },
  {
    sector: "Agriculture",
    company: "BharatX Agro",
    logo: "/Bharatxagro_logo.png",
    link: "/verticals#agriculture",
    accent: "#15966B",
    badge: "Active",
  },
  {
    sector: "Infrastructure",
    company: "BharatX Infratech",
    logo: "/Infra_logo1.png",
    link: "/verticals#infrastructure",
    accent: "#3026B3",
    badge: "Active",
  },
  {
    sector: "Social Impact",
    company: "BharatX Foundation",
    link: "/verticals#foundation",
    accent: "#F54900",
    badge: "Active",
  },
];

const tier2EcosystemNodes: EcosystemNode[] = [
  {
    sector: "Technology",
    company: "Aixperts Labs",
    logo: "/Ai-Experts_logo.png",
    link: "/verticals#tech-ai",
    accent: "#4B40D4",
    badge: "Active",
  },
  {
    sector: "Manufacturing",
    company: "Casters Global",
    logo: "/Casters_logo.png",
    link: "/verticals#manufacturing",
    accent: "#00B8D9",
    badge: "Active",
  },
  {
    sector: "Packaging",
    company: "BharatX Enterprises",
    link: "/verticals#packaging",
    accent: "#D97706",
    badge: "Active",
  },
];

const tier3EcosystemNodes: EcosystemNode[] = [
  {
    sector: "Sustainability",
    company: "Future Expansion",
    link: "/#what-comes-next",
    accent: "#059669",
    badge: "Incubating",
  },
];

// ── 06. Six Principles for "Our Principles" ──────────────────────────
const principles = [
  {
    title: "Entrepreneurial",
    image: cardImage("about-23-principle-entrepreneurial"),
    description: "We think like builders and act with ownership.",
    icon: "rocket" as const,
    color: "#3026B3",
    borderHover: "hover:border-[#3026B3]",
  },
  {
    title: "Execution-Driven",
    image: cardImage("about-24-principle-execution"),
    description: "Ideas matter only when they translate into results.",
    icon: "check" as const,
    color: "#00B8D9",
    borderHover: "hover:border-[#00B8D9]",
  },
  {
    title: "Long-Term",
    image: cardImage("about-25-principle-long-term"),
    description: "We build businesses for enduring value, not short-term visibility.",
    icon: "trending-up" as const,
    color: "#15966B",
    borderHover: "hover:border-[#15966B]",
  },
  {
    title: "Technology-Enabled",
    image: cardImage("about-26-principle-technology"),
    description: "We use technology to improve how businesses operate and scale.",
    icon: "cpu" as const,
    color: "#4B40D4",
    borderHover: "hover:border-[#4B40D4]",
  },
  {
    title: "Responsible",
    image: cardImage("about-27-principle-responsible"),
    description: "Growth must create value for businesses, people and the wider ecosystem.",
    icon: "shield-check" as const,
    color: "#D97706",
    borderHover: "hover:border-[#F54900]",
  },
  {
    title: "Nation-First",
    image: cardImage("about-28-principle-nation-first"),
    description: "We build sovereign enterprise capabilities that strengthen India's economic foundation.",
    icon: "badge-check" as const,
    color: "#211B72",
    borderHover: "hover:border-[#4B40D4]",
  },
];

// ── Ecosystem tree node (dark generated art per company) ─────────────
function EcosystemNodeCard({ node }: { node: EcosystemNode }) {
  const isExternal = node.link.startsWith("http");
  const nodeClasses =
    "group relative overflow-hidden flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1026] p-4 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl hover:-translate-y-1 fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none";

  const nodeContent = (
    <>
      <CardFill accent={node.accent} />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[9.5px] uppercase tracking-wider font-bold text-white/90">
            {node.sector}
          </span>
          <span className="text-[9px] font-sans px-1.5 py-0.2 rounded border border-white/25 bg-white/15 text-white">
            {node.badge}
          </span>
        </div>
        <h4 className="font-heading text-base font-medium text-white transition-colors">
          {node.company}
        </h4>
      </div>

      <div className="relative mt-3 pt-2 border-t border-white/20 flex items-center justify-between">
        {node.logo ? (
          <div className="h-5 w-5 rounded bg-white p-0.5 border border-white/25 flex items-center justify-center">
            <img src={node.logo} alt="" className="max-h-full max-w-full object-contain" />
          </div>
        ) : (
          <span className="text-[10px] font-sans text-white/90">Horizon</span>
        )}
        <Icon name="arrow-up-right" width={12} height={12} className="text-white/90 group-hover:text-[#FF8904] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </>
  );

  return isExternal ? (
    <a href={node.link} target="_blank" rel="noopener noreferrer" data-cursor="card" className={nodeClasses}>
      {nodeContent}
    </a>
  ) : (
    <Link to={node.link} data-cursor="card" className={nodeClasses}>
      {nodeContent}
    </Link>
  );
}

export default function AboutPage() {
  usePageMeta({
    title: "About BharatX Group | Building Businesses for a Growing Bharat",
    description:
      "Learn about BharatX Group, a diversified Indian business group building enterprises across infrastructure, agriculture, manufacturing, technology, packaging, sustainability and venture building.",
    path: "/about",
  });

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (Building Enterprises for a Growing Bharat) ─────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Wide-format cinematic transformation image filling the entire frame */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/backgrounds/about_hero.png"
            alt="India's Physical and Economic Transformation"
            data-cursor="image"
            className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.12] animate-hero-zoom"
          />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <div>
            {/* H1 Headline — single line from lg up */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,3.9vw,3.5rem)] lg:whitespace-nowrap font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:text-white"
            >
              Building Enterprises for a{" "}
              <span className="text-[#F54900] transition-colors duration-300">Growing Bharat.</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── 02. WHO WE ARE (More Than a Group of Companies) ───────────── */}
      <SectionTransition>
        <section className="relative overflow-hidden bg-white py-6 sm:py-9">
          <div className="container-x relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
                  <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                  <span>WHO WE ARE</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight transition-colors duration-300">
                  More Than a <span className="text-[#3026B3] transition-colors duration-300">Group of Companies</span>
                </h2>

                <p className="mt-6 text-base sm:text-lg text-[#596579] leading-relaxed font-normal">
                  BharatX Group brings together businesses operating across some of India’s most important growth sectors.
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#596579] leading-relaxed font-normal">
                  We combine entrepreneurial thinking, operational capability, technology and capital to build businesses that solve real-world problems and create long-term value.
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#596579] leading-relaxed font-normal">
                  Our portfolio spans infrastructure and engineering, agriculture and food, industrial manufacturing, AI and technology, packaging, sustainability, venture building and social impact.
                </p>
              </div>

              {/* Visual Formula: Businesses + Capital + Technology + Talent + Execution -> Enduring Enterprises */}
              <div className="lg:col-span-6">
                <div
                  data-cursor="card"
                  tabIndex={0}
                  className="relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-white p-7 sm:p-9 shadow-lg transition-all duration-300 hover:shadow-2xl fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none"
                >
                  <CardFill accent="#3026B3" tone="tint" />
                  <div className="relative text-center mb-6">
                    <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#3026B3] font-bold block">
                      The Value Creation Formula
                    </span>
                    <span className="text-xs sm:text-[13px] text-[#374151] mt-1 block">
                      How core capabilities compound across the ecosystem
                    </span>
                  </div>

                  {/* 5 Input Badges in a flexible grid */}
                  <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formulaInputs.map((item) => (
                      <div
                        key={item.label}
                        data-cursor="card"
                        className="flex items-center gap-2.5 rounded-xl border border-l-4 p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 fx-lift cursor-pointer"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${item.color} 9%, white)`,
                          borderColor: `${item.color}40`,
                          borderLeftColor: item.color,
                        }}
                      >
                        <FeatureIcon
                          name={item.icon}
                          accent={item.color}
                          size={32}
                          className="transition-transform duration-300 hover:scale-110"
                        />
                        <span className="font-sans text-sm font-medium text-[#111827]">
                          {item.label}
                        </span>
                      </div>
                    ))}

                    {/* Sixth slot: compounding operator icon */}
                    <div className="flex items-center justify-center rounded-xl border border-dashed border-[#3026B3]/35 bg-[color-mix(in_srgb,#3026B3_6%,white)] p-3">
                      <span className="font-sans text-xs text-[#211B72] font-bold tracking-wider">
                        + SYNERGY
                      </span>
                    </div>
                  </div>

                  {/* Downward Arrow Connector */}
                  <div className="relative my-5 flex items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3026B3] text-white shadow-md transition-transform duration-300 hover:scale-110">
                      <Icon name="arrow-right" width={16} height={16} className="rotate-90" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Result Node: Enduring Enterprises */}
                  <div className="rounded-2xl border border-[#163A7A]/40 bg-gradient-to-r from-[#0B1F47] via-[#163A7A] to-[#0B1F47] p-5 sm:p-6 text-center text-white shadow-xl fx-shine">
                    <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold block mb-1">
                      End State
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white transition-colors duration-300">
                      Enduring Enterprises
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-slate-200 font-normal">
                      Built for generational resilience, operating independence, and national momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* ── VISION & MISSION (Where We're Headed and How We Get There) ──── */}
      <SectionTransition id="vision-mission" aria-label="Our Vision and Mission">
        <section className="relative overflow-hidden bg-[#F6F6FD] py-6 sm:py-9">
          {/* Light futuristic scene: holographic wash, perspective grid floor, orbit rings and wireframe cubes */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background: visionMissionAurora }} />

            {/* Grid floor receding to a glowing horizon */}
            <div className="absolute inset-x-0 bottom-0 h-[72%] [perspective:700px]">
              <div
                className="absolute -inset-x-1/2 -bottom-1/4 top-0 origin-bottom"
                style={{
                  transform: "rotateX(63deg)",
                  backgroundImage:
                    "linear-gradient(rgba(48, 38, 179, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(48, 38, 179, 0.2) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                  WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 92%)",
                  maskImage: "linear-gradient(to top, black 25%, transparent 92%)",
                }}
              />
            </div>
            <div className="absolute left-1/2 top-[44%] h-40 w-[75%] -translate-x-1/2 rounded-[100%] bg-[#00B8D9]/10 blur-3xl" />

            {/* Tilted orbit rings with travelling light nodes */}
            <div className="absolute left-1/2 top-[30%] [perspective:1200px]">
              <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(72deg)" }}>
                {[
                  { size: 640, dur: "38s", dot: "bg-[#00B8D9] shadow-[0_0_14px_#00B8D9]", ring: "border-[#3026B3]/20" },
                  { size: 900, dur: "56s", dot: "bg-[#F54900] shadow-[0_0_14px_#F54900]", ring: "border-[#00B8D9]/20" },
                  { size: 1180, dur: "80s", dot: "bg-[#3026B3] shadow-[0_0_14px_#3026B3]", ring: "border-[#3026B3]/10" },
                ].map((o) => (
                  <div
                    key={o.size}
                    className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border ${o.ring} animate-spin motion-reduce:animate-none`}
                    style={{ width: o.size, height: o.size, animationDuration: o.dur }}
                  >
                    <span className={`absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${o.dot}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating wireframe cubes */}
            <WireCube className="animate-float absolute left-[6%] top-[12%] hidden h-20 w-20 text-[#3026B3]/25 lg:block" />
            <WireCube className="animate-float absolute right-[7%] top-[22%] hidden h-12 w-12 text-[#00B8D9]/40 md:block" style={{ animationDelay: "-2s" }} />
            <WireCube className="animate-float absolute bottom-[8%] right-[4%] hidden h-24 w-24 text-[#F54900]/25 lg:block" style={{ animationDelay: "-3.5s" }} />
          </div>

          <div className="container-x relative z-10">
            <div className="max-w-3xl text-center mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-white/80 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#3026B3] font-bold shadow-xs backdrop-blur-sm mb-5">
                <span className="h-2 w-2 rounded-full bg-[#00B8D9] shadow-[0_0_8px_#00B8D9] animate-pulse" />
                <span>WHAT DRIVES US</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-[#3026B3] to-[#00B8D9] bg-clip-text text-transparent">Vision</span>{" "}
                <span className="font-light italic text-[#F54900]">&amp;</span>{" "}
                <span className="bg-gradient-to-r from-[#3026B3] to-[#00B8D9] bg-clip-text text-transparent">Mission</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
                Our vision sets the long-term ambition for the Group. Our mission is the work we do every day to get there.
              </p>
            </div>

            <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {visionMission.map((item) => (
                <StaggerItem key={item.label}>
                  {/* Gradient border around a frosted-glass panel */}
                  <div
                    data-cursor="card"
                    tabIndex={0}
                    className={`group relative h-full rounded-[26px] bg-gradient-to-br ${item.border} p-px shadow-[0_24px_60px_-30px_rgba(48,38,179,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-26px_var(--panel-glow)] focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none`}
                    style={{ "--panel-glow": item.glow } as CSSProperties}
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] bg-white/75 p-7 sm:p-10 backdrop-blur-xl">
                      {/* HUD corners, top hairline, hover light sweep and outlined watermark number */}
                      {hudCorners.map((pos) => (
                        <span
                          key={pos}
                          aria-hidden
                          className={`pointer-events-none absolute h-4 w-4 ${pos} ${item.bracket} opacity-70 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:opacity-100`}
                        />
                      ))}
                      <span aria-hidden className={`absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent ${item.hairline} to-transparent`} />
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent ${item.sweep} to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[420%]`}
                      />
                      {/* Icon in a gradient ring + label */}
                      <div className="relative flex items-center gap-4">
                        <span
                          className={`shrink-0 rounded-full bg-gradient-to-br ${item.ring} p-[1.5px] transition-transform duration-500 group-hover:scale-105`}
                          style={{ boxShadow: `0 10px 28px -8px ${item.glow}` }}
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                            <Icon name={item.icon} width={24} height={24} strokeWidth={1.8} className={item.accentText} />
                          </span>
                        </span>
                        <div>
                          <span className={`block font-sans text-[11px] font-bold uppercase tracking-[0.3em] ${item.accentText}`}>
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm text-[#596579]">{item.kicker}</span>
                        </div>
                      </div>

                      {/* Same three parts in both cards: statement, supporting paragraph, chip row */}
                      <span aria-hidden className={`relative mt-8 block h-1 w-12 rounded-full bg-gradient-to-r ${item.ring}`} />
                      <h3 className="relative mt-5 font-heading text-[1.65rem] sm:text-3xl lg:text-[2.15rem] font-medium leading-[1.3] tracking-tight text-[#0B1F47] text-balance">
                        {item.statement}
                      </h3>

                      <p className="relative mt-5 text-[15px] sm:text-base leading-relaxed text-[#596579]">
                        {item.detail}
                      </p>

                      {/* mt-auto pins the chip row to the bottom so both cards end level */}
                      <div className="relative mt-auto pt-7">
                        <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.24em] ${item.accentText}`}>
                          {item.focusLabel}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {item.focus.map((f) => (
                            <li
                              key={f.label}
                              className={`inline-flex items-center gap-1.5 rounded-full border ${item.chip} bg-white/80 px-3 py-1.5 text-[13px] font-medium text-[#111827] backdrop-blur-sm`}
                            >
                              <Icon name={f.icon} width={14} height={14} strokeWidth={2} className={item.accentText} />
                              {f.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </SectionTransition>

      {/* ── 03. WHY BHARATX EXISTS (Built Around India's Opportunity) ─── */}
      <SectionTransition>
        <section className="relative overflow-hidden bg-white py-6 sm:py-9">
          <div className="container-x relative z-10">
            {/* Two balanced columns: the story (context, then purpose) beside a navy thesis panel of the same height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 sm:mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#9f2d00] font-bold shadow-xs mb-4">
                  <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900] animate-pulse" />
                  <span>OUR PURPOSE</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight transition-colors duration-300">
                  Built Around India’s <span className="text-[#163A7A] transition-colors duration-300">Opportunity</span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-[#596579] leading-relaxed font-normal max-w-2xl">
                  India is entering a period of extraordinary economic transformation. Infrastructure is expanding, industries are modernising, technology is reshaping businesses, agricultural value chains are evolving and sustainability is becoming a business imperative.
                </p>

                <p className="mt-4 border-l-[3px] border-[#F54900] pl-5 text-base sm:text-lg text-[#111827] font-medium leading-relaxed max-w-2xl">
                  BharatX exists to participate in this transformation—not simply by investing in opportunities, but by building the businesses capable of capturing them.
                </p>
              </div>

              {/* Executive thesis: navy panel stretched to the column height, with the four steps the cards below spell out */}
              <div
                data-cursor="card"
                tabIndex={0}
                className="lg:col-span-5 relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[#163A7A]/40 bg-gradient-to-br from-[#0B1F47] via-[#0F2A5C] to-[#163A7A] p-4 sm:p-8 shadow-[0_18px_40px_-16px_rgba(11,31,71,0.55)] transition-all duration-300 hover:shadow-[0_24px_50px_-16px_rgba(11,31,71,0.7)] fx-lift focus-visible:ring-2 focus-visible:ring-[#F54900] focus:outline-none"
              >
                <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#1E4A9E]/45 blur-3xl" />
                <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-[#F54900]/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <FeatureIcon name="landmark" accent="#F54900" size={44} className="shrink-0" />
                    <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#FF8904] font-bold">
                      SOVEREIGN THESIS
                    </span>
                  </div>
                  <p className="mt-2 font-heading text-xl sm:text-2xl text-white font-medium leading-snug tracking-tight">
                    Operator-led balance-sheet compounding across India's foundational industrial sectors.
                  </p>
                </div>

                <div className="relative flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-white/15 pt-3 font-sans text-[11px] font-bold uppercase tracking-[0.12em] sm:gap-x-2.5 sm:tracking-[0.2em] text-white/85">
                  {purposePillars.map((pillar, i) => (
                    <span key={pillar.title} className="inline-flex items-center gap-2 sm:gap-2.5">
                      {pillar.title}
                      {i < purposePillars.length - 1 && (
                        <Icon name="arrow-right" width={12} height={12} className="text-[#FF8904]" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Four Pillars: Build, Invest, Scale, Impact */}
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {purposePillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <div
                    data-cursor="card"
                    tabIndex={0}
                    className={`group relative overflow-hidden flex flex-col h-full rounded-2xl border border-white/10 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none ${pillar.borderHover}`}
                  >
                    <CardPhoto src={pillar.image} accent={pillar.accent} />
                    <div className="relative flex h-full flex-col [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                      <div className="flex items-center justify-between mb-3">
                        <FeatureIcon
                          name={pillar.icon}
                          accent={pillar.accent}
                          size={44}
                          className="transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
                        />
                        <span className="font-sans text-xs font-bold" style={{ color: tintOnDark(pillar.accent) }}>
                          {pillar.step}
                        </span>
                      </div>

                      <span className="font-sans text-[10.5px] uppercase tracking-wider text-white/80 block mb-1">
                        {pillar.descriptor}
                      </span>

                      <h3 className="font-heading text-2xl font-medium tracking-tight text-white transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="mt-3 mb-5 text-sm text-slate-200 leading-relaxed font-normal">
                        {pillar.description}
                      </p>

                      <ul className="mt-auto space-y-2 border-t border-white/15 pt-4">
                        {pillar.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2 text-xs text-slate-100">
                            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: tintOnDark(pillar.accent) }} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </SectionTransition>

      {/* ── GROUP LEADERSHIP (The Visionary Behind the Standard) ─────────── */}
      <SectionTransition>
        <section className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
          <div className="container-x relative z-10">
            <div className="max-w-3xl mb-9 sm:mb-11">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
                <DuotoneIcon name="user-round" size={14} />
                <span>GROUP LEADERSHIP</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight transition-colors duration-300">
                The Visionary Behind the <span className="text-[#3026B3] transition-colors duration-300">Standard.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed font-normal">
                BharatX Group is founded on institutional rigor, sovereign engineering, and long-term national economic leadership.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-white p-4 sm:p-6 lg:p-8 shadow-xl">
              <CardFill accent="#3026B3" tone="tint" />

              <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                {/* Portrait Column */}
                <div
                  data-cursor="image"
                  className="relative flex flex-col justify-end overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl border border-[#E3E5EF] bg-[#0F172A] shadow-lg group fx-lift"
                >
                  <img
                    src="/pradeep-kumar.png"
                    alt="Pradeep Kumar — Founder & Leader, BharatX Group"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/25 to-transparent opacity-95" />

                  {/* Floating Identity Card on Image */}
                  <div className="relative z-10 p-6 sm:p-8 backdrop-blur-md bg-[#0B0F19]/85 border-t border-white/10 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900] animate-pulse" />
                      <span className="font-sans text-[10.5px] uppercase tracking-[0.25em] text-[#F54900] font-bold">
                        Founder &amp; Visionary
                      </span>
                    </div>
                    {/* Name with the LinkedIn profile link on the same line */}
                    <div className="mt-1 flex items-center gap-3">
                      <div className="font-heading text-2xl sm:text-3xl font-medium text-white tracking-tight">
                        Pradeep Kumar
                      </div>
                      <a
                        href="https://www.linkedin.com/in/pradeep-kumar-5170655b"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pradeep Kumar on LinkedIn"
                        title="Pradeep Kumar on LinkedIn"
                        data-cursor="link"
                        className="shrink-0 rounded-md transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                      >
                        <LinkedInLogo onDark className="h-7 w-7" />
                      </a>
                    </div>
                    <div className="mt-1 text-xs font-sans uppercase tracking-wider text-slate-300">
                      BharatX Group · Institutional Founder
                    </div>
                    {/* Credentials */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["IIT Delhi", "IIM"].map((school) => (
                        <span
                          key={school}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-sans text-[11px] font-semibold text-white"
                        >
                          <Icon name="graduation-cap" width={13} height={13} className="text-[#FF8904]" />
                          {school} Alumnus
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative & Quote Column */}
                <div className="flex flex-col justify-between p-2 sm:p-4 lg:p-6 lg:pl-2">
                  <div>
                    {/* Vision Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-[#9f2d00] font-bold mb-6 shadow-xs">
                      <DuotoneIcon name="sparkles" size={14} />
                      <span>National Economic Vision</span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111827] tracking-tight leading-tight transition-colors duration-300">
                      Architecting India’s <span className="text-[#3026B3] transition-colors duration-300">Next Economic Decade.</span>
                    </h3>

                    {/* Featured Decorated Quote Block */}
                    <div
                      data-cursor="card"
                      className="relative overflow-hidden mt-6 rounded-2xl border-l-4 border-l-[#F54900] border-y border-r border-white/10 bg-[#0B1F47] p-6 sm:p-7 shadow-md transition-all duration-300 hover:shadow-lg fx-lift"
                    >
                      <div aria-hidden className="absolute -top-3 right-6 font-heading text-7xl font-semibold text-[#F54900]/20 select-none pointer-events-none">
                        “
                      </div>
                      <blockquote className="relative z-10 text-[15.5px] sm:text-[17px] font-normal leading-relaxed text-white italic">
                        “Aligned with the national vision of{" "}
                        <strong className="text-[#FF8904] not-italic font-semibold">
                          Viksit Bharat 2047
                        </strong>
                        , he is committed to building sustainable, technology-driven enterprises that strengthen India’s industrial ecosystem and contribute to the country’s long-term economic leadership.”
                      </blockquote>
                      <div className="relative mt-4 flex items-center justify-between pt-3 border-t border-white/15 text-xs font-sans text-slate-200">
                        <span className="text-[#FF8904] font-bold">— Pradeep Kumar IIT Delhi & IIM Alumni</span>
                        <span className="font-medium text-slate-200">BharatX Group</span>
                      </div>
                    </div>

                    {/* Three Core Leadership Mandates */}
                    <div className="mt-6 space-y-3.5">
                      {leadershipMandates.map((item) => (
                        <div
                          key={item.title}
                          data-cursor="card"
                          className={`flex items-start gap-4 rounded-xl border border-l-4 border-[#E3E5EF] p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 fx-lift ${item.borderHover}`}
                          style={{
                            backgroundColor: `color-mix(in srgb, ${item.accent} 9%, white)`,
                            borderLeftColor: item.accent,
                          }}
                        >
                          <FeatureIcon name={item.icon} accent={item.accent} size={40} className="fx-icon-pop" />
                          <div>
                            <div className="font-heading text-base font-medium text-[#111827]">
                              {item.title}
                            </div>
                            <p className="mt-1 text-xs sm:text-[13px] text-[#374151] leading-relaxed font-normal">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust & Alignment Footer Bar */}
                  <div className="mt-8 pt-5 border-t border-[#E3E5EF] flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#374151]">
                    <span className="flex items-center gap-2 text-[#111827] font-medium">
                      <DuotoneIcon name="shield-check" size={17} className="text-[#15966B]" />
                      Constitutional Governance Standard
                    </span>
                    <span className="text-[#9f2d00] font-bold">Viksit Bharat 2047 Committed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* ── LEADERSHIP TEAM (The executives running the Group's functions) ── */}
      <SectionTransition id="leadership-team" aria-label="Leadership Team">
        {/* Desktop fits the whole section on one screen (lg:/short: classes only; phones keep square portraits) */}
        <section className="relative overflow-hidden bg-white py-6 sm:py-9 short:py-6">
          <div className="container-x relative z-10">
            {/* Desktop: the intro sits beside the heading */}
            <div className="max-w-3xl mb-8 sm:mb-10 lg:max-w-none lg:mb-6 short:mb-4 lg:flex lg:items-end lg:justify-between lg:gap-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/30 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#CA3500] font-bold shadow-xs mb-4">
                  <DuotoneIcon name="users" size={14} />
                  <span>LEADERSHIP TEAM</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight">
                  The People Leading <span className="text-[#3026B3]">BharatX.</span>
                </h2>
              </div>

              <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed font-normal lg:mt-0 lg:max-w-sm lg:shrink-0 lg:pb-1 lg:text-base">
                Experienced leaders across technology, operations and people, building the Group and its businesses.
              </p>
            </div>

            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadershipTeam.map((person, i) => (
                <StaggerItem
                  key={person.name}
                  className={cn(
                    "h-full",
                    // In the 2-column tablet layout, centre a last card that would sit alone on the left
                    i === leadershipTeam.length - 1 &&
                    leadershipTeam.length % 2 === 1 &&
                    "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto",
                  )}
                >
                  <article
                    data-cursor="card"
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E3E5EF] bg-[#FAF9F6] shadow-xs transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-[#F54900]/30 hover:shadow-[0_28px_55px_-28px_rgba(11,31,71,0.45)]"
                  >
                    {/*
                      Phones: the original photo in a square frame, cropped from the top. Desktop: cardPhoto, a 4:3
                      head-to-chest crop made for this 4:3 frame, so nothing is cut. Two plain images rather than a
                      <picture>, so a hot reload or resize can't leave the wrong one showing; the hidden one is lazy and
                      display:none, so it never downloads. Slow zoom on hover.
                    */}
                    <div className="relative m-3 mb-0 aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl bg-[#EEF0F6]">
                      <img
                        src={person.photo}
                        alt={`${person.name}, ${person.role}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 lg:hidden"
                      />
                      <img
                        src={person.cardPhoto}
                        alt={`${person.name}, ${person.role}`}
                        loading="lazy"
                        decoding="async"
                        className="hidden h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 lg:block"
                      />
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0B1F47]/25 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7 lg:pb-5 lg:pt-4 short:pb-4">
                      {/* Name with the LinkedIn profile link on the same line */}
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-heading text-2xl sm:text-[1.65rem] lg:text-xl font-medium leading-tight tracking-tight text-[#0B1F47]">
                          {person.name}
                        </h3>
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} on LinkedIn`}
                          title={`${person.name} on LinkedIn`}
                          data-cursor="link"
                          className="shrink-0 rounded-md transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
                        >
                          <LinkedInLogo className="h-7 w-7 lg:h-6 lg:w-6" />
                        </a>
                      </div>
                      {/* Two lines reserved from sm, so rules and bios line up when one title wraps */}
                      <p className="mt-1.5 lg:mt-1 text-[15px] lg:text-[13px] font-semibold leading-snug text-[#CA3500] sm:min-h-[2.75em]">{person.role}</p>
                      <span aria-hidden className="mt-4 lg:mt-2.5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-[#F54900] to-[#FFB86A] transition-all duration-500 group-hover:w-16" />
                      <p className="mt-4 lg:mt-2.5 text-[15px] lg:text-[13px] leading-relaxed text-[#374151]">{person.bio}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </SectionTransition>

      {/* ── 04. OUR BUSINESS ECOSYSTEM (One Group. Multiple Growth Engines) ─ */}
      {/* <SectionTransition>
        <section className="relative overflow-hidden bg-white py-6 sm:py-9">
          <div className="container-x relative z-10">
            <div className="max-w-3xl text-center mx-auto mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
                <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                <span>ECOSYSTEM ARCHITECTURE</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight transition-colors duration-300">
                One Group. Multiple <span className="text-[#3026B3] transition-colors duration-300">Growth Engines.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed">
                A cohesive institutional tree connecting physical infrastructure, agricultural commodities, industrial manufacturing, and applied intelligence.
              </p>
            </div>

            {/* Visual Architecture Tree */}
      {/* <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl border border-[#E3E5EF] bg-white p-6 sm:p-10 shadow-lg">
              <CardFill accent="#3026B3" tone="tint" />
              {/* Tree Root: BHARATX GROUP 
              <div className="relative flex flex-col items-center text-center">
                <div className="inline-flex flex-col items-center rounded-2xl border border-[#163A7A]/40 bg-gradient-to-r from-[#0B1F47] via-[#163A7A] to-[#0B1F47] px-8 py-4 text-white shadow-xl fx-shine">
                  <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#F54900] font-bold">
                    CONGLOMERATE CORE
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl font-medium tracking-tight mt-0.5 hover:text-[#F54900] transition-colors duration-300">
                    BHARATX GROUP
                  </span>
                </div>
                <div className="h-8 w-px bg-[#3026B3]/40 my-1" />
              </div>

              {/* Level 1: the five BharatX-branded businesses (on two-column tablets the fifth spans the row) 
              <div className="relative mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
                  {tier1EcosystemNodes.map((node) => (
                    <EcosystemNodeCard key={node.company} node={node} />
                  ))}
                </div>
              </div>

              {/* Connecting Vertical Trunk 
              <div className="relative flex flex-col items-center my-4">
                <div className="h-6 w-px bg-[#3026B3]/30" />
              </div>

              {/* Level 2: 3 Operating Entities 
              <div className="relative max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {tier2EcosystemNodes.map((node) => (
                  <EcosystemNodeCard key={node.company} node={node} />
                ))}
              </div>

              {/* Connecting Trunk to Anchor 
              <div className="relative flex flex-col items-center my-4">
                <div className="h-6 w-px bg-[#3026B3]/30" />
              </div>

              {/* Level 3: Future Expansion 
              <div className="relative max-w-xs sm:max-w-sm mx-auto">
                {tier3EcosystemNodes.map((node) => (
                  <EcosystemNodeCard key={node.company} node={node} />
                ))}
              </div>

              {/* Subtext Statement 
              <div className="relative mt-8 text-center pt-6 border-t border-[#E3E5EF]">
                <p className="text-xs sm:text-sm text-[#374151] max-w-2xl mx-auto leading-relaxed">
                  Each business operates with its own market focus and capabilities while benefiting from the broader BharatX ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section> 
      </SectionTransition> */}

      {/* ── 06. OUR PRINCIPLES (What Guides Us) ────────────────────────── */}
      <SectionTransition>
        <section className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
          <div className="container-x relative z-10">
            <div className="max-w-3xl text-center mx-auto mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs mb-4">
                <span className="h-2 w-2 rounded-full bg-[#15966B] animate-pulse" />
                <span>WHAT GUIDES US</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight transition-colors duration-300">
                Our <span className="text-[#3026B3] transition-colors duration-300">Principles</span>
              </h2>

              <p className="mt-3 text-base text-[#596579]">
                Core convictions that anchor our operating culture and enterprise stewardship.
              </p>
            </div>

            {/* 6 Principles Cards Grid */}
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {principles.map((p, idx) => (
                <StaggerItem key={p.title}>
                  <div
                    data-cursor="card"
                    tabIndex={0}
                    className={`group relative overflow-hidden h-full rounded-2xl border border-white/10 bg-[#0D1026] p-6 sm:p-7 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none ${p.borderHover}`}
                  >
                    <CardPhoto src={p.image} accent={p.color} />
                    <div className="relative flex items-center gap-3.5 mb-4 [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                      <FeatureIcon
                        name={p.icon}
                        accent={p.color}
                        size={44}
                        className="transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
                      />
                      <div>
                        {/* <span className="font-sans text-[10px] uppercase tracking-wider block text-[#FF8904]">
                          Principle 0{idx + 1}
                        </span> */}
                        <h3 className="font-heading text-xl font-medium text-white transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </div>

                    <p className="relative text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                      {p.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </SectionTransition>

      {/* ── 07. CLOSING / LEADERSHIP STATEMENT (The Journey Ahead) ─────── */}
      <SectionTransition>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2A5C] via-[#0B1F47] to-[#06122E] text-white py-6 sm:py-9">
          <SectionPhoto src={cardImage("about-cta-journey-ahead")} />
          {/* Ambient radial lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#1E4A9E]/35 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

          <div className="container-x relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6 hover:bg-[#F54900]/25 transition-colors">
                <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900] animate-pulse" />
                <span>THE JOURNEY AHEAD</span>
              </div>

              {/* Headline */}
              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
                The Journey Ahead
              </h2>

              {/* Copy */}
              <p className="mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
                BharatX Group is still at the beginning of its journey.
              </p>

              <p className="mt-2 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
                As we expand into new industries, build new businesses and develop new capabilities, our ambition remains constant: to create enduring enterprises that contribute to India’s economic progress.
              </p>

              {/* Signature Statement */}
              <div className="mt-4 pt-4 border-t border-white/15 max-w-xl mx-auto">
                <p className="font-sans text-sm sm:text-base uppercase tracking-[0.24em] text-[#F54900] font-bold">
                  Building Businesses. Enabling Bharat.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/verticals"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 sm:px-9 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 fx-shine"
                >
                  <span>Explore Our Businesses</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 sm:px-9 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs active:scale-95"
                >
                  <span>Partner With BharatX</span>
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
        </section>
      </SectionTransition>
    </main>
  );
}
