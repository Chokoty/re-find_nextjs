'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import { useArtistInfo } from '@/app/artists/service/client/useArtistService';
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
    useArtistInfo({ nickname: keyword, sortType, field: '' });

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

  // useEffect(() => {
  //   setArtworks(keyword_artworks?.list);
  // }, [keyword_artworks]);

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
      <Box
        w="100%"
        p={['0 0.5rem', '0 1.5rem']}
        overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
      >
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
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m=" 3rem"
      >
        <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
          🎃 할로윈 특집 🎃
        </Text>
        <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
          왁타버스 팬아트
        </Text>
      </Box>
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        mb="2rem"
      >
        {content()}
      </Box>
    </Box>
  );
}
