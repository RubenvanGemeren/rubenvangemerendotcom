# Legacy Database Code

This directory contains archived database connection code that is no longer used in production.

## Migration

Database access has been migrated to **Cloudflare Pages Functions** using **MongoDB Atlas Data API** (HTTP).

### New Implementation

- **Helper**: `functions/_lib/mongodbDataApi.js` - Data API HTTP client
- **Endpoints**:
  - `functions/api/github/stats.js` - GET stats endpoint
  - `functions/api/github/sync.js` - POST sync endpoint

### Why Archived?

Cloudflare Pages Functions run in a serverless environment that doesn't support persistent TCP connections. The MongoDB native driver requires TCP connections, which is incompatible with Cloudflare's runtime.

The Data API provides HTTP-based access to MongoDB, which works perfectly in serverless environments.

### Files

- `connection.ts` - Original MongoDB client connection code
- `schema.ts` - Collection definitions and index creation
- `migrations.ts` - Database migration scripts

These files are kept for reference only and should not be imported or used in new code.

