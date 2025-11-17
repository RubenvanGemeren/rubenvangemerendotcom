// tests/postsFunction.test.js
import { onRequest as postsHandler } from "../functions/api/posts.js";

describe("posts function", () => {
  // Mock Durable Object stub
  const createMockDOStub = (responseData) => ({
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify({ result: responseData }),
      status: 200
    })
  });

  const createMockDO = (responseData) => {
    return {
      idFromName: () => ({ toString: () => "test-do-id" }),
      get: () => createMockDOStub(responseData)
    };
  };

  test("returns posts", async () => {
    const mockPosts = [{ _id: "1", title: "Hello", content: "World" }];
    const doMock = createMockDO(mockPosts);

    const req = new Request("https://example.com/api/posts");
    const context = {
      request: req,
      env: {
        MONGO_DO: doMock,
        MONGODB_DEFAULT_COLLECTION: "posts"
      }
    };

    const res = await postsHandler(context);
    const text = await res.text();
    const data = JSON.parse(text);

    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Hello");
  });

  test("handles query parameters", async () => {
    const mockPosts = [{ _id: "1", title: "Test", content: "Content" }];
    const doMock = createMockDO(mockPosts);

    const req = new Request("https://example.com/api/posts?limit=10&skip=5&q=test");
    const context = {
      request: req,
      env: {
        MONGO_DO: doMock,
        MONGODB_DEFAULT_COLLECTION: "posts"
      }
    };

    const res = await postsHandler(context);
    expect(res.status).toBe(200);
  });

  test("handles missing DO binding", async () => {
    const req = new Request("https://example.com/api/posts");
    const context = {
      request: req,
      env: {
        MONGODB_DEFAULT_COLLECTION: "posts"
        // Missing MONGO_DO
      }
    };

    const res = await postsHandler(context);
    const text = await res.text();
    const data = JSON.parse(text);

    expect(res.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});

