import { Box, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import LoadButton from '@/components/common/LoadButton';
import PageTitle from '@/components/common/PageTitle';
import ShareLinkButton from '@/components/common/ShareLinkButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import GalleryLayout from '@/components/layout/gallery-layout';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { darkMode, lightMode } from '@/styles/theme';

export default function Album({ value, query }) {
  const toast = useToast();
  const router = useRouter();
  // const idid = router.query.id as string; // 이렇게! 이렇게!

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const [album, setAlbum] = useState(null);
  const [member, setMember] = useState(null);
  const [artworks, setArtworks] = useState(null);
  // const [url, setUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);
  const [total, setTotal] = useState(0);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('alzaltak'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 / 가리기
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const loadData = () => {
    console.log('loadData');
    getFanartAlbum();
  };

  const resetArtworks = useCallback(() => {
    setArtworks([]);
    setPage(1);
    setIsLastPage(false);
  }, []);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
      resetArtworks();
    },
    [sortType, resetArtworks] // useCallback 문제였음...
  );

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
    console.log(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 이미지 로딩
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const getFanartAlbum = useCallback(async () => {
    console.log('getFanartAlbum');
    if (isLastPage) return;
    if (loadingData) return;
    console.log('loading data');
    setLoadingData(true);
    try {
      const url = `
      https://re-find.reruru.com/${query}&ranktype=${sortType}&per_page=30&page=${page}`;
      console.log(url);

      const response = await axios.get(url).then((res) => res.data);

      console.log(response);
      setTotal(response?.total);
      if (response.lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 1) setArtworks([...response.list]);
      else setArtworks([...artworks, ...response.list]);
    } catch (error) {
      // 500에러 예외처리
      console.log(error.response);
      if (error.response?.status === 500) {
        toast({
          title:
            '현재 갤러리 페이지 기능이 점검중 입니다. 잠시 후 다시 시도해주세요.',
          description: '500 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, [sortType, page, album, member]);

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage && !loadingData) {
      // !loadingData: 작가페이지 카운트 버그 수정
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log('page: ', page);
    getFanartAlbum();
  }, [sortType, page]);

  useEffect(() => {
    const g = gallery.find((item) => item.value === value);
    setAlbum(g);
    const m = members.find((item) => item.value === value);
    setMember(m);
    getFanartAlbum();
  }, []);

  const topTitle = {
    title: album?.subTitle || `${member?.name} 팬아트`,
    description: album?.description,
  };

  return (
    <Box>
      <Head>
        <title>{`${
          album?.subTitle ? album.subTitle : `${member?.name} 팬아트`
        } - RE:FIND`}</title>
        <meta
          property="og:title"
          content={`팬아트 - Gallery | RE:FIND `}
          // content={`${profile?.author_nickname}- Profile | RE:FIND `}
        />
        <meta
          property="og:description"
          content="리파인드 - 왁타버스 이세계아이돌 팬아트 출처 찾기"
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={profile?.author_prof_url} /> */}
        <meta
          property="og:url"
          content={`https://re-find.xyz/gallery/${value}`}
        />
      </Head>
      <GalleryLayout title="팬아트 갤러리">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          // m=" 3rem"
          m="1.5rem 1rem"
          mt="1rem"
          p="1rem"
          // background={bg2}
          // borderRadius="1rem"
        >
          {/* {router.query?.subTitle ? (
            <Text  m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'>{router.query.subTitle}</Text>
          ) : (
            album?.subTitle
          )} */}
          {/* {member?.name ? (
          <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
            {member.name} 팬아트
          </Text>
        ) : (
          <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
            {album?.subTitle}
          </Text>
        )} */}
          <PageTitle topTitle={topTitle} />
          {album?.description && <Text m="0 auto">{album.description}</Text>}
          {
            // member는 팬아트 개수 안 보이게
            album && <Text>총 {total}개의 팬아트가 있습니다.</Text>
          }
          {/* <Text>총 {total}개의 팬아트가 있습니다.</Text> */}
          {/* <Tooltip label="프로필 공유">
            <Button
              w="3rem"
              h="3rem"
              variant="ghost"
              borderRadius="full"
              p="0"
              onClick={handleCopyLink}
            >
              <ImLink />
            </Button>
          </Tooltip> */}
          <ShareLinkButton />
        </Box>
        <ViewSelectBar
          activeView={activeView}
          onViewChange={handleViewChange}
          selectedMenu={sortType}
          onMenuItemClick={handleMenuItemClick}
          isDeletedVisible={isDeletedVisible}
          handleShowDeleted={handleShowDeleted}
          topOffset={47}
          isdPick={false}
        />
        {artworks && (
          <>
            {artworks?.length !== 0 && (
              <Box
                w="100%"
                overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
              >
                {activeView === 'masonry' && (
                  <MasonryView
                    nickname={''}
                    // artworks={artworks}
                    artworks={
                      isDeletedVisible && gallery !== null
                        ? artworks
                        : artworks.filter(
                            (artwork) => artwork.is_hyum === false
                          )
                    }
                    isDeletedVisible={isDeletedVisible}
                    // loadingImage={loadingImage}
                    handleLoading={handleLoading}
                    isGallery={true}
                  />
                )}
                {activeView === 'grid' && (
                  <SimpleView
                    artworks={
                      isDeletedVisible && gallery !== null
                        ? artworks
                        : artworks.filter(
                            (artwork) => artwork.is_hyum === false
                          )
                    }
                    isDeletedVisible={isDeletedVisible}
                    // handleLoading={handleLoading}
                  />
                )}
                {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
                {/* Observer를 위한 div */}
                {<Box ref={ref} w="100%" h="5rem"></Box>}
              </Box>
            )}
          </>
        )}
        {(!artworks || loadingData) && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        )}
        {!loadingData && <LoadButton loadData={loadData} />}
      </GalleryLayout>
    </Box>
  );
}

export async function getServerSideProps(context) {
  // const { id } = context.query;
  const { value } = context.query;
  const query =
    members.find((item) => item.value === value)?.query ||
    gallery.find((item) => item.value === value)?.query;
  // gallery.find((item) => item.id.toString() === id)?.keyword;
  return {
    props: {
      value,
      query,
    },
  };
}
