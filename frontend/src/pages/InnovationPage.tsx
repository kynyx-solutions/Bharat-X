import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

const innovationPillars: { icon: string; title: string; desc: string; metric: string; image: string }[] = [
  {
    icon: "brain-circuit",
    title: "Applied Multilingual AI",
    desc: "Production-grade neural architectures natively tuned across 22 Indian regional dialects, eliminating black-box cloud dependence.",
    metric: "22+ Dialects",
    image: cardImage("innovation-01-frontier-multilingual-ai"),
  },
  {
    icon: "cpu",
    title: "Sovereign Edge Computing",
    desc: "Industrial telemetry and real-time decision algorithms deployed on-premise for mission-critical manufacturing and civil works.",
    metric: "< 28ms Latency",
    image: cardImage("innovation-02-frontier-edge-computing"),
  },
  {
    icon: "factory",
    title: "Precision Robotics & Tooling",
    desc: "Sub-micron computer vision inspection, automated weld robotics, and metallurgical casting certified to aerospace specifications.",
    metric: "Sub-Micron",
    image: cardImage("innovation-03-frontier-precision-robotics"),
  },
  {
    icon: "sprout",
    title: "Agronomic Deep-Tech",
    desc: "Sensor-guided soil nutrient diagnostics, autonomous field mechanisation, and harvest optimization for resilient domestic yields.",
    metric: "2.4x Yield Multiplier",
    image: cardImage("innovation-04-frontier-agronomic-deeptech"),
  },
  {
    icon: "shield-check",
    title: "Cryptographic Data Sovereignty",
    desc: "Complete domestic data residency and auditable operational intelligence protecting strategic national supply chains.",
    metric: "100% In-Country",
    image: cardImage("innovation-05-frontier-data-sovereignty"),
  },
  {
    icon: "layers",
    title: "Cold Chain Traceability",
    desc: "Continuous IoT temperature monitoring and phytosanitary tracking from farm gate to international deepwater export terminals.",
    metric: "< 2% Post-Harvest Loss",
    image: cardImage("innovation-06-frontier-cold-chain"),
  },
];

const roadmapPhases: { number: string; phase: string; title: string; desc: string }[] = [
  {
    number: "01",
    phase: "Foundational Telemetry",
    title: "Clean Data & Industrial Baselining",
    desc: "Instrumenting core physical operations with robust telemetry, standardized interfaces, and transparent operational baselines.",
  },
  {
    number: "02",
    phase: "Production Intelligence",
    title: "Autonomous Decision Workflows",
    desc: "Deploying proprietary neural workflows in live production — automating document processing, predictive civil maintenance, and sorting lines.",
  },
  {
    number: "03",
    phase: "Sovereign Scaling",
    title: "National Industrial Compounding",
    desc: "Expanding domestic computing capacity, automated robotics lines, and climate-controlled agricultural arteries across Pan-India corridors.",
  },
  {
    number: "04",
    phase: "Global Frontier",
    title: "Exporting Sovereign Standards",
    desc: "Commercializing certified Indian precision hardware, bio-agricultural formulations, and resilient enterprise software on global markets.",
  },
];

export default function InnovationPage() {
  usePageMeta({
    title: "Innovation & Deep-Tech Frontiers — BharatX Group",
    description:
      "How BharatX engineers sovereign artificial intelligence, precision industrial robotics, and resilient agricultural deep-tech for India.",
    path: "/innovation",
  });

  return (
    <main className="min-h-screen bg-bx-cream text-bx-ink pt-24 pb-8">
      {/* ── 1. INNOVATION HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="h-full w-full object-cover object-top filter brightness-[0.92] contrast-[1.15] animate-hero-zoom"
            data-cursor="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        </div>

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange mb-4">
              <span className="animate-pulse">◆</span>
              <span className="text-white">INNOVATION AGENDA</span>
            </div>
            <AnimatedHeading as="h1" effect="words" hover="color" className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-white">
              Innovation is a Way of Life.
              <br />
              <span className="italic text-bx-orange">Engineered for Sovereignty.</span>
            </AnimatedHeading>
            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Our growth is propelled by bold research and development. We build foundational AI, precision robotics, and agrarian sciences engineered to operate without external dependency.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. METRICS BANNER ───────────────────────────────────────────── */}
      <SectionTransition className="py-6 bg-bx-cream">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div data-cursor="card" className="p-4 rounded-2xl bg-bx-navy-700 shadow-md transition-all duration-300 fx-lift hover:shadow-lg">
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-white block transition-transform hover:scale-105">22+</span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-white/90 mt-1 block">
                Regional Indian Dialects Supported
              </span>
            </div>
            <div data-cursor="card" className="p-4 rounded-2xl bg-bx-navy-900 shadow-md transition-all duration-300 fx-lift hover:shadow-lg">
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-bx-orange-light block transition-transform hover:scale-105">Sub-Micron</span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-white/90 mt-1 block">
                Precision Tolerance Standards
              </span>
            </div>
            <div data-cursor="card" className="p-4 rounded-2xl bg-bx-cyan-dark shadow-md transition-all duration-300 fx-lift hover:shadow-lg">
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-white block transition-transform hover:scale-105">100%</span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-white/90 mt-1 block">
                Domestic Data Residency
              </span>
            </div>
            <div data-cursor="card" className="p-4 rounded-2xl bg-bx-green shadow-md transition-all duration-300 fx-lift hover:shadow-lg">
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-white block transition-transform hover:scale-105">&lt; 28ms</span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-white/90 mt-1 block">
                Edge Model Inference Latency
              </span>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 3. SIX INNOVATION PILLARS ───────────────────────────────────── */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-bx-navy-700 font-semibold">
              CORE DISCIPLINES
            </span>
            <AnimatedHeading as="h2" effect="words" hover="color" className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-ink">
              Strategic Frontiers of Technology
            </AnimatedHeading>
            <p className="mt-3 text-bx-slate text-sm sm:text-base font-sans">
              How we translate frontier engineering into real-world production capability.
            </p>
          </div>

          <Stagger staggerDelay={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {innovationPillars.map((p, i) => {
              const colors = ["#163A7A", "#00B8D9", "#F54900", "#15966B", "#163A7A", "#00B8D9"];
              const pillarColor = colors[i % colors.length];
              return (
                <StaggerItem key={p.title}>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-bx-night p-7 shadow-md transition-all duration-300 hover:border-bx-navy-700 hover:shadow-2xl fx-lift"
                  >
                    <CardPhoto src={p.image} accent={pillarColor} />
                    <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                      <div className="flex items-center justify-between mb-5">
                        <FeatureIcon
                          name={p.icon}
                          accent={pillarColor}
                          size={40}
                          className="transition-transform duration-300 group-hover:scale-110 fx-icon-bounce"
                        />
                        <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm transition-transform group-hover:scale-105">
                          {p.metric}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl sm:text-2xl text-white font-medium transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 4. ROADMAP TIMELINE ─────────────────────────────────────────── */}
      <SectionTransition className="relative overflow-hidden py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-2xl mb-10">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.24em] text-bx-navy-700 font-semibold">
              DEVELOPMENT HORIZON
            </span>
            <AnimatedHeading as="h2" effect="words" hover="color" className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-ink">
              The Path to Deep-Tech Autonomy
            </AnimatedHeading>
          </div>

          <Stagger staggerDelay={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roadmapPhases.map((phase, idx) => {
              const phaseColors = ["#163A7A", "#00B8D9", "#F54900", "#15966B"];
              const pColor = phaseColors[idx % phaseColors.length];
              return (
                <StaggerItem key={phase.number}>
                  <div
                    data-cursor="card"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-6 flex flex-col justify-between shadow-md cursor-card hover:border-bx-navy-700 transition-all duration-300 fx-lift hover:shadow-xl h-full"
                  >
                    <CardFill accent={pColor} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-sans text-xs font-bold text-white/90 transition-transform duration-300 group-hover:scale-125">
                          {phase.number}
                        </span>
                        <span className="font-sans text-[10px] uppercase text-white/90">{phase.phase}</span>
                      </div>
                      <h3 className="font-heading text-lg text-white font-medium transition-colors">{phase.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-16 text-center">
            <MagneticButton strength={0.25}>
              <Link
                to="/contact"
                data-cursor="button"
                data-motion="true"
                className="inline-flex items-center gap-3 rounded-full bg-bx-navy-700 text-white hover:bg-bx-navy-800 px-8 py-3.5 text-sm font-semibold transition-all shadow-md fx-shine active:scale-95"
              >
                <span>Inquire on Technology Licensing &amp; R&amp;D</span>
                <Icon name="arrow-right" width={15} height={15} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}

