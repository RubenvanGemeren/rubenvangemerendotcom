#!/bin/bash
set -e

LOCK_FILE=".cloudflare-build.lock"

# Cleanup function to remove lock file on exit
cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT

# Check if we're being called recursively by the adapter
# The adapter calls "npm run build" internally, so we use a lock file to detect that
if [ -f "$LOCK_FILE" ]; then
  # We're in a recursive call from the adapter - only run next build
  npm run next-build
  exit 0
fi

# Create lock file to mark that we're running the adapter
touch "$LOCK_FILE"

# Export VERCEL=1 to prevent recursive build detection
# This tells vercel CLI we're in a Vercel environment
export VERCEL=1

# Run Next.js build
npm run next-build

# Run Cloudflare adapter
# The adapter will call "npm run build" internally, but our lock file check will catch it
npx @cloudflare/next-on-pages

