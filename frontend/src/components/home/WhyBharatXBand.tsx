import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";

export function WhyBharatXBand() {
  return (
    <SectionTransition>
      <section className="relative overflow-hidden py-6 sm:py-9 bg-[#FAF9F6] text-[#111827]">
        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.28em] text-[#3026B3]">
              <span className="text-[#F54900] animate-pulse">◆</span>
              <span>WHY BHARATX</span>
            </div>

            {/* Heading */}
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-[#111827] hover:text-[#211B72] transition-colors duration-300">
              Built for Scale.
              <br />
              <span className="text-[#3026B3] hover:text-[#F54900] transition-colors duration-300">Engineered for Sovereignty.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#596579] leading-relaxed font-sans">
              We build foundational capabilities that outlast short-term cycles — governed like institutions, capitalized for decades, and focused purely on India's core industrial sovereignty.
            </p>
          </div>

          {/* 3 Minimalist Pillars */}
          <Stagger className="mt-14 sm:mt-16 grid gap-8 sm:grid-cols-3 border-t border-[#E3E5EF] pt-10">
            {[
              {
                num: "01",
                title: "Long-Term Capital Horizon",
                desc: "Deploying permanent capital with multi-decade compounding rather than quarter-to-quarter financial speculation.",
                color: "#3026B3",
              },
              {
                num: "02",
                title: "Technological Independence",
                desc: "Engineering sovereign compute, indigenous algorithms, and autonomous manufacturing to safeguard national autonomy.",
                color: "#00B8D9",
              },
              {
                num: "03",
                title: "Integrated Industrial Moat",
                desc: "Connecting primary agriculture, precision manufacturing, and arterial transport into one unified economic network.",
                color: "#15966B",
              },
            ].map((pillar) => (
              <StaggerItem key={pillar.num}>
                <div
                  data-cursor="card"
                  tabIndex={0}
                  className="group flex flex-col pr-4 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 fx-lift focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none"
                >
                  <span
                    className="font-sans text-xs font-bold tracking-widest"
                    style={{ color: pillar.color }}
                  >
                    {pillar.num}
                  </span>
                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-medium text-[#211B72] group-hover:text-[#3026B3] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#596579] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12">
            <Link
              to="/about"
              data-cursor="button"
              data-motion="true"
              className="group inline-flex items-center gap-3 rounded-full bg-[#3026B3] hover:bg-[#211B72] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 active:scale-95 fx-shine"
            >
              <span>Read Our Institutional Charter</span>
              <Icon
                name="arrow-right"
                width={14}
                height={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
