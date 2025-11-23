import { ImageWithDimensions } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImagesFromSanity } from "@/routes/index";

export const PAGE_SIZE = 48;

type ImagePageType = {
  count: number;
  images: Array<ImageWithDimensions>;
};

export const useImages = (cat?: string) => {
  const queryKey = cat ? ["images", cat] : ["images"];

  return useInfiniteQuery<ImagePageType>({
    queryKey: queryKey,
    queryFn: ({ pageParam = 0 }) =>
      fetchImagesFromSanity({ data: { page: pageParam as number } }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.images.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
  });
};
