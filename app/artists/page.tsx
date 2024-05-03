import ArtistList from '@/app/artists/components/ArtistList';
import ArtistsSearchInput from '@/app/artists/components/ArtistsSearchInput';
import RankSortButtonGroup from '@/app/artists/components/Group/RankSortButtonGroup';
import TotalSortButtonGroup from '@/app/artists/components/Group/TotalSortButtonGroup';
import queryOptions from '@/app/artists/service/client/queries';
import PageTitle from '@/components/PageTitle';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

const topTitle = {
  title: '왁타버스 작가',
  description: '왁물원에서 활동중인 작가님의 작품을 모아서 볼 수 있어요',
};

export default async function ArtistsPage() {
  // 배포 서버에서 실행할 경우
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    const { queryKey, queryFn } = queryOptions.artistList({
      q: '',
      ranktype: 'like',
      board: null,
    });

    const query = await getDehydratedInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    });

    return (
      <div className="my-2.5 flex w-full flex-col items-center justify-center p-4">
        <PageTitle topTitle={topTitle} />
        <div className="mt-12 flex w-full max-w-screen-lg flex-col items-center justify-center gap-4">
          <ArtistsSearchInput />
          <RankSortButtonGroup />
          <TotalSortButtonGroup />
          <Hydrate state={{ queries: [query] }}>
            <div className="mb-20 w-full rounded-2xl bg-white p-4 shadow-cardBox dark:bg-dark-card">
              <ArtistList />
            </div>
          </Hydrate>
        </div>
      </div>
    );
  }
  // 로컬에서 실행할 경우
  return (
    <div className="flex size-full flex-col items-center justify-start p-4">
      <PageTitle topTitle={topTitle} />
      <div className="mt-12 flex w-full max-w-screen-lg flex-col items-center justify-center gap-4">
        <ArtistsSearchInput />
        <RankSortButtonGroup />
        <TotalSortButtonGroup />
        <div className="mb-20 w-full rounded-2xl bg-white p-4 shadow-cardBox dark:bg-dark-card">
          <ArtistList />
        </div>
      </div>
    </div>
  );
}
