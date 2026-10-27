export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  logoLight: string;
  favicon: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    pincode: string;
    full: string;
  };
  /** Offices other than the registered office (above). */
  offices: {
    city: string;
    state: string;
    full: string;
    /** What the map searches for, when Google can't place the full address itself. */
    mapQuery?: string;
    /** An exact Google Maps embed link (Share → Embed a map); used instead of searching. */
    mapEmbed?: string;
  }[];
  contact: {
    phone: string;
    phoneFormatted: string;
    phoneTel: string;
    email: string;
  };
  social: {
    label: string;
    href: string;
  }[];
}

export const brandConfig: BrandConfig = {
  name: "BharatX Group",
  shortName: "BharatX",
  tagline: "Building Businesses. Enabling Bharat.",
  logo: "/assets/brand/logo.svg",
  logoLight: "/assets/brand/logo-light.svg",
  favicon: "/assets/brand/favicon.svg",
  address: {
    line1: "Building no. 511 First Floor",
    line2: "Motilal Nehru Complex",
    city: "New Delhi",
    pincode: "110017",
    full: "Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017",
  },
  offices: [
    {
      city: "Lucknow",
      state: "Uttar Pradesh",
      full: "982 Village Andpurdev, Banthra, Sarojni Nagar, Lucknow 226401, Uttar Pradesh",
      // Exact pin supplied for the office (listed on Google as "Sumedha Agro"); directions go to the same place.
      mapQuery: "Sumedha Agro, Banthra, Lucknow, Uttar Pradesh 226401",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.0030827303112!2d80.8154848!3d26.712348499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf9ed1fb228ab%3A0x78ecca2da48580d!2sSumedha%20Agro!5e0!3m2!1sen!2sin!4v1793105658656!5m2!1sen!2sin",
    },
    {
      city: "Gaya",
      state: "Bihar",
      full: "H. No. 136, Beladih, Cherki Bazar, Gaya, Bihar – 824237",
      // Exact pin supplied for the office; directions use Beladih, Cherki Bazar.
      mapQuery: "Beladih, Cherki Bazar, Gaya, Bihar 824237",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d925.5065020740368!2d84.88496711719066!3d24.6901111527183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20Beladih%2C%20Cherki%20Bazar%2C%20Gaya%2C%20Bihar%20%E2%80%93%20824237%2C%20India!5e0!3m2!1sen!2sin!4v1793105599950!5m2!1sen!2sin",
    },
    {
      city: "Patna",
      state: "Bihar",
      full: "Maurya Lok Complex, New Dak Bunglow Rd, Lodipur, Patna, Bihar 800001",
      // Exact pin supplied for the office (listed on Google as "B-HUB"); directions go to the same place.
      mapQuery: "B-HUB, Maurya Lok Complex, Patna, Bihar 800001",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.5886431803106!2d85.13181868872081!3d25.610105620143987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59346f4e3b4d%3A0xdaa21a164b9e944f!2sB-HUB!5e0!3m2!1sen!2sin!4v1793105729867!5m2!1sen!2sin",
    },
  ],
  contact: {
    phone: "9811263046",
    phoneFormatted: "+91 98112 63046",
    phoneTel: "+919811263046",
    email: "contact@bharatxgroup.com",
  },
  // Placeholders — replace with real profiles when available.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/bharatx-group" },
    { label: "Instagram", href: "https://www.instagram.com/bharatxgroup" },
    { label: "YouTube", href: "https://www.youtube.com/@bharatxgroup" },
    { label: "Facebook", href: "https://www.facebook.com/bharatxgroup" },
    { label: "X", href: "https://x.com/bharatxgroup" },
  ],
};

export const siteConfig = {
  name: brandConfig.name,
  domain: "https://www.bharatxgroup.com",
  region: "India",
  address: brandConfig.address.full,
  phone: brandConfig.contact.phoneFormatted,
  phoneTel: brandConfig.contact.phoneTel,
  foundedNote:
    "BharatX Group is a diversified multi-sector conglomerate operating from India.",
};

