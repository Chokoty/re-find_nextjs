import { useInfiniteQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import { useMemo } from 'react';
import { GetSearchResultParams } from '@/types';

// 검색 결과 가져오기 (검색페이지 무한 스크롤)
export function useSearchResults({
  q,
  title,
  content,
  author,
  sensitive,
  viewCountLimit,
  likeCountLimit,
  commentCountLimit,
  board,
  category,
  dateType,
  rankType,
}: GetSearchResultParams) {
  const {
    data,
    fetchNextPage, // 다음 페이지를 호출하는 함수
    isFetchingNextPage, // 다음 페이지를 호출 중인지 = isLoading과 같은 개념
    // hasNextPage, // 다음 페이지를 가지고 있는지(마지막 페이지인지 판단 t/f)
    isLoading,
    isError,
  } = useInfiniteQuery(
    queryOptions.searchResults({
      q,
      title,
      content,
      author,
      sensitive,
      viewCountLimit,
      likeCountLimit,
      commentCountLimit,
      board,
      category,
      dateType,
      rankType,
    })
  );

  const searchResults = useMemo(() => {
    return data?.pages.flatMap((page) => page.list);
  }, [data]);

  const total = data?.pages[0].total;

  return {
    total,
    searchResults,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
