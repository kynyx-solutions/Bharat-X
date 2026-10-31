import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { MagneticButton } from "../common/MagneticButton";
import { SectionPhoto, cardImage } from "../common/CardSurface";
import { SectionTransition } from "../motion/SectionTransition";

export function HomeFinalCTA() {
  return (
    <SectionTransition aria-label="Final Call to Action">
      <section className="relative overflow-hidden bg-gradient-to-br from-bx-navy-800 via-bx-navy-900 to-bx-navy-950 text-white py-2 sm:py-6">
        <SectionPhoto src={cardImage("home-cta-collaborate")} />
        {/* Ambient background lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-bx-navy-600/35 via-bx-orange/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange font-bold shadow-xs hover:bg-bx-orange/25 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-bx-orange shadow-[0_0_8px_#F54900] animate-pulse" />
              <span>LET'S COLLABORATE</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium leading-[1.1] tracking-tight text-white drop-shadow-sm"
            >
              Let’s Build{" "}
              <span className="text-bx-orange">What Comes Next.</span>
            </motion.h2>

            {/* Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto"
            >
              Whether you’re a business partner, investor, entrepreneur, institution or technology partner, let’s explore what we can build together.
            </motion.p>

            {/* Action Suite */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 sm:px-10 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 fx-shine focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Partner With BharatX</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <Link
                to="/verticals"
                data-cursor="button"
                data-motion="true"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-bx-orange"
              >
                <span>Explore Businesses</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
