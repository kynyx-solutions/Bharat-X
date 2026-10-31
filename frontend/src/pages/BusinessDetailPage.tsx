import type { CSSProperties, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { DuotoneIcon, Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { solidTextColours } from "../components/common/CardSurface";
import { SitePreview } from "../components/business/SitePreview";
import { businessPortfolio } from "../data/businessPortfolio";
import { getCompany } from "../data/companies";
import { servicesData } from "../data/servicesData";
import NotFoundPage from "./NotFoundPage";

/**
 * /verticals/:slug — one business from the Business Portfolio. Card fields (category, colour, photo, website, status)
 * come from data/businessPortfolio.ts; the long-form content from data/companies.ts (same slug). Sections without
 * content are left out, and the light sections alternate white / off-white.
 */
export default function BusinessDetailPage() {
  const { slug } = useParams();
  const biz = businessPortfolio.find((b) => b.slug === slug);
  const company = getCompany(slug);

  usePageMeta({
    title: biz ? `${biz.name} | Businesses` : "Business not found",
    description: company?.description ?? biz?.description ?? "",
    path: `/verticals/${slug ?? ""}`,
    image: company?.heroImage ?? biz?.image,
  });

  if (!biz) return <NotFoundPage />;

  const isActive = biz.status === "Active";
  const ink = solidTextColours(biz.accent).deep;
  const vars = {
    "--accent": biz.accent,
    "--ink": ink,
    "--tint": `color-mix(in srgb, ${biz.accent} 10%, white)`,
    "--ring": `color-mix(in srgb, ${biz.accent} 35%, white)`,
  } as CSSProperties;
  const domain = biz.websiteUrl ? new URL(biz.websiteUrl).hostname.replace(/^www\./, "") : undefined;
  // Published figures exist only for the operating businesses
  const stats = isActive ? (servicesData.find((s) => s.id === biz.id)?.stats ?? []) : [];

  // Content sections that have data, in order; their backgrounds alternate
  const sections: { key: string; node: ReactNode }[] = [];
  if (company?.longDescription.length) sections.push({ key: "overview", node: <Overview name={biz.name} paragraphs={company.longDescription} vision={company.vision} focusAreas={company.focusAreas} /> });
  if (company?.capabilities.length) sections.push({ key: "capabilities", node: <Capabilities items={company.capabilities} /> });
  if (company?.applications.length) sections.push({ key: "applications", node: <Applications items={company.applications} /> });
  if (company?.howWeWork.length) sections.push({ key: "process", node: <Process steps={company.howWeWork} /> });

  // The next three businesses in portfolio order
  const index = businessPortfolio.indexOf(biz);
  const related = [1, 2, 3].map((i) => businessPortfolio[(index + i) % businessPortfolio.length]);

  return (
    <main className="w-full min-h-screen bg-bx-cream text-bx-ink" style={vars}>
      {/* ── HERO: name and summary beside the website preview ── */}
      <section className="relative overflow-hidden bg-bx-cream pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-50 blur-[120px]"
          style={{ background: `color-mix(in srgb, ${biz.accent} 22%, transparent)` }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-bx-slate">
              <Link to="/verticals" data-cursor="link" className="transition-colors hover:text-bx-navy-700">
                Businesses
              </Link>
              <Icon name="chevron-right" width={14} height={14} aria-hidden />
              <span aria-current="page" className="font-medium text-bx-ink">
                {biz.name}
              </span>
            </nav>

            <span className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-(--ink)">
              <span className="h-2 w-2 rounded-full bg-(--accent)" />
              {biz.category}
            </span>

            <h1 className="mt-3 font-heading text-4xl font-medium leading-[1.05] tracking-tight text-bx-ink sm:text-5xl lg:text-6xl">
              {biz.name}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-bx-slate sm:text-lg">{company?.description ?? biz.description}</p>

            {domain && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-bx-slate ring-1 ring-bx-line">
                  <DuotoneIcon name="globe" size={12} />
                  {domain}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {biz.websiteUrl ? (
                <a
                  href={biz.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange px-7 py-3.5 text-[15px] font-bold text-bx-ink shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-bx-orange-dark"
                >
                  Visit website
                  <Icon name="arrow-up-right" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <Link
                  to="/contact"
                  data-cursor="button"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange px-7 py-3.5 text-[15px] font-bold text-bx-ink shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-bx-orange-dark"
                >
                  Talk to us
                  <Icon name="arrow-right" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              <Link
                to={isActive ? "/contact?inquiry=partner" : "/verticals"}
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-bx-navy-900/20 bg-white px-7 py-3.5 text-[15px] font-semibold text-bx-navy-900 transition-colors duration-300 hover:border-bx-navy-900"
              >
                {isActive ? "Partner with us" : "All businesses"}
              </Link>
            </div>
          </div>

          <SitePreview
            name={biz.name}
            url={biz.websiteUrl}
            domain={domain}
            screenshot={company?.previewImage}
            image={biz.image}
            accent={biz.accent}
          />
        </div>

        {/* Key figures (operating businesses only) */}
        {stats.length > 0 && (
          <div className="container-x relative z-10 mt-12 sm:mt-16">
            <dl className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white ring-1 ring-bx-line sm:grid-cols-3">
              {stats.slice(0, 3).map((s, i) => (
                <div key={s.label} className={cn("px-6 py-5 sm:px-8", i > 0 && "border-t border-bx-line-soft sm:border-l sm:border-t-0")}>
                  <dt className="text-sm text-bx-slate">{s.label}</dt>
                  <dd className="mt-1 font-heading text-3xl font-medium tracking-tight text-(--ink)">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* ── CONTENT SECTIONS ── */}
      {sections.map((s, i) => (
        <SectionTransition key={s.key} className={cn("relative overflow-hidden py-6 sm:py-9", i % 2 === 0 ? "bg-white" : "bg-bx-cream")}>
          <div className="container-x relative z-10">{s.node}</div>
        </SectionTransition>
      ))}

      {/* ── CALL TO ACTION ── */}
      <SectionTransition className={cn("relative overflow-hidden py-6 sm:py-9", sections.length % 2 === 0 ? "bg-white" : "bg-bx-cream")}>
        <div className="container-x relative z-10">
          <div className="flex flex-col gap-6 rounded-3xl bg-white p-8 ring-1 ring-bx-line sm:p-10 lg:flex-row lg:items-center lg:justify-between" style={{ boxShadow: "0 24px 50px -30px rgba(11,31,71,0.35)" }}>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-(--ink)">
                <span className="h-2 w-2 rounded-full bg-(--accent)" />
                {isActive ? "Work with us" : "Get in touch"}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-bx-ink sm:text-4xl">
                {isActive ? `Work with ${biz.name}` : `Interested in ${biz.name}?`}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-bx-slate">
                {isActive
                  ? "Tell us what you're looking for and the right team will get back to you."
                  : "This business is being built. Tell us how you'd like to be involved and we'll be in touch."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                data-cursor="button"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-navy-900 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-bx-navy-700"
              >
                Contact us
                <Icon name="arrow-right" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {biz.websiteUrl && (
                <a
                  href={biz.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-bx-navy-900/20 bg-white px-7 py-3.5 text-[15px] font-semibold text-bx-navy-900 transition-colors duration-300 hover:border-bx-navy-900"
                >
                  {domain}
                  <Icon name="arrow-up-right" width={15} height={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── MORE BUSINESSES ── */}
      <SectionTransition className={cn("relative overflow-hidden py-6 sm:py-9", sections.length % 2 === 0 ? "bg-bx-cream" : "bg-white")}>
        <div className="container-x relative z-10">
          <SectionHeading eyebrow="Business portfolio" title="Explore other businesses" />
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                {/* No data-cursor="card": that global hover draws a shadow box tight around this unpadded card, cutting across the name */}
                <Link to={`/verticals/${r.slug}`} className="group block focus-visible:outline-hidden">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-bx-line">
                    <img src={r.image} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                  <span className="mt-4 block font-sans text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: solidTextColours(r.accent).deep }}>
                    {r.category}
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="font-heading text-xl font-medium tracking-tight text-bx-ink">{r.name}</h3>
                    <Icon name="arrow-right" width={16} height={16} className="shrink-0 text-bx-navy-700 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>
    </main>
  );
}

/** Section eyebrow pill + heading, in the site's usual style. */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-(--ring) bg-(--tint) px-4 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.26em] text-(--ink)">
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-tight text-bx-ink sm:text-4xl">{title}</h2>
    </div>
  );
}

function Overview({ name, paragraphs, vision, focusAreas }: { name: string; paragraphs: string[]; vision: string; focusAreas: string[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <SectionHeading eyebrow="Overview" title={`About ${name}`} />
        <div className="space-y-4 text-base leading-relaxed text-bx-ink-soft sm:text-[17px]">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-16">
        {vision && (
          <figure className="relative rounded-2xl border-l-4 border-(--accent) bg-(--tint) p-6 sm:p-7">
            <span aria-hidden className="absolute right-5 top-1 font-heading text-6xl text-(--ring)">“</span>
            <figcaption className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-(--ink)">Vision</figcaption>
            <blockquote className="relative mt-2 font-heading text-xl font-medium leading-snug tracking-tight text-bx-ink sm:text-2xl">{vision}</blockquote>
          </figure>
        )}
        {focusAreas.length > 0 && (
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-bx-slate">Focus areas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {focusAreas.map((f) => (
                <span key={f} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-bx-ink-soft ring-1 ring-bx-line">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Capabilities as an open two-column list (icon, title, line), not boxed cards. */
function Capabilities({ items }: { items: { icon: string; title: string; description: string }[] }) {
  return (
    <>
      <SectionHeading eyebrow="Capabilities" title="What we do" />
      <Stagger className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {items.map((c) => (
          <StaggerItem key={c.title} className="flex gap-4 border-t border-bx-line pt-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--tint) text-(--ink)">
              <DuotoneIcon name={c.icon} size={20} />
            </span>
            <div>
              <h3 className="font-heading text-lg font-medium tracking-tight text-bx-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-bx-slate sm:text-[15px]">{c.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}

function Applications({ items }: { items: { title: string; description: string }[] }) {
  return (
    <>
      <SectionHeading eyebrow="Applications" title="Where it's applied" />
      <Stagger className="grid gap-4 md:grid-cols-2">
        {items.map((a) => (
          <StaggerItem key={a.title} className="h-full">
            <div className="h-full rounded-2xl border-l-[3px] border-(--accent) bg-white p-6 ring-1 ring-bx-line">
              <h3 className="font-heading text-lg font-medium tracking-tight text-bx-ink">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-bx-slate sm:text-[15px]">{a.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}

/** Steps joined by a line with a marker per step (no numbers): across on desktop, down on phones. */
function Process({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <>
      <SectionHeading eyebrow="How we work" title="From first conversation to delivery" />
      {/* Desktop: across; each step draws the line to the next marker (the gap is 1.5rem) */}
      <ol className="hidden gap-6 lg:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => (
          <li key={s.title} className="relative pt-9">
            {i < steps.length - 1 && <span aria-hidden className="absolute left-5 right-[-1.5rem] top-[9px] h-px bg-(--ring)" />}
            <span aria-hidden className="absolute left-0 top-0 h-5 w-5 rounded-full border-2 border-(--accent) bg-white" />
            <h3 className="font-heading text-lg font-medium tracking-tight text-bx-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-bx-slate">{s.description}</p>
          </li>
        ))}
      </ol>
      {/* Phones and tablets: down, with the line on the left */}
      <ol className="space-y-8 lg:hidden">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-9">
            {i < steps.length - 1 && <span aria-hidden className="absolute left-[9px] top-5 h-[calc(100%+2rem)] w-px bg-(--ring)" />}
            <span aria-hidden className="absolute left-0 top-0.5 h-5 w-5 rounded-full border-2 border-(--accent) bg-white" />
            <h3 className="font-heading text-lg font-medium tracking-tight text-bx-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-bx-slate">{s.description}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
