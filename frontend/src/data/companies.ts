import type { Company } from "../types";

/**
 * Central company data model (Section 33).
 * The UI reads only from here — nothing is duplicated in components.
 * Shaped to be 1:1 portable to the MongoDB `companies` collection.
 */
export const companies: Company[] = [
  {
    id: "ventures",
    order: 1,
    slug: "bharatx-ventures",
    name: "BharatX Ventures",
    shortName: "Ventures",
    monogram: "BV",
    category: "Venture Building & Strategy",
    icon: "rocket",
    description:
      "Helping startups and SMEs design, build and scale high-impact businesses.",
    longDescription: [
      "BharatX Ventures is the group's engine for building new businesses. We work with founders, entrepreneurs and established SMEs to design companies with a clear thesis — a market worth serving, a model that can scale, and the operating discipline to survive contact with reality.",
      "Our role spans the full arc: early design work, capital structure, operating model, first customers and board-level guidance. We build alongside teams, not above them — the businesses we shape stay founder-led and independently owned.",
      "Venture building is slow work. BharatX Ventures optimises for durable businesses, not quick exits: companies that earn their revenue, respect their customers, and can compound for a decade.",
    ],
    website: "https://bharatx.vc/",
    domain: "bharatx.vc",
    logo: "/Ventures_logo.webp",
    heroImage: "/companies/bharatx-ventures/hero.webp",
    cinematicImage: "/companies/bharatx-ventures/hero.webp",
    accentColor: "#ff8904",
    capabilities: [
      {
        icon: "compass",
        title: "Venture Design",
        description:
          "Thesis-led design of new ventures: market, customer, value proposition and offer.",
      },
      {
        icon: "target",
        title: "Strategy & Positioning",
        description:
          "Positioning, pricing and go-to-market strategy built on evidence, not analogy.",
      },
      {
        icon: "workflow",
        title: "Operating Model",
        description:
          "The architecture that lets a small team run a big business: systems, cadence, ownership.",
      },
      {
        icon: "trending-up",
        title: "Growth & Go-To-Market",
        description:
          "Demand generation, sales motion and partnerships that produce repeatable pipeline.",
      },
      {
        icon: "landmark",
        title: "Capital & Structure",
        description:
          "Funding structure, investor readiness and long-term ownership design, advised with care.",
      },
      {
        icon: "users",
        title: "Talent & Board",
        description:
          "Hiring the first twenty people, and building a board that challenges and supports.",
      },
    ],
    applications: [
      {
        title: "New venture incubation",
        description:
          "From thesis to first revenue for businesses the group chooses to build.",
      },
      {
        title: "SME transformation",
        description:
          "Operating discipline and strategy for established companies ready to scale.",
      },
      {
        title: "Market entry",
        description:
          "Structuring entry into new geographies and categories with local insight.",
      },
      {
        title: "Pre-fund advisory",
        description:
          "Positioning a business for institutional capital on founder-friendly terms.",
      },
    ],
    focusAreas: [
      "Long-term ownership",
      "Operating discipline",
      "Founder-grade attention",
    ],
    howWeWork: [
      {
        title: "Diagnose",
        description:
          "We start with the market, the model and the team — and name the three things that will decide whether the business works.",
      },
      {
        title: "Design",
        description:
          "Business model, offer and operating architecture are designed together with the founding team.",
      },
      {
        title: "Build",
        description:
          "First hires, first systems, first customers. The venture is built to be run, not just launched.",
      },
      {
        title: "Scale",
        description:
          "Growth engine, governance and capital structure — engineered so the next decade is a continuation, not a reboot.",
      },
    ],
    vision:
      "A class of Indian businesses that are designed — not drifted — into where they are headed.",
    industries: ["venture-building", "ai-technology"],
    iframeEnabled: true,
  },
  {
    id: "aixperts",
    order: 2,
    slug: "aixperts-labs",
    name: "Aixperts Labs",
    shortName: "Aixperts",
    monogram: "AI",
    category: "AI & Digital Innovation",
    icon: "brain-circuit",
    description:
      "Engineering intelligence, automation and AI-first transformation.",
    longDescription: [
      "Aixperts Labs engineers intelligence into production systems. We build AI capabilities that live inside business workflows — document processing, prediction, automation and decision support — and we treat reliability as a feature, not a footnote.",
      "The lab works across the stack: from data foundations and model selection to the integration layer that makes an AI capability feel like part of the product. If it cannot run in production, we do not ship it as a demo.",
      "Our standard is simple: an AI system must be measurable, auditable and operable by the people it serves. We instrument everything, document every decision, and hand over systems the team can own.",
    ],
    website: "https://aixpertslabs.com/",
    domain: "aixpertslabs.com",
    logo: "/Ai-Experts_logo.webp",
    heroImage: "/companies/aixperts-labs/hero.webp",
    cinematicImage: "/assets/backgrounds/ai-circuit.webp",
    accentColor: "#34e0c5",
    capabilities: [
      {
        icon: "brain-circuit",
        title: "Applied AI & LLMs",
        description:
          "Language and vision models applied to real operational problems, evaluated on real data.",
      },
      {
        icon: "workflow",
        title: "Process Automation",
        description:
          "End-to-end automation of back-office and field workflows, from trigger to exception handling.",
      },
      {
        icon: "scan-eye",
        title: "Computer Vision",
        description:
          "Inspection, reading and classification systems for documents, assets and products.",
      },
      {
        icon: "database",
        title: "Data Engineering",
        description:
          "The pipelines, governance and quality controls that make AI dependable.",
      },
      {
        icon: "gauge",
        title: "AI Operations",
        description:
          "Monitoring, drift detection and performance reporting for systems in the wild.",
      },
      {
        icon: "shield-check",
        title: "Security & Governance",
        description:
          "Access controls, audit trails and responsible-AI guardrails, built in from day one.",
      },
    ],
    applications: [
      {
        title: "Document intelligence",
        description:
          "Contracts, invoices and field forms — read, classified and actioned automatically.",
      },
      {
        title: "Predictive maintenance",
        description:
          "Sensing and forecasting so equipment is serviced before it fails.",
      },
      {
        title: "Customer experience automation",
        description:
          "Assistants and triage systems that resolve, not just deflect.",
      },
      {
        title: "Decision copilots",
        description:
          "Context-aware recommendation layers for the people who make operational calls.",
      },
    ],
    focusAreas: [
      "Production-grade AI",
      "Workflow before model",
      "Measurable outcomes",
    ],
    howWeWork: [
      {
        title: "Discover & baseline",
        description:
          "We measure how the process works today, with numbers, before proposing what changes.",
      },
      {
        title: "Prototype on real data",
        description:
          "A working prototype against production-grade data — not a curated demo set.",
      },
      {
        title: "Pilot in production",
        description:
          "A bounded live pilot with clear success criteria and an exit plan if it misses them.",
      },
      {
        title: "Scale & harden",
        description:
          "Full rollout with monitoring, documentation and a team trained to operate it.",
      },
    ],
    vision: "Intelligence that lives inside the business — not beside it.",
    industries: ["ai-technology", "manufacturing"],
    iframeEnabled: true,
  },
  {
    id: "infratech",
    order: 3,
    slug: "bharatx-infratech",
    name: "BharatX Infratech",
    shortName: "Infratech",
    monogram: "BI",
    category: "Infrastructure & Civil Engineering",
    icon: "hard-hat",
    description:
      "Building reliable infrastructure for a growing India.",
    longDescription: [
      "BharatX Infratech builds the physical systems a growing country runs on: civil structures, industrial estates, urban works and the utilities that feed them. We are a builder's company — design, construction and operations under one roof.",
      "Our projects follow a simple standard: engineered for the loads they will actually see, built by trained crews, inspected at every milestone, and handed over with the documentation the next operator will need.",
      "We measure success decades out. The test of our work is not the ribbon-cutting — it is how the structure behaves after ten years of monsoon, traffic and use.",
    ],
    website: "https://bharatxinfratech.com/",
    domain: "bharatxinfratech.com",
    logo: "/Infra_logo1.png",
    heroImage: "/companies/bharatx-infratech/hero.webp",
    cinematicImage: "/assets/backgrounds/industrial.webp",
    accentColor: "#9fb3c8",
    capabilities: [
      {
        icon: "pencil-ruler",
        title: "Civil Design & Engineering",
        description:
          "Structural and civil design to code, optimised for local materials and conditions.",
      },
      {
        icon: "hard-hat",
        title: "Construction",
        description:
          "Full-site construction execution with trained crews and disciplined site management.",
      },
      {
        icon: "clipboard-list",
        title: "Project Management",
        description:
          "Planning, scheduling and cost control with transparent milestone reporting.",
      },
      {
        icon: "shield-check",
        title: "Quality & Safety",
        description:
          "A safety-first site culture and quality gates at every stage of the build.",
      },
      {
        icon: "wrench",
        title: "Operations & Maintenance",
        description:
          "Handover, O&M planning and long-life maintenance regimes for built assets.",
      },
      {
        icon: "boxes",
        title: "Industrial Estates",
        description:
          "Design and build of industrial parks, warehouses and utility-ready plots.",
      },
    ],
    applications: [
      {
        title: "Roads & urban mobility",
        description:
          "Surfaces, drainage and street infrastructure for growing cities.",
      },
      {
        title: "Industrial estates",
        description:
          "Utility-ready campuses that businesses can occupy and expand into.",
      },
      {
        title: "Public infrastructure",
        description:
          "Institutional projects delivered to specification and on schedule.",
      },
      {
        title: "Facilities & utilities",
        description:
          "Buildings, utilities and site works for industrial and institutional clients.",
      },
    ],
    focusAreas: [
      "Built to last",
      "Safety is non-negotiable",
      "Documentation from day one",
    ],
    howWeWork: [
      {
        title: "Plan & engineer",
        description:
          "Site studies, structural design and a build plan the whole team can hold to.",
      },
      {
        title: "Procure",
        description:
          "Materials and subcontracts chosen on specification, not on price alone.",
      },
      {
        title: "Construct",
        description:
          "Disciplined site execution with quality gates and daily safety review.",
      },
      {
        title: "Hand over & maintain",
        description:
          "As-built documentation, training and a maintenance regime that protects the asset.",
      },
    ],
    vision: "Infrastructure that a growing India can rely on, for decades.",
    industries: ["infrastructure"],
    iframeEnabled: true,
  },
  {
    id: "casters",
    order: 4,
    slug: "bharatx-engineering",
    name: "BharatX Engineering",
    shortName: "Engineering",
    monogram: "CG",
    category: "Caster Wheels & Mobility Solutions",
    icon: "cog",
    description:
      "Precision caster wheels and mobility solutions engineered for demanding applications.",
    longDescription: [
      "BharatX Engineering designs and manufactures precision caster wheels and mobility solutions for demanding applications — material handling, medical, retail and industrial automation. A caster is a small part with a big job: it carries load, absorbs shock and decides how everything moves.",
      "We engineer casters to specification: load ratings, wheel materials, brake behaviour, frame strength and finish. Our production tolerances are set for the applications our customers actually describe, not for an average.",
      "Every caster we ship is testable and traceable. When a customer specifies BharatX Engineering, they get a component they can document, audit and rely on for the life of the machine it is bolted to.",
    ],
    website: "https://castersglobal.com/",
    domain: "castersglobal.com",
    logo: "/Casters_logo.png",
    heroImage: "/companies/casters-global/hero.jpg",
    cinematicImage: "/assets/backgrounds/craft-metal.webp",
    accentColor: "#d98a4b",
    capabilities: [
      {
        icon: "cog",
        title: "Precision Engineering",
        description:
          "Caster design to the customer's load, speed and environment specification.",
      },
      {
        icon: "layers",
        title: "Materials & Load Science",
        description:
          "Wheel compounds, bearings and frame alloys selected for the duty cycle.",
      },
      {
        icon: "pencil-ruler",
        title: "Custom Design",
        description:
          "Bespoke casters, brakes and swivel geometries for non-standard applications.",
      },
      {
        icon: "badge-check",
        title: "Quality Assurance",
        description:
          "Dimensional checks, load testing and finish inspection before dispatch.",
      },
      {
        icon: "ship",
        title: "Global Logistics",
        description:
          "Export documentation and logistics for international programmes.",
      },
      {
        icon: "wrench",
        title: "After-Sales Engineering",
        description:
          "Failure analysis, replacement and design support after installation.",
      },
    ],
    applications: [
      {
        title: "Material handling",
        description: "Trolleys, racks and intralogistics systems that move all day.",
      },
      {
        title: "Medical mobility",
        description:
          "Casters for hospital equipment, designed for clean environments and quiet operation.",
      },
      {
        title: "Retail & display",
        description: "Low-profile casters for fixtures, POS and display systems.",
      },
      {
        title: "Industrial automation",
        description: "Mobility solutions for machines, AGVs and production lines.",
      },
    ],
    focusAreas: [
      "Precision to the millimetre",
      "Durability under load",
      "Global delivery",
    ],
    howWeWork: [
      {
        title: "Specify the load",
        description:
          "We start with the real numbers: load, speed, floor, environment, duty cycle.",
      },
      {
        title: "Engineer the caster",
        description:
          "Frame, wheel, bearing and brake are engineered to those numbers.",
      },
      {
        title: "Test & certify",
        description:
          "Prototype testing and dimensional certification before a single batch ships.",
      },
      {
        title: "Deliver & support",
        description:
          "Programme-based delivery with after-sales engineering behind every lot.",
      },
    ],
    vision: "Mobility, engineered to the last millimetre.",
    industries: ["manufacturing", "global-trade"],
    iframeEnabled: true,
  },
  {
    id: "bharatx-agro",
    order: 5,
    slug: "bharatx-agro",
    name: "BharatX Agro",
    shortName: "BX Agro",
    monogram: "BA",
    category: "Agricultural Ingredients & Exports",
    icon: "wheat",
    description:
      "Connecting Indian farms with global markets through premium ingredients and export-ready processing.",
    longDescription: [
      "BharatX Agro connects Indian farms with global markets through premium agricultural ingredients and export-ready processing. We source at origin, process to export specification, and document every lot end to end.",
      "Our strength is the chain between farm gate and foreign buyer: consistent quality across seasons, processing capacity matched to demand, and the documentation, certification and logistics that international trade requires.",
      "We build this business on traceability. A buyer overseas should be able to follow a lot from the farms it came from to the vessel it shipped on — and we intend for that to be the norm, not a premium.",
    ],
    website: "https://bharatxagro.com/",
    domain: "bharatxagro.com",
    logo: "/Bharatxagro_logo.png",
    heroImage: "/assets/backgrounds/agri-dusk.webp",
    cinematicImage: "/assets/backgrounds/agri-dusk.webp",
    accentColor: "#c2603e",
    capabilities: [
      {
        icon: "leaf",
        title: "Sourcing & Quality",
        description:
          "Origin sourcing with farm-level quality checks before a single lot is accepted.",
      },
      {
        icon: "factory",
        title: "Processing",
        description:
          "Cleaning, grading, extraction and packaging to export-grade specification.",
      },
      {
        icon: "file-check",
        title: "Export Compliance",
        description:
          "Certification, phytosanitary and documentation processes for international markets.",
      },
      {
        icon: "truck",
        title: "Supply Chain",
        description:
          "Inland logistics, consolidation and export handling across seasons.",
      },
      {
        icon: "beaker",
        title: "Product Development",
        description:
          "Custom blends, extracts and specifications developed with buyers.",
      },
      {
        icon: "globe",
        title: "Global Sales",
        description:
          "International trade operations and buyer relationships across key markets.",
      },
    ],
    applications: [
      {
        title: "Food ingredients",
        description:
          "Export-grade ingredients for food manufacturers at home and abroad.",
      },
      {
        title: "Specialty extracts",
        description:
          "High-value extracts and blends developed to buyer specification.",
      },
      {
        title: "Export-grade produce",
        description:
          "Seasonal produce handled, documented and shipped to international standard.",
      },
      {
        title: "Contract processing",
        description:
          "Processing capacity for agri-businesses that need export-ready output.",
      },
    ],
    focusAreas: [
      "Farm-gate integrity",
      "Traceability by default",
      "Export standards throughout",
    ],
    howWeWork: [
      {
        title: "Source at origin",
        description:
          "Farms and cooperatives are assessed and quality-checked before sourcing begins.",
      },
      {
        title: "Process to spec",
        description:
          "Each lot is processed to the buyer's specification, with checks at every stage.",
      },
      {
        title: "Certify & document",
        description:
          "Testing, certification and lot documentation complete before dispatch.",
      },
      {
        title: "Ship globally",
        description:
          "Logistics and customs handled so the lot arrives on time and on spec.",
      },
    ],
    vision: "Indian agriculture, presented to the world at global standard.",
    industries: ["agriculture", "food-systems", "global-trade"],
    iframeEnabled: true,
  },
  {
    id: "bharatx-labs",
    order: 6,
    slug: "bharatx-labs",
    name: "BharatX Labs",
    shortName: "BX Labs",
    monogram: "BL",
    category: "Frontier R&D & Sovereign AI",
    icon: "brain-circuit",
    description:
      "Frontier deep-tech research arm engineering sovereign foundation models, edge intelligence and quantum-resilient compute.",
    longDescription: [
      "BharatX Labs is the frontier deep-tech research division of BharatX Group. We investigate and build next-generation foundational artificial intelligence, domain-specific multilingual models, and quantum-resilient software systems designed specifically for Indian enterprise sovereignty.",
      "Operating in stealth R&D mode, the lab's researchers and engineers develop production-ready architectures that bridge advanced theoretical research with real-world industrial deployments.",
      "From neural coprocessors on the factory floor to Indic language LLMs that think natively in 22 regional dialects, BharatX Labs exists to ensure India creates and controls its critical computational infrastructure.",
    ],
    website: "/bharatx-labs",
    domain: "labs.bharatxgroup.com",
    heroImage: "/assets/backgrounds/ai-circuit.webp",
    cinematicImage: "/assets/backgrounds/ai-circuit.webp",
    accentColor: "#00f0ff",
    isUpcoming: true,
    status: "Upcoming · Stealth R&D",
    capabilities: [
      {
        icon: "brain-circuit",
        title: "Sovereign Multilingual LLMs",
        description:
          "Foundational language models natively pre-trained on 22 Indian regional languages and technical corpora.",
      },
      {
        icon: "cpu",
        title: "Physical & Edge Neural Compute",
        description:
          "Ultra-low latency inference pipelines embedded directly into industrial machinery and robotics.",
      },
      {
        icon: "shield-check",
        title: "Quantum-Resilient Security",
        description:
          "Post-quantum cryptographic algorithms engineered for national and institutional communications.",
      },
      {
        icon: "workflow",
        title: "Agentic Swarm Orchestration",
        description:
          "Multi-agent autonomous systems coordinating supply chain routing and predictive telemetry.",
      },
      {
        icon: "database",
        title: "Sovereign Data Fabrics",
        description:
          "Decentralized, privacy-preserving data architectures with verifiable cryptographic attestation.",
      },
      {
        icon: "scan-eye",
        title: "Industrial Computer Vision",
        description:
          "High-speed defect detection and spatial reasoning for automated manufacturing.",
      },
    ],
    applications: [
      {
        title: "National language AI",
        description: "Enterprise voice and text models for 22 Indian languages.",
      },
      {
        title: "Autonomous manufacturing",
        description: "Self-correcting edge robotics and computer vision telemetry.",
      },
      {
        title: "Critical infrastructure security",
        description: "Cryptographically hardened sovereign communication rails.",
      },
      {
        title: "Institutional research",
        description: "Collaborative research with premier Indian technical universities.",
      },
    ],
    focusAreas: [
      "Sovereign IP first",
      "Edge-native inference",
      "Research into production",
    ],
    howWeWork: [
      {
        title: "Hypothesize & Formalize",
        description: "Fundamental scientific exploration grounded in real-world industrial constraints.",
      },
      {
        title: "Train on Sovereign Infrastructure",
        description: "Pre-training and fine-tuning on domestic green compute clusters.",
      },
      {
        title: "Validate on Physical Testbeds",
        description: "Benchmarking against live industrial workloads across BharatX operating companies.",
      },
      {
        title: "Open Weights & Deployment",
        description: "Responsible public release and hardened commercial deployment.",
      },
    ],
    vision: "Sovereign artificial intelligence and deep-tech, engineered in India for the world.",
    industries: ["ai-technology"],
    iframeEnabled: false,
  },
  // The three entries below are written from copy already published on the BharatX site and, for Enterprises, its
  // own website (srm.kynyx.com). Sections without published copy are left empty and hidden on the detail page.
  {
    id: "enterprises",
    order: 7,
    slug: "bharatx-enterprises",
    name: "BharatX Enterprises",
    shortName: "Enterprises",
    monogram: "BE",
    category: "Packaging & Materials",
    icon: "boxes",
    description:
      "Complete industrial packaging materials, corrugated boxes, protective cushioning and bulk logistics containers.",
    longDescription: [
      "We supply the packaging that keeps goods safe on the move: corrugated boxes, protective cushioning, industrial packaging materials and bulk logistics containers.",
      "Packaging requirements can vary by product, application, handling conditions and supply volume. BharatX Enterprises works with businesses to provide packaging materials according to their specific requirements while supporting consistent quality and dependable bulk supply.",
      "Our focus is packaging that is efficient and sustainable. We use eco-conscious materials to protect products as they travel through the supply chain, from the factory to the customer.",
    ],
    website: "https://srm.kynyx.com/",
    domain: "srm.kynyx.com",
    heroImage: "/assets/backgrounds/packaging.webp",
    cinematicImage: "/assets/backgrounds/packaging.webp",
    accentColor: "#D97706",
    capabilities: [
      {
        icon: "shield-check",
        title: "Quality Focus",
        description: "Consistent attention to material, dimensions, thickness and product specifications.",
      },
      {
        icon: "pencil-ruler",
        title: "Custom Specifications",
        description: "Packaging can be supplied according to required size, thickness, ply, printing and application.",
      },
      {
        icon: "scale",
        title: "Competitive Value",
        description: "Packaging solutions designed to meet operational requirements while maintaining competitive pricing.",
      },
      {
        icon: "truck",
        title: "Reliable Supply",
        description: "Planned dispatch and bulk-supply support for recurring and project-based packaging requirements.",
      },
    ],
    applications: [
      {
        title: "Custom Packaging",
        description:
          "Custom sizes, thickness, multi-material fitments and branded prints developed from scratch to fit your exact part geometry and supply chain.",
      },
      {
        title: "Transit Packaging",
        description:
          "Heavy-duty shipping boxes, edge reinforcement, pallet wrapping, and strapping systems designed to survive stacking, shock, and transit vibration.",
      },
      {
        title: "Component Protection",
        description:
          "Custom CNC-routed and die-cut foam inserts, partitions, and pouches preventing metal-to-metal contact, abrasions, and mechanical deformation.",
      },
      {
        title: "Surface Protection",
        description:
          "Self-adhesive protective films, anti-scratch EPE sheets, and LDPE bubble rolls that safeguard high-gloss, painted, and polished surfaces during handling.",
      },
    ],
    focusAreas: ["Custom Specifications", "Bulk Supply", "Sample Approval", "Pan-India Supply"],
    howWeWork: [
      { title: "Requirement", description: "Share your product details, application and the protection it needs." },
      { title: "Material Selection", description: "We suggest the right material — corrugated, EPE foam, bubble, films or accessories." },
      { title: "Design", description: "Dimensions, ply, thickness and printing are finalised with you." },
      { title: "Prototype / Sample", description: "A sample is prepared for your approval before bulk production." },
      { title: "Production", description: "Bulk production and packaging supply as per the approved specification." },
      { title: "Dispatch", description: "Planned dispatch for regular and bulk industrial requirements." },
    ],
    vision: "Building efficient and sustainable packaging solutions for India's industries.",
    industries: [],
    // srm.kynyx.com sends X-Frame-Options: SAMEORIGIN, so it can't be shown in an iframe
    iframeEnabled: false,
    previewImage: "/companies/bharatx-enterprises/site.webp",
  },
  {
    id: "foundation",
    order: 8,
    slug: "bharatx-foundation",
    name: "BharatX Foundation",
    shortName: "Foundation",
    monogram: "BF",
    category: "Education & Social Impact",
    icon: "graduation-cap",
    description: "Building initiatives around education, skills and social development.",
    longDescription: [
      "We believe growth should open doors for people. Through the wider Group, we support education, skills and opportunity across India.",
      "We are building programmes for education, skills training and community development, so that more people can take part in India's growth and share in what it creates.",
    ],
    website: "",
    domain: "",
    heroImage: "/assets/backgrounds/impact-story.webp",
    cinematicImage: "/assets/backgrounds/impact-story.webp",
    accentColor: "#F54900",
    capabilities: [],
    applications: [],
    focusAreas: ["Education", "Programs", "Community", "Social Impact"],
    howWeWork: [],
    vision: "Through BharatX Foundation and the wider Group ecosystem, we aim to support education, skills and opportunity.",
    industries: [],
    iframeEnabled: false,
    isUpcoming: true,
    status: "Coming soon",
  },
  {
    id: "sustainability",
    order: 9,
    slug: "bharatx-sustainability",
    name: "BharatX Sustainability",
    shortName: "Sustainability",
    monogram: "BS",
    category: "Waste Management & Sustainability",
    icon: "recycle",
    description:
      "Building solutions around waste management, recycling, resource recovery and the circular economy.",
    longDescription: [
      "Our sustainability initiatives focus on better waste management, resource recovery, recycling and the development of circular business models.",
      "We are creating smarter approaches to waste management and resource recovery: industrial waste recovery, closed-loop polymer recycling, and zero-effluent manufacturing systems.",
    ],
    website: "",
    domain: "",
    heroImage: "/assets/backgrounds/sustainability-story.webp",
    cinematicImage: "/assets/backgrounds/sustainability-story.webp",
    accentColor: "#059669",
    capabilities: [],
    applications: [],
    focusAreas: ["Waste Management", "Operations", "Sustainability", "Circular Economy"],
    howWeWork: [],
    vision: "Turning Waste Into Opportunity.",
    industries: [],
    iframeEnabled: false,
    isUpcoming: true,
    status: "Coming soon",
  },
];

export function getCompany(slug: string | undefined): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getCompaniesById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function relatedCompanies(slug: string, count = 3): Company[] {
  const current = companies.findIndex((c) => c.slug === slug);
  if (current === -1) return companies.slice(0, count);
  const out: Company[] = [];
  for (let i = 1; i < companies.length && out.length < count; i++) {
    out.push(companies[(current + i) % companies.length]);
  }
  return out;
}
