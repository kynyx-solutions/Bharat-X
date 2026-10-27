import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { CardFill } from "../common/CardSurface";

const upcomingCards = [
  {
    title: "Packaging & Materials",
    description: "Building efficient and sustainable packaging solutions.",
    image: "/assets/slides/msme.png",
    tag: "Incubating",
    tagStyle: "border-orange-300 bg-orange-50 text-orange-800",
    accent: "#D97706",
  },
  {
    title: "Waste & Circular Economy",
    description: "Creating smarter approaches to waste management and resource recovery.",
    image: "/assets/backgrounds/sustainability-story.jpg",
    tag: "Incubating",
    tagStyle: "border-emerald-300 bg-emerald-50 text-emerald-800",
    accent: "#059669",
  },
  {
    title: "Emerging Businesses",
    description: "Exploring new opportunities across technology, manufacturing and the real economy.",
    image: "/assets/backgrounds/industrial.jpg",
    tag: "Pipeline",
    tagStyle: "border-indigo-300 bg-indigo-50 text-indigo-800",
    accent: "#3026B3",
  },
];

export function WhatComesNextSection() {
  return (
    <SectionTransition id="what-comes-next" aria-label="Building What Comes Next">
      <section className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#9f2d00] font-bold shadow-xs hover:border-[#F54900] transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900] animate-pulse" />
              <span>BUILDING WHAT COMES NEXT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight text-[#111827] hover:text-[#211B72] transition-colors duration-300"
            >
              The Next Chapter Is{" "}
              <br />
              <span className="text-[#3026B3]">Already Taking Shape.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg leading-relaxed text-[#596579] font-normal max-w-2xl mx-auto"
            >
              BharatX continues to explore new opportunities across emerging industries and critical sectors of the Indian economy.
            </motion.p>
          </div>

          {/* Exactly 3 High-Contrast Cards */}
          <Stagger className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {upcomingCards.map((card) => (
              <StaggerItem key={card.title} className="h-full">
                <div
                  data-cursor="card"
                  tabIndex={0}
                  className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 fx-shine fx-rotate-card focus-visible:ring-2 focus-visible:ring-[#3026B3] focus:outline-none"
                >
                  {/* Solid accent fill behind the copy panel (starts where the h-48 / sm:h-52 photo banner ends) */}
                  <CardFill accent={card.accent} className="top-48 sm:top-52 rounded-t-none" />

                  {/* Image banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      data-cursor="image"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Positioned wrapper: .fx-pulse-ring forces position:relative on the tag itself */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-block rounded-md border px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider shadow-xs fx-pulse-ring ${card.tagStyle}`}
                      >
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-heading text-2xl font-medium tracking-tight text-white group-hover:text-[#FF8904] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/90 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Action Button: Explore Our Future Businesses → */}
          <div className="mt-12 sm:mt-14 text-center">
            <Link
              to="/verticals"
              data-cursor="button"
              data-motion="true"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#3026B3] hover:bg-[#211B72] text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md shadow-[#3026B3]/25 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F54900]"
            >
              <span>Explore Our Future Businesses</span>
              <Icon
                name="arrow-right"
                width={14}
                height={14}
                className="transition-transform duration-300 group-hover:translate-x-1 text-[#F54900]"
              />
            </Link>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
