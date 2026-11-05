import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { insightCategories } from "../data/insights";
import { formatPostDate, usePost } from "../services/posts";
import { renderPostBody } from "../utils/markdown";
import { Icon } from "../utils/icons";

/** /insights/:slug — a blog post published from the admin dashboard. */
export default function InsightPostPage() {
  const { slug } = useParams();
  const post = usePost(slug);
  const html = useMemo(() => (post ? renderPostBody(post.body) : ""), [post]);

  // Article structured data, so search engines can show the date, author and image
  useEffect(() => {
    if (!post) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      image: post.cover_image || undefined,
      datePublished: post.published_at || undefined,
      dateModified: post.updated_at,
      author: { "@type": post.author_name ? "Person" : "Organization", name: post.author_name || "BharatX Group" },
      publisher: { "@type": "Organization", name: "BharatX Group", logo: { "@type": "ImageObject", url: "https://www.bharatxgroup.com/bharatxgroup.png" } },
      mainEntityOfPage: `https://www.bharatxgroup.com/insights/${post.slug}`,
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, [post]);

  usePageMeta({
    title: post ? `${post.seo_title || post.title} | BharatX Group` : "Insights | BharatX Group",
    description: post?.seo_description || post?.excerpt || "Ideas, perspectives and updates from across BharatX Group.",
    path: `/insights/${slug ?? ""}`,
    image: post?.cover_image ?? undefined,
    type: "article",
  });

  const back = (
    <Link
      to="/insights"
      className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-bx-navy-700 hover:text-bx-orange"
    >
      <Icon name="chevron-left" width={14} height={14} /> All insights
    </Link>
  );

  if (post === undefined) {
    return (
      <main className="min-h-screen w-full bg-bx-cream pt-40 text-bx-ink">
        <div className="container-x max-w-3xl! animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-bx-line" />
          <div className="h-10 w-3/4 rounded bg-bx-line" />
          <div className="h-64 rounded-2xl bg-bx-line" />
        </div>
      </main>
    );
  }

  if (post === null) {
    return (
      <main className="min-h-screen w-full bg-bx-cream pt-40 pb-24 text-bx-ink">
        <div className="container-x max-w-3xl!">
          {back}
          <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight">Article not found</h1>
          <p className="mt-3 text-bx-slate">This article may have been moved or unpublished.</p>
        </div>
      </main>
    );
  }

  const accent = insightCategories[post.category]?.accent ?? "#163A7A";

  return (
    <main className="min-h-screen w-full bg-bx-cream pb-24 text-bx-ink">
      <header className="relative w-full overflow-hidden bg-bx-navy-950 pt-32 pb-14 sm:pt-40 sm:pb-20">
        {post.cover_image && (
          <>
            <img src={post.cover_image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />
          </>
        )}
        <div className="container-x relative z-10 max-w-3xl!">
          <div className="[&_a]:text-white/85 [&_a:hover]:text-bx-orange-light">{back}</div>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-sans text-xs text-white/80">
            <span
              className="rounded-full px-3 py-1 font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: `${accent}cc` }}
            >
              {post.category}
            </span>
            {post.published_at && <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>}
            {post.author_name && <span>· {post.author_name}</span>}
          </div>
          <h1 className="mt-4 font-heading text-3xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-white text-balance">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85">{post.excerpt}</p>}
        </div>
      </header>

      <article className="container-x max-w-3xl! pt-10 sm:pt-14">
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-14 border-t border-bx-line pt-6">{back}</div>
      </article>
    </main>
  );
}
