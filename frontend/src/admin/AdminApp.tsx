import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { AuthCard, ForgotView, LoginView, ResetView, SignupView } from "./Auth";
import { ADMIN_BASE, AdminContext, db, sb, useAdmin, type Profile } from "./db";
import { Btn, Loading, ToastProvider } from "./ui";
import { DashboardView } from "./views/Dashboard";
import { LeadsView } from "./views/Leads";
import { PostEditorView, PostsView } from "./views/Posts";
import { HomepageView } from "./views/Homepage";
import { StaffView } from "./views/Staff";
import { AccountView } from "./views/Account";

/** /admin — the BharatX admin dashboard (Supabase). See supabase/SETUP.md. */
export default function AdminApp() {
  // Keep the dashboard out of search engines
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = "BharatX Admin";
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, []);

  return <ToastProvider>{db ? <Gate /> : <NotConfigured />}</ToastProvider>;
}

function NotConfigured() {
  return (
    <AuthCard title="Connect Supabase" sub="The dashboard needs a Supabase project.">
      <p className="text-sm text-bx-ink-soft">
        Add <code className="rounded bg-bx-surface-grey px-1">VITE_SUPABASE_URL</code> and{" "}
        <code className="rounded bg-bx-surface-grey px-1">VITE_SUPABASE_ANON_KEY</code> to the frontend environment (Vercel →
        Settings → Environment Variables), redeploy, then reload this page.
      </p>
      <p className="mt-3 text-xs text-bx-slate">Step-by-step: supabase/SETUP.md in the repository.</p>
    </AuthCard>
  );
}

function Gate() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    void sb()
      .auth.getSession()
      .then(({ data }) => setSession(data.session));
    const { data } = sb().auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "PASSWORD_RECOVERY") navigate(`${ADMIN_BASE}/reset`, { replace: true });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = useCallback(async () => {
    if (!session) return setProfile(null);
    const { data } = await sb().from("profiles").select("*").eq("id", session.user.id).maybeSingle();
    setProfile((data as Profile | null) ?? null);
  }, [session]);

  useEffect(() => {
    setProfile(undefined);
    void loadProfile();
  }, [loadProfile]);

  if (session === undefined) return <AuthCard title="Loading…">{null}</AuthCard>;

  // Logged out: only the auth screens
  if (!session) {
    return (
      <Routes>
        <Route path="login" element={<LoginView />} />
        <Route path="signup" element={<SignupView />} />
        <Route path="forgot" element={<ForgotView />} />
        <Route path="reset" element={<ResetView />} />
        <Route path="*" element={<Navigate to={`${ADMIN_BASE}/login`} replace />} />
      </Routes>
    );
  }

  if (pathname.startsWith(`${ADMIN_BASE}/reset`)) return <ResetView />;
  if (profile === undefined) return <AuthCard title="Loading…">{null}</AuthCard>;

  if (!profile) {
    return (
      <AuthCard title="No access yet" sub={session.user.email}>
        <p className="text-sm text-bx-ink-soft">
          This login hasn't been invited to the dashboard. Ask an owner to invite this email under <b>Staff</b>, then sign up again
          with it.
        </p>
        <Btn className="mt-5 w-full" onClick={() => void sb().auth.signOut()}>
          Log out
        </Btn>
      </AuthCard>
    );
  }

  return (
    <AdminContext.Provider value={{ session, profile, isOwner: profile.role === "owner", refreshProfile: loadProfile }}>
      <Shell>
        <Routes>
          <Route index element={<DashboardView />} />
          <Route path="enquiries" element={<LeadsView />} />
          <Route path="blog" element={<PostsView />} />
          <Route path="blog/:id" element={<PostEditorView />} />
          <Route path="homepage" element={<HomepageView />} />
          <Route path="staff" element={profile.role === "owner" ? <StaffView /> : <Navigate to={ADMIN_BASE} replace />} />
          <Route path="account" element={<AccountView />} />
          <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
        </Routes>
      </Shell>
    </AdminContext.Provider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { profile, isOwner } = useAdmin();
  const [newLeads, setNewLeads] = useState<number | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    void sb()
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .then(({ count }) => setNewLeads(count ?? 0));
  }, [pathname]);

  const nav: [string, string, number?][] = [
    ["", "Dashboard"],
    ["/enquiries", "Enquiries", newLeads ?? undefined],
    ["/blog", "Blog"],
    ["/homepage", "Homepage"],
    ...(isOwner ? ([["/staff", "Staff"]] as [string, string][]) : []),
    ["/account", "My account"],
  ];

  return (
    <div className="min-h-screen bg-bx-surface text-bx-ink lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-bx-navy-950 text-white/80 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="hidden px-5 pt-6 pb-5 lg:block">
          <img src="/bharatxgroup-588.webp" alt="BharatX Group" className="h-12 w-auto rounded bg-white p-1" />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.24em] text-bx-orange-light">Admin</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:px-3">
          {nav.map(([to, label, badge]) => (
            <NavLink
              key={to}
              to={`${ADMIN_BASE}${to}`}
              end={to === ""}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive ? "bg-white/10 font-semibold text-white" : "hover:bg-white/5 hover:text-white",
                )
              }
            >
              {label}
              {!!badge && <span className="rounded-full bg-bx-orange px-2 text-xs font-bold text-white">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="hidden border-t border-white/10 px-5 py-4 text-xs lg:block">
          <p className="truncate text-white">{profile.full_name || profile.email}</p>
          <p className="capitalize text-white/50">{profile.role}</p>
          <div className="mt-3 flex gap-3">
            <a href="/" target="_blank" rel="noopener" className="text-bx-orange-light hover:underline">
              View site ↗
            </a>
            <button type="button" className="text-white/70 hover:text-white" onClick={() => void sb().auth.signOut()}>
              Log out
            </button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 flex justify-end gap-3 text-xs lg:hidden">
          <a href="/" target="_blank" rel="noopener" className="font-semibold text-bx-navy-700">
            View site ↗
          </a>
          <button type="button" className="font-semibold text-bx-slate" onClick={() => void sb().auth.signOut()}>
            Log out
          </button>
        </div>
        <div className="mx-auto max-w-6xl">{children ?? <Loading />}</div>
      </main>
    </div>
  );
}
