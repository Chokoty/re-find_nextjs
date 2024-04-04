import Home from '@/components/home/Home';
import { getDehydratedQueries, Hydrate } from '@/lib/react-query';
import queryOptions from '@/service/client/home/queries';

// export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function HomePage() {
  const { queryKey: uKey, queryFn: uFn } = queryOptions.updates();
  const { queryKey: cKey, queryFn: cFn } = queryOptions.counts();

  const queries = await getDehydratedQueries([
    { queryKey: uKey, queryFn: uFn },
    { queryKey: cKey, queryFn: cFn },
  ]);

  return (
    <Hydrate state={{ queries }}>
      <Home />
    </Hydrate>
  );
}
