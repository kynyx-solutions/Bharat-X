import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { submitContact } from "../services/api";
import { SectionTransition } from "../components/motion/SectionTransition";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { AnimatedHeading } from "../components/motion/AnimatedHeading";
import { MagneticButton } from "../components/common/MagneticButton";
import { CardPhoto, SectionPhoto, cardImage } from "../components/common/CardSurface";
import { FeatureIcon } from "../components/common/FeatureIcon";
import { OfficeDirectory } from "../components/contact/OfficeDirectory";

// Contact pathway cards. `option` pre-selects the form's interest; `to` links out instead.
const pathways: {
  key: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
  borderHover: string;
  image: string;
  cta: string;
  option?: string;
  to?: string;
}[] = [
  {
    key: "partnerships",
    icon: "handshake",
    title: "Business Partnerships",
    description: "For companies, institutions and organisations interested in partnerships, projects or commercial opportunities.",
    accent: "#3026B3",
    borderHover: "hover:border-[#3026B3]",
    image: cardImage("contact-01-pathway-partnerships"),
    cta: "Discuss a Partnership",
    option: "Business Partnership",
  },
  {
    key: "investors",
    icon: "landmark",
    title: "Investors & Capital",
    description: "For investors, funds and strategic partners interested in BharatX and its venture-building ecosystem.",
    accent: "#211B72",
    borderHover: "hover:border-[#211B72]",
    image: cardImage("contact-02-pathway-investors"),
    cta: "Connect With Ventures",
    option: "Investment / Capital",
  },
  {
    key: "founders",
    icon: "rocket",
    title: "Entrepreneurs & Founders",
    description: "For entrepreneurs interested in building, partnering or exploring opportunities with BharatX.",
    accent: "#00B8D9",
    borderHover: "hover:border-[#00B8D9]",
    image: cardImage("contact-03-pathway-founders"),
    cta: "Build With Us",
    option: "Venture Building",
  },
  {
    key: "careers",
    icon: "briefcase",
    title: "Careers",
    description: "Looking to join one of the businesses within the BharatX ecosystem?",
    accent: "#15966B",
    borderHover: "hover:border-[#15966B]",
    image: cardImage("contact-04-pathway-careers"),
    cta: "Explore Careers",
    to: "/careers",
  },
];

const interestOptions = [
  "Business Partnership",
  "Investment / Capital",
  "Venture Building",
  "Technology Partnership",
  "Supplier / Vendor Partnership",
  "Careers",
  "Media / Press",
  "Other",
];

function toInquiryType(interest: string): string {
  const map: Record<string, string> = {
    "Business Partnership": "partnerships",
    "Investment / Capital": "venture-building",
    "Venture Building": "venture-building",
    "Technology Partnership": "ai-automation",
    "Supplier / Vendor Partnership": "partnerships",
    Careers: "careers",
    "Media / Press": "partnerships",
    Other: "partnerships",
  };
  return map[interest] || "partnerships";
}

export default function ContactPage() {
  usePageMeta({
    title: "Contact BharatX Group | Let’s Build What Comes Next",
    description:
      "Whether you’re looking to partner, invest, build a business, explore an opportunity or work with BharatX, we’d like to hear from you.",
    path: "/contact",
  });

  const [searchParams] = useSearchParams();
  const inquiryParam = searchParams.get("inquiry");

  const getInitialInterest = () => {
    if (inquiryParam === "partner") return "Business Partnership";
    if (inquiryParam === "capital") return "Investment / Capital";
    if (inquiryParam === "build") return "Venture Building";
    return "Business Partnership";
  };

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [interest, setInterest] = useState(getInitialInterest());
  const [message, setMessage] = useState("");

  // Interaction tracking (active/focused and touched/dirty)
  const [activeField, setActiveField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field validation rules
  const validateFullName = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your full name.";
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Name should contain letters only.";
    return null;
  };

  const validateEmail = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your work email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return "Please enter a valid email address (e.g. name@company.com).";
    }
    return null;
  };

  const validatePhone = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return null; // optional
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length < 7) {
      return "Phone number must have at least 7 digits.";
    }
    if (!/^[+\d][\d\s\-().]{6,24}$/.test(trimmed)) {
      return "Please enter a valid phone number format.";
    }
    return null;
  };

  const validateOrganization = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return null; // optional
    if (trimmed.length < 2) {
      return "Organisation name must be at least 2 characters.";
    }
    return null;
  };

  const validateMessage = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your message.";
    if (trimmed.length < 10) {
      return "Please tell us a little more (at least 10 characters).";
    }
    return null;
  };

  // Immediate validation states
  const fullNameError = touched.fullName ? validateFullName(fullName) : null;
  const isFullNameValid = touched.fullName && !fullNameError && fullName.trim().length > 0;

  const emailError = touched.email ? validateEmail(email) : null;
  const isEmailValid = touched.email && !emailError && email.trim().length > 0;

  const phoneError = (touched.phone || phone.trim().length > 0) ? validatePhone(phone) : null;
  const isPhoneValid = (touched.phone || phone.trim().length > 0) && !phoneError && phone.trim().length > 0;

  const orgError = (touched.organization || organization.trim().length > 0) ? validateOrganization(organization) : null;
  const isOrgValid = (touched.organization || organization.trim().length > 0) && !orgError && organization.trim().length > 0;

  const messageError = touched.message ? validateMessage(message) : null;
  const isMessageValid = touched.message && !messageError && message.trim().length >= 10;

  // Dynamic styling helper based on state
  const getInputClasses = (hasError: boolean, isValid: boolean, isActive: boolean) => {
    const base =
      "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none";

    // 1. Wrong data: red border immediately
    if (hasError) {
      return `${base} border-2 border-red-500 bg-white text-red-900 placeholder:text-red-300 ${
        isActive ? "ring-2 ring-red-500/25" : ""
      }`;
    }

    // 2. Correction done: green border immediately
    if (isValid) {
      return `${base} border-2 border-emerald-500 bg-white text-[#111827] placeholder:text-[#8E9BAE] ${
        isActive ? "ring-2 ring-emerald-500/25" : ""
      }`;
    }

    // 3. Active text field: color theme of project (#3026B3)
    if (isActive) {
      return `${base} border-2 border-[#3026B3] bg-white text-[#111827] ring-2 ring-[#3026B3]/25 shadow-sm`;
    }

    // Idle neutral state
    return `${base} border border-[#D5D8E6] bg-white text-[#111827] placeholder:text-[#8E9BAE] hover:border-[#B4BBD3]`;
  };

  const getLabelClass = (hasError: boolean, isValid: boolean, isActive: boolean) => {
    const base =
      "block text-xs font-sans font-bold uppercase tracking-wider mb-2 transition-colors duration-200";
    if (hasError) return `${base} text-red-600`;
    if (isValid) return `${base} text-emerald-700`;
    if (isActive) return `${base} text-[#3026B3]`;
    return `${base} text-[#111827]`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to display errors immediately
    const nextTouched = {
      fullName: true,
      email: true,
      phone: phone.trim().length > 0,
      organization: organization.trim().length > 0,
      interest: true,
      message: true,
    };
    setTouched(nextTouched);

    const nameErr = validateFullName(fullName);
    const mailErr = validateEmail(email);
    const phErr = validatePhone(phone);
    const orgErr = validateOrganization(organization);
    const msgErr = validateMessage(message);

    if (nameErr || mailErr || phErr || orgErr || msgErr) {
      setErrorMsg("Please correct the errors in the highlighted fields.");
      if (nameErr) document.getElementById("fullName")?.focus();
      else if (mailErr) document.getElementById("email")?.focus();
      else if (phErr) document.getElementById("phone")?.focus();
      else if (orgErr) document.getElementById("organization")?.focus();
      else if (msgErr) document.getElementById("message")?.focus();
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await submitContact({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        organization: organization.trim(),
        inquiryType: toInquiryType(interest),
        company: interest,
        message: `[Topic: ${interest}]\n\n${message.trim()}`,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("[ContactPage] Submission failed:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please check your details and try again.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectOption = (selectedInterest: string) => {
    setInterest(selectedInterest);
    document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-[#111827]">
      {/* ── 01. HERO (Contact BharatX — Let's Build What Comes Next.) ─────── */}
      <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen w-full flex items-end justify-start pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Full-bleed authentic panoramic visual */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/backgrounds/contact_hero.png"
            alt="BharatX Leadership, Infrastructure, and City Skyline"
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
              Let’s Build What <span className="text-[#F54900]">Comes Next.</span>
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
                    document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-8 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
                >
                  <span>Start a Conversation</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="rotate-90 transition-transform duration-300 group-hover:translate-y-1"
                  />
                </button>
              </MagneticButton>

              <button
                type="button"
                data-cursor="button"
                onClick={() => {
                  document.getElementById("contact-options")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>View Pathways</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02. CONTACT OPTIONS (Clear Pathways for Visitors) ─────────────── */}
      <SectionTransition id="contact-options" className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
              <span>CONTACT PATHWAYS</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              Choose Your <span className="text-[#3026B3]">Pathway</span>
            </AnimatedHeading>

            <p className="mt-4 text-base sm:text-lg text-[#596579] leading-relaxed max-w-2xl mx-auto">
              Direct routing to ensure your inquiry reaches the right leadership team immediately.
            </p>
          </div>

          {/* 4 Clear Option Cards Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pathways.map((p) => {
              const ctaClass =
                "inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#FF8904] hover:text-white transition-colors group/link";
              const ctaBody = (
                <>
                  <span>{p.cta}</span>
                  <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover/link:translate-x-1" />
                </>
              );
              return (
                <StaggerItem key={p.key}>
                  <div
                    data-cursor="card"
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1026] text-white p-7 shadow-md transition-all duration-300 hover:shadow-xl fx-lift flex flex-col justify-between h-full ${p.borderHover}`}
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

                      <p className="mt-3 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                        {p.description}
                      </p>
                    </div>

                    <div className="relative mt-6 pt-4 border-t border-white/20 [text-shadow:0_1px_8px_rgba(13,16,38,0.8)]">
                      {p.to ? (
                        <Link to={p.to} data-cursor="button" className={ctaClass}>
                          {ctaBody}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          data-cursor="button"
                          onClick={() => p.option && handleSelectOption(p.option)}
                          className={ctaClass}
                        >
                          {ctaBody}
                        </button>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </SectionTransition>

      {/* ── 03. MAIN CONTACT FORM (Start a Conversation) ──────────────────── */}
      <SectionTransition id="contact-form-section" className="relative overflow-hidden bg-[#FAF9F6] py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3026B3]/25 bg-[#3026B3]/8 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3026B3] font-bold shadow-xs mb-4">
                <span className="h-2 w-2 rounded-full bg-[#3026B3]" />
                <span>DIRECT INQUIRY</span>
              </div>

              <AnimatedHeading
                as="h2"
                effect="words"
                hover="gradient"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
              >
                Start a <span className="text-[#3026B3]">Conversation</span>
              </AnimatedHeading>

              <p className="mt-3 text-base sm:text-lg text-[#596579]">
                Share your proposal, project specifications, or collaboration concept with us.
              </p>
            </div>

            {/* Form Container */}
            <div
              data-cursor="card"
              className="rounded-3xl border border-t-4 p-7 sm:p-12 shadow-xl fx-lift"
              style={{
                backgroundColor: "color-mix(in srgb, #3026B3 7%, white)",
                borderColor: "#3026B333",
                borderTopColor: "#3026B3",
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm fx-icon-pop">
                      <Icon name="check" width={32} height={32} strokeWidth={2.5} />
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[#111827] mb-3 transition-colors duration-300">
                      Message Received
                    </h3>

                    <p className="text-base sm:text-lg text-[#374151] max-w-lg mx-auto leading-relaxed">
                      Thank you for reaching out to BharatX. Our team will review your message and get back to you.
                    </p>

                    <button
                      type="button"
                      data-cursor="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                        setOrganization("");
                        setMessage("");
                        setTouched({});
                        setErrorMsg(null);
                      }}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E3E5EF] bg-white hover:bg-slate-100 text-[#111827] px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider transition-colors fx-lift"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {errorMsg && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 flex items-center gap-2">
                        <Icon name="triangle-alert" width={16} height={16} className="text-red-600 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name* */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className={getLabelClass(
                            Boolean(fullNameError),
                            isFullNameValid,
                            activeField === "fullName",
                          )}
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setTouched((t) => ({ ...t, fullName: true }));
                            }}
                            onFocus={() => setActiveField("fullName")}
                            onBlur={() => {
                              setActiveField(null);
                              setTouched((t) => ({ ...t, fullName: true }));
                            }}
                            placeholder="Enter your full name"
                            className={`${getInputClasses(
                              Boolean(fullNameError),
                              isFullNameValid,
                              activeField === "fullName",
                            )} pr-10`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                            {fullNameError && (
                              <Icon
                                name="triangle-alert"
                                width={16}
                                height={16}
                                className="text-red-500"
                              />
                            )}
                            {isFullNameValid && (
                              <Icon
                                name="check"
                                width={16}
                                height={16}
                                className="text-emerald-600"
                              />
                            )}
                            {activeField === "fullName" && !fullNameError && !isFullNameValid && (
                              <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                            )}
                          </div>
                        </div>
                        {fullNameError && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600">
                            <Icon name="triangle-alert" width={13} height={13} className="shrink-0 text-red-500" />
                            <span>{fullNameError}</span>
                          </div>
                        )}
                        {isFullNameValid && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-600">
                            <Icon name="check" width={13} height={13} className="shrink-0 text-emerald-600" />
                            <span>Valid name</span>
                          </div>
                        )}
                      </div>

                      {/* Work Email* */}
                      <div>
                        <label
                          htmlFor="email"
                          className={getLabelClass(
                            Boolean(emailError),
                            isEmailValid,
                            activeField === "email",
                          )}
                        >
                          Work Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setTouched((t) => ({ ...t, email: true }));
                            }}
                            onFocus={() => setActiveField("email")}
                            onBlur={() => {
                              setActiveField(null);
                              setTouched((t) => ({ ...t, email: true }));
                            }}
                            placeholder="name@company.com"
                            className={`${getInputClasses(
                              Boolean(emailError),
                              isEmailValid,
                              activeField === "email",
                            )} pr-10`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                            {emailError && (
                              <Icon
                                name="triangle-alert"
                                width={16}
                                height={16}
                                className="text-red-500"
                              />
                            )}
                            {isEmailValid && (
                              <Icon
                                name="check"
                                width={16}
                                height={16}
                                className="text-emerald-600"
                              />
                            )}
                            {activeField === "email" && !emailError && !isEmailValid && (
                              <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                            )}
                          </div>
                        </div>
                        {emailError && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600">
                            <Icon name="triangle-alert" width={13} height={13} className="shrink-0 text-red-500" />
                            <span>{emailError}</span>
                          </div>
                        )}
                        {isEmailValid && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-600">
                            <Icon name="check" width={13} height={13} className="shrink-0 text-emerald-600" />
                            <span>Valid email format</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone Number (Optional) */}
                      <div>
                        <label
                          htmlFor="phone"
                          className={getLabelClass(
                            Boolean(phoneError),
                            isPhoneValid,
                            activeField === "phone",
                          )}
                        >
                          Phone Number <span className="text-xs font-normal text-[#4B5563] lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (e.target.value.length > 0) {
                                setTouched((t) => ({ ...t, phone: true }));
                              }
                            }}
                            onFocus={() => setActiveField("phone")}
                            onBlur={() => {
                              setActiveField(null);
                              if (phone.length > 0) {
                                setTouched((t) => ({ ...t, phone: true }));
                              }
                            }}
                            placeholder="+91 XXXXX XXXXX"
                            className={`${getInputClasses(
                              Boolean(phoneError),
                              isPhoneValid,
                              activeField === "phone",
                            )} pr-10`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                            {phoneError && (
                              <Icon
                                name="triangle-alert"
                                width={16}
                                height={16}
                                className="text-red-500"
                              />
                            )}
                            {isPhoneValid && (
                              <Icon
                                name="check"
                                width={16}
                                height={16}
                                className="text-emerald-600"
                              />
                            )}
                            {activeField === "phone" && !phoneError && !isPhoneValid && (
                              <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                            )}
                          </div>
                        </div>
                        {phoneError && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600">
                            <Icon name="triangle-alert" width={13} height={13} className="shrink-0 text-red-500" />
                            <span>{phoneError}</span>
                          </div>
                        )}
                        {isPhoneValid && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-600">
                            <Icon name="check" width={13} height={13} className="shrink-0 text-emerald-600" />
                            <span>Valid phone number</span>
                          </div>
                        )}
                      </div>

                      {/* Organisation / Company (Optional) */}
                      <div>
                        <label
                          htmlFor="organization"
                          className={getLabelClass(
                            Boolean(orgError),
                            isOrgValid,
                            activeField === "organization",
                          )}
                        >
                          Organisation / Company <span className="text-xs font-normal text-[#4B5563] lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <input
                            id="organization"
                            type="text"
                            value={organization}
                            onChange={(e) => {
                              setOrganization(e.target.value);
                              if (e.target.value.length > 0) {
                                setTouched((t) => ({ ...t, organization: true }));
                              }
                            }}
                            onFocus={() => setActiveField("organization")}
                            onBlur={() => {
                              setActiveField(null);
                              if (organization.length > 0) {
                                setTouched((t) => ({ ...t, organization: true }));
                              }
                            }}
                            placeholder="Your company / institution"
                            className={`${getInputClasses(
                              Boolean(orgError),
                              isOrgValid,
                              activeField === "organization",
                            )} pr-10`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                            {orgError && (
                              <Icon
                                name="triangle-alert"
                                width={16}
                                height={16}
                                className="text-red-500"
                              />
                            )}
                            {isOrgValid && (
                              <Icon
                                name="check"
                                width={16}
                                height={16}
                                className="text-emerald-600"
                              />
                            )}
                            {activeField === "organization" && !orgError && !isOrgValid && (
                              <span className="h-2 w-2 rounded-full bg-[#3026B3] animate-pulse" />
                            )}
                          </div>
                        </div>
                        {orgError && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600">
                            <Icon name="triangle-alert" width={13} height={13} className="shrink-0 text-red-500" />
                            <span>{orgError}</span>
                          </div>
                        )}
                        {isOrgValid && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-600">
                            <Icon name="check" width={13} height={13} className="shrink-0 text-emerald-600" />
                            <span>Organisation recorded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* I'm interested in* Dropdown */}
                    <div>
                      <label
                        htmlFor="interest"
                        className={getLabelClass(
                          false,
                          Boolean(interest),
                          activeField === "interest",
                        )}
                      >
                        I’m interested in <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="interest"
                          value={interest}
                          onChange={(e) => {
                            setInterest(e.target.value);
                            setTouched((t) => ({ ...t, interest: true }));
                          }}
                          onFocus={() => setActiveField("interest")}
                          onBlur={() => setActiveField(null)}
                          className={`${getInputClasses(
                            false,
                            Boolean(interest),
                            activeField === "interest",
                          )} cursor-pointer`}
                        >
                          {interestOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tell us briefly about your opportunity* */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="message"
                          className={getLabelClass(
                            Boolean(messageError),
                            isMessageValid,
                            activeField === "message",
                          )}
                        >
                          Tell us briefly about your opportunity <span className="text-red-500">*</span>
                        </label>
                        <span
                          className={`font-sans text-[11px] ${
                            message.trim().length >= 10
                              ? "text-emerald-600 font-semibold"
                              : touched.message && message.trim().length < 10
                              ? "text-red-600 font-semibold"
                              : "text-[#4B5563]"
                          }`}
                        >
                          {message.trim().length} / 10 min chars
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            setTouched((t) => ({ ...t, message: true }));
                          }}
                          onFocus={() => setActiveField("message")}
                          onBlur={() => {
                            setActiveField(null);
                            setTouched((t) => ({ ...t, message: true }));
                          }}
                          placeholder="How can we work together? Provide details regarding scope, timeline, or collaboration ideas."
                          className={`${getInputClasses(
                            Boolean(messageError),
                            isMessageValid,
                            activeField === "message",
                          )} resize-y`}
                        />
                      </div>
                      {messageError && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600">
                          <Icon name="triangle-alert" width={13} height={13} className="shrink-0 text-red-500" />
                          <span>{messageError}</span>
                        </div>
                      )}
                      {isMessageValid && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-600">
                          <Icon name="check" width={13} height={13} className="shrink-0 text-emerald-600" />
                          <span>Message requirement satisfied</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <button
                        type="submit"
                        data-cursor="button"
                        disabled={submitting}
                        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#3026B3] hover:bg-[#211B72] text-white px-9 py-4 text-[15px] font-bold shadow-lg shadow-[#3026B3]/25 transition-all duration-300 fx-shine disabled:opacity-60 cursor-pointer"
                      >
                        <span>{submitting ? "Sending..." : "Send Message"}</span>
                        <Icon
                          name="arrow-right"
                          width={16}
                          height={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>

                      <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#374151]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>Direct response from leadership within 24–48 hours</span>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ── 04. BHARATX GROUP OFFICE (Clean Office & Contact Directory) ───── */}
      <SectionTransition className="relative overflow-hidden bg-white py-6 sm:py-9">
        <div className="container-x relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15966B]/30 bg-[#15966B]/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-[#15966B] font-bold shadow-xs mb-4">
              <span className="h-2 w-2 rounded-full bg-[#15966B]" />
              <span>OUR OFFICES</span>
            </div>

            <AnimatedHeading
              as="h2"
              effect="mask"
              hover="color"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#111827] leading-tight tracking-tight"
            >
              BharatX Group <span className="text-[#3026B3]">Offices</span>
            </AnimatedHeading>

            <p className="mt-3 text-base text-[#596579]">
              Our registered office in New Delhi, with offices in Bihar and Uttar Pradesh.
            </p>
          </div>

          <OfficeDirectory />
        </div>
      </SectionTransition>

      {/* ── 05. FINAL CTA (Have an Idea Worth Building?) ──────────────────── */}
      <SectionTransition
        backdrop={<SectionPhoto src={cardImage("contact-cta-co-build")} />}
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2A5C] via-[#0B1F47] to-[#06122E] text-white py-6 sm:py-9"
      >
        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:w-[700px] rounded-full bg-gradient-to-r from-[#1E4A9E]/35 via-[#F54900]/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F54900]/40 bg-[#F54900]/15 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F54900] font-bold shadow-xs mb-6">
              <span className="h-2 w-2 rounded-full bg-[#F54900] shadow-[0_0_8px_#F54900]" />
              <span>CO-BUILD THE FUTURE</span>
            </div>

            {/* Headline */}
            <AnimatedHeading
              as="h2"
              effect="words"
              hover="gradient"
              className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white"
            >
              Have an Idea Worth Building?
            </AnimatedHeading>

            {/* Copy */}
            <p className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200 max-w-2xl mx-auto">
              The next BharatX business could begin with a conversation.
            </p>

            {/* Action */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => {
                    document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F54900] hover:bg-[#ca3500] text-[#111827] px-9 py-4 text-[15px] font-bold shadow-xl shadow-black/20 transition-all duration-300 fx-shine"
                >
                  <span>Talk to Us</span>
                  <Icon
                    name="arrow-right"
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </MagneticButton>

              <Link
                to="/verticals"
                data-cursor="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all backdrop-blur-sm fx-lift"
              >
                <span>Explore Ecosystem</span>
              </Link>
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
