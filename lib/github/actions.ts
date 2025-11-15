"use server";

import { syncGitHubData } from "./sync";

export async function triggerSync(syncCode: string) {
  // Verify sync code
  const expectedCode = process.env.SYNC_CODE;

  if (!expectedCode) {
    return {
      success: false,
      error: "Sync code not configured",
    };
  }

  if (!syncCode || syncCode !== expectedCode) {
    return {
      success: false,
      error: "Invalid sync code",
    };
  }

  try {
    const result = await syncGitHubData();
    return {
      success: true,
      result: {
        commitsAdded: result.commitsAdded,
        issuesAdded: result.issuesAdded,
        prsAdded: result.prsAdded,
        errors: result.errors,
      },
    };
  } catch (error) {
    console.error("Error in triggerSync:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

