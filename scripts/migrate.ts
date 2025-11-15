import { config } from 'dotenv';
import { resolve } from 'path';
import { runMigrations } from '../lib/db/migrations';
import { closeDb } from '../lib/db/connection';

// Load environment variables - try .env.local first (Next.js default), then .env
const envPath = resolve(process.cwd(), '.env.local');
const envPathFallback = resolve(process.cwd(), '.env');

// Try to load .env.local first, then fallback to .env
const result = config({ path: envPath }) || config({ path: envPathFallback });

if (!result || Object.keys(result.parsed || {}).length === 0) {
  console.warn('Warning: No .env.local or .env file found. Make sure your environment variables are set.');
}

async function main() {
  try {
    // Verify required environment variables
    if (!process.env.DB_ADMIN_USERNAME || !process.env.DB_ADMIN_PASSWORD) {
      console.error('Error: Missing required environment variables:');
      console.error('  - DB_ADMIN_USERNAME');
      console.error('  - DB_ADMIN_PASSWORD');
      console.error('\nPlease create a .env.local or .env file with these variables.');
      process.exit(1);
    }

    console.log('Running database migrations...');
    await runMigrations();
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await closeDb();
    process.exit(0);
  }
}

main();