import { createFileRoute } from "@tanstack/react-router";
import { imageGroqQuery } from "@/utils/queries";
import { sanityClient } from "@/utils/sanity";
import { createServerFn } from "@tanstack/react-start";
import Gallery from "@/components/Gallery/Gallery";
import { env } from "cloudflare:workers";
import { indexRouteSEO } from "@/utils/meta";

export const fetchIndexImagesFromSanity = createServerFn({
  method: "GET",
})
  .inputValidator((data: { page: number }) => data)
  .handler(async ({ data }) => {
    const { page } = data;

    // Check if payload for initial HTML (page 0) is cached in KV
    if (page === 0) {
      const cached = await env.cache.get("sanity:index");
      if (cached) {
        return JSON.parse(cached);
      }
    }

    // CACHE MISS: Fetch from Sanity and cache if page 0
    const query = imageGroqQuery({ page });
    const images = await sanityClient.fetch(query);

    // Cache the payload for initial HTML (page 0) in KV
    if (page === 0) {
      await env.cache.put("sanity:index", JSON.stringify(images));
    }

    return images;
  });

export const Route = createFileRoute("/")({
  component: CatsPage,
  loader: async ({ context }) => {
    await context.queryClient.prefetchInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 0 }) =>
        fetchIndexImagesFromSanity({ data: { page: pageParam } }),
      staleTime: Infinity,
      initialPageParam: 0,
    });
  },
  head: () => ({
    meta: indexRouteSEO,
  }),
});

function CatsPage() {
  return (
    <>
      <Gallery cat={null} />;
    </>
  );
}
