/**
 * Tests for functions/api/github/sync.js
 *
 * Tests the GitHub sync API endpoint with mocked GitHub API and Durable Object responses
 */

import { onRequest } from "../../functions/api/github/sync.js";

// Mock fetch globally
let mockFetch;

beforeEach(() => {
  mockFetch = jest.fn();
  global.fetch = mockFetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("GitHub Sync API", () => {
  // Mock Durable Object stub
  const createMockDOStub = (responseData) => ({
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify({ result: responseData }),
      status: 200
    })
  });

  const createMockDO = () => {
    return {
      idFromName: () => ({ toString: () => "test-do-id" }),
      get: () => createMockDOStub({ matchedCount: 0, modifiedCount: 1, upsertedId: "test-id" })
    };
  };

  const mockEnv = {
    MONGODB_DATABASE: "github_stats",
    GITHUB_USERNAME: "testuser",
    GITHUB_TOKEN: "test-token",
    SYNC_SECRET: "test-secret",
    MONGO_DO: createMockDO()
  };

  const createMockContext = (method = "POST", headers = {}, envOverride = {}) => {
    const defaultHeaders = {
      "x-sync-secret": "test-secret",
      ...headers,
    };

    return {
      request: new Request("https://example.com/api/github/sync", {
        method,
        headers: defaultHeaders,
      }),
      env: { ...mockEnv, ...envOverride },
    };
  };

  const createGitHubAPIResponse = (data) => ({
    ok: true,
    status: 200,
    headers: new Headers({
      "x-ratelimit-remaining": "100",
      "x-ratelimit-reset": "1234567890",
    }),
    json: () => Promise.resolve(data),
  });

  test("rejects non-POST requests", async () => {
    const context = createMockContext("GET");
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(405);
    expect(body.error).toBe("Method not allowed");
  });

  test("rejects requests without sync secret", async () => {
    const context = createMockContext("POST", {});
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized");
  });

  test("rejects requests with invalid sync secret", async () => {
    const context = createMockContext("POST", { "x-sync-secret": "wrong-secret" });
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized");
  });

  test("handles missing SYNC_SECRET in env", async () => {
    const context = createMockContext("POST", { "x-sync-secret": "test" }, { SYNC_SECRET: undefined });

    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Sync secret not configured");
  });

  test("successfully syncs GitHub data", async () => {
    // Mock GitHub API responses
    mockFetch
      // Public events
      .mockResolvedValueOnce(
        createGitHubAPIResponse([
          {
            id: "1",
            type: "PushEvent",
            actor: { login: "testuser" },
            repo: { name: "user/repo1" },
            created_at: "2024-01-01T00:00:00Z",
            payload: {
              commits: [{ sha: "abc123" }],
            },
          },
        ])
      )
      // User repos
      .mockResolvedValueOnce(
        createGitHubAPIResponse([
          {
            owner: { login: "user" },
            name: "repo1",
          },
        ])
      )
      // Repo commits
      .mockResolvedValueOnce(
        createGitHubAPIResponse([
          {
            sha: "def456",
            author: { login: "testuser" },
            commit: {
              author: { date: "2024-01-01T00:00:00Z" },
            },
            stats: { additions: 10, deletions: 5 },
          },
        ])
      )
      // Repo issues
      .mockResolvedValueOnce(
        createGitHubAPIResponse([
          {
            number: 1,
            state: "open",
            created_at: "2024-01-01T00:00:00Z",
            pull_request: null, // Not a PR
          },
        ])
      )
      // Repo PRs
      .mockResolvedValueOnce(
        createGitHubAPIResponse([
          {
            number: 2,
            state: "closed",
            merged_at: "2024-01-02T00:00:00Z",
            created_at: "2024-01-01T00:00:00Z",
          },
        ])
      );

      // DO responses are handled by the mock DO, no need to mock fetch for DB calls

    const context = createMockContext();
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.result).toBeDefined();
    expect(body.result.commitsAdded).toBeGreaterThan(0);
    expect(body.result.issuesAdded).toBeGreaterThan(0);
    expect(body.result.prsAdded).toBeGreaterThan(0);
  });

  test("handles GitHub API errors", async () => {
    // Mock GitHub API error
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    });

    const context = createMockContext();
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Sync failed");
  });

  test("handles missing GITHUB_USERNAME", async () => {
    const context = createMockContext("POST", { "x-sync-secret": "test-secret" }, { GITHUB_USERNAME: undefined });

    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Sync failed");
    expect(body.message).toContain("GITHUB_USERNAME");
  });

  test("handles missing GITHUB_TOKEN", async () => {
    const context = createMockContext("POST", { "x-sync-secret": "test-secret" }, { GITHUB_TOKEN: undefined });

    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Sync failed");
    expect(body.message).toContain("GITHUB_TOKEN");
  });

  test("handles DO errors during sync", async () => {
    // Mock successful GitHub API calls
    mockFetch
      .mockResolvedValueOnce(createGitHubAPIResponse([])) // Public events
      .mockResolvedValueOnce(createGitHubAPIResponse([])); // User repos

    // Mock DO error
    const errorDO = {
      idFromName: () => ({ toString: () => "test-do-id" }),
      get: () => ({
        fetch: async () => ({
          ok: false,
          text: async () => JSON.stringify({ error: "Database error" }),
          status: 500
        })
      })
    };

    const context = createMockContext("POST", { "x-sync-secret": "test-secret" }, { MONGO_DO: errorDO });
    const response = await onRequest(context);
    const body = await response.json();

    // Should still return 200 but with errors in result
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.result.errors).toBeDefined();
    expect(body.result.errors.length).toBeGreaterThan(0);
  });
});

