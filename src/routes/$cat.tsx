import { createFileRoute, notFound } from "@tanstack/react-router";
import { imageGroqQuery, catGroqQuery } from "@/utils/queries";
import { sanityClient } from "@/utils/sanity";
import { createServerFn } from "@tanstack/react-start";
import CatOverview from "@/components/Cat/CatOverview";
import { Cat } from "@/types/types";
import { env } from "cloudflare:workers";

const ALLOWED_ROUTES = ["all", "daantje", "flynn", "moos", "norris"];

export const fetchCatsFromSanity = createServerFn({
  method: "GET",
}).handler(async () => {
  // Check if payload for cats is cached in KV
  const cached = await env.cache.get("sanity:cats");
  if (cached) {
    return JSON.parse(cached) as Array<Cat>;
  }

  // CACHE MISS: Fetch from Sanity and cache in KV
  const cats: Array<Cat> = (await sanityClient.fetch(catGroqQuery)) ?? [];

  await env.cache.put("sanity:cats", JSON.stringify(cats));
  return cats;
});

export const fetchCatImagesFromSanity = createServerFn({
  method: "GET",
})
  .inputValidator((data: { page: number; cat: string }) => data)
  .handler(async ({ data }) => {
    const { page, cat } = data;

    //query for pictures with single cat
    let queryFilter = `"${cat}" in cat[]->name && length(cat) == 1`;

    //query for pictures with multiple cats
    if (cat === "all") {
      queryFilter = `length(cat) > 1`;
    }

    // Check if payload for initial HTML (page 0) is cached in KV
    if (page === 0) {
      const cached = await env.cache.get(`sanity:${cat}`);
      if (cached) {
        return JSON.parse(cached);
      }
    }

    // CACHE MISS: Fetch from Sanity and cache if page 0
    const query = imageGroqQuery({ page, filter: queryFilter });
    const images = await sanityClient.fetch(query);

    // Cache the payload for initial HTML (page 0) in KV
    if (page === 0) {
      await env.cache.put(`sanity:${cat}`, JSON.stringify(images));
    }

    return images;
  });

export const Route = createFileRoute("/$cat")({
  component: CatPage,
  loader: async ({ context, params }) => {
    const { cat } = params;

    if (!ALLOWED_ROUTES.includes(cat)) {
      throw notFound();
    }

    await context.queryClient.prefetchInfiniteQuery({
      queryKey: ["images", cat],
      queryFn: ({ pageParam = 0 }) =>
        fetchCatImagesFromSanity({ data: { page: pageParam, cat: cat } }),
      staleTime: Infinity,
      initialPageParam: 0,
    });

    //query for cats
    const cats = await fetchCatsFromSanity();

    //get cat based on query param
    const selectedCat = cats.find((c) => c.name === cat) || null;

    return { cat: selectedCat };
  },
});

function CatPage() {
  const { cat } = Route.useLoaderData();

  return <CatOverview cat={cat} isDetail />;
}
