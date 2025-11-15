import cron from 'node-cron';
import { syncGitHubData } from './sync';

let cronJob: cron.ScheduledTask | null = null;

export function startCronJob(): void {
  if (cronJob) {
    console.log('Cron job already running');
    return;
  }

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
  // Only start if we're in a server environment
  if (process.env.ENABLE_CRON === 'true') {
    startCronJob();
  }
}

