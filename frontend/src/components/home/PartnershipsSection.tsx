import { Link } from "react-router-dom";
import { partnerships } from "../../data/partnerships";
import { Icon } from "../../utils/icons";
import { Button } from "../common/Button";
import { cardImage } from "../common/CardSurface";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { FeaturedPartnershipCard, PartnershipCard } from "../partnerships/PartnershipCard";

const featured = partnerships.find((p) => p.featured);
const others = partnerships.filter((p) => p !== featured);
const partnerLogos = partnerships.filter((p): p is typeof p & { logo: string } => Boolean(p.logo));

/*
 * Bento: featured photo card (tall, left) + partner tiles + a closing CTA tile.
 *   xl (4 cols): featured spans 2 rows; 3 tiles per row beside it; CTA fills the last slot.
 *   lg (3 cols): featured spans 2 rows; 2×2 tiles beside it; last tile + CTA (2 cols) below.
 *   sm (2 cols): featured full width; tiles in pairs; CTA pairs with the last tile.
 */
export function PartnershipsSection() {
  return (
    <SectionTransition
      id="partnerships"
      aria-label="Partnerships and Programmes"
      className="relative overflow-hidden bg-bx-cream py-6 sm:py-9"
    >
      {/* Soft brand light behind the grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-bx-navy-700/[0.07] blur-[110px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-bx-orange/[0.07] blur-[110px]" />
      </div>

      <div className="container-x relative z-10">
        {/*
          Header. Desktop: heading + button on one line, then a meta row (intro left,
          partner logos right). Mobile: heading, intro, logos, then the button last.
        */}
        <div className="group/header">
          <div className="inline-flex items-center gap-2 rounded-full border border-bx-orange/30 bg-bx-orange/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-orange-dark font-bold shadow-xs cursor-default">
            <span className="h-2 w-2 rounded-full bg-bx-orange transition-transform duration-300 group-hover/header:scale-125" />
            <span>PARTNERSHIPS &amp; PROGRAMMES</span>
          </div>

          {/* No divider line: 20px from heading to intro row, then 32px down to the cards */}
          <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12 lg:gap-y-5">
            <h2 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-medium leading-[1.08] tracking-tight text-bx-navy-700 text-balance lg:self-end">
              Working with <span className="text-bx-orange">India&apos;s institutions</span>.
            </h2>

            <Link to="/partnerships" data-cursor="button" className="order-last justify-self-start lg:order-none lg:self-end lg:pb-1">
              <Button variant="secondary" withArrow>
                View all partnerships
              </Button>
            </Link>

            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-bx-slate">
                Our AI and technology business works with government, leading institutions and public-sector
                companies on AI adoption and skills.
              </p>

              <ul aria-label="Our partners" className="flex -space-x-2 lg:justify-self-end">
                {partnerLogos.map((p) => (
                  <li
                    key={p.name}
                    title={p.name}
                    className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(16,24,40,0.3)] ring-[3px] ring-bx-cream transition-transform duration-300 hover:z-10 hover:-translate-y-1"
                  >
                    <img src={p.logo} alt={p.name} loading="lazy" className="h-8 w-8 sm:h-9 sm:w-9 object-contain" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:auto-rows-[minmax(250px,auto)]">
          {featured && (
            <StaggerItem className="h-full sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <FeaturedPartnershipCard partnership={featured} image={cardImage("impact-09-commitment-employment-skills")} />
            </StaggerItem>
          )}

          {others.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <PartnershipCard partnership={p} />
            </StaggerItem>
          ))}

          {/* Closing CTA tile */}
          <StaggerItem className="h-full lg:col-span-2 xl:col-span-1">
            <Link
              to="/contact?inquiry=partner"
              data-cursor="card"
              className="group relative isolate flex h-full min-h-[250px] flex-col overflow-hidden rounded-[22px] bg-gradient-to-br from-bx-navy-700 via-bx-navy-900 to-bx-navy-950 p-6 text-white shadow-[0_30px_60px_-30px_rgba(11,31,71,0.7)] transition-[translate] duration-500 ease-out hover:-translate-y-1.5 sm:p-7"
            >
              <span
                aria-hidden
                className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-bx-orange/45 blur-3xl transition-transform duration-700 ease-out group-hover:scale-125"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
              />

              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-bx-orange-light">Become a partner</p>
              <h3 className="mt-3 font-heading text-2xl sm:text-[1.75rem] font-medium leading-tight tracking-tight">
                Partner with BharatX
              </h3>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-white/75">
                Ministries, institutions and public-sector companies can partner with us on AI adoption, skills and
                research.
              </p>

              <span className="mt-auto inline-flex items-center gap-3 pt-6 text-[15px] font-semibold">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bx-orange text-bx-ink shadow-[0_8px_24px_-6px_rgba(245,73,0,0.7)] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-rotate-45">
                  <Icon name="arrow-right" width={18} height={18} strokeWidth={2.2} />
                </span>
                Get in touch
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </SectionTransition>
  );
}
