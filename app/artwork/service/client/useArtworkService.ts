import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import queryOptions from '@/app/artwork/service/client/queries';
import type { GetRecommendArtworksParams } from '@/types';

export function useRecommendArtwork({
  artworkId,
  ap,
}: GetRecommendArtworksParams) {
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery(queryOptions.recommendArtwoks({ artworkId, ap }));

  const artworks = useMemo(() => {
    return data?.pages.flatMap((page) => page.list);
  }, [data]);

  return {
    artworks,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
