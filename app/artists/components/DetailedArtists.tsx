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
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  nickname: string;
  artistInfo: AuthorOverview;
};

export default function DetailedArtists({ nickname }: Props) {
  // infinite scroll을 위한 옵저버
  const isMobile = useResponsive();
  const option = isMobile ? { rootMargin: '1000px 0px' } : undefined;
  const { ref, inView } = useInView(option);
  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // TODO: 이전 부분 삭제 (query가 들어갈 수 있는 상황이 없는 것 같아서)
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  const { rankCriteria } = useArtistSearchInfoStore(
    useShallow((state) => ({ rankCriteria: state.rankCriteria }))
  );

  const { fetchNextPage, artworks, status, isFetchingNextPage } = useArtistInfo(
    {
      nickname,
      sortType,
      board: rankCriteria ? convertBoardParams(rankCriteria) : null,
    }
  );

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
  }, [fetchNextPage, inView]);

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
      {status === 'pending' ? (
        <ViewSkeleton view={activeView} />
      ) : status === 'error' ? (
        <Alert />
      ) : (
        artworks && (
          <div className="w-full overflow-hidden px-2 py-0 2xs:px-6">
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
        )
      )}
    </>
  );
}
