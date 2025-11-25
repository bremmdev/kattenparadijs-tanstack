import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

import {
  assertValidSignature,
  isSignatureError,
  SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";

// Manually call assertValidSignature as validateSignature is stubbed out in Cloudflare Workers environment
async function safeIsValidSignature(
  payload: string,
  signature: string,
  secret: string
) {
  try {
    await assertValidSignature(payload, signature, secret);
    return true;
  } catch (err) {
    if (isSignatureError(err)) return false;
    throw err;
  }
}

const secret = env.SANITY_WEBHOOK_SECRET;

export const Route = createFileRoute("/api/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        //validate signature from sanity
        const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
        const rawBody = await request.text();

        const isValid = await safeIsValidSignature(rawBody, signature, secret);

        if (!isValid) {
          return new Response("Invalid signature", { status: 401 });
        }

        // for validation we need text body, but the actual body is JSON
        const body = JSON.parse(rawBody);
        const { _type, cat } = body;

        try {
          if (!_type || !cat)
            return Response.json(
              { message: "Incorrect type" },
              { status: 400 }
            );

          switch (_type) {
            case "catimage":
              // always revalidate main page when an image is added
              await env.cache.delete("sanity:index");

              // cat can be "all" or a specific cat name
              if (cat.length > 1) {
                await env.cache.delete("sanity:all");
                return new Response(`Revalidated page for all cats`);
              }

              // revalidate page for specific cat
              await env.cache.delete(`sanity:${cat[0]}`);
              return new Response(`Revalidated page for ${cat[0]}`);
            case "catvideo":
              await env.cache.delete("sanity:videos");
              return new Response(`Revalidated page for videos`);
          }
        } catch (err) {
          return new Response("Error revalidating", { status: 500 });
        }
      },
    },
  },
});
