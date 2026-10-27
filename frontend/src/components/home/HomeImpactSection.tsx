import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";

const impactAreas = [
  {
    title: "Infrastructure",
    description: "Arterial connectivity, civil utilities, and physical foundation for economic corridors.",
    image: "/assets/backgrounds/infrastructure-real.jpg",
    link: "/impact#infrastructure",
    accent: "#3026B3",
    badgeBg: "bg-[#3026B3]",
  },
  {
    title: "Agriculture",
    description: "Farmer-direct value chains, origin traceability, and export-grade commodity security.",
    image: "/assets/backgrounds/agri-dusk.jpg",
    link: "/impact#agriculture",
    accent: "#15966B",
    badgeBg: "bg-[#15966B]",
  },
  {
    title: "Manufacturing",
    description: "High-precision components, industrial mobility, and import-substitution capabilities.",
    image: "/assets/backgrounds/craft-metal.jpg",
    link: "/impact#manufacturing",
    accent: "#00B8D9",
    badgeBg: "bg-[#008299]",
  },
  {
    title: "Technology",
    description: "Sovereign enterprise intelligence, automated workflows, and digital infrastructure.",
    image: "/assets/backgrounds/ai-circuit.jpg",
    link: "/impact#technology",
    accent: "#4B40D4",
    badgeBg: "bg-[#4B40D4]",
  },
  {
    title: "Sustainability",
    description: "Circular materials, resource recovery, and industrial decarbonization pathways.",
    image: "/assets/backgrounds/sustainability-story.jpg",
    link: "/impact#sustainability",
    accent: "#10B981",
    badgeBg: "bg-[#047857]",
  },
];

export function HomeImpactSection() {
  return (
    <SectionTransition
      id="impact"
      aria-label="Impact and Economic Value"
      className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9"
    >
      <div className="container-x relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center group/header">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs cursor-default"
          >
            <span className="h-2 w-2 rounded-full bg-[#15966B] transition-transform duration-300 group-hover/header:scale-125" />
            <span>IMPACT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-heading text-3xl sm:text-4xl md:text-6xl font-medium leading-tight tracking-tight text-[#111827] transition-colors hover:text-[#15966B]"
          >
            Building Economic Value.<br />
            <span className="text-[#15966B]">Creating Wider Impact.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-[#596579] font-normal max-w-2xl mx-auto"
          >
            We measure our success not only by the businesses we build, but by the jobs, capabilities, infrastructure and opportunities they create.
          </motion.p>
        </div>

        {/* Clean Visual with Five High-Contrast Areas */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {impactAreas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * idx }}
            >
              <Link
                to={area.link}
                data-cursor="card"
                className="fx-zoom-img group relative flex h-80 sm:h-88 flex-col justify-between overflow-hidden rounded-2xl border border-[#E3E5EF] p-6 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#15966B]"
              >
                {/* Background image */}
                <img
                  src={area.image}
                  alt={area.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Overlays for high contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-300 group-hover:via-black/50" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`font-sans text-[10px] uppercase tracking-wider text-white font-bold px-2.5 py-1 rounded-md ${area.badgeBg} shadow-xs transition-transform duration-300 group-hover:scale-105`}
                  >
                    Area 0{idx + 1}
                  </span>
                  <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <Icon name="arrow-up-right" width={13} height={13} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-white group-hover:text-[#F54900] transition-colors">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] text-slate-200 line-clamp-3 leading-relaxed">
                    {area.description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-wider text-[#F54900] font-bold fx-arrow">
                    <span className="fx-underline">Learn More</span>
                    <Icon name="arrow-right" width={12} height={12} className="fx-arrow-icon" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
