-- Adds the SEO focus keyphrase to blog posts.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run again.
alter table public.posts add column if not exists focus_keyword text;
notify pgrst, 'reload schema';
