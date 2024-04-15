import type { GetArtistInfoParams, GetArtistListParams } from '@/types';

import ArtistService from './ArtistService';

const queryKeys = {
  artistList: ({ q, ranktype, board }: GetArtistListParams) =>
    ['artistList', q, ranktype, board] as const,
  artistInfo: ({ nickname, sortType, field }: GetArtistInfoParams) =>
    ['artistInfo', nickname, sortType, field] as const,
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
  artistInfo: ({ nickname, sortType, field }: GetArtistInfoParams) => ({
    queryKey: queryKeys.artistInfo({ nickname, sortType, field }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ArtistService.getArtistArtworks({
        nickname,
        sortType,
        page: pageParam,
        field,
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
