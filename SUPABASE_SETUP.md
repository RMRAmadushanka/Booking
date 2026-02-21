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
5. This creates the `packages` table and inserts 15 Sri Lanka tour packages with image URLs. The app will then load packages from Supabase on the **Packages** page and **Home** section.

6. **Gallery and location images:** To have the package detail page use gallery images and route location images from the database, run **`supabase/packages-table-add-gallery-destinations.sql`** in the SQL Editor (after the table exists). This adds and fills `gallery_urls` and `destination_details` for all 15 packages. If you skip this, the detail page will use the main package image for the gallery and static data for location accordion images.

---

## Step 3c: Create the `vehicles` Table (15 vehicle rentals)

1. In the left sidebar, open **"SQL Editor"**.
2. Click **"New query"**.
3. Open the file **`supabase/vehicles-table.sql`** in this project and copy its full contents.
4. Paste into the SQL Editor and click **"Run"**.
5. This creates the `vehicles` table and inserts 15 vehicles (SUVs, sedans, vans, etc.) with image URLs. The **Vehicle Rentals** page will load vehicles from Supabase.

6. **Vehicle detail gallery:** To have the vehicle detail page use gallery images from the database, run **`supabase/vehicles-table-add-gallery.sql`** in the SQL Editor (after the table exists). This adds and fills `gallery_urls` for all 15 vehicles. If you skip this, the detail page will use only the main vehicle image for the gallery.

---

## Step 3d: Create the `vehicle_rentals` Table (rental requests)

When a user clicks **Rent Now** on a vehicle and submits the rental form on the vehicle detail page, the app saves the request to this table.

1. In the left sidebar, open **"SQL Editor"**.
2. Click **"New query"**.
3. Open the file **`supabase/vehicle-rentals-table.sql`** in this project and copy its full contents.
4. Paste into the SQL Editor and click **"Run"**.
5. This creates the `vehicle_rentals` table. If you skip this step, the rental form will return a server error until the table exists.

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

## Step 4a: Create Storage Bucket for Travel Package Images

Use this bucket to store images for your tour packages (e.g. hero images, gallery images). You can upload via the Supabase dashboard or from your app and then use the public URL in the `packages` table.

### Via Dashboard

1. In the left sidebar, open **"Storage"**.
2. Click **"New bucket"**.
3. Set:
   - **Name**: `package-images`
   - **Public bucket**: **On** (so package images can be shown on the site without signed URLs).
4. Click **"Create bucket"**.
5. (Optional) Click the bucket → **Policies** → **"New policy"** to allow uploads. Or use the SQL below.

### Via SQL Editor (policies)

Run in **SQL Editor** to allow **public read** and **uploads** for the `package-images` bucket:

```sql
-- Public read: anyone can view package images (needed for img/next-image on your site)
create policy "Public read for package-images"
  on storage.objects for select
  using (bucket_id = 'package-images');

-- Allow uploads (e.g. from your app or dashboard; restrict with auth later if needed)
create policy "Allow upload to package-images"
  on storage.objects for insert
  with check (bucket_id = 'package-images');
```

### Getting the image URL after upload

- **Dashboard**: Upload a file to `package-images` (e.g. into a folder like `packages/1.jpg`). The public URL will be:
  `https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/package-images/packages/1.jpg`
- **In app**: Use the Supabase client to upload and then use `data.path` or the public URL in your `packages.image_url` (or gallery) column.

---

### How to use these images in your packages

Your app shows each package’s image from the **`packages.image_url`** column in Supabase. To use images from the `package-images` bucket:

**1. Upload the image to the bucket**

- Go to **Storage** → **package-images**.
- Click **Upload file** (or create a folder like `packages` first).
- Upload your image (e.g. `cultural-triangle.jpg` or `1.jpg`).

**2. Copy the public URL**

- Click the uploaded file in the bucket.
- Supabase shows the **Public URL**, e.g.  
  `https://abcdefgh.supabase.co/storage/v1/object/public/package-images/packages/1.jpg`  
- Copy that full URL.

**3. Put that URL in the `packages` table**

- **Option A – Table Editor:** Go to **Table Editor** → **packages** → open the row for the package you want → paste the URL into the **image_url** column → Save.
- **Option B – SQL Editor:** Run (replace the URL and package `id` as needed):

```sql
update public.packages
set image_url = 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/package-images/packages/1.jpg'
where id = '1';
```

**4. Allow Next.js to load images from your Supabase project**

- In your project, open **`next.config.ts`**.
- Add your Supabase storage host to `images.remotePatterns` (use your real project ref from the Supabase dashboard):

```ts
// In next.config.ts, add to the remotePatterns array:
{
  protocol: "https",
  hostname: "YOUR_PROJECT_REF.supabase.co",
  pathname: "/storage/v1/object/public/**",
},
```

- Replace `YOUR_PROJECT_REF` with the subdomain from your Supabase Project URL (e.g. `abcdefghijkl` if the URL is `https://abcdefghijkl.supabase.co`).

After that, the packages list and package detail pages will show the images from your `package-images` bucket. You can repeat steps 1–3 for each package (and for extra gallery images if you add a gallery column later).

---

### Optional: Storage bucket for vehicle images

If you want to host vehicle photos in Supabase instead of external URLs:

1. Create a bucket named **`vehicle-images`** (Storage → New bucket, **Public bucket: On**).
2. Add policies for **select** (read) and **insert** (upload), same pattern as `package-images`.
3. Upload images, copy the public URL (e.g. `https://YOUR_REF.supabase.co/storage/v1/object/public/vehicle-images/v1.jpg`), and set **`vehicles.image_url`** in the Table Editor or via SQL. The app already allows Supabase storage in **`next.config.ts`** (same host as packages).

---

## Step 4b: Email (Resend) – booking confirmation & admin notification

When a user clicks **"Submit to agent"** on a package detail page, the app saves the booking to the database and can send:

- **Admin**: a notification email to you (optional).
- **User**: a confirmation email to the traveler’s address (see restriction below).

This uses **Resend** (free tier: 3,000 emails/month).

1. Sign up at **https://resend.com** and verify your email.
2. In the dashboard, go to **API Keys** and create a key. Copy it.
3. Add to **`.env.local`** (and Vercel env vars if you deploy):
   - `RESEND_API_KEY=re_xxxxxxxxxxxx` (required for sending).
   - `ADMIN_EMAIL=your@email.com` (optional; where new booking notifications go).

**Why does the admin get the email but the customer (traveler) does not?**

On Resend’s free tier, when you send from the default `onboarding@resend.dev`, **only verified recipients receive emails**. Your admin address is usually the same as your Resend account email (verified), so that works. The address the traveler types in the form is not verified, so Resend does not deliver to it.

**To send confirmation emails to travelers (any email):**

1. **Verify your own domain** in Resend: Dashboard → **Domains** → **Add domain** (e.g. `yourdomain.com` or a subdomain like `mail.yourdomain.com`). Add the SPF and DKIM DNS records Resend shows you at your DNS provider; wait until the domain status is **Verified**.
2. In **`.env.local`** set a “from” address at that domain, for example:
   ```env
   RESEND_FROM_EMAIL=Hero Search <noreply@yourdomain.com>
   ```
   Use the same domain (or subdomain) you verified in Resend.
3. Restart your dev server. After that, both the admin and the traveler will receive their emails.

If you don’t set `RESEND_FROM_EMAIL`, the app keeps using `onboarding@resend.dev` and only verified recipients (e.g. your admin email) get emails.

If `RESEND_API_KEY` is not set, bookings are still saved to the database; only the emails are skipped.

**Emails not sending when you book?**

1. **Check `.env.local`** – It must contain `RESEND_API_KEY=re_xxxx...` (no quotes, no spaces around `=`). Get the key from Resend → API Keys.
2. **Restart the dev server** – After adding or changing `.env.local`, stop `npm run dev` and start it again so Next.js picks up the new env.
3. **Check the terminal** – When you submit a booking, the server logs either:
   - `[sendBookingEmails] Skipped: RESEND_API_KEY is not set...` → add the key and restart, or
   - `[sendBookingEmails] User email error from Resend: ...` → the message tells you what Resend rejected (e.g. invalid API key, domain not verified).
4. **Resend dashboard** – In https://resend.com/emails you can see sent/failed emails and error details.

**Admin gets the email but the customer (traveler) does not?**

Resend’s free tier only delivers to **verified recipients** when you send from `onboarding@resend.dev`. Your admin email is usually your Resend account email (verified). To send to any customer email: verify your domain in Resend (see “To send confirmation emails to travelers” above) and set `RESEND_FROM_EMAIL=Hero Search <noreply@yourdomain.com>` in `.env.local`.

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

# Optional: booking emails (see Step 4b)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@yourdomain.com
```

Replace `YOUR_PROJECT_REF` and the keys with the values from Step 5.

---

## Step 7: Add Environment Variables on Vercel

1. Open your project on **https://vercel.com**.
2. Go to **Project → Settings → Environment Variables**.
3. Add the same variables (Supabase + optional Resend):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (Optional) `RESEND_API_KEY`, `ADMIN_EMAIL` for booking emails
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
- [ ] `packages` table created (run `supabase/packages-table.sql`)
- [ ] `vehicles` table created (run `supabase/vehicles-table.sql`)
- [ ] `vehicle_rentals` table created (run `supabase/vehicle-rentals-table.sql`) for rental form
- [ ] `booking-images` bucket created in Storage
- [ ] (Optional) `package-images` and `vehicle-images` buckets for images
- [ ] Storage policies allow upload + read (if using public/signed URLs)
- [ ] API URL and anon + service_role keys copied
- [ ] `.env.local` updated locally
- [ ] Vercel env vars set and project redeployed
- [ ] `@supabase/supabase-js` installed
- [ ] (Optional) Resend API key and `ADMIN_EMAIL` for booking confirmation + admin emails

After this, you can wire your app to use Supabase for saving bookings and image URLs (and upload files to Storage from the app). When a user submits a package booking, the data is saved to the `bookings` table and, if `RESEND_API_KEY` is set, confirmation and admin emails are sent via Resend.
