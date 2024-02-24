import { Box, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import ShareLinkButton from '@/components/common/ShareLinkButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import GalleryLayout from '@/components/layout/gallery-layout';
import MasonryView2 from '@/components/views/MasonryView2';
import SimpleView from '@/components/views/SimpleView';
import gallery from '@/data/gallery';
import members from '@/data/members';
import useIsdPickStore from '@/store/isdPickStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function Album() {
  const itemsPerPage = 30;
  const toast = useToast();
  const router = useRouter();

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const [total, setTotal] = useState(0);
  const { artworks, setArtworks } = useIsdPickStore();
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [visibleArtworks, setVisibleArtworks] = useState([]);
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState('isd');
  const [album, setAlbum] = useState(gallery[0]);
  const [member, setMember] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  // const resetArtworks = useCallback(() => {
  //   setVisibleArtworks([]);
  //   setPage(1);
  //   setIsLastPage(false);
  // }, []);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  // useEffect(() => {
  //   // URL에 새로운 정렬 조건을 반영합니다.
  //   const currentPath = router.pathname;
  //   const { subTitle, ...restQuery } = router.query;
  //   const currentQuery = { ...restQuery, sort: sortType };
  //   router.push({
  //     pathname: currentPath,
  //     query: currentQuery,
  //   });
  // }, [sortType]);

  // 정렬 로직
  const sortArtworks = (_artworks, _sortType) => {
    return _artworks.sort((a, b) => {
      if (_sortType === 'latest') {
        // 내림차순
      }
      if (_sortType === 'oldest') {
        // 오름차순
      }
      if (_sortType === 'view') {
        return b.view - a.view;
      }
      if (_sortType === 'like') {
        return b.like - a.like;
      }
      if (_sortType === 'comment') {
        return b.comment - a.comment;
      }
      return b.id - a.id;
    });
  };

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
      // resetArtworks();
      setPage(1);
      setIsLastPage(false);
    },
    [sortType] // useCallback 문제였음...
  );

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
    // console.log(view);
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
    if (loadingData) return;

    setLoadingData(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/isd_notice`;
      const response = await axios.get(url).then((res) => res.data);
      // console.log(response);
      setTotal(response?.total);
      setArtworks([...response.list]);
    } catch (error) {
      // 500에러 예외처리
      console.log(error.response);
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
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, []);

  // useEffect(() => {
  //   resetArtworks();
  //   // ??
  //   // sort type에 따라 artworks 정렬
  // }, [sortType]);

  // useEffect(() => {
  //   console.log(visibleArtworks);
  // }, [visibleArtworks]);

  // 페이지 변경에 따른 visibleArtists 업데이트
  useEffect(() => {
    if (isLastPage) return;

    if (visibleArtworks.length >= filteredArtworks.length) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }

    setVisibleArtworks((prev) => [
      ...prev,
      ...filteredArtworks.slice(prev.length, page * itemsPerPage),
    ]);
  }, [page, filteredArtworks]);

  // 정렬, 뷰 선택에 따른 filteredArtists 업데이트
  useEffect(() => {
    let updatedArtworks = artworks;

    const m = members.find((item) => item.value === selected);

    updatedArtworks =
      selected === 'isd'
        ? artworks
        : artworks.filter((item) => item.author === m.author);
    // console.log(updatedArtworks);
    // 정렬
    let sortedArtworks = sortArtworks(updatedArtworks, sortType);
    if (sortType === 'latest') {
      sortedArtworks = updatedArtworks;
    } else if (sortType === 'oldest') {
      sortedArtworks = updatedArtworks.reverse();
    }
    // console.log(sortedArtworks);

    setFilteredArtworks(sortedArtworks);
    setTotal(sortedArtworks.length);
    setVisibleArtworks(sortedArtworks.slice(0, itemsPerPage));
    setPage(1);
    setIsLastPage(false);
  }, [artworks, selected, sortType]);

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage && !loadingData) {
      // !loadingData: 작가페이지 카운트 버그 수정
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prev) => prev + 1);
      console.log('page: ', page);
    }
  }, [inView, isLastPage]);

  // 1회 실행
  useEffect(() => {
    console.log('loading...');
    if (artworks.length === 0) {
      console.log('getFanartAlbum');
      getFanartAlbum();
    }
  }, [artworks]);

  return (
    <Box>
      <Head>
        <title>{`이세돌픽 팬아트 - RE:FIND`}</title>
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
          content={`https://re-find.xyz/gallery/isdPick`}
        />
      </Head>
      <GalleryLayout title="팬아트 갤러리">
        <PageTitle topTitle={album} />
        <ShareLinkButton />
        <Box
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
          <Text>총 {filteredArtworks.length}</Text>
          <MemberButtonList
            members={members}
            type="sort"
            range={{ start: 1, end: 7 }}
            selected={selected}
            setSelected={setSelected}
            isdPick={true}
          />
          {/* <Text>총 {total}</Text> */}
        </Box>
        <ViewSelectBar
          activeView={activeView}
          onViewChange={handleViewChange}
          selectedMenu={sortType}
          onMenuItemClick={handleMenuItemClick}
          isDeletedVisible={isDeletedVisible}
          handleShowDeleted={handleShowDeleted}
          // topOffset={48}
          topOffset={-13}
          isdPick={true}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="0 auto"
          mb="2rem"
        >
          {visibleArtworks && (
            <>
              {visibleArtworks?.length !== 0 && (
                <Box
                  w="100%"
                  overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
                >
                  {activeView === 'masonry' && (
                    <MasonryView2
                      nickname={''}
                      artworks={visibleArtworks}
                      isDeletedVisible={isDeletedVisible}
                      // loadingImage={loadingImage}
                      handleLoading={handleLoading}
                      isGallery={true}
                    />
                  )}
                  {activeView === 'grid' && (
                    <SimpleView
                      artworks={visibleArtworks}
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
        </Box>
      </GalleryLayout>
    </Box>
  );
}
