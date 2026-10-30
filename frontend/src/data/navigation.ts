import type { NavItem } from "../types";

export const navigation: NavItem[] = [
  { label: "Home", to: "/", icon: "orbit" },
  { label: "About", to: "/about", icon: "info" },
  { label: "Businesses", to: "/verticals", icon: "layers", mega: "services" },
  // Hidden from the nav for now; the /how-we-build page still works. Uncomment to show it again.
  // { label: "How We Build", to: "/how-we-build", icon: "workflow" },
  { label: "Impact", to: "/impact", icon: "leaf" },
  { label: "Careers", to: "/careers", icon: "briefcase" },
  { label: "Contact", to: "/contact", icon: "mail" },
];

export const contactRoute = {
  label: "Contact",
  to: "/contact",
  icon: "mail",
};

export const footerSections = {
  businesses: [
    { label: "BharatX Labs", to: "/verticals#labs" },
    { label: "BharatX Ventures", to: "/verticals#ventures" },
    // { label: "BharatX Agro", to: "/verticals#agriculture" },
    { label: "BharatX Infratech", to: "/verticals#infrastructure" },
    { label: "BharatX Foundation", to: "/verticals#foundation" },
    { label: "BharatX Engineering", to: "/verticals#manufacturing" },
    { label: "BharatX Enterprises", to: "/verticals#packaging" },
    { label: "Aixperts Labs", to: "/verticals#tech-ai" },
    { label: "BharatX Sustainability", to: "/#what-comes-next" },
  ],
  group: [
    { label: "About", to: "/about" },
    { label: "How We Build", to: "/how-we-build" },
    { label: "Impact", to: "/impact" },
    { label: "Leadership", to: "/leadership" },
    { label: "Insights", to: "/insights" },
    { label: "Careers", to: "/careers" },
  ],
  connect: [
    { label: "LinkedIn", to: "https://www.linkedin.com/company/bharatx-group", external: true },
    { label: "YouTube", to: "https://www.youtube.com/@bharatxgroup", external: true },
    { label: "Instagram", to: "https://www.instagram.com/bharatxgroup", external: true },
    { label: "Facebook", to: "https://www.facebook.com/bharatxgroup", external: true },
    { label: "X", to: "https://x.com/bharatxgroup", external: true },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Cookies Policy", to: "/privacy#cookies" },
  ],
};
