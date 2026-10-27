import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { brandConfig } from "../../config/brand";
import { MagneticButton } from "../common/MagneticButton";
import { SectionTransition } from "../motion/SectionTransition";

export function ContactCTAStrip() {
  return (
    <SectionTransition>
      <section className="relative overflow-hidden py-6 sm:py-9 text-white">
        {/* Full-bleed Economic Network Backdrop — stronger overlay for readability */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/backgrounds/conglomerate-panorama.jpg"
            alt=""
            className="h-full w-full object-cover object-top filter brightness-[0.22] contrast-[1.2] saturate-[0.9]"
            loading="lazy"
          />
          {/* multi-layer overlay for max readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#211B72]/95 via-[#3026B3]/75 to-[#211B72]/90" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Decorative glowing blobs */}
        <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#3026B3]/30 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#F54900]/20 blur-[70px]" />

        <div className="container-x relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 rounded-3xl border border-white/15 bg-white/[0.04] p-8 sm:p-12 backdrop-blur-sm shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 font-sans text-[10.5px] uppercase tracking-[0.26em] text-[#F54900] mb-4">
                <span className="text-[#F54900] text-xs animate-pulse">◆</span>
                <span className="font-semibold">INSTITUTIONAL ENGAGEMENT</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                Partner with{" "}
                <span className="text-[#F54900] transition-colors duration-300">BharatX</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                For sector collaborations, joint ventures,{" "}
                <span className="text-[#00B8D9] font-medium">sovereign infrastructure tenders</span>, and institutional inquiries.
              </p>

              {/* Trust indicators */}
              <div className="mt-6 flex flex-nowrap items-center gap-3">
                {[
                  { icon: "shield-check", label: "Sovereign Partnerships" },
                  { icon: "globe", label: "Global Corridors" },
                  { icon: "landmark", label: "Institutional Grade" },
                ].map((badge) => (
                  <span key={badge.label} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-200 font-sans tracking-wider whitespace-nowrap transition-transform duration-300 hover:scale-105">
                    <Icon name={badge.icon} width={12} height={12} className="text-[#F54900]" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <MagneticButton>
                <Link
                  to="/contact"
                  data-cursor="button"
                  data-motion="true"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F54900] hover:bg-[#F54900]/90 px-8 py-4 text-sm font-bold text-[#111827] transition-all duration-300 shadow-[0_4px_24px_rgba(245,73,0,0.4)] hover:shadow-[0_6px_36px_rgba(245,73,0,0.6)] hover:scale-105 active:scale-95 fx-shine"
                >
                  <span>Start an Inquiry</span>
                  <Icon
                    name="arrow-right"
                    width={15}
                    height={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>

              <a
                href={`mailto:${brandConfig.contact.email}`}
                data-cursor="button"
                data-motion="true"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Icon name="mail" width={14} height={14} className="text-[#F54900] shrink-0" />
                <span className="truncate">{brandConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
