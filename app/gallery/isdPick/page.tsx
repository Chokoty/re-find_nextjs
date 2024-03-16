import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import IsdGallery from '@/components/gallery/IsdGallery';
import queryOptions from '@/service/client/gallery/queries';

export default async function IsdPage() {
  const { queryKey, queryFn } = queryOptions.isdNoticeArtworks({
    member: 'all',
    ranktype: 'latest',
  });

  // const query = await getDehydratedQuery({ queryKey, queryFn });
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
  });

  const { queries } = dehydrate(queryClient);

  return (
    <HydrationBoundary state={{ queries }}>
      <IsdGallery />
    </HydrationBoundary>
  );
}
