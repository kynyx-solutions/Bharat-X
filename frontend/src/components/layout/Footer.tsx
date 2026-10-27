import { Link } from "react-router-dom";
import { brandConfig } from "../../config/brand";
import { footerSections } from "../../data/navigation";
import { DuotoneIcon, Icon } from "../../utils/icons";
import FooterOrbScene from "../three/FooterOrbScene";

/*export function FooterCTA() {
 Currently commented out
  return (
    <section className="gold-glow relative overflow-hidden border-t border-slate-200/80 dark:border-white/5 py-14 sm:py-16 md:py-20">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40 dark:opacity-60" />
      <div className="container-x relative flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#F54900]/30 bg-[#F54900]/10 px-3.5 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900]">
            <DuotoneIcon name="sparkles" size={14} />
            <span>Connect with BharatX Group</span>
          </div>
          <h2 className="font-heading text-3xl font-medium leading-[1.1] tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl md:text-5xl lg:text-6xl transition-colors duration-300 hover:text-[#F54900]">
            BUILDING THE FOUNDATIONS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3026B3] via-[#F54900] to-[#00B8D9]">
              OF MODERN BHARAT.
            </span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-[#596579] dark:text-ink-300">
            For sector partnerships, infrastructure development, industrial mobility, advanced agriculture and sovereign technology — connect with the group.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/contact"
              data-cursor="button"
              className="group fx-press fx-shine inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#3026B3] px-8 py-4 text-[15px] font-semibold text-white shadow-md shadow-[#3026B3]/25 transition-all duration-300 hover:bg-[#211B72] hover:shadow-[0_10px_35px_-8px_rgba(48,38,179,0.45)] dark:bg-[#F54900] dark:text-[#111827] dark:hover:bg-[#ca3500]"
            >
              Talk to BharatX
              <Icon
                name="arrow-right"
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/verticals"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-[#E3E5EF] bg-white px-8 py-4 text-[15px] font-semibold text-[#111827] shadow-sm transition-all duration-300 hover:border-[#3026B3] hover:text-[#3026B3] hover:shadow-md dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-[#F54900]"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* 3D Footer ecosystem scene 
<div className="relative flex w-full shrink-0 items-center justify-center lg:w-[480px] xl:w-[560px] 2xl:w-[620px]">
  <FooterOrbScene className="h-[340px] w-full sm:h-[400px] md:h-[440px] lg:h-[480px]" />
</div>
      </div >
    </section >
  );

return null;
}*/

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#E3E5EF] bg-[#FAF9F6] text-[#111827]">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-20" />
      <div className="container-x relative z-10 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-8 md:pt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Institutional Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <Link
              to="/"
              aria-label="BharatX Group home"
              className="flex flex-col items-center group"
            >
              <img
                src="/bharatxgroup.png"
                alt="BharatX Group"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="mt-2 font-heading text-2xl sm:text-[1.7rem] font-medium text-[#111827] tracking-tight text-center">
                BharatX Group
              </span>
            </Link>

            <p className="mt-2.5 font-sans text-xs sm:text-[13px] uppercase tracking-[0.01em] text-[#F54900] font-semibold">
              Building Businesses. Enabling Bharat.
            </p>

            {/* Justified, with the last line centred so the block sits symmetrically under the logo */}
            <p className="mt-3.5 text-sm leading-relaxed text-[#596579] max-w-[300px] text-justify [text-align-last:center] hyphens-auto">
              A diversified Indian business group bringing together businesses, capital, technology and talent to create enduring enterprises across key growth sectors.
            </p>
          </div>

          {/* Institutional Navigation 4-Column Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* 1. Businesses */}
            <nav aria-label="Businesses">
              <div className="mb-2.5 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.24em] text-[#111827] font-bold">
                <DuotoneIcon name="layers" size={14} className="text-[#3026B3]" />
                Businesses
              </div>
              <ul className="flex flex-col gap-1.5">
                {footerSections.businesses.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      data-cursor="link"
                      className="group inline-flex items-center gap-1.5 text-[13px] text-[#596579] transition-all duration-200 hover:text-[#3026B3] hover:translate-x-1"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-[#3026B3] transition-all duration-300 group-hover:w-2.5"
                      />
                      <span className="fx-underline">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 2. Group */}
            <nav aria-label="Group">
              <div className="mb-2.5 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.24em] text-[#111827] font-bold">
                <DuotoneIcon name="building-2" size={14} className="text-[#3026B3] fx-icon-pop" />
                Group
              </div>
              <ul className="flex flex-col gap-1.5">
                {footerSections.group.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      data-cursor="link"
                      className="group inline-flex items-center gap-1.5 text-[13px] text-[#596579] transition-all duration-200 hover:text-[#3026B3] hover:translate-x-1"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-[#3026B3] transition-all duration-300 group-hover:w-2.5"
                      />
                      <span className="fx-underline">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 3. Connect */}
            <nav aria-label="Connect">
              <div className="mb-2.5 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.24em] text-[#111827] font-bold">
                <DuotoneIcon name="share-2" size={14} className="text-[#3026B3] fx-icon-pop" />
                Connect
              </div>
              <ul className="flex flex-col gap-1.5">
                {footerSections.connect.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="group inline-flex items-center gap-1.5 text-[13px] text-[#596579] transition-all duration-200 hover:text-[#3026B3] hover:translate-x-1"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-[#3026B3] transition-all duration-300 group-hover:w-2.5"
                      />
                      <span className="fx-underline">{item.label}</span>
                      <Icon
                        name="arrow-up-right"
                        width={11}
                        height={11}
                        className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 4. Address */}
            <div aria-label="Address">
              <div className="mb-2.5 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.24em] text-[#111827] font-bold">
                <DuotoneIcon name="map-pin" size={14} className="text-[#3026B3]" />
                Address
              </div>
              <address className="not-italic text-[13px] leading-snug text-[#596579] space-y-2">
                <p>
                  {brandConfig.address.line1},
                  <br />
                  {brandConfig.address.line2},
                  <br />
                  {brandConfig.address.city} – {brandConfig.address.pincode}
                </p>
                <div className="space-y-1.5 border-t border-[#E3E5EF] pt-2.5 font-sans text-[11.5px]">
                  <div>
                    <a
                      href={`tel:${brandConfig.contact.phoneTel}`}
                      className="inline-flex items-center gap-2 text-[#596579] hover:text-[#3026B3] transition-colors"
                    >
                      <DuotoneIcon name="phone" size={14} className="shrink-0 text-[#00B8D9]" />
                      <span>{brandConfig.contact.phoneFormatted}</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:${brandConfig.contact.email}`}
                      className="inline-flex items-center gap-2 text-[#596579] hover:text-[#3026B3] transition-colors"
                    >
                      <DuotoneIcon name="mail" size={14} className="shrink-0 text-[#F54900]" />
                      <span>{brandConfig.contact.email}</span>
                    </a>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#E3E5EF] pt-5 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#596579] md:text-left shrink-0">
            © {new Date().getFullYear()} BharatX Group. All rights reserved.
          </p>

          <div className="flex items-center justify-center shrink-0">
            <a
              href="https://kynyx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#596579] transition-colors hover:text-[#3026B3]"
            >
              <span>Made with</span>
              <Icon
                name="heart"
                width={12}
                height={12}
                className="text-rose-500 fill-rose-500 transition-transform duration-200 group-hover:scale-125"
              />
              <span>
                by{" "}
                <span className="font-bold text-[#111827] group-hover:text-[#3026B3] transition-colors">
                  KYNYX
                </span>
              </span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-2.5 gap-y-1 font-sans text-[11px] tracking-[0.14em] text-[#596579]">
            {footerSections.legal.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span className="text-[#94A3B8]">•</span>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-[#3026B3]"
                >
                  {item.label}
                </Link>
              </span>
            ))}
            <span className="inline-flex items-center gap-2 ml-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15966B]" />
              <span className="uppercase tracking-[0.16em]">Made in India</span>
              <span aria-hidden className="text-xs leading-none">🇮🇳</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
