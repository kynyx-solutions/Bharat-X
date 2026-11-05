-- ============================================================
-- BHARATX ADMIN: database schema, security rules and storage.
-- Run ONCE in Supabase: Dashboard -> SQL Editor -> New query ->
-- paste this whole file -> Run. Safe to run again.
--
-- BEFORE RUNNING: replace OWNER_EMAIL_HERE (at the bottom)
-- with the email address the owner will log in with.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- helpers ----------
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- ---------- staff & roles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'staff' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.staff_invites (
  email text primary key,
  role text not null default 'staff' check (role in ('owner', 'staff')),
  invited_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid());
$$;

create or replace function public.is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'owner');
$$;

-- Only invited emails get dashboard access when they sign up.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare inv record;
begin
  select * into inv from staff_invites where lower(email) = lower(new.email);
  if found then
    insert into profiles (id, email, role, full_name)
    values (new.id, new.email, inv.role, coalesce(new.raw_user_meta_data->>'full_name', ''))
    on conflict (id) do nothing;
    delete from staff_invites where lower(email) = lower(new.email);
  end if;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- blog (shown on /insights) ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null default '',
  body text not null default '',                -- HTML from the visual editor (older posts: Markdown)
  cover_image text,
  category text not null default 'Perspectives' check (category in ('Perspectives', 'Stories', 'Partnerships')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  author_name text,
  focus_keyword text,                          -- SEO focus keyphrase (dashboard only)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.posts add column if not exists focus_keyword text;  -- for projects set up before it existed
drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();

-- ---------- site content (homepage hero, core verticals, stats) ----------
create table if not exists public.settings (
  key text primary key check (key in ('home')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);
drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings for each row execute function public.touch_updated_at();

-- ---------- contact enquiries ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 200),
  email text not null check (char_length(email) <= 320),
  phone text check (char_length(phone) <= 40),
  organization text check (char_length(organization) <= 200),
  website text check (char_length(website) <= 300),
  interest text check (char_length(interest) <= 200),
  message text not null check (char_length(message) <= 5000),
  source_page text check (char_length(source_page) <= 300),
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed', 'spam')),
  notes text,
  assigned_to uuid references public.profiles(id) on delete set null
);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
drop trigger if exists leads_touch on public.leads;
create trigger leads_touch before update on public.leads for each row execute function public.touch_updated_at();

-- ============================================================
-- SECURITY (Row Level Security)
-- Visitors: read published posts and site content; submit enquiries.
-- Everything else needs an admin login.
-- ============================================================
alter table public.profiles      enable row level security;
alter table public.staff_invites enable row level security;
alter table public.posts         enable row level security;
alter table public.settings      enable row level security;
alter table public.leads         enable row level security;

-- profiles
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select using (public.is_admin());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (id = auth.uid() or public.is_owner()) with check (id = auth.uid() or public.is_owner());
drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles for delete using (public.is_owner() and id <> auth.uid());

-- Staff can edit their own name but not promote themselves.
create or replace function public.guard_profile_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and not public.is_owner() then
    raise exception 'Only an owner can change roles';
  end if;
  return new;
end $$;
drop trigger if exists profiles_role_guard on public.profiles;
create trigger profiles_role_guard before update on public.profiles for each row execute function public.guard_profile_role();

-- staff invites (owner only)
drop policy if exists invites_owner on public.staff_invites;
create policy invites_owner on public.staff_invites for all using (public.is_owner()) with check (public.is_owner());

-- posts
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts for select using (status = 'published' or public.is_admin());
drop policy if exists posts_admin_write on public.posts;
create policy posts_admin_write on public.posts for all using (public.is_admin()) with check (public.is_admin());

-- settings: public read, any admin can change
drop policy if exists settings_read on public.settings;
create policy settings_read on public.settings for select using (true);
drop policy if exists settings_admin_write on public.settings;
create policy settings_admin_write on public.settings for all using (public.is_admin()) with check (public.is_admin());

-- leads: anyone can submit a NEW enquiry; only admins can read or change them.
drop policy if exists leads_public_insert on public.leads;
create policy leads_public_insert on public.leads for insert to anon, authenticated
  with check (status = 'new' and notes is null and assigned_to is null);
drop policy if exists leads_admin_read on public.leads;
create policy leads_admin_read on public.leads for select using (public.is_admin());
drop policy if exists leads_admin_update on public.leads;
create policy leads_admin_update on public.leads for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists leads_admin_delete on public.leads;
create policy leads_admin_delete on public.leads for delete using (public.is_admin());

-- ============================================================
-- STORAGE: "media" bucket for hero, vertical and blog images.
-- Public to read; only admins upload or delete.
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])
on conflict (id) do nothing;

drop policy if exists media_public_read on storage.objects;
create policy media_public_read on storage.objects for select using (bucket_id = 'media');
drop policy if exists media_admin_insert on storage.objects;
create policy media_admin_insert on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists media_admin_update on storage.objects;
create policy media_admin_update on storage.objects for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists media_admin_delete on storage.objects;
create policy media_admin_delete on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- ============================================================
-- FIRST OWNER: replace with the owner's login email, then they sign up
-- at <your site>/admin/signup with that email to get full access.
-- ============================================================
insert into public.staff_invites (email, role) values ('OWNER_EMAIL_HERE', 'owner')
on conflict (email) do update set role = 'owner';
