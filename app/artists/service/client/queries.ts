import ArtistService from '@/app/artists/service/client/ArtistService';
import type { GetArtistArtworksParams, GetArtistListParams } from '@/types';

const queryKeys = {
  artistList: ({ q, ranktype, board }: GetArtistListParams) =>
    ['artistList', q, ranktype, board] as const,
  artistArtworks: ({ nickname, sortType, board }: GetArtistArtworksParams) =>
    ['artistArtworks', nickname, sortType, board] as const,
  artistInfo: (nickname: string) => ['artistInfo', nickname] as const,
};

const queryOptions = {
  artistInfo: (nickname: string) => ({
    queryKey: queryKeys.artistInfo(nickname),
    queryFn: () => ArtistService.getArtistInfo(nickname),
  }),
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
  artistArtworks: ({ nickname, sortType, board }: GetArtistArtworksParams) => ({
    queryKey: queryKeys.artistArtworks({ nickname, sortType, board }),
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
