# BharatX Admin: Supabase setup guide

This turns on the admin dashboard at **`/admin`**. From there, logged-in owners and staff can:

- read and follow up **enquiries** from the Contact page
- write and publish **blog articles** (they appear on **Insights**, each with its own page)
- change the **homepage**: hero slide photos and headlines, Core Verticals photos, and the stats strip
- manage **staff** (owners only)

It takes about 15 minutes, once. The website keeps working throughout: until step 4 is done, it runs from its built-in content and `/admin` shows a "Connect Supabase" message.

---

## 1. Create the Supabase project

1. Go to **https://supabase.com** and sign up (free). Use a business email you will keep.
2. **New project**:
   - **Name:** `bharatx`
   - **Database password:** generate a strong one and save it in a password manager
   - **Region:** **South Asia (Mumbai)**
   - **Plan:** Free (you can upgrade later)
3. Wait about 2 minutes for it to be ready.

> **Free plan note:** a free project **pauses after 7 days with no activity**. Website visits that load the homepage count as activity, so a live site normally stays awake. If it does pause, open the Supabase dashboard and click **Restore**. While paused, the site shows its built-in content, and the Contact form still emails the team through the Render backend, but enquiries aren't saved to the dashboard. The Pro plan (about $25/month) never pauses.

## 2. Create the tables and security rules

1. Open **`supabase/schema.sql`**.
2. At the very bottom, replace **`OWNER_EMAIL_HERE`** with the email the owner will log in with.
3. In Supabase: **SQL Editor → New query**, paste the whole file, click **Run**. It should say "Success. No rows returned."

## 3. Login emails

**Authentication → URL Configuration**:

| Setting | Value |
|---|---|
| Site URL | `https://www.bharatxgroup.com/admin` |
| Redirect URLs | `https://www.bharatxgroup.com/admin/**`, `https://bharatxgroup.com/admin/**`, and `http://localhost:5173/admin/**` for local testing |

**Authentication → Providers → Email**: keep **Email** enabled and **Confirm email** on.

> Supabase's built-in email sender is limited to a few emails an hour and is meant for testing. For a live site, send login emails from your own domain: **Authentication → Emails → SMTP settings** (e.g. Resend, free up to 3,000 emails a month; Resend's SMTP page lists the host, port and login to enter, with your Resend API key as the secret; sender `noreply@bharatxgroup.com`).

## 4. Connect the website

1. **Project Settings → API**: copy the **Project URL** and the **`anon` `public`** key. **Never** use the `service_role` key on the website.
2. In **Vercel → the frontend project → Settings → Environment Variables**, add (for Production, Preview and Development):

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | the Project URL, e.g. `https://xxxxxxxx.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | the anon public key |

   If you connected Supabase through **Vercel's Supabase integration** instead, you don't need to add these: the site also reads the integration's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Only these public values reach the browser. The integration's `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY` and `SUPABASE_JWT_SECRET` never do.

3. **Redeploy** (Deployments → ⋯ → Redeploy). Vite reads these at build time, so a redeploy is required.
4. For local development, put the same two lines in `frontend/.env.local`.

## 5. Create the owner login

1. Open **`https://www.bharatxgroup.com/admin/signup`**.
2. Sign up with the **owner email from step 2** and a strong password.
3. Click the confirmation link in your email, then log in at `/admin`.
4. To add staff: **Staff → Invite someone**, then send them the sign-up link shown there. They must sign up with the invited email.

A login whose email wasn't invited sees "No access yet"; the database rules block all data for it.

## 6. Check everything works

- [ ] Submit the **Contact** form on the website. It appears under **Admin → Enquiries** within seconds.
- [ ] **Homepage**: change a Core Verticals photo, save, and reload the homepage.
- [ ] **Homepage**: edit a stat, save, and check the stats strip.
- [ ] **Blog**: publish an article. It appears on **Insights**, and its page opens at `/insights/<web-address>`.

---

### What's stored where

| Data | Where | Who can see it |
|---|---|---|
| Published articles, homepage content | tables `posts`, `settings` | Everyone (read-only) |
| Draft articles | `posts` | Logged-in team only |
| Enquiries | `leads` | Logged-in team only. Visitors can only submit. |
| Uploaded photos | storage bucket `media` (public) | Everyone sees them; only the team uploads |
| Team and roles | `profiles`, `staff_invites` | Team sees the team; only owners manage it |

### Updates after setup

If your project was set up before an update below, run its file once in **SQL Editor** (each is safe to run again):

| File | Adds |
|---|---|
| `supabase/migrations/002_focus_keyword.sql` | The SEO **focus keyphrase** for blog articles. Until it's run, articles still save, just without the keyphrase. |

### Good to know

- **Photos are compressed in the browser** before upload (WebP; hero up to 2400 px, others up to 1920 px), so large camera files are fine.
- **Hero slide 1** is preloaded by `frontend/index.html` for page speed. If you change slide 1's photo in the dashboard, update that preload URL too, or the old photo is downloaded for nothing.
- **Enquiries go to two places**: the dashboard (Supabase) and the Render backend, which stores them in MongoDB and emails the team. If one is down, the form still works through the other.
- **Privacy:** enquiries hold personal data (names, emails, phone numbers). Delete ones you no longer need, and remove staff access when someone leaves.
