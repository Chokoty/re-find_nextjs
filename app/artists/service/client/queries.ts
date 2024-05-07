import ArtistService from '@/app/artists/service/client/ArtistService';
import type { GetArtistInfoParams, GetArtistListParams } from '@/types';

const queryKeys = {
  artistList: ({ q, ranktype, board }: GetArtistListParams) =>
    ['artistList', q, ranktype, board] as const,
  artistInfo: ({ nickname, sortType, board }: GetArtistInfoParams) =>
    ['artistInfo', nickname, sortType, board] as const,
};

const queryOptions = {
  artistList: ({ q, ranktype, board }: GetArtistListParams) => ({
    queryKey: queryKeys.artistList({ q, ranktype, board }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ArtistService.getArtistList({ q, ranktype, board, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: AuthorList,
      allPages: AuthorList[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
  artistInfo: ({ nickname, sortType, board }: GetArtistInfoParams) => ({
    queryKey: queryKeys.artistInfo({ nickname, sortType, board }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ArtistService.getArtistArtworks({
        nickname,
        sortType,
        page: pageParam,
        board,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: Artist,
      allPages: Artist[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
};

export default queryOptions;
