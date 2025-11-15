# Cloudflare Pages Deployment

✅ **Already Configured!** This project is set up for Cloudflare Pages with automatic Git deployments.

## Current Configuration

- ✅ Next.js 15.5.2 (compatible with Cloudflare adapter)
- ✅ `@cloudflare/next-on-pages` adapter installed
- ✅ Build script: `"build": "next build && npx @cloudflare/next-on-pages"`
- ✅ Dynamic pages and API routes supported

## Quick Setup in Cloudflare Dashboard

1. **Connect Git Repository:**
   - Go to Cloudflare Dashboard → Pages → Create project
   - Connect your Git repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `.vercel/output/static`
   - Framework preset: Next.js (optional)

3. **Environment Variables** (add in Settings → Environment variables):
   - `MONGODB_CONNECTION_STRING` (or `DB_ADMIN_USERNAME`, `DB_ADMIN_PASSWORD`, `MONGODB_CLUSTER`)
   - `MONGODB_DATABASE`
   - `GITHUB_USERNAME`
   - `GITHUB_TOKEN`
   - `SYNC_CODE`

4. **Enable Node.js Compatibility:**
   - Settings → Functions → Compatibility flags
   - Add: `nodejs_compat`

5. **Deploy!** Cloudflare will auto-deploy on every Git push.

See `CLOUDFLARE_PAGES_SETUP.md` for detailed step-by-step instructions.

## Environment Variables

Make sure to add these in Cloudflare Pages dashboard:
- `MONGODB_CONNECTION_STRING` (or `DB_ADMIN_USERNAME`, `DB_ADMIN_PASSWORD`, `MONGODB_CLUSTER`)
- `MONGODB_DATABASE`
- `GITHUB_USERNAME`
- `GITHUB_TOKEN`
- `GITHUB_PRIVATE_OWNER` (optional)
- `GITHUB_PRIVATE_REPO` (optional)
- `SYNC_CODE`

