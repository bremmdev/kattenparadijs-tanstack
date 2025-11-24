import { fetchVideosFromSanity } from "@/routes/videos";
import { Video } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const PAGE_SIZE = 48;

export const useVideos = () => {
  return useInfiniteQuery<Array<Video>>({
    queryKey: ["videos"],
    queryFn: async ({ pageParam = 0 }) =>
      await fetchVideosFromSanity({
        data: { page: pageParam as number },
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
  });
};
