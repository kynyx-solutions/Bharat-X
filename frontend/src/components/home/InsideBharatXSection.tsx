import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";

export function InsideBharatXSection() {
  return (
    <SectionTransition id="inside-bharatx" aria-label="Inside BharatX - Insights and Careers">
      <section className="relative overflow-hidden bg-bx-cream py-6 sm:py-9">
        <div className="container-x relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs hover:bg-bx-navy-700/15 transition-colors">
              <span className="h-2 w-2 rounded-full bg-bx-navy-700 animate-pulse" />
              <span>INSIDE BHARATX</span>
            </div>

            <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-bx-navy-700 transition-colors duration-300">
              Inside <span className="text-bx-orange transition-colors">BharatX</span>
            </h2>

            <p className="mt-3 text-base text-bx-slate max-w-2xl leading-relaxed">
              Exploring the ideas shaping national industries and the exceptional teams building them.
            </p>
          </div>

          {/* Two Combined Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Column 1: BharatX Insights */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-cursor="card"
              tabIndex={0}
              className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-bx-line p-8 sm:p-10 shadow-md transition-all duration-500 hover:border-bx-orange hover:shadow-2xl hover:-translate-y-1 fx-lift fx-shine focus-visible:ring-2 focus-visible:ring-bx-orange focus:outline-none"
            >
              {/* Background image & gradient overlay */}
              <img
                src="/assets/backgrounds/innovation-story.webp"
                alt="BharatX Insights"
                data-cursor="image"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />

              {/* Content & Action */}
              <div className="relative z-10 mt-16">
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white transition-colors duration-300 fx-underline">
                  BharatX Insights
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-md">
                  Ideas, perspectives and stories from across our businesses and industries.
                </p>

                <div className="mt-8">
                  <Link
                    to="/insights"
                    data-cursor="link"
                    className="group/btn inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-bx-orange transition-all hover:text-white"
                  >
                    <span>Explore Insights</span>
                    <Icon
                      name="arrow-right"
                      width={14}
                      height={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-2"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Careers */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              data-cursor="card"
              tabIndex={0}
              className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-bx-line p-8 sm:p-10 shadow-md transition-all duration-500 hover:border-bx-cyan hover:shadow-2xl hover:-translate-y-1 fx-lift fx-shine focus-visible:ring-2 focus-visible:ring-bx-cyan focus:outline-none"
            >
              {/* Background image & gradient overlay */}
              <img
                src="/assets/backgrounds/strategic-story-panorama.webp"
                alt="BharatX Careers"
                data-cursor="image"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />

              {/* Content & Action */}
              <div className="relative z-10 mt-16">
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white transition-colors duration-300 fx-underline">
                  Careers
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-md">
                  Join the people building businesses that move Bharat forward.
                </p>

                <div className="mt-8">
                  <Link
                    to="/careers"
                    data-cursor="link"
                    className="group/btn inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-bx-cyan transition-all hover:text-white"
                  >
                    <span>Build With Us</span>
                    <Icon
                      name="arrow-right"
                      width={14}
                      height={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-2"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
