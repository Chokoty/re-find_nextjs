import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { GetArtistInfoParams } from '@/types';

import queryOptions from './queries';

// {"lastPage": true, "list": []}
export function useArtistInfo({
  nickname,
  sortType,
  field,
}: GetArtistInfoParams) {
  const {
    data,
    fetchNextPage, // 다음 페이지를 호출하는 함수
    isFetchingNextPage, // 다음 페이지를 호출 중인지 = isLoading과 같은 개념
    // hasNextPage, // 다음 페이지를 가지고 있는지(마지막 페이지인지 판단 t/f)
    isLoading,
    isError,
  } = useInfiniteQuery(queryOptions.artistInfo({ nickname, sortType, field }));

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

// TODO: 위처럼 변경 필요
export function useArtistList() {
  return useQuery(queryOptions.artistList());
}
