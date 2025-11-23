import { ImageWithDimensions } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchIndexImagesFromSanity } from "@/routes/index";
import { fetchCatImagesFromSanity } from "@/routes/$cat";

export const PAGE_SIZE = 48;

type ImagePageType = {
  count: number;
  images: Array<ImageWithDimensions>;
};

export const useImages = (cat?: string) => {
  const queryKey = cat ? ["images", cat] : ["images"];

  return useInfiniteQuery<ImagePageType>({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 0 }) =>
      cat
        ? await fetchCatImagesFromSanity({
            data: { page: pageParam as number, cat },
          })
        : await fetchIndexImagesFromSanity({
            data: { page: pageParam as number },
          }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.images.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
  });
};
