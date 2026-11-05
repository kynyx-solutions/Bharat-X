import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADMIN_BASE, sb, useAdmin } from "../db";
import { Badge, fmtDateTime, Loading, PageHead, Panel } from "../ui";
import { LEAD_STATUS, type Lead } from "./Leads";

interface Stats {
  newLeads: number;
  leads30: number;
  published: number;
  drafts: number;
  recent: Pick<Lead, "id" | "created_at" | "name" | "interest" | "status">[];
}

export function DashboardView() {
  const { profile } = useAdmin();
  const [s, setS] = useState<Stats | null>(null);

  useEffect(() => {
    const since = new Date(Date.now() - 30 * 864e5).toISOString();
    const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count ?? 0);
    void Promise.all([
      count(sb().from("leads").select("id", { count: "exact", head: true }).eq("status", "new")),
      count(sb().from("leads").select("id", { count: "exact", head: true }).gte("created_at", since)),
      count(sb().from("posts").select("id", { count: "exact", head: true }).eq("status", "published")),
      count(sb().from("posts").select("id", { count: "exact", head: true }).eq("status", "draft")),
      sb().from("leads").select("id,created_at,name,interest,status").order("created_at", { ascending: false }).limit(6),
    ]).then(([newLeads, leads30, published, drafts, recent]) =>
      setS({ newLeads, leads30, published, drafts, recent: (recent.data as Stats["recent"]) ?? [] }),
    );
  }, []);

  if (!s) return <Loading />;

  const cards: [string, number, string][] = [
    ["New enquiries", s.newLeads, "/enquiries"],
    ["Enquiries, last 30 days", s.leads30, "/enquiries"],
    ["Published articles", s.published, "/blog"],
    ["Drafts", s.drafts, "/blog"],
  ];

  return (
    <>
      <PageHead title={`Hello${profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`} sub="What's happening on bharatxgroup.com." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(([label, n, to]) => (
          <Link key={label} to={`${ADMIN_BASE}${to}`} className="rounded-2xl border border-bx-line bg-white p-5 transition-colors hover:border-bx-navy-700/40">
            <p className="font-heading text-3xl font-medium text-bx-ink">{n}</p>
            <p className="mt-1 text-sm text-bx-slate">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel title="Latest enquiries" actions={<Link className="text-sm font-semibold text-bx-navy-700" to={`${ADMIN_BASE}/enquiries`}>View all</Link>}>
          {s.recent.length ? (
            <ul className="divide-y divide-bx-line">
              {s.recent.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{l.name}</p>
                    <p className="truncate text-bx-slate">
                      {l.interest || "General"} · {fmtDateTime(l.created_at)}
                    </p>
                  </div>
                  <Badge k={l.status}>{LEAD_STATUS[l.status]}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-bx-slate">No enquiries yet. They appear here as soon as someone submits the Contact form.</p>
          )}
        </Panel>
        <Panel title="Quick actions">
          <div className="flex flex-col gap-2 text-sm">
            <Link className="rounded-lg bg-bx-orange px-4 py-2.5 text-center font-semibold text-white hover:bg-bx-orange-dark" to={`${ADMIN_BASE}/blog/new`}>
              Write an article
            </Link>
            <Link className="rounded-lg border border-bx-line-strong px-4 py-2.5 text-center font-semibold hover:border-bx-navy-700/50" to={`${ADMIN_BASE}/homepage`}>
              Change homepage images & stats
            </Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
