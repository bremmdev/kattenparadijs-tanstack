import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import NotFound from "@/components/NotFound";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getStartContext } from "@tanstack/start-storage-context";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Function to get the nonce value both on server and client, either from context or meta tag
const getNonce = createIsomorphicFn()
  .server(() => getStartContext().contextAfterGlobalMiddlewares.nonce)
  .client(
    () =>
      (document.querySelector("meta[property=csp-nonce]") as HTMLMetaElement)
        .content
  );

// Create a new router instance
export function getRouter() {
  const queryClient = new QueryClient();
  const nonce = getNonce();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    // Apply the nonce
    ssr: {
      nonce,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    defaultPreload: "intent",
    defaultNotFoundComponent: () => <NotFound />,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}
