// NOTE: node-cron is NOT compatible with Cloudflare Workers (edge runtime).
// On Cloudflare, use Cron Triggers instead (configured in wrangler.jsonc or dashboard).
// This module uses a dynamic import so it only loads node-cron in Node.js environments.

import { syncGitHubData } from './sync';

let cronJob: any | null = null;

export async function startCronJob(): Promise<void> {
  // Guard: only run in Node.js environments, not in Cloudflare Workers
  if (typeof globalThis.caches !== 'undefined' && typeof (globalThis as any).WebSocketPair !== 'undefined') {
    console.log('Cloudflare Workers detected — skipping node-cron. Use Cron Triggers instead.');
    return;
  }

  if (cronJob) {
    console.log('Cron job already running');
    return;
  }

  try {
    const cron = (await import('node-cron')).default;

    // Run daily at midnight UTC
    cronJob = cron.schedule('0 0 * * *', async () => {
      console.log('Starting scheduled GitHub data sync...');
      try {
        const result = await syncGitHubData();
        console.log('Scheduled sync completed:', result);
      } catch (error) {
        console.error('Error in scheduled sync:', error);
      }
    }, {
      scheduled: true,
      timezone: 'UTC',
    });

    console.log('GitHub data sync cron job started (runs daily at midnight UTC)');
  } catch (error) {
    console.warn('node-cron is not available in this runtime. Use Cron Triggers for scheduled syncs.', error);
  }
}

export function stopCronJob(): void {
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
    console.log('GitHub data sync cron job stopped');
  }
}

// Auto-start cron job when this module is imported (only in Node.js environment)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  // Only start if we're in a server environment with ENABLE_CRON set
  if (process.env.ENABLE_CRON === 'true') {
    startCronJob();
  }
}

