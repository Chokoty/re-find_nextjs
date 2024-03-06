'use client';

import { Box, Text, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import ViewSelectBar from '@/components/common/ViewSelectBar';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import { getArtistInfo } from '@/service/client/artists';

type Prop = { keyword: string };

export default function DetailedEvent({ keyword }: Prop) {
  // { keyword_artworks }
  const [artworks, setArtworks] = useState<ArtworkList[]>([]); // useState(artist_artworks_data?.list);

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [, setLoadingImage] = useState(true);

  const toast = useToast();

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    // if (menuText === sortType) return;
    setSortType(menuText);
    // 다시 불러오기
    setPage(1);
    setIsLastPage(false);
    setArtworks([]);
  }, []);

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 이미지 로딩
  // const handleLoading = useCallback((Loading) => {
  //   setLoadingImage(Loading);
  // }, []);

  const getArtistArtworks = useCallback(async () => {
    // console.log('getArtistArtworks');
    if (isLastPage) return;
    if (loadingData) return;

    setLoadingData(true);
    // console.log('artworks loading...');

    try {
      const { list, lastPage } = await getArtistInfo({
        nickname: keyword,
        sortType,
        page,
        field: '',
      });

      if (lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 1) setArtworks([...list]);
      else setArtworks([...artworks, ...list]);
    } catch (error) {
      // 500에러 예외처리
      if (!isAxiosError(error)) return;
      if (error.response?.status === 500) {
        toast({
          title:
            '현재 작가 프로필 쪽 서버가 점검중 입니다. 잠시 후 다시 시도해주세요.',
          description: '500 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failurhttps://m.cafe.naver.com/steamindiegame/13514562e
    }
  }, [sortType, page, keyword]);

  // useEffect(() => {
  //   setArtworks(keyword_artworks?.list);
  // }, [keyword_artworks]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    // console.log('page: ', page);
    getArtistArtworks();
  }, [sortType, page]);

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    // if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage) {
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  useEffect(() => {
    if (keyword) {
      // console.log(keyword);
      getArtistArtworks();
    }
  }, [keyword]);

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
        {!artworks && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        )}
        {artworks && (
          <>
            {artworks?.length !== 0 && (
              <Box
                w="100%"
                overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
              >
                {activeView === 'masonryView' && (
                  <MasonryView
                    nickname={''}
                    artworks={artworks}
                    isDeletedVisible={isDeletedVisible}
                    // loadingImage={loadingImage}
                    // handleLoading={handleLoading}
                    isGallery={true}
                  />
                )}
                {activeView === 'gridView' && (
                  <SimpleView
                    artworks={artworks}
                    isDeletedVisible={isDeletedVisible}
                    // handleLoading={handleLoading}
                  />
                )}
                {/* Observer를 위한 div */}
                {<Box ref={ref} w="100%" h="2rem"></Box>}
              </Box>
            )}
          </>
        )}
        {loadingData && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <HashLoader color="#01BFA2" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
