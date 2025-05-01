import GalleryService from '@/app/album/service/client/GalleryService';
import type {
  GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
} from '@/types';

const queryKeys = {
  galleryArtworks: ({
    galleryType,
    sortType,
  }: GetKeywordGalleryArtworksParams) =>
    ['galleryArtworks', galleryType, sortType] as const,
  isdNotices: ({ member, ranktype }: GetIsdNoticeArtworksParams) =>
    ['isdNotices', member, ranktype] as const,
  artworkDetail: (id: number) => ['artworkDetail', id] as const,
  galleries: () => ['galleries'] as const,
  galleryPageInfo: (id: string) => ['galleryPageInfo', id] as const,
};

const queryOptions = {
  galleryPageInfo: (id: string) => ({
    queryKey: queryKeys.galleryPageInfo(id), // queryKey 설정
    queryFn: () => GalleryService.getGalleryPageInfo(id), // 메서드 호출
  }),
  galleryArtworks: ({
    galleryType,
    sortType,
  }: GetKeywordGalleryArtworksParams) => ({
    queryKey: queryKeys.galleryArtworks({ galleryType, sortType }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      GalleryService.getGalleryArtworksByKeyword({
        galleryType,
        sortType,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: AlbumArtworks,
      allPages: AlbumArtworks[],
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

  galleries: () => ({
    queryKey: queryKeys.galleries(), // queryKey 설정
    queryFn: () => GalleryService.getGalleries(), // 메서드 호출
  }),
};

export default queryOptions;
