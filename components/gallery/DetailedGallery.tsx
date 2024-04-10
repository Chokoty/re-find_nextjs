'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import ViewSelectBar from '@/components/common/ViewSelectBar';
import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import gallery from '@/data/gallery';
import { useArtworks } from '@/service/client/gallery/useGalleryService';

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

  // const album = gallery.find((item) => item.value === value);
  // const member = members.find((item) => item.value === value);

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
      return (
        <Alert
          status="error"
          w="100%"
          borderRadius="1rem"
          justifyContent="center"
          flexDir={['column', 'column', 'column', 'row']}
        >
          <Box display="flex">
            <AlertIcon />
            <AlertTitle>서버 에러</AlertTitle>
          </Box>
          <AlertDescription>
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
            빠른 시일 내에 해결하겠습니다.
          </AlertDescription>
        </Alert>
      );
    }

    if (!artworks || artworks.length === 0) return;

    return (
      <Box w="100%" p={['0 0.5rem', '0 1.5rem']} overflow="hidden">
        {activeView === 'masonry' && (
          <MasonryView
            artworks={
              isDeletedVisible && gallery !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
            isDeletedVisible={isDeletedVisible}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView
            artworks={
              isDeletedVisible && gallery !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
            isDeletedVisible={isDeletedVisible}
            // handleLoading={handleLoading}
          />
        )}
        {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
        {isFetchingNextPage ? (
          <Box
            w="100%"
            mt="1.5rem"
            mb="1.5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        ) : (
          // Observer를 위한 div
          <Box ref={ref} w="100%" h="5rem" />
        )}
      </Box>
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
