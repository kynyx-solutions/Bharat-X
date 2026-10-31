import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { solidTextColours } from "../common/CardSurface";

// Packaging & Materials is an operating business (BharatX Enterprises), so it is listed under Core Verticals, not here.
const upcomingCards = [
  {
    title: "Waste & Circular Economy",
    description: "Creating smarter approaches to waste management and resource recovery.",
    image: "/assets/backgrounds/next-circular-economy.webp",
    // The greenhouses sit just below the middle of the photo
    position: "50% 62%",
    accent: "#059669",
  },
  {
    title: "Emerging Businesses",
    description: "Exploring new opportunities across technology, manufacturing and the real economy.",
    image: "/assets/backgrounds/next-emerging-businesses.webp",
    position: "50% 50%",
    accent: "#163A7A",
  },
];

export function WhatComesNextSection() {
  return (
    <SectionTransition id="what-comes-next" aria-label="Building What Comes Next">
      {/* Desktop: fills one screen. Top padding minus bottom padding ≈ the fixed navbar (84px), so the content is centred below it */}
      <section className="relative overflow-hidden bg-white py-6 sm:py-9 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pt-[7.5rem] lg:pb-8">
        <div className="container-x relative z-10">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-orange-deep font-bold shadow-xs hover:border-bx-orange transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-bx-orange shadow-[0_0_8px_#F54900] animate-pulse" />
              <span>BUILDING WHAT COMES NEXT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 font-heading text-3xl sm:text-5xl lg:text-[3.4rem] font-medium leading-tight tracking-tight text-bx-ink transition-colors duration-300"
            >
              The Next Chapter Is{" "}
              <br />
              <span className="text-bx-navy-700">Already Taking Shape.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-base sm:text-lg leading-relaxed text-bx-slate font-normal max-w-2xl mx-auto"
            >
              BharatX continues to explore new opportunities across emerging industries and critical sectors of the Indian economy.
            </motion.p>
          </div>

          {/* Image cards, each with its title and description underneath on the section background */}
          <Stagger className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {upcomingCards.map((card) => {
              // The text takes the accent shade its card panel used to be filled with
              const text = solidTextColours(card.accent);
              return (
                <StaggerItem key={card.title} className="h-full">
                  <div
                    style={{ "--card-text": text.rest, "--card-text-deep": text.deep } as CSSProperties}
                    className="group/item"
                  >
                    {/* Image card */}
                    <div
                      data-cursor="card"
                      tabIndex={0}
                      // Desktop: the image takes whatever height is left on screen after the heading, text and button
                      className="group relative h-56 sm:h-64 lg:h-[clamp(13rem,calc(100svh-38rem),26rem)] overflow-hidden rounded-2xl border border-bx-line shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 fx-shine fx-rotate-card focus-visible:ring-2 focus-visible:ring-bx-navy-700 focus:outline-none"
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        data-cursor="image"
                        loading="lazy"
                        // object-cover crops instead of stretching the photo to the card's shape
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ objectPosition: card.position }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Text below the card, centred, with a short accent bar that widens while the item is hovered */}
                    <div className="mt-5 text-center">
                      <h3 className="font-heading text-2xl sm:text-[1.65rem] font-medium tracking-tight text-(--card-text)">
                        {card.title}
                      </h3>
                      <span
                        aria-hidden
                        className="mx-auto mt-3 block h-[3px] w-10 rounded-full bg-(--card-text) transition-all duration-300 group-hover/item:w-16"
                      />
                      <p className="mx-auto mt-3.5 max-w-sm text-sm sm:text-[15px] text-(--card-text-deep) leading-relaxed font-normal text-balance">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Action Button: Explore Our Future Businesses → */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/verticals"
              data-cursor="button"
              data-motion="true"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-bx-navy-700 hover:bg-bx-navy-800 text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md shadow-bx-navy-700/25 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-bx-orange"
            >
              <span>Explore Our Businesses</span>
              <Icon
                name="arrow-right"
                width={14}
                height={14}
                className="transition-transform duration-300 group-hover:translate-x-1 text-bx-orange"
              />
            </Link>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
