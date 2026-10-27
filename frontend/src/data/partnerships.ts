export type PartnershipType = "MoU" | "Programme" | "Collaboration";

export interface Partnership {
  name: string;
  type: PartnershipType;
  description: string;
  /** Logo in /public/Partners; cards without one show an icon tile. */
  logo?: string;
  /** Link to an announcement or story; the card shows "Read more" only when set. */
  href?: string;
  /** Shown as the large photo card in the home page bento. */
  featured?: boolean;
  /** Parent body, shown on the featured card. */
  affiliation?: string;
}

/** Partnership kinds in display order, with their plural label and brand accent. */
export const partnershipTypes: Record<PartnershipType, { plural: string; accent: string }> = {
  MoU: { plural: "MoUs", accent: "#3026B3" },
  Programme: { plural: "Programmes", accent: "#15966B" },
  Collaboration: { plural: "Collaborations", accent: "#00B8D9" },
};

export const partnerships: Partnership[] = [
  {
    name: "Ministry of MSME",
    type: "Programme",
    description: "AI programme under the Ministry of MSME",
    logo: "/Partners/msme.png",
    featured: true,
    affiliation: "Government of India",
  },
  {
    name: "IIT Delhi",
    type: "MoU",
    description: "MoU with IIT Delhi",
    logo: "/Partners/iit-delhi.png",
  },
  {
    name: "NSIC",
    type: "MoU",
    description: "MoU with the National Small Industries Corporation (NSIC)",
    logo: "/Partners/nsic.png",
  },
  {
    name: "ONGC",
    type: "MoU",
    description: "MoU with ONGC",
    logo: "/Partners/ongc.png",
  },
  {
    name: "IGL",
    type: "MoU",
    description: "MoU with Indraprastha Gas Limited (IGL)",
    logo: "/Partners/igl.png",
  },
  {
    name: "CEHRO India",
    type: "Collaboration",
    description: "Collaboration with CEHRO India",
    logo: "/Partners/cehro-india.png",
  },
];
