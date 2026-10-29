import { motion } from "framer-motion";
import { SectionTransition } from "../motion/SectionTransition";
import { SpotlightCard } from "../motion/SpotlightCard";
import { CardPhoto, cardImage } from "../common/CardSurface";
import { FeatureIcon } from "../common/FeatureIcon";

// Spotlight colours are light accent tints so the cursor glow shows over the photos.
const approachSteps: {
  num: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
  image: string;
  borderHover: string;
  spotlight: string;
}[] = [
    {
      num: "01",
      label: "IDENTIFY",
      description: "Spot structural market gaps and high-conviction industrial opportunities across India.",
      icon: "target",
      accent: "#3026B3",
      image: cardImage("home-01-approach-identify"),
      borderHover: "hover:border-[#3026B3]",
      spotlight: "rgba(162, 157, 221, 0.2)",
    },
    {
      num: "02",
      label: "BUILD",
      description: "Assemble physical infrastructure, localized technology stacks, and operational leadership.",
      icon: "hard-hat",
      accent: "#F54900",
      image: cardImage("home-02-approach-build"),
      borderHover: "hover:border-[#F54900]",
      spotlight: "rgba(241, 209, 140, 0.2)",
    },
    {
      num: "03",
      label: "INVEST",
      description: "Commit patient, long-horizon balance sheet capital and strategic resources.",
      icon: "landmark",
      accent: "#00B8D9",
      image: cardImage("home-03-approach-invest"),
      borderHover: "hover:border-[#00B8D9]",
      spotlight: "rgba(140, 223, 238, 0.2)",
    },
    {
      num: "04",
      label: "SCALE",
      description: "Expand manufacturing capacity, distribution channels, and pan-India market reach.",
      icon: "trending-up",
      accent: "#15966B",
      image: cardImage("home-04-approach-scale"),
      borderHover: "hover:border-[#15966B]",
      spotlight: "rgba(150, 208, 188, 0.2)",
    },
    {
      num: "05",
      label: "IMPACT",
      description: "Deliver compounding economic returns, job creation, and sovereign national capability.",
      icon: "sparkles",
      accent: "#4B40D4",
      image: cardImage("home-05-approach-impact"),
      borderHover: "hover:border-[#4B40D4]",
      spotlight: "rgba(174, 169, 236, 0.2)",
    },
  ];

/*
 * Journey layout (desktop). Columns are equal fifths, so stop i sits at x = 100 + 200·i in the
 * 1000-wide viewBox. NODE_Y is each stop's distance from the top in px: the steps climb left to right.
 */
const NODE_Y = [500, 455, 410, 365, 320];
const JOURNEY_HEIGHT = 560;

function buildRoad() {
  const stops = NODE_Y.map((y, i) => [100 + 200 * i, y] as const);
  const [x0, y0] = stops[0];
  let d = `M 0 ${JOURNEY_HEIGHT - 4} C 55 ${JOURNEY_HEIGHT - 4}, 45 ${y0}, ${x0} ${y0}`;
  for (let i = 0; i < stops.length - 1; i++) {
    const [x1, y1] = stops[i];
    const [x2, y2] = stops[i + 1];
    // Every other stretch sags below both stops, so the road winds instead of stepping evenly.
    const sag = i % 2 ? 36 : 0;
    d += ` C ${x1 + 100} ${y1 + sag}, ${x2 - 100} ${y2 + sag}, ${x2} ${y2}`;
  }
  const [xn, yn] = stops[stops.length - 1];
  return `${d} C ${xn + 50} ${yn}, ${xn + 60} ${yn - 40}, 1000 ${yn - 48}`;
}

const ROAD_PATH = buildRoad();

export function OurApproachSection() {
  return (
    <SectionTransition
      id="our-approach"
      aria-label="Our Approach"
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
            className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#008299] font-bold shadow-xs cursor-default"
          >
            <span className="h-2 w-2 rounded-full bg-[#00B8D9] transition-transform duration-300 group-hover/header:scale-125" />
            <span>OUR APPROACH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight text-[#111827] transition-colors hover:text-[#F54900]"
          >
            From Opportunity to <br /> <span className="text-[#3026B3]">Enterprise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-[#596579] font-normal"
          >
            We combine capital, technology, talent and execution to turn opportunities into scalable enterprises.
          </motion.p>
        </div>

        {/* Desktop: the steps climb a winding road, bottom-left to top-right */}
        <motion.div
          data-journey
          className="relative mt-6 hidden lg:block xl:-mt-6"
          style={{ height: JOURNEY_HEIGHT }}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/*
            The road wipes in left to right, triggered by the container: a fully clipped element never
            registers as in view. (pathLength can't be used: the stretched, non-scaling stroke mis-measures it.)
          */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-y-4 inset-x-0"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.6, ease: "easeInOut" } },
            }}
          >
            <svg
              viewBox={`0 0 1000 ${JOURNEY_HEIGHT}`}
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-4 w-full overflow-visible"
              style={{ height: JOURNEY_HEIGHT }}
            >
              <path d={ROAD_PATH} fill="none" stroke="#E3E5EF" strokeWidth={26} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              {/* Dashed centre line, like road markings */}
              <path d={ROAD_PATH} fill="none" stroke="#FFFFFF" strokeWidth={2} strokeDasharray="10 12" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>

          <ol className="relative grid h-full grid-cols-5 items-start">
            {approachSteps.map((step, idx) => (
              // Each column ends at its stop on the road; the card sits above it on a dashed stem.
              <li key={step.label} className="relative flex flex-col justify-end px-2 pb-6 xl:px-3" style={{ height: NODE_Y[idx] }}>
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + 0.22 * idx }}
                >
                  <ApproachCard step={step} />
                </motion.div>
                <span aria-hidden className="mx-auto h-6 border-l-2 border-dashed" style={{ borderColor: step.accent }} />
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + 0.22 * idx, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <JourneyStop step={step} />
                </motion.span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Mobile & tablet: the same journey as a vertical road */}
        <ol className="relative mt-10 lg:hidden">
          <span aria-hidden className="absolute bottom-8 left-6 top-8 w-3.5 -translate-x-1/2 rounded-full bg-[#E3E5EF]">
            <span className="absolute inset-y-2 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white" />
          </span>
          {approachSteps.map((step, idx) => (
            <motion.li
              key={step.label}
              className="relative pb-4 pl-16 last:pb-0"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * idx }}
            >
              <span className="absolute left-0 top-5">
                <JourneyStop step={step} />
              </span>
              <ApproachCard step={step} />
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionTransition>
  );
}

type ApproachStep = (typeof approachSteps)[number];

/** Stop on the road: white disc with the step number on the step's accent, dashed inner ring. */
function JourneyStop({ step }: { step: ApproachStep }) {
  return (
    <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-6px_rgba(13,16,38,0.35)] ring-1 ring-[#E3E5EF]">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-white/70 font-sans text-xs font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
        style={{ background: step.accent }}
      >
        {step.num}
      </span>
    </span>
  );
}

function ApproachCard({ step }: { step: ApproachStep }) {
  return (
    // The card box carries the photo; SpotlightCard sits on top (transparent) so its cursor glow stays visible over it
    <div
      data-cursor="card"
      className={`group relative h-full rounded-2xl border border-white/10 bg-[#0D1026] shadow-md transition-all duration-300 hover:z-20 hover:shadow-xl hover:-translate-y-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#3026B3] ${step.borderHover}`}
    >
      <CardPhoto src={step.image} accent={step.accent} />

      <SpotlightCard spotlightColor={step.spotlight} className="relative h-full rounded-[inherit] p-6 [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
        {/* Icon and title share a row (stacked on the narrow lg columns); the description sits below on the same left edge */}
        <div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center">
          <FeatureIcon
            name={step.icon}
            accent={step.accent}
            size={36}
            className="shrink-0 transition-transform duration-300 group-hover:scale-110 fx-icon-pop"
          />
          <h3 className="font-heading text-base sm:text-lg font-semibold tracking-[0.08em] text-white uppercase group-hover:text-[#FF8904] transition-colors">
            {step.label}
          </h3>
        </div>

        {/*
          Step Description. Every step's text is laid out in the same cell and only this one is shown,
          so all cards take the height of the longest description at any width.
        */}
        <div className="mt-3 grid">
          {approachSteps.map((s) => (
            <p
              key={s.label}
              aria-hidden={s !== step || undefined}
              className={`col-start-1 row-start-1 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal ${s === step ? "" : "invisible"}`}
            >
              {s.description}
            </p>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}
