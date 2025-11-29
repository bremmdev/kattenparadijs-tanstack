import { createMiddleware, createStart } from "@tanstack/react-start";
import {
  getResponseHeaders,
  setResponseHeaders,
} from "@tanstack/react-start/server";

const requestMiddleware = createMiddleware().server(({ next }) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}'; 
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://cdn.sanity.io data:;
    media-src 'self' https://cdn.sanity.io;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'none';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const headers = getResponseHeaders();
  headers.set("Content-Security-Policy", cspHeader);
  setResponseHeaders(headers);
  return next({
    // Pass the nonce to the context so it can be used elsewhere (e.g., in the router for SSR)
    context: {
      nonce,
    },
  });
});

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [requestMiddleware],
  };
});
