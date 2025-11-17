// durable-objects/MongoDO.ts
import { MongoClient, ObjectId, Db, Collection } from "mongodb";
import type { DurableObjectState, DurableObjectEnv, DurableObjectRequest, DurableObjectResponse } from "../types/cloudflare";

export class MongoDO {
  private state: DurableObjectState;
  private env: DurableObjectEnv;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private initializing: Promise<void> | null = null;

  constructor(state: DurableObjectState, env: DurableObjectEnv) {
    this.state = state;
    this.env = env;
  }

  private async ensureClient(): Promise<void> {
    if (this.client) return;
    if (this.initializing) return this.initializing;

    this.initializing = (async () => {
      const uri = this.env.MONGODB_URI;
      const dbName = this.env.MONGODB_DATABASE;
      if (!uri || !dbName) {
        throw new Error("Missing MONGODB_URI or MONGODB_DATABASE in DO env");
      }

      // Create a single MongoClient instance and connect once
      this.client = new MongoClient(uri, {
        // options tuned for serverless; adjust as needed
        maxPoolSize: 10,
        minPoolSize: 0,
      });
      await this.client.connect();
      this.db = this.client.db(dbName);
      this.initializing = null;
    })();

    return this.initializing;
  }

  // convert $oid shorthand to ObjectId, recursively
  private convertOid(obj: unknown): unknown {
    if (!obj || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(v => this.convertOid(v));

    const record = obj as Record<string, unknown>;
    const keys = Object.keys(record);

    if (keys.length === 1 && keys[0] === "$oid") {
      try {
        return new ObjectId(record.$oid as string);
      } catch (e) {
        return record.$oid;
      }
    }

    const out: Record<string, unknown> = {};
    for (const k of keys) {
      out[k] = this.convertOid(record[k]);
    }
    return out;
  }

  private async handleOp(
    op: string,
    collectionName: string,
    args: Record<string, unknown> = {}
  ): Promise<{ result: unknown }> {
    await this.ensureClient();
    if (!this.db) {
      throw new Error("Database not initialized");
    }

    const collection: Collection = this.db.collection(collectionName);
    const filter = args.filter ? this.convertOid(args.filter) as Record<string, unknown> : undefined;

    switch (op) {
      case "find": {
        const cursor = collection.find(filter || {});
        if (args.skip) cursor.skip(Number(args.skip));
        if (args.limit) cursor.limit(Number(args.limit));
        const docs = await cursor.toArray();
        return { result: { documents: docs } };
      }
      case "findOne": {
        const doc = await collection.findOne(filter || {});
        return { result: doc };
      }
      case "insertOne": {
        const doc = args.document as Record<string, unknown>;
        const res = await collection.insertOne(doc);
        return { result: res };
      }
      case "updateOne": {
        const update = (args.update || {}) as Record<string, unknown>;
        const options = (args.options || {}) as Record<string, unknown>;
        const res = await collection.updateOne(filter || {}, update, options);
        return { result: res };
      }
      case "deleteOne": {
        const res = await collection.deleteOne(filter || {});
        return { result: res };
      }
      case "count": {
        const count = await collection.countDocuments(filter || {});
        return { result: { count } };
      }
      case "aggregate": {
        const pipeline = (args.pipeline || []) as unknown[];
        const docs = await collection.aggregate(pipeline).toArray();
        return { result: { documents: docs } };
      }
      default:
        throw new Error("Unsupported op: " + op);
    }
  }

  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders() });
      }

      const payload = (await request.json().catch(() => ({}))) as DurableObjectRequest;
      const op = payload.op;
      const collectionName = payload.collection || this.env.MONGODB_DEFAULT_COLLECTION || "posts";

      if (!op) {
        return new Response(
          JSON.stringify({ error: "Missing op" }),
          { status: 400, headers: jsonHeaders() }
        );
      }

      const args = payload.args || {};
      const { result } = await this.handleOp(op, collectionName, args);
      return new Response(JSON.stringify({ result }), { status: 200, headers: jsonHeaders() });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 500, headers: jsonHeaders() }
      );
    }
  }
}

function jsonHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}

