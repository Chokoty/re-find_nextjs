import Home from '@/app/(home)/components/Home';
import queryOptions from '@/app/(home)/service/client/queries';
import { getDehydratedQueries, Hydrate } from '@/lib/react-query';

// export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function HomePage() {
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
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
  return <Home />;
}
