import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { DuotoneIcon, Icon } from "../utils/icons";
import { submitContact } from "../services/api";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardPhoto, SectionPhoto, cardImage, solidTextColours } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

const whyPillars: { title: string; description: string; icon: string; accent: string; image: string }[] = [
  {
    title: "Ownership",
    description: "Take responsibility. Make decisions. Create outcomes.",
    icon: "shield-check",
    accent: "#163A7A",
    image: cardImage("careers-01-value-ownership"),
  },
  {
    title: "Learning",
    description: "Work across industries and continuously build new capabilities.",
    icon: "sparkles",
    accent: "#F54900",
    image: cardImage("careers-02-value-learning"),
  },
  {
    title: "Execution",
    description: "Turn ideas into measurable results.",
    icon: "cog",
    accent: "#00B8D9",
    image: cardImage("careers-03-value-execution"),
  },
  {
    title: "Impact",
    description: "See how your work contributes to businesses, people and communities.",
    icon: "trending-up",
    accent: "#15966B",
    image: cardImage("careers-04-value-impact"),
  },
];

/** `code`: the three-letter code on each card's ticket stub. */
const careerDomains: { name: string; code: string; icon: string; roles: string; accent: string; link: string }[] = [
  {
    name: "Technology & AI",
    code: "TEC",
    icon: "cpu",
    roles: "Software • AI • Product • Design • Data",
    accent: "#2B5299",
    link: "/verticals#tech-ai",
  },
  {
    name: "Labs & Research",
    code: "LAB",
    icon: "flask-conical",
    roles: "Research • Innovation • Prototyping • Entrepreneurship",
    accent: "#0D9488",
    link: "/verticals#labs",
  },
  {
    name: "Agriculture & Food",
    code: "AGR",
    icon: "sprout",
    roles: "Operations • Supply Chain • Export • Business Development",
    accent: "#15966B",
    link: "/verticals#agriculture",
  },
  {
    name: "Ventures & Strategy",
    code: "VEN",
    icon: "landmark",
    roles: "Investment • Consulting • Strategy • Business Development",
    accent: "#0F2A5C",
    link: "/verticals#ventures",
  },
  {
    name: "Infrastructure",
    code: "INF",
    icon: "hard-hat",
    roles: "Engineering • Project Management • Operations • Procurement",
    accent: "#163A7A",
    link: "/verticals#infrastructure",
  },
  {
    name: "Manufacturing",
    code: "MFG",
    icon: "cog",
    roles: "Engineering • Production • Quality • Sales",
    accent: "#00B8D9",
    link: "/verticals#manufacturing",
  },
  {
    name: "Packaging",
    code: "PKG",
    icon: "boxes",
    roles: "Product • Manufacturing • Operations • Sales",
    accent: "#D97706",
    link: "/verticals#packaging",
  },
  {
    name: "Foundation",
    code: "FDN",
    icon: "graduation-cap",
    roles: "Education • Programs • Community • Social Impact",
    accent: "#F54900",
    link: "/verticals#foundation",
  },
  {
    name: "Sustainability",
    code: "SUS",
    icon: "recycle",
    roles: "Waste Management • Operations • Sustainability • Circular Economy",
    accent: "#059669",
    link: "/verticals#sustainability",
  },
];

const culturePrinciples: { title: string; description: string; icon: string; accent: string; image: string }[] = [
  {
    title: "Think Big",
    description: "Look beyond the immediate task and understand the larger opportunity.",
    icon: "target",
    accent: "#163A7A",
    image: cardImage("careers-13-norm-think-big"),
  },
  {
    title: "Move Fast",
    description: "Test, learn and execute rather than waiting for perfect conditions.",
    icon: "rocket",
    accent: "#00B8D9",
    image: cardImage("careers-14-norm-move-fast"),
  },
  {
    title: "Work Together",
    description: "Our businesses may operate in different sectors, but we share knowledge and capabilities.",
    icon: "users",
    accent: "#15966B",
    image: cardImage("careers-15-norm-work-together"),
  },
  {
    title: "Build for the Long Term",
    description: "Create systems, products and businesses that last.",
    icon: "landmark",
    accent: "#0F2A5C",
    image: cardImage("careers-16-norm-long-term"),
  },
];

const verticalsList = [
  "General / Group Ecosystem",
  "Labs & Research (BharatX Labs)",
  "Ventures & Strategy (BharatX Ventures)",
  "Agriculture (BharatX Agro)",
  "Infrastructure (BharatX Infratech)",
  "Foundation (BharatX Foundation)",
  "Manufacturing (BharatX Engineering)",
  "Technology & AI (Aixperts Labs)",
  "Packaging (BharatX Enterprises)",
  "Sustainability (BharatX Sustainability)",
];

export default function CareersPage() {
  usePageMeta({
    title: "Careers at BharatX Group | Build What Matters",
    description:
      "Explore careers at BharatX Group and join teams building businesses across infrastructure, agriculture, manufacturing, technology, packaging and sustainability.",
    path: "/careers",
  });

  // Profile submission state
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [vertical, setVertical] = useState("General / Group Ecosystem");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [intro, setIntro] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError("Please provide your name and email.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await submitContact({
        name,
        email,
        phone,
        organization: vertical,
        inquiryType: "careers",
        message: `Position: ${position}\nLocation: ${location}\nLinkedIn: ${linkedin}\n\nIntroduction: ${intro}`,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("[CareersPage] Error submitting application:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to submit application. Please check your details and try again.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-bx-cream text-bx-ink">
      {/* ── 01. HERO (Careers at BharatX — Build What Matters.) ────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed authentic team collaboration background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/backgrounds/careers_hero.webp"
            alt="BharatX Team Collaborating on Real Industrial and Engineering Projects"
            className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.10] animate-hero-zoom"
          />
        </div>

        <div className="container-x max-w-none! relative z-10 w-full">
          <div>
            {/* H1 Headline — single line from lg up */}
            <AnimatedHeading
              as="h1"
              effect="words"
              hover="color"
              className="font-heading text-4xl sm:text-5xl lg:text-[length:clamp(2.5rem,3.9vw,3.5rem)] lg:whitespace-nowrap font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            >
              Build What <span>Matters.</span>
            </AnimatedHeading>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => {
                    document.getElementById("open-opportunities")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
                >
                  <span>View Opportunities</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </MagneticButton>

              <button
                type="button"
                data-cursor="button"
                onClick={() => {
                  setShowProfileForm(true);
                  document.getElementById("open-opportunities")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>Send Your Profile</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. WHY BHARATX (More Than a Job. A Chance to Build.) ──────────── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-navy-700" />
              <span>WHY BHARATX</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-navy-700 leading-tight tracking-tight"
            >
              More Than a Job. <span className="text-bx-orange">A Chance to Build.</span>
            </AnimatedHeading>

            <p className="mt-6 text-base sm:text-lg text-bx-slate leading-relaxed font-normal">
              BharatX is an environment for people who want to take ownership, solve meaningful problems and see their work create real-world impact.
            </p>

            <p className="mt-4 text-sm sm:text-base text-bx-ink font-medium leading-relaxed">
              Whether you’re building technology, executing infrastructure, developing markets, creating new businesses or improving operations, your work contributes to something bigger than a single company.
            </p>
          </div>

          {/* 4 Compact Pillars Grid */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPillars.map((p) => (
              <StaggerItem key={p.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-7 shadow-md transition-all duration-300 hover:border-bx-navy-700 hover:shadow-xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardPhoto src={p.image} accent={p.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={p.icon}
                      accent={p.accent}
                      size={44}
                      className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-2xl font-medium text-white transition-colors">
                      {p.title}
                    </AnimatedHeading>

                    <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div
                    className="relative mt-6 pt-4 border-t border-white/20 font-sans text-[10px] font-semibold uppercase tracking-wider text-white/85 [text-shadow:0_1px_3px_rgba(13,16,38,0.9)] flex items-center justify-between"
                  >
                    <span>Core Value</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-bx-orange-light">✦</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. WHERE YOU CAN BUILD (Find Your Place in the Ecosystem — 8 Areas) ── */}
      <SectionTransition className="relative overflow-hidden bg-bx-cream py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-green/30 bg-bx-green/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-green font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-green" />
              <span>CAREER DOMAINS</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-navy-700 leading-tight tracking-tight"
            >
              Find Your Place in the <span className="text-bx-orange">Ecosystem</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-bx-slate leading-relaxed max-w-2xl mx-auto">
              Our multidisciplinary portfolio operates across 8 major functional areas spanning both physical and digital industrial execution.
            </p>
          </div>

          {/*
            Career domain cards styled as boarding passes ("your ticket to build"): a stub tinted in the domain colour with
            the icon and a three-letter code, a dashed tear line with half-circle notches cut into the top and bottom edges,
            then the name, the roles as tags and an "Explore sector" line. Hover: the stub deepens, the icon turns, the
            arrow moves. The card outline is a ring (not a border), so the global card rule's border colour doesn't apply.
            Tablet (2 columns): the 9th card is centred rather than left alone on the left.
          */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {careerDomains.map((area) => (
              <StaggerItem
                key={area.name}
                className="h-full md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.625rem)] lg:last:odd:col-span-1 lg:last:odd:mx-0 lg:last:odd:w-auto"
              >
                <Link
                  to={area.link}
                  data-cursor="card"
                  aria-label={`${area.name}: explore the sector`}
                  style={
                    {
                      "--accent": area.accent,
                      // The domain colour darkened enough for small text and icons on light tints
                      "--ink": solidTextColours(area.accent).deep,
                      "--tint": `color-mix(in srgb, ${area.accent} 10%, white)`,
                      "--tint-strong": `color-mix(in srgb, ${area.accent} 17%, white)`,
                      "--ring": `color-mix(in srgb, ${area.accent} 35%, white)`,
                    } as React.CSSProperties
                  }
                  className="group relative flex h-full overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,31,71,0.04),0_14px_34px_-22px_rgba(11,31,71,0.3)] ring-1 ring-bx-line-soft transition-[box-shadow] duration-300 hover:ring-(--ring) focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--accent)"
                >
                  {/* Stub: icon and three-letter code */}
                  <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-3 bg-(--tint) px-2 py-6 transition-colors duration-500 group-hover:bg-(--tint-strong)">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-(--ink) shadow-[0_6px_16px_-8px_rgba(11,31,71,0.45)] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      <DuotoneIcon name={area.icon} size={24} />
                    </span>
                    <span className="font-heading text-xl font-semibold tracking-[0.12em] text-(--ink)">{area.code}</span>
                  </div>

                  {/* Tear line with notches cut into the top and bottom edges */}
                  <div aria-hidden className="relative w-0 shrink-0">
                    <span className="absolute inset-y-4 left-0 border-l-2 border-dashed border-bx-line" />
                    <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-bx-cream ring-1 ring-bx-line-soft" />
                    <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-bx-cream ring-1 ring-bx-line-soft" />
                  </div>

                  {/* Body */}
                  <div className="flex min-w-0 flex-1 flex-col p-5 pl-6">
                    <h3 className="font-heading text-xl font-medium tracking-tight text-bx-navy-900">{area.name}</h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {area.roles.split("•").map((role) => (
                        <span key={role} className="rounded-full border border-bx-line-soft bg-bx-surface px-2.5 py-0.5 text-xs font-medium text-bx-ink-soft">
                          {role.trim()}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-(--ink)">
                      Explore sector
                      <Icon name="arrow-right" width={13} height={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 04. HOW WE WORK (Built for People Who Take Ownership) ─────────── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-cyan/30 bg-bx-cyan/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-cyan-dark font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-cyan" />
              <span>OUR CULTURE</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-navy-700 leading-tight tracking-tight"
            >
              Built for People Who <span className="text-bx-orange">Take Ownership</span>
            </AnimatedHeading>

            <p className="mt-3 text-base text-bx-slate">
              Four operating principles that shape how we collaborate, execute, and build.
            </p>
          </div>

          {/* 4 Cultural Principles Grid */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {culturePrinciples.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-bx-night p-7 shadow-md transition-all duration-300 hover:border-bx-navy-700 hover:shadow-xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardPhoto src={item.image} accent={item.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={item.icon}
                      accent={item.accent}
                      size={44}
                      className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-2xl font-medium text-white transition-colors">
                      {item.title}
                    </AnimatedHeading>

                    <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="relative mt-6 pt-3 border-t border-white/20 font-sans text-[10px] font-semibold uppercase tracking-wider text-white/85 [text-shadow:0_1px_3px_rgba(13,16,38,0.9)]"
                  >
                    Operating Norm
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Central Anchor Statement */}
          <div data-cursor="card" className="mt-14 max-w-2xl mx-auto rounded-2xl border border-white/10 border-b-4 border-b-bx-orange bg-bx-navy-900 p-6 text-center shadow-md fx-lift transition-all duration-300 hover:border-bx-orange">
            <p className="font-heading text-base sm:text-lg font-medium text-white leading-relaxed">
              “We value initiative over hierarchy and outcomes over activity.”
            </p>
          </div>
        </div>
      </SectionTransition>

      {/* ── 05. OPEN OPPORTUNITIES (Find Your Next Opportunity / Send Profile) ── */}
      <SectionTransition className="relative overflow-hidden bg-bx-cream py-6 sm:py-9">
        <div id="open-opportunities" className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-navy-700/25 bg-bx-navy-700/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-navy-700 font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-navy-700" />
              <span>OPEN OPPORTUNITIES</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-navy-700 leading-tight tracking-tight"
            >
              Find Your Next <span className="text-bx-orange">Opportunity</span>
            </AnimatedHeading>

            <p className="mt-2 font-heading text-xl text-bx-navy-700 font-medium">
              We’re Growing
            </p>

            <p className="mt-3 text-base text-bx-slate max-w-2xl mx-auto">
              New opportunities are added as our businesses and teams expand across India.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Opportunities Table / Clean Status Card */}
            <div
              data-cursor="card"
              className="relative rounded-3xl border border-bx-navy-700/20 border-t-4 border-t-bx-navy-700 overflow-hidden shadow-md mb-8 fx-lift transition-all duration-300"
              style={{ backgroundColor: "color-mix(in srgb, #163A7A 6%, white)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr
                      className="border-b border-bx-navy-700/15 font-sans text-xs uppercase tracking-wider text-bx-navy-800"
                      style={{ backgroundColor: "color-mix(in srgb, #163A7A 12%, white)" }}
                    >
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Business</th>
                      <th className="py-4 px-6">Location</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-bx-navy-700/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-bx-ink">Civil Project Director</td>
                      <td className="py-4 px-6 text-bx-ink-soft">BharatX Infratech</td>
                      <td className="py-4 px-6 text-bx-ink-soft">New Delhi / On-site</td>
                      <td className="py-4 px-6 text-xs font-sans text-bx-navy-700">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Civil Project Director");
                            setVertical("Infrastructure (BharatX Infratech)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-bx-navy-700 hover:underline"
                        >
                          Apply →
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-bx-navy-700/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-bx-ink">Lead Applied AI Engineer</td>
                      <td className="py-4 px-6 text-bx-ink-soft">Aixperts Labs</td>
                      <td className="py-4 px-6 text-bx-ink-soft">Bengaluru / Hybrid</td>
                      <td className="py-4 px-6 text-xs font-sans text-bx-navy-700">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Lead Applied AI Engineer");
                            setVertical("Technology & AI (Aixperts Labs)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-bx-navy-700 hover:underline"
                        >
                          Apply →
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-bx-navy-700/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-bx-ink">Industrial Quality &amp; Tooling Lead</td>
                      <td className="py-4 px-6 text-bx-ink-soft">BharatX Engineering</td>
                      <td className="py-4 px-6 text-bx-ink-soft">Industrial Corridor / Plant</td>
                      <td className="py-4 px-6 text-xs font-sans text-bx-navy-700">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Industrial Quality & Tooling Lead");
                            setVertical("Manufacturing (BharatX Engineering)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-bx-navy-700 hover:underline"
                        >
                          Apply →
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* No suitable openings banner & CTA */}
              <div
                className="p-8 border-t border-bx-navy-700/15 text-center"
                style={{ backgroundColor: "color-mix(in srgb, #163A7A 12%, white)" }}
              >
                <p className="text-sm text-bx-ink-soft max-w-lg mx-auto">
                  Don't see your specific role listed? We are always interested in meeting talented people who want to build with us.
                </p>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => setShowProfileForm((prev) => !prev)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-bx-navy-700 hover:bg-bx-navy-800 text-white px-7 py-3 text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all fx-shine"
                >
                  <span>{showProfileForm ? "Hide Application Form" : "Send Your Profile →"}</span>
                </button>
              </div>
            </div>

            {/* Profile Application Form (Collapsible/Dynamic) */}
            <AnimatePresence>
              {showProfileForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div
                    className="relative rounded-3xl border border-bx-navy-700/20 border-t-4 border-t-bx-navy-700 p-7 sm:p-12 shadow-xl mb-12 fx-lift"
                    style={{ backgroundColor: "color-mix(in srgb, #163A7A 9%, white)" }}
                  >
                    <div className="text-center mb-8">
                      <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-bx-navy-700 font-bold block">
                        TALENT BUREAU
                      </span>
                      <AnimatedHeading as="h3" effect="mask" hover="color" className="font-heading text-2xl sm:text-3xl font-medium text-bx-ink mt-1">
                        Submit Your Profile
                      </AnimatedHeading>
                      <p className="text-xs sm:text-sm text-bx-ink-soft mt-2 max-w-md mx-auto">
                        Share your background, portfolio, or target vertical. Our talent leadership reviews every submission.
                      </p>
                    </div>

                    {submitted ? (
                      <div className="text-center py-10">
                        <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 fx-icon-pop">
                          <Icon name="check" width={28} height={28} strokeWidth={2.5} />
                        </div>
                        <h4 className="font-heading text-2xl font-medium text-bx-ink transition-colors duration-300">
                          Profile Received
                        </h4>
                        <p className="text-sm text-bx-ink-soft mt-2 max-w-md mx-auto">
                          Thank you for your interest in building with BharatX Group. Our recruiting leadership will review your credentials and connect with you.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitProfile} className="space-y-5">
                        {formError && (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 font-medium">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@email.com"
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 XXXXX XXXXX"
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Position / Domain Interested In
                            </label>
                            <input
                              type="text"
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              placeholder="e.g. Mechanical Engineer, AI Specialist"
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Business / Vertical
                            </label>
                            <select
                              value={vertical}
                              onChange={(e) => setVertical(e.target.value)}
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            >
                              {verticalsList.map((v) => (
                                <option key={v} value={v}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                              Location / Preferred Base
                            </label>
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g. New Delhi, Bengaluru, Plant Site"
                              className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                            LinkedIn Profile / Portfolio Link
                          </label>
                          <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold uppercase tracking-wider text-bx-ink mb-1.5">
                            Short Introduction / What You Build
                          </label>
                          <textarea
                            rows={4}
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            placeholder="Tell us about the problems you've solved and what capabilities you bring."
                            className="w-full rounded-xl border border-bx-line-lavender bg-white px-4 py-3 text-sm text-bx-ink transition-all duration-200 focus:border-bx-navy-700 focus:outline-none focus:ring-2 focus:ring-bx-navy-700/30 hover:border-bx-navy-700/50 resize-y"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            data-cursor="button"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-full bg-bx-navy-700 hover:bg-bx-navy-800 text-white px-8 py-3.5 text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-60 fx-shine"
                          >
                            <span>{submitting ? "Submitting..." : "Submit Profile →"}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SectionTransition>

      {/* ── 06. FINAL CTA (Ready to Build With Us?) ───────────────────────── */}
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("careers-cta-join-builders")} />}
        className="relative overflow-hidden bg-gradient-to-br from-bx-navy-800 via-bx-navy-900 to-bx-navy-950 text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-bx-navy-600/35 via-bx-orange/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-bx-orange/40 bg-bx-orange/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-bx-orange font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-bx-orange shadow-[0_0_8px_#F54900]" />
              <span>JOIN THE BUILDERS</span>
            </div>

            {/* Headline */}
            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white"
            >
              Ready to Build With Us?
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
              If you are curious, driven and excited by the opportunity to build businesses that matter, we’d like to hear from you.
            </p>

            {/* Dual CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => {
                    document.getElementById("open-opportunities")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bx-orange hover:bg-bx-orange-dark text-bx-ink px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
                >
                  <span>Explore Open Roles</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </MagneticButton>

              <button
                type="button"
                data-cursor="button"
                onClick={() => {
                  setShowProfileForm(true);
                  document.getElementById("open-opportunities")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>Send Your Profile</span>
              </button>
            </div>

            {/* Signature Conclusion */}
            <div className="mt-4 pt-2 border-t border-white/15 max-w-xl mx-auto">
              <p className="font-sans text-sm sm:text-base uppercase tracking-[0.24em] text-bx-orange font-bold">
                Building Businesses. Enabling Bharat.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
