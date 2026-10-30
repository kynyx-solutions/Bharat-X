import { Fragment } from "react";
import { servicesData } from "../../data/servicesData";

/**
 * Signature marquee strip: the six core operating sectors scrolling in a hairline band.
 */
export function SectorMarquee() {
  const items = [...servicesData, ...servicesData];
  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-[#E3E5EF] bg-[#F7F7FC] dark:border-white/5 dark:bg-night-950/60 py-5"
    >
      <div className="marquee-track items-center gap-10 pr-10">
        {items.map((s, i) => (
          <Fragment key={`${s.id}-${i}`}>
            <span className="group/item flex items-center gap-3.5 whitespace-nowrap transition-transform duration-300 hover:scale-105">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white p-1 shadow-sm shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                <img src={s.companyLogo} alt={s.companyName} className="h-full w-full object-contain" />
              </span>
              <span className="flex items-center gap-2">
                <span className="font-sans text-sm font-semibold tracking-wide text-[#111827] dark:text-white group-hover/item:text-[#163A7A] transition-colors">
                  {s.companyName}
                </span>
                <span className="font-sans text-[10px] uppercase text-[#163A7A] dark:text-[#F54900] font-semibold">
                  · {s.name}
                </span>
              </span>
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0 text-[#F54900]">
              <path d="M1 1 L9 9 M9 1 L1 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Fragment>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night-900 to-transparent" />
    </div>
  );
}

export const CompanyMarquee = SectorMarquee;

