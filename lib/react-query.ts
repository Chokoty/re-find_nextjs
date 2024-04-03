import type { QueryKey, QueryState } from '@tanstack/react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cache } from 'react';

import { isEqual } from '@/lib/isEqual';

export const getQueryClient = cache(() => new QueryClient());

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

interface InfiniteQueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<ResponseType>;
  initialPageParam: number;
}

// query를 위한 유틸 함수
export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) =>
    isEqual(query.queryKey, queryKey)
  );
  // 보통 api 주소가 잘 못되거나 404가 뜨는 경우에 해당 에러를 던지게 됩니다.
  if (!dehydratedQuery) {
    throw new Error('dehydratedQuery is undefined');
  }
  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q['queryFn']>>
  >;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );
  // 보통 api 주소가 잘 못되거나 404가 뜨는 경우에 해당 에러를 던지게 됩니다.
  if (!dehydrate(queryClient).queries) {
    throw new Error('dehydratedQuery is undefined');
  }

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]['queryFn']>>
  >[];
}

// infinite query를 위한 유틸 함수
export async function getDehydratedInfiniteQuery<Q extends InfiniteQueryProps>({
  queryKey,
  queryFn,
  initialPageParam,
}: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
  });
  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) =>
    isEqual(query.queryKey, queryKey)
  );
  // 보통 api 주소가 잘 못되거나 404가 뜨는 경우에 해당 에러를 던지게 됩니다.
  if (!dehydratedQuery) {
    throw new Error('dehydratedQuery is undefined');
  }
  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q['queryFn']>>
  >;
}

export async function getDehydratedInfiniteQueries<
  Q extends InfiniteQueryProps[],
>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn, initialPageParam }) =>
      queryClient.prefetchInfiniteQuery({ queryKey, queryFn, initialPageParam })
    )
  );
  // 보통 api 주소가 잘 못되거나 404가 뜨는 경우에 해당 에러를 던지게 됩니다.
  if (!dehydrate(queryClient).queries) {
    throw new Error('dehydratedQuery is undefined');
  }
  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]['queryFn']>>
  >[];
}

export const Hydrate = HydrationBoundary;

export default {};
