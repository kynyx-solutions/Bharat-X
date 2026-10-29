import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { companies } from "../../data/companies";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { cardImage } from "../common/CardSurface";
import { SectionTransition } from "../motion/SectionTransition";

interface Vertical {
  id: string;
  label: string;
  /**
   * Two plain-language paragraphs, adapted from what the site already says about each business
   * (data/companies.ts, data/industries.ts, the Businesses and Impact pages). Domain only — no company names.
   */
  lead: string;
  detail: string;
  /** The domain's business website, or an in-site anchor when it has no site yet. */
  href: string;
  image: string;
}

function company(id: string) {
  const found = companies.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown company: ${id}`);
  return found;
}

const verticals: Vertical[] = [
  {
    id: "ai-deeptech",
    label: "AI & Deeptech",
    lead: "We build AI that works inside everyday business. It reads documents, predicts what comes next, automates routine work and helps teams make better decisions, all within the systems people already use.",
    detail:
      "Every system we deliver is built to run reliably, not just to impress in a demo. We measure it, document it and hand it over so the people who use it can own it. Our test is simple: does the business run better with it?",
    href: company("aixperts").website,
    image: cardImage("innovation-01-frontier-multilingual-ai"),
  },
  {
    id: "innovation",
    label: "Innovation & Research",
    lead: "Innovation is how we look ahead. We invest in research, experiments and new ideas that can grow into the businesses of tomorrow.",
    detail:
      "Our work spans AI that understands India's many languages, smart machines for the factory floor and science for better farming. The goal is to build key technology here in India, so our industries don't have to depend on others for it.",
    href: "/verticals#labs",
    image: cardImage("innovation-03-frontier-precision-robotics"),
  },
  {
    id: "agri-food",
    label: "Agri & Food",
    lead: "We connect Indian farms with buyers at home and around the world. We source crops at the farm, process them to export standards and get them ready for global markets.",
    detail:
      "Every batch is recorded from the farm it came from to the ship it leaves on, so buyers know exactly what they are getting. We treat farming as a business: inputs are planned, yields are measured and people are trained to run it well.",
    href: company("bharatx-agro").website,
    image: cardImage("innovation-04-frontier-agronomic-deeptech"),
  },
  {
    id: "capital",
    label: "Capital & Venture Building",
    lead: "We don't just invest in businesses, we help build them. We bring capital, strategy and hands-on support to founders and growing companies.",
    detail:
      "We work alongside teams from the first idea to the first customers and beyond: shaping the business model, setting up operations and planning how to fund growth. We take a long-term view and back companies that can keep growing for a decade.",
    href: company("ventures").website,
    image: "/companies/bharatx-ventures/hero.jpg",
  },
  {
    id: "infratech",
    label: "Infratech & Heavy Engineering",
    lead: "We build the infrastructure a growing India runs on: roads, civil structures, industrial estates, urban works and the utilities that serve them.",
    detail:
      "Design, construction and operations sit under one roof. Our projects are built for the real loads they will carry, checked at every stage and handed over with clear records. We judge our work by how it holds up after years of monsoons, traffic and use.",
    href: company("infratech").website,
    image: "/companies/bharatx-infratech/hero.jpg",
  },
  {
    id: "manufacturing",
    label: "Industrial Manufacturing",
    lead: "We make precision parts and products for industry, including caster wheels and mobility solutions used in factories, warehouses, hospitals and shops.",
    detail:
      "Each product is built to the exact specification our customers need, from load rating and materials to brakes and finish. We test what we make before it ships, and every part can be traced, so customers can rely on it for the life of their machines.",
    href: company("casters").website,
    image: cardImage("services-15-horizon-new-industrial"),
  },
  {
    id: "packaging",
    label: "Packaging & Materials",
    lead: "We supply the packaging that keeps goods safe on the move: corrugated boxes, protective cushioning, industrial packaging materials and bulk logistics containers.",
    detail:
      "Our focus is packaging that is efficient and sustainable. We use eco-conscious materials to protect products as they travel through the supply chain, from the factory to the customer.",
    // BharatX Enterprises' website, as listed on the Businesses page (it isn't in data/companies.ts).
    href: "https://srm.kynyx.com/",
    image: cardImage("services-13-horizon-packaging"),
  },
  {
    id: "education-social",
    label: "Education & Social",
    lead: "We believe growth should open doors for people. Through the wider Group, we support education, skills and opportunity across India.",
    detail:
      "We are building programmes for education, skills training and community development, so that more people can take part in India's growth and share in what it creates.",
    href: "/verticals#foundation",
    image: cardImage("how-we-build-19-sector-social-impact"),
  },
];

const AUTOPLAY_MS = 6000;
const KEY_STEP: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
const pad = (n: number) => String(n).padStart(2, "0");

/** One block of a panel; blocks fade up in sequence when their panel becomes active. */
function PanelStep({ show, order, className, children }: { show: boolean; order: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
      style={{ transitionDelay: show ? `${order * 70}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function BusinessEcosystemGrid() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // No autoplay for reduced-motion users; hover and keyboard focus pause it for everyone else.
  const playing = !reduced && !hovering && !keyboardFocus && inView;
  const count = verticals.length;

  // Advance to the next vertical, looping back to the first. Any change of `active` restarts the clock.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, count]);

  // Only rotate while the section is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keep the active tab in view in the mobile tab strip, without scrolling the page.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  const select = (index: number, focus = false) => {
    const next = (index + count) % count;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = KEY_STEP[e.key];
    if (!step) return;
    e.preventDefault();
    select(active + step, true);
  };

  // Pause while a mouse is over the list or the text (touch taps don't count as hovering).
  const hoverHandlers = {
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setHovering(true),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setHovering(false),
  };

  return (
    <SectionTransition
      id="businesses"
      aria-label="Our Business Ecosystem"
      // Fills one screen (svh = the visible height on phones). Top padding minus bottom padding equals the
      // fixed navbar's height (72px, 84px from sm), so the content is centred in the area below it.
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#070A1F] pt-28 pb-10 sm:pt-32 sm:pb-11 short:pt-[6.25rem] short:pb-4 text-white"
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setKeyboardFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setKeyboardFocus(false)}
      backdrop={
        <div aria-hidden className="absolute inset-0">
          {verticals.map((v, i) => (
            <img
              key={v.id}
              src={v.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                // Fade in, then a slow push-out on the active image.
                "absolute inset-0 h-full w-full object-cover [transition:opacity_900ms_ease-out,scale_7s_ease-out] motion-reduce:transition-none",
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-110",
              )}
            />
          ))}
        </div>
      }
    >
      {/* No overlay on the photos: a soft text shadow keeps the copy legible instead */}
      {/* Full width like the hero (max-w-none!), so text and list sit near the screen edges on wide screens */}
      <div ref={rootRef} className="container-x max-w-none! relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.75),0_0_28px_rgba(0,0,0,0.55)]">
        {/* Header: title + counter */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 whitespace-nowrap font-heading text-lg sm:text-xl font-semibold uppercase tracking-[0.06em]">
            <svg viewBox="0 0 24 24" width="16" height="22" aria-hidden className="shrink-0 text-[#F54900]">
              <path fill="currentColor" d="M12 1C12 1 4 10.5 4 15.5a8 8 0 0 0 16 0C20 10.5 12 1 12 1z" />
            </svg>
            Core Verticals
          </h2>

          <span aria-hidden className="whitespace-nowrap font-sans text-sm tabular-nums text-white/85 lg:-mr-4 xl:-mr-8">
            <span className="font-semibold text-white">{pad(active + 1)}</span> / {pad(count)}
          </span>
        </div>

        {/* The list column is narrow and pulled into the container's right padding, so it sits near the edge */}
        <div className="mt-6 sm:mt-8 short:mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-16 xl:gap-28">
          {/* Vertical list — tab strip on mobile, stacked list on desktop */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Core verticals"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            {...hoverHandlers}
            className="relative -mx-5 flex gap-6 overflow-x-auto border-b border-white/20 px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:col-start-2 lg:row-start-1 lg:ml-0 lg:-mr-4 xl:-mr-8 lg:flex-col lg:gap-0 lg:self-center lg:overflow-visible lg:border-b-0 lg:px-0"
          >
            {verticals.map((v, i) => {
              const isActive = i === active;
              return (
                <button
                  key={v.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`vertical-tab-${v.id}`}
                  aria-selected={isActive}
                  aria-controls={`vertical-panel-${v.id}`}
                  tabIndex={isActive ? 0 : -1}
                  data-cursor="link"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => select(i)}
                  className={cn(
                    "group relative flex shrink-0 items-baseline gap-3 whitespace-nowrap py-3 text-left font-sans text-[13px] sm:text-sm font-semibold uppercase tracking-[0.06em] transition-colors duration-300 focus-visible:outline-hidden focus-visible:text-white lg:whitespace-normal lg:border-b-2 lg:border-white/30 lg:py-[1.15rem] short:py-3 lg:text-[17px]",
                    isActive ? "text-white" : "text-white/85 hover:text-white",
                  )}
                >
                  <span className="transition-transform duration-300 lg:group-hover:translate-x-1">{v.label}</span>

                  {/* Active marker over the 2px divider; while autoplay runs it fills up as the countdown to the next vertical */}
                  {isActive && (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-full lg:-bottom-0.5">
                      <motion.span
                        key={playing ? `run-${active}` : `hold-${active}`}
                        className="block h-full origin-left bg-[#F54900]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={playing ? { duration: AUTOPLAY_MS / 1000, ease: "linear" } : { duration: 0.45, ease: "easeOut" }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Panels share one grid cell so the section keeps the tallest panel's height */}
          <div
            aria-live={playing ? "off" : "polite"}
            {...hoverHandlers}
            className="grid lg:col-start-1 lg:row-start-1 lg:max-w-2xl lg:self-center"
          >
            {verticals.map((v, i) => {
              const show = i === active;
              const isExternal = v.href.startsWith("http");
              const ctaClass =
                "inline-flex items-center gap-2 rounded-full border border-white/80 px-6 py-2.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-[#F54900] hover:bg-[#F54900] hover:text-[#111827]";

              return (
                <div
                  key={v.id}
                  role="tabpanel"
                  id={`vertical-panel-${v.id}`}
                  aria-labelledby={`vertical-tab-${v.id}`}
                  className={cn(
                    // self-center: shorter panels sit mid-way in the shared cell rather than at its top
                    "col-start-1 row-start-1 self-center transition-[visibility] duration-700",
                    show ? "visible" : "invisible",
                  )}
                >
                  <PanelStep show={show} order={0}>
                    <h3 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tight">
                      {v.label}
                    </h3>
                  </PanelStep>

                  {/* Narrow, evenly set copy, like the businesses block */}
                  <PanelStep show={show} order={1} className="mt-6 max-w-[27rem] space-y-5 text-base sm:text-[17px] lg:text-lg short:mt-4 short:space-y-3 short:text-base leading-relaxed text-white/95 text-justify hyphens-auto">
                    <p>{v.lead}</p>
                    <p>{v.detail}</p>
                  </PanelStep>

                  <PanelStep show={show} order={2} className="mt-8 short:mt-5">
                    {isExternal ? (
                      <a href={v.href} target="_blank" rel="noopener noreferrer" data-cursor="button" className={ctaClass}>
                        Visit website
                        <Icon name="arrow-up-right" width={16} height={16} strokeWidth={2} />
                      </a>
                    ) : (
                      <Link to={v.href} data-cursor="button" className={ctaClass}>
                        Read more
                        <Icon name="arrow-right" width={16} height={16} strokeWidth={2} />
                      </Link>
                    )}
                  </PanelStep>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
