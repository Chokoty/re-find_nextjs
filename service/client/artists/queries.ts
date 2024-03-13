import type { GetArtistInfoParams } from '@/types';

import ArtistService from './ArtistService';

const queryKeys = {
  artistList: ['artistList'] as const,
  artistInfo: ({ nickname, sortType, field }: GetArtistInfoParams) =>
    ['artistInfo', nickname, sortType, field] as const,
};

const queryOptions = {
  artistList: () => ({
    queryKey: queryKeys.artistList,
    queryFn: () => ArtistService.getArtistList(),
  }),
  artistInfo: ({ nickname, sortType, field }: GetArtistInfoParams) => ({
    queryKey: queryKeys.artistInfo({ nickname, sortType, field }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ArtistService.getArtistInfo({
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
