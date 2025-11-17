// functions/api/auth.ts
import type { PagesFunctionContext } from "../../types/cloudflare";

export async function onRequest(_context: PagesFunctionContext): Promise<Response> {
  return new Response(
    JSON.stringify({ error: "Authentication not implemented" }),
    {
      status: 501,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}

