import { Box, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import ViewSelectBar from '@/components/artist/ViewSelectBar';
import SearchLayout from '@/components/layout/search-layout';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import gallary from '@/data/gallary';
import members from '@/data/members';

const url = 'https://re-find.reruru.com/search_txt?query=';

const Album = () => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (id) {
      console.log(id);
      // router.query에서 가져온 id를 숫자로 변환합니다.
      const numericId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : parseInt(id, 10);

      // gallary 배열에서 해당 id를 가진 항목을 찾습니다.
      const g = gallary.find((item) => item.id === numericId);

      if (g) {
        // 찾은 항목을 album 상태에 설정합니다.
        setAlbum(g);
      } else {
        // 항목을 찾지 못한 경우에 대한 처리 (예: 오류 메시지 표시)
        console.log('해당 id를 가진 항목을 찾을 수 없습니다.');
      }
    }
  }, [id]);

  const [artworks, setArtworks] = useState(); // useState(artist_artworks_data?.list);

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
  const [loadingImage, setLoadingImage] = useState(true);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    // if (menuText === sortType) return;
    setSortType(menuText);
    // 다시 불러오기
    // setPage(1);
    // setIsLastPage(false);
    // setArtworks([]);
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
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  return (
    <SearchLayout title="팬아트 앨범">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m=" 3rem"
      >
        <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
          {album?.title}
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
                    handleLoading={handleLoading}
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
    </SearchLayout>
  );
};

export default Album;

export async function getServerSideProps(context) {
  const { key } = context.query;
  console.log(key);
  const matchingItem = gallary.find((item) => item.id === key);
  console.log(matchingItem);
  // console.log(`${url}${key}${gallary[0].option}&page=1 `);
  try {
    const search_artworks = await axios
      // .get(`${url}${key}${gallary[0].option}&page=1 `)
      .get(`${url}${key}&page=1 `)
      .then((res) => res.data);

    return {
      props: {
        search_artworks,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
