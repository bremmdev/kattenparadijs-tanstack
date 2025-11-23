import { createFileRoute } from "@tanstack/react-router";
import { imageGroqQuery } from "@/utils/queries";
import { sanityClient } from "@/utils/sanity";
import { createServerFn } from "@tanstack/react-start";
import Gallery from "@/components/Gallery/Gallery";

export const fetchImagesFromSanity = createServerFn({
  method: "GET",
})
  .inputValidator((data: { page: number; cat?: string }) => data)
  .handler(async ({ data }) => {
    const { page } = data;
    const query = imageGroqQuery({ page });
    const images = await sanityClient.fetch(query);
    return images;
  });

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.queryClient.prefetchInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 0 }) =>
        fetchImagesFromSanity({ data: { page: pageParam } }),
      staleTime: Infinity,
      initialPageParam: 0,
    });
  },
  component: CatsPage,
});

function CatsPage() {
  return <Gallery cat={null} />;
}
