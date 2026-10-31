import { lazy } from "react";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { SectionTransition } from "../components/motion/SectionTransition";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";

const SecurityShield = lazy(() => import("../components/three/objects/SecurityShield"));

const sections: { id?: string; t: string; d: string }[] = [
  {
    t: "1. What we collect",
    d: "We collect information you provide directly — your name, email, phone, organisation and message when you submit the contact form — and limited technical information needed to operate this site securely, such as the pages you visit and the browser you use. We do not purchase third-party data about you.",
  },
  {
    t: "2. How we use it",
    d: "Contact form submissions are used solely to respond to your inquiry and to improve how the group communicates. We do not use your details for unsolicited marketing. If we ever want to contact you about something else, we will ask first.",
  },
  {
    t: "3. Where it is stored",
    d: "Inquiries are stored in the group's database (MongoDB) with access restricted to the teams that need it to respond. The database is hosted with a reputable provider under commercial terms that include security and backup obligations.",
  },
  {
    t: "4. External services and platforms",
    d: "Our platform provides references and connections across our core operating sectors. When you navigate to external partner or client portals linked from this site, that portal's own privacy practices apply to your interaction with it. We recommend reviewing their privacy policies upon arrival.",
  },
  {
    id: "cookies",
    t: "5. Cookies and analytics",
    d: "This site may use basic analytics to understand aggregate usage — which pages are visited and how visitors move between them. Analytics is configured through an environment setting and can be switched off. Where a tracking service is enabled, its provider's privacy policy also applies.",
  },
  {
    t: "6. Sharing",
    d: "We do not sell or rent personal information. Information is shared only with service providers that operate the site (hosting, database, email delivery) under confidentiality obligations, or where required by law.",
  },
  {
    t: "7. Retention and deletion",
    d: "Inquiry records are retained as long as needed to respond and for basic record-keeping. You may request access to, correction of, or deletion of the information you have submitted by writing to the group through the contact page.",
  },
  {
    t: "8. Security",
    d: "Access to stored data is restricted, credentials are protected, and the site uses standard transport encryption. No method of transmission over the internet is perfectly secure; we use reasonable measures appropriate to the sensitivity of the data.",
  },
  {
    t: "9. Changes to this policy",
    d: "This policy is reviewed as the group's services change. Material changes will be reflected on this page with an updated date. Continued use of the site after changes indicates acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How BharatX Group collects, uses and protects information submitted through its website.",
    path: "/privacy",
  });
  return (
    <>
      <PageHero
        icon="shield-check"
        eyebrow="Legal"
        title="Privacy Policy"
        lede="What we collect, why we collect it, and how we keep it. In plain language."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
        visual={<SecurityShield />}
        visualPlacement="right"
        backgroundImage="/assets/backgrounds/conglomerate-panorama.webp"
      />
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="mb-10 rounded-xl border border-bx-orange/40 border-l-4 border-l-bx-orange bg-[color-mix(in_srgb,#FE7701_14%,white)] p-5 text-[13.5px] leading-relaxed text-bx-ink-soft fx-lift transition-all">
              Last updated: 25 September 2026. This policy applies to the BharatX
              Group corporate web platform and its operating sectors.
            </p>
          </Reveal>
          <div className="flex flex-col gap-8">
            {sections.map((s, i) => (
              <Reveal key={s.t} delay={Math.min(i * 0.04, 0.2)}>
                {/* Legal copy: opaque soft tint + accent rule; the `!` hovers beat the global card/heading hover overrides */}
                <div
                  id={s.id}
                  data-cursor="card"
                  className="scroll-mt-28 p-5 sm:p-6 rounded-xl border border-bx-green/20 border-l-4 border-l-bx-green bg-[color-mix(in_srgb,#15966B_7%,white)] transition-all duration-200 hover:bg-[color-mix(in_srgb,#15966B_11%,white)] hover:border-l-bx-green!"
                >
                  <AnimatedHeading as="h2" effect="blur" hover="shift" className="font-heading text-xl font-semibold text-bx-ink">
                    {s.t}
                  </AnimatedHeading>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-bx-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div data-cursor="card" className="mt-8 rounded-xl border border-bx-navy-900 border-t-4 border-t-bx-orange bg-bx-navy-900 p-5 font-sans text-xs sm:text-[13px] text-slate-200 shadow-md fx-lift transition-all hover:border-t-bx-orange!">
                <span className="font-semibold text-bx-orange-light uppercase tracking-wider block mb-1">
                  Official Communication Address:
                </span>
                <p>BharatX Group · Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017</p>
                <p className="mt-1">Direct Contact: +91 98112 63046 · contact@bharatxgroup.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionTransition>
    </>
  );
}
