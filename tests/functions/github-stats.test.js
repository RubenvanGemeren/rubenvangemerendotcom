/**
 * Tests for functions/api/github/stats.js
 *
 * Tests the GitHub stats API endpoint with mocked Durable Object responses
 */

import { onRequest } from "../../functions/api/github/stats.js";

describe("GitHub Stats API", () => {
  // Mock Durable Object stub
  const createMockDOStub = (responseData) => ({
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify({ result: responseData }),
      status: 200
    })
  });

  const createMockDO = (responses) => {
    let callCount = 0;
    return {
      idFromName: () => ({ toString: () => "test-do-id" }),
      get: () => createMockDOStub(responses[callCount++] || {})
    };
  };

  const mockEnv = {
    MONGODB_DATABASE: "github_stats",
    MONGO_DO: null // Will be set per test
  };

  const createMockContext = (url = "https://example.com/api/github/stats?dateRange=week", doMock = null) => ({
    request: new Request(url),
    env: { ...mockEnv, MONGO_DO: doMock || mockEnv.MONGO_DO },
  });

  test("returns stats for week range", async () => {
    // Create mock DO with all responses in order
    const doMock = createMockDO([
      { count: 10 }, // commits count
      { count: 5 }, // issues opened
      { count: 3 }, // issues closed
      { count: 8 }, // PRs opened
      { count: 4 }, // PRs closed
      { count: 6 }, // PRs merged
      { documents: [{ _id: { repo_owner: "user", repo_name: "repo1" } }] }, // commits repos
      { documents: [{ _id: { repo_owner: "user", repo_name: "repo2" } }] }, // issues repos
      { documents: [{ _id: { repo_owner: "user", repo_name: "repo1" } }] }, // PR repos
      { documents: [ // commits trend
        { date: "2024-01-01", count: 5 },
        { date: "2024-01-02", count: 5 },
      ]},
      { documents: [ // issues trend
        { date: "2024-01-01", opened: 2, closed: 1 },
        { date: "2024-01-02", opened: 3, closed: 2 },
      ]},
      { documents: [ // PRs trend
        { date: "2024-01-01", opened: 3, closed: 1, merged: 2 },
        { date: "2024-01-02", opened: 5, closed: 2, merged: 3 },
      ]},
      { count: 8 }, // previous commits
      { count: 4 }, // previous issues opened
      { count: 2 }, // previous issues closed
      { count: 6 }, // previous PRs opened
      { count: 3 }, // previous PRs closed
      { count: 5 }, // previous PRs merged
    ]);

    const context = createMockContext("https://example.com/api/github/stats?dateRange=week", doMock);
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.commits).toBe(10);
    expect(body.issuesOpened).toBe(5);
    expect(body.issuesClosed).toBe(3);
    expect(body.prsOpened).toBe(8);
    expect(body.prsClosed).toBe(4);
    expect(body.prsMerged).toBe(6);
    expect(body.dateRange).toBe("week");
    expect(body.commitsTrend).toHaveLength(2);
    expect(body.issuesTrend).toHaveLength(2);
    expect(body.prsTrend).toHaveLength(2);
    expect(body.commitsComparison).not.toBeNull();
  });

  test("handles missing DO binding", async () => {
    const context = {
      request: new Request("https://example.com/api/github/stats"),
      env: { MONGODB_DATABASE: "github_stats" }, // Missing MONGO_DO
    };

    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBeDefined();
  });

  test("handles DO errors gracefully", async () => {
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

    const context = createMockContext("https://example.com/api/github/stats?dateRange=week", errorDO);
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBeDefined();
  });

  test("validates dateRange parameter", async () => {
    const doMock = createMockDO([
      { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 },
      { documents: [] }, { documents: [] }, { documents: [] },
      { documents: [] }, { documents: [] }, { documents: [] }
    ]);

    const context = createMockContext(
      "https://example.com/api/github/stats?dateRange=invalid",
      doMock
    );
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.dateRange).toBe("week"); // Should default to week
  });

  test("handles 'all' dateRange (no previous period comparison)", async () => {
    const doMock = createMockDO([
      { count: 100 }, { count: 50 }, { count: 30 }, { count: 40 }, { count: 20 }, { count: 25 },
      { documents: [] }, { documents: [] }, { documents: [] },
      { documents: [] }, { documents: [] }, { documents: [] }
    ]);

    const context = createMockContext(
      "https://example.com/api/github/stats?dateRange=all",
      doMock
    );
    const response = await onRequest(context);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.dateRange).toBe("all");
    expect(body.commitsComparison).toBeNull(); // No comparison for 'all'
  });
});

