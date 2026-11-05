import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BASE, adminUrl, sb } from "./db";
import { Btn, Field, inputClass, useFail, useToast } from "./ui";

export function AuthCard({ title, sub, children }: { title: string; sub?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bx-navy-950 bg-[radial-gradient(ellipse_at_70%_15%,rgba(245,73,0,0.18),transparent_55%)] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-8">
        <img src="/bharatxgroup-588.webp" alt="BharatX Group" className="mx-auto mb-5 h-16 w-auto" />
        <h1 className="text-center font-heading text-2xl font-medium text-bx-ink">{title}</h1>
        {sub && <p className="mt-1 text-center text-sm text-bx-slate">{sub}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

const linkCls = "font-semibold text-bx-navy-700 hover:text-bx-orange";

function useSubmit() {
  const [busy, setBusy] = useState(false);
  const run = (fn: () => Promise<void>) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };
  return { busy, run };
}

export function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { busy, run } = useSubmit();
  const fail = useFail();
  return (
    <AuthCard title="Admin login" sub="BharatX Group dashboard">
      <form
        className="space-y-4"
        onSubmit={run(async () => {
          const { error } = await sb().auth.signInWithPassword({ email: email.trim(), password });
          fail(error, "Login");
        })}
      >
        <Field label="Email">
          <input className={inputClass} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Btn type="submit" variant="primary" className="w-full" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </Btn>
      </form>
      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
        <Link className={linkCls} to={`${ADMIN_BASE}/forgot`}>Forgot password?</Link>
        <Link className={linkCls} to={`${ADMIN_BASE}/signup`}>Invited? Create your login</Link>
      </div>
    </AuthCard>
  );
}

export function SignupView() {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [done, setDone] = useState(false);
  const { busy, run } = useSubmit();
  const fail = useFail();
  if (done)
    return (
      <AuthCard title="Check your email" sub="We've sent you a confirmation link. Open it, then log in here.">
        <Link className={linkCls} to={`${ADMIN_BASE}/login`}>Back to login</Link>
      </AuthCard>
    );
  return (
    <AuthCard title="Create your login" sub="Only email addresses invited by an owner get dashboard access.">
      <form
        className="space-y-4"
        onSubmit={run(async () => {
          const { data, error } = await sb().auth.signUp({
            email: f.email.trim(),
            password: f.password,
            options: { data: { full_name: f.name.trim() }, emailRedirectTo: adminUrl() },
          });
          if (fail(error, "Sign up")) return;
          // With email confirmation off, Supabase logs the user straight in
          if (!data.session) setDone(true);
        })}
      >
        <Field label="Your name">
          <input className={inputClass} required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        </Field>
        <Field label="Email (the one you were invited with)">
          <input className={inputClass} type="email" autoComplete="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        </Field>
        <Field label="Password" hint="At least 8 characters.">
          <input className={inputClass} type="password" minLength={8} autoComplete="new-password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        </Field>
        <Btn type="submit" variant="primary" className="w-full" disabled={busy}>
          {busy ? "Creating…" : "Create login"}
        </Btn>
      </form>
      <p className="mt-5 text-sm">
        <Link className={linkCls} to={`${ADMIN_BASE}/login`}>Back to login</Link>
      </p>
    </AuthCard>
  );
}

export function ForgotView() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { busy, run } = useSubmit();
  const fail = useFail();
  return (
    <AuthCard title="Reset password" sub={sent ? "If that email has a login, a reset link is on its way." : "We'll email you a link to set a new password."}>
      {!sent && (
        <form
          className="space-y-4"
          onSubmit={run(async () => {
            const { error } = await sb().auth.resetPasswordForEmail(email.trim(), { redirectTo: adminUrl("/reset") });
            if (!fail(error, "Reset")) setSent(true);
          })}
        >
          <Field label="Email">
            <input className={inputClass} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Btn type="submit" variant="primary" className="w-full" disabled={busy}>
            {busy ? "Sending…" : "Send reset link"}
          </Btn>
        </form>
      )}
      <p className="mt-5 text-sm">
        <Link className={linkCls} to={`${ADMIN_BASE}/login`}>Back to login</Link>
      </p>
    </AuthCard>
  );
}

/** Opened from the reset email (Supabase signs the user in with a recovery session first). */
export function ResetView() {
  const [pw, setPw] = useState({ a: "", b: "" });
  const { busy, run } = useSubmit();
  const fail = useFail();
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <AuthCard title="Set a new password">
      <form
        className="space-y-4"
        onSubmit={run(async () => {
          if (pw.a !== pw.b) return void toast("The passwords don't match.", "error");
          const { error } = await sb().auth.updateUser({ password: pw.a });
          if (fail(error, "Password")) return;
          toast("Password updated.");
          navigate(ADMIN_BASE, { replace: true });
        })}
      >
        <Field label="New password">
          <input className={inputClass} type="password" minLength={8} autoComplete="new-password" required value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} />
        </Field>
        <Field label="Repeat">
          <input className={inputClass} type="password" minLength={8} autoComplete="new-password" required value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} />
        </Field>
        <Btn type="submit" variant="primary" className="w-full" disabled={busy}>
          {busy ? "Saving…" : "Save password"}
        </Btn>
      </form>
    </AuthCard>
  );
}
