import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { insightCategories, type InsightCategory } from "../../data/insights";
import type { Post } from "../../services/posts";
import { cn } from "../../utils/cn";
import { renderMarkdown } from "../../utils/markdown";
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
      .select("id,slug,title,status,category,published_at,updated_at")
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!fail(error, "Blog")) setRows((data as Post[]) ?? []);
      });
  }, [fail]);

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

type Draft = Pick<Post, "title" | "slug" | "excerpt" | "body" | "cover_image" | "category" | "seo_title" | "seo_description" | "author_name">;

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
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNew) {
      setPost(null);
      setSlugTouched(false);
      setD({ title: "", slug: "", excerpt: "", body: "", cover_image: null, category: "Perspectives", seo_title: null, seo_description: null, author_name: profile.full_name || null });
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
        setPost(data as Post);
        setD(data as Post);
        setSlugTouched(true);
      });
  }, [id, isNew, fail, navigate, profile.full_name]);

  const preview = useMemo(() => (tab === "preview" && d ? renderMarkdown(d.body) : ""), [tab, d]);

  if (!d) return <Loading />;
  const set = (patch: Partial<Draft>) => setD({ ...d, ...patch });

  const insertAtCursor = (text: string) => {
    const el = bodyRef.current;
    const start = el?.selectionStart ?? d.body.length;
    const end = el?.selectionEnd ?? d.body.length;
    set({ body: d.body.slice(0, start) + text + d.body.slice(end) });
  };

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
    };
    setBusy(true);
    const q = isNew ? sb().from("posts").insert(row).select("*").single() : sb().from("posts").update(row).eq("id", post!.id).select("*").single();
    const { data, error } = await q;
    setBusy(false);
    if (error?.code === "23505") return void toast("Another article already uses this web address. Change the slug.", "error");
    if (fail(error, "Save")) return;
    // Remove a cover image that was replaced
    const oldCover = mediaPath(post?.cover_image);
    if (oldCover && post?.cover_image !== row.cover_image) await sb().storage.from(MEDIA_BUCKET).remove([oldCover]);
    setPost(data as Post);
    setD(data as Post);
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

          <Panel
            title="Article"
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <UploadButton folder="posts" maxSize={1600} label="Insert image" onUploaded={(url) => insertAtCursor(`\n\n![](${url})\n\n`)} />
                <div className="flex rounded-lg border border-bx-line-strong p-0.5 text-xs font-semibold">
                  {(["write", "preview"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={cn("rounded-md px-3 py-1.5 capitalize", tab === t ? "bg-bx-navy-900 text-white" : "text-bx-slate")}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            }
          >
            {tab === "write" ? (
              <>
                <textarea
                  ref={bodyRef}
                  className={cn(inputClass, "min-h-[460px] font-mono text-[13px] leading-relaxed")}
                  value={d.body}
                  onChange={(e) => set({ body: e.target.value })}
                  placeholder={"Write here. Formatting:\n\n## Heading\n**bold**  *italic*\n- bullet point\n1. numbered point\n[link text](https://example.com)\n> quote"}
                />
                <p className="mt-2 text-xs text-bx-slate">
                  Formatting: <code>## Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>- list</code>, <code>[link](https://…)</code>,{" "}
                  <code>&gt; quote</code>. Leave an empty line between paragraphs.
                </p>
              </>
            ) : (
              <div className="post-body min-h-[460px]" dangerouslySetInnerHTML={{ __html: preview || "<p><em>Nothing written yet.</em></p>" }} />
            )}
          </Panel>
        </div>

        <div className="space-y-6">
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

          <Panel title="Search & sharing (optional)">
            <div className="space-y-4">
              <Field label="SEO title" hint="Defaults to the article title.">
                <input className={inputClass} value={d.seo_title ?? ""} onChange={(e) => set({ seo_title: e.target.value })} />
              </Field>
              <Field label="SEO description" hint="Defaults to the summary. ~150 characters.">
                <textarea className={cn(inputClass, "min-h-20")} value={d.seo_description ?? ""} onChange={(e) => set({ seo_description: e.target.value })} />
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
