'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import { convertBoardParams } from '@/app/artists/lib/convertParams';
import { useArtistInfo } from '@/app/artists/service/client/useArtistService';
import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import Alert from '@/components/Alert';
import ViewSkeleton from '@/components/Skeleton/ViewSkeleton';
import MasonryView from '@/components/View/MasonryView';
import SimpleView from '@/components/View/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';

type Props = {
  nickname: string;
  artistInfo: AuthorOverview;
};

export default function DetailedArtists({ nickname }: Props) {
  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '1300px 0px', // 상단에서 1000px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // TODO: 이전 부분 삭제 (query가 들어갈 수 있는 상황이 없는 것 같아서)
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  const { rankCriteria } = useArtistSearchInfoStore(
    useShallow((state) => ({ rankCriteria: state.rankCriteria }))
  );

  const { fetchNextPage, artworks, isError, isFetchingNextPage, isLoading } =
    useArtistInfo({
      nickname,
      sortType,
      board: rankCriteria ? convertBoardParams(rankCriteria) : null,
    });

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 무한 스크롤
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
      <div className="w-full overflow-hidden px-2 py-0 2xs:px-6">
        {activeView === 'masonry' && (
          <MasonryView
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView artworks={artworks} isDeletedVisible={isDeletedVisible} />
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

  return (
    <>
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
