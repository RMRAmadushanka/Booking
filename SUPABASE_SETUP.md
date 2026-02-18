# Supabase Account & Project Setup Guide

Follow these steps to create a Supabase account and configure it for the hero-search-app (bookings + images).

---

## Step 1: Create a Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** (top right).
3. Sign up using:
   - **GitHub** (recommended – one click), or
   - **Email** (you’ll get a verification link), or
   - **Google**
4. Complete sign-up and log in to the **Supabase Dashboard**.

---

## Step 2: Create a New Project

1. In the dashboard, click **"New Project"**.
2. Choose your **Organization** (the default one is fine).
3. Fill in:
   - **Name**: e.g. `hero-search-app` or `travel-bookings`
   - **Database Password**: create a **strong password** and **save it somewhere safe** (you need it for direct DB access; the app uses API keys).
   - **Region**: pick the closest to your users (e.g. `East US (N. Virginia)` or `Southeast Asia (Singapore)`).
4. Click **"Create new project"**.
5. Wait 1–2 minutes until the project status is **Active** (green).

---

## Step 2b: Get Your API Keys (URL + anon + service_role)

Use these steps whenever you need to copy your project URL and keys into `.env.local` or Vercel.

1. In the **left sidebar**, click the **gear icon** at the bottom → **"Project Settings"**.
2. In the left menu of Project Settings, click **"API"**.
3. On the API page you’ll see:
   - **Project URL**  
     Copy this → use as `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`.
   - **Project API keys**  
     - **anon public** – copy this → use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.  
     - **service_role** – click **"Reveal"** (or the eye icon), then copy → use as `SUPABASE_SERVICE_ROLE_KEY`.

4. Paste them into your **`.env.local`** file (project root), one per line:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Important:** Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` in the browser. Use the service_role key only in server code (e.g. API routes).

---

## Step 3: Create the `bookings` Table

1. In the left sidebar, open **"Table Editor"**.
2. Click **"New table"**.
3. Configure:
   - **Name**: `bookings`
   - **Schema**: `public`
   - Enable **"Use UUID for primary key"** (or leave default).
4. Add these columns (click **"+ Add column"** for each):

   | Column name         | Type    | Default / nullable | Notes                          |
   |---------------------|---------|--------------------|--------------------------------|
   | `id`                | `uuid`  | default: `gen_random_uuid()` | Primary key (often auto) |
   | `package_id`        | `text`  | not null           |                                |
   | `package_title`     | `text`  | not null           |                                |
   | `traveler_name`     | `text`  | not null           |                                |
   | `email`             | `text`  | not null           |                                |
   | `adult_count`       | `int4`  | not null           |                                |
   | `children_count`    | `int4`  | not null           |                                |
   | `guest_count`       | `int4`  | not null           |                                |
   | `pricing`           | `jsonb` | nullable           | Store pricing object           |
   | `start_date`        | `date`  | not null           |                                |
   | `end_date`          | `date`  | not null           |                                |
   | `pickup_location`   | `text`  | not null           |                                |
   | `notes`             | `text`  | nullable           |                                |
   | `image_urls`        | `text[]`| nullable           | Array of image URLs (optional) |
   | `created_at`        | `timestamptz` | default: `now()` |                |

5. Click **"Save"**.

**Optional – via SQL (faster):**

1. Go to **SQL Editor** in the left sidebar.
2. Click **"New query"**.
3. Paste and run:

```sql
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  package_id text not null,
  package_title text not null,
  traveler_name text not null,
  email text not null,
  adult_count int4 not null,
  children_count int4 not null,
  guest_count int4 not null,
  pricing jsonb,
  start_date date not null,
  end_date date not null,
  pickup_location text not null,
  notes text,
  image_urls text[],
  created_at timestamptz default now()
);

-- Allow anonymous/authenticated insert (adjust RLS as needed)
alter table public.bookings enable row level security;

create policy "Allow insert for all"
  on public.bookings for insert
  with check (true);

create policy "Allow read for all"
  on public.bookings for select
  using (true);
```

---

## Step 3b: Create the `packages` Table (15 tour packages)

1. In the left sidebar, open **"SQL Editor"**.
2. Click **"New query"**.
3. Open the file **`supabase/packages-table.sql`** in this project and copy its full contents.
4. Paste into the SQL Editor and click **"Run"**.
5. This creates the `packages` table and inserts 15 Sri Lanka tour packages with image URLs. The app will then load packages from Supabase on the **Packages** page and **Home** section; if the table is empty, it falls back to local mock data.

---

## Step 4: Create a Storage Bucket for Images

1. In the left sidebar, open **"Storage"**.
2. Click **"New bucket"**.
3. Set:
   - **Name**: `booking-images`
   - **Public bucket**: **On** (so you can use public URLs for images), or **Off** if you prefer signed URLs only.
4. Click **"Create bucket"**.
5. Open the bucket and add a policy so uploads are allowed:
   - Go to **Policies** (or **"New policy"**).
   - Create a policy that allows **INSERT** (upload) and **SELECT** (read) for the bucket, e.g. “Allow uploads for all” / “Allow read for all” (you can restrict later with auth).

**Optional – policy via SQL (Storage policies are in `storage.objects`):**

In **SQL Editor**:

```sql
-- Allow public read
create policy "Public read for booking-images"
  on storage.objects for select
  using (bucket_id = 'booking-images');

-- Allow insert (upload) for everyone (restrict later if you add auth)
create policy "Allow upload to booking-images"
  on storage.objects for insert
  with check (bucket_id = 'booking-images');
```

---

## Step 5: Get Your API Keys and Project URL

1. In the left sidebar, click **"Project Settings"** (gear icon at bottom).
2. Open **"API"** in the left menu.
3. Note:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`) → use as `NEXT_PUBLIC_SUPABASE_URL`.
   - **anon public** key → use as `NEXT_PUBLIC_SUPABASE_ANON_KEY` (safe for browser).
   - **service_role** key → use as `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose in frontend).

---

## Step 6: Add Environment Variables Locally

1. In your project root, create or edit **`.env.local`** (this file is usually in `.gitignore`).
2. Add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace `YOUR_PROJECT_REF` and the keys with the values from Step 5.

---

## Step 7: Add Environment Variables on Vercel

1. Open your project on **https://vercel.com**.
2. Go to **Project → Settings → Environment Variables**.
3. Add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Choose **Production** (and optionally Preview/Development).
5. Save and **redeploy** the project so the new variables are applied.

---

## Step 8: Install Supabase Client in the Project

From your project root:

```bash
npm install @supabase/supabase-js
```

Use `--legacy-peer-deps` if you hit peer dependency errors:

```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

---

## Quick Checklist

- [ ] Supabase account created
- [ ] New project created and active
- [ ] `bookings` table created (Table Editor or SQL)
- [ ] `booking-images` bucket created in Storage
- [ ] Storage policies allow upload + read (if using public/signed URLs)
- [ ] API URL and anon + service_role keys copied
- [ ] `.env.local` updated locally
- [ ] Vercel env vars set and project redeployed
- [ ] `@supabase/supabase-js` installed

After this, you can wire your app to use Supabase for saving bookings and image URLs (and upload files to Storage from the app). If you want, the next step is to replace the current JSON-based API with Supabase in this repo.
