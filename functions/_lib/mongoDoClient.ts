// functions/_lib/mongoDoClient.ts
import type { Env, MongoOperation, MongoOperationOptions, MongoOperationResult } from "../../types/cloudflare";

export async function callMongoDO(
  env: Env,
  op: MongoOperation,
  options: MongoOperationOptions = {}
): Promise<MongoOperationResult> {
  // env.MONGO_DO should be a Durable Object namespace binding
  if (!env.MONGO_DO) {
    throw new Error("Missing Durable Object binding: MONGO_DO");
  }

  // Use env.MONGO_DO.idFromName to route to a named instance (e.g., "global")
  const id = env.MONGO_DO.idFromName("global");
  const stub = env.MONGO_DO.get(id);

  const body = {
    op,
    collection: options.collection,
    args: options.args || {}
  };

  const res = await stub.fetch("https://do.internal/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const text = await res.text();
  try {
    const json = JSON.parse(text) as { result?: MongoOperationResult; error?: string };
    if (!res.ok) {
      throw new Error(json.error || "DO error");
    }
    if (!json.result) {
      throw new Error("Missing result in DO response");
    }
    return json.result;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Invalid DO response";
    throw new Error(errorMessage);
  }
}

