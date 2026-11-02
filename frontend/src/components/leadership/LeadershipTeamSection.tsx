import { cn } from "../../utils/cn";
import { DuotoneIcon } from "../../utils/icons";
import { SectionTransition } from "../motion/SectionTransition";
import { Stagger, StaggerItem } from "../motion/Stagger";

// ── Leadership Team (photos in /public/leadership) ────────────────────
const leadershipTeam = [
  {
    name: "Nitin Arora",
    role: "Executive Vice President — Product, Technology & AI",
    bio: "Technologist with 15+ years across product, AI and entrepreneurship at Google, Amazon, GE and Deloitte, and founder of his own startup. B.Tech and PhD in Computer Science, IIT Delhi; master’s, NYU.",
    photo: "/leadership/nitin-arora.webp",
    // 4:3 head-and-shoulders crop for the desktop card frame
    cardPhoto: "/leadership/nitin-arora-card.webp",
    linkedin: "https://www.linkedin.com/in/aronitin",
  },
  {
    name: "Dharampal Singh",
    role: "Chief Revenue & Operating Officer",
    bio: "Operations leader with 28+ years in automotive manufacturing. Former Plant Head at Jay Ushin Ltd (JPM Group), running three plants and teams of 1,000+. Expert in Lean, Six Sigma and IATF 16949.",
    photo: "/leadership/dharampal-singh.webp",
    cardPhoto: "/leadership/dharampal-singh-card.webp",
    linkedin: "https://www.linkedin.com/in/dharampal-singh-995aa2228",
  },
  {
    name: "Dr. Akanksha Verma",
    role: "Chief Human Resources Officer (CHRO)",
    bio: "Environmental scientist with an M.Phil. and Ph.D., and research in sustainability and pollution. As CHRO, she leads people, culture, hiring and talent across BharatX Group and its businesses.",
    // Both cropped from "Akanksha Verma.png" (square for phones, 4:3 head-to-chest for the desktop card)
    photo: "/leadership/akanksha-verma.webp",
    cardPhoto: "/leadership/akanksha-verma-card.webp",
    linkedin: "https://www.linkedin.com/in/akanksha-verma-304a18191",
  },
];

/** LinkedIn's "in" logo mark (brand blue). `onDark` fills the "in" white, for dark backgrounds. */
export function LinkedInLogo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {onDark && <rect x="1.5" y="1.5" width="21" height="21" rx="1" fill="#FFFFFF" />}
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

/** "The People Leading BharatX.": the executives running the Group's functions (About and Leadership pages). */
export function LeadershipTeamSection() {
  return (
    <SectionTransition id="leadership-team" aria-label="Leadership Team">
      {/* Desktop fits the whole section on one screen (lg:/short: classes only; phones keep square portraits) */}
      <section className="relative overflow-hidden bg-white py-6 sm:py-9 short:py-6">
        <div className="container-x relative z-10">
          {/* Desktop: the intro sits beside the heading */}
          <div className="max-w-3xl mb-8 sm:mb-10 lg:max-w-none lg:mb-6 short:mb-4 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-bx-orange/30 bg-bx-orange/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.26em] text-bx-orange-dark font-bold shadow-xs mb-4">
                <DuotoneIcon name="users" size={14} />
                <span>LEADERSHIP TEAM</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-bx-navy-700 leading-tight tracking-tight">
                The People Leading <span className="text-bx-orange">BharatX.</span>
              </h2>
            </div>

            <p className="mt-4 text-base sm:text-lg text-bx-slate leading-relaxed font-normal lg:mt-0 lg:max-w-sm lg:shrink-0 lg:pb-1 lg:text-base">
              Experienced leaders across technology, operations and people, building the Group and its businesses.
            </p>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((person, i) => (
              <StaggerItem
                key={person.name}
                className={cn(
                  "h-full",
                  // In the 2-column tablet layout, centre a last card that would sit alone on the left
                  i === leadershipTeam.length - 1 &&
                  leadershipTeam.length % 2 === 1 &&
                  "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto",
                )}
              >
                <article
                  data-cursor="card"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-bx-line bg-bx-cream shadow-xs transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-bx-orange/30 hover:shadow-[0_28px_55px_-28px_rgba(11,31,71,0.45)]"
                >
                  {/*
                    Phones: the original photo in a square frame, cropped from the top. Desktop: cardPhoto, a 4:3
                    head-to-chest crop made for this 4:3 frame, so nothing is cut. Two plain images rather than a
                    <picture>, so a hot reload or resize can't leave the wrong one showing; the hidden one is lazy and
                    display:none, so it never downloads. Slow zoom on hover.
                  */}
                  <div className="relative m-3 mb-0 aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl bg-bx-surface-blue">
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 lg:hidden"
                    />
                    <img
                      src={person.cardPhoto}
                      alt={`${person.name}, ${person.role}`}
                      loading="lazy"
                      decoding="async"
                      className="hidden h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 lg:block"
                    />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bx-navy-900/25 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7 lg:pb-5 lg:pt-4 short:pb-4">
                    {/* Name with the LinkedIn profile link on the same line */}
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-heading text-2xl sm:text-[1.65rem] lg:text-xl font-medium leading-tight tracking-tight text-bx-navy-900">
                        {person.name}
                      </h3>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} on LinkedIn`}
                        title={`${person.name} on LinkedIn`}
                        data-cursor="link"
                        className="shrink-0 rounded-md transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-bx-linkedin focus-visible:ring-offset-2"
                      >
                        <LinkedInLogo className="h-7 w-7 lg:h-6 lg:w-6" />
                      </a>
                    </div>
                    {/* Two lines reserved from sm, so rules and bios line up when one title wraps */}
                    <p className="mt-1.5 lg:mt-1 text-[15px] lg:text-[13px] font-semibold leading-snug text-bx-orange-dark sm:min-h-[2.75em]">{person.role}</p>
                    <span aria-hidden className="mt-4 lg:mt-2.5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-bx-orange to-bx-orange-pale transition-all duration-500 group-hover:w-16" />
                    <p className="mt-4 lg:mt-2.5 text-[15px] lg:text-[13px] leading-relaxed text-bx-ink-soft">{person.bio}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </SectionTransition>
  );
}
