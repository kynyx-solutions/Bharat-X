import { useCallback, useEffect, useMemo, useState } from "react";
import { sb } from "../db";
import { Badge, Btn, Field, fmtDateTime, inputClass, Loading, PageHead, Panel, useFail, useToast } from "../ui";
import { cn } from "../../utils/cn";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  website: string | null;
  interest: string | null;
  message: string;
  source_page: string | null;
  status: keyof typeof LEAD_STATUS;
  notes: string | null;
}

export const LEAD_STATUS = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  closed: "Closed",
  spam: "Spam",
} as const;

function downloadCSV(rows: Lead[]) {
  const cols: (keyof Lead)[] = ["created_at", "name", "email", "phone", "organization", "interest", "status", "message", "notes"];
  const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [cols.map(q).join(","), ...rows.map((r) => cols.map((c) => q(r[c])).join(","))];
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" }));
  a.download = `bharatx-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export function LeadsView() {
  const [rows, setRows] = useState<Lead[] | null>(null);
  const [status, setStatus] = useState<string>("open");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const fail = useFail();

  const load = useCallback(async () => {
    const { data, error } = await sb().from("leads").select("*").order("created_at", { ascending: false }).limit(2000);
    if (!fail(error, "Enquiries")) setRows((data as Lead[]) ?? []);
  }, [fail]);

  useEffect(() => void load(), [load]);

  const shown = useMemo(() => {
    const s = search.trim().toLowerCase();
    return (rows ?? []).filter((l) => {
      if (status === "open" && (l.status === "closed" || l.status === "spam")) return false;
      if (status !== "open" && status !== "all" && l.status !== status) return false;
      return !s || [l.name, l.email, l.phone, l.organization, l.message].some((v) => v?.toLowerCase().includes(s));
    });
  }, [rows, status, search]);

  if (!rows) return <Loading />;
  const open = rows.find((l) => l.id === openId);

  return (
    <>
      <PageHead
        title="Enquiries"
        sub="Everything sent through the Contact page. Mark each one as you follow up."
        actions={<Btn onClick={() => downloadCSV(shown)} disabled={!shown.length}>Download CSV</Btn>}
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <select className={cn(inputClass, "w-auto")} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open (not closed)</option>
          <option value="all">All</option>
          {Object.entries(LEAD_STATUS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <input className={cn(inputClass, "max-w-xs")} placeholder="Search name, email, message…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="overflow-x-auto rounded-2xl border border-bx-line bg-white">
          {shown.length ? (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-bx-line bg-bx-surface text-xs uppercase tracking-wide text-bx-slate">
                <tr>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">Interest</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bx-line">
                {shown.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setOpenId(l.id)}
                    className={cn("cursor-pointer hover:bg-bx-surface", openId === l.id && "bg-bx-surface-blue")}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-bx-slate">{fmtDateTime(l.created_at)}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{l.name}</p>
                      <p className="text-xs text-bx-slate">{l.organization || l.email}</p>
                    </td>
                    <td className="px-4 py-3 text-bx-ink-soft">{l.interest || "—"}</td>
                    <td className="px-4 py-3"><Badge k={l.status}>{LEAD_STATUS[l.status]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-sm text-bx-slate">No enquiries match.</p>
          )}
        </div>

        {open ? (
          <LeadDetail key={open.id} lead={open} onChanged={load} onClose={() => setOpenId(null)} />
        ) : (
          <Panel><p className="text-sm text-bx-slate">Select an enquiry to see the full message and update it.</p></Panel>
        )}
      </div>
    </>
  );
}

function LeadDetail({ lead, onChanged, onClose }: { lead: Lead; onChanged: () => Promise<void>; onClose: () => void }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [busy, setBusy] = useState(false);
  const fail = useFail();
  const toast = useToast();

  const row = (label: string, value: React.ReactNode) =>
    value ? (
      <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 text-sm">
        <span className="text-bx-slate">{label}</span>
        <span className="min-w-0 break-words">{value}</span>
      </div>
    ) : null;

  return (
    <Panel title={lead.name} actions={<Btn size="sm" variant="ghost" onClick={onClose}>Close</Btn>} className="h-fit xl:sticky xl:top-6">
      {row("Email", <a className="font-semibold text-bx-navy-700" href={`mailto:${lead.email}`}>{lead.email}</a>)}
      {row("Phone", lead.phone && <a className="font-semibold text-bx-navy-700" href={`tel:${lead.phone}`}>{lead.phone}</a>)}
      {row("Organisation", lead.organization)}
      {row("Website", lead.website)}
      {row("Interest", lead.interest)}
      {row("Received", fmtDateTime(lead.created_at))}
      <p className="mt-4 whitespace-pre-wrap rounded-xl bg-bx-surface p-4 text-sm leading-relaxed">{lead.message}</p>

      <div className="mt-5 space-y-4">
        <Field label="Status">
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as Lead["status"])}>
            {Object.entries(LEAD_STATUS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Internal notes" hint="Only the team sees these.">
          <textarea className={cn(inputClass, "min-h-24")} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Btn
            variant="primary"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const { error } = await sb().from("leads").update({ status, notes: notes.trim() || null }).eq("id", lead.id);
              setBusy(false);
              if (!fail(error, "Save")) {
                toast("Enquiry updated.");
                await onChanged();
              }
            }}
          >
            {busy ? "Saving…" : "Save"}
          </Btn>
          <a
            className="inline-flex items-center rounded-lg border border-bx-line-strong px-4 py-2.5 text-sm font-semibold hover:border-bx-navy-700/50"
            href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: your enquiry to BharatX Group")}`}
          >
            Reply by email
          </a>
          <Btn
            variant="danger"
            className="ml-auto"
            onClick={async () => {
              if (!window.confirm("Delete this enquiry permanently?")) return;
              const { error } = await sb().from("leads").delete().eq("id", lead.id);
              if (!fail(error, "Delete")) {
                toast("Enquiry deleted.");
                onClose();
                await onChanged();
              }
            }}
          >
            Delete
          </Btn>
        </div>
      </div>
    </Panel>
  );
}
