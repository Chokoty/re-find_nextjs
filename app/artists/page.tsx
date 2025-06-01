import { FaHardHat } from 'react-icons/fa';

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
  // if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
  //   const { queryKey, queryFn } = queryOptions.artistList({
  //     q: '',
  //     ranktype: 'likes',
  //     board: null,
  //   });

  //   const query = await getDehydratedInfiniteQuery({
  //     queryKey,
  //     queryFn,
  //     initialPageParam: 1,
  //   });

  //   return (
  //     <div className="flex w-full flex-col items-center justify-center gap-4 px-3 py-4">
  //       <PageTitle topTitle={topTitle} />
  //       <div className="mx-auto mt-12 flex w-full max-w-screen-lg flex-col items-center justify-center gap-4">
  //         <ArtistsSearchInput />
  //         <RankSortButtonGroup />
  //         <TotalSortButtonGroup />
  //         <Hydrate state={{ queries: [query] }}>
  //           <div className="w-full rounded-2xl bg-white shadow-cardBox dark:bg-dark-card">
  //             {/* <Maintenance /> */}
  //             <ArtistList />
  //           </div>
  //         </Hydrate>
  //       </div>
  //     </div>
  //   );
  // }
  // 로컬에서 실행할 경우
  return (
    // <div className="flex w-full  items-center justify-center px-2.5 py-4 md:px-4">
    <div className="flex w-full flex-col items-center justify-center gap-4 px-3 py-4">
      <PageTitle topTitle={topTitle} />
      <div className="mx-auto mt-12 flex w-full max-w-screen-lg flex-col items-center justify-center gap-4">
        <ArtistsSearchInput />
        <RankSortButtonGroup />
        <TotalSortButtonGroup />
        <ArtistList />
        {/* <div className="w-full rounded-2xl border-base bg-white px-6 pt-6 dark:border-whiteAlpha-300 dark:bg-dark-card">
          <Maintenance />
        </div> */}
      </div>
    </div>
  );
}

const Maintenance = () => {
  return (
    <div className="mx-auto mt-6 flex size-full min-h-[210px] flex-col items-center justify-center">
      <div className="mb-2 flex items-center">
        <FaHardHat className="mr-1 size-5 text-yellow-600" />
        <p className="text-lg font-bold">작가 검색 서비스 점검</p>
      </div>
      <p className="break-keep text-center">
        현재 작가 검색 서비스를 점검하고 있습니다.{' '}
        <br className="inline sm:hidden" />
        이용에 불편을 드려 죄송합니다.
      </p>
    </div>
  );
};
