// functions/api/posts/[id].ts
import { callMongoDO } from "../../_lib/mongoDoClient";
import type { PagesFunctionContext } from "../../../types/cloudflare";
import type { MongoFindOneResult } from "../../../types/cloudflare";

function jsonHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
}

export async function onRequest(context: PagesFunctionContext): Promise<Response> {
  const { params, env } = context;
  const id = params?.id;

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing id" }),
      { status: 400, headers: jsonHeaders() }
    );
  }

  try {
    const result = await callMongoDO(env, "findOne", {
      collection: env.MONGODB_DEFAULT_COLLECTION || "posts",
      args: { filter: { _id: { $oid: id } } }
    }) as MongoFindOneResult | null;

    if (!result) {
      return new Response(
        JSON.stringify({ error: "Post not found" }),
        { status: 404, headers: jsonHeaders() }
      );
    }

    return new Response(JSON.stringify(result), { headers: jsonHeaders() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: jsonHeaders() }
    );
  }
}

