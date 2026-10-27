import { lazy } from "react";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { SectionTransition } from "../components/motion/SectionTransition";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";

const SecurityShield = lazy(() => import("../components/three/objects/SecurityShield"));

const sections = [
  {
    t: "1. The service",
    d: "This website presents the BharatX Group conglomerate: our core operating sectors, portfolio businesses, institutional capabilities, and strategic initiatives across India. It is an information platform. Nothing on the site constitutes an offer of securities, investment advice or a binding commercial commitment.",
  },
  {
    t: "2. Use of the site",
    d: "You may use the site for lawful purposes. You agree not to attempt to disrupt the service, gain unauthorised access to any system, or scrape content in a manner that materially burdens the site. Standard browser behaviour is fine; abuse is not.",
  },
  {
    t: "3. Intellectual property",
    d: "The site's design, text, graphics, data architectures and the BharatX Group branding are owned by BharatX Group. Trademarks, sector marks, and visual assets remain the property of the Group. You may not reproduce this material commercially without prior written permission.",
  },
  {
    t: "4. External integrations",
    d: "This platform may reference external institutional systems, partner networks, and operational dashboards. You are subject to each system's own terms when you access them directly. We do not control external network availability beyond our standard integrations.",
  },
  {
    t: "5. No warranties",
    d: "The site is provided on an as-is and as-available basis. We work to keep information accurate and current, but we do not warrant that the site will be uninterrupted, error-free, or that all details about the operating sectors are complete at any moment. Institutional information is subject to change as operations expand.",
  },
  {
    t: "6. Limitation of liability",
    d: "To the maximum extent permitted by law, BharatX Group will not be liable for indirect, incidental or consequential damages arising from your use of, or inability to use, this site. Nothing in these terms limits liability that cannot be limited under applicable law.",
  },
  {
    t: "7. Contact submissions",
    d: "Submitting the contact form creates a record of your inquiry for the purpose of responding to it. By submitting, you confirm the information is accurate to the best of your knowledge and you are of legal age to communicate on your own behalf (or on behalf of an organisation you are authorised to represent).",
  },
  {
    t: "8. Changes to these terms",
    d: "These terms may be updated as the service evolves. The current version is always on this page with an updated date. Continued use of the site after changes constitutes acceptance of the revised terms.",
  },
  {
    t: "9. Governing law",
    d: "These terms are governed by the laws of India, without regard to conflict-of-law rules. Disputes will first be attempted to be resolved through good-faith discussion; the courts of the relevant jurisdiction in India have jurisdiction for matters that cannot be resolved informally.",
  },
];

export default function TermsPage() {
  usePageMeta({
    title: "Terms & Conditions",
    description:
      "The terms governing use of the BharatX Group corporate website and services platform.",
    path: "/terms",
  });
  return (
    <>
      <PageHero
        icon="scale"
        eyebrow="Legal"
        title="Terms & Conditions"
        lede="The ground rules for using this site and its digital services. Short, readable, and without surprises."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
        visual={<SecurityShield />}
        visualPlacement="right"
        backgroundImage="/assets/backgrounds/sovereign-conglomerate.jpg"
      />
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="mb-10 rounded-xl border border-[#F54900]/40 border-l-4 border-l-[#F54900] bg-[color-mix(in_srgb,#FE7701_14%,white)] p-5 text-[13.5px] leading-relaxed text-[#374151] fx-lift transition-all">
              Last updated: 25 September 2026. By using this website you agree
              to these terms. If you are acting on behalf of an organisation,
              you confirm you have authority to bind it.
            </p>
          </Reveal>
          <div className="flex flex-col gap-8">
            {sections.map((s, i) => (
              <Reveal key={s.t} delay={Math.min(i * 0.04, 0.2)}>
                {/* Legal copy: opaque soft tint + accent rule; the `!` hovers beat the global card/heading hover overrides */}
                <div
                  data-cursor="card"
                  className="p-5 sm:p-6 rounded-xl border border-[#3026B3]/15 border-l-4 border-l-[#3026B3] bg-[color-mix(in_srgb,#3026B3_7%,white)] transition-all duration-200 hover:bg-[color-mix(in_srgb,#3026B3_11%,white)] hover:border-l-[#3026B3]!"
                >
                  <AnimatedHeading as="h2" effect="blur" hover="shift" className="font-heading text-xl font-semibold text-[#211B72] hover:text-[#3026B3]!">
                    {s.t}
                  </AnimatedHeading>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#374151]">{s.d}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div data-cursor="card" className="mt-8 rounded-xl border border-[#211B72] border-t-4 border-t-[#F54900] bg-[#211B72] p-5 font-sans text-xs sm:text-[13px] text-slate-200 shadow-md fx-lift transition-all hover:border-t-[#F54900]!">
                <span className="font-semibold text-[#FF8904] uppercase tracking-wider block mb-1">
                  Registered Headquarters:
                </span>
                <p>BharatX Group · Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017, India</p>
                <p className="mt-1">Direct Line: +91 98112 63046 · contact@bharatxgroup.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionTransition>
    </>
  );
}
