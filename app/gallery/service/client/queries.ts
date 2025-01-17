import GalleryService from '@/app/gallery/service/client/GalleryService';
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
};

const queryOptions = {
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
      lastPage: GalleryArtworks,
      allPages: GalleryArtworks[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
  // isdNoticeArtworks: ({ member, ranktype }: GetIsdNoticeArtworksParams) => ({
  //   queryKey: queryKeys.isdNotices({ member, ranktype }),
  //   queryFn: ({ pageParam }: { pageParam: number }) =>
  //     GalleryService.getIsdNoticesArtworks({
  //       member,
  //       ranktype,
  //       page: pageParam,
  //     }),
  //   initialPageParam: 1,
  //   getNextPageParam: (
  //     lastPage: IsdNoticeArtworks,
  //     allPages: IsdNoticeArtworks[],
  //     lastPageParam: number,
  //     allPageParams: number[]
  //   ) => {
  //     if (lastPage.lastPage) return;
  //     return lastPageParam + 1;
  //   },
  // }),
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
