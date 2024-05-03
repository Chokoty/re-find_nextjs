'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import { useArtistInfo } from '@/app/artists/service/client/useArtistService';
import Alert from '@/components/Alert';
import PageTitle from '@/components/PageTitle';
import ViewSkeleton from '@/components/Skeleton/ViewSkeleton';
import MasonryView from '@/components/View/MasonryView';
import SimpleView from '@/components/View/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';

type Prop = { keyword: string };

export default function DetailedEvent({ keyword }: Prop) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1200px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  const { fetchNextPage, artworks, isError, isFetchingNextPage, isLoading } =
    useArtistInfo({ nickname: keyword, sortType, board: null });

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    // if (menuText === sortType) return;
    setSortType(menuText);
  }, []);

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const content = () => {
    if (isLoading) {
      return <ViewSkeleton view={activeView} />;
    }

    if (isError) {
      return <Alert />;
    }

    if (!artworks || artworks.length === 0) return;

    return (
      <div className="w-full overflow-hidden px-2 py-0 2xs:p-6 2xs:py-0">
        {activeView === 'masonry' && (
          <MasonryView
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
            // handleLoading={handleLoading}
          />
        )}
        {isFetchingNextPage ? (
          <div className="my-6 flex w-full items-center justify-center">
            <HashLoader color="#01BFA2" />
          </div>
        ) : (
          // Observer를 위한 div
          <div ref={ref} className="h-20 w-full" />
        )}
      </div>
    );
  };

  const topTitle = {
    title: '🎃 할로윈 특집 🎃',
    description: '왁타버스 팬아트',
  };

  return (
    <>
      <div className="my-12">
        <PageTitle topTitle={topTitle} />
      </div>
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        topOffset={59}
        isdPick={false}
      />
      {content()}
    </>
  );
}
