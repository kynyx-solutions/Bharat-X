import { useEffect, useState } from "react";
import type { Insight, InsightCategory } from "../data/insights";
import { restGet } from "./supabase";

/** A blog post written in the admin dashboard (Supabase table `posts`). Body is HTML (visual editor) or Markdown (older posts). */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  category: InsightCategory;
  status: "draft" | "published";
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string | null;
  /** SEO focus keyphrase (dashboard only). Missing on databases set up before it was added. */
  focus_keyword?: string | null;
  updated_at: string;
}

export const formatPostDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : undefined;

export function postToInsight(p: Pick<Post, "id" | "slug" | "title" | "excerpt" | "cover_image" | "category" | "published_at">): Insight {
  return {
    id: `post-${p.id}`,
    category: p.category,
    title: p.title,
    summary: p.excerpt,
    date: formatPostDate(p.published_at),
    image: p.cover_image ?? undefined,
    href: `/insights/${p.slug}`,
  };
}

const LIST_FIELDS = "id,slug,title,excerpt,cover_image,category,published_at";

/** Published posts as Insights cards, newest first. Empty when Supabase isn't set up. */
export function usePublishedPosts(): Insight[] {
  const [items, setItems] = useState<Insight[]>([]);
  useEffect(() => {
    const ctrl = new AbortController();
    void restGet<Post[]>(`posts?select=${LIST_FIELDS}&status=eq.published&order=published_at.desc`, ctrl.signal).then((rows) => {
      if (rows) setItems(rows.map(postToInsight));
    });
    return () => ctrl.abort();
  }, []);
  return items;
}

/** One published post by slug: undefined while loading, null when not found. */
export function usePost(slug: string | undefined): Post | null | undefined {
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  useEffect(() => {
    if (!slug) return setPost(null);
    setPost(undefined);
    const ctrl = new AbortController();
    void restGet<Post[]>(`posts?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`, ctrl.signal).then((rows) => {
      if (!ctrl.signal.aborted) setPost(rows?.[0] ?? null);
    });
    return () => ctrl.abort();
  }, [slug]);
  return post;
}
