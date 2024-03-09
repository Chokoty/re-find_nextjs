import type { GetKeywordGalleryArtworksParams } from '@/types';

import GalleryService from './GalleryService';

const queryKeys = {
  galleryArtworks: ({ query, sortType }: GetKeywordGalleryArtworksParams) =>
    ['galleryArtworks', query, sortType] as const,
  isdNotices: ['isdNotices'] as const,
};

const queryOptions = {
  galleryArtworks: ({ query, sortType }: GetKeywordGalleryArtworksParams) => ({
    queryKey: queryKeys.galleryArtworks({ query, sortType }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      GalleryService.getGalleryArtworksByKeyword({
        query,
        sortType,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: GalleryArtworks,
      allPages: GalleryArtworks[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
  isdNotices: () => ({
    queryKey: queryKeys.isdNotices,
    queryFn: () => GalleryService.getIsdNotices(),
  }),
};

export default queryOptions;
