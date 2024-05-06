'use client';

import { useCallback, useEffect, useState } from 'react';
// import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import GALLERY_LIST from '@/app/gallery/lib/const';
import { useArtworks } from '@/app/gallery/service/client/useGalleryService';
import Alert from '@/components/Alert';
import ViewSkeleton from '@/components/Skeleton/ViewSkeleton';
import MasonryView from '@/components/View/MasonryView';
import SimpleView from '@/components/View/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';

type Props = {
  value: string;
  endpoint: string;
};

export default function DetailedGallery({ value, endpoint }: Props) {
  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1300px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const [selected, setSelected] = useState('isd'); // 멤버 선택 > isdPick일 경우

  // 뷰 선택 메뉴
  // TODO: 추후 URL 쿼리스트링으로 받아오는 값에 따라 초기 뷰와 상태 설정
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState(
    value === 'isdPick' ? 'latest' : 'alzaltak'
  ); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 / 가리기
  const {
    fetchNextPage,
    total,
    artworks,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useArtworks({
    isIsdPick: value === 'isdPick',
    sortType,
    endpoint,
    selected,
  });

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      if (menuText === sortType) return;
      setSortType(menuText);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  // 삭제된 게시글 보이기
  const handleShowDeleted = () => {
    setIsDeletedVisible((prev) => !prev);
  };

  // value가 isd일 경우, 멤버 선택하기
  const handleMemberClick = (member: string) => {
    setSelected(member);
  };

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
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
            artworks={
              isDeletedVisible && GALLERY_LIST !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
            isDeletedVisible={isDeletedVisible}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView
            artworks={
              isDeletedVisible && GALLERY_LIST !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
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

  return (
    <>
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        selectedMember={selected}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        onMemberClick={handleMemberClick}
        topOffset={59}
        isdPick={value === 'isdPick'}
      />
      {content()}
    </>
  );
}
