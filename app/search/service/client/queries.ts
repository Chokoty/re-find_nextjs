import SearchService from '@/app/search/service/client/SearchService';
import type { GetSearchResultParams } from '@/types';

const queryKeys = {
  searchResults: ({
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
  }: GetSearchResultParams) =>
    [
      'searchResults',
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
    ] as const,
};

const queryOptions = {
  searchResults: ({
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
  }: GetSearchResultParams) => ({
    queryKey: queryKeys.searchResults({
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
    }),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      SearchService.getSearchResults({
        q,
        title,
        content,
        author,
        page: pageParam,
        sensitive,
        viewCountLimit,
        likeCountLimit,
        commentCountLimit,
        board,
        category,
        dateType,
        rankType,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: SearchResult,
      allPages: SearchResult[],
      lastPageParam: number,
      allPageParams: number[]
    ) => {
      if (lastPage.lastPage) return;
      return lastPageParam + 1;
    },
  }),
};

export default queryOptions;
