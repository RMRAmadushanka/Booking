# Deploy to Vercel

Follow these steps to deploy your Next.js app (Drimooria Travels) to Vercel.

---

## 1. Push your code to Git

If you haven’t already, push your project to GitHub, GitLab, or Bitbucket:

```bash
git add .
git commit -m "Ready for Vercel deploy"
git push origin main
```

---

## 2. Import the project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account).
2. Click **Add New…** → **Project**.
3. Import your Git repository (e.g. **hero-search-app**).
4. Leave **Framework Preset** as **Next.js** (auto-detected).
5. Leave **Root Directory** empty unless the app is in a subfolder.
6. Click **Deploy** (you can add environment variables before or after the first deploy).

---

## 3. Add environment variables

In the Vercel project: **Settings** → **Environment Variables**. Add these for **Production** (and optionally Preview/Development):

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | e.g. `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key | From Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | **Keep secret**; server-only |
| `RESEND_API_KEY` | Your Resend API key | For booking/rental/custom-trip emails |
| `ADMIN_EMAIL` | Admin email address | Receives new booking/rental/request notifications |
| `RESEND_FROM_EMAIL` | Sender for emails | e.g. `Drimooria Travels <noreply@yourdomain.com>` |
| `EMAIL_LOGO_URL` | Full URL to logo image | Used in email HTML (optional) |
| `SITE_URL` | Your production site URL | e.g. `https://your-app.vercel.app` or `https://drimooria.com` |
| `NEXT_PUBLIC_SITE_URL` | Same as SITE_URL | Used for SEO metadata and JSON-LD |
| `CRON_SECRET` | Secret string for cron auth | Used by `/api/cron/send-review-emails` |

**Important:**

- **SITE_URL** and **NEXT_PUBLIC_SITE_URL**: After the first deploy, set them to your Vercel URL (e.g. `https://hero-search-app.vercel.app`) or your custom domain (e.g. `https://drimooria.com`). No trailing slash.
- **RESEND_FROM_EMAIL**: With a custom domain (e.g. drimooria.com), verify the domain in Resend and use an address like `noreply@drimooria.com`.

After adding or changing variables, trigger a new deploy (**Deployments** → **…** → **Redeploy**).

---

## 4. Cron job (review reminder emails)

The project has a cron in **vercel.json** that calls `/api/cron/send-review-emails` daily at 09:00 UTC. On the **Pro** plan, Vercel Cron Jobs run automatically. On the **Hobby** plan, crons are not available; you can use an external cron service (e.g. cron-job.org) to hit:

```text
https://your-app.vercel.app/api/cron/send-review-emails
```

with header:

```text
Authorization: Bearer <CRON_SECRET>
```

Use the same value you set for `CRON_SECRET` in Vercel.

---

## 5. Custom domain (optional)

1. In Vercel: **Settings** → **Domains**.
2. Add your domain (e.g. `drimooria.com`).
3. Follow Vercel’s DNS instructions (A/CNAME or nameservers).
4. Update **SITE_URL** and **NEXT_PUBLIC_SITE_URL** to `https://drimooria.com` and redeploy.

---

## 6. If you see an npm install error

The project uses **React 19** while one dependency (`react-search-autocomplete`) only supports React 16–18. An **`.npmrc`** file is included with `legacy-peer-deps=true` so `npm install` succeeds on Vercel.

If you still get an error:

- Copy the **full error message** from the Vercel build log (especially the lines after `npm install` or `Running "npm run build"`).
- Ensure **`.npmrc`** is committed: `git add .npmrc && git commit -m "Add .npmrc for Vercel" && git push`.

---

## 7. Check the deploy

- Open the Vercel deployment URL (or your custom domain).
- Test: homepage, **Packages**, **Vehicles**, **Customize Your Trip**, and a package/vehicle detail page.
- Submit a test booking or rental to confirm emails (Resend) and Supabase writes.

If something fails, check **Deployments** → **…** → **View Function Logs** and **Build Logs** in Vercel.
