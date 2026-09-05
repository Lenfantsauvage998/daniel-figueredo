# 🚀 Daniel Figueredo — Deployment Guide

## Tech Stack
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** Custom JWT (bcrypt + jose)
- **Deployment:** Vercel (free tier)

---

## Step 1: Push Code to GitHub

1. Go to [github.com/new](https://github.com/new)
2. Name your repo (e.g., `daniel-figueredo-portfolio`)
3. **Keep it PUBLIC** (Vercel needs this for free tier)
4. Do NOT initialize with README
5. Click **Create repository**
6. Copy these commands from GitHub (or use these):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Create Supabase Database

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **New Project**
3. Choose an organization → give it any name
4. Set a secure database password (save this!)
5. Wait ~2 minutes for provisioning
6. Once ready, go to **Project Settings > Database**
7. Scroll to **Connection String > URI**
8. Copy the connection string (it looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

This long string is your **`DATABASE_URL`**.

9. Also get the **Direct URL** (non-pooled). Find it at:
   **Project Settings > Database > Connection info > Direct URL**
   Or construct it as:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.supabase.com:5432/postgres
   ```
   (Note: port is **5432** instead of **6543**)

10. Your `.env` file will need:
    ```env
    DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
    DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.supabase.com:5432/postgres"
    NEXTAUTH_SECRET="generate-a-random-32-char-string-here"
    NEXTAUTH_URL="https://your-vercel-url.vercel.app"
    ```

---

## Step 3: Push Database Migration to Supabase

After getting your `DIRECT_URL`, run this **locally** to create tables:

```bash
# Update your .env with the real DIRECT_URL, then:
npx prisma migrate deploy
# or if you want to create a new migration:
npx prisma migrate dev --name production_init
```

Then seed the admin user:
```bash
DATABASE_URL="your-direct-url" npx tsx prisma/seed.ts
```

---

## Step 4: Connect GitHub to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign up / Log in with GitHub
3. Import your repo
4. **Framework Preset:** Next.js
5. Add Environment Variables (click "Environment Variables"):

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your pooled connection string (port 6543) |
| `DIRECT_URL` | Your direct connection string (port 5432) |
| `NEXTAUTH_SECRET` | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXTAUTH_URL` | `https://your-project-name.vercel.app` (update after first deploy) |

6. Click **Deploy**

---

## Step 5: Update NEXTAUTH_URL

After first deploy, Vercel gives you a URL like `https://daniel-figueredo-xyz123.vercel.app`.
1. Go to **Vercel Dashboard > Your Project > Settings > Environment Variables**
2. Update `NEXTAUTH_URL` to your real domain
3. Click **Save** → **Redeploy**

---

## Admin Credentials (after seeding)

- **Email:** `admin@danielfigueredo.com`
- **Password:** `admin123`

**Change this immediately** by creating a new admin user through registration.

---

## Optional: Custom Domain

In Vercel:
1. **Project Settings > Domains**
2. Add your custom domain (e.g., `danielfigueredo.com`)
3. Follow DNS instructions
4. Update `NEXTAUTH_URL` to match

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (uses SQLite locally)
npm run dev

# View at http://localhost:3000
```

### Generate a secure NEXTAUTH_SECRET locally:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
