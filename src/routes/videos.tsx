import { createFileRoute } from "@tanstack/react-router";
import { videoGroqQuery } from "@/utils/queries";
import { sanityClient } from "@/utils/sanity";
import { createServerFn } from "@tanstack/react-start";
import VideosOverview from "@/components/Cat/VideosOverview";
import { env } from "cloudflare:workers";

export const fetchVideosFromSanity = createServerFn({
  method: "GET",
})
  .inputValidator((data: { page: number }) => data)
  .handler(async ({ data }) => {
    const { page } = data;

    // Check if payload for initial HTML (page 0) is cached in KV
    if (page === 0) {
      const cached = await env.cache.get("sanity:videos");
      if (cached) {
        return JSON.parse(cached);
      }
    }

    // CACHE MISS: Fetch from Sanity and cache in KV
    const query = videoGroqQuery({ page });
    const videos = await sanityClient.fetch(query);

    await env.cache.put("sanity:videos", JSON.stringify(videos));

    return videos;
  });

export const Route = createFileRoute("/videos")({
  component: VideosPage,
  loader: async ({ context }) => {
    await context.queryClient.prefetchInfiniteQuery({
      queryKey: ["videos"],
      queryFn: ({ pageParam = 0 }) =>
        fetchVideosFromSanity({ data: { page: pageParam } }),
      staleTime: Infinity,
      initialPageParam: 0,
    });
  },
});

function VideosPage() {
  return <VideosOverview />;
}
