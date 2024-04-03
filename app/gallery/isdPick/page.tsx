import IsdGallery from '@/components/gallery/IsdGallery';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';
import queryOptions from '@/service/client/gallery/queries';

export const revalidate = 60;

export default async function IsdPage() {
  const { queryKey, queryFn } = queryOptions.isdNoticeArtworks({
    member: 'isd',
    ranktype: 'latest',
  });

  const query = await getDehydratedInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
  });

  return (
    <Hydrate state={{ queries: [query] }}>
      <IsdGallery />
    </Hydrate>
  );
}
