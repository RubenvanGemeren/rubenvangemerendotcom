# Cloudflare Pages Deployment

This Next.js application uses API routes and Server-Side Rendering (SSR), which requires special configuration for Cloudflare Pages.

## Option 1: Use Cloudflare Next.js Adapter (Recommended)

1. Install the adapter:
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```

2. Update `package.json` build script:
   ```json
   "build": "next build && npx @cloudflare/next-on-pages"
   ```

3. Configure Cloudflare Pages:
   - Build command: `npm run build`
   - Build output directory: `.vercel/output/static` (or check adapter docs for latest)

## Option 2: Configure Cloudflare Pages Manually

If you prefer not to use the adapter:

1. In Cloudflare Pages dashboard:
   - Build command: `npm run build`
   - Build output directory: `.next` (not `out`)
   - Framework preset: Next.js

2. Note: API routes may not work without the adapter. Consider using Cloudflare Workers for API routes instead.

## Environment Variables

Make sure to add these in Cloudflare Pages dashboard:
- `MONGODB_CONNECTION_STRING` (or `DB_ADMIN_USERNAME`, `DB_ADMIN_PASSWORD`, `MONGODB_CLUSTER`)
- `MONGODB_DATABASE`
- `GITHUB_USERNAME`
- `GITHUB_TOKEN`
- `GITHUB_PRIVATE_OWNER` (optional)
- `GITHUB_PRIVATE_REPO` (optional)
- `SYNC_CODE`

