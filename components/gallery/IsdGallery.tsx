'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import ShareLinkButton from '@/components/common/ShareLinkButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView2 from '@/components/views/MasonryView2';
import SimpleView from '@/components/views/SimpleView';
import gallery from '@/data/gallery';
import { useNoticeArtworks } from '@/service/client/gallery/useGalleryService';
import { darkMode, lightMode } from '@/styles/theme';

// type Member = 'ine' | 'jingburger' | 'lilpa' | 'jururu' | 'gosegu' | 'viichan';

export default function IsdGallery() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1300px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const [selected, setSelected] = useState('isd'); // 멤버 선택

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 | 가리기

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const {
    fetchNextPage,
    total,
    artworks,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useNoticeArtworks({ member: selected, ranktype: sortType });

  const { title, description } = gallery.find(
    (item) => item.value === 'isdPick'
  )!;

  const album = {
    title,
    description,
  };

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
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
        >
          <AlertIcon />
          <AlertTitle>서버 에러</AlertTitle>
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        mb="2rem"
      >
        <Box
          w="100%"
          overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
        >
          {activeView === 'masonry' && (
            <MasonryView2
              nickname={''}
              artworks={
                isDeletedVisible && gallery !== null
                  ? artworks
                  : artworks.filter((artwork) => artwork.is_hyum === false)
              }
              isDeletedVisible={isDeletedVisible}
              // loadingImage={loadingImage}
              // handleLoading={handleLoading}
              isGallery={true}
            />
          )}
          {activeView === 'grid' && (
            <SimpleView
              artworks={
                isDeletedVisible && gallery !== null
                  ? artworks
                  : artworks.filter((artwork) => artwork.is_hyum === false)
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
      </Box>
    );
  };

  return (
    <>
      {/* <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="1.5rem 1rem"
        mt="1rem"
        p="1rem"
        background={bg2}
        borderRadius="1rem"
      >
        <Text>
          총 {total ? <CountUp end={total ?? 0} /> : ''}
          개의 팬아트가 있습니다.
        </Text>
        <MemberButtonList
          type="sort"
          range={{ start: 1, end: 7 }}
          selected={selected}
          setSelected={setSelected}
          isdPick={true}
        />
      </Box> */}
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        // topOffset={48}
        topOffset={47}
        isdPick={true}
      />
      {content()}
    </>
  );
}
