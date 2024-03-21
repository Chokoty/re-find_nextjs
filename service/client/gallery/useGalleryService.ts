import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import type {
  GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
} from '@/types';

import queryOptions from './queries';

// 갤러리에서 왁굳님, 이세돌 분들의 갤러리용 팬아트를 확인할 수 있습니다.(더불어, 비챤님, 릴파님 생일 요청으로도 사용됩니다.)
export function useGalleryArtworks({
  query,
  sortType,
}: GetKeywordGalleryArtworksParams) {
  // return useQuery(queryOptions.galleryArtworks({ query, sortType, page }));

  const {
    data,
    fetchNextPage, // 다음 페이지를 호출하는 함수
    isFetchingNextPage, // 다음 페이지를 호출 중인지 = isLoading과 같은 개념
    // hasNextPage, // 다음 페이지를 가지고 있는지(마지막 페이지인지 판단 t/f)
    isLoading,
    isError,
  } = useInfiniteQuery(queryOptions.galleryArtworks({ query, sortType }));

  const artworks = useMemo(() => {
    return data?.pages.flatMap((page) => {
      if (Array.isArray(page.list)) {
        return page.list.map((artwork) => ({
          ...artwork,
          board: artwork.board.replace(/&#\d+;/g, '').trim(),
        }));
      } else {
        return [];
      }
    });
  }, [data]);

  const total = data?.pages[0].total;

  return {
    total,
    artworks,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}

export function useNoticeArtworks({
  member,
  ranktype,
}: GetIsdNoticeArtworksParams) {
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery(queryOptions.isdNoticeArtworks({ member, ranktype }));

  const artworks = useMemo(() => {
    return data?.pages.flatMap((page) => page.list);
  }, [data]);

  const total = data?.pages[0].total;

  return {
    total,
    artworks,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
