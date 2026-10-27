import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { Reveal } from "../common/Reveal";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";

interface PressRelease {
  id: string;
  category: string;
  date: string;
  publisher: string;
  title: string;
  excerpt: string;
  link: string;
  image: string;
}

const pressReleases: PressRelease[] = [
  {
    id: "lead-1",
    category: "Strategic Infrastructure",
    date: "18 Sep, 2026",
    publisher: "BharatX Group Communications",
    title:
      "BharatX Group announces expansion of sovereign AI compute nodes and integrated freight corridors across 5 key states.",
    excerpt:
      "A strategic capital deployment consolidating domestic physical connectivity with indigenous multilingual automation to enhance India's industrial manufacturing competitiveness.",
    link: "/verticals#tech-ai",
    image: "/assets/backgrounds/infrastructure-real.jpg",
  },
  {
    id: "item-2",
    category: "Sovereign AI",
    date: "04 Sep, 2026",
    publisher: "Technology & AI Bureau",
    title:
      "Operationalisation of high-performance multilingual neural decision models across 22 regional Indian languages.",
    excerpt:
      "Delivering voice, document triage, and automated telemetry directly to enterprise operations without reliance on foreign black-box dependencies.",
    link: "/verticals#tech-ai",
    image: "/assets/backgrounds/ai-circuit.jpg",
  },
  {
    id: "item-3",
    category: "Food Systems & Exports",
    date: "22 Aug, 2026",
    publisher: "Food Systems Directorate",
    title:
      "Farm-gate cold chain traceability network expands across 1,200+ certified growers and 5,000+ MT commodities.",
    excerpt:
      "Delivering origin-authenticated agricultural commodities and unbroken temperature-controlled corridors directly into global export channels.",
    link: "/verticals#agriculture",
    image: "/assets/backgrounds/hero-field.jpg",
  },
  {
    id: "item-4",
    category: "Precision Engineering",
    date: "08 Aug, 2026",
    publisher: "Advanced Manufacturing Bureau",
    title:
      "Commissioning of automated high-tolerance robotic production line for specialized industrial hardware.",
    excerpt:
      "Sub-micron metallurgical casting and certified fatigue-resistant components engineered to stringent global aerospace and defense standards.",
    link: "/verticals#manufacturing",
    image: "/assets/backgrounds/craft-metal.jpg",
  },
];

export function InstitutionalNewsroom() {
  const lead = pressReleases[0];
  const listItems = pressReleases.slice(1);

  return (
    <SectionTransition>
      <section className="relative overflow-hidden py-6 sm:py-9 bg-[#F7F7FC] text-[#111827] dark:bg-night-950 dark:text-white">
        <div className="container-x relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-7 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-[#3026B3] dark:text-[#F54900] mb-2">
                <span className="text-[#F54900] animate-pulse">◆</span>
                <span>CORPORATE DISCLOSURES</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] dark:text-white hover:text-[#F54900] transition-colors duration-300">
                Announcement &amp; News
              </h2>
            </div>

            <Link
              to="/contact"
              data-cursor="link"
              className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#3026B3] hover:text-[#211B72] dark:text-gold-400 dark:hover:text-gold-300 transition-colors"
            >
              <span>Media Relations Desk</span>
              <Icon
                name="arrow-right"
                width={13}
                height={13}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>

          {/* Featured Lead Announcement (RIL Style) */}
          <Reveal>
            <div
              data-cursor="card"
              tabIndex={0}
              className="group relative overflow-hidden rounded-3xl border border-[#E3E5EF] bg-white shadow-sm transition-all duration-300 hover:border-[#3026B3]/40 hover:shadow-xl hover:-translate-y-1 mb-8 sm:mb-12 dark:border-white/10 dark:bg-white/[0.02] fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 font-sans text-[10.5px] uppercase tracking-wider text-[#596579] mb-4">
                      <span className="text-[#3026B3] dark:text-gold-400 font-semibold">{lead.category}</span>
                      <span>·</span>
                      <span>{lead.publisher}</span>
                      <span>·</span>
                      <span>{lead.date}</span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111827] dark:text-white leading-tight group-hover:text-[#F54900] transition-colors duration-300">
                      {lead.title}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-[#596579] dark:text-slate-300 leading-relaxed font-sans">
                      {lead.excerpt}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={lead.link}
                      data-cursor="link"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#3026B3] hover:text-[#211B72] dark:text-gold-400 dark:hover:text-gold-300 transition-colors"
                    >
                      <span>Read official release</span>
                      <Icon name="arrow-right" width={14} height={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 lg:h-auto min-h-[300px] overflow-hidden relative">
                  <img
                    src={lead.image}
                    alt=""
                    data-cursor="image"
                    className="h-full w-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/20 lg:to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3-Card Bottom Grid (RIL Style) */}
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listItems.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  to={item.link}
                  data-cursor="card"
                  className="group flex flex-col justify-between h-full rounded-2xl border border-[#E3E5EF] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#3026B3]/40 hover:shadow-xl hover:-translate-y-1.5 dark:border-white/10 dark:bg-white/[0.02] fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden rounded-xl mb-5">
                      <img
                        src={item.image}
                        alt=""
                        data-cursor="image"
                        className="h-full w-full object-cover object-top filter brightness-[0.95] transition-transform duration-500 group-hover:scale-108"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 font-sans text-[9px] uppercase tracking-wider text-[#3026B3] border border-[#E3E5EF] font-semibold dark:bg-black/60 dark:text-gold-400 dark:border-white/10">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-medium text-[#111827] group-hover:text-[#F54900] dark:text-white transition-colors line-clamp-3 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E3E5EF] pt-4 font-sans text-[10px] text-[#596579] dark:border-white/10 dark:text-slate-400">
                    <span>{item.date}</span>
                    <span className="text-[#3026B3] dark:text-gold-400 font-semibold group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                      Details →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </SectionTransition>
  );
}
