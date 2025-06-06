import ArtworkService from '@/app/artwork/service/client/ArtworkService';
import type { GetRecommendArtworksParams } from '@/types';

const queryKeys = {
  recommendArtworks: ({ artworkId, ap }: GetRecommendArtworksParams) =>
    ['recommendArtworks', artworkId, ap] as const,
};

const queryOptions = {
  recommendArtwoks: ({ artworkId, ap }: GetRecommendArtworksParams) => ({
    queryKey: queryKeys.recommendArtworks({ artworkId, ap }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ArtworkService.getRecommendArtworks({ artworkId, ap, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: RecommendArtworks,
      allPages: RecommendArtworks[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
    meta: { skipGlobalErrorHandler: true },
  }),
};

export default queryOptions;
