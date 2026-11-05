import { useCallback, useEffect, useState } from "react";
import { adminUrl, sb, useAdmin, type Profile } from "../db";
import { Badge, Btn, Field, fmtDate, inputClass, Loading, PageHead, Panel, useFail, useToast } from "../ui";

interface Invite {
  email: string;
  role: Profile["role"];
  invited_at: string;
}

/** Owners only: who can use the dashboard. */
export function StaffView() {
  const { profile: me } = useAdmin();
  const [people, setPeople] = useState<Profile[] | null>(null);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Profile["role"]>("staff");
  const fail = useFail();
  const toast = useToast();

  const load = useCallback(async () => {
    const [P, I] = await Promise.all([
      sb().from("profiles").select("*").order("created_at"),
      sb().from("staff_invites").select("*").order("invited_at"),
    ]);
    if (fail(P.error, "Staff") || fail(I.error, "Invites")) return;
    setPeople((P.data as Profile[]) ?? []);
    setInvites((I.data as Invite[]) ?? []);
  }, [fail]);

  useEffect(() => void load(), [load]);
  if (!people) return <Loading />;

  const signupLink = adminUrl("/signup");

  return (
    <>
      <PageHead title="Staff" sub="Owners can do everything, including managing staff. Staff can manage enquiries, the blog and the homepage." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-bx-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-bx-line bg-bx-surface text-xs uppercase tracking-wide text-bx-slate">
                <tr>
                  <th className="px-4 py-3">Person</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Since</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-bx-line">
                {people.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{p.full_name || "—"}</p>
                      <p className="text-xs text-bx-slate">{p.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      {p.id === me.id ? (
                        <Badge k={p.role}>{p.role === "owner" ? "Owner (you)" : "Staff (you)"}</Badge>
                      ) : (
                        <select
                          className={inputClass}
                          value={p.role}
                          onChange={async (e) => {
                            const { error } = await sb().from("profiles").update({ role: e.target.value }).eq("id", p.id);
                            if (!fail(error, "Role")) {
                              toast("Role updated.");
                              await load();
                            }
                          }}
                        >
                          <option value="staff">Staff</option>
                          <option value="owner">Owner</option>
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-3 text-bx-slate">{fmtDate(p.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      {p.id !== me.id && (
                        <Btn
                          size="sm"
                          variant="danger"
                          onClick={async () => {
                            if (!window.confirm(`Remove ${p.email}'s dashboard access?`)) return;
                            const { error } = await sb().from("profiles").delete().eq("id", p.id);
                            if (!fail(error, "Remove")) {
                              toast("Access removed.");
                              await load();
                            }
                          }}
                        >
                          Remove access
                        </Btn>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {invites.length > 0 && (
            <Panel title="Pending invites">
              <ul className="divide-y divide-bx-line text-sm">
                {invites.map((i) => (
                  <li key={i.email} className="flex items-center justify-between gap-3 py-2">
                    <span>
                      {i.email} · <span className="capitalize text-bx-slate">{i.role}</span>
                    </span>
                    <Btn
                      size="sm"
                      onClick={async () => {
                        const { error } = await sb().from("staff_invites").delete().eq("email", i.email);
                        if (!fail(error, "Cancel")) await load();
                      }}
                    >
                      Cancel
                    </Btn>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>

        <Panel title="Invite someone" className="h-fit">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const { error } = await sb().from("staff_invites").upsert({ email: email.trim().toLowerCase(), role });
              if (fail(error, "Invite")) return;
              toast("Invite saved. Share the sign-up link with them.");
              setEmail("");
              await load();
            }}
          >
            <Field label="Email">
              <input className={inputClass} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Role">
              <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as Profile["role"])}>
                <option value="staff">Staff</option>
                <option value="owner">Owner</option>
              </select>
            </Field>
            <Btn type="submit" variant="primary">Save invite</Btn>
          </form>
          <p className="mt-4 text-xs text-bx-slate">
            Then send them this sign-up link. They must use the invited email:
            <br />
            <code className="mt-1 inline-block break-all rounded bg-bx-surface-grey px-1.5 py-0.5">{signupLink}</code>
          </p>
        </Panel>
      </div>
    </>
  );
}
