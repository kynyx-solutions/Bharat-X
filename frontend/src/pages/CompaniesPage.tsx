import { lazy } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { Stats } from "../components/common/Stats";
import { CompanyGrid } from "../components/company/CompanyGrid";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";

const CompaniesConstellation = lazy(() => import("../components/three/objects/CompaniesConstellation"));

export default function CompaniesPage() {
  usePageMeta({
    title: "Companies & Operating Verticals — BharatX Group",
    description:
      "Meet the portfolio businesses of BharatX Group — venture building, AI & technology, infrastructure, precision manufacturing, agri science, packaging, and sustainability.",
    path: "/companies",
  });

  return (
    <>
      <PageHero
        icon="building-2"
        eyebrow="The businesses"
        title={["Autonomous companies.", "One direction."]}
        lede="Each company below is an independent business with its own website, teams and markets — and a member of a single connected ecosystem. Explore the profiles, or open every website live in the ecosystem viewer."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Companies" }]}
        visual={<CompaniesConstellation />}
        visualPlacement="right"
      >
        <Link to="/ecosystem" data-cursor="button">
          <Button variant="primary" size="lg" withArrow>
            Open the Ecosystem Viewer
          </Button>
        </Link>
      </PageHero>

      {/* Grid */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.26em] text-ink-500">
              <span className="text-gold-400">PORTFOLIO</span>
              <span aria-hidden className="h-px flex-1 bg-white/8" />
              <span>Full roster</span>
            </div>
          </Reveal>
          <CompanyGrid />
        </div>
      </SectionTransition>

      {/* Stats strip */}
      <SectionTransition className="bg-night-850/50 py-6 sm:py-9">
        <div className="container-x">
          <Stats
            items={[
              { value: 150, suffix: "+", label: "Enterprise Deployments", icon: "building-2" },
              { value: 480, suffix: "+", label: "Engineered Systems", icon: "layers" },
              { value: 850, suffix: "+", label: "Specialists & Workforce", icon: "network" },
              { value: 100, suffix: "%", label: "Shared Ecosystem Standard", icon: "orbit", accent: "#ff8904" },
            ]}
          />
        </div>
      </SectionTransition>

      {/* What connects them */}
      <SectionTransition className="py-6 sm:py-9">
        <div className="container-x">
          <SectionHeader
            icon="network"
            eyebrow="What connects them"
            title="Not a portfolio. A working system."
            lede="The group adds value through shared standards — not shared management. Three commitments apply to every business, today and to every company that joins later."
          />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "shield-check",
                t: "A shared standard",
                d: "Quality, documentation, safety and security baselines that apply across technology and concrete alike. If a capability is in the group, it meets the standard.",
              },
              {
                icon: "orbit",
                t: "Deliberate connection",
                d: "Customers, supply chains and technology are shared only where it creates real value — reviewed quarterly, never forced. The ecosystem viewer is how the outside world sees it.",
              },
              {
                icon: "rocket",
                t: "Room to grow",
                d: "The architecture — this site, the data model, the viewer — is built to add more businesses without restructuring. The seventh company gets the same stage.",
              },
            ].map((c) => (
              <StaggerItem key={c.t}>
                <div data-cursor="card" className="h-full rounded-2xl border border-white/8 bg-night-850/70 p-7 fx-lift transition-all hover:border-white/20">
                  <IconBadge icon={c.icon} />
                  <AnimatedHeading as="h3" effect="blur" hover="shift" className="mt-5 font-heading text-xl font-semibold text-ink-50">
                    {c.t}
                  </AnimatedHeading>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15}>
            <div data-cursor="card" className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/8 bg-night-950/60 p-8 fx-lift transition-all hover:border-white/20">
              <div className="flex items-center gap-4">
                <IconBadge icon="orbit" size="lg" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink-50 transition-colors duration-300 hover:text-gold-400">
                    See portfolio companies, live, in one place
                  </h3>
                  <p className="mt-1 text-[13.5px] text-ink-400">
                    The ecosystem viewer loads each company's real website inside BharatX.
                  </p>
                </div>
              </div>
              <Link to="/ecosystem" data-cursor="button">
                <Button variant="teal" withArrow>
                  Enter the ecosystem
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </SectionTransition>

      {/* Statement */}
      <SectionTransition className="noise relative overflow-hidden bg-night-950/60 py-6 sm:py-9">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-ink-50 md:text-5xl">
            <MaskReveal>“Independent in the market.</MaskReveal>
            <MaskReveal delay={0.12}>
              <span className="text-pulse-400">Connected by design.”</span>
            </MaskReveal>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-500">
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
              BharatX Group
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link to="/ecosystem" data-cursor="link" className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300 fx-underline">
                <Icon name="orbit" width={13} height={13} />
                Open the ecosystem
                <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </SectionTransition>
    </>
  );
}
