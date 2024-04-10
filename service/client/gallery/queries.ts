import type {
  GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
  GetRecommendArtworksParams,
} from '@/types';

import GalleryService from './GalleryService';

const queryKeys = {
  galleryArtworks: ({ query, sortType }: GetKeywordGalleryArtworksParams) =>
    ['galleryArtworks', query, sortType] as const,
  isdNotices: ({ member, ranktype }: GetIsdNoticeArtworksParams) =>
    ['isdNotices', member, ranktype] as const,
  artworkDetail: (id: number) => ['artworkDetail', id] as const,
  recommendArtworks: ({ artworkId, ap }: GetRecommendArtworksParams) =>
    ['recommendArtworks', artworkId, ap] as const,
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
  isdNoticeArtworks: ({ member, ranktype }: GetIsdNoticeArtworksParams) => ({
    queryKey: queryKeys.isdNotices({ member, ranktype }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      GalleryService.getIsdNoticesArtworks({
        member,
        ranktype,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: IsdNoticeArtworks,
      allPages: IsdNoticeArtworks[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
  artworkDetail: (id: number) => ({
    queryKey: queryKeys.artworkDetail(id),
    queryFn: () => GalleryService.getArtworkDetail(id),
  }),
  recommendArtwoks: ({ artworkId, ap }: GetRecommendArtworksParams) => ({
    queryKey: queryKeys.recommendArtworks({ artworkId, ap }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      GalleryService.getRecommendArtworks({ artworkId, ap, page: pageParam }),
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
  }),
};

export default queryOptions;
