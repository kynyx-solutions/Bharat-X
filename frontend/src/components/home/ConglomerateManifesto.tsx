import { Reveal } from "../common/Reveal";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";

export function ConglomerateManifesto() {
  return (
    <SectionTransition>
      <section className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9 text-[#111827] dark:bg-night-950 dark:text-white">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Institutional Eyebrow */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/20 bg-white px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3026B3] shadow-xs hover:border-[#3026B3] transition-colors">
                <span className="text-[#F54900] animate-pulse">◆</span>
                <span>CONGLOMERATE SCALE &amp; PURPOSE</span>
              </div>
            </Reveal>

            {/* Grand Headline in Serif */}
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium leading-[1.18] tracking-tight text-[#111827] dark:text-white hover:text-[#211B72] dark:hover:text-[#F54900] transition-colors duration-300">
                An integrated conglomerate building{" "}
                <span className="italic text-[#3026B3] dark:text-[#F54900] hover:underline transition-all">critical technologies, infrastructure,</span>{" "}
                and sovereign capabilities for Bharat.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#596579] dark:text-slate-300 font-sans">
                Operating across artificial intelligence, precision engineering, heavy infrastructure, and resilient food systems — engineered for generational longevity and national impact.
              </p>
            </Reveal>
          </div>

          {/* 4-Pillar Scale Deck */}
          <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {[
              {
                badge: "36 SERVICES",
                title: "Engineered Disciplines",
                desc: "Specialised services across deeptech, civil infrastructure, robotics, and global food trade.",
                icon: "layers",
                accent: "#F54900",
              },
              {
                badge: "06 SECTORS",
                title: "Strategic Domains",
                desc: "From sovereign AI compute & robotics to primary food systems and arterial transport.",
                icon: "orbit",
                accent: "#00B8D9",
              },
              {
                badge: "GLOBAL REACH",
                title: "Export Corridors",
                desc: "Deploying high-tolerance components and origin-certified agro commodities worldwide.",
                icon: "globe",
                accent: "#3026B3",
              },
              {
                badge: "100% SOVEREIGN",
                title: "Engineered In India",
                desc: "Designed, tested, and scaled with complete national data and IP independence.",
                icon: "shield-check",
                accent: "#15966B",
              },
            ].map((item) => (
              <StaggerItem key={item.badge}>
                <div
                  data-cursor="card"
                  tabIndex={0}
                  className="group relative h-full rounded-2xl border border-[#E3E5EF] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#3026B3]/40 hover:shadow-xl hover:-translate-y-2 dark:border-white/15 dark:bg-night-900 focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none fx-lift"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: item.accent }}
                    >
                      {item.badge}
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-xs fx-icon-pop"
                      style={{
                        background: `${item.accent}15`,
                        color: item.accent,
                      }}
                    >
                      <Icon name={item.icon} width={15} height={15} />
                    </div>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-medium text-[#111827] dark:text-white group-hover:text-[#3026B3] dark:group-hover:text-[#F54900] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#596579] dark:text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </SectionTransition>
  );
}
