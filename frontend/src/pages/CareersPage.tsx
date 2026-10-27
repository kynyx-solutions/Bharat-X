import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { submitContact } from "../services/api";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardFill, CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";

const whyPillars: { title: string; description: string; icon: string; accent: string; image: string }[] = [
  {
    title: "Ownership",
    description: "Take responsibility. Make decisions. Create outcomes.",
    icon: "shield-check",
    accent: "#3026B3",
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

const careerDomains: { name: string; icon: string; roles: string; accent: string; link: string }[] = [
  {
    name: "Labs & Research",
    icon: "flask-conical",
    roles: "Research • Innovation • Prototyping • Entrepreneurship",
    accent: "#0D9488",
    link: "/verticals#labs",
  },
  {
    name: "Ventures & Strategy",
    icon: "landmark",
    roles: "Investment • Consulting • Strategy • Business Development",
    accent: "#211B72",
    link: "/verticals#ventures",
  },
  {
    name: "Agriculture & Food",
    icon: "sprout",
    roles: "Operations • Supply Chain • Export • Business Development",
    accent: "#15966B",
    link: "/verticals#agriculture",
  },
  {
    name: "Infrastructure",
    icon: "hard-hat",
    roles: "Engineering • Project Management • Operations • Procurement",
    accent: "#3026B3",
    link: "/verticals#infrastructure",
  },
  {
    name: "Foundation",
    icon: "graduation-cap",
    roles: "Education • Programs • Community • Social Impact",
    accent: "#F54900",
    link: "/verticals#foundation",
  },
  {
    name: "Manufacturing",
    icon: "cog",
    roles: "Engineering • Production • Quality • Sales",
    accent: "#00B8D9",
    link: "/verticals#manufacturing",
  },
  {
    name: "Technology & AI",
    icon: "cpu",
    roles: "Software • AI • Product • Design • Data",
    accent: "#4B40D4",
    link: "/verticals#tech-ai",
  },
  {
    name: "Packaging",
    icon: "boxes",
    roles: "Product • Manufacturing • Operations • Sales",
    accent: "#D97706",
    link: "/verticals#packaging",
  },
  {
    name: "Sustainability",
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
    accent: "#3026B3",
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
    accent: "#211B72",
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
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (Careers at BharatX — Build What Matters.) ────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed authentic team collaboration background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/backgrounds/careers_hero.png"
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
              Build What <span className="text-[#F54900]">Matters.</span>
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
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>WHY BHARATX</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              More Than a Job. <span className="text-[#3026B3]">A Chance to Build.</span>
            </AnimatedHeading>

            <p className="mt-6 text-base sm:text-lg text-[#596579] leading-relaxed font-normal">
              BharatX is an environment for people who want to take ownership, solve meaningful problems and see their work create real-world impact.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#111827] font-medium leading-relaxed">
              Whether you’re building technology, executing infrastructure, developing markets, creating new businesses or improving operations, your work contributes to something bigger than a single company.
            </p>
          </div>

          {/* 4 Compact Pillars Grid */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPillars.map((p) => (
              <StaggerItem key={p.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-7 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardPhoto src={p.image} accent={p.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={p.icon}
                      accent={p.accent}
                      size={44}
                      className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-2xl font-medium text-white group-hover:text-[#FF8904] transition-colors">
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
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF8904]">✦</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. WHERE YOU CAN BUILD (Find Your Place in the Ecosystem — 8 Areas) ── */}
      <SectionTransition className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#15966B]" />
              <span>CAREER DOMAINS</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              Find Your Place in the <span className="text-[#3026B3]">Ecosystem</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              Our multidisciplinary portfolio operates across 8 major functional areas spanning both physical and digital industrial execution.
            </p>
          </div>

          {/* 8 Career Area Cards Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {careerDomains.map((area) => (
              <StaggerItem key={area.name}>
                <Link
                  to={area.link}
                  data-cursor="card"
                  className="group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D1026] p-6 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-lg fx-lift h-full"
                >
                  <CardFill accent={area.accent} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <FeatureIcon
                        name={area.icon}
                        accent={area.accent}
                        size={36}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <Icon name="arrow-up-right" width={14} height={14} className="text-white/90 group-hover:text-[#FF8904] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-xl font-medium text-white group-hover:text-[#FF8904] transition-colors">
                      {area.name}
                    </AnimatedHeading>

                    <p className="mt-3 text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                      {area.roles}
                    </p>
                  </div>

                  <div
                    className="relative mt-5 pt-3 border-t border-white/20 font-sans text-[9.5px] font-semibold uppercase tracking-wider text-white/90 flex items-center justify-between"
                  >
                    <span>Explore Sector</span>
                    <span className="text-[#FF8904] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#008299] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00B8D9]" />
              <span>OUR CULTURE</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              Built for People Who <span className="text-[#3026B3]">Take Ownership</span>
            </AnimatedHeading>

            <p className="mt-3 text-base text-[#596579]">
              Four operating principles that shape how we collaborate, execute, and build.
            </p>
          </div>

          {/* 4 Cultural Principles Grid */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {culturePrinciples.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  data-cursor="card"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] p-7 shadow-md transition-all duration-300 hover:border-[#3026B3] hover:shadow-xl fx-lift flex flex-col justify-between h-full"
                >
                  <CardPhoto src={item.image} accent={item.accent} />
                  <div className="relative [text-shadow:0_0_2px_rgba(13,16,38,0.9),0_1px_12px_rgba(13,16,38,0.85)]">
                    <FeatureIcon
                      name={item.icon}
                      accent={item.accent}
                      size={44}
                      className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />

                    <AnimatedHeading as="h3" effect="blur" hover="shift" className="font-heading text-2xl font-medium text-white group-hover:text-[#FF8904] transition-colors">
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
          <div data-cursor="card" className="mt-14 max-w-2xl mx-auto rounded-2xl border border-white/10 border-b-4 border-b-[#F54900] bg-[#0B1F47] p-6 text-center shadow-md fx-lift transition-all duration-300 hover:border-[#F54900]">
            <p className="font-heading text-base sm:text-lg font-medium text-white leading-relaxed">
              “We value initiative over hierarchy and outcomes over activity.”
            </p>
          </div>
        </div>
      </SectionTransition>

      {/* ── 05. OPEN OPPORTUNITIES (Find Your Next Opportunity / Send Profile) ── */}
      <SectionTransition className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div id="open-opportunities" className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>OPEN OPPORTUNITIES</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              Find Your Next <span className="text-[#3026B3]">Opportunity</span>
            </AnimatedHeading>

            <p className="mt-2 font-heading text-xl text-[#3026B3] font-medium">
              We’re Growing
            </p>

            <p className="mt-3 text-base text-[#596579] max-w-2xl mx-auto">
              New opportunities are added as our businesses and teams expand across India.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Opportunities Table / Clean Status Card */}
            <div
              data-cursor="card"
              className="relative rounded-3xl border border-[#3026B3]/20 border-t-4 border-t-[#3026B3] overflow-hidden shadow-md mb-8 fx-lift transition-all duration-300"
              style={{ backgroundColor: "color-mix(in srgb, #3026B3 6%, white)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr
                      className="border-b border-[#3026B3]/15 font-sans text-xs uppercase tracking-wider text-[#211B72]"
                      style={{ backgroundColor: "color-mix(in srgb, #3026B3 12%, white)" }}
                    >
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Business</th>
                      <th className="py-4 px-6">Location</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#3026B3]/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#111827]">Civil Project Director</td>
                      <td className="py-4 px-6 text-[#374151]">BharatX Infratech</td>
                      <td className="py-4 px-6 text-[#374151]">New Delhi / On-site</td>
                      <td className="py-4 px-6 text-xs font-sans text-[#3026B3]">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Civil Project Director");
                            setVertical("Infrastructure (BharatX Infratech)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-[#3026B3] hover:underline"
                        >
                          Apply →
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#3026B3]/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#111827]">Lead Applied AI Engineer</td>
                      <td className="py-4 px-6 text-[#374151]">Aixperts Labs</td>
                      <td className="py-4 px-6 text-[#374151]">Bengaluru / Hybrid</td>
                      <td className="py-4 px-6 text-xs font-sans text-[#3026B3]">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Lead Applied AI Engineer");
                            setVertical("Technology & AI (Aixperts Labs)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-[#3026B3] hover:underline"
                        >
                          Apply →
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#3026B3]/15 hover:bg-white/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#111827]">Industrial Quality &amp; Tooling Lead</td>
                      <td className="py-4 px-6 text-[#374151]">BharatX Engineering</td>
                      <td className="py-4 px-6 text-[#374151]">Industrial Corridor / Plant</td>
                      <td className="py-4 px-6 text-xs font-sans text-[#3026B3]">Full-time</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setPosition("Industrial Quality & Tooling Lead");
                            setVertical("Manufacturing (BharatX Engineering)");
                            setShowProfileForm(true);
                          }}
                          className="font-sans text-xs font-bold uppercase tracking-wider text-[#3026B3] hover:underline"
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
                className="p-8 border-t border-[#3026B3]/15 text-center"
                style={{ backgroundColor: "color-mix(in srgb, #3026B3 12%, white)" }}
              >
                <p className="text-sm text-[#374151] max-w-lg mx-auto">
                  Don't see your specific role listed? We are always interested in meeting talented people who want to build with us.
                </p>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => setShowProfileForm((prev) => !prev)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#3026B3] hover:bg-[#211B72] text-white px-7 py-3 text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all fx-shine"
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
                    className="relative rounded-3xl border border-[#3026B3]/20 border-t-4 border-t-[#3026B3] p-7 sm:p-12 shadow-xl mb-12 fx-lift"
                    style={{ backgroundColor: "color-mix(in srgb, #3026B3 9%, white)" }}
                  >
                    <div className="text-center mb-8">
                      <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#3026B3] font-bold block">
                        TALENT BUREAU
                      </span>
                      <AnimatedHeading as="h3" effect="mask" hover="color" className="font-heading text-2xl sm:text-3xl font-medium text-[#111827] mt-1">
                        Submit Your Profile
                      </AnimatedHeading>
                      <p className="text-xs sm:text-sm text-[#374151] mt-2 max-w-md mx-auto">
                        Share your background, portfolio, or target vertical. Our talent leadership reviews every submission.
                      </p>
                    </div>

                    {submitted ? (
                      <div className="text-center py-10">
                        <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 fx-icon-pop">
                          <Icon name="check" width={28} height={28} strokeWidth={2.5} />
                        </div>
                        <h4 className="font-heading text-2xl font-medium text-[#111827] transition-colors duration-300 hover:text-[#F54900]">
                          Profile Received
                        </h4>
                        <p className="text-sm text-[#374151] mt-2 max-w-md mx-auto">
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
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@email.com"
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 XXXXX XXXXX"
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Position / Domain Interested In
                            </label>
                            <input
                              type="text"
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              placeholder="e.g. Mechanical Engineer, AI Specialist"
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Business / Vertical
                            </label>
                            <select
                              value={vertical}
                              onChange={(e) => setVertical(e.target.value)}
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            >
                              {verticalsList.map((v) => (
                                <option key={v} value={v}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                              Location / Preferred Base
                            </label>
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g. New Delhi, Bengaluru, Plant Site"
                              className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                            LinkedIn Profile / Portfolio Link
                          </label>
                          <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                            Short Introduction / What You Build
                          </label>
                          <textarea
                            rows={4}
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            placeholder="Tell us about the problems you've solved and what capabilities you bring."
                            className="w-full rounded-xl border border-[#C9CBE3] bg-white px-4 py-3 text-sm text-[#111827] transition-all duration-200 focus:border-[#3026B3] focus:outline-none focus:ring-2 focus:ring-[#3026B3]/30 hover:border-[#3026B3]/50 resize-y"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            data-cursor="button"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-full bg-[#3026B3] hover:bg-[#211B72] text-white px-8 py-3.5 text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-60 fx-shine"
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
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2A5C] via-[#0B1F47] to-[#06122E] text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#1E4A9E]/35 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
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
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => {
                    document.getElementById("open-opportunities")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
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
            <div className="mt-12 pt-8 border-t border-white/15 max-w-xl mx-auto">
              <p className="font-sans text-sm sm:text-base uppercase tracking-[0.24em] text-[#F54900] font-bold">
                Building Businesses. Enabling Bharat.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>
    </main>
  );
}
