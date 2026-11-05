import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { insightCategories, type InsightCategory } from "../../data/insights";
import type { Post } from "../../services/posts";
import { cn } from "../../utils/cn";
import { isHtmlBody, renderMarkdown } from "../../utils/markdown";
import { analyzeSeo } from "../seo";
import { ScoreDot, SeoPanel } from "../SeoPanel";
import { ADMIN_BASE, mediaPath, MEDIA_BUCKET, sb, useAdmin } from "../db";
import { Badge, Btn, Field, fmtDate, inputClass, Loading, PageHead, Panel, UploadButton, useFail, useToast } from "../ui";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export function PostsView() {
  const [rows, setRows] = useState<Post[] | null>(null);
  const fail = useFail();
  const navigate = useNavigate();

  useEffect(() => {
    void sb()
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!fail(error, "Blog")) setRows((data as Post[]) ?? []);
      });
  }, [fail]);

  const scores = useMemo(() => new Map((rows ?? []).map((p) => [p.id, analyzeSeo(seoInput(p)).score])), [rows]);

  if (!rows) return <Loading />;

  return (
    <>
      <PageHead
        title="Blog"
        sub="Published articles appear on the Insights page, newest first, each with its own page."
        actions={
          <Link className="rounded-lg bg-bx-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-bx-orange-dark" to={`${ADMIN_BASE}/blog/new`}>
            New article
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-bx-line bg-white">
        {rows.length ? (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bx-line bg-bx-surface text-xs uppercase tracking-wide text-bx-slate">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">SEO</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Last edited</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bx-line">
              {rows.map((p) => (
                <tr key={p.id} className="cursor-pointer hover:bg-bx-surface" onClick={() => navigate(`${ADMIN_BASE}/blog/${p.id}`)}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-bx-slate">/insights/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3"><Badge k={p.status}>{p.status === "published" ? "Published" : "Draft"}</Badge></td>
                  <td className="px-4 py-3"><ScoreDot value={scores.get(p.id) ?? 0} /></td>
                  <td className="px-4 py-3 text-bx-slate">{fmtDate(p.published_at)}</td>
                  <td className="px-4 py-3 text-bx-slate">{fmtDate(p.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-sm text-bx-slate">No articles yet. Write the first one.</p>
        )}
      </div>
    </>
  );
}

type Draft = Pick<Post, "title" | "slug" | "excerpt" | "body" | "cover_image" | "category" | "seo_title" | "seo_description" | "author_name" | "focus_keyword">;

const seoInput = (p: Draft) => {
  const ownDesc = p.seo_description?.trim() ?? "";
  return {
    title: p.title,
    seoTitle: p.seo_title ?? "",
    description: ownDesc || p.excerpt,
    descriptionIsFallback: !ownDesc,
    slug: slugify(p.slug || p.title),
    keyword: p.focus_keyword ?? "",
    html: isHtmlBody(p.body) || !p.body ? p.body : renderMarkdown(p.body),
    coverImage: p.cover_image,
  };
};

/** Older articles were written in Markdown; the visual editor works in HTML. */
const toEditorHtml = (body: string) => (!body || isHtmlBody(body) ? body : renderMarkdown(body));

// The editor (~400 KB) loads only when an article is opened
const RichEditor = lazy(() => import("../RichEditor").then((m) => ({ default: m.RichEditor })));

const MISSING_KEYWORD_COLUMN = /focus_keyword/;

export function PostEditorView() {
  const { id } = useParams();
  const isNew = id === "new";
  const { profile } = useAdmin();
  const navigate = useNavigate();
  const fail = useFail();
  const toast = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [d, setD] = useState<Draft | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) {
      setPost(null);
      setSlugTouched(false);
      setD({ title: "", slug: "", excerpt: "", body: "", cover_image: null, category: "Perspectives", seo_title: null, seo_description: null, author_name: profile.full_name || null, focus_keyword: "" });
      return;
    }
    void sb()
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (fail(error, "Article")) return;
        if (!data) return navigate(`${ADMIN_BASE}/blog`, { replace: true });
        const p = data as Post;
        setPost(p);
        setD({ ...p, body: toEditorHtml(p.body), focus_keyword: p.focus_keyword ?? "" });
        setSlugTouched(true);
      });
  }, [id, isNew, fail, navigate, profile.full_name]);

  // Live SEO analysis; deferred so typing stays smooth on long articles
  const deferred = useDeferredValue(d);
  const seo = useMemo(() => (deferred ? analyzeSeo(seoInput(deferred)) : null), [deferred]);

  if (!d || !seo) return <Loading />;
  const set = (patch: Partial<Draft>) => setD((x) => (x ? { ...x, ...patch } : x));

  async function save(status: "draft" | "published") {
    if (!d) return;
    if (!d.title.trim()) return void toast("Add a title first.", "error");
    const slug = slugify(d.slug || d.title);
    if (!slug) return void toast("Add a web address (slug).", "error");
    const row = {
      body: d.body,
      cover_image: d.cover_image,
      category: d.category,
      title: d.title.trim(),
      slug,
      excerpt: d.excerpt.trim(),
      status,
      published_at: status === "published" ? post?.published_at ?? new Date().toISOString() : post?.published_at ?? null,
      seo_title: d.seo_title?.trim() || null,
      seo_description: d.seo_description?.trim() || null,
      author_name: d.author_name?.trim() || null,
      focus_keyword: d.focus_keyword?.trim() || null,
    };
    setBusy(true);
    const write = (r: Partial<typeof row>) =>
      isNew ? sb().from("posts").insert(r).select("*").single() : sb().from("posts").update(r).eq("id", post!.id).select("*").single();
    let { data, error } = await write(row);
    if (error && MISSING_KEYWORD_COLUMN.test(error.message)) {
      // Database set up before the focus keyphrase existed: save everything else and say how to fix it
      const { focus_keyword: _skip, ...rest } = row;
      ({ data, error } = await write(rest));
      if (!error) toast("Saved, but not the focus keyphrase: run supabase/migrations/002_focus_keyword.sql in Supabase once.", "error");
    }
    setBusy(false);
    if (error?.code === "23505") return void toast("Another article already uses this web address. Change the slug.", "error");
    if (fail(error, "Save")) return;
    // Remove a cover image that was replaced
    const oldCover = mediaPath(post?.cover_image);
    if (oldCover && post?.cover_image !== row.cover_image) await sb().storage.from(MEDIA_BUCKET).remove([oldCover]);
    const saved = data as Post;
    setPost(saved);
    setD((x) => (x ? { ...saved, focus_keyword: saved.focus_keyword ?? x.focus_keyword ?? "" } : x));
    toast(status === "published" ? "Article published." : "Draft saved.");
    if (isNew) navigate(`${ADMIN_BASE}/blog/${(data as Post).id}`, { replace: true });
  }

  const published = post?.status === "published";

  return (
    <>
      <PageHead
        title={isNew ? "New article" : "Edit article"}
        sub={
          <>
            <Link className="font-semibold text-bx-navy-700" to={`${ADMIN_BASE}/blog`}>← All articles</Link>
            {published && (
              <>
                {" · "}
                <a className="font-semibold text-bx-navy-700" href={`/insights/${post!.slug}`} target="_blank" rel="noopener">View on site ↗</a>
              </>
            )}
          </>
        }
        actions={
          <>
            <Btn disabled={busy} onClick={() => void save("draft")}>{published ? "Unpublish (save as draft)" : "Save draft"}</Btn>
            <Btn variant="primary" disabled={busy} onClick={() => void save("published")}>{busy ? "Saving…" : published ? "Update" : "Publish"}</Btn>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Panel>
            <div className="space-y-4">
              <Field label="Title *">
                <input
                  className={cn(inputClass, "text-base font-semibold")}
                  value={d.title}
                  onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })}
                />
              </Field>
              <Field label="Web address" hint={`bharatxgroup.com/insights/${slugify(d.slug || d.title) || "…"}`}>
                <input
                  className={inputClass}
                  value={d.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set({ slug: e.target.value });
                  }}
                  onBlur={() => set({ slug: slugify(d.slug) })}
                />
              </Field>
              <Field label="Summary" hint="Shown on the Insights card and under the title. One or two sentences.">
                <textarea className={cn(inputClass, "min-h-20")} value={d.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
              </Field>
            </div>
          </Panel>

          <Suspense fallback={<div className="flex min-h-[540px] items-center justify-center rounded-xl border border-bx-line bg-white text-sm text-bx-slate">Loading editor…</div>}>
            <RichEditor key={post?.id ?? "new"} value={d.body} onChange={(body) => set({ body })} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <SeoPanel
            result={seo}
            keyword={d.focus_keyword ?? ""}
            seoTitle={d.seo_title ?? ""}
            seoDescription={d.seo_description ?? ""}
            titlePlaceholder={d.title || "Defaults to the article title"}
            descriptionPlaceholder={d.excerpt.trim()}
            slug={slugify(d.slug || d.title)}
            onChange={set}
          />
          <Panel title="Cover image">
            {d.cover_image ? (
              <img src={d.cover_image} alt="" className="aspect-[16/9] w-full rounded-xl object-cover" />
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-dashed border-bx-line-strong text-sm text-bx-slate">No cover image</div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <UploadButton folder="posts" maxSize={1920} label={d.cover_image ? "Replace" : "Upload"} onUploaded={(url) => set({ cover_image: url })} />
              {d.cover_image && <Btn size="sm" variant="danger" onClick={() => set({ cover_image: null })}>Remove</Btn>}
            </div>
            <p className="mt-2 text-xs text-bx-slate">Landscape photo, ideally 1920×1080. It's compressed automatically.</p>
          </Panel>

          <Panel title="Details">
            <div className="space-y-4">
              <Field label="Category">
                <select className={inputClass} value={d.category} onChange={(e) => set({ category: e.target.value as InsightCategory })}>
                  {Object.keys(insightCategories).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Author">
                <input className={inputClass} value={d.author_name ?? ""} onChange={(e) => set({ author_name: e.target.value })} />
              </Field>
            </div>
          </Panel>

          {!isNew && (
            <Btn
              variant="danger"
              className="w-full"
              onClick={async () => {
                if (!window.confirm("Delete this article permanently?")) return;
                const { error } = await sb().from("posts").delete().eq("id", post!.id);
                if (fail(error, "Delete")) return;
                const cover = mediaPath(post?.cover_image);
                if (cover) await sb().storage.from(MEDIA_BUCKET).remove([cover]);
                toast("Article deleted.");
                navigate(`${ADMIN_BASE}/blog`);
              }}
            >
              Delete article
            </Btn>
          )}
        </div>
      </div>
    </>
  );
}
