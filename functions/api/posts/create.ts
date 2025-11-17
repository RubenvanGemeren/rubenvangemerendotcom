// functions/api/posts/create.ts
import { callMongoDO } from "../_lib/mongoDoClient";
import type { PagesFunctionContext } from "../../types/cloudflare";
import type { MongoInsertOneResult } from "../../types/cloudflare";

interface CreatePostRequest {
  title: string;
  content: string;
}

function jsonHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
}

export async function onRequest(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: jsonHeaders() }
    );
  }

  let data: CreatePostRequest;
  try {
    data = await request.json() as CreatePostRequest;
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: jsonHeaders() }
    );
  }

  if (!data.title || !data.content) {
    return new Response(
      JSON.stringify({ error: "title and content required" }),
      { status: 400, headers: jsonHeaders() }
    );
  }

  try {
    const result = await callMongoDO(env, "insertOne", {
      collection: env.MONGODB_DEFAULT_COLLECTION || "posts",
      args: {
        document: {
          title: data.title,
          content: data.content,
          createdAt: new Date().toISOString()
        }
      }
    }) as MongoInsertOneResult;

    return new Response(JSON.stringify(result), { status: 201, headers: jsonHeaders() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: jsonHeaders() }
    );
  }
}

