# Cloudflare Pages Deployment Guide

## Current Situation

Your Next.js 16 app uses API routes (`/api/github/stats`, `/api/github/sync`), but Cloudflare Pages doesn't support Next.js API routes without the `@cloudflare/next-on-pages` adapter, which **doesn't support Next.js 16 yet** (only up to 15.x).

## The Problem

- ✅ Static pages work (/, /about, /projects, etc.)
- ❌ API routes don't work (`/api/github/*`)
- ❌ GitHub page can't fetch data without API routes

## Solutions

### Option 1: Use Vercel (Recommended - Easiest)

Vercel supports Next.js 16 natively with full API route support:

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Next.js and configures everything
4. Add environment variables in Vercel dashboard
5. Deploy!

**Pros:** Zero configuration, full Next.js 16 support, API routes work out of the box
**Cons:** Different platform (but free tier is generous)

### Option 2: Deploy API Routes as Cloudflare Workers

Keep static pages on Cloudflare Pages, deploy API routes separately:

1. Create Cloudflare Workers for `/api/github/stats` and `/api/github/sync`
2. Update frontend to call worker URLs instead of `/api/*`
3. Deploy workers separately

**Pros:** Stay on Cloudflare
**Cons:** More complex setup, need to maintain separate deployments

### Option 3: Downgrade to Next.js 15

1. Downgrade Next.js to 15.x: `npm install next@15`
2. Install adapter: `npm install --save-dev @cloudflare/next-on-pages`
3. Update build script: `"build": "next build && npx @cloudflare/next-on-pages"`
4. Configure Cloudflare Pages output: `.vercel/output/static`

**Pros:** Full Cloudflare Pages support
**Cons:** Lose Next.js 16 features

### Option 4: Wait for Adapter Support

Monitor `@cloudflare/next-on-pages` for Next.js 16 support.

## Current Configuration

- **Build output directory:** `.next` (for static pages)
- **Build command:** `npm run build`
- **GitHub page:** Now static, fetches data client-side (but API routes don't work)

## Recommendation

**Use Vercel** - it's the easiest solution and supports everything you need out of the box. If you must stay on Cloudflare, consider Option 3 (downgrade to Next.js 15) for full compatibility.

