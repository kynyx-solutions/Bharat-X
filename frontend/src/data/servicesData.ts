export interface ServiceItem {
  id: string;
  name: string;
  shortLabel: string;
  eyebrow: string;
  descriptor: string;
  fullNarrative: string;
  image: string;
  companyName: string;
  companyLogo: string;
  companySlug: string;
  website: string;
  stats: { value: string; label: string }[];
  capabilities: string[];
  heroTagline: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "labs",
    name: "Climate & Sustainability",
    shortLabel: "CLIMATE & SUSTAINABILITY",
    eyebrow: "DEEP-TECH CIRCULARITY & NET-ZERO",
    descriptor: "Pioneering decarbonisation, sovereign environmental telemetry, and circular materials.",
    fullNarrative:
      "Architected by BharatX Labs, our climate and sustainability division pioneers deep-tech environmental solutions, circular material formulations, and sovereign carbon telemetry. We research and deploy low-carbon industrial compounds, zero-effluent water cycles, and AI-driven energy optimization grids to achieve net-zero industrial compounding.",
    image: "/assets/backgrounds/sustainability-story.webp",
    companyName: "BharatX Labs",
    companyLogo: "/Bharatxlabs_logo.svg",
    companySlug: "bharatx-labs",
    website: "/bharatx-labs",
    stats: [
      { value: "2035", label: "Net-Zero Carbon Horizon" },
      { value: "100%", label: "Circular Compound Transition" },
      { value: "Zero Effluent", label: "Water Neutrality Standard" },
    ],
    capabilities: [
      "Industrial Carbon Telemetry",
      "Low-Carbon Material Synthesis",
      "Zero-Effluent Water Systems",
      "Solar Microgrid Optimization",
    ],
    heroTagline: "Pioneering Sustainable Horizons",
  },
  {
    id: "ventures",
    name: "Finance",
    shortLabel: "FINANCE",
    eyebrow: "CAPITAL ALLOCATION & SCALING",
    descriptor: "Strategic capital structuring, balance sheet advisory, and founder-aligned enterprise scaling.",
    fullNarrative:
      "Driven by BharatX Ventures, our finance and strategic capital division designs, capitalizes, and scales enduring enterprises across key sectors. We provide patient balance-sheet capital, financial architecture, governance models, and institutional advisory for generational compounding.",
    image: "/assets/backgrounds/strategic-story-panorama.webp",
    companyName: "BharatX Ventures",
    companyLogo: "/Ventures_logo.webp",
    companySlug: "bharatx-ventures",
    website: "https://bharatx.vc/",
    stats: [
      { value: "₹180 Cr+", label: "Portfolio Enterprise Value" },
      { value: "8+", label: "Ventures Shaped & Scaled" },
      { value: "100%", label: "Founder-Led Ownership" },
    ],
    capabilities: [
      "Strategic Capital Structuring",
      "Venture Architecture & GTM",
      "Operating System & Cadence",
      "Institutional Capital Advisory",
    ],
    heroTagline: "Deploying Strategic Capital",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    shortLabel: "AGRICULTURE",
    eyebrow: "AGRI COMMODITIES & EXPORTS",
    descriptor: "Origin sourcing, certified processing, and high-integrity agricultural supply chains.",
    fullNarrative:
      "Spearheaded by BharatX Agro, we connect Indian farm cooperatives directly with domestic and international buyers through certified processing facilities, phytosanitary compliance, and transparent farm-gate origin traceability.",
    image: "/assets/backgrounds/agri-dusk.webp",
    companyName: "BharatX Agro",
    companyLogo: "/Bharatxagro_logo.png",
    companySlug: "bharatx-agro",
    website: "https://bharatxagro.com/",
    stats: [
      { value: "5,000+ MT", label: "Sourced & Processed" },
      { value: "100%", label: "Traceability to Origin" },
      { value: "18+", label: "Export Partner Ports" },
    ],
    capabilities: [
      "Origin-Certified Sourcing",
      "Export Grade Grading & Cleaning",
      "Phytosanitary & Food Safety",
      "Global Container Freight",
    ],
    heroTagline: "Securing Sovereign Food Systems",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    shortLabel: "INFRASTRUCTURE",
    eyebrow: "PHYSICAL BACKBONE",
    descriptor: "Connecting economic corridors through heavy civil engineering and arterial utilities.",
    fullNarrative:
      "Executed by BharatX Infratech, our civil engineering division builds the physical systems a growing country depends on: arterial transport surfaces, utility corridors, industrial estates, and urban facilities engineered for decades of heavy service.",
    image: "/companies/bharatx-infratech/hero.webp",
    companyName: "BharatX Infratech",
    companyLogo: "/Infra_logo1.png",
    companySlug: "bharatx-infratech",
    website: "https://bharatxinfratech.com/",
    stats: [
      { value: "150+ KM", label: "Roads & Civil Works" },
      { value: "40+", label: "Civil Projects Completed" },
      { value: "15+", label: "Industrial & Urban Sites" },
    ],
    capabilities: [
      "Arterial Road Construction",
      "Industrial Estate Development",
      "Civil & Structural Works",
      "Utility & Drainage Networks",
    ],
    heroTagline: "Building Arteries Of Bharat",
  },
  {
    id: "tech-ai",
    name: "Technology & AI",
    shortLabel: "TECHNOLOGY & AI",
    eyebrow: "FOUNDATIONAL INTELLIGENCE",
    descriptor: "Sovereign compute, enterprise AI platforms, and automated intelligence engineering.",
    fullNarrative:
      "Engineered by Aixperts Labs, our mission is to establish sovereign technological capability across enterprise workflows. We architect localized deep-learning models, document triage engines, and automated decision workflows that modernize core industries while preserving data independence.",
    image: "/assets/backgrounds/innovation-story.webp",
    companyName: "Aixperts Labs",
    companyLogo: "/Ai-Experts_logo.webp",
    companySlug: "aixperts-labs",
    website: "https://aixpertslabs.com/",
    stats: [
      { value: "45+", label: "AI Workflows Deployed" },
      { value: "22", label: "Indic Languages Tested" },
      { value: "99.8%", label: "Document Accuracy" },
    ],
    capabilities: [
      "Applied LLM Systems",
      "Mission-Critical Edge Compute",
      "Computer Vision & Inspection",
      "Automated Workflow Pipelines",
    ],
    heroTagline: "Powering Sovereign Intelligence",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    shortLabel: "MANUFACTURING",
    eyebrow: "PRECISION MOBILITY",
    descriptor: "Precision components, industrial casters, and heavy-duty mobility solutions.",
    fullNarrative:
      "At BharatX Engineering, we design and manufacture precision caster wheels and mobility solutions for demanding applications in intralogistics, medical equipment, retail, and factory automation with strict dimensional tolerances.",
    image: "/companies/casters-global/hero.jpg",
    companyName: "BharatX Engineering",
    companyLogo: "/Casters_logo.png",
    companySlug: "casters-global",
    website: "https://castersglobal.com/",
    stats: [
      { value: "500,000+", label: "Precision Casters Built" },
      { value: "250+", label: "Engineered SKUs" },
      { value: "12+", label: "Export Destinations" },
    ],
    capabilities: [
      "Heavy-Duty Industrial Wheels",
      "Medical Grade Casters",
      "Automated Guided Vehicle (AGV) Mounts",
      "Custom Swivel & Brake Geometries",
    ],
    heroTagline: "Precision Engineering At Scale",
  },
];

/**
 * The Businesses menus (navbar dropdown and mobile menu) list the businesses in the same order as the Home page's
 * Core Verticals (components/home/BusinessEcosystemGrid): AI & Deeptech, Innovation & Research (Labs), Agri & Food,
 * Capital & Venture Building, Infratech, Manufacturing. Any business not listed here goes last.
 */
const MENU_ORDER = ["tech-ai", "labs", "agriculture", "ventures", "infrastructure", "manufacturing"];
const menuRank = (id: string) => (MENU_ORDER.includes(id) ? MENU_ORDER.indexOf(id) : MENU_ORDER.length);

export const menuServices: ServiceItem[] = [...servicesData].sort((a, b) => menuRank(a.id) - menuRank(b.id));
