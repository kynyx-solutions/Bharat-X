/** The Business Portfolio cards on the Businesses page, in display order. Details for each live in data/companies.ts (same slug). */
export interface BusinessVertical {
  id: string;
  /** Detail page URL: /verticals/<slug> (also the key into data/companies.ts) */
  slug: string;
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

export const businessPortfolio: BusinessVertical[] = [
  {
    id: "labs",
    slug: "bharatx-labs",
    category: "Innovation & Research",
    name: "BharatX Labs",
    description: "Building initiatives around research, innovation and entrepreneurship that grow into new ventures.",
    status: "Coming Soon",
    logo: "/Bharatxlabs_logo.svg",
    image: "/assets/backgrounds/innovation-story.webp",
    accent: "#0D9488",
    icon: "flask-conical",
  },
  {
    id: "ventures",
    slug: "bharatx-ventures",
    category: "Capital & Venture Building",
    name: "BharatX Ventures",
    description: "Combining capital, strategy and execution to build and scale enterprises.",
    status: "Active",
    websiteUrl: "https://bharatx.vc",
    logo: "/Ventures_logo.webp",
    image: "/companies/bharatx-ventures/hero.webp",
    accent: "#0F2A5C",
    icon: "landmark",
  },
  {
    id: "agriculture",
    slug: "bharatx-agro",
    category: "Agriculture & Food",
    name: "BharatX Agro",
    description: "Connecting agricultural products, value addition and Indian capabilities with global markets.",
    status: "Active",
    websiteUrl: "https://bharatxagro.com",
    logo: "/Bharatxagro_logo.png",
    image: "/assets/backgrounds/agri-dusk.webp",
    accent: "#15966B",
    icon: "sprout",
  },
  {
    id: "infrastructure",
    slug: "bharatx-infratech",
    category: "Infrastructure & Engineering",
    name: "BharatX Infratech",
    description: "Building infrastructure and engineering capabilities for a growing India.",
    status: "Active",
    websiteUrl: "https://bharatxinfratech.com",
    logo: "/Infra_logo1.png",
    image: "/companies/bharatx-infratech/hero.webp",
    accent: "#163A7A",
    icon: "hard-hat",
  },
  {
    id: "foundation",
    slug: "bharatx-foundation",
    category: "Education & Social Impact",
    name: "BharatX Foundation",
    description: "Building initiatives around education, skills and social development.",
    status: "Coming Soon",
    image: "/assets/backgrounds/impact-story.webp",
    accent: "#F54900",
    icon: "graduation-cap",
  },
  {
    id: "manufacturing",
    slug: "bharatx-engineering",
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
    slug: "bharatx-enterprises",
    category: "Packaging & Materials",
    name: "BharatX Enterprises",
    description: "Complete industrial packaging materials, corrugated boxes, protective cushioning and bulk logistics containers.",
    status: "Active",
    websiteUrl: "https://srm.kynyx.com/",
    image: "/assets/backgrounds/packaging.webp",
    accent: "#D97706",
    icon: "boxes",
  },
  {
    id: "tech-ai",
    slug: "aixperts-labs",
    category: "Deep-Tech & AI",
    name: "Aixperts Labs",
    description: "Building AI, automation and digital solutions for modern businesses.",
    status: "Active",
    websiteUrl: "https://aixpertslabs.com",
    logo: "/Ai-Experts_logo.webp",
    image: "/companies/aixperts-labs/hero.webp",
    accent: "#2B5299",
    icon: "cpu",
  },
  {
    id: "sustainability",
    slug: "bharatx-sustainability",
    category: "Waste Management & Sustainability",
    name: "BharatX Sustainability",
    description: "Building solutions around waste management, recycling, resource recovery and the circular economy.",
    status: "Coming Soon",
    image: "/assets/backgrounds/sustainability-story.webp",
    accent: "#059669",
    icon: "recycle",
  },
];
