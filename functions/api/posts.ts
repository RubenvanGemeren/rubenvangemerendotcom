// functions/api/posts.ts
import { callMongoDO } from "../_lib/mongoDoClient";
import type { PagesFunctionContext } from "../../types/cloudflare";
import type { MongoFindResult } from "../../types/cloudflare";

function corsJson(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
}

export async function onRequest(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const skip = parseInt(url.searchParams.get("skip") || "0", 10);
    const q = url.searchParams.get("q");

    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const result = await callMongoDO(env, "find", {
      collection: env.MONGODB_DEFAULT_COLLECTION || "posts",
      args: { filter, limit, skip }
    }) as MongoFindResult;

    return new Response(JSON.stringify(result.documents), { headers: corsJson() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: corsJson() });
  }
}

