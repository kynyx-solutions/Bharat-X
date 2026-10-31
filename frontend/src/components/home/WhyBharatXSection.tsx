import { motion } from "framer-motion";
import { servicesData } from "../../data/servicesData";
import { FeatureIcon } from "../common/FeatureIcon";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";

/** A figure from servicesData, so the proof points match what the rest of the site says. */
function stat(serviceId: string, label: string) {
  const found = servicesData.find((s) => s.id === serviceId)?.stats.find((s) => s.label === label);
  if (!found) throw new Error(`Unknown stat: ${serviceId} / ${label}`);
  return found;
}

// Technology leads: the group positions itself as AI-first, and the heading says "more than capital".
const pillars: { title: string; description: string; icon: string; proof: { value: string; label: string } }[] = [
  {
    title: "Technology",
    description: "AI and automation are built into every business from day one, by our own AI team, not added on later.",
    icon: "cpu",
    proof: stat("tech-ai", "AI Workflows Deployed"),
  },
  {
    title: "Execution",
    description: "Operators who have built roads, factories and supply chains, and who stay hands-on after launch.",
    icon: "cog",
    proof: stat("infrastructure", "Civil Projects Completed"),
  },
  {
    title: "Ecosystem",
    description: "Each business can draw on the others' customers, suppliers, partners and know-how.",
    icon: "network",
    // Same group figure as the stats strip under the hero
    proof: { value: "6", label: "Operating Businesses" },
  },
  {
    title: "Capital",
    description: "Patient, long-term capital from people who stay involved in how it is used.",
    icon: "landmark",
    proof: stat("ventures", "Portfolio Enterprise Value"),
  },
];

export function WhyBharatXSection() {
  return (
    <SectionTransition
      id="why-bharatx"
      aria-label="Why BharatX"
      className="relative overflow-hidden bg-white py-6 sm:py-9"
    >
      <div className="container-x relative z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs">
            <span className="h-2 w-2 rounded-full bg-bx-navy-700" />
            <span>WHY BHARATX</span>
          </div>

          <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-6xl font-medium leading-tight tracking-tight text-bx-navy-700">
            More Than Capital.<br /> <span className="text-bx-orange">More Than Strategy.</span>
          </h2>

          <p className="mt-3 text-base text-bx-slate max-w-2xl leading-relaxed">
            Four strengths every BharatX business shares, so each one starts further ahead than it could on its own.
          </p>
        </div>

        {/* Pillars */}
        <Stagger className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div
                data-cursor="card"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bx-line bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-bx-navy-700/40 hover:shadow-lg"
              >
                {/* Top line that draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] w-0 bg-bx-orange transition-all duration-400 ease-out group-hover:w-full"
                />

                <FeatureIcon name={pillar.icon} accent="#163A7A" size={44} className="mb-4" />

                <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-bx-ink">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-bx-slate">{pillar.description}</p>

                {/* Proof point, pinned to the bottom so the figures line up across cards */}
                <div className="mt-auto pt-5">
                  <div className="border-t border-bx-line pt-4">
                    <p className="font-heading text-3xl font-medium leading-none tracking-tight text-bx-navy-700 tabular-nums">
                      {pillar.proof.value}
                    </p>
                    <p className="mt-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-bx-slate">
                      {pillar.proof.label}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Statement banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-10 relative overflow-hidden rounded-3xl border border-bx-navy-700/30 bg-gradient-to-r from-bx-navy-900 via-bx-navy-700 to-bx-navy-900 p-8 sm:p-12 md:p-14 text-center text-white shadow-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bx-orange to-transparent opacity-80" />

          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange font-bold mb-3">
            How We Work
          </p>

          <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium leading-tight tracking-tight text-white max-w-4xl mx-auto">
            “We don’t just back businesses.{" "}
            <br />
            <span className="text-bx-orange">We help build them.</span>”
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Operating leadership, patient capital and the whole BharatX network, from the first idea to full scale.
          </p>
        </motion.div>
      </div>
    </SectionTransition>
  );
}
