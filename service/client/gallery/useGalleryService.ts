import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { GetKeywordGalleryArtworksParams } from '@/types';

import queryOptions from './queries';

// 이세돌 공지사항 모든 글 가져오기
// 아래처럼 lastpage를 받고 page를 주는 형태로 변경 요청
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

// 키워드 갤러리 작품들 가져오기
// {"lastPage": true, "total": 22011, "list": []}
export function useIsdNotices() {
  return useQuery(queryOptions.isdNotices());
}
