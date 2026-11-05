import { useState } from "react";
import { cn } from "../utils/cn";
import { DESC_MAX, DESC_MIN, scoreTone, TITLE_MAX, toneColor, toneLabel, type CheckStatus, type SeoResult } from "./seo";
import { Field, inputClass, Panel } from "./ui";

/** Score ring, like Yoast's traffic light. */
export function ScoreRing({ value, label, size = 72 }: { value: number; label?: string; size?: number }) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const tone = scoreTone(value);
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label ?? "Score"} ${value} out of 100`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={toneColor[tone]}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={size / 3.6} fontWeight="700" fill="#0F172A">
          {value}
        </text>
      </svg>
      {label && (
        <div>
          <p className="text-sm font-semibold text-bx-ink">{label}</p>
          <p className="text-xs font-semibold" style={{ color: toneColor[tone] }}>{toneLabel[tone]}</p>
        </div>
      )}
    </div>
  );
}

/** Small coloured dot + score, for the article list. */
export function ScoreDot({ value }: { value: number }) {
  const tone = scoreTone(value);
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold" title={`SEO score ${value}/100: ${toneLabel[tone]}`}>
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: toneColor[tone] }} />
      {value}
    </span>
  );
}

/** Character counter bar for the SEO title / description fields. */
function LengthBar({ len, min, max }: { len: number; min: number; max: number }) {
  const tone: CheckStatus = len === 0 ? "bad" : len > max ? "bad" : len < min ? "ok" : "good";
  return (
    <span className="mt-1.5 flex items-center gap-2">
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-bx-line">
        <span className="block h-full rounded-full transition-all" style={{ width: `${Math.min(100, (len / max) * 100)}%`, backgroundColor: toneColor[tone] }} />
      </span>
      <span className="w-16 text-right text-[11px] tabular-nums" style={{ color: toneColor[tone] }}>
        {len}/{max}
      </span>
    </span>
  );
}

const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

interface Props {
  result: SeoResult;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  slug: string;
  onChange: (patch: { focus_keyword?: string; seo_title?: string; seo_description?: string }) => void;
}

export function SeoPanel({ result, keyword, seoTitle, seoDescription, titlePlaceholder, descriptionPlaceholder, slug, onChange }: Props) {
  const [tab, setTab] = useState<"seo" | "readability">("seo");
  const desc = seoDescription.trim() || descriptionPlaceholder;
  const order: Record<CheckStatus, number> = { bad: 0, ok: 1, good: 2 };
  const list = result.checks.filter((c) => c.group === tab).sort((a, b) => order[a.status] - order[b.status]);

  return (
    <Panel title="SEO">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-bx-surface p-3">
          <ScoreRing value={result.score} label="SEO score" />
          {result.checks.some((c) => c.group === "readability") ? (
            <ScoreRing value={result.readability} label="Readability" size={56} />
          ) : (
            <p className="text-xs text-bx-slate">Readability: write a few paragraphs first.</p>
          )}
        </div>

        <Field label="Focus keyphrase" hint="The search words this article should rank for, e.g. “agritech startups India”.">
          <input className={inputClass} value={keyword} onChange={(e) => onChange({ focus_keyword: e.target.value })} placeholder="e.g. venture building India" />
        </Field>

        <Field label="SEO title" hint={<LengthBar len={result.fullTitle.length} min={35} max={TITLE_MAX} />}>
          <input className={inputClass} value={seoTitle} placeholder={titlePlaceholder} onChange={(e) => onChange({ seo_title: e.target.value })} />
        </Field>

        <Field label="Meta description" hint={<LengthBar len={desc.length} min={DESC_MIN} max={DESC_MAX} />}>
          <textarea className={cn(inputClass, "min-h-24")} value={seoDescription} placeholder={descriptionPlaceholder || "What will the reader get from this article? 120–160 characters."} onChange={(e) => onChange({ seo_description: e.target.value })} />
        </Field>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-bx-ink-muted">Google preview</p>
          <div className="rounded-xl border border-bx-line bg-white p-4 font-[arial,sans-serif]">
            <p className="flex items-center gap-2 text-xs text-[#202124]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f3f4]">
                <img src="/favicon.png" alt="" className="h-4 w-4" />
              </span>
              <span>
                BharatX Group
                <span className="block text-[11px] text-[#4d5156]">https://www.bharatxgroup.com › insights › {cut(slug || "…", 30)}</span>
              </span>
            </p>
            <p className="mt-2 text-[18px] leading-snug text-[#1a0dab]">{cut(result.fullTitle, TITLE_MAX)}</p>
            <p className="mt-1 text-[13px] leading-snug text-[#4d5156]">{desc ? cut(desc, DESC_MAX) : <em>Add a meta description or summary.</em>}</p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex rounded-lg border border-bx-line-strong p-0.5 text-xs font-semibold">
            {(["seo", "readability"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn("flex-1 rounded-md px-3 py-1.5", tab === t ? "bg-bx-navy-900 text-white" : "text-bx-slate")}
              >
                {t === "seo" ? "SEO checks" : "Readability"}
              </button>
            ))}
          </div>
          {list.length ? (
            <ul className="space-y-2.5">
              {list.map((c) => (
                <li key={c.id} className="flex gap-2.5 text-[13px] leading-snug text-bx-ink-soft">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: toneColor[c.status] }} aria-label={toneLabel[c.status]} />
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-bx-slate">Write at least a few paragraphs to see readability tips.</p>
          )}
        </div>
      </div>
    </Panel>
  );
}
