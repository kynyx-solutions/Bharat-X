import { partnershipTypes, type Partnership, type PartnershipType } from "../../data/partnerships";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { FeatureIcon } from "../common/FeatureIcon";

const chipStyles: Record<PartnershipType, { light: string; dark: string }> = {
  MoU: {
    light: "bg-[#3026B3]/[0.07] text-[#3026B3] ring-[#3026B3]/20",
    dark: "bg-[#8F88FF]/15 text-[#C9C5FF] ring-[#8F88FF]/35",
  },
  Programme: {
    light: "bg-[#15966B]/10 text-[#0F7A56] ring-[#15966B]/25",
    dark: "bg-[#34D399]/15 text-[#7BEBC0] ring-[#34D399]/35",
  },
  Collaboration: {
    light: "bg-[#00B8D9]/10 text-[#008299] ring-[#00B8D9]/30",
    dark: "bg-[#5EE4F8]/15 text-[#A5F0FB] ring-[#5EE4F8]/35",
  },
};

function TypeChip({ type, tone = "light" }: { type: PartnershipType; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] ring-1 ring-inset",
        chipStyles[type][tone],
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: partnershipTypes[type].accent }} />
      {type}
    </span>
  );
}

function ReadMore({ href, tone = "light" }: { href: string; tone?: "light" | "dark" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      aria-label="Read more"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
        tone === "light"
          ? "border-[#E3E5EF] text-[#3026B3] hover:border-[#3026B3] hover:bg-[#3026B3] hover:text-white"
          : "border-white/30 text-white hover:border-[#F54900] hover:bg-[#F54900]",
      )}
    >
      <Icon name="arrow-up-right" width={16} height={16} strokeWidth={2} />
    </a>
  );
}

/**
 * Partner tile: type chip, the partner's logo large and centred, then name and description.
 * On hover a light beam (accent → brand orange) circles the 1px border, the logo glows and lifts.
 */
export function PartnershipCard({ partnership: p }: { partnership: Partnership }) {
  const { accent } = partnershipTypes[p.type];

  return (
    <article className="group relative isolate h-full overflow-hidden rounded-[22px] bg-[#E6E7F0] p-px shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(33,27,114,0.5)]">
      {/* Border beam: a rotating conic sweep, visible only through the 1px gap around the panel */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] motion-reduce:animate-none"
        style={{ background: `conic-gradient(from 0deg, transparent 0 55%, ${accent} 72%, #F54900 86%, transparent 96%)` }}
      />

      <div
        className="relative flex h-full flex-col rounded-[21px] bg-white p-5 sm:p-6"
        style={{ backgroundImage: `linear-gradient(180deg, ${accent}0f, transparent 42%)` }}
      >
        <div className="flex items-center justify-between gap-3">
          <TypeChip type={p.type} />
          {p.href && <ReadMore href={p.href} />}
        </div>

        {/* Logo stage */}
        <div className="relative my-5 flex min-h-28 flex-1 items-center justify-center">
          <span
            aria-hidden
            className="absolute h-28 w-28 scale-75 rounded-full opacity-0 blur-2xl transition-[opacity,scale] duration-500 group-hover:scale-125 group-hover:opacity-100"
            style={{ background: `${accent}38` }}
          />
          {p.logo ? (
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              loading="lazy"
              // multiply blends the white box of logos without transparency (e.g. MSME, CEHRO) into the tinted tile
              className="relative h-[4.5rem] w-auto max-w-[75%] object-contain mix-blend-multiply transition-[scale,translate] duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
            />
          ) : (
            <FeatureIcon
              name="landmark"
              accent={accent}
              size={64}
              className="relative transition-[scale,translate] duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
            />
          )}
        </div>

        <div className="border-t border-[#EEF0F6] pt-4">
          <h3 className="font-heading text-xl sm:text-[1.4rem] font-medium leading-tight tracking-tight text-[#111827] transition-colors duration-300 group-hover:text-[#3026B3]">
            {p.name}
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-snug text-[#596579]">{p.description}</p>
        </div>
      </div>
    </article>
  );
}

/** Large photo card for the featured partnership (home page bento). */
export function FeaturedPartnershipCard({ partnership: p, image }: { partnership: Partnership; image: string }) {
  const { accent } = partnershipTypes[p.type];

  return (
    <article className="group relative isolate flex h-full min-h-[380px] flex-col overflow-hidden rounded-[22px] bg-[#0D1026] p-6 text-white shadow-[0_30px_60px_-30px_rgba(13,16,38,0.65)] sm:p-7 [text-shadow:0_1px_12px_rgba(13,16,38,0.6)]">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0D1026] via-[#0D1026]/45 to-transparent" />
      <div
        aria-hidden
        className="absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        style={{ background: `${accent}66` }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TypeChip type={p.type} tone="dark" />
        {p.href && <ReadMore href={p.href} tone="dark" />}
      </div>

      <div className="mt-auto pt-10">
        {p.logo ? (
          <span className="inline-flex h-20 items-center rounded-2xl bg-white p-2 shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            <img src={p.logo} alt={`${p.name} logo`} className="h-full w-auto object-contain" />
          </span>
        ) : (
          <FeatureIcon
            name="landmark"
            accent={accent}
            size={60}
            className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
          />
        )}

        {p.affiliation && (
          <p className="mt-6 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF8904]">{p.affiliation}</p>
        )}
        <h3 className="mt-2 font-heading text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight">{p.name}</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/85">{p.description}</p>
      </div>
    </article>
  );
}
