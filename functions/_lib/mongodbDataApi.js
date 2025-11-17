/**
 * MongoDB Atlas Data API Helper
 *
 * @deprecated This file is deprecated. Database access has been migrated to Cloudflare Durable Objects.
 * See functions/_lib/mongoDoClient.js and durable-objects/MongoDO.js for the new implementation.
 *
 * This file is kept for reference only. It should not be used in new code.
 *
 * Centralized helper to call MongoDB Atlas Data API endpoints via HTTP.
 * This replaces direct TCP connections which are not supported in Cloudflare Pages Functions.
 */

/**
 * Calls the MongoDB Atlas Data API
 * @param {Object} env - Environment object from context.env
 * @param {string} action - Data API action (e.g., 'find', 'findOne', 'insertOne', 'updateOne', 'aggregate', 'count')
 * @param {Object} bodyObj - Request body for the Data API action
 * @returns {Promise<{result?: any, error?: any, status: number}>}
 */
export async function callDataAPI(env, action, bodyObj) {
  const appId = env.MONGODB_APP_ID;
  const apiKey = env.MONGODB_DATA_API_KEY;

  if (!appId || !apiKey) {
    return { error: "Missing Data API credentials", status: 500 };
  }

  const endpoint = `https://data.mongodb-api.com/app/${appId}/endpoint/data/v1/action/${action}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(bodyObj),
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      if (!response.ok) {
        return { error: json, status: response.status || 500 };
      }
      return { result: json, status: response.status || 200 };
    } catch (e) {
      // Non-JSON response
      return { error: text || e.message, status: response.status || 500 };
    }
  } catch (error) {
    return { error: error.message || "Network error", status: 500 };
  }
}

/**
 * Helper to build a Data API request body with common fields
 * @param {Object} env - Environment object
 * @param {string} collection - Collection name
 * @param {Object} options - Additional options (filter, document, etc.)
 * @returns {Object} Data API request body
 */
export function buildDataAPIRequest(env, collection, options = {}) {
  return {
    dataSource: env.MONGODB_CLUSTER || "Cluster0",
    database: env.MONGODB_DATABASE || "github_stats",
    collection: collection,
    ...options,
  };
}

