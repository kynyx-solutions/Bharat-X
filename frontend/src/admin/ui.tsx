import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { uploadImage } from "./upload";

/* ---------- toasts ---------- */
type Toast = { id: number; msg: string; kind: "ok" | "error" };
const ToastCtx = createContext<(msg: string, kind?: Toast["kind"]) => void>(() => undefined);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((msg: string, kind: Toast["kind"] = "ok") => {
    const id = Date.now() + Math.random();
    setItems((t) => [...t, { id, msg, kind }]);
    window.setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), kind === "error" ? 7000 : 3500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div aria-live="polite" className="fixed bottom-5 right-5 z-[100] flex max-w-sm flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg",
              t.kind === "error" ? "bg-red-600" : "bg-bx-navy-900",
            )}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/** Shows a Supabase/JS error as a toast; returns true when there was one. */
export function useFail() {
  const toast = useToast();
  return useCallback(
    (error: unknown, what?: string) => {
      if (!error) return false;
      const msg = error instanceof Error ? error.message : (error as { message?: string }).message ?? String(error);
      toast((what ? `${what}: ` : "") + msg, "error");
      return true;
    },
    [toast],
  );
}

/* ---------- building blocks ---------- */
type BtnVariant = "primary" | "default" | "danger" | "ghost";
export function Btn({
  variant = "default",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
        variant === "primary" && "bg-bx-orange text-white hover:bg-bx-orange-dark",
        variant === "default" && "border border-bx-line-strong bg-white text-bx-ink hover:border-bx-navy-700/50",
        variant === "danger" && "border border-red-200 bg-white text-red-600 hover:bg-red-50",
        variant === "ghost" && "text-bx-navy-700 hover:bg-bx-surface-blue",
        className,
      )}
    />
  );
}

export function Panel({ title, children, className, actions }: { title?: ReactNode; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <section className={cn("rounded-2xl border border-bx-line bg-white p-5 sm:p-6", className)}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-heading text-lg font-medium text-bx-ink">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHead({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-bx-ink">{title}</h1>
        {sub && <p className="mt-1 max-w-3xl text-sm text-bx-slate">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-bx-line-strong bg-white px-3 py-2.5 text-sm text-bx-ink outline-none transition-colors placeholder:text-bx-slate-light focus:border-bx-navy-700 focus:ring-2 focus:ring-bx-navy-700/15";

export function Field({ label, hint, children, className }: { label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-bx-ink-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-bx-slate">{hint}</span>}
    </label>
  );
}

const BADGE: Record<string, string> = {
  new: "bg-orange-100 text-orange-800",
  contacted: "bg-blue-100 text-blue-800",
  in_progress: "bg-violet-100 text-violet-800",
  closed: "bg-emerald-100 text-emerald-800",
  spam: "bg-gray-200 text-gray-700",
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-gray-200 text-gray-700",
  owner: "bg-orange-100 text-orange-800",
  staff: "bg-blue-100 text-blue-800",
};
export function Badge({ k, children }: { k: string; children: ReactNode }) {
  return <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", BADGE[k] ?? "bg-gray-100 text-gray-700")}>{children}</span>;
}

export const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
export const fmtDateTime = (d?: string | null) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—";

/** Picks an image, compresses and uploads it, then reports the new public URL. */
export function UploadButton({
  folder,
  maxSize,
  onUploaded,
  label = "Upload image",
  size = "sm",
}: {
  folder: string;
  maxSize?: number;
  onUploaded: (url: string) => void;
  label?: string;
  size?: "sm" | "md";
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const fail = useFail();
  return (
    <>
      <Btn size={size} disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? "Uploading…" : label}
      </Btn>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          try {
            onUploaded(await uploadImage(folder, file, maxSize));
          } catch (err) {
            fail(err, "Upload");
          } finally {
            setBusy(false);
          }
        }}
      />
    </>
  );
}

export function Loading() {
  return <p className="py-10 text-sm text-bx-slate">Loading…</p>;
}
