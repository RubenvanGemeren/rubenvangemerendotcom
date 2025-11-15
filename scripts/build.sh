#!/bin/bash
set -e

# Export VERCEL=1 to prevent recursive build detection
export VERCEL=1

# Run Next.js build
npm run next-build

# Run Cloudflare adapter
npx @cloudflare/next-on-pages

