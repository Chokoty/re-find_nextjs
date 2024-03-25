import { QueryClient } from '@tanstack/query-core';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';

import Home from '@/components/home/Home';
import queryOptions from '@/service/client/home/queries';

// export const dynamic = 'force-dynamic';
export const revalidate = 10; // revalidate every 10 seconds

const getCount = async () => {
  const res = await axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/counter`);
  const response = res.data as Counter;
  return response;
};

// export const getUpdates = async () => {
//   const res = await axios(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/last_update_info`
//   );
//   return res.data as RecentBoardData[];
// }

export default async function HomePage() {
  // const { queryKey: uKey, queryFn: uFn } = queryOptions.updates();
  const { queryKey: cKey, queryFn: cFn } = queryOptions.counts();

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: uKey,
  //   queryFn: uFn, // request 함수 내부에서 에러를 발생하면 prefetch만 실패하고 페이지는 렌더링 (따로 에러처리 x)
  //   // ..
  // });

  await queryClient.prefetchQuery({
    queryKey: cKey,
    queryFn: getCount,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  );
}
