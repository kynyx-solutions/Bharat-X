import { useState } from "react";
import { sb, useAdmin } from "../db";
import { Btn, Field, inputClass, PageHead, Panel, useFail, useToast } from "../ui";

export function AccountView() {
  const { profile, session, refreshProfile } = useAdmin();
  const [name, setName] = useState(profile.full_name);
  const [pw, setPw] = useState({ a: "", b: "" });
  const fail = useFail();
  const toast = useToast();

  return (
    <>
      <PageHead title="My account" sub={session.user.email} />
      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Your name">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const { error } = await sb().from("profiles").update({ full_name: name.trim() }).eq("id", profile.id);
              if (fail(error, "Name")) return;
              toast("Name saved.");
              await refreshProfile();
            }}
          >
            <Field label="Name shown to the team">
              <input className={inputClass} required value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Btn type="submit" variant="primary">Save</Btn>
          </form>
        </Panel>
        <Panel title="Change password">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (pw.a !== pw.b) return void toast("The passwords don't match.", "error");
              const { error } = await sb().auth.updateUser({ password: pw.a });
              if (fail(error, "Password")) return;
              setPw({ a: "", b: "" });
              toast("Password updated.");
            }}
          >
            <Field label="New password">
              <input className={inputClass} type="password" minLength={8} autoComplete="new-password" required value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} />
            </Field>
            <Field label="Repeat">
              <input className={inputClass} type="password" minLength={8} autoComplete="new-password" required value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} />
            </Field>
            <Btn type="submit" variant="primary">Update password</Btn>
          </form>
        </Panel>
      </div>
    </>
  );
}
