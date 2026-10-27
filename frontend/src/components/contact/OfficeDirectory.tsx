import { useRef, useState } from "react";
import { brandConfig } from "../../config/brand";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { CardFill } from "../common/CardSurface";
import { FeatureIcon } from "../common/FeatureIcon";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Stagger, StaggerItem } from "../motion/Stagger";

/** Registered office first, then the other offices, all from config/brand.ts. */
const offices: { city: string; state: string; full: string; mapQuery?: string; mapEmbed?: string }[] = [
  { city: brandConfig.address.city, state: "Delhi", full: brandConfig.address.full },
  ...brandConfig.offices,
];

const directionsUrl = (address: string) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;

/**
 * Keyless Google Maps embed. It shows one place at a time, so a switcher picks the office;
 * Google draws India's official boundaries for Indian visitors.
 */
const embedUrl = (address: string) => `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

/** Registered-office card with a live map, plus a card for every other office. */
export function OfficeDirectory() {
  const [selected, setSelected] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const current = offices[selected];

  const showOnMap = (index: number) => {
    setSelected(index);
    mapRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <>
      <div data-cursor="card" className="relative overflow-hidden max-w-5xl mx-auto rounded-3xl border border-[#15966B]/25 border-t-4 border-t-[#15966B] bg-white p-6 sm:p-10 shadow-lg">
        <CardFill accent="#15966B" tone="tint" />
        <div className="relative grid grid-cols-1 items-stretch gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-center">
            <span className="font-sans text-xs uppercase tracking-[0.26em] text-[#3026B3] font-bold block mb-1">
              BHARATX GROUP
            </span>
            <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-2xl font-medium text-[#111827] mb-4">
              Registered Office
            </AnimatedHeading>

            <p className="text-sm text-[#374151] leading-relaxed mb-6 font-normal">{brandConfig.address.full}</p>

            <div className="space-y-3 font-sans text-xs sm:text-[13px] text-[#111827]">
              <div className="flex items-center gap-3">
                <span className="text-[#374151] uppercase tracking-wider w-24">Email</span>
                <a href="mailto:contact@bharatx.group" data-cursor="link" className="font-bold text-[#3026B3] hover:underline">
                  contact@bharatx.group
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#374151] uppercase tracking-wider w-24">Phone</span>
                <a
                  href={`tel:${brandConfig.contact.phoneTel}`}
                  data-cursor="link"
                  className="font-bold text-[#111827] hover:text-[#3026B3] transition-colors"
                >
                  {brandConfig.contact.phoneFormatted}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <span className="text-[#374151] uppercase tracking-wider w-24">Hours</span>
                <div>
                  <span className="font-semibold block">Monday – Saturday</span>
                  <span className="text-[#374151] text-[11px] sm:text-xs block">10:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={directionsUrl(brandConfig.address.full)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E3E5EF] hover:border-[#3026B3] hover:text-[#3026B3] text-[#111827] px-6 py-3 text-xs font-sans font-bold uppercase tracking-wider shadow-xs transition-all fx-lift"
              >
                <span>Get Directions</span>
                <Icon name="arrow-up-right" width={14} height={14} />
              </a>
            </div>
          </div>

          {/* Live map with an office switcher */}
          <div
            ref={mapRef}
            className="relative flex min-h-[340px] scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-[#E3E5EF] bg-[#EEF0F6] shadow-md sm:min-h-[400px]"
          >
            <div role="group" aria-label="Choose an office to show on the map" className="flex flex-wrap gap-1.5 border-b border-[#E3E5EF] bg-white p-2">
              {offices.map((office, i) => (
                <button
                  key={office.city}
                  type="button"
                  aria-pressed={i === selected}
                  data-cursor="button"
                  onClick={() => setSelected(i)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#15966B]",
                    i === selected ? "bg-[#15966B] text-white shadow-sm" : "text-[#374151] hover:bg-[#15966B]/10 hover:text-[#0F7A56]",
                  )}
                >
                  <Icon name="map-pin" width={13} height={13} strokeWidth={2.2} />
                  {office.city}
                </button>
              ))}
            </div>

            <iframe
              key={current.city}
              title={`Map showing the BharatX Group office in ${current.city}`}
              src={current.mapEmbed ?? embedUrl(current.mapQuery ?? current.full)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 border-0"
            />
          </div>
        </div>
      </div>

      {/* Other offices (Gaya, Lucknow, Patna); the one on the map is highlighted */}
      <Stagger className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
        {offices.map((office, i) =>
          i === 0 ? null : (
            <StaggerItem key={office.city} className="h-full">
              <div
                data-cursor="card"
                className={cn(
                  "group flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-[translate,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:shadow-md",
                  i === selected
                    ? "border-[#15966B] bg-white ring-2 ring-[#15966B]/20"
                    : "border-[#E3E5EF] bg-[#FAF9F6] hover:border-[#15966B]/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <FeatureIcon name="map-pin" accent="#15966B" size={36} className="shrink-0" />
                  <div className="leading-tight">
                    <h3 className="font-heading text-xl font-medium text-[#111827]">{office.city}</h3>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#596579]">{office.state}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#374151]">{office.full}</p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 font-sans text-xs font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    data-cursor="button"
                    onClick={() => showOnMap(i)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors",
                      i === selected
                        ? "border-[#15966B] bg-[#15966B] text-white"
                        : "border-[#15966B]/40 text-[#0F7A56] hover:bg-[#15966B]/10",
                    )}
                  >
                    <Icon name="map-pin" width={13} height={13} strokeWidth={2.2} />
                    {i === selected ? "On map" : "Show on map"}
                  </button>
                  <a
                    href={directionsUrl(office.mapQuery ?? office.full)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-1 text-[#3026B3] transition-colors hover:text-[#211B72]"
                  >
                    Directions
                    <Icon name="arrow-up-right" width={14} height={14} />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ),
        )}
      </Stagger>
    </>
  );
}
